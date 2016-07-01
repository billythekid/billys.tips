/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (b) {
    Craft.Dashboard = Garnish.Base.extend({
        $grid: null,
        $widgetManagerBtn: null,
        widgetTypes: null,
        grid: null,
        widgets: null,
        widgetManager: null,
        widgetAdminTable: null,
        widgetSettingsModal: null,
        init: function (a) {
            this.widgetTypes = a;
            this.widgets = {};
            this.$widgetManagerBtn = b("#widgetManagerBtn");
            this.addListener(this.$widgetManagerBtn, "click", "showWidgetManager");
            Garnish.$doc.ready(b.proxy(function () {
                this.$grid = b("#main > .padded > .grid");
                this.grid = this.$grid.data("grid");
                b("#newwidgetmenubtn").data("menubtn").menu.on("optionselect",
                    b.proxy(this, "handleNewWidgetOptionSelect"))
            }, this))
        },
        getTypeInfo: function (a, b, d) {
            return b ? "undefined" == typeof this.widgetTypes[a][b] ? d : this.widgetTypes[a][b] : this.widgetTypes[a]
        },
        handleNewWidgetOptionSelect: function (a) {
            a = b(a.selectedOption);
            var c = a.data("type"), d = "newwidget" + Math.floor(1E9 * Math.random()) + "-settings", e = this.getTypeInfo(c, "settingsHtml", "").replace(/__NAMESPACE__/g, d), h = this.getTypeInfo(c, "settingsJs", "").replace(/__NAMESPACE__/g, d), f = b('<div class="item" data-colspan="1" style="display: block">'),
                g = b('<div class="widget new loading-new scaleout ' + c.toLowerCase() + '" data-type="' + c + '"><div class="front"><div class="pane"><div class="spinner body-loading"/><div class="settings icon hidden"/><h2/><div class="body"/></div></div><div class="back"><form class="pane"><input type="hidden" name="type" value="' + c + '"/><input type="hidden" name="settingsNamespace" value="' + d + '"/><h2>' + Craft.t("{type} Settings", {type: Craft.escapeHtml(a.data("name"))}) + '</h2><div class="settings"/><hr/><div class="buttons clearafter"><input type="submit" class="btn submit" value="' +
                    Craft.t("Save") + '"/><div class="btn" role="button">' + Craft.t("Cancel") + '</div><div class="spinner hidden"/></div></form></div></div>').appendTo(f);
            e ? g.addClass("flipped") : g.addClass("loading");
            var k = new Craft.Widget(g, e.replace(/__NAMESPACE__/g, d), function () {
                eval(h)
            });
            this.grid.$items.length ? f.insertAfter(this.grid.$items.last()) : f.prependTo(this.grid.$container);
            this.grid.addItems(f);
            Garnish.scrollContainerToElement(f);
            g.removeClass("scaleout");
            e || Craft.postActionRequest("dashboard/createWidget",
                {type: c}, function (a, b) {
                    "success" == b && a.success ? (g.removeClass("loading"), k.update(a)) : k.destroy()
                })
        },
        showWidgetManager: function () {
            if (this.widgetManager)this.widgetManager.show(); else {
                for (var a = this.$grid.find("> .item > .widget"), c = b('<form method="post" accept-charset="UTF-8"><input type="hidden" name="action" value="widgets/saveWidget"/></form>').appendTo(Garnish.$bod), d = b('<p id="nowidgets"' + (a.length ? ' class="hidden"' : "") + ">" + Craft.t("You don\u2019t have any widgets yet.") + "</p>").appendTo(c),
                         e = b('<table class="data' + (a.length ? "" : " hidden") + '"/>').appendTo(c), h = b("<tbody/>").appendTo(e), f = 0; f < a.length; f++) {
                    var g = a.eq(f).data("widget");
                    g && g.id && g.getManagerRow().appendTo(h)
                }
                this.widgetManager = new Garnish.HUD(this.$widgetManagerBtn, c, {
                    hudClass: "hud widgetmanagerhud",
                    onShow: b.proxy(function () {
                        this.$widgetManagerBtn.addClass("active")
                    }, this),
                    onHide: b.proxy(function () {
                        this.$widgetManagerBtn.removeClass("active")
                    }, this)
                });
                this.widgetAdminTable = new Craft.AdminTable({
                    tableSelector: e,
                    noObjectsSelector: d,
                    sortable: !0,
                    reorderAction: "dashboard/reorderUserWidgets",
                    deleteAction: "dashboard/deleteUserWidget",
                    onReorderObjects: b.proxy(function (a) {
                        for (var b, d = 0; d < a.length; d++) {
                            var c = this.widgets[a[d]];
                            b ? c.$gridItem.insertAfter(b.$gridItem) : c.$gridItem.prependTo(this.$grid);
                            b = c
                        }
                        this.grid.resetItemOrder()
                    }, this),
                    onDeleteObject: b.proxy(function (a) {
                        this.widgets[a].destroy()
                    }, this)
                })
            }
        }
    });
    Craft.Widget = Garnish.Base.extend({
        $container: null,
        $gridItem: null,
        $front: null,
        $settingsBtn: null,
        $title: null,
        $bodyContainer: null,
        $back: null,
        $settingsForm: null,
        $settingsContainer: null,
        $settingsSpinner: null,
        $settingsErrorList: null,
        id: null,
        type: null,
        title: null,
        totalCols: null,
        settingsHtml: null,
        initSettingsFn: null,
        showingSettings: !1,
        colspanPicker: null,
        init: function (a, c, d) {
            this.$container = b(a);
            this.$gridItem = this.$container.parent();
            this.$container.data("widget", this);
            this.id = this.$container.data("id");
            this.type = this.$container.data("type");
            this.title = this.$container.data("title");
            this.id && (window.dashboard.widgets[this.id] = this);
            this.$front = this.$container.children(".front");
            this.$settingsBtn = this.$front.find("> .pane > .icon.settings");
            this.$title = this.$front.find("> .pane > h2");
            this.$bodyContainer = this.$front.find("> .pane > .body");
            this.setSettingsHtml(c, d);
            if (this.$container.hasClass("flipped"))this.initBackUi(), this.refreshSettings(), this.onShowBack(); else this.onShowFront();
            this.addListener(this.$settingsBtn, "click", "showSettings")
        },
        initBackUi: function () {
            this.$back = this.$container.children(".back");
            this.$settingsForm =
                this.$back.children("form");
            this.$settingsContainer = this.$settingsForm.children(".settings");
            var a = this.$settingsForm.children(".buttons");
            this.$settingsSpinner = a.children(".spinner");
            this.addListener(a.children(".btn:nth-child(2)"), "click", "cancelSettings");
            this.addListener(this.$settingsForm, "submit", "saveSettings")
        },
        getColspan: function () {
            return this.$gridItem.data("colspan")
        },
        setColspan: function (a) {
            this.$gridItem.data("colspan", a);
            window.dashboard.grid.refreshCols(!0)
        },
        getTypeInfo: function (a, b) {
            return window.dashboard.getTypeInfo(this.type,
                a, b)
        },
        setSettingsHtml: function (a, b) {
            this.settingsHtml = a;
            this.initSettingsFn = b;
            this.settingsHtml ? this.$settingsBtn.removeClass("hidden") : this.$settingsBtn.addClass("hidden")
        },
        refreshSettings: function () {
            this.$settingsContainer.html(this.settingsHtml);
            Garnish.requestAnimationFrame(b.proxy(function () {
                Craft.initUiElements(this.$settingsContainer);
                this.initSettingsFn()
            }, this))
        },
        showSettings: function () {
            this.$back || this.initBackUi();
            this.refreshSettings();
            this.$container.addClass("flipped").velocity({height: this.$back.height()},
                {complete: b.proxy(this, "onShowBack")})
        },
        hideSettings: function () {
            this.$container.removeClass("flipped").velocity({height: this.$front.height()}, {complete: b.proxy(this, "onShowFront")})
        },
        saveSettings: function (a) {
            a.preventDefault();
            this.$settingsSpinner.removeClass("hidden");
            a = this.$container.hasClass("new") ? "dashboard/createWidget" : "dashboard/saveWidgetSettings";
            var c = this.$settingsForm.serialize();
            Craft.postActionRequest(a, c, b.proxy(function (a, b) {
                this.$settingsSpinner.addClass("hidden");
                "success" == b &&
                (this.$settingsErrorList && (this.$settingsErrorList.remove(), this.$settingsErrorList = null), a.success ? (Craft.cp.displayNotice(Craft.t("Widget saved.")), a.info ? (this.update(a), this.hideSettings()) : this.destroy()) : (Craft.cp.displayError(Craft.t("Couldn\u2019t save widget.")), a.errors && (this.$settingsErrorList = Craft.ui.createErrorList(a.errors).insertAfter(this.$settingsContainer))))
            }, this))
        },
        update: function (a) {
            this.title = a.info.title;
            this.$container.hasClass("new") ? (this.id = a.info.id, this.$container.attr("id",
                "widget" + this.id).removeClass("new loading-new"), this.$settingsForm && this.$settingsForm.prepend('<input type="hidden" name="widgetId" value="' + this.id + '"/>'), window.dashboard.widgets[this.id] = this, window.dashboard.widgetAdminTable && window.dashboard.widgetAdminTable.addRow(this.getManagerRow())) : window.dashboard.widgetAdminTable && window.dashboard.widgetAdminTable.$tbody.children('[data-id="' + this.id + '"]:first').children("td:nth-child(2)").html(this.getManagerRowLabel());
            this.$title.text(this.title);
            this.$bodyContainer.html(a.info.bodyHtml);
            a.info.colspan != this.getColspan() && (this.setColspan(a.info.colspan), Garnish.scrollContainerToElement(this.$gridItem));
            Craft.initUiElements(this.$bodyContainer);
            Craft.appendHeadHtml(a.headHtml);
            Craft.appendFootHtml(a.footHtml);
            this.setSettingsHtml(a.info.settingsHtml, function () {
                eval(a.info.settingsJs)
            })
        },
        cancelSettings: function () {
            this.id ? this.hideSettings() : this.destroy()
        },
        onShowFront: function () {
            this.showingSettings = !1;
            this.removeListener(this.$back, "resize");
            this.addListener(this.$front, "resize", "updateContainerHeight")
        },
        onShowBack: function () {
            this.showingSettings = !0;
            this.removeListener(this.$front, "resize");
            this.addListener(this.$back, "resize", "updateContainerHeight");
            setTimeout(b.proxy(function () {
                this.$settingsForm.find(":focusable:first").focus()
            }, this), 1)
        },
        updateContainerHeight: function () {
            this.$container.height((this.showingSettings ? this.$back : this.$front).height())
        },
        getManagerRow: function () {
            var a = b('<tr data-id="' + this.id + '" data-name="' + this.title +
                '"><td class="widgetmanagerhud-icon">' + this.getTypeInfo("iconSvg") + "</td><td>" + this.getManagerRowLabel() + '</td><td class="widgetmanagerhud-col-colspan-picker thin"></td><td class="widgetmanagerhud-col-move thin"><a class="move icon" title="' + Craft.t("Reorder") + '" role="button"></a></td><td class="thin"><a class="delete icon" title="' + Craft.t("Delete") + '" role="button"></a></td></tr>');
            this.colspanPicker = new Craft.WidgetColspanPicker(this, a.find("> td.widgetmanagerhud-col-colspan-picker"));
            return a
        },
        getManagerRowLabel: function () {
            var a = this.getTypeInfo("name");
            return this.title + (this.title != a ? ' <span class="light">(' + a + ")</span>" : "")
        },
        destroy: function () {
            delete window.dashboard.widgets[this.id];
            this.$container.addClass("scaleout");
            this.base();
            setTimeout(b.proxy(function () {
                window.dashboard.grid.removeItems(this.$gridItem);
                this.$gridItem.remove()
            }, this), 200)
        }
    });
    Craft.WidgetColspanPicker = Garnish.Base.extend({
        widget: null, maxColspan: null, $container: null, $colspanButtons: null, totalGridCols: null, init: function (a,
                                                                                                                      c) {
            this.widget = a;
            this.$container = b('<div class="colspan-picker"/>').appendTo(c);
            this.maxColspan = this.widget.getTypeInfo("maxColspan");
            this.totalGridCols = window.dashboard.grid.totalCols;
            this.createColspanButtons();
            window.dashboard.grid.on("refreshCols", b.proxy(this, "handleGridRefresh"));
            this.addListener(this.$container, "mouseover", function (a) {
                b(a.currentTarget).addClass("hover")
            });
            this.addListener(this.$container, "mouseout", function (a) {
                b(a.currentTarget).removeClass("hover")
            })
        }, handleGridRefresh: function () {
            this.totalGridCols !=
            (this.totalGridCols = window.dashboard.grid.totalCols) && (this.$colspanButtons && this.$colspanButtons.remove(), this.createColspanButtons())
        }, createColspanButtons: function () {
            for (var a = this.maxColspan ? Math.min(this.maxColspan, this.totalGridCols) : this.totalGridCols, c = Math.min(this.widget.getColspan(), a), d = 1; d <= a; d++) {
                var e = "";
                d <= c && (e = "active");
                d == c && (e += (e ? " " : "") + "last");
                b("<a/>", {
                    title: 1 == d ? Craft.t("1 column") : Craft.t("{num} columns", {num: d}),
                    role: "button",
                    "class": e,
                    data: {colspan: d}
                }).appendTo(this.$container)
            }
            this.$colspanButtons =
                this.$container.children();
            this.addListener(this.$colspanButtons, "mouseover", function (a) {
                a = b(a.currentTarget);
                a.add(a.prevAll()).addClass("highlight");
                a.nextAll().removeClass("highlight")
            });
            this.addListener(this.$colspanButtons, "mouseout", function (a) {
                this.$colspanButtons.removeClass("highlight")
            });
            this.addListener(this.$colspanButtons, "click", b.proxy(function (a) {
                this.setWidgetColspan(b.data(a.currentTarget, "colspan"))
            }, this))
        }, setWidgetColspan: function (a) {
            this.$colspanButtons.removeClass("last active");
            var b = this.$colspanButtons.eq(a - 1);
            b.add(b.prevAll()).addClass("active");
            b.addClass("last");
            this.widget.setColspan(a);
            window.dashboard.grid.refreshCols(!0);
            Craft.postActionRequest("dashboard/changeWidgetColspan", {id: this.widget.id, colspan: a}, function (a, b) {
                "success" == b && a.success ? Craft.cp.displayNotice(Craft.t("Widget saved.")) : Craft.cp.displayError(Craft.t("Couldn\u2019t save widget."))
            })
        }
    })
})(jQuery);

//# sourceMappingURL=Dashboard.min.map
