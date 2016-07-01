/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (d) {
    var h = Garnish.Base.extend({
        tokens: null, routes: null, $container: null, $addRouteBtn: null, sorter: null, init: function () {
            this.tokens = {};
            this.routes = [];
            this.$container = d("#routes");
            for (var a = this.getRoutes(), b = 0; b < a.length; b++) {
                var c = new f(a[b]);
                this.routes.push(c)
            }
            this.sorter = new Garnish.DragSort(a, {
                axis: Garnish.Y_AXIS,
                onSortChange: d.proxy(this, "updateRouteOrder")
            });
            this.$addRouteBtn = d("#add-route-btn");
            this.addListener(this.$addRouteBtn, "click", "addRoute")
        }, getRoutes: function () {
            return this.$container.children()
        },
        updateRouteOrder: function () {
            for (var a = this.getRoutes(), b = {}, c = 0; c < a.length; c++)b["routeIds[" + c + "]"] = d(a[c]).attr("data-id");
            Craft.postActionRequest("routes/updateRouteOrder", b, d.proxy(function (a, b) {
                "success" == b && (a.success ? Craft.cp.displayNotice(Craft.t("New route order saved.")) : Craft.cp.displayError(Craft.t("Couldn\u2019t save new route order.")))
            }, this))
        }, addRoute: function () {
            new g
        }
    }), f = Garnish.Base.extend({
        $container: null,
        id: null,
        locale: null,
        $locale: null,
        $url: null,
        $template: null,
        modal: null,
        init: function (a) {
            this.$container =
                d(a);
            this.id = this.$container.data("id");
            this.locale = this.$container.data("locale");
            this.$locale = this.$container.find(".locale:first");
            this.$url = this.$container.find(".url:first");
            this.$template = this.$container.find(".template:first");
            this.addListener(this.$container, "click", "edit")
        },
        edit: function () {
            this.modal ? this.modal.show() : this.modal = new g(this)
        },
        updateHtmlFromModal: function () {
            Craft.routes.locales && (this.locale ? this.$locale.text(this.locale) : this.$locale.text(Craft.t("Global")));
            for (var a = "",
                     b = 0; b < this.modal.urlInput.elements.length; b++)var c = this.modal.urlInput.elements[b], a = this.modal.urlInput.isText(c) ? a + c.val() : a + c.prop("outerHTML");
            this.$url.html(a);
            this.$template.html(this.modal.$templateInput.val())
        }
    }), g = Garnish.Modal.extend({
        route: null,
        $heading: null,
        $urlInput: null,
        urlElements: null,
        $templateInput: null,
        $saveBtn: null,
        $cancelBtn: null,
        $spinner: null,
        $deleteBtn: null,
        loading: !1,
        init: function (a) {
            this.route = a;
            a = "<h4>" + Craft.t("Add a token") + "</h4>";
            for (var b in Craft.routes.tokens)a += '<div class="token" data-name="' +
                b + '" data-value="' + Craft.routes.tokens[b] + '"><span>' + b + "</span></div>";
            var c = '<form class="modal fitted route-settings" accept-charset="UTF-8"><div class="header"><h1></h1></div><div class="body"><div class="field"><div class="heading"><label for="url">' + Craft.t("If the URI looks like this") + ":</label></div>";
            Craft.routes.locales && (c += '<table class="inputs fullwidth"><tr><td>');
            c += '<div id="url" class="text url ltr"></div>';
            if (Craft.routes.locales) {
                c += '</td><td class="thin"><div class="select"><select class="locale"><option value="">' +
                    Craft.t("Global") + "</option>";
                for (b = 0; b < Craft.routes.locales.length; b++)var e = Craft.routes.locales[b], c = c + ('<option value="' + e + '">' + e + "</option>");
                c += "</select></div></td></tr></table>"
            }
            c += '<div class="url-tokens">' + a + '</div></div><div class="field"><div class="heading"><label for="template">' + Craft.t("Load this template") + ':</label></div><input id="template" type="text" class="text fullwidth template ltr"></div></div><div class="footer"><div class="buttons right last"><input type="button" class="btn cancel" value="' +
                Craft.t("Cancel") + '"><input type="submit" class="btn submit" value="' + Craft.t("Save") + '"> <div class="spinner" style="display: none;"></div></div><a class="delete">' + Craft.t("Delete") + "</a></div></form>";
            a = d(c).appendTo(Garnish.$bod);
            this.$heading = a.find("h1:first");
            this.$localeInput = a.find(".locale:first");
            this.$urlInput = a.find(".url:first");
            this.$templateInput = a.find(".template:first");
            this.$saveBtn = a.find(".submit:first");
            this.$cancelBtn = a.find(".cancel:first");
            this.$spinner = a.find(".spinner:first");
            this.$deleteBtn = a.find(".delete:first");
            this.route || this.$deleteBtn.hide();
            this.urlInput = new Garnish.MixedInput(this.$urlInput, {dir: "ltr"});
            this.route ? this.$heading.html(Craft.t("Edit Route")) : this.$heading.html(Craft.t("Create a new route"));
            if (this.route) {
                this.$localeInput.val(this.route.locale);
                c = this.route.$url.prop("childNodes");
                for (b = 0; b < c.length; b++)e = c[b], Garnish.isTextNode(e) ? this.urlInput.addTextElement().setVal(e.nodeValue) : this.addUrlVar(e);
                setTimeout(d.proxy(function () {
                    var a = this.urlInput.elements[0];
                    this.urlInput.setFocus(a);
                    this.urlInput.setCarotPos(a, 0)
                }, this), 1);
                b = this.route.$template.text();
                this.$templateInput.val(b)
            } else setTimeout(d.proxy(function () {
                this.$urlInput.focus()
            }, this), 100);
            this.base(a);
            b = this.$container.find(".url-tokens").children("div");
            this.addListener(b, "mousedown", function (a) {
                this.addUrlVar(a.currentTarget)
            });
            this.addListener(this.$container, "submit", "saveRoute");
            this.addListener(this.$cancelBtn, "click", "cancel");
            this.addListener(this.$deleteBtn, "click", "deleteRoute")
        },
        addUrlVar: function (a) {
            var b = d(a).clone().attr("tabindex", "0");
            this.urlInput.addElement(b);
            this.addListener(b, "keydown", function (a) {
                switch (a.keyCode) {
                    case Garnish.LEFT_KEY:
                        setTimeout(d.proxy(function () {
                            this.urlInput.focusPreviousElement(b)
                        }, this), 1);
                        break;
                    case Garnish.RIGHT_KEY:
                        setTimeout(d.proxy(function () {
                            this.urlInput.focusNextElement(b)
                        }, this), 1);
                        break;
                    case Garnish.DELETE_KEY:
                        setTimeout(d.proxy(function () {
                            this.urlInput.removeElement(b)
                        }, this), 1), a.preventDefault()
                }
            })
        },
        show: function () {
            this.route &&
            (this.$heading.html(Craft.t("Edit Route")), this.$deleteBtn.show());
            this.base()
        },
        saveRoute: function (a) {
            a.preventDefault();
            if (!this.loading) {
                a = {locale: this.$localeInput.val()};
                this.route && (a.routeId = this.route.id);
                for (var b = 0; b < this.urlInput.elements.length; b++) {
                    var c = this.urlInput.elements[b];
                    this.urlInput.isText(c) ? a["url[" + b + "]"] = c.val() : (a["url[" + b + "][0]"] = c.attr("data-name"), a["url[" + b + "][1]"] = c.attr("data-value"))
                }
                a.template = this.$templateInput.val();
                this.loading = !0;
                this.$saveBtn.addClass("active");
                this.$spinner.show();
                Craft.postActionRequest("routes/saveRoute", a, d.proxy(function (a, b) {
                    this.$saveBtn.removeClass("active");
                    this.$spinner.hide();
                    this.loading = !1;
                    if ("success" == b)if (a.success) {
                        if (!this.route) {
                            var c = '<div class="pane route" data-id="' + a.routeId + '"' + (a.locale ? ' data-locale="' + a.locale + '"' : "") + '><div class="url-container">';
                            Craft.routes.locales && (c += '<span class="locale"></span>');
                            c = d(c + '<span class="url" dir="ltr"></span></div><div class="template" dir="ltr"></div></div>');
                            c.appendTo("#routes");
                            this.route = new f(c);
                            this.route.modal = this;
                            Craft.routes.sorter.addItems(c);
                            1 == Craft.routes.sorter.$items.length && d("#noroutes").addClass("hidden")
                        }
                        this.route.locale = a.locale;
                        this.route.updateHtmlFromModal();
                        this.hide();
                        Craft.cp.displayNotice(Craft.t("Route saved."))
                    } else Craft.cp.displayError(Craft.t("Couldn\u2019t save route."))
                }, this))
            }
        },
        cancel: function () {
            this.hide();
            this.route && (this.route.modal = null)
        },
        deleteRoute: function () {
            confirm(Craft.t("Are you sure you want to delete this route?")) && (Craft.postActionRequest("routes/deleteRoute",
                {routeId: this.route.id}, function (a, b) {
                    "success" == b && Craft.cp.displayNotice(Craft.t("Route deleted."))
                }), Craft.routes.sorter.removeItems(this.route.$container), this.route.$container.remove(), this.hide(), 0 == Craft.routes.sorter.$items.length && d("#noroutes").removeClass("hidden"))
        }
    });
    Craft.routes = new h
})(jQuery);

//# sourceMappingURL=routes.min.map
