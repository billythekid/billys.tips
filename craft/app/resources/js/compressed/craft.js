/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (c) {
    c.extend(Craft, {
        navHeight: 48, asciiCharMap: {
            216: "O",
            223: "ss",
            224: "a",
            225: "a",
            226: "a",
            229: "a",
            227: "ae",
            230: "ae",
            228: "ae",
            231: "c",
            232: "e",
            233: "e",
            234: "e",
            235: "e",
            236: "i",
            237: "i",
            238: "i",
            239: "i",
            241: "n",
            242: "o",
            243: "o",
            244: "o",
            245: "o",
            246: "oe",
            248: "o",
            249: "u",
            250: "u",
            251: "u",
            252: "ue",
            255: "y",
            257: "aa",
            269: "ch",
            275: "ee",
            291: "gj",
            299: "ii",
            311: "kj",
            316: "lj",
            326: "nj",
            353: "sh",
            363: "uu",
            382: "zh",
            256: "aa",
            268: "ch",
            274: "ee",
            290: "gj",
            298: "ii",
            310: "kj",
            315: "lj",
            325: "nj",
            337: "o",
            352: "sh",
            362: "uu",
            369: "u",
            381: "zh",
            260: "A",
            261: "a",
            262: "C",
            263: "c",
            280: "E",
            281: "e",
            321: "L",
            322: "l",
            323: "N",
            324: "n",
            211: "O",
            346: "S",
            347: "s",
            377: "Z",
            378: "z",
            379: "Z",
            380: "z",
            388: "z"
        }, t: function (a, b) {
            "undefined" != typeof Craft.translations[a] && (a = Craft.translations[a]);
            if (b)for (var d in b)a = a.replace("{" + d + "}", b[d]);
            return a
        }, formatDate: function (a) {
            "object" != typeof a && (a = new Date(a));
            return c.datepicker.formatDate(Craft.datepickerOptions.dateFormat, a)
        }, escapeHtml: function (a) {
            return c("<div/>").text(a).html()
        }, getText: function (a) {
            return c("<div/>").html(a).text()
        },
        encodeUriComponent: function (a) {
            a = encodeURIComponent(a);
            var b = {"!": "%21", "*": "%2A", "'": "%27", "(": "%28", ")": "%29"}, d;
            for (d in b)a = a.replace(RegExp("\\" + d, "g"), b[d]);
            return a
        }, formatInputId: function (a) {
            return this.rtrim(a.replace(/[\[\]]+/g, "-"), "-")
        }, getUrl: function (a, b, d) {
            "string" != typeof a && (a = "");
            if (-1 != a.search("://") || "//" == a.substr(0, 2))return a;
            a = Craft.trim(a, "/");
            var e = "";
            if (c.isPlainObject(b)) {
                var f = [], g;
                for (g in b) {
                    var h = b[g];
                    "#" == g ? e = h : null !== h && "" !== h && f.push(g + "=" + h)
                }
                b = f
            }
            b = Garnish.isArray(b) ?
                b.join("&") : Craft.trim(b, "&?");
            f = a.indexOf("?");
            -1 != f && (b = a.substr(f + 1) + (b ? "&" + b : ""), a = a.substr(0, f));
            d ? a && (f = d.match(/[&\?]p=[^&]+/)) && (d = d.replace(f[0], f[0] + "/" + a), a = "") : d = Craft.baseUrl;
            f = d.indexOf("?");
            "-1" != f && (b = d.substr(f + 1) + (b ? "&" + b : ""), d = d.substr(0, f));
            !Craft.omitScriptNameInUrls && a && (Craft.usePathInfo ? -1 == d.search(Craft.scriptName) && (d = Craft.rtrim(d, "/") + "/" + Craft.scriptName) : (b && "p=" == b.substr(0, 2) && (f = b.indexOf("&"), -1 != f ? (g = b.substring(2, f), b = b.substr(f + 1)) : (g = b.substr(2), b = null), g = Craft.rtrim(g),
                a = g + (a ? "/" + a : "")), b = "p=" + a + (b ? "&" + b : ""), a = null));
            a && (d = Craft.rtrim(d, "/") + "/" + a);
            b && (d += "?" + b);
            e && (d += "#" + e);
            return d
        }, getCpUrl: function (a, b) {
            return this.getUrl(a, b, Craft.baseCpUrl)
        }, getSiteUrl: function (a, b) {
            return this.getUrl(a, b, Craft.baseSiteUrl)
        }, getResourceUrl: function (a, b) {
            return Craft.getUrl(a, b, Craft.resourceUrl)
        }, getActionUrl: function (a, b) {
            return Craft.getUrl(a, b, Craft.actionUrl)
        }, redirectTo: function (a) {
            document.location.href = this.getUrl(a)
        }, getCsrfInput: function () {
            return Craft.csrfTokenName ?
            '<input type="hidden" name="' + Craft.csrfTokenName + '" value="' + Craft.csrfTokenValue + '"/>' : ""
        }, postActionRequest: function (a, b, d, e) {
            "function" == typeof b && (e = d, d = b, b = {});
            Craft.csrfTokenValue && Craft.csrfTokenName && ("string" == typeof b ? (b && (b += "&"), b += Craft.csrfTokenName + "=" + Craft.csrfTokenValue) : (b = null === b || "object" !== typeof b ? {} : c.extend({}, b), b[Craft.csrfTokenName] = Craft.csrfTokenValue));
            a = c.ajax(c.extend({
                url: Craft.getActionUrl(a), type: "POST", data: b, success: d, error: function (a, b, c) {
                    d && d(null, b, a)
                }, complete: function (a,
                                       b) {
                    "success" != b && ("undefined" != typeof Craft.cp ? Craft.cp.displayError() : alert(Craft.t("An unknown error occurred.")))
                }
            }, e));
            e && "function" == typeof e.send && e.send(a);
            return a
        }, _waitingOnAjax: !1, _ajaxQueue: [], queueActionRequest: function (a, b, d, c) {
            "function" == typeof b && (c = d, d = b, b = void 0);
            Craft._ajaxQueue.push([a, b, d, c]);
            Craft._waitingOnAjax || Craft._postNextActionRequestInQueue()
        }, _postNextActionRequestInQueue: function () {
            Craft._waitingOnAjax = !0;
            var a = Craft._ajaxQueue.shift();
            Craft.postActionRequest(a[0],
                a[1], function (b, d, c) {
                    if (a[2] && "function" == typeof a[2])a[2](b, d, c);
                    Craft._ajaxQueue.length ? Craft._postNextActionRequestInQueue() : Craft._waitingOnAjax = !1
                }, a[3])
        }, stringToArray: function (a) {
            if ("string" != typeof a)return a;
            a = a.split(",");
            for (var b = 0; b < a.length; b++)a[b] = c.trim(a[b]);
            return a
        }, expandPostArray: function (a) {
            var b = {}, d;
            for (d in a) {
                var c = a[d], f = d.match(/^(\w+)(\[.*)?/);
                if (f[2])for (var g = f[2].match(/\[[^\[\]]*\]/g), h = 0; h < g.length; h++)g[h] = g[h].substring(1, g[h].length - 1); else g = [];
                g.unshift(f[1]);
                f = b;
                for (h = 0; h < g.length; h++)h < g.length - 1 ? ("object" != typeof f[g[h]] && (g[h + 1] && parseInt(g[h + 1]) != g[h + 1] ? f[g[h]] = {} : f[g[h]] = []), f = f[g[h]]) : (g[h] || (g[h] = f.length), f[g[h]] = c)
            }
            return b
        }, compare: function (a, b) {
            if (typeof a != typeof b)return !1;
            if ("object" == typeof a) {
                if (a.length != b.length || a instanceof Array != b instanceof Array || !(a instanceof Array || Craft.compare(Craft.getObjectKeys(a), Craft.getObjectKeys(b))))return !1;
                for (var d in a)if (!Craft.compare(a[d], b[d]))return !1;
                return !0
            }
            return a === b
        }, getObjectKeys: function (a) {
            var b =
                [], d;
            for (d in a)b.push(d);
            return b
        }, escapeChars: function (a) {
            Garnish.isArray(a) || (a = a.split());
            for (var b = "", d = 0; d < a.length; d++)b += "\\" + a[d];
            return b
        }, ltrim: function (a, b) {
            if (!a)return a;
            void 0 === b && (b = " \t\n\r\x00\x0B");
            var d = RegExp("^[" + Craft.escapeChars(b) + "]+");
            return a.replace(d, "")
        }, rtrim: function (a, b) {
            if (!a)return a;
            void 0 === b && (b = " \t\n\r\x00\x0B");
            var d = RegExp("[" + Craft.escapeChars(b) + "]+$");
            return a.replace(d, "")
        }, trim: function (a, b) {
            a = Craft.ltrim(a, b);
            return a = Craft.rtrim(a, b)
        }, filterArray: function (a,
                                  b) {
            for (var d = [], c = 0; c < a.length; c++)("function" == typeof b ? b(a[c], c) : a[c]) && d.push(a[c]);
            return d
        }, inArray: function (a, b) {
            return -1 != c.inArray(a, b)
        }, removeFromArray: function (a, b) {
            var d = c.inArray(a, b);
            return -1 != d ? (b.splice(d, 1), !0) : !1
        }, getLast: function (a) {
            return a.length ? a[a.length - 1] : null
        }, uppercaseFirst: function (a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        }, lowercaseFirst: function (a) {
            return a.charAt(0).toLowerCase() + a.slice(1)
        }, secondsToHumanTimeDuration: function (a, b) {
            "undefined" == typeof b && (b = !0);
            var d = Math.floor(a / 604800);
            a %= 604800;
            var c = Math.floor(a / 86400);
            a %= 86400;
            var f = Math.floor(a / 3600);
            a %= 3600;
            if (b) {
                var g = Math.floor(a / 60);
                a %= 60
            } else g = Math.round(a / 60), a = 0;
            timeComponents = [];
            d && timeComponents.push(d + " " + (1 == d ? Craft.t("week") : Craft.t("weeks")));
            c && timeComponents.push(c + " " + (1 == c ? Craft.t("day") : Craft.t("days")));
            f && timeComponents.push(f + " " + (1 == f ? Craft.t("hour") : Craft.t("hours")));
            !g && (b || d || c || f) || timeComponents.push(g + " " + (1 == g ? Craft.t("minute") : Craft.t("minutes")));
            (a || b && !(d || c || f ||
            g)) && timeComponents.push(a + " " + (1 == a ? Craft.t("second") : Craft.t("seconds")));
            return timeComponents.join(", ")
        }, asciiString: function (a) {
            for (var b = "", d = 0; d < a.length; d++) {
                var c = a.charCodeAt(d);
                32 <= c && 128 > c ? b += a.charAt(d) : "undefined" != typeof Craft.asciiCharMap[c] && (b += Craft.asciiCharMap[c])
            }
            return b
        }, preventOutlineOnMouseFocus: function (a) {
            var b = c(a);
            b.on("mousedown.preventOutlineOnMouseFocus", function () {
                b.addClass("no-outline");
                b.focus()
            }).on("keydown.preventOutlineOnMouseFocus blur.preventOutlineOnMouseFocus",
                function (a) {
                    a.keyCode != Garnish.SHIFT_KEY && a.keyCode != Garnish.CTRL_KEY && a.keyCode != Garnish.CMD_KEY && b.removeClass("no-outline")
                })
        }, createErrorList: function (a) {
            for (var b = c(document.createElement("ul")).addClass("errors"), d = 0; d < a.length; d++) {
                var e = c(document.createElement("li"));
                e.appendTo(b);
                e.html(a[d])
            }
            return b
        }, appendHeadHtml: function (a) {
            if (a) {
                var b = c("link[href]");
                if (b.length) {
                    for (var d = [], e = 0; e < b.length; e++) {
                        var f = b.eq(e).attr("href");
                        d.push(f.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"))
                    }
                    b = RegExp('<link\\s[^>]*href="(?:' +
                        d.join("|") + ')".*?>\x3c/script>', "g");
                    a = a.replace(b, "")
                }
                c("head").append(a)
            }
        }, appendFootHtml: function (a) {
            if (a) {
                var b = c("script[src]");
                if (b.length) {
                    for (var d = [], e = 0; e < b.length; e++) {
                        var f = b.eq(e).attr("src");
                        d.push(f.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"))
                    }
                    b = RegExp('<script\\s[^>]*src="(?:' + d.join("|") + ')".*?>\x3c/script>', "g");
                    a = a.replace(b, "")
                }
                Garnish.$bod.append(a)
            }
        }, initUiElements: function (a) {
            c(".grid", a).grid();
            c(".pane", a).pane();
            c(".info", a).infoicon();
            c(".checkbox-select", a).checkboxselect();
            c(".fieldtoggle", a).fieldtoggle();
            c(".lightswitch", a).lightswitch();
            c(".nicetext", a).nicetext();
            c(".pill", a).pill();
            c(".formsubmit", a).formsubmit();
            c(".menubtn", a).menubtn()
        }, _elementIndexClasses: {}, _elementSelectorModalClasses: {}, registerElementIndexClass: function (a, b) {
            if ("undefined" != typeof this._elementIndexClasses[a])throw"An element index class has already been registered for the element type \u201c" + a + "\u201d.";
            this._elementIndexClasses[a] = b
        }, registerElementSelectorModalClass: function (a, b) {
            if ("undefined" != typeof this._elementSelectorModalClasses[a])throw"An element selector modal class has already been registered for the element type \u201c" + a + "\u201d.";
            this._elementSelectorModalClasses[a] = b
        }, createElementIndex: function (a, b, d) {
            return new ("undefined" != typeof this._elementIndexClasses[a] ? this._elementIndexClasses[a] : Craft.BaseElementIndex)(a, b, d)
        }, createElementSelectorModal: function (a, b) {
            return new ("undefined" != typeof this._elementSelectorModalClasses[a] ? this._elementSelectorModalClasses[a] : Craft.BaseElementSelectorModal)(a,
                b)
        }, getLocalStorage: function (a, b) {
            a = "Craft-" + Craft.siteUid + "." + a;
            return "undefined" != typeof localStorage && "undefined" != typeof localStorage[a] ? JSON.parse(localStorage[a]) : b
        }, setLocalStorage: function (a, b) {
            if ("undefined" != typeof localStorage) {
                a = "Craft-" + Craft.siteUid + "." + a;
                try {
                    localStorage[a] = JSON.stringify(b)
                } catch (d) {
                }
            }
        }, getElementInfo: function (a) {
            a = c(a);
            a.hasClass("element") || (a = a.find(".element:first"));
            return {
                id: a.data("id"),
                locale: a.data("locale"),
                label: a.data("label"),
                status: a.data("status"),
                url: a.data("url"),
                hasThumb: a.hasClass("hasthumb"),
                $element: a
            }
        }, setElementSize: function (a, b) {
            var d = c(a);
            "small" != b && "large" != b && (b = "small");
            if (!d.hasClass(b)) {
                var e = "small" == b ? "large" : "small";
                d.addClass(b).removeClass(e);
                d.hasClass("hasthumb") && (d = d.find("> .elementthumb > img"), $newImg = c("<img/>", {
                    sizes: ("small" == b ? "30" : "100") + "px",
                    srcset: d.attr("srcset") || d.attr("data-pfsrcset")
                }), d.replaceWith($newImg), picturefill({elements: [$newImg[0]]}))
            }
        }, showElementEditor: function (a, b) {
            if (Garnish.hasAttr(a, "data-editable") && !a.hasClass("disabled") && !a.hasClass("loading"))return new Craft.ElementEditor(a, b)
        }
    });
    c.extend(c.fn, {
        animateLeft: function (a, b, d, c) {
            return "ltr" == Craft.orientation ? this.velocity({left: a}, b, d, c) : this.velocity({right: a}, b, d, c)
        }, animateRight: function (a, b, d, c) {
            return "ltr" == Craft.orientation ? this.velocity({right: a}, b, d, c) : this.velocity({left: a}, b, d, c)
        }, disable: function () {
            return this.each(function () {
                var a = c(this);
                a.addClass("disabled");
                a.data("activatable") && a.removeAttr("tabindex")
            })
        }, enable: function () {
            return this.each(function () {
                var a =
                    c(this);
                a.removeClass("disabled");
                a.data("activatable") && a.attr("tabindex", "0")
            })
        }, grid: function () {
            return this.each(function () {
                var a = c(this), b = {};
                a.data("item-selector") && (b.itemSelector = a.data("item-selector"));
                a.data("cols") && (b.cols = parseInt(a.data("cols")));
                a.data("max-cols") && (b.maxCols = parseInt(a.data("max-cols")));
                a.data("min-col-width") && (b.minColWidth = parseInt(a.data("min-col-width")));
                a.data("mode") && (b.mode = a.data("mode"));
                a.data("fill-mode") && (b.fillMode = a.data("fill-mode"));
                a.data("col-class") &&
                (b.colClass = a.data("col-class"));
                a.data("snap-to-grid") && (b.snapToGrid = !!a.data("snap-to-grid"));
                new Craft.Grid(this, b)
            })
        }, infoicon: function () {
            return this.each(function () {
                new Craft.InfoIcon(this)
            })
        }, pane: function () {
            return this.each(function () {
                c.data(this, "pane") || new Craft.Pane(this)
            })
        }, checkboxselect: function () {
            return this.each(function () {
                c.data(this, "checkboxselect") || new Garnish.CheckboxSelect(this)
            })
        }, fieldtoggle: function () {
            return this.each(function () {
                c.data(this, "fieldtoggle") || new Craft.FieldToggle(this)
            })
        },
        lightswitch: function (a, b, d) {
            return "settings" == a ? ("string" == typeof b ? (a = {}, a[b] = d) : a = b, this.each(function () {
                var b = c.data(this, "lightswitch");
                b && b.setSettings(a)
            })) : this.each(function () {
                c.data(this, "lightswitch") || new Craft.LightSwitch(this, a)
            })
        }, nicetext: function () {
            return this.each(function () {
                c.data(this, "nicetext") || new Garnish.NiceText(this)
            })
        }, pill: function () {
            return this.each(function () {
                c.data(this, "pill") || new Garnish.Pill(this)
            })
        }, formsubmit: function () {
            this.on("click", function (a) {
                a = c(a.currentTarget);
                if (!a.attr("data-confirm") || confirm(a.attr("data-confirm"))) {
                    var b = a.data("menu") ? a.data("menu").$anchor.closest("form") : a.closest("form");
                    a.attr("data-action") && c('<input type="hidden" name="action"/>').val(a.attr("data-action")).appendTo(b);
                    a.attr("data-redirect") && c('<input type="hidden" name="redirect"/>').val(a.attr("data-redirect")).appendTo(b);
                    a.attr("data-param") && c('<input type="hidden"/>').attr({
                        name: a.attr("data-param"),
                        value: a.attr("data-value")
                    }).appendTo(b);
                    b.submit()
                }
            })
        }, menubtn: function () {
            return this.each(function () {
                var a =
                    c(this);
                if (!a.data("menubtn") && a.next().hasClass("menu")) {
                    var b = {};
                    a.data("menu-anchor") && (b.menuAnchor = a.data("menu-anchor"));
                    new Garnish.MenuBtn(a, b)
                }
            })
        }
    });
    Garnish.$doc.ready(function () {
        Craft.initUiElements()
    });
    Craft.BaseElementIndex = Garnish.Base.extend({
        initialized: !1,
        elementType: null,
        instanceState: null,
        sourceStates: null,
        sourceStatesStorageKey: null,
        searchTimeout: null,
        sourceSelect: null,
        $container: null,
        $main: null,
        $mainSpinner: null,
        isIndexBusy: !1,
        $sidebar: null,
        showingSidebar: null,
        sourceKey: null,
        sourceViewModes: null,
        $source: null,
        $customizeSourcesBtn: null,
        customizeSourcesModal: null,
        $toolbar: null,
        $toolbarTableRow: null,
        toolbarOffset: null,
        $search: null,
        searching: !1,
        searchText: null,
        $clearSearchBtn: null,
        $statusMenuBtn: null,
        statusMenu: null,
        status: null,
        $localeMenuBtn: null,
        localeMenu: null,
        locale: null,
        $sortMenuBtn: null,
        sortMenu: null,
        $sortAttributesList: null,
        $sortDirectionsList: null,
        $scoreSortAttribute: null,
        $structureSortAttribute: null,
        $elements: null,
        $viewModeBtnTd: null,
        $viewModeBtnContainer: null,
        viewModeBtns: null,
        viewMode: null,
        view: null,
        _autoSelectElements: null,
        actions: null,
        actionsHeadHtml: null,
        actionsFootHtml: null,
        $selectAllContainer: null,
        $selectAllCheckbox: null,
        showingActionTriggers: !1,
        _$triggers: null,
        init: function (a, b, d) {
            this.elementType = a;
            this.$container = b;
            this.setSettings(d, Craft.BaseElementIndex.defaults);
            this.instanceState = {selectedSource: null};
            this.sourceStates = {};
            this.settings.storageKey && c.extend(this.instanceState, Craft.getLocalStorage(this.settings.storageKey), {});
            this.sourceStatesStorageKey = "BaseElementIndex." +
                this.elementType + "." + this.settings.context;
            c.extend(this.sourceStates, Craft.getLocalStorage(this.sourceStatesStorageKey, {}));
            this.$main = this.$container.find(".main");
            this.$toolbar = this.$container.find(".toolbar:first");
            this.$toolbarTableRow = this.$toolbar.children("table").children("tbody").children("tr");
            this.$statusMenuBtn = this.$toolbarTableRow.find(".statusmenubtn:first");
            this.$localeMenuBtn = this.$toolbarTableRow.find(".localemenubtn:first");
            this.$sortMenuBtn = this.$toolbarTableRow.find(".sortmenubtn:first");
            this.$search = this.$toolbarTableRow.find(".search:first input:first");
            this.$clearSearchBtn = this.$toolbarTableRow.find(".search:first > .clear");
            this.$mainSpinner = this.$toolbar.find(".spinner:first");
            this.$sidebar = this.$container.find(".sidebar:first");
            this.$customizeSourcesBtn = this.$sidebar.children(".customize-sources");
            this.$elements = this.$container.find(".elements:first");
            this.$viewModeBtnTd = this.$toolbarTableRow.find(".viewbtns:first");
            this.$viewModeBtnContainer = c('<div class="btngroup fullwidth"/>').appendTo(this.$viewModeBtnTd);
            "index" != this.settings.context || Garnish.isMobileBrowser(!0) || this.addListener(Garnish.$win, "resize,scroll", "updateFixedToolbar");
            a = this._getSourcesInList(this.$sidebar.children("nav").children("ul"));
            if (0 != a.length) {
                this.sourceSelect = new Garnish.Select(this.$sidebar.find("nav"), {
                    multi: !1,
                    allowEmpty: !1,
                    vertical: !0,
                    onSelectionChange: c.proxy(this, "_handleSourceSelectionChange")
                });
                this._initSources(a);
                this.$customizeSourcesBtn.length && this.addListener(this.$customizeSourcesBtn, "click", "createCustomizeSourcesModal");
                this.$statusMenuBtn.length && (this.statusMenu = this.$statusMenuBtn.menubtn().data("menubtn").menu, this.statusMenu.on("optionselect", c.proxy(this, "_handleStatusChange")));
                this.$localeMenuBtn.length ? (this.localeMenu = this.$localeMenuBtn.menubtn().data("menubtn").menu, a = this.localeMenu.$options.filter(".sel:first"), a.length || (a = this.localeMenu.$options.first()), a.length ? this.locale = a.data("locale") : this.settings.criteria = {id: "0"}, this.localeMenu.on("optionselect", c.proxy(this, "_handleLocaleChange")), this.locale &&
                (a = Craft.getLocalStorage("BaseElementIndex.locale")) && a != this.locale && (a = this.localeMenu.$options.filter('[data-locale="' + a + '"]:first'), a.length && a.trigger("click"))) : this.settings.criteria && this.settings.criteria.locale && (this.locale = this.settings.criteria.locale);
                this.addListener(this.$search, "textchange", c.proxy(function () {
                    !this.searching && this.$search.val() ? this.startSearching() : this.searching && !this.$search.val() && this.stopSearching();
                    this.searchTimeout && clearTimeout(this.searchTimeout);
                    this.searchTimeout =
                        setTimeout(c.proxy(this, "updateElementsIfSearchTextChanged"), 500)
                }, this));
                this.addListener(this.$search, "keypress", c.proxy(function (a) {
                    a.keyCode == Garnish.RETURN_KEY && (a.preventDefault(), this.searchTimeout && clearTimeout(this.searchTimeout), this.updateElementsIfSearchTextChanged())
                }, this));
                this.addListener(this.$clearSearchBtn, "click", c.proxy(function () {
                        this.$search.val("");
                        this.searchTimeout && clearTimeout(this.searchTimeout);
                        Garnish.isMobileBrowser(!0) || this.$search.focus();
                        this.stopSearching();
                        this.updateElementsIfSearchTextChanged()
                    },
                    this));
                Garnish.isMobileBrowser(!0) || this.$search.focus();
                this.$sortMenuBtn.length && (this.sortMenu = this.$sortMenuBtn.menubtn().data("menubtn").menu, this.$sortAttributesList = this.sortMenu.$container.children(".sort-attributes"), this.$sortDirectionsList = this.sortMenu.$container.children(".sort-directions"), this.sortMenu.on("optionselect", c.proxy(this, "_handleSortChange")));
                this.initialized = !0;
                this.afterInit();
                if (a = this.getDefaultSourceKey()) {
                    var e = this.getSourceByKey(a);
                    e && e.parentsUntil(".sidebar",
                        "li").not(":first").addClass("expanded")
                }
                a && e || (e = this.$sources.first());
                e.length && this.selectSource(e);
                this.updateElements()
            }
        },
        afterInit: function () {
            this.onAfterInit()
        },
        get $sources() {
            return this.sourceSelect ? this.sourceSelect.$items : void 0
        },
        updateFixedToolbar: function () {
            if (!this.toolbarOffset && (this.toolbarOffset = this.$toolbar.offset().top, !this.toolbarOffset))return;
            this.updateFixedToolbar._scrollTop = Garnish.$win.scrollTop();
            992 < Garnish.$win.width() && this.updateFixedToolbar._scrollTop > this.toolbarOffset -
            7 ? (this.$toolbar.hasClass("fixed") || (this.$elements.css("padding-top", this.$toolbar.outerHeight() + 24), this.$toolbar.addClass("fixed")), this.$toolbar.css("width", this.$main.width())) : this.$toolbar.hasClass("fixed") && (this.$toolbar.removeClass("fixed"), this.$toolbar.css("width", ""), this.$elements.css("padding-top", ""))
        },
        initSource: function (a) {
            this.sourceSelect.addItems(a);
            this.initSourceToggle(a)
        },
        initSourceToggle: function (a) {
            a = this._getSourceToggle(a);
            a.length && this.addListener(a, "click", "_handleSourceToggleClick")
        },
        deinitSource: function (a) {
            this.sourceSelect.removeItems(a);
            this.deinitSourceToggle(a)
        },
        deinitSourceToggle: function (a) {
            a = this._getSourceToggle(a);
            a.length && this.removeListener(a, "click")
        },
        getDefaultSourceKey: function () {
            return this.instanceState.selectedSource
        },
        startSearching: function () {
            this.$clearSearchBtn.removeClass("hidden");
            this.$scoreSortAttribute || (this.$scoreSortAttribute = c('<li><a data-attr="score">' + Craft.t("Score") + "</a></li>"), this.sortMenu.addOptions(this.$scoreSortAttribute.children()));
            this.$scoreSortAttribute.prependTo(this.$sortAttributesList);
            this.setSortAttribute("score");
            this.getSortAttributeOption("structure").addClass("disabled");
            this.searching = !0
        },
        stopSearching: function () {
            this.$clearSearchBtn.addClass("hidden");
            this.$scoreSortAttribute.detach();
            this.getSortAttributeOption("structure").removeClass("disabled");
            this.setStoredSortOptionsForSource();
            this.searching = !1
        },
        setInstanceState: function (a, b) {
            "object" == typeof a ? c.extend(this.instanceState, a) : this.instanceState[a] = b;
            this.settings.storageKey &&
            Craft.setLocalStorage(this.settings.storageKey, this.instanceState)
        },
        getSourceState: function (a, b, d) {
            "undefined" == typeof this.sourceStates[a] && (this.sourceStates[a] = {});
            return "undefined" == typeof b ? this.sourceStates[a] : "undefined" != typeof this.sourceStates[a][b] ? this.sourceStates[a][b] : "undefined" != typeof d ? d : null
        },
        getSelectedSourceState: function (a, b) {
            return this.getSourceState(this.instanceState.selectedSource, a, b)
        },
        setSelecetedSourceState: function (a, b) {
            var d = this.getSelectedSourceState();
            "object" == typeof a ? c.extend(d, a) : d[a] = b;
            this.sourceStates[this.instanceState.selectedSource] = d;
            Craft.setLocalStorage(this.sourceStatesStorageKey, this.sourceStates)
        },
        storeSortAttributeAndDirection: function () {
            var a = this.getSelectedSortAttribute();
            "score" != a && this.setSelecetedSourceState({order: a, sort: this.getSelectedSortDirection()})
        },
        getViewParams: function () {
            var a = c.extend({
                status: this.status,
                locale: this.locale,
                search: this.searchText,
                limit: this.settings.batchSize
            }, this.settings.criteria), a = {
                context: this.settings.context,
                elementType: this.elementType,
                source: this.instanceState.selectedSource,
                criteria: a,
                disabledElementIds: this.settings.disabledElementIds,
                viewState: this.getSelectedSourceState()
            };
            a.viewState.order = this.getSelectedSortAttribute();
            a.viewState.sort = this.getSelectedSortDirection();
            "structure" == this.getSelectedSortAttribute() && (a.collapsedElementIds = this.instanceState.collapsedElementIds);
            return a
        },
        updateElements: function () {
            if (this.initialized) {
                this.setIndexBusy();
                var a = this.getViewParams();
                Craft.postActionRequest("elementIndex/getElements",
                    a, c.proxy(function (b, d) {
                        this.setIndexAvailable();
                        "success" == d ? this._updateView(a, b) : Craft.cp.displayError(Craft.t("An unknown error occurred."))
                    }, this))
            }
        },
        updateElementsIfSearchTextChanged: function () {
            this.searchText !== (this.searchText = this.searching ? this.$search.val() : null) && this.updateElements()
        },
        showActionTriggers: function () {
            this.showingActionTriggers || (this.$toolbar.css("min-height", this.$toolbar.height()), this.$toolbarTableRow.children().not(this.$selectAllContainer).addClass("hidden"), this._$triggers ?
                this._$triggers.insertAfter(this.$selectAllContainer) : this._createTriggers(), this.showingActionTriggers = !0)
        },
        submitAction: function (a, b) {
            var d = this.view.getSelectedElementIds();
            if (0 != d.length) {
                for (var e = 0; e < this.actions.length; e++)if (this.actions[e].handle == a) {
                    var f = this.actions[e];
                    break
                }
                if (f && (!f.confirm || confirm(f.confirm))) {
                    var g = this.getViewParams(), e = c.extend(g, b, {elementAction: a, elementIds: d});
                    this.setIndexBusy();
                    this._autoSelectElements = d;
                    Craft.postActionRequest("elementIndex/performAction",
                        e, c.proxy(function (a, b) {
                            this.setIndexAvailable();
                            "success" == b && (a.success ? (this._updateView(g, a), a.message && Craft.cp.displayNotice(a.message), Craft.cp.runPendingTasks()) : Craft.cp.displayError(a.message))
                        }, this))
                }
            }
        },
        hideActionTriggers: function () {
            this.showingActionTriggers && (this._$triggers.detach(), this.$toolbarTableRow.children().not(this.$selectAllContainer).removeClass("hidden"), this.$toolbar.css("min-height", ""), this.showingActionTriggers = !1)
        },
        updateActionTriggers: function () {
            if (this.actions) {
                var a =
                    this.view.getSelectedElements().length;
                0 != a ? (a == this.view.getEnabledElements().length ? (this.$selectAllCheckbox.removeClass("indeterminate"), this.$selectAllCheckbox.addClass("checked")) : (this.$selectAllCheckbox.addClass("indeterminate"), this.$selectAllCheckbox.removeClass("checked")), this.showActionTriggers()) : (this.$selectAllCheckbox.removeClass("indeterminate checked"), this.hideActionTriggers())
            }
        },
        getSelectedElements: function () {
            return this.view ? this.view.getSelectedElements() : c()
        },
        getSelectedElementIds: function () {
            return this.view ?
                this.view.getSelectedElementIds() : []
        },
        getSortAttributeOption: function (a) {
            return this.$sortAttributesList.find('a[data-attr="' + a + '"]:first')
        },
        getSelectedSortAttribute: function () {
            return this.$sortAttributesList.find("a.sel:first").data("attr")
        },
        setSortAttribute: function (a) {
            var b = this.getSortAttributeOption(a);
            b.length && (this.$sortAttributesList.find("a.sel").removeClass("sel"), b.addClass("sel"), b = b.text(), this.$sortMenuBtn.attr("title", Craft.t("Sort by {attribute}", {attribute: b})), this.$sortMenuBtn.text(b),
                this.setSortDirection("asc"), "score" == a || "structure" == a ? this.$sortDirectionsList.find("a").addClass("disabled") : this.$sortDirectionsList.find("a").removeClass("disabled"))
        },
        getSortDirectionOption: function (a) {
            return this.$sortDirectionsList.find("a[data-dir=" + a + "]:first")
        },
        getSelectedSortDirection: function () {
            return this.$sortDirectionsList.find("a.sel:first").data("dir")
        },
        getSelectedViewMode: function () {
            return this.getSelectedSourceState("mode")
        },
        setSortDirection: function (a) {
            "desc" != a && (a = "asc");
            this.$sortMenuBtn.attr("data-icon",
                a);
            this.$sortDirectionsList.find("a.sel").removeClass("sel");
            this.getSortDirectionOption(a).addClass("sel")
        },
        getSourceByKey: function (a) {
            if (this.$sources && (a = this.$sources.filter('[data-key="' + a + '"]:first'), a.length))return a
        },
        selectSource: function (a) {
            if (!a || !a.length || this.$source && this.$source[0] && this.$source[0] == a[0])return !1;
            this.$source = a;
            this.sourceKey = a.data("key");
            this.setInstanceState("selectedSource", this.sourceKey);
            a[0] != this.sourceSelect.$selectedItems[0] && this.sourceSelect.selectItem(a);
            Craft.cp.updateSidebarMenuLabel();
            this.searching && (this.searchText = null, this.$search.val(""), this.stopSearching());
            Garnish.hasAttr(this.$source, "data-has-structure") ? (this.$structureSortAttribute || (this.$structureSortAttribute = c('<li><a data-attr="structure">' + Craft.t("Structure") + "</a></li>"), this.sortMenu.addOptions(this.$structureSortAttribute.children())), this.$structureSortAttribute.prependTo(this.$sortAttributesList)) : this.$structureSortAttribute && this.$structureSortAttribute.removeClass("sel").detach();
            this.setStoredSortOptionsForSource();
            this.$viewModeBtnContainer.empty();
            this.viewModeBtns = {};
            this.viewMode = null;
            this.sourceViewModes = this.getViewModesForSource();
            if (1 < this.sourceViewModes.length)for (this.$viewModeBtnTd.removeClass("hidden"), a = 0; a < this.sourceViewModes.length; a++) {
                var b = this.sourceViewModes[a], d = c('<div data-view="' + b.mode + '" role="button" class="btn' + ("undefined" != typeof b.className ? " " + b.className : "") + '" title="' + b.title + '"' + ("undefined" != typeof b.icon ? ' data-icon="' + b.icon + '"' : "") +
                    "/>").appendTo(this.$viewModeBtnContainer);
                this.viewModeBtns[b.mode] = d;
                this.addListener(d, "click", {mode: b.mode}, function (a) {
                    this.selectViewMode(a.data.mode);
                    this.updateElements()
                })
            } else this.$viewModeBtnTd.addClass("hidden");
            (b = this.getSelectedViewMode()) && this.doesSourceHaveViewMode(b) || (b = this.viewMode && this.doesSourceHaveViewMode(this.viewMode) ? this.viewMode : this.sourceViewModes[0].mode);
            this.selectViewMode(b);
            this.onSelectSource();
            return !0
        },
        selectSourceByKey: function (a) {
            return (a = this.getSourceByKey(a)) ?
                this.selectSource(a) : !1
        },
        setStoredSortOptionsForSource: function () {
            this.setSortAttribute();
            this.setSortDirection("asc");
            var a = this.getSelectedSourceState("order"), b = this.getSelectedSourceState("sort");
            a || (a = this.getDefaultSort(), Garnish.isArray(a) && (b = a[1], a = a[0]));
            "asc" != b && "desc" != b && (b = "asc");
            this.setSortAttribute(a);
            this.setSortDirection(b)
        },
        getDefaultSort: function () {
            return this.$source && Garnish.hasAttr(this.$source, "data-default-sort") ? this.$source.attr("data-default-sort").split(":") : [this.$sortAttributesList.find("a:first").data("attr"),
                "asc"]
        },
        getViewModesForSource: function () {
            var a = [{mode: "table", title: Craft.t("Display in a table"), icon: "list"}];
            this.$source && Garnish.hasAttr(this.$source, "data-has-thumbs") && a.push({
                mode: "thumbs",
                title: Craft.t("Display as thumbnails"),
                icon: "grid"
            });
            return a
        },
        doesSourceHaveViewMode: function (a) {
            for (var b = 0; b < this.sourceViewModes.length; b++)if (this.sourceViewModes[b].mode == a)return !0;
            return !1
        },
        selectViewMode: function (a, b) {
            b || this.doesSourceHaveViewMode(a) || (a = this.sourceViewModes[0].mode);
            a != this.viewMode &&
            (this.viewMode && "undefined" != typeof this.viewModeBtns[this.viewMode] && this.viewModeBtns[this.viewMode].removeClass("active"), this.viewMode = a, this.setSelecetedSourceState("mode", this.viewMode), "undefined" != typeof this.viewModeBtns[this.viewMode] && this.viewModeBtns[this.viewMode].addClass("active"))
        },
        createView: function (a, b) {
            return new (this.getViewClass(a))(this, this.$elements, b)
        },
        getViewClass: function (a) {
            switch (a) {
                case "table":
                    return Craft.TableElementIndexView;
                case "thumbs":
                    return Craft.ThumbsElementIndexView;
                default:
                    throw'View mode\u00a0"' + a + '" not supported.';
            }
        },
        rememberDisabledElementId: function (a) {
            -1 == c.inArray(a, this.settings.disabledElementIds) && this.settings.disabledElementIds.push(a)
        },
        forgetDisabledElementId: function (a) {
            a = c.inArray(a, this.settings.disabledElementIds);
            -1 != a && this.settings.disabledElementIds.splice(a, 1)
        },
        enableElements: function (a) {
            a.removeClass("disabled").parents(".disabled").removeClass("disabled");
            for (var b = 0; b < a.length; b++) {
                var d = c(a[b]).data("id");
                this.forgetDisabledElementId(d)
            }
            this.onEnableElements(a)
        },
        disableElements: function (a) {
            a.removeClass("sel").addClass("disabled");
            for (var b = 0; b < a.length; b++) {
                var d = c(a[b]).data("id");
                this.rememberDisabledElementId(d)
            }
            this.onDisableElements(a)
        },
        getElementById: function (a) {
            return this.view.getElementById(a)
        },
        enableElementsById: function (a) {
            a = c.makeArray(a);
            for (var b = 0; b < a.length; b++) {
                var d = a[b], e = this.getElementById(d);
                e && e.length ? this.enableElements(e) : this.forgetDisabledElementId(d)
            }
        },
        disableElementsById: function (a) {
            a = c.makeArray(a);
            for (var b = 0; b < a.length; b++) {
                var d =
                    a[b], e = this.getElementById(d);
                e && e.length ? this.disableElements(e) : this.rememberDisabledElementId(d)
            }
        },
        selectElementAfterUpdate: function (a) {
            null === this._autoSelectElements && (this._autoSelectElements = []);
            this._autoSelectElements.push(a)
        },
        addButton: function (a) {
            this.getButtonContainer().append(a)
        },
        isShowingSidebar: function () {
            null === this.showingSidebar && (this.showingSidebar = this.$sidebar.length && !this.$sidebar.hasClass("hidden"));
            return this.showingSidebar
        },
        getButtonContainer: function () {
            if (this.settings.buttonContainer)return c(this.settings.buttonContainer);
            var a = c("#extra-headers > .buttons:first");
            a.length || (a = c("#extra-headers"), a.length || (a = c('<div id="extra-headers"/>').appendTo(c("#page-header"))), a = c('<div class="buttons right"/>').appendTo(a));
            return a
        },
        setIndexBusy: function () {
            this.$mainSpinner.removeClass("hidden");
            this.isIndexBusy = !0
        },
        setIndexAvailable: function () {
            this.$mainSpinner.addClass("hidden");
            this.isIndexBusy = !1
        },
        createCustomizeSourcesModal: function () {
            var a = new Craft.CustomizeSourcesModal(this, {
                onHide: function () {
                    a.destroy();
                    delete a
                }
            });
            return a
        },
        disable: function () {
            this.sourceSelect && this.sourceSelect.disable();
            this.view && this.view.disable();
            this.base()
        },
        enable: function () {
            this.sourceSelect && this.sourceSelect.enable();
            this.view && this.view.enable();
            this.base()
        },
        onAfterInit: function () {
            this.settings.onAfterInit();
            this.trigger("afterInit")
        },
        onSelectSource: function () {
            this.settings.onSelectSource(this.sourceKey);
            this.trigger("selectSource", {sourceKey: this.sourceKey})
        },
        onUpdateElements: function () {
            this.settings.onUpdateElements();
            this.trigger("updateElements")
        },
        onSelectionChange: function () {
            this.settings.onSelectionChange();
            this.trigger("selectionChange")
        },
        onEnableElements: function (a) {
            this.settings.onEnableElements(a);
            this.trigger("enableElements", {elements: a})
        },
        onDisableElements: function (a) {
            this.settings.onDisableElements(a);
            this.trigger("disableElements", {elements: a})
        },
        _handleSourceSelectionChange: function () {
            this.sourceSelect.totalSelected ? this.selectSource(this.sourceSelect.$selectedItems) && this.updateElements() : this.sourceSelect.selectItem(this.$sources.first())
        },
        _handleActionTriggerSubmit: function (a) {
            a.preventDefault();
            var b = c(a.currentTarget);
            b.hasClass("disabled") || b.data("custom-handler") || (a = b.data("action"), b = Garnish.getPostData(b), this.submitAction(a, b))
        },
        _handleMenuActionTriggerSubmit: function (a) {
            a = c(a.option);
            a.hasClass("disabled") || a.data("custom-handler") || (a = a.data("action"), this.submitAction(a))
        },
        _handleStatusChange: function (a) {
            this.statusMenu.$options.removeClass("sel");
            a = c(a.selectedOption).addClass("sel");
            this.$statusMenuBtn.html(a.html());
            this.status = a.data("status");
            this.updateElements()
        },
        _handleLocaleChange: function (a) {
            this.localeMenu.$options.removeClass("sel");
            a = c(a.selectedOption).addClass("sel");
            this.$localeMenuBtn.html(a.html());
            this.locale = a.data("locale");
            this.initialized && (Craft.setLocalStorage("BaseElementIndex.locale", this.locale), this.updateElements())
        },
        _handleSortChange: function (a) {
            a = c(a.selectedOption);
            a.hasClass("disabled") || a.hasClass("sel") || (a.parent().parent().is(this.$sortAttributesList) ? this.setSortAttribute(a.data("attr")) :
                this.setSortDirection(a.data("dir")), this.storeSortAttributeAndDirection(), this.updateElements())
        },
        _handleSelectionChange: function () {
            this.updateActionTriggers();
            this.onSelectionChange()
        },
        _handleSourceToggleClick: function (a) {
            this._toggleSource(c(a.currentTarget).prev("a"));
            a.stopPropagation()
        },
        _getSourcesInList: function (a) {
            return a.children("li").children("a")
        },
        _getChildSources: function (a) {
            a = a.siblings("ul");
            return this._getSourcesInList(a)
        },
        _getSourceToggle: function (a) {
            return a.siblings(".toggle")
        },
        _initSources: function (a) {
            for (var b = 0; b < a.length; b++)this.initSource(c(a[b]))
        },
        _deinitSources: function (a) {
            for (var b = 0; b < a.length; b++)this.deinitSource(c(a[b]))
        },
        _toggleSource: function (a) {
            a.parent("li").hasClass("expanded") ? this._collapseSource(a) : this._expandSource(a)
        },
        _expandSource: function (a) {
            a.parent("li").addClass("expanded");
            a = this._getChildSources(a);
            this._initSources(a)
        },
        _collapseSource: function (a) {
            a.parent("li").removeClass("expanded");
            a = this._getChildSources(a);
            this._deinitSources(a)
        },
        _updateView: function (a,
                               b) {
            this.view && (this.view.destroy(), delete this.view);
            this.actions && (this.hideActionTriggers(), this.actions = this.actionsHeadHtml = this.actionsFootHtml = this._$triggers = null);
            this.$selectAllContainer && this.$selectAllContainer.detach();
            "index" == this.settings.context && b.actions && b.actions.length && (this.actions = b.actions, this.actionsHeadHtml = b.actionsHeadHtml, this.actionsFootHtml = b.actionsFootHtml, this.$selectAllContainer ? this.$selectAllCheckbox.removeClass("indeterminate checked") : (this.$selectAllContainer =
                c('<td class="selectallcontainer thin"/>'), this.$selectAllBtn = c('<div class="btn"/>').appendTo(this.$selectAllContainer), this.$selectAllCheckbox = c('<div class="checkbox"/>').appendTo(this.$selectAllBtn), this.addListener(this.$selectAllBtn, "click", function () {
                0 == this.view.getSelectedElements().length ? this.view.selectAllElements() : this.view.deselectAllElements()
            })), this.$selectAllContainer.prependTo(this.$toolbarTableRow));
            this.$elements.html(b.html);
            Craft.appendHeadHtml(b.headHtml);
            Craft.appendFootHtml(b.footHtml);
            picturefill();
            var d = this.actions || this.settings.selectable;
            this.view = this.createView(this.getSelectedViewMode(), {
                context: this.settings.context,
                batchSize: this.settings.batchSize,
                params: a,
                selectable: d,
                multiSelect: this.actions || this.settings.multiSelect,
                checkboxMode: "index" == this.settings.context && this.actions,
                onSelectionChange: c.proxy(this, "_handleSelectionChange")
            });
            if (this._autoSelectElements) {
                if (d)for (d = 0; d < this._autoSelectElements.length; d++)this.view.selectElementById(this._autoSelectElements[d]);
                this._autoSelectElements = null
            }
            this.onUpdateElements()
        },
        _createTriggers: function () {
            for (var a = [], b = [], d = [], e = 0; e < this.actions.length; e++) {
                var f = this.actions[e];
                f.trigger ? (f = c('<form id="' + f.handle + '-actiontrigger"/>').data("action", f.handle).append(f.trigger), this.addListener(f, "submit", "_handleActionTriggerSubmit"), a.push(f)) : f.destructive ? d.push(f) : b.push(f)
            }
            if (b.length || d.length) {
                var e = c("<form/>"), g = c('<div class="btn menubtn" data-icon="settings" title="' + Craft.t("Actions") + '"/>').appendTo(e),
                    f = c('<ul class="menu"/>').appendTo(e), b = this._createMenuTriggerList(b), d = this._createMenuTriggerList(d);
                b && b.appendTo(f);
                b && d && c("<hr/>").appendTo(f);
                d && d.appendTo(f);
                a.push(e)
            }
            a.push("");
            this._$triggers = c();
            for (e = 0; e < a.length; e++)d = c('<td class="' + (e < a.length - 1 ? "thin" : "") + '"/>').append(a[e]), this._$triggers = this._$triggers.add(d);
            this._$triggers.insertAfter(this.$selectAllContainer);
            Craft.appendHeadHtml(this.actionsHeadHtml);
            Craft.appendFootHtml(this.actionsFootHtml);
            Craft.initUiElements(this._$triggers);
            if (g)g.data("menubtn").on("optionSelect", c.proxy(this, "_handleMenuActionTriggerSubmit"))
        },
        _createMenuTriggerList: function (a) {
            if (a && a.length) {
                for (var b = c("<ul/>"), d = 0; d < a.length; d++) {
                    var e = a[d].handle;
                    c('<li><a id="' + e + '-actiontrigger" data-action="' + e + '">' + a[d].name + "</a></li>").appendTo(b)
                }
                return b
            }
        }
    }, {
        defaults: {
            context: "index",
            storageKey: null,
            criteria: null,
            batchSize: 50,
            disabledElementIds: [],
            selectable: !1,
            multiSelect: !1,
            buttonContainer: null,
            onAfterInit: c.noop,
            onSelectSource: c.noop,
            onUpdateElements: c.noop,
            onSelectionChange: c.noop,
            onEnableElements: c.noop,
            onDisableElements: c.noop
        }
    });
    Craft.BaseElementIndexView = Garnish.Base.extend({
        $container: null,
        $loadingMoreSpinner: null,
        $elementContainer: null,
        $scroller: null,
        elementIndex: null,
        elementSelect: null,
        loadingMore: !1,
        _totalVisible: null,
        _morePending: null,
        _handleEnableElements: null,
        _handleDisableElements: null,
        init: function (a, b, d) {
            this.elementIndex = a;
            this.$container = c(b);
            this.setSettings(d, Craft.BaseElementIndexView.defaults);
            this.$loadingMoreSpinner = c('<div class="centeralign hidden"><div class="spinner loadingmore"></div></div>').insertAfter(this.$container);
            this.$elementContainer = this.getElementContainer();
            a = this.$elementContainer.children();
            this.setTotalVisible(a.length);
            this.setMorePending(this.settings.batchSize && a.length == this.settings.batchSize);
            this.settings.selectable && (this.elementSelect = new Garnish.Select(this.$elementContainer, a.filter(":not(.disabled)"), {
                multi: this.settings.multiSelect,
                vertical: this.isVerticalList(),
                handle: "index" == this.settings.context ? ".checkbox, .element:first" : null,
                filter: ":not(a):not(.toggle)",
                checkboxMode: this.settings.checkboxMode,
                onSelectionChange: c.proxy(this, "onSelectionChange")
            }), this._handleEnableElements = c.proxy(function (a) {
                this.elementSelect.addItems(a.elements)
            }, this), this._handleDisableElements = c.proxy(function (a) {
                this.elementSelect.removeItems(a.elements)
            }, this), this.elementIndex.on("enableElements", this._handleEnableElements), this.elementIndex.on("disableElements", this._handleDisableElements));
            "index" == this.settings.context && this.addListener(this.$elementContainer, "dblclick", function (a) {
                a = c(a.target);
                if ("A" != a.prop("nodeName")) {
                    if (!a.hasClass("element") &&
                        (a = a.closest(".element"), !a.length))return;
                    Garnish.hasAttr(a, "data-editable") && this.createElementEditor(a)
                }
            });
            this.afterInit();
            this.settings.batchSize && (this.$scroller = "index" == this.settings.context ? Garnish.$win : this.elementIndex.$main, this.$scroller.scrollTop(0), this.addListener(this.$scroller, "scroll", "maybeLoadMore"), this.maybeLoadMore())
        },
        getElementContainer: function () {
            throw"Classes that extend Craft.BaseElementIndexView must supply a getElementContainer() method.";
        },
        afterInit: function () {
        },
        getAllElements: function () {
            return this.$elementContainer.children()
        },
        getEnabledElements: function () {
            return this.$elementContainer.children(":not(.disabled)")
        },
        getElementById: function (a) {
            a = this.$elementContainer.children('[data-id="' + a + '"]:first');
            return a.length ? a : null
        },
        getSelectedElements: function () {
            if (!this.elementSelect)throw"This view is not selectable.";
            return this.elementSelect.$selectedItems
        },
        getSelectedElementIds: function () {
            var a = this.getSelectedElements(), b = [];
            if (a)for (var d = 0; d < a.length; d++)b.push(a.eq(d).data("id"));
            return b
        },
        selectElement: function (a) {
            if (!this.elementSelect)throw"This view is not selectable.";
            this.elementSelect.selectItem(a, !0);
            return !0
        },
        selectElementById: function (a) {
            if (!this.elementSelect)throw"This view is not selectable.";
            return (a = this.getElementById(a)) ? (this.elementSelect.selectItem(a, !0), !0) : !1
        },
        selectAllElements: function () {
            this.elementSelect.selectAll()
        },
        deselectAllElements: function () {
            this.elementSelect.deselectAll()
        },
        isVerticalList: function () {
            return !1
        },
        getTotalVisible: function () {
            return this._totalVisible
        },
        setTotalVisible: function (a) {
            this._totalVisible = a
        },
        getMorePending: function () {
            return this._morePending
        },
        setMorePending: function (a) {
            this._morePending = a
        },
        maybeLoadMore: function () {
            this.canLoadMore() && this.loadMore()
        },
        canLoadMore: function () {
            if (!this.getMorePending() || !this.settings.batchSize)return !1;
            if (this.$scroller[0] == Garnish.$win[0]) {
                var a = Garnish.$win.innerHeight(), b = Garnish.$win.scrollTop(), d = this.$container.offset().top, c = this.$container.height();
                return a + b >= d + c
            }
            a = this.$scroller.prop("scrollHeight");
            b = this.$scroller.scrollTop();
            c = this.$scroller.outerHeight();
            return a - b <= c + 15
        },
        loadMore: function () {
            if (this.getMorePending() && !this.loadingMore && this.settings.batchSize) {
                this.loadingMore = !0;
                this.$loadingMoreSpinner.removeClass("hidden");
                this.removeListener(this.$scroller, "scroll");
                var a = this.getLoadMoreParams();
                Craft.postActionRequest("elementIndex/getMoreElements", a, c.proxy(function (a, d) {
                    this.loadingMore = !1;
                    this.$loadingMoreSpinner.addClass("hidden");
                    if ("success" == d) {
                        var e = c(a.html);
                        this.appendElements(e);
                        Craft.appendHeadHtml(a.headHtml);
                        Craft.appendFootHtml(a.footHtml);
                        this.elementSelect && (this.elementSelect.addItems(e.filter(":not(.disabled)")),
                            this.elementIndex.updateActionTriggers());
                        this.setTotalVisible(this.getTotalVisible() + e.length);
                        this.setMorePending(e.length == this.settings.batchSize);
                        this.addListener(this.$scroller, "scroll", "maybeLoadMore");
                        this.maybeLoadMore()
                    }
                }, this))
            }
        },
        getLoadMoreParams: function () {
            var a = c.extend(!0, {}, this.settings.params);
            a.criteria.offset = this.getTotalVisible();
            return a
        },
        appendElements: function (a) {
            a.appendTo(this.$elementContainer);
            this.onAppendElements(a)
        },
        onAppendElements: function (a) {
            this.settings.onAppendElements(a);
            this.trigger("appendElements", {newElements: a})
        },
        onSelectionChange: function () {
            this.settings.onSelectionChange();
            this.trigger("selectionChange")
        },
        createElementEditor: function (a) {
            new Craft.ElementEditor(a)
        },
        disable: function () {
            this.elementSelect && this.elementSelect.disable()
        },
        enable: function () {
            this.elementSelect && this.elementSelect.enable()
        },
        destroy: function () {
            this.$loadingMoreSpinner.remove();
            this.elementSelect && (this.elementIndex.off("enableElements", this._handleEnableElements), this.elementIndex.off("disableElements",
                this._handleDisableElements), this.elementSelect.destroy(), delete this.elementSelect);
            this.base()
        }
    }, {
        defaults: {
            context: "index",
            batchSize: null,
            params: null,
            selectable: !1,
            multiSelect: !1,
            checkboxMode: !1,
            onAppendElements: c.noop,
            onSelectionChange: c.noop
        }
    });
    Craft.BaseElementSelectInput = Garnish.Base.extend({
        elementSelect: null,
        elementSort: null,
        modal: null,
        elementEditor: null,
        $container: null,
        $elementsContainer: null,
        $elements: null,
        $addElementBtn: null,
        _initialized: !1,
        init: function (a) {
            if (!c.isPlainObject(a)) {
                for (var b =
                {}, d = "id name elementType sources criteria sourceElementId limit modalStorageKey fieldId".split(" "), e = 0; e < d.length; e++)if ("undefined" != typeof arguments[e])b[d[e]] = arguments[e]; else break;
                a = b
            }
            this.setSettings(a, Craft.BaseElementSelectInput.defaults);
            this.settings.modalStorageKey && (this.modalStorageKey = "BaseElementSelectInput." + this.settings.modalStorageKey);
            1 == this.settings.limit && (this.settings.sortable = !1);
            this.$container = this.getContainer();
            this.$container.data("elementSelect", this);
            this.$elementsContainer =
                this.getElementsContainer();
            (this.$addElementBtn = this.getAddElementsBtn()) && 1 == this.settings.limit && this.$addElementBtn.css("position", "absolute").css("top", 0).css(Craft.left, 0);
            this.initElementSelect();
            this.initElementSort();
            this.resetElements();
            this.$addElementBtn && this.addListener(this.$addElementBtn, "activate", "showModal");
            this._initialized = !0
        },
        get totalSelected() {
            return this.$elements.length
        },
        getContainer: function () {
            return c("#" + this.settings.id)
        },
        getElementsContainer: function () {
            return this.$container.children(".elements")
        },
        getElements: function () {
            return this.$elementsContainer.children()
        },
        getAddElementsBtn: function () {
            return this.$container.children(".btn.add")
        },
        initElementSelect: function () {
            this.settings.selectable && (this.elementSelect = new Garnish.Select({
                multi: this.settings.sortable,
                filter: ":not(.delete)"
            }))
        },
        initElementSort: function () {
            this.settings.sortable && (this.elementSort = new Garnish.DragSort({
                container: this.$elementsContainer,
                filter: this.settings.selectable ? c.proxy(function () {
                    return this.elementSort.$targetItem.hasClass("sel") ?
                        this.elementSelect.getSelectedItems() : this.elementSort.$targetItem
                }, this) : null,
                ignoreHandleSelector: ".delete",
                axis: this.getElementSortAxis(),
                collapseDraggees: !0,
                magnetStrength: 4,
                helperLagBase: 1.5,
                onSortChange: this.settings.selectable ? c.proxy(function () {
                    this.elementSelect.resetItemOrder()
                }, this) : null
            }))
        },
        getElementSortAxis: function () {
            return "list" == this.settings.viewMode ? "y" : null
        },
        canAddMoreElements: function () {
            return !this.settings.limit || this.$elements.length < this.settings.limit
        },
        updateAddElementsBtn: function () {
            this.canAddMoreElements() ?
                this.enableAddElementsBtn() : this.disableAddElementsBtn()
        },
        disableAddElementsBtn: function () {
            this.$addElementBtn && !this.$addElementBtn.hasClass("disabled") && (this.$addElementBtn.addClass("disabled"), 1 == this.settings.limit && (this._initialized ? this.$addElementBtn.velocity("fadeOut", Craft.BaseElementSelectInput.ADD_FX_DURATION) : this.$addElementBtn.hide()))
        },
        enableAddElementsBtn: function () {
            this.$addElementBtn && this.$addElementBtn.hasClass("disabled") && (this.$addElementBtn.removeClass("disabled"), 1 == this.settings.limit &&
            (this._initialized ? this.$addElementBtn.velocity("fadeIn", Craft.BaseElementSelectInput.REMOVE_FX_DURATION) : this.$addElementBtn.show()))
        },
        resetElements: function () {
            this.$elements = c();
            this.addElements(this.getElements())
        },
        addElements: function (a) {
            this.settings.selectable && this.elementSelect.addItems(a);
            this.settings.sortable && this.elementSort.addItems(a);
            this.settings.editable && this.addListener(a, "dblclick", function (a) {
                this.elementEditor = Craft.showElementEditor(c(a.currentTarget), this.settings.editorSettings)
            });
            a.find(".delete").on("click", c.proxy(function (a) {
                this.removeElement(c(a.currentTarget).closest(".element"))
            }, this));
            this.$elements = this.$elements.add(a);
            this.updateAddElementsBtn()
        },
        removeElements: function (a) {
            this.settings.selectable && this.elementSelect.removeItems(a);
            if (this.modal) {
                for (var b = [], d = 0; d < a.length; d++) {
                    var c = a.eq(d).data("id");
                    c && b.push(c)
                }
                b.length && this.modal.elementIndex.enableElementsById(b)
            }
            a.children("input").prop("disabled", !0);
            this.$elements = this.$elements.not(a);
            this.updateAddElementsBtn();
            this.onRemoveElements()
        },
        removeElement: function (a) {
            this.removeElements(a);
            this.animateElementAway(a, function () {
                a.remove()
            })
        },
        animateElementAway: function (a, b) {
            a.css("z-index", 0);
            var d = {opacity: -1};
            d["margin-" + Craft.left] = -(a.outerWidth() + parseInt(a.css("margin-" + Craft.right)));
            if ("list" == this.settings.viewMode || 0 == this.$elements.length)d["margin-bottom"] = -(a.outerHeight() + parseInt(a.css("margin-bottom")));
            a.velocity(d, Craft.BaseElementSelectInput.REMOVE_FX_DURATION, b)
        },
        showModal: function () {
            this.canAddMoreElements() &&
            (this.modal ? this.modal.show() : this.modal = this.createModal())
        },
        createModal: function () {
            return Craft.createElementSelectorModal(this.settings.elementType, this.getModalSettings())
        },
        getModalSettings: function () {
            return c.extend({
                closeOtherModals: !1,
                storageKey: this.modalStorageKey,
                sources: this.settings.sources,
                criteria: this.settings.criteria,
                multiSelect: 1 != this.settings.limit,
                disabledElementIds: this.getDisabledElementIds(),
                onSelect: c.proxy(this, "onModalSelect")
            }, this.settings.modalSettings)
        },
        getSelectedElementIds: function () {
            for (var a =
                [], b = 0; b < this.$elements.length; b++)a.push(this.$elements.eq(b).data("id"));
            return a
        },
        getDisabledElementIds: function () {
            var a = this.getSelectedElementIds();
            this.settings.sourceElementId && a.push(this.settings.sourceElementId);
            return a
        },
        onModalSelect: function (a) {
            if (this.settings.limit) {
                var b = this.settings.limit - this.$elements.length;
                a.length > b && (a = a.slice(0, b))
            }
            this.selectElements(a);
            this.updateDisabledElementsInModal()
        },
        selectElements: function (a) {
            for (var b = 0; b < a.length; b++) {
                var d = a[b], c = this.createNewElement(d);
                this.appendElement(c);
                this.addElements(c);
                this.animateElementIntoPlace(d.$element, c)
            }
            this.onSelectElements(a)
        },
        createNewElement: function (a) {
            var b = a.$element.clone();
            Craft.setElementSize(b, "large" == this.settings.viewMode ? "large" : "small");
            b.addClass("removable");
            b.prepend('<input type="hidden" name="' + this.settings.name + '[]" value="' + a.id + '"><a class="delete icon" title="' + Craft.t("Remove") + '"></a>');
            return b
        },
        appendElement: function (a) {
            a.appendTo(this.$elementsContainer)
        },
        animateElementIntoPlace: function (a,
                                           b) {
            var d = a.offset(), c = b.offset(), f = b.clone().appendTo(Garnish.$bod);
            b.css("visibility", "hidden");
            f.css({position: "absolute", zIndex: 1E4, top: d.top, left: d.left});
            f.velocity({top: c.top, left: c.left}, Craft.BaseElementSelectInput.ADD_FX_DURATION, function () {
                f.remove();
                b.css("visibility", "visible")
            })
        },
        updateDisabledElementsInModal: function () {
            this.modal.elementIndex && this.modal.elementIndex.disableElementsById(this.getDisabledElementIds())
        },
        getElementById: function (a) {
            for (var b = 0; b < this.$elements.length; b++) {
                var d =
                    this.$elements.eq(b);
                if (d.data("id") == a)return d
            }
        },
        onSelectElements: function (a) {
            this.trigger("selectElements", {elements: a});
            this.settings.onSelectElements(a)
        },
        onRemoveElements: function () {
            this.trigger("removeElements");
            this.settings.onRemoveElements()
        }
    }, {
        ADD_FX_DURATION: 200, REMOVE_FX_DURATION: 200, defaults: {
            id: null,
            name: null,
            fieldId: null,
            elementType: null,
            sources: null,
            criteria: {},
            sourceElementId: null,
            viewMode: "list",
            limit: null,
            modalStorageKey: null,
            modalSettings: {},
            onSelectElements: c.noop,
            onRemoveElements: c.noop,
            sortable: !0,
            selectable: !0,
            editable: !0,
            editorSettings: {}
        }
    });
    Craft.BaseElementSelectorModal = Garnish.Modal.extend({
        elementType: null,
        elementIndex: null,
        $body: null,
        $selectBtn: null,
        $sidebar: null,
        $sources: null,
        $sourceToggles: null,
        $main: null,
        $search: null,
        $elements: null,
        $tbody: null,
        $primaryButtons: null,
        $secondaryButtons: null,
        $cancelBtn: null,
        $selectBtn: null,
        $footerSpinner: null,
        init: function (a, b) {
            this.elementType = a;
            this.setSettings(b, Craft.BaseElementSelectorModal.defaults);
            var d = c('<div class="modal elementselectormodal"></div>').appendTo(Garnish.$bod),
                e = c('<div class="body"><div class="spinner big"></div></div>').appendTo(d), f = c('<div class="footer"/>').appendTo(d);
            this.base(d, this.settings);
            this.$footerSpinner = c('<div class="spinner hidden"/>').appendTo(f);
            this.$primaryButtons = c('<div class="buttons right"/>').appendTo(f);
            this.$secondaryButtons = c('<div class="buttons left secondary-buttons"/>').appendTo(f);
            this.$cancelBtn = c('<div class="btn">' + Craft.t("Cancel") + "</div>").appendTo(this.$primaryButtons);
            this.$selectBtn = c('<div class="btn disabled submit">' +
                Craft.t("Select") + "</div>").appendTo(this.$primaryButtons);
            this.$body = e;
            this.addListener(this.$cancelBtn, "activate", "cancel");
            this.addListener(this.$selectBtn, "activate", "selectElements")
        },
        onFadeIn: function () {
            this.elementIndex ? Garnish.isMobileBrowser(!0) || this.elementIndex.$search.focus() : this._createElementIndex();
            this.base()
        },
        onSelectionChange: function () {
            this.updateSelectBtnState()
        },
        updateSelectBtnState: function () {
            this.$selectBtn && (this.elementIndex.getSelectedElements().length ? this.enableSelectBtn() :
                this.disableSelectBtn())
        },
        enableSelectBtn: function () {
            this.$selectBtn.removeClass("disabled")
        },
        disableSelectBtn: function () {
            this.$selectBtn.addClass("disabled")
        },
        enableCancelBtn: function () {
            this.$cancelBtn.removeClass("disabled")
        },
        disableCancelBtn: function () {
            this.$cancelBtn.addClass("disabled")
        },
        showFooterSpinner: function () {
            this.$footerSpinner.removeClass("hidden")
        },
        hideFooterSpinner: function () {
            this.$footerSpinner.addClass("hidden")
        },
        cancel: function () {
            this.$cancelBtn.hasClass("disabled") || this.hide()
        },
        selectElements: function () {
            if (this.elementIndex && this.elementIndex.getSelectedElements().length) {
                this.elementIndex.view.elementSelect.clearMouseUpTimeout();
                var a = this.elementIndex.getSelectedElements(), a = this.getElementInfo(a);
                this.onSelect(a);
                this.settings.disableElementsOnSelect && this.elementIndex.disableElements(this.elementIndex.getSelectedElements());
                this.settings.hideOnSelect && this.hide()
            }
        },
        getElementInfo: function (a) {
            for (var b = [], d = 0; d < a.length; d++) {
                var e = c(a[d]);
                b.push(Craft.getElementInfo(e))
            }
            return b
        },
        show: function () {
            this.updateSelectBtnState();
            this.base()
        },
        onSelect: function (a) {
            this.settings.onSelect(a)
        },
        disable: function () {
            this.elementIndex && this.elementIndex.disable();
            this.base()
        },
        enable: function () {
            this.elementIndex && this.elementIndex.enable();
            this.base()
        },
        _createElementIndex: function () {
            Craft.postActionRequest("elements/getModalBody", {
                context: "modal",
                elementType: this.elementType,
                sources: this.settings.sources
            }, c.proxy(function (a, b) {
                "success" == b && (this.$body.html(a), this.$body.has(".sidebar:not(.hidden)").length &&
                this.$body.addClass("has-sidebar"), this.elementIndex = Craft.createElementIndex(this.elementType, this.$body, {
                    context: "modal",
                    storageKey: this.settings.storageKey,
                    criteria: this.settings.criteria,
                    disabledElementIds: this.settings.disabledElementIds,
                    selectable: !0,
                    multiSelect: this.settings.multiSelect,
                    buttonContainer: this.$secondaryButtons,
                    onSelectionChange: c.proxy(this, "onSelectionChange")
                }), this.addListener(this.elementIndex.$elements, "dblclick", "selectElements"))
            }, this))
        }
    }, {
        defaults: {
            resizable: !0,
            storageKey: null,
            sources: null,
            criteria: null,
            multiSelect: !1,
            disabledElementIds: [],
            disableElementsOnSelect: !1,
            hideOnSelect: !0,
            onCancel: c.noop,
            onSelect: c.noop
        }
    });
    Craft.BaseInputGenerator = Garnish.Base.extend({
        $source: null,
        $target: null,
        $form: null,
        settings: null,
        listening: null,
        timeout: null,
        init: function (a, b, d) {
            this.$source = c(a);
            this.$target = c(b);
            this.$form = this.$source.closest("form");
            this.setSettings(d);
            this.startListening()
        },
        setNewSource: function (a) {
            var b = this.listening;
            this.stopListening();
            this.$source = c(a);
            b && this.startListening()
        },
        startListening: function () {
            this.listening || (this.listening = !0, this.addListener(this.$source, "textchange", "onTextChange"), this.addListener(this.$form, "submit", "onFormSubmit"), this.addListener(this.$target, "focus", function () {
                this.addListener(this.$target, "textchange", "stopListening");
                this.addListener(this.$target, "blur", function () {
                    this.removeListener(this.$target, "textchange,blur")
                })
            }))
        },
        stopListening: function () {
            this.listening && (this.listening = !1, this.removeAllListeners(this.$source), this.removeAllListeners(this.$target),
                this.removeAllListeners(this.$form))
        },
        onTextChange: function () {
            this.timeout && clearTimeout(this.timeout);
            this.timeout = setTimeout(c.proxy(this, "updateTarget"), 250)
        },
        onFormSubmit: function () {
            this.timeout && clearTimeout(this.timeout);
            this.updateTarget()
        },
        updateTarget: function () {
            var a = this.$source.val(), a = this.generateTargetValue(a);
            this.$target.val(a);
            this.$target.trigger("textchange")
        },
        generateTargetValue: function (a) {
            return a
        }
    });
    Craft.AdminTable = Garnish.Base.extend({
        settings: null, totalObjects: null, sorter: null,
        $noObjects: null, $table: null, $tbody: null, $deleteBtns: null, init: function (a) {
            this.setSettings(a, Craft.AdminTable.defaults);
            this.settings.allowDeleteAll || (this.settings.minObjects = 1);
            this.$noObjects = c(this.settings.noObjectsSelector);
            this.$table = c(this.settings.tableSelector);
            this.$tbody = this.$table.children("tbody");
            this.totalObjects = this.$tbody.children().length;
            this.settings.sortable && (this.sorter = new Craft.DataTableSorter(this.$table, {onSortChange: c.proxy(this, "reorderObjects")}));
            this.$deleteBtns =
                this.$table.find(".delete");
            this.addListener(this.$deleteBtns, "click", "handleDeleteBtnClick");
            this.updateUI()
        }, addRow: function (a) {
            if (!(this.settings.maxObjects && this.totalObjects >= this.settings.maxObjects)) {
                a = c(a).appendTo(this.$tbody);
                var b = a.find(".delete");
                this.settings.sortable && this.sorter.addItems(a);
                this.$deleteBtns = this.$deleteBtns.add(b);
                this.addListener(b, "click", "handleDeleteBtnClick");
                this.totalObjects++;
                this.updateUI()
            }
        }, reorderObjects: function () {
            if (!this.settings.sortable)return !1;
            for (var a =
                [], b = 0; b < this.sorter.$items.length; b++) {
                var d = c(this.sorter.$items[b]).attr(this.settings.idAttribute);
                a.push(d)
            }
            b = {ids: JSON.stringify(a)};
            Craft.postActionRequest(this.settings.reorderAction, b, c.proxy(function (b, d) {
                "success" == d && (b.success ? (this.onReorderObjects(a), Craft.cp.displayNotice(Craft.t(this.settings.reorderSuccessMessage))) : Craft.cp.displayError(Craft.t(this.settings.reorderFailMessage)))
            }, this))
        }, handleDeleteBtnClick: function (a) {
            this.settings.minObjects && this.totalObjects <= this.settings.minObjects ||
            (a = c(a.target).closest("tr"), this.confirmDeleteObject(a) && this.deleteObject(a))
        }, confirmDeleteObject: function (a) {
            a = this.getObjectName(a);
            return confirm(Craft.t(this.settings.confirmDeleteMessage, {name: a}))
        }, deleteObject: function (a) {
            var b = {id: this.getObjectId(a)};
            Craft.postActionRequest(this.settings.deleteAction, b, c.proxy(function (b, c) {
                "success" == c && this.handleDeleteObjectResponse(b, a)
            }, this))
        }, handleDeleteObjectResponse: function (a, b) {
            var d = this.getObjectId(b), c = this.getObjectName(b);
            a.success ? (this.sorter &&
            this.sorter.removeItems(b), b.remove(), this.totalObjects--, this.updateUI(), this.onDeleteObject(d), Craft.cp.displayNotice(Craft.t(this.settings.deleteSuccessMessage, {name: c}))) : Craft.cp.displayError(Craft.t(this.settings.deleteFailMessage, {name: c}))
        }, onReorderObjects: function (a) {
            this.settings.onReorderObjects(a)
        }, onDeleteObject: function (a) {
            this.settings.onDeleteObject(a)
        }, getObjectId: function (a) {
            return a.attr(this.settings.idAttribute)
        }, getObjectName: function (a) {
            return a.attr(this.settings.nameAttribute)
        },
        updateUI: function () {
            0 == this.totalObjects ? (this.$table.hide(), this.$noObjects.removeClass("hidden")) : (this.$table.show(), this.$noObjects.addClass("hidden"));
            if (this.settings.sortable) {
                var a = this.$table.find(".move");
                1 == this.totalObjects ? a.addClass("disabled") : a.removeClass("disabled")
            }
            this.settings.minObjects && this.totalObjects <= this.settings.minObjects ? this.$deleteBtns.addClass("disabled") : this.$deleteBtns.removeClass("disabled");
            this.settings.newObjectBtnSelector && (this.settings.maxObjects && this.totalObjects >=
            this.settings.maxObjects ? c(this.settings.newObjectBtnSelector).addClass("hidden") : c(this.settings.newObjectBtnSelector).removeClass("hidden"))
        }
    }, {
        defaults: {
            tableSelector: null,
            noObjectsSelector: null,
            newObjectBtnSelector: null,
            idAttribute: "data-id",
            nameAttribute: "data-name",
            sortable: !1,
            allowDeleteAll: !0,
            minObjects: 0,
            maxObjects: null,
            reorderAction: null,
            deleteAction: null,
            reorderSuccessMessage: Craft.t("New order saved."),
            reorderFailMessage: Craft.t("Couldn\u2019t save new order."),
            confirmDeleteMessage: Craft.t("Are you sure you want to delete \u201c{name}\u201d?"),
            deleteSuccessMessage: Craft.t("\u201c{name}\u201d deleted."),
            deleteFailMessage: Craft.t("Couldn\u2019t delete \u201c{name}\u201d."),
            onReorderObjects: c.noop,
            onDeleteObject: c.noop
        }
    });
    Craft.AssetIndex = Craft.BaseElementIndex.extend({
        $includeSubfoldersContainer: null,
        $includeSubfoldersCheckbox: null,
        showingIncludeSubfoldersCheckbox: !1,
        $uploadButton: null,
        $uploadInput: null,
        $progressBar: null,
        $folders: null,
        uploader: null,
        promptHandler: null,
        progressBar: null,
        _uploadTotalFiles: 0,
        _uploadFileProgress: {},
        _uploadedFileIds: [],
        _currentUploaderSettings: {},
        _fileDrag: null,
        _folderDrag: null,
        _expandDropTargetFolderTimeout: null,
        _tempExpandedFolders: [],
        init: function (a, b, d) {
            this.base(a, b, d);
            "index" == this.settings.context && this._initIndexPageMode()
        },
        initSource: function (a) {
            this.base(a);
            this._createFolderContextMenu(a);
            "index" == this.settings.context && (this._folderDrag && 1 < this._getSourceLevel(a) && this._folderDrag.addItems(a.parent()), this._fileDrag && this._fileDrag.updateDropTargets())
        },
        deinitSource: function (a) {
            this.base(a);
            var b = a.data("contextmenu");
            b && b.destroy();
            "index" == this.settings.context && (this._folderDrag && 1 < this._getSourceLevel(a) && this._folderDrag.removeItems(a.parent()), this._fileDrag && this._fileDrag.updateDropTargets())
        },
        _getSourceLevel: function (a) {
            return a.parentsUntil("nav", "ul").length
        },
        _initIndexPageMode: function () {
            this.settings.selectable = !0;
            this.settings.multiSelect = !0;
            var a = c.proxy(this, "_onDragStart"), b = c.proxy(this, "_onDropTargetChange");
            this._fileDrag = new Garnish.DragDrop({
                activeDropTargetClass: "sel", helperOpacity: 0.75,
                filter: c.proxy(function () {
                    return this.view.getSelectedElements()
                }, this), helper: c.proxy(function (a) {
                    return this._getFileDragHelper(a)
                }, this), dropTargets: c.proxy(function () {
                    for (var a = [], b = 0; b < this.$sources.length; b++)a.push(c(this.$sources[b]));
                    return a
                }, this), onDragStart: a, onDropTargetChange: b, onDragStop: c.proxy(this, "_onFileDragStop")
            });
            this._folderDrag = new Garnish.DragDrop({
                activeDropTargetClass: "sel", helperOpacity: 0.75, filter: c.proxy(function () {
                    for (var a = this.sourceSelect.getSelectedItems(), b = [],
                             f = 0; f < a.length; f++) {
                        var g = c(a[f]).parent();
                        g.hasClass("sel") && 1 < this._getSourceLevel(g) && b.push(g[0])
                    }
                    return c(b)
                }, this), helper: c.proxy(function (a) {
                    var b = c('<div class="sidebar" style="padding-top: 0; padding-bottom: 0;"/>'), f = c("<nav/>").appendTo(b), f = c("<ul/>").appendTo(f);
                    a.appendTo(f).removeClass("expanded");
                    a.children("a").addClass("sel");
                    a.css({
                        "padding-top": this._folderDrag.$draggee.css("padding-top"),
                        "padding-right": this._folderDrag.$draggee.css("padding-right"),
                        "padding-bottom": this._folderDrag.$draggee.css("padding-bottom"),
                        "padding-left": this._folderDrag.$draggee.css("padding-left")
                    });
                    return b
                }, this), dropTargets: c.proxy(function () {
                    var a = [], b = [];
                    this._folderDrag.$draggee.find("a[data-key]").each(function () {
                        b.push(c(this).data("key"))
                    });
                    for (var f = 0; f < this.$sources.length; f++) {
                        var g = c(this.$sources[f]);
                        Craft.inArray(g.data("key"), b) || a.push(g)
                    }
                    return a
                }, this), onDragStart: a, onDropTargetChange: b, onDragStop: c.proxy(this, "_onFolderDragStop")
            })
        },
        _onFileDragStop: function () {
            if (this._fileDrag.$activeDropTarget && this._fileDrag.$activeDropTarget[0] !=
                this.$source[0]) {
                for (var a = this.$source, b = this._getFolderIdFromSourceKey(this._fileDrag.$activeDropTarget.data("key")), d = [], e = [], f = 0; f < this._fileDrag.$draggee.length; f++) {
                    var g = Craft.getElementInfo(this._fileDrag.$draggee[f]).id, h = Craft.getElementInfo(this._fileDrag.$draggee[f]).url.split("/").pop();
                    -1 !== h.indexOf("?") && (h = h.split("?").shift());
                    d.push(g);
                    e.push(h)
                }
                if (d.length) {
                    this.setIndexBusy();
                    this._positionProgressBar();
                    this.progressBar.resetProgressBar();
                    this.progressBar.setItemCount(d.length);
                    this.progressBar.showProgressBar();
                    for (var k = [], f = 0; f < d.length; f++)k.push({fileId: d[f], folderId: b, fileName: e[f]});
                    var m = c.proxy(function (e) {
                        this.promptHandler.resetPrompts();
                        for (var f = 0; f < e.length; f++) {
                            var g = e[f];
                            g.prompt && this.promptHandler.addPrompt(g);
                            g.error && alert(g.error)
                        }
                        this.setIndexAvailable();
                        this.progressBar.hideProgressBar();
                        var h = !1, r = function () {
                            this.sourceSelect.selectItem(a);
                            this._totalVisible -= this._fileDrag.$draggee.length;
                            for (var e = 0; e < d.length; e++)c("[data-id=" + d[e] + "]").remove();
                            this.view.deselectAllElements();
                            this._collapseExtraExpandedFolders(b);
                            h && this.updateElements()
                        };
                        this.promptHandler.getPromptCount() ? (e = c.proxy(function (a) {
                            for (var b = [], c = 0; c < a.length; c++)if ("cancel" == a[c].choice)h = !0; else for (var d = 0; d < k.length; d++)k[d].fileName == a[c].fileName && (k[d].action = a[c].choice, b.push(k[d]));
                            0 == b.length ? r.apply(this) : (this.setIndexBusy(), this.progressBar.resetProgressBar(), this.progressBar.setItemCount(this.promptHandler.getPromptCount()), this.progressBar.showProgressBar(),
                                this._moveFile(b, 0, m))
                        }, this), this._fileDrag.fadeOutHelpers(), this.promptHandler.showBatchPrompts(e)) : (r.apply(this), this._fileDrag.fadeOutHelpers())
                    }, this);
                    this._moveFile(k, 0, m);
                    return
                }
            } else this.$source.addClass("sel"), this._collapseExtraExpandedFolders();
            this._fileDrag.returnHelpersToDraggees()
        },
        _onFolderDragStop: function () {
            if (this._folderDrag.$activeDropTarget && 0 == this._folderDrag.$activeDropTarget.siblings("ul").children("li").filter(this._folderDrag.$draggee).length) {
                var a = this._getFolderIdFromSourceKey(this._folderDrag.$activeDropTarget.data("key"));
                this._collapseExtraExpandedFolders(a);
                for (var b = [], d = 0; d < this._folderDrag.$draggee.length; d++) {
                    var e = this._folderDrag.$draggee.eq(d).children("a"), e = this._getFolderIdFromSourceKey(e.data("key")), f = this._getSourceByFolderId(e);
                    this._getFolderIdFromSourceKey(this._getParentSource(f).data("key")) != a && b.push(e)
                }
                if (b.length) {
                    b.sort();
                    b.reverse();
                    this.setIndexBusy();
                    this._positionProgressBar();
                    this.progressBar.resetProgressBar();
                    this.progressBar.setItemCount(b.length);
                    this.progressBar.showProgressBar();
                    for (var g = [], h = [], d = 0; d < b.length; d++)h.push({folderId: b[d], parentId: a});
                    this.requestId++;
                    var k = [], m = [], l = {}, p = [], n = c.proxy(function (b) {
                        this.promptHandler.resetPrompts();
                        for (var d = 0; d < b.length; d++) {
                            var e = b[d];
                            if (e.success && e.transferList && e.deleteList && e.changedFolderIds) {
                                for (var f = 0; f < e.transferList.length; f++)k.push(e.transferList[f]);
                                for (f = 0; f < e.deleteList.length; f++)m.push(e.deleteList[f]);
                                for (var g in e.changedFolderIds)l[g] = e.changedFolderIds[g];
                                p.push(e.removeFromTree)
                            }
                            e.prompt && this.promptHandler.addPrompt(e);
                            e.error && alert(e.error)
                        }
                        this.promptHandler.getPromptCount() ? (b = c.proxy(function (a) {
                            this.promptHandler.resetPrompts();
                            this.setNewElementDataHtml("");
                            for (var b = [], d = 0; d < a.length; d++)"cancel" != a[d].choice && (h[0].action = a[d].choice, b.push(h[0]));
                            0 == b.length ? c.proxy(this, "_performActualFolderMove", k, m, l, p)() : (this.setIndexBusy(), this.progressBar.resetProgressBar(), this.progressBar.setItemCount(this.promptHandler.getPromptCount()), this.progressBar.showProgressBar(), q(b, 0, n))
                        }, this), this.promptHandler.showBatchPrompts(b),
                            this.setIndexAvailable(), this.progressBar.hideProgressBar()) : c.proxy(this, "_performActualFolderMove", k, m, l, p, a)()
                    }, this), q = c.proxy(function (a, b, d) {
                        0 == b && (g = []);
                        Craft.postActionRequest("assets/moveFolder", a[b], c.proxy(function (c, e) {
                            b++;
                            this.progressBar.incrementProcessedItemCount(1);
                            this.progressBar.updateProgressBar();
                            "success" == e && g.push(c);
                            b >= a.length ? d(g) : q(a, b, d)
                        }, this))
                    }, this);
                    q(h, 0, n);
                    return
                }
            } else this.$source.addClass("sel"), this._collapseExtraExpandedFolders();
            this._folderDrag.returnHelpersToDraggees()
        },
        _performActualFolderMove: function (a, b, d, e, f) {
            this.setIndexBusy();
            this.progressBar.resetProgressBar();
            this.progressBar.setItemCount(1);
            this.progressBar.showProgressBar();
            var g = c.proxy(function (a, b, d) {
                d = c();
                var e = c(), g;
                for (g in b)if (e = this._getSourceByFolderId(g), e = e.attr("data-key", "folder:" + b[g].newId).data("key", "folder:" + b[g].newId).parent(), 0 == d.length || 0 < d.parents().filter(e).length)d = e, topFolderMovedId = b[g].newId;
                if (0 == d.length)this.setIndexAvailable(), this.progressBar.hideProgressBar(), this._folderDrag.returnHelpersToDraggees();
                else {
                    b = d.children("a");
                    g = d.siblings("ul, .toggle");
                    var e = this._getParentSource(b), n = this._getSourceByFolderId(f);
                    this._prepareParentForChildren(n);
                    this._appendSubfolder(n, d);
                    b.after(g);
                    this._cleanUpTree(e);
                    this.$sidebar.find("ul>ul, ul>.toggle").remove();
                    for (d = 0; d < a.length; d++)Craft.postActionRequest("assets/deleteFolder", {folderId: a[d]});
                    this.setIndexAvailable();
                    this.progressBar.hideProgressBar();
                    this._folderDrag.returnHelpersToDraggees();
                    this._selectSourceByFolderId(topFolderMovedId)
                }
            }, this);
            0 <
            a.length ? this._moveFile(a, 0, c.proxy(function () {
                g(b, d, e)
            }, this)) : g(b, d, e)
        },
        _getParentSource: function (a) {
            if (1 < this._getSourceLevel(a))return a.parent().parent().siblings("a")
        },
        _moveFile: function (a, b, d) {
            0 == b && (this.responseArray = []);
            Craft.postActionRequest("assets/moveFile", a[b], c.proxy(function (c, f) {
                this.progressBar.incrementProcessedItemCount(1);
                this.progressBar.updateProgressBar();
                "success" == f && (this.responseArray.push(c), Craft.cp.runPendingTasks());
                b++;
                b >= a.length ? d(this.responseArray) : this._moveFile(a,
                    b, d)
            }, this))
        },
        _selectSourceByFolderId: function (a) {
            a = this._getSourceByFolderId(a);
            for (var b = a.parent().parents("li"), d = 0; d < b.length; d++) {
                var e = c(b[d]);
                e.hasClass("expanded") || e.children(".toggle").click()
            }
            this.sourceSelect.selectItem(a);
            this.$source = a;
            this.sourceKey = a.data("key");
            this.setInstanceState("selectedSource", this.sourceKey);
            this.updateElements()
        },
        afterInit: function () {
            this.$uploadButton || (this.$uploadButton = c('<div class="btn submit" data-icon="upload" style="position: relative; overflow: hidden;" role="button">' +
                Craft.t("Upload files") + "</div>"), this.addButton(this.$uploadButton), this.$uploadInput = c('<input type="file" multiple="multiple" name="assets-upload" />').hide().insertBefore(this.$uploadButton));
            this.promptHandler = new Craft.PromptHandler;
            this.progressBar = new Craft.ProgressBar(this.$main, !0);
            var a = {url: Craft.getActionUrl("assets/uploadFile"), fileInput: this.$uploadInput, dropZone: this.$main};
            a.events = {
                fileuploadstart: c.proxy(this, "_onUploadStart"),
                fileuploadprogressall: c.proxy(this, "_onUploadProgress"),
                fileuploaddone: c.proxy(this, "_onUploadComplete")
            };
            "undefined" != typeof this.settings.criteria.kind && (a.allowedKinds = this.settings.criteria.kind);
            this._currentUploaderSettings = a;
            this.uploader = new Craft.Uploader(this.$uploadButton, a);
            this.$uploadButton.on("click", c.proxy(function () {
                this.$uploadButton.hasClass("disabled") || this.isIndexBusy || this.$uploadButton.parent().find("input[name=assets-upload]").click()
            }, this));
            this.base()
        },
        onSelectSource: function () {
            this.uploader.setParams({folderId: this._getFolderIdFromSourceKey(this.sourceKey)});
            this.$source.attr("data-upload") ? this.$uploadButton.removeClass("disabled") : this.$uploadButton.addClass("disabled");
            this.base()
        },
        _getFolderIdFromSourceKey: function (a) {
            return a.split(":")[1]
        },
        startSearching: function () {
            if (this.$source.siblings("ul").length) {
                if (null === this.$includeSubfoldersContainer) {
                    var a = "includeSubfolders-" + Math.floor(1E9 * Math.random());
                    this.$includeSubfoldersContainer = c('<div style="margin-bottom: -23px; opacity: 0;"/>').insertAfter(this.$search);
                    var b = c('<div style="padding-top: 5px;"/>').appendTo(this.$includeSubfoldersContainer);
                    this.$includeSubfoldersCheckbox = c('<input type="checkbox" id="' + a + '" class="checkbox"/>').appendTo(b);
                    c('<label class="light smalltext" for="' + a + '"/>').text(" " + Craft.t("Search in subfolders")).appendTo(b);
                    this.addListener(this.$includeSubfoldersCheckbox, "change", function () {
                        this.setSelecetedSourceState("includeSubfolders", this.$includeSubfoldersCheckbox.prop("checked"));
                        this.updateElements()
                    })
                } else this.$includeSubfoldersContainer.velocity("stop");
                a = this.getSelectedSourceState("includeSubfolders",
                    !1);
                this.$includeSubfoldersCheckbox.prop("checked", a);
                this.$includeSubfoldersContainer.velocity({marginBottom: 0, opacity: 1}, "fast");
                this.showingIncludeSubfoldersCheckbox = !0
            }
            this.base()
        },
        stopSearching: function () {
            this.showingIncludeSubfoldersCheckbox && (this.$includeSubfoldersContainer.velocity("stop"), this.$includeSubfoldersContainer.velocity({
                marginBottom: -23,
                opacity: 0
            }, "fast"), this.showingIncludeSubfoldersCheckbox = !1);
            this.base()
        },
        getViewParams: function () {
            var a = this.base();
            this.showingIncludeSubfoldersCheckbox &&
            this.$includeSubfoldersCheckbox.prop("checked") && (a.criteria.includeSubfolders = !0);
            return a
        },
        _onUploadStart: function (a) {
            this.setIndexBusy();
            this._positionProgressBar();
            this.progressBar.resetProgressBar();
            this.progressBar.showProgressBar()
        },
        _onUploadProgress: function (a, b) {
            var d = parseInt(100 * (b.loaded / b.total), 10);
            this.progressBar.setProgressPercentage(d)
        },
        _onUploadComplete: function (a, b) {
            var d = b.result, e = b.files[0].name, f = !0;
            d.success || d.prompt ? (this._uploadedFileIds.push(d.fileId), d.prompt && this.promptHandler.addPrompt(d)) :
                (d.error ? alert(Craft.t("Upload failed for {filename}. The error message was: \u201c{error}\u201d", {
                    filename: e,
                    error: d.error
                })) : alert(Craft.t("Upload failed for {filename}.", {filename: e})), f = !1);
            this.uploader.isLastUpload() && (this.setIndexAvailable(), this.progressBar.hideProgressBar(), this.promptHandler.getPromptCount() ? this.promptHandler.showBatchPrompts(c.proxy(this, "_uploadFollowup")) : f && this.updateElements())
        },
        _uploadFollowup: function (a) {
            this.setIndexBusy();
            this.progressBar.resetProgressBar();
            this.promptHandler.resetPrompts();
            var b = c.proxy(function () {
                this.setIndexAvailable();
                this.progressBar.hideProgressBar();
                this.updateElements()
            }, this);
            this.progressBar.setItemCount(a.length);
            var d = c.proxy(function (a, b, g) {
                Craft.postActionRequest("assets/uploadFile", {
                    newFileId: a[b].fileId,
                    fileName: a[b].fileName,
                    userResponse: a[b].choice
                }, c.proxy(function (c, k) {
                    "success" == k && c.fileId && this._uploadedFileIds.push(c.fileId);
                    b++;
                    this.progressBar.incrementProcessedItemCount(1);
                    this.progressBar.updateProgressBar();
                    b == a.length ? g() : d(a, b, g)
                }, this))
            }, this);
            this.progressBar.showProgressBar();
            d(a, 0, b)
        },
        onUpdateElements: function () {
            this._onUpdateElements(!1, this.view.getAllElements());
            this.view.on("appendElements", c.proxy(function (a) {
                this._onUpdateElements(!0, a.newElements)
            }, this));
            this.base()
        },
        _onUpdateElements: function (a, b) {
            "index" == this.settings.context && (a || this._fileDrag.removeAllItems(), this._fileDrag.addItems(b));
            if (this._uploadedFileIds.length) {
                if (this.view.settings.selectable)for (var d = 0; d < this._uploadedFileIds.length; d++)this.view.selectElementById(this._uploadedFileIds[d]);
                this._uploadedFileIds = []
            }
        },
        _onDragStart: function () {
            this._tempExpandedFolders = []
        },
        _getFileDragHelper: function (a) {
            switch (this.getSelectedSourceState("mode")) {
                case "table":
                    var b = c('<div class="elements datatablesorthelper"/>').appendTo(Garnish.$bod), d = c('<div class="tableview"/>').appendTo(b), d = c('<table class="data"/>').appendTo(d), d = c("<tbody/>").appendTo(d);
                    a.appendTo(d);
                    this._$firstRowCells = this.view.$table.children("tbody").children("tr:first").children();
                    a = a.children();
                    for (d = 0; d < a.length; d++) {
                        var e =
                            c(a[d]);
                        if (e.hasClass("checkbox-cell"))e.remove(), b.css("margin-" + Craft.left, 19); else {
                            var f = c(this._$firstRowCells[d]), g = f.width();
                            f.width(g);
                            e.width(g)
                        }
                    }
                    return b;
                case "thumbs":
                    return b = c('<div class="elements thumbviewhelper"/>').appendTo(Garnish.$bod), d = c('<ul class="thumbsview"/>').appendTo(b), a.appendTo(d), b
            }
            return c()
        },
        _onDropTargetChange: function (a) {
            clearTimeout(this._expandDropTargetFolderTimeout);
            if (a) {
                var b = this._getFolderIdFromSourceKey(a.data("key"));
                b ? (this.dropTargetFolder = this._getSourceByFolderId(b),
                this._hasSubfolders(this.dropTargetFolder) && !this._isExpanded(this.dropTargetFolder) && (this._expandDropTargetFolderTimeout = setTimeout(c.proxy(this, "_expandFolder"), 500))) : this.dropTargetFolder = null
            }
            a && a[0] != this.$source[0] ? this.$source.removeClass("sel") : this.$source.addClass("sel")
        },
        _collapseExtraExpandedFolders: function (a) {
            clearTimeout(this._expandDropTargetFolderTimeout);
            if (a)var b = this._getSourceByFolderId(a).parents("li").children("a");
            for (var d = this._tempExpandedFolders.length - 1; 0 <= d; d--) {
                var c =
                    this._tempExpandedFolders[d];
                a && 0 != b.filter('[data-key="' + c.data("key") + '"]').length || (this._collapseFolder(c), this._tempExpandedFolders.splice(d, 1))
            }
        },
        _getSourceByFolderId: function (a) {
            return this.$sources.filter('[data-key="folder:' + a + '"]')
        },
        _hasSubfolders: function (a) {
            return a.siblings("ul").find("li").length
        },
        _isExpanded: function (a) {
            return a.parent("li").hasClass("expanded")
        },
        _expandFolder: function () {
            this._collapseExtraExpandedFolders(this._getFolderIdFromSourceKey(this.dropTargetFolder.data("key")));
            this.dropTargetFolder.siblings(".toggle").click();
            this._tempExpandedFolders.push(this.dropTargetFolder)
        },
        _collapseFolder: function (a) {
            a.parent().hasClass("expanded") && a.siblings(".toggle").click()
        },
        _createFolderContextMenu: function (a) {
            var b = [{label: Craft.t("New subfolder"), onClick: c.proxy(this, "_createSubfolder", a)}];
            "index" == this.settings.context && 1 < this._getSourceLevel(a) && (b.push({
                label: Craft.t("Rename folder"),
                onClick: c.proxy(this, "_renameFolder", a)
            }), b.push({
                label: Craft.t("Delete folder"), onClick: c.proxy(this,
                    "_deleteFolder", a)
            }));
            new Garnish.ContextMenu(a, b, {menuClass: "menu"})
        },
        _createSubfolder: function (a) {
            var b = prompt(Craft.t("Enter the name of the folder"));
            b && (b = {
                parentId: this._getFolderIdFromSourceKey(a.data("key")),
                folderName: b
            }, this.setIndexBusy(), Craft.postActionRequest("assets/createFolder", b, c.proxy(function (b, e) {
                this.setIndexAvailable();
                if ("success" == e && b.success) {
                    this._prepareParentForChildren(a);
                    var f = c('<li><a data-key="folder:' + b.folderId + '"' + (Garnish.hasAttr(a, "data-has-thumbs") ? " data-has-thumbs" :
                            "") + ' data-upload="' + a.attr("data-upload") + '">' + b.folderName + "</a></li>"), g = f.children("a:first");
                    this._appendSubfolder(a, f);
                    this.initSource(g)
                }
                "success" == e && b.error && alert(b.error)
            }, this)))
        },
        _deleteFolder: function (a) {
            if (confirm(Craft.t("Really delete folder \u201c{folder}\u201d?", {folder: c.trim(a.text())}))) {
                var b = {folderId: this._getFolderIdFromSourceKey(a.data("key"))};
                this.setIndexBusy();
                Craft.postActionRequest("assets/deleteFolder", b, c.proxy(function (b, c) {
                    this.setIndexAvailable();
                    if ("success" ==
                        c && b.success) {
                        var f = this._getParentSource(a);
                        this.deinitSource(a);
                        a.parent().remove();
                        this._cleanUpTree(f)
                    }
                    "success" == c && b.error && alert(b.error)
                }, this))
            }
        },
        _renameFolder: function (a) {
            var b = c.trim(a.text()), d = prompt(Craft.t("Rename folder"), b);
            d && d != b && (b = {
                folderId: this._getFolderIdFromSourceKey(a.data("key")),
                newName: d
            }, this.setIndexBusy(), Craft.postActionRequest("assets/renameFolder", b, c.proxy(function (b, c) {
                this.setIndexAvailable();
                "success" == c && b.success && a.text(b.newName);
                "success" == c && b.error &&
                alert(b.error)
            }, this), "json"))
        },
        _prepareParentForChildren: function (a) {
            this._hasSubfolders(a) || (a.parent().addClass("expanded").append('<div class="toggle"></div><ul></ul>'), this.initSourceToggle(a))
        },
        _appendSubfolder: function (a, b) {
            for (var d = a.siblings("ul").children("li"), e = c.trim(b.children("a:first").text()), f = !1, g = 0; g < d.length; g++) {
                var h = c(d[g]);
                if (c.trim(h.children("a:first").text()) > e) {
                    h.before(b);
                    f = !0;
                    break
                }
            }
            f || a.siblings("ul").append(b)
        },
        _cleanUpTree: function (a) {
            null !== a && 0 == a.siblings("ul").children("li").length &&
            (this.deinitSourceToggle(a), a.siblings("ul").remove(), a.siblings(".toggle").remove(), a.parent().removeClass("expanded"))
        },
        _positionProgressBar: function () {
            var a = c(), a = 0, a = "index" == this.settings.context ? this.progressBar.$progressBar.closest("#content") : this.progressBar.$progressBar.closest(".main"), b = a.offset().top, b = Garnish.$doc.scrollTop() - b, d = Garnish.$win.height(), a = a.height() > d ? d / 2 - 6 + b : a.height() / 2 - 6;
            this.progressBar.$progressBar.css({top: a})
        }
    });
    Craft.registerElementIndexClass("Asset", Craft.AssetIndex);
    Craft.AssetSelectInput = Craft.BaseElementSelectInput.extend({
        requestId: 0,
        hud: null,
        uploader: null,
        progressBar: null,
        originalFilename: "",
        originalExtension: "",
        init: function (a) {
            a.editorSettings = {
                onShowHud: c.proxy(this.resetOriginalFilename, this),
                onCreateForm: c.proxy(this._renameHelper, this),
                validators: [c.proxy(this.validateElementForm, this)]
            };
            this.base(a);
            this._attachUploader()
        },
        _attachUploader: function () {
            this.progressBar = new Craft.ProgressBar(c('<div class="progress-shade"></div>').appendTo(this.$container));
            var a = {
                url: Craft.getActionUrl("assets/expressUpload"),
                dropZone: this.$container,
                formData: {fieldId: this.settings.fieldId, elementId: this.settings.sourceElementId}
            };
            "undefined" !== typeof Craft.csrfTokenName && "undefined" !== typeof Craft.csrfTokenValue && (a.formData[Craft.csrfTokenName] = Craft.csrfTokenValue);
            "undefined" != typeof this.settings.criteria.kind && (a.allowedKinds = this.settings.criteria.kind);
            a.canAddMoreFiles = c.proxy(this, "canAddMoreFiles");
            a.events = {};
            a.events.fileuploadstart = c.proxy(this, "_onUploadStart");
            a.events.fileuploadprogressall = c.proxy(this, "_onUploadProgress");
            a.events.fileuploaddone = c.proxy(this, "_onUploadComplete");
            this.uploader = new Craft.Uploader(this.$container, a)
        },
        selectUploadedFile: function (a) {
            if (this.canAddMoreElements()) {
                var b = a.$element;
                b.addClass("removable");
                b.prepend('<input type="hidden" name="' + this.settings.name + '[]" value="' + a.id + '"><a class="delete icon" title="' + Craft.t("Remove") + '"></a>');
                b.appendTo(this.$elementsContainer);
                a = -(b.outerWidth() + 10);
                this.$addElementBtn.css("margin-" +
                    Craft.left, a + "px");
                a = {};
                a["margin-" + Craft.left] = 0;
                this.$addElementBtn.velocity(a, "fast");
                this.addElements(b);
                delete this.modal
            }
        },
        _onUploadStart: function (a) {
            this.progressBar.$progressBar.css({top: Math.round(this.$container.outerHeight() / 2) - 6});
            this.$container.addClass("uploading");
            this.progressBar.resetProgressBar();
            this.progressBar.showProgressBar()
        },
        _onUploadProgress: function (a, b) {
            var c = parseInt(100 * (b.loaded / b.total), 10);
            this.progressBar.setProgressPercentage(c)
        },
        _onUploadComplete: function (a, b) {
            if (b.result.error)alert(b.result.error);
            else {
                var d = c(b.result.html);
                Craft.appendHeadHtml(b.result.headHtml);
                this.selectUploadedFile(Craft.getElementInfo(d))
            }
            this.uploader.isLastUpload() && (this.progressBar.hideProgressBar(), this.$container.removeClass("uploading"))
        },
        canAddMoreFiles: function (a) {
            return !this.settings.limit || this.$elements.length + a < this.settings.limit
        },
        _parseFilename: function (a) {
            var b = a.split(".");
            a = "";
            1 < b.length && (a = b.pop());
            b = b.join(".");
            return {extension: a, baseFileName: b}
        },
        _renameHelper: function (a) {
            c(".renameHelper", a).on("focus",
                c.proxy(function (a) {
                        input = a.currentTarget;
                        a = this._parseFilename(input.value);
                        "" == this.originalFilename && "" == this.originalExtension && (this.originalFilename = a.baseFileName, this.originalExtension = a.extension);
                        a = a.baseFileName.length;
                        if ("undefined" != typeof input.selectionStart)input.selectionStart = 0, input.selectionEnd = a; else if (document.selection && document.selection.createRange) {
                            input.select();
                            var c = document.selection.createRange();
                            c.collapse(!0);
                            c.moveEnd("character", a);
                            c.moveStart("character", 0);
                            c.select()
                        }
                    },
                    this))
        },
        resetOriginalFilename: function () {
            this.originalExtension = this.originalFilename = ""
        },
        validateElementForm: function () {
            var a = c(".renameHelper", this.elementEditor.hud.$hud.data("elementEditor").$form), b = this._parseFilename(a.val());
            if (b.extension != this.originalExtension)if ("" == b.extension)if (this.originalFilename != b.baseFileName)a.val(b.baseFileName + "." + this.originalExtension); else return confirm(Craft.t("Are you sure you want to remove the extension \u201c.{ext}\u201d?", {ext: this.originalExtension}));
            else return confirm(Craft.t("Are you sure you want to change the extension from \u201c.{oldExt}\u201d to \u201c.{newExt}\u201d?", {
                    oldExt: this.originalExtension,
                    newExt: b.extension
                }));
            return !0
        }
    });
    Craft.AssetSelectorModal = Craft.BaseElementSelectorModal.extend({
        $selectTransformBtn: null, _selectedTransform: null, init: function (a, b) {
            b = c.extend({}, Craft.AssetSelectorModal.defaults, b);
            this.base(a, b);
            b.transforms.length && this.createSelectTransformButton(b.transforms)
        }, createSelectTransformButton: function (a) {
            if (a &&
                a.length) {
                var b = c('<div class="btngroup"/>').appendTo(this.$primaryButtons);
                this.$selectBtn.appendTo(b);
                this.$selectTransformBtn = c('<div class="btn menubtn disabled">' + Craft.t("Select transform") + "</div>").appendTo(b);
                for (var b = c('<div class="menu" data-align="right"></div>').insertAfter(this.$selectTransformBtn), b = c("<ul></ul>").appendTo(b), d = 0; d < a.length; d++)c('<li><a data-transform="' + a[d].handle + '">' + a[d].name + "</a></li>").appendTo(b);
                a = new Garnish.MenuBtn(this.$selectTransformBtn, {
                    onOptionSelect: c.proxy(this,
                        "onSelectTransform")
                });
                a.disable();
                this.$selectTransformBtn.data("menuButton", a)
            }
        }, onSelectionChange: function (a) {
            var b = this.elementIndex.getSelectedElements();
            a = !1;
            if (b.length && this.settings.transforms.length) {
                a = !0;
                for (var d = 0; d < b.length; d++)if (!c(".element.hasthumb:first", b[d]).length) {
                    a = !1;
                    break
                }
            }
            b = null;
            this.$selectTransformBtn && (b = this.$selectTransformBtn.data("menuButton"));
            a ? (b && b.enable(), this.$selectTransformBtn.removeClass("disabled")) : this.$selectTransformBtn && (b && b.disable(), this.$selectTransformBtn.addClass("disabled"));
            this.base()
        }, onSelectTransform: function (a) {
            a = c(a).data("transform");
            this.selectImagesWithTransform(a)
        }, selectImagesWithTransform: function (a) {
            "undefined" == typeof Craft.AssetSelectorModal.transformUrls[a] && (Craft.AssetSelectorModal.transformUrls[a] = {});
            for (var b = this.elementIndex.getSelectedElements(), d = [], e = 0; e < b.length; e++) {
                var f = c(b[e]), f = Craft.getElementInfo(f).id;
                "undefined" == typeof Craft.AssetSelectorModal.transformUrls[a][f] && d.push(f)
            }
            d.length ? (this.showFooterSpinner(), this.fetchMissingTransformUrls(d,
                a, c.proxy(function () {
                    this.hideFooterSpinner();
                    this.selectImagesWithTransform(a)
                }, this))) : (this._selectedTransform = a, this.selectElements(), this._selectedTransform = null)
        }, fetchMissingTransformUrls: function (a, b, d) {
            var e = a.pop();
            Craft.postActionRequest("assets/generateTransform", {
                fileId: e,
                handle: b,
                returnUrl: !0
            }, c.proxy(function (c, g) {
                    Craft.AssetSelectorModal.transformUrls[b][e] = !1;
                    "success" == g && c.url && (Craft.AssetSelectorModal.transformUrls[b][e] = c.url);
                    a.length ? this.fetchMissingTransformUrls(a, b, d) : d()
                },
                this))
        }, getElementInfo: function (a) {
            a = this.base(a);
            if (this._selectedTransform)for (var b = 0; b < a.length; b++) {
                var c = a[b].id;
                "undefined" != typeof Craft.AssetSelectorModal.transformUrls[this._selectedTransform][c] && !1 !== Craft.AssetSelectorModal.transformUrls[this._selectedTransform][c] && (a[b].url = Craft.AssetSelectorModal.transformUrls[this._selectedTransform][c])
            }
            return a
        }, onSelect: function (a) {
            this.settings.onSelect(a, this._selectedTransform)
        }
    }, {defaults: {canSelectImageTransforms: !1, transforms: []}, transformUrls: {}});
    Craft.registerElementSelectorModalClass("Asset", Craft.AssetSelectorModal);
    Craft.AuthManager = Garnish.Base.extend({
        checkAuthTimeoutTimer: null,
        showLoginModalTimer: null,
        decrementLogoutWarningInterval: null,
        showingLogoutWarningModal: !1,
        showingLoginModal: !1,
        logoutWarningModal: null,
        loginModal: null,
        $logoutWarningPara: null,
        $passwordInput: null,
        $passwordSpinner: null,
        $loginBtn: null,
        $loginErrorPara: null,
        submitLoginIfLoggedOut: !1,
        init: function () {
            this.updateAuthTimeout(Craft.authTimeout)
        },
        setCheckAuthTimeoutTimer: function (a) {
            this.checkAuthTimeoutTimer &&
            clearTimeout(this.checkAuthTimeoutTimer);
            this.checkAuthTimeoutTimer = setTimeout(c.proxy(this, "checkAuthTimeout"), 1E3 * a)
        },
        checkAuthTimeout: function (a) {
            c.ajax({
                url: Craft.getActionUrl("users/getAuthTimeout", a ? null : "dontExtendSession=1"),
                type: "GET",
                complete: c.proxy(function (a, c) {
                    "success" == c ? (this.updateAuthTimeout(a.responseJSON.timeout), this.submitLoginIfLoggedOut = !1, "undefined" !== typeof a.responseJSON.csrfTokenValue && "undefined" !== typeof Craft.csrfTokenValue && (Craft.csrfTokenValue = a.responseJSON.csrfTokenValue)) :
                        this.updateAuthTimeout(-1)
                }, this)
            })
        },
        updateAuthTimeout: function (a) {
            this.authTimeout = parseInt(a);
            -1 != this.authTimeout && this.authTimeout < Craft.AuthManager.minSafeAuthTimeout ? (this.authTimeout ? (this.showingLogoutWarningModal || this.showLogoutWarningModal(), this.authTimeout < Craft.AuthManager.checkInterval && (this.showLoginModalTimer && clearTimeout(this.showLoginModalTimer), this.showLoginModalTimer = setTimeout(c.proxy(this, "showLoginModal"), 1E3 * this.authTimeout))) : this.showingLoginModal ? this.submitLoginIfLoggedOut &&
            this.submitLogin() : this.showLoginModal(), this.setCheckAuthTimeoutTimer(Craft.AuthManager.checkInterval)) : (this.hideLogoutWarningModal(), this.hideLoginModal(), -1 != this.authTimeout && this.authTimeout < Craft.AuthManager.minSafeAuthTimeout + Craft.AuthManager.checkInterval ? this.setCheckAuthTimeoutTimer(this.authTimeout - Craft.AuthManager.minSafeAuthTimeout + 1) : this.setCheckAuthTimeoutTimer(Craft.AuthManager.checkInterval))
        },
        showLogoutWarningModal: function () {
            if (this.showingLoginModal) {
                this.hideLoginModal(!0);
                var a = !0
            } else a = !1;
            this.showingLogoutWarningModal = !0;
            if (!this.logoutWarningModal) {
                var b = c('<form id="logoutwarningmodal" class="modal alert fitted"/>'), d = c('<div class="body"/>').appendTo(b), e = c('<div class="buttons right"/>').appendTo(d), f = c('<div class="btn">' + Craft.t("Log out now") + "</div>").appendTo(e), g = c('<input type="submit" class="btn submit" value="' + Craft.t("Keep me logged in") + '" />').appendTo(e);
                this.$logoutWarningPara = c("<p/>").prependTo(d);
                this.logoutWarningModal = new Garnish.Modal(b,
                    {
                        autoShow: !1,
                        closeOtherModals: !1,
                        hideOnEsc: !1,
                        hideOnShadeClick: !1,
                        shadeClass: "modal-shade dark",
                        onFadeIn: function () {
                            Garnish.isMobileBrowser(!0) || setTimeout(function () {
                                g.focus()
                            }, 100)
                        }
                    });
                this.addListener(f, "activate", "logout");
                this.addListener(b, "submit", "renewSession")
            }
            a ? this.logoutWarningModal.quickShow() : this.logoutWarningModal.show();
            this.updateLogoutWarningMessage();
            this.decrementLogoutWarningInterval = setInterval(c.proxy(this, "decrementLogoutWarning"), 1E3)
        },
        updateLogoutWarningMessage: function () {
            this.$logoutWarningPara.text(Craft.t("Your session will expire in {time}.",
                {time: Craft.secondsToHumanTimeDuration(this.authTimeout)}));
            this.logoutWarningModal.updateSizeAndPosition()
        },
        decrementLogoutWarning: function () {
            0 < this.authTimeout && (this.authTimeout--, this.updateLogoutWarningMessage());
            0 == this.authTimeout && clearInterval(this.decrementLogoutWarningInterval)
        },
        hideLogoutWarningModal: function (a) {
            this.showingLogoutWarningModal = !1;
            this.logoutWarningModal && (a ? this.logoutWarningModal.quickHide() : this.logoutWarningModal.hide(), this.decrementLogoutWarningInterval && clearInterval(this.decrementLogoutWarningInterval))
        },
        showLoginModal: function () {
            if (this.showingLogoutWarningModal) {
                this.hideLogoutWarningModal(!0);
                var a = !0
            } else a = !1;
            this.showingLoginModal = !0;
            if (!this.loginModal) {
                var b = c('<form id="loginmodal" class="modal alert fitted"/>'), d = c('<div class="body"><h2>' + Craft.t("Your session has ended.") + "</h2><p>" + Craft.t("Enter your password to log back in.") + "</p></div>").appendTo(b), e = c('<div class="inputcontainer">').appendTo(d), f = c('<table class="inputs fullwidth"/>').appendTo(e), g = c("<tr/>").appendTo(f), f = c("<td/>").appendTo(g),
                    g = c('<td class="thin"/>').appendTo(g), f = c('<div class="passwordwrapper"/>').appendTo(f);
                this.$passwordInput = c('<input type="password" class="text password fullwidth" placeholder="' + Craft.t("Password") + '"/>').appendTo(f);
                this.$passwordSpinner = c('<div class="spinner hidden"/>').appendTo(e);
                this.$loginBtn = c('<input type="submit" class="btn submit disabled" value="' + Craft.t("Login") + '" />').appendTo(g);
                this.$loginErrorPara = c('<p class="error"/>').appendTo(d);
                this.loginModal = new Garnish.Modal(b, {
                    autoShow: !1,
                    closeOtherModals: !1,
                    hideOnEsc: !1,
                    hideOnShadeClick: !1,
                    shadeClass: "modal-shade dark",
                    onFadeIn: c.proxy(function () {
                        Garnish.isMobileBrowser(!0) || setTimeout(c.proxy(function () {
                            this.$passwordInput.focus()
                        }, this), 100)
                    }, this),
                    onFadeOut: c.proxy(function () {
                        this.$passwordInput.val("")
                    }, this)
                });
                new Craft.PasswordInput(this.$passwordInput, {
                    onToggleInput: c.proxy(function (a) {
                        this.$passwordInput = a
                    }, this)
                });
                this.addListener(this.$passwordInput, "textchange", "validatePassword");
                this.addListener(b, "submit", "login")
            }
            a ?
                this.loginModal.quickShow() : this.loginModal.show()
        },
        hideLoginModal: function (a) {
            this.showingLoginModal = !1;
            this.loginModal && (a ? this.loginModal.quickHide() : this.loginModal.hide())
        },
        logout: function () {
            var a = Craft.getActionUrl("users/logout");
            c.get(a, c.proxy(function () {
                Craft.redirectTo("")
            }, this))
        },
        renewSession: function (a) {
            a && a.preventDefault();
            this.hideLogoutWarningModal();
            this.checkAuthTimeout(!0)
        },
        validatePassword: function () {
            if (6 <= this.$passwordInput.val().length)return this.$loginBtn.removeClass("disabled"),
                !0;
            this.$loginBtn.addClass("disabled");
            return !1
        },
        login: function (a) {
            a && a.preventDefault();
            this.validatePassword() && (this.$passwordSpinner.removeClass("hidden"), this.clearLoginError(), "undefined" != typeof Craft.csrfTokenValue ? (this.submitLoginIfLoggedOut = !0, this.checkAuthTimeout()) : this.submitLogin())
        },
        submitLogin: function () {
            var a = {loginName: Craft.username, password: this.$passwordInput.val()};
            Craft.postActionRequest("users/login", a, c.proxy(function (a, c) {
                this.$passwordSpinner.addClass("hidden");
                "success" ==
                c ? a.success ? (this.hideLoginModal(), this.checkAuthTimeout()) : (this.showLoginError(a.error), Garnish.shake(this.loginModal.$container), Garnish.isMobileBrowser(!0) || this.$passwordInput.focus()) : this.showLoginError()
            }, this))
        },
        showLoginError: function (a) {
            if (null === a || "undefined" == typeof a)a = Craft.t("An unknown error occurred.");
            this.$loginErrorPara.text(a);
            this.loginModal.updateSizeAndPosition()
        },
        clearLoginError: function () {
            this.showLoginError("")
        }
    }, {checkInterval: 60, minSafeAuthTimeout: 120});
    Craft.CategoryIndex =
        Craft.BaseElementIndex.extend({
            editableGroups: null, $newCategoryBtnGroup: null, $newCategoryBtn: null, afterInit: function () {
                this.editableGroups = [];
                for (var a = 0; a < Craft.editableCategoryGroups.length; a++) {
                    var b = Craft.editableCategoryGroups[a];
                    this.getSourceByKey("group:" + b.id) && this.editableGroups.push(b)
                }
                this.base()
            }, getDefaultSourceKey: function () {
                if ("index" == this.settings.context && "undefined" != typeof defaultGroupHandle)for (var a = 0; a < this.$sources.length; a++) {
                    var b = c(this.$sources[a]);
                    if (b.data("handle") ==
                        defaultGroupHandle)return b.data("key")
                }
                return this.base()
            }, onSelectSource: function () {
                var a = this.$source.data("handle");
                if (this.editableGroups.length) {
                    this.$newCategoryBtnGroup && this.$newCategoryBtnGroup.remove();
                    var b;
                    if (a)for (var d = 0; d < this.editableGroups.length; d++)if (this.editableGroups[d].handle == a) {
                        b = this.editableGroups[d];
                        break
                    }
                    this.$newCategoryBtnGroup = c('<div class="btngroup submit"/>');
                    var e;
                    if (b) {
                        var f = this._getGroupTriggerHref(b), g = "index" == this.settings.context ? Craft.t("New category") :
                            Craft.t("New {group} category", {group: b.name});
                        this.$newCategoryBtn = c('<a class="btn submit add icon" ' + f + ">" + g + "</a>").appendTo(this.$newCategoryBtnGroup);
                        "index" != this.settings.context && this.addListener(this.$newCategoryBtn, "click", function (a) {
                            this._openCreateCategoryModal(a.currentTarget.getAttribute("data-id"))
                        });
                        1 < this.editableGroups.length && (e = c('<div class="btn submit menubtn"></div>').appendTo(this.$newCategoryBtnGroup))
                    } else this.$newCategoryBtn = e = c('<div class="btn submit add icon menubtn">' +
                        Craft.t("New category") + "</div>").appendTo(this.$newCategoryBtnGroup);
                    if (e) {
                        for (var h = '<div class="menu"><ul>', d = 0; d < this.editableGroups.length; d++)if (g = this.editableGroups[d], "index" == this.settings.context || g != b)f = this._getGroupTriggerHref(g), g = "index" == this.settings.context ? g.name : Craft.t("New {group} category", {group: g.name}), h += "<li><a " + f + '">' + g + "</a></li>";
                        c(h + "</ul></div>").appendTo(this.$newCategoryBtnGroup);
                        b = new Garnish.MenuBtn(e);
                        if ("index" != this.settings.context)b.on("optionSelect", c.proxy(function (a) {
                                this._openCreateCategoryModal(a.option.getAttribute("data-id"))
                            },
                            this))
                    }
                    this.addButton(this.$newCategoryBtnGroup)
                }
                "index" == this.settings.context && "undefined" != typeof history && (b = "categories", a && (b += "/" + a), history.replaceState({}, "", Craft.getUrl(b)));
                this.base()
            }, _getGroupTriggerHref: function (a) {
                return "index" == this.settings.context ? 'href="' + Craft.getUrl("categories/" + a.handle + "/new") + '"' : 'data-id="' + a.id + '"'
            }, _openCreateCategoryModal: function (a) {
                if (!this.$newCategoryBtn.hasClass("loading")) {
                    for (var b, d = 0; d < this.editableGroups.length; d++)if (this.editableGroups[d].id ==
                        a) {
                        b = this.editableGroups[d];
                        break
                    }
                    if (b) {
                        this.$newCategoryBtn.addClass("inactive");
                        var e = this.$newCategoryBtn.text();
                        this.$newCategoryBtn.text(Craft.t("New {group} category", {group: b.name}));
                        new Craft.ElementEditor({
                            hudTrigger: this.$newCategoryBtnGroup,
                            elementType: "Category",
                            locale: this.locale,
                            attributes: {groupId: a},
                            onBeginLoading: c.proxy(function () {
                                this.$newCategoryBtn.addClass("loading")
                            }, this),
                            onEndLoading: c.proxy(function () {
                                this.$newCategoryBtn.removeClass("loading")
                            }, this),
                            onHideHud: c.proxy(function () {
                                    this.$newCategoryBtn.removeClass("inactive").text(e)
                                },
                                this),
                            onSaveElement: c.proxy(function (b) {
                                var c = "group:" + a;
                                this.sourceKey != c && this.selectSourceByKey(c);
                                this.selectElementAfterUpdate(b.id);
                                this.updateElements()
                            }, this)
                        })
                    }
                }
            }
        });
    Craft.registerElementIndexClass("Category", Craft.CategoryIndex);
    Craft.CategorySelectInput = Craft.BaseElementSelectInput.extend({
        setSettings: function () {
            this.base.apply(this, arguments);
            this.settings.sortable = !1
        }, getModalSettings: function () {
            var a = this.base();
            a.hideOnSelect = !1;
            return a
        }, getElements: function () {
            return this.$elementsContainer.find(".element")
        },
        onModalSelect: function (a) {
            this.modal.disable();
            this.modal.disableCancelBtn();
            this.modal.disableSelectBtn();
            this.modal.showFooterSpinner();
            for (var b = this.getSelectedElementIds(), d = 0; d < a.length; d++)b.push(a[d].id);
            Craft.postActionRequest("elements/getCategoriesInputHtml", {
                categoryIds: b,
                locale: a[0].locale,
                id: this.settings.id,
                name: this.settings.name,
                limit: this.settings.limit,
                selectionLabel: this.settings.selectionLabel
            }, c.proxy(function (b, d) {
                this.modal.enable();
                this.modal.enableCancelBtn();
                this.modal.enableSelectBtn();
                this.modal.hideFooterSpinner();
                if ("success" == d) {
                    var g = c(b.html).children(".elements");
                    this.$elementsContainer.replaceWith(g);
                    this.$elementsContainer = g;
                    this.resetElements();
                    for (g = 0; g < a.length; g++) {
                        var h = a[g], k = this.getElementById(h.id);
                        k && this.animateElementIntoPlace(h.$element, k)
                    }
                    this.updateDisabledElementsInModal();
                    this.modal.hide();
                    this.onSelectElements()
                }
            }, this))
        }, removeElement: function (a) {
            a = a.add(a.parent().siblings("ul").find(".element"));
            this.removeElements(a);
            for (var b = 0; b < a.length; b++)this._animateCategoryAway(a,
                b)
        }, _animateCategoryAway: function (a, b) {
            var d = b == a.length - 1 ? c.proxy(function () {
                var b = a.first().parent().parent(), c = b.parent();
                c[0] == this.$elementsContainer[0] || b.siblings().length ? b.remove() : c.remove()
            }, this) : null, e = c.proxy(function () {
                this.animateElementAway(a.eq(b), d)
            }, this);
            0 == b ? e() : setTimeout(e, 100 * b)
        }
    });
    Craft.charts = {};
    Craft.charts.DataTable = Garnish.Base.extend({
        columns: null, rows: null, init: function (a) {
            columns = a.columns;
            rows = a.rows;
            rows.forEach(c.proxy(function (a) {
                c.each(a, function (c, e) {
                    switch (columns[c].type) {
                        case "date":
                            a[c] =
                                d3.time.format("%Y-%m-%d").parse(a[c]);
                            break;
                        case "datetime":
                            a[c] = d3.time.format("%Y-%m-%d %H:00:00").parse(a[c]);
                            break;
                        case "percent":
                            a[c] /= 100;
                            break;
                        case "number":
                            a[c] = +a[c]
                    }
                })
            }, this));
            this.columns = columns;
            this.rows = rows
        }
    });
    Craft.charts.Tip = Garnish.Base.extend({
        $tip: null, init: function (a, b) {
            this.setSettings(b, Craft.charts.Tip.defaults);
            this.$container = a;
            this.$tip = c('<div class="tooltip"></div>').appendTo(this.$container);
            this.hide()
        }, tipContentFormat: function (a) {
            var b = this.settings.locale;
            if (this.settings.tipContentFormat)return this.settings.tipContentFormat(b,
                a);
            var b = c("<div />"), d = c('<div class="x-value" />').appendTo(b), e = c('<div class="y-value" />').appendTo(b);
            d.html(this.settings.xTickFormat(a[0]));
            e.html(this.settings.yTickFormat(a[1]));
            return b.get(0)
        }, show: function (a) {
            this.$tip.html(this.tipContentFormat(a));
            this.$tip.css("display", "block");
            a = this.settings.getPosition(this.$tip, a);
            this.$tip.css("left", a.left + "px");
            this.$tip.css("top", a.top + "px")
        }, hide: function () {
            this.$tip.css("display", "none")
        }
    }, {defaults: {locale: null, tipContentFormat: null, getPosition: null}});
    Craft.charts.BaseChart = Garnish.Base.extend({
        $container: null,
        $chart: null,
        chartBaseClass: "cp-chart",
        dataTable: null,
        locale: null,
        orientation: null,
        svg: null,
        width: null,
        height: null,
        x: null,
        y: null,
        init: function (a) {
            this.$container = a;
            d3.select(window).on("resize", c.proxy(function () {
                this.resize()
            }, this))
        },
        initLocale: function () {
            var a = window.d3_locale;
            this.settings.localeDefinition && (a = c.extend(!0, {}, a, this.settings.localeDefinition));
            this.locale = d3.locale(a)
        },
        initChartElement: function () {
            this.$chart && this.$chart.remove();
            var a = this.chartBaseClass;
            this.settings.chartClass && (a += " " + this.settings.chartClass);
            this.$chart = c('<div class="' + a + '" />').appendTo(this.$container)
        },
        draw: function (a, b, c) {
            this.setSettings(b, Craft.charts.BaseChart.defaults);
            c && this.setSettings(b, c);
            this.initLocale();
            this.initChartElement();
            this.orientation = this.settings.orientation;
            this.dataTable = a
        },
        xTickFormat: function (a) {
            switch (this.settings.dataScale) {
                case "year":
                    return a.timeFormat("%Y");
                case "month":
                    return a.timeFormat(this.settings.formats.shortDateFormats.month);
                case "hour":
                    return a.timeFormat(this.settings.formats.shortDateFormats.month + " %H:00:00");
                default:
                    return a.timeFormat(this.settings.formats.shortDateFormats.day)
            }
        },
        yTickFormat: function (a) {
            switch (this.dataTable.columns[1].type) {
                case "currency":
                    return a.numberFormat(this.settings.formats.currencyFormat);
                case "percent":
                    return a.numberFormat(this.settings.formats.percentFormat);
                case "time":
                    return Craft.charts.utils.getDuration;
                default:
                    return a.numberFormat("n")
            }
        },
        resize: function () {
            this.draw(this.dataTable,
                this.settings)
        },
        onAfterDrawTicks: function () {
            c(".tick", this.$chart).each(function (a, b) {
                var d = c("text", b);
                d.clone().appendTo(b);
                d.attr("stroke", "#ffffff");
                d.attr("stroke-width", 3)
            })
        }
    }, {
        defaults: {
            margin: {top: 25, right: 25, bottom: 25, left: 25},
            chartClass: null,
            colors: ["#0594D1", "#DE3800", "#FF9A00", "#009802", "#9B009B"],
            ticksStyles: {fill: "#555", "font-size": "11px"}
        }
    });
    Craft.charts.Area = Craft.charts.BaseChart.extend({
        tip: null, paddedX: null, paddedY: null, draw: function (a, b) {
            this.base(a, b, Craft.charts.Area.defaults);
            this.tip && (this.tip = null);
            this.width = this.$chart.width() - this.settings.margin.left - this.settings.margin.right;
            this.height = this.$chart.height() - this.settings.margin.top - this.settings.margin.bottom;
            this.x = d3.time.scale().range([0, this.width]);
            this.y = d3.scale.linear().range([this.height, 0]);
            this.x.domain(this.xDomain());
            this.y.domain(this.yDomain());
            var c = this.width + (this.settings.margin.left + this.settings.margin.right), e = this.height + (this.settings.margin.top + this.settings.margin.bottom), f = "rtl" != this.orientation ?
                this.settings.margin.left : this.settings.margin.right, g = this.settings.margin.top;
            this.svg = d3.select(this.$chart.get(0)).append("svg").attr("width", c).attr("height", e).append("g").attr("transform", "translate(" + f + "," + g + ")");
            this.drawGridlines();
            this.drawYTicks();
            c = this.getChartMargin();
            this.paddedX = d3.time.scale().range([c.left, this.width - c.right]);
            this.paddedY = d3.scale.linear().range([this.height, 0]);
            this.paddedX.domain(this.xDomain());
            this.paddedY.domain(this.yDomain());
            this.drawXTicks();
            this.onAfterDrawTicks();
            this.drawAxes();
            this.drawChart();
            this.drawPlots();
            this.drawTipTriggers()
        }, getChartMargin: function () {
            var a = 0, b = 0;
            c(".y .tick text:last", this.$chart).each(function (a, e) {
                var f = c(e).get(0).getBoundingClientRect().width;
                f > b && (b = f)
            });
            a = b + 14;
            return {left: "rtl" != this.orientation ? a : 0, right: "rtl" != this.orientation ? 0 : a}
        }, drawChart: function () {
            var a = this.paddedX, b = this.paddedY, c = d3.svg.line().x(function (b) {
                return a(b[0])
            }).y(function (a) {
                return b(a[1])
            });
            this.svg.append("g").attr("class", "chart-line").append("path").datum(this.dataTable.rows).style({
                fill: "none",
                stroke: this.settings.colors[0], "stroke-width": "3px"
            }).attr("d", c);
            c = d3.svg.area().x(function (b) {
                return a(b[0])
            }).y0(this.height).y1(function (a) {
                return b(a[1])
            });
            this.svg.append("g").attr("class", "chart-area").append("path").datum(this.dataTable.rows).style({
                fill: this.settings.colors[0],
                "fill-opacity": "0.3"
            }).attr("d", c)
        }, drawAxes: function () {
            var a = d3.time.scale().range([0, this.width]), b = this.y, a = d3.svg.axis().scale(a).orient("bottom").ticks(0).outerTickSize(0), c = this.height;
            this.svg.append("g").attr("class",
                "x axis").attr("transform", "translate(0," + c + ")").call(a);
            a = this.getChartMargin();
            this.settings.axis.y.show && ("rtl" == this.orientation ? (a = this.width - a.right, c = 0, b = d3.svg.axis().scale(b).orient("left").ticks(0)) : (a = a.left, c = 0, b = d3.svg.axis().scale(b).orient("right").ticks(0)), this.svg.append("g").attr("class", "y axis").attr("transform", "translate(" + a + ", " + c + ")").call(b))
        }, drawYTicks: function () {
            var a = this.y;
            if ("rtl" == this.orientation) {
                var a = d3.svg.axis().scale(a).orient("left").tickFormat(this.yTickFormat(this.locale)).tickValues(this.yTickValues()).ticks(this.yTicks()),
                    b = this.width + 10, c = 0;
                this.svg.append("g").attr("class", "y ticks-axis").attr("transform", "translate(" + b + ",0)").style(this.settings.ticksStyles).call(a);
                this.svg.selectAll(".y.ticks-axis text").style({"text-anchor": "start"})
            } else a = d3.svg.axis().scale(a).orient("right").tickFormat(this.yTickFormat(this.locale)).tickValues(this.yTickValues()).ticks(this.yTicks()), b = -10, c = 0, this.svg.append("g").attr("class", "y ticks-axis").attr("transform", "translate(" + b + ", " + c + ")").style(this.settings.ticksStyles).call(a)
        },
        drawXTicks: function () {
            var a = this.paddedX, a = d3.svg.axis().scale(a).orient("bottom").tickFormat(this.xTickFormat(this.locale)).ticks(this.xTicks());
            this.svg.append("g").attr("class", "x ticks-axis").attr("transform", "translate(0," + this.height + ")").style(this.settings.ticksStyles).call(a)
        }, drawGridlines: function () {
            var a = this.x, b = this.y;
            this.settings.xAxisGridlines && (a = d3.svg.axis().scale(a).orient("bottom"), this.svg.append("g").attr("class", "x grid-line").attr("transform", "translate(0," + this.height + ")").call(a.tickSize(-this.height,
                0, 0).tickFormat("")));
            this.settings.yAxisGridlines && (b = d3.svg.axis().scale(b).orient("left"), a = -this.width, this.svg.append("g").attr("class", "y grid-line").attr("transform", "translate(-0 , 0)").call(b.tickSize(a, 0).tickFormat("").tickValues(this.yTickValues()).ticks(this.yTicks())))
        }, drawPlots: function () {
            var a = this.paddedX, b = this.paddedY;
            this.settings.enablePlots && this.svg.append("g").attr("class", "plots").selectAll("circle").data(this.dataTable.rows).enter().append("circle").style({fill: this.settings.colors[0]}).attr("class",
                c.proxy(function (a, b) {
                    return "plot plot-" + b
                }, this)).attr("r", 4).attr("cx", c.proxy(function (b) {
                return a(b[0])
            }, this)).attr("cy", c.proxy(function (a) {
                return b(a[1])
            }, this))
        }, expandPlot: function (a) {
            this.svg.select(".plot-" + a).attr("r", 5)
        }, unexpandPlot: function (a) {
            this.svg.select(".plot-" + a).attr("r", 4)
        }, getTipTriggerWidth: function () {
            return Math.max(0, this.xAxisTickInterval())
        }, xAxisTickInterval: function () {
            var a = this.getChartMargin();
            return (this.svg.select(".x path.domain").node().getTotalLength() - a.left -
                a.right - 12) / (this.dataTable.rows.length - 1)
        }, drawTipTriggers: function () {
            var a = this.paddedX;
            if (this.settings.enableTips) {
                var b = {
                    chart: this,
                    locale: this.locale,
                    xTickFormat: this.xTickFormat(this.locale),
                    yTickFormat: this.yTickFormat(this.locale),
                    tipContentFormat: c.proxy(this, "tipContentFormat"),
                    getPosition: c.proxy(this, "getTipPosition")
                };
                this.tip ? this.tip.setSettings(b) : this.tip = new Craft.charts.Tip(this.$chart, b);
                this.svg.append("g").attr("class", "tip-triggers").selectAll("rect").data(this.dataTable.rows).enter().append("rect").attr("class",
                    "tip-trigger").style({
                    fill: "transparent",
                    "fill-opacity": "1"
                }).attr("width", this.getTipTriggerWidth()).attr("height", this.height).attr("x", c.proxy(function (b) {
                    return a(b[0]) - this.getTipTriggerWidth() / 2
                }, this)).on("mouseover", c.proxy(function (a, b) {
                    this.expandPlot(b);
                    this.tip.show(a)
                }, this)).on("mouseout", c.proxy(function (a, b) {
                    this.unexpandPlot(b);
                    this.tip.hide()
                }, this))
            }
            Craft.charts.utils.applyShadowFilter("drop-shadow", this.svg)
        }, getTipPosition: function (a, b) {
            var c = this.paddedX, e = this.paddedY;
            this.getChartMargin();
            e = e(b[1]) - a.height() / 2;
            if ("rtl" != this.orientation) {
                var f = c(b[0]) + this.settings.margin.left + 24, g = this.$chart.offset().left + f + a.width(), h = this.$chart.offset().left + this.$chart.width() - 24;
                g > h && (f = c(b[0]) - (a.width() + 24))
            } else f = c(b[0]) - (a.width() + this.settings.margin.left + 24);
            0 > f && (f = c(b[0]) + this.settings.margin.left + 24);
            return {top: e, left: f}
        }, xDomain: function () {
            var a = d3.min(this.dataTable.rows, function (a) {
                return a[0]
            }), b = d3.max(this.dataTable.rows, function (a) {
                return a[0]
            });
            return "rtl" == this.orientation ?
                [b, a] : [a, b]
        }, xTicks: function () {
            return 3
        }, yAxisMaxValue: function () {
            return d3.max(this.dataTable.rows, function (a) {
                return a[1]
            })
        }, yDomain: function () {
            return [0, c.proxy(function () {
                return this.yAxisMaxValue()
            }, this)()]
        }, yTicks: function () {
            return 2
        }, yTickValues: function () {
            return [this.yAxisMaxValue() / 2, this.yAxisMaxValue()]
        }
    }, {
        defaults: {
            chartClass: "area",
            enablePlots: !0,
            enableTips: !0,
            xAxisGridlines: !1,
            yAxisGridlines: !0,
            axis: {y: {show: !1}}
        }
    });
    Craft.charts.utils = {
        getDuration: function (a) {
            var b = parseInt(a, 10);
            a =
                Math.floor(b / 3600);
            var c = Math.floor((b - 3600 * a) / 60), b = b - 3600 * a - 60 * c;
            10 > a && (a = "0" + a);
            10 > c && (c = "0" + c);
            10 > b && (b = "0" + b);
            return a + ":" + c + ":" + b
        }, arrayToDataTable: function (a) {
            var b = {columns: [], rows: []};
            c.each(a, function (d, e) {
                if (0 == d)b.columns = [], c.each(e, function (c, e) {
                    b.columns.push({name: e, type: typeof a[d + 1][c]})
                }); else {
                    var f = [];
                    c.each(e, function (a, b) {
                        f.push(b)
                    });
                    b.rows.push(f)
                }
            });
            return new Craft.charts.DataTable(b)
        }, applyShadowFilter: function (a, b) {
            var c = b.append("defs").append("filter").attr("id", a).attr("width",
                "200%").attr("height", "200%").attr("x", "-50%").attr("y", "-50%");
            c.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 1).attr("result", "blur");
            c.append("feOffset").attr("in", "blur").attr("dx", 0).attr("dy", 0).attr("result", "offsetBlur");
            c = c.append("feMerge");
            c.append("feMergeNode").attr("in", "offsetBlur");
            c.append("feMergeNode").attr("in", "SourceGraphic")
        }
    };
    Craft.CustomizeSourcesModal = Garnish.Modal.extend({
        elementIndex: null,
        $elementIndexSourcesContainer: null,
        $sidebar: null,
        $sourcesContainer: null,
        $sourceSettingsContainer: null,
        $newHeadingBtn: null,
        $footer: null,
        $footerBtnContainer: null,
        $saveBtn: null,
        $cancelBtn: null,
        $saveSpinner: null,
        $loadingSpinner: null,
        sourceSort: null,
        sources: null,
        selectedSource: null,
        updateSourcesOnSave: !1,
        availableTableAttributes: null,
        init: function (a, b) {
            this.base();
            this.setSettings(b, {resizable: !0});
            this.elementIndex = a;
            this.$elementIndexSourcesContainer = this.elementIndex.$sidebar.children("nav").children("ul");
            var d = c('<form class="modal customize-sources-modal"/>').appendTo(Garnish.$bod);
            this.$sidebar = c('<div class="cs-sidebar block-types"/>').appendTo(d);
            this.$sourcesContainer = c('<div class="sources">').appendTo(this.$sidebar);
            this.$sourceSettingsContainer = c('<div class="source-settings">').appendTo(d);
            this.$footer = c('<div class="footer"/>').appendTo(d);
            this.$footerBtnContainer = c('<div class="buttons right"/>').appendTo(this.$footer);
            this.$cancelBtn = c('<div class="btn" role="button"/>').text(Craft.t("Cancel")).appendTo(this.$footerBtnContainer);
            this.$saveBtn = c('<div class="btn submit disabled" role="button"/>').text(Craft.t("Save")).appendTo(this.$footerBtnContainer);
            this.$saveSpinner = c('<div class="spinner hidden"/>').appendTo(this.$footerBtnContainer);
            this.$newHeadingBtn = c('<div class="btn submit add icon"/>').text(Craft.t("New heading")).appendTo(c('<div class="buttons left secondary-buttons"/>').appendTo(this.$footer));
            this.$loadingSpinner = c('<div class="spinner"/>').appendTo(d);
            this.setContainer(d);
            this.show();
            Craft.postActionRequest("elementIndexSettings/getCustomizeSourcesModalData", {elementType: this.elementIndex.elementType}, c.proxy(function (a, b) {
                this.$loadingSpinner.remove();
                "success" == b && (this.$saveBtn.removeClass("disabled"), this.buildModal(a))
            }, this));
            this.addListener(this.$newHeadingBtn, "click", "handleNewHeadingBtnClick");
            this.addListener(this.$cancelBtn, "click", "hide");
            this.addListener(this.$saveBtn, "click", "save");
            this.addListener(this.$container, "submit", "save")
        },
        buildModal: function (a) {
            this.availableTableAttributes = a.availableTableAttributes;
            this.sourceSort = new Garnish.DragSort({
                handle: ".move", axis: "y", onSortChange: c.proxy(function () {
                        this.updateSourcesOnSave = !0
                    },
                    this)
            });
            this.sources = [];
            for (var b = 0; b < a.sources.length; b++) {
                var d = this.addSource(a.sources[b]);
                this.sources.push(d)
            }
            this.selectedSource || "undefined" == typeof this.sources[0] || this.sources[0].select()
        },
        addSource: function (a) {
            var b = c('<div class="customize-sources-item"/>').appendTo(this.$sourcesContainer), d = c('<div class="label"/>').appendTo(b), e = c('<input type="hidden"/>').appendTo(b);
            c('<a class="move icon" title="' + Craft.t("Reorder") + '" role="button"></a>').appendTo(b);
            "undefined" !== typeof a.heading ?
                (b.addClass("heading"), e.attr("name", "sourceOrder[][heading]"), d = new Craft.CustomizeSourcesModal.Heading(this, b, d, e, a), d.updateItemLabel(a.heading)) : (e.attr("name", "sourceOrder[][key]").val(a.key), d = new Craft.CustomizeSourcesModal.Source(this, b, d, e, a), d.updateItemLabel(a.label), a.key == this.elementIndex.sourceKey && d.select());
            this.sourceSort.addItems(b);
            return d
        },
        handleNewHeadingBtnClick: function () {
            var a = this.addSource({heading: ""});
            Garnish.scrollContainerToElement(this.$sidebar, a.$item);
            a.select();
            this.updateSourcesOnSave = !0
        },
        save: function (a) {
            a && a.preventDefault();
            !this.$saveBtn.hasClass("disabled") && this.$saveSpinner.hasClass("hidden") && (this.$saveSpinner.removeClass("hidden"), a = this.$container.serialize() + "&elementType=" + this.elementIndex.elementType, Craft.postActionRequest("elementIndexSettings/saveCustomizeSourcesModalSettings", a, c.proxy(function (a, c) {
                this.$saveSpinner.addClass("hidden");
                if ("success" == c && a.success) {
                    if (this.updateSourcesOnSave && this.$elementIndexSourcesContainer.length) {
                        for (var e,
                                 f, g = 0; g < this.sourceSort.$items.length; g++) {
                            var h = this.sourceSort.$items.eq(g).data("source"), k = h.getIndexSource();
                            k && (h.isHeading() ? f = k : (f && (this.appendSource(f, e), e = f, f = null), this.appendSource(k, e), e = k))
                        }
                        e && (e = e.nextAll(), this.elementIndex.sourceSelect.removeItems(e), e.remove())
                    }
                    this.selectedSource && this.selectedSource.sourceData.key && (this.elementIndex.selectSourceByKey(this.selectedSource.sourceData.key), this.elementIndex.updateElements());
                    Craft.cp.displayNotice(Craft.t("Source settings saved"));
                    this.hide()
                } else e = "success" == c && a.error ? a.error : Craft.t("An unknown error occurred."), Craft.cp.displayError(e)
            }, this)))
        },
        appendSource: function (a, b) {
            b ? a.insertAfter(b) : a.prependTo(this.$elementIndexSourcesContainer)
        },
        destroy: function () {
            for (var a = 0; a < this.sources.length; a++)this.sources[a].destroy();
            delete this.sources;
            this.base()
        }
    });
    Craft.CustomizeSourcesModal.BaseSource = Garnish.Base.extend({
        modal: null,
        $item: null,
        $itemLabel: null,
        $itemInput: null,
        $settingsContainer: null,
        sourceData: null,
        init: function (a,
                        b, c, e, f) {
            this.modal = a;
            this.$item = b;
            this.$itemLabel = c;
            this.$itemInput = e;
            this.sourceData = f;
            this.$item.data("source", this);
            this.addListener(this.$item, "click", "select")
        },
        isHeading: function () {
            return !1
        },
        isSelected: function () {
            return this.modal.selectedSource == this
        },
        select: function () {
            this.isSelected() || (this.modal.selectedSource && this.modal.selectedSource.deselect(), this.$item.addClass("sel"), this.modal.selectedSource = this, this.$settingsContainer ? this.$settingsContainer.removeClass("hidden") : this.$settingsContainer =
                c("<div/>").append(this.createSettings()).appendTo(this.modal.$sourceSettingsContainer), this.modal.$sourceSettingsContainer.scrollTop(0))
        },
        createSettings: function () {
        },
        getIndexSource: function () {
        },
        deselect: function () {
            this.$item.removeClass("sel");
            this.modal.selectedSource = null;
            this.$settingsContainer.addClass("hidden")
        },
        updateItemLabel: function (a) {
            this.$itemLabel.text(a)
        },
        destroy: function () {
            this.$item.data("source", null);
            this.base()
        }
    });
    Craft.CustomizeSourcesModal.Source = Craft.CustomizeSourcesModal.BaseSource.extend({
        createSettings: function () {
            if (this.sourceData.tableAttributes.length) {
                var a =
                    this.sourceData.tableAttributes[0], b = a[0], a = this.createTableColumnOption(b, a[1], !0, !0), d = c("<div/>"), b = [b];
                c('<input type="hidden" name="sources[' + this.sourceData.key + '][tableAttributes][]" value=""/>').appendTo(d);
                for (var e = 1; e < this.sourceData.tableAttributes.length; e++) {
                    var f = this.sourceData.tableAttributes[e], g = f[0], f = f[1];
                    d.append(this.createTableColumnOption(g, f, !1, !0));
                    b.push(g)
                }
                for (e = 0; e < this.modal.availableTableAttributes.length; e++)f = this.modal.availableTableAttributes[e], g = f[0], f = f[1], Craft.inArray(g,
                    b) || d.append(this.createTableColumnOption(g, f, !1, !1));
                new Garnish.DragSort(d.children(), {handle: ".move", axis: "y"});
                return Craft.ui.createField(c([a[0], d[0]]), {
                    label: Craft.t("Table Columns"),
                    instructions: Craft.t("Choose which table columns should be visible for this source, and in which order.")
                })
            }
        }, createTableColumnOption: function (a, b, d, e) {
            $option = c('<div class="customize-sources-table-column"/>').append('<div class="icon move"/>').append(Craft.ui.createCheckbox({
                label: b, name: "sources[" + this.sourceData.key +
                "][tableAttributes][]", value: a, checked: e, disabled: d
            }));
            d && $option.children(".move").addClass("disabled");
            return $option
        }, getIndexSource: function () {
            var a = this.modal.elementIndex.getSourceByKey(this.sourceData.key);
            if (a)return a.closest("li")
        }
    });
    Craft.CustomizeSourcesModal.Heading = Craft.CustomizeSourcesModal.BaseSource.extend({
        $labelField: null, $labelInput: null, $deleteBtn: null, isHeading: function () {
            return !0
        }, select: function () {
            this.base();
            this.$labelInput.focus()
        }, createSettings: function () {
            this.$labelField =
                Craft.ui.createTextField({
                    label: Craft.t("Heading"),
                    instructions: Craft.t("This can be left blank if you just want an unlabeled separator."),
                    value: this.sourceData.heading
                });
            this.$labelInput = this.$labelField.find(".text");
            this.$deleteBtn = c('<a class="error delete"/>').text(Craft.t("Delete heading"));
            this.addListener(this.$labelInput, "textchange", "handleLabelInputChange");
            this.addListener(this.$deleteBtn, "click", "deleteHeading");
            return c([this.$labelField[0], c("<hr/>")[0], this.$deleteBtn[0]])
        }, handleLabelInputChange: function () {
            this.updateItemLabel(this.$labelInput.val());
            this.modal.updateSourcesOnSave = !0
        }, updateItemLabel: function (a) {
            this.$itemLabel.html((a ? Craft.escapeHtml(a) : '<em class="light">' + Craft.t("(blank)") + "</em>") + "&nbsp;");
            this.$itemInput.val(a)
        }, deleteHeading: function () {
            this.modal.sourceSort.removeItems(this.$item);
            this.modal.sources.splice(c.inArray(this, this.modal.sources), 1);
            this.modal.updateSourcesOnSave = !0;
            this.isSelected() && (this.deselect(), this.modal.sources.length && this.modal.sources[0].select());
            this.$item.remove();
            this.$settingsContainer.remove();
            this.destroy()
        }, getIndexSource: function () {
            var a = this.$labelInput ? this.$labelInput.val() : this.sourceData.heading;
            return c('<li class="heading"/>').append(c("<span/>").text(a))
        }
    });
    Craft.DataTableSorter = Garnish.DragSort.extend({
        $table: null, init: function (a, b) {
            this.$table = c(a);
            var d = this.$table.children("tbody").children(":not(.filler)");
            b = c.extend({}, Craft.DataTableSorter.defaults, b);
            b.container = this.$table.children("tbody");
            b.helper = c.proxy(this, "getHelper");
            b.caboose = "<tr/>";
            b.axis = Garnish.Y_AXIS;
            b.magnetStrength =
                4;
            b.helperLagBase = 1.5;
            this.base(d, b)
        }, getHelper: function (a) {
            var b = c('<div class="' + this.settings.helperClass + '"/>').appendTo(Garnish.$bod), d = c("<table/>").appendTo(b), e = c("<tbody/>").appendTo(d);
            a.appendTo(e);
            d.width(this.$table.width());
            d.prop("className", this.$table.prop("className"));
            d = this.$table.find("tr:first").children();
            a = a.children();
            for (e = 0; e < a.length; e++)c(a[e]).width(c(d[e]).width());
            return b
        }
    }, {defaults: {handle: ".move", helperClass: "datatablesorthelper"}});
    Craft.DateRangePicker = Garnish.Base.extend({
        hud: null,
        value: null, presets: null, startDate: null, $startDateInput: null, $endDateInput: null, init: function (a, b) {
            this.$trigger = a;
            this.setSettings(b, Craft.DateRangePicker.defaults);
            this.settings.customRangeStartDate && (this.customRangeStartDate = new Date(this.settings.customRangeStartDate));
            this.settings.customRangeEndDate && (this.customRangeEndDate = new Date(this.settings.customRangeEndDate));
            this.value = this.settings.value;
            this.presets = this.settings.presets;
            "customrange" == this.value ? (this.startDate = this.customRangeStartDate,
                this.endDate = this.customRangeEndDate) : (this.startDate = this.presets[this.value].startDate, this.endDate = this.presets[this.value].endDate);
            this.$trigger.data("value", this.presets[this.value].label);
            this.addListener(this.$trigger, "click", "showHud")
        }, getStartDate: function () {
            return this.startDate
        }, getEndDate: function () {
            return this.endDate
        }, showHud: function () {
            this.$trigger.addClass("active");
            if (this.hud)this.hud.show(); else if (this.createHud(), this.value) {
                var a = this.$items.filter("[data-value=" + this.value +
                    "]");
                a.data("value");
                var b = a.data("label");
                "undefined" != a.data("start-date") && a.data("start-date");
                "undefined" != a.data("end-date") && a.data("end-date");
                a.addClass("sel");
                this.$trigger.data("value", b)
            }
        }, createHud: function () {
            this.$hudBody = c("<div></div>");
            this.createPresets();
            c("<hr />").appendTo(this.$hudBody);
            this.createCustomRangeFields();
            this.$items = c("a.item", this.$hudBody);
            this.addListener(this.$items, "click", "selectItem");
            this.hud = new Garnish.HUD(this.$trigger, this.$hudBody, {
                hudClass: "hud daterange-hud",
                onSubmit: c.proxy(this, "save"), onShow: c.proxy(function () {
                    this.$trigger.addClass("active")
                }, this), onHide: c.proxy(function () {
                    this.$trigger.removeClass("active")
                }, this)
            })
        }, createPresets: function () {
            var a = c('<div class="daterange-items" />').appendTo(this.$hudBody), b = c("<ul />").appendTo(a);
            c.each(this.presets, function (a, e) {
                "customrange" != a && c('<li><a class="item" data-value="' + a + '" data-label="' + e.label + '" data-start-date="' + e.startDate + '" data-end-date="' + e.endDate + '">' + e.label + "</a></li>").appendTo(b)
            })
        },
        createCustomRangeFields: function () {
            var a = c('<div class="daterange-items" />').appendTo(this.$hudBody), b = c("<ul />").appendTo(a), b = c("<li />").appendTo(b);
            c('<a class="item" data-value="customrange" data-label="' + this.presets.customrange.label + '">' + this.presets.customrange.label + "</a>").appendTo(b);
            b = c('<div class="daterange-fields"></div>').appendTo(a);
            a = c('<div class="datewrapper"></div>').appendTo(b);
            b = c('<div class="datewrapper"></div>').appendTo(b);
            if (!this.customRangeStartDate) {
                var d = new Date,
                    d = d.getTime() - 6048E5;
                this.customRangeStartDate = new Date(d)
            }
            this.$startDateInput = c('<input type="text" value="' + Craft.formatDate(this.customRangeStartDate) + '" class="text" size="20" autocomplete="off" value="" />').appendTo(a);
            this.$startDateInput.datepicker(c.extend({
                onClose: c.proxy(function (a, b) {
                    this.$items.removeClass("sel");
                    c("[data-value=customrange]").addClass("sel");
                    var d = new Date(b.currentYear, b.currentMonth, b.currentDay);
                    this.customRangeStartDate = d;
                    d.getTime() > this.customRangeEndDate.getTime() &&
                    (d = d.getTime() + 6048E5, this.customRangeEndDate = d = new Date(d), this.$endDateInput.val(Craft.formatDate(this.customRangeEndDate)));
                    this.showCustomRangeApplyButton()
                }, this)
            }, Craft.datepickerOptions));
            this.customRangeEndDate || (this.customRangeEndDate = new Date);
            this.$endDateInput = c('<input type="text" value="' + Craft.formatDate(this.customRangeEndDate) + '" class="text" size="20" autocomplete="off" value="" />').appendTo(b);
            this.$endDateInput.datepicker(c.extend({
                onClose: c.proxy(function (a, b) {
                    this.$items.removeClass("sel");
                    c("[data-value=customrange]").addClass("sel");
                    var d = new Date(b.currentYear, b.currentMonth, b.currentDay);
                    this.customRangeEndDate = d;
                    d.getTime() < this.customRangeStartDate.getTime() && (d = d.getTime() - 6048E5, this.customRangeStartDate = d = new Date(d), this.$startDateInput.val(Craft.formatDate(this.customRangeStartDate)));
                    this.showCustomRangeApplyButton()
                }, this)
            }, Craft.datepickerOptions))
        }, selectItem: function (a) {
            a = c(a.currentTarget);
            this._selectItem(a)
        }, _selectItem: function (a) {
            this.$items.removeClass("sel");
            var b = a.data("label"), c = a.data("value");
            "customrange" != c ? (this.startDate = a.data("start-date"), this.endDate = a.data("end-date")) : (this.startDate = this.customRangeStartDate, this.endDate = this.customRangeEndDate);
            this.startDate = "undefined" != this.startDate ? this.startDate : null;
            this.endDate = "undefined" != this.endDate ? this.endDate : null;
            a.addClass("sel");
            this.$trigger.data("value", b);
            this.hud.hide();
            this.hideCustomRangeApplyButton();
            this.onAfterSelect(c, this.startDate, this.endDate, this.customRangeStartDate, this.customRangeEndDate)
        },
        hideCustomRangeApplyButton: function () {
            this.$applyBtn && this.$applyBtn.parent().addClass("hidden")
        }, showCustomRangeApplyButton: function () {
            if (this.$applyBtn)this.$applyBtn.parent().removeClass("hidden"); else {
                var a = c('<div class="buttons" />').appendTo(this.$hudBody);
                this.$applyBtn = c('<input type="button" class="btn" value="' + Craft.t("Apply") + '" />').appendTo(a);
                this.addListener(this.$applyBtn, "click", "applyCustomRange")
            }
        }, applyCustomRange: function () {
            var a = this.$items.filter("[data-value=customrange]");
            this._selectItem(a)
        }, onAfterSelect: function (a, b, c, e, f) {
            this.settings.onAfterSelect(a, b, c, e, f)
        }
    }, {
        defaults: {
            value: null,
            presets: {
                d7: {label: Craft.t("Last 7 days"), startDate: "-7 days"},
                d30: {label: Craft.t("Last 30 days"), startDate: "-30 days"},
                lastweek: {label: Craft.t("Last Week"), startDate: "-14 days", endDate: "-7 days"},
                lastmonth: {label: Craft.t("Last Month"), startDate: "-60 days", endDate: "-30 days"},
                customrange: {label: Craft.t("Custom Range")}
            },
            customRangeStartDate: null,
            customRangeEndDate: null,
            onAfterSelect: c.noop
        }
    });
    Craft.DeleteUserModal = Garnish.Modal.extend({
        id: null,
        userId: null,
        $deleteActionRadios: null,
        $deleteSpinner: null,
        userSelect: null,
        _deleting: !1,
        init: function (a, b) {
            this.id = Math.floor(1E9 * Math.random());
            this.userId = a;
            b = c.extend(Craft.DeleteUserModal.defaults, b);
            var d = c('<form class="modal fitted deleteusermodal" method="post" accept-charset="UTF-8">' + Craft.getCsrfInput() + '<input type="hidden" name="action" value="users/deleteUser"/>' + (Garnish.isArray(this.userId) ? "" : '<input type="hidden" name="userId" value="' +
                this.userId + '"/>') + '<input type="hidden" name="redirect" value="' + (Craft.edition == Craft.Pro ? "users" : "dashboard") + '"/></form>').appendTo(Garnish.$bod), e = c('<div class="body"><p>' + Craft.t("What do you want to do with their content?") + '</p><div class="options"><label><input type="radio" name="contentAction" value="transfer"/> ' + Craft.t("Transfer it to:") + '</label><div id="transferselect' + this.id + '" class="elementselect"><div class="elements"></div><div class="btn add icon dashed">' + Craft.t("Choose a user") +
                '</div></div></div><div><label><input type="radio" name="contentAction" value="delete"/> ' + Craft.t("Delete it") + "</label></div></div>").appendTo(d), f = c('<div class="buttons right"/>').appendTo(e), g = c('<div class="btn">' + Craft.t("Cancel") + "</div>").appendTo(f);
            this.$deleteActionRadios = e.find("input[type=radio]");
            this.$deleteSubmitBtn = c('<input type="submit" class="btn submit disabled" value="' + (Garnish.isArray(this.userId) ? Craft.t("Delete users") : Craft.t("Delete user")) + '" />').appendTo(f);
            this.$deleteSpinner =
                c('<div class="spinner hidden"/>').appendTo(f);
            if (Garnish.isArray(this.userId))for (e = ["and"], f = 0; f < this.userId.length; f++)e.push("not " + this.userId[f]); else e = "not " + this.userId;
            this.userSelect = new Craft.BaseElementSelectInput({
                id: "transferselect" + this.id,
                name: "transferContentTo",
                elementType: "User",
                criteria: {id: e},
                limit: 1,
                modalSettings: {closeOtherModals: !1},
                onSelectElements: c.proxy(function () {
                    this.updateSizeAndPosition();
                    this.$deleteActionRadios.first().prop("checked") ? this.validateDeleteInputs() :
                        this.$deleteActionRadios.first().click()
                }, this),
                onRemoveElements: c.proxy(this, "validateDeleteInputs"),
                selectable: !1,
                editable: !1
            });
            this.addListener(g, "click", "hide");
            this.addListener(this.$deleteActionRadios, "change", "validateDeleteInputs");
            this.addListener(d, "submit", "handleSubmit");
            this.base(d, b)
        },
        validateDeleteInputs: function () {
            var a = !1;
            this.$deleteActionRadios.eq(0).prop("checked") ? a = !!this.userSelect.totalSelected : this.$deleteActionRadios.eq(1).prop("checked") && (a = !0);
            a ? this.$deleteSubmitBtn.removeClass("disabled") :
                this.$deleteSubmitBtn.addClass("disabled");
            return a
        },
        handleSubmit: function (a) {
            this._deleting || !this.validateDeleteInputs() ? a.preventDefault() : (this.$deleteSubmitBtn.addClass("active"), this.$deleteSpinner.removeClass("hidden"), this.disable(), this.userSelect.disable(), this._deleting = !0, !1 === this.settings.onSubmit() && a.preventDefault())
        },
        onFadeIn: function () {
            Garnish.isMobileBrowser(!0) || this.$deleteActionRadios.first().focus();
            this.base()
        }
    }, {defaults: {onSubmit: c.noop}});
    Craft.EditableTable = Garnish.Base.extend({
        initialized: !1,
        id: null,
        baseName: null,
        columns: null,
        sorter: null,
        biggestId: -1,
        $table: null,
        $tbody: null,
        $addRowBtn: null,
        init: function (a, b, d, e) {
            this.id = a;
            this.baseName = b;
            this.columns = d;
            this.setSettings(e, Craft.EditableTable.defaults);
            this.$table = c("#" + a);
            this.$tbody = this.$table.children("tbody");
            this.sorter = new Craft.DataTableSorter(this.$table, {
                helperClass: "editabletablesorthelper",
                copyDraggeeInputValuesToHelper: !0
            });
            this.isVisible() ? this.initialize() : this.addListener(Garnish.$win, "resize", "initializeIfVisible")
        },
        isVisible: function () {
            return 0 <
                this.$table.height()
        },
        initialize: function () {
            if (!this.initialized) {
                this.initialized = !0;
                this.removeListener(Garnish.$win, "resize");
                for (var a = this.$tbody.children(), b = 0; b < a.length; b++)new Craft.EditableTable.Row(this, a[b]);
                this.$addRowBtn = this.$table.next(".add");
                this.addListener(this.$addRowBtn, "activate", "addRow")
            }
        },
        initializeIfVisible: function () {
            this.isVisible() && this.initialize()
        },
        addRow: function () {
            var a = this.getRowHtml(this.settings.rowIdPrefix + (this.biggestId + 1), this.columns, this.baseName, {}),
                a = c(a).appendTo(this.$tbody);
            new Craft.EditableTable.Row(this, a);
            this.sorter.addItems(a);
            a.find("input,textarea,select").first().focus();
            this.settings.onAddRow(a)
        },
        getRowHtml: function (a, b, c, e) {
            return Craft.EditableTable.getRowHtml(a, b, c, e)
        }
    }, {
        textualColTypes: ["singleline", "multiline", "number"],
        defaults: {rowIdPrefix: "", onAddRow: c.noop, onDeleteRow: c.noop},
        getRowHtml: function (a, b, c, e) {
            var f = '<tr data-id="' + a + '">', g;
            for (g in b) {
                var h = b[g], k = c + "[" + a + "][" + g + "]", m = "undefined" != typeof e[g] ? e[g] : "", l = Craft.inArray(h.type,
                    Craft.EditableTable.textualColTypes), f = f + ('<td class="' + (l ? "textual" : "") + " " + ("undefined" != typeof h["class"] ? h["class"] : "") + '"' + ("undefined" != typeof h.width ? ' width="' + h.width + '"' : "") + ">");
                switch (h.type) {
                    case "select":
                        var f = f + ('<div class="select small"><select name="' + k + '">'), k = !1, p;
                        for (p in h.options)if (l = h.options[p], "undefined" != typeof l.optgroup)k ? f += "</optgroup>" : k = !0, f += '<optgroup label="' + l.optgroup + '">'; else var n = "undefined" != typeof l.value ? l.value : p, f = f + ('<option value="' + n + '"' + (n == m ? " selected" :
                                "") + ("undefined" != typeof l.disabled && l.disabled ? " disabled" : "") + ">" + ("undefined" != typeof l.label ? l.label : l) + "</option>");
                        k && (f += "</optgroup>");
                        f += "</select></div>";
                        break;
                    case "checkbox":
                        f += '<input type="hidden" name="' + k + '"><input type="checkbox" name="' + k + '" value="1"' + (m ? " checked" : "") + ">";
                        break;
                    default:
                        f += '<textarea name="' + k + '" rows="1">' + m + "</textarea>"
                }
                f += "</td>"
            }
            return f += '<td class="thin action"><a class="move icon" title="' + Craft.t("Reorder") + '"></a></td><td class="thin action"><a class="delete icon" title="' +
                Craft.t("Delete") + '"></a></td></tr>'
        }
    });
    Craft.EditableTable.Row = Garnish.Base.extend({
            table: null,
            id: null,
            niceTexts: null,
            $tr: null,
            $tds: null,
            $textareas: null,
            $deleteBtn: null,
            init: function (a, b) {
                this.table = a;
                this.$tr = c(b);
                this.$tds = this.$tr.children();
                var d = parseInt(this.$tr.attr("data-id").substr(this.table.settings.rowIdPrefix.length));
                d > this.table.biggestId && (this.table.biggestId = d);
                this.$textareas = c();
                this.niceTexts = [];
                var d = {}, e = 0, f;
                for (f in this.table.columns) {
                    var g = this.table.columns[f];
                    if (Craft.inArray(g.type,
                            Craft.EditableTable.textualColTypes)) {
                        $textarea = c("textarea", this.$tds[e]);
                        this.$textareas = this.$textareas.add($textarea);
                        this.addListener($textarea, "focus", "onTextareaFocus");
                        this.addListener($textarea, "mousedown", "ignoreNextTextareaFocus");
                        this.niceTexts.push(new Garnish.NiceText($textarea, {onHeightChange: c.proxy(this, "onTextareaHeightChange")}));
                        if ("singleline" == g.type || "number" == g.type)this.addListener($textarea, "keypress", {type: g.type}, "validateKeypress"), this.addListener($textarea, "textchange",
                            {type: g.type}, "validateValue");
                        d[f] = $textarea
                    }
                    e++
                }
                this.onTextareaHeightChange();
                for (f in this.table.columns)g = this.table.columns[f], g.autopopulate && "undefined" != typeof d[g.autopopulate] && !d[f].val() && new Craft.HandleGenerator(d[f], d[g.autopopulate]);
                f = this.$tr.children().last().find(".delete");
                this.addListener(f, "click", "deleteRow")
            },
            onTextareaFocus: function (a) {
                this.onTextareaHeightChange();
                var b = c(a.currentTarget);
                b.data("ignoreNextFocus") ? b.data("ignoreNextFocus", !1) : setTimeout(function () {
                    var a =
                        b.val();
                    "undefined" != typeof b[0].setSelectionRange ? b[0].setSelectionRange(0, 2 * a.length) : b.val(a)
                }, 0)
            },
            ignoreNextTextareaFocus: function (a) {
                c.data(a.currentTarget, "ignoreNextFocus", !0)
            },
            validateKeypress: function (a) {
                var b = a.keyCode ? a.keyCode : a.charCode;
                Garnish.isCtrlKeyPressed(a) || b != Garnish.RETURN_KEY && ("number" != a.data.type || Craft.inArray(b, Craft.EditableTable.Row.numericKeyCodes)) || a.preventDefault()
            },
            validateValue: function (a) {
                var b;
                "number" == a.data.type ? (b = a.currentTarget.value.match(/^\s*(-?[\d\.]*)/),
                    b = null !== b ? b[1] : "") : b = a.currentTarget.value.replace(/[\r\n]/g, "");
                b !== a.currentTarget.value && (a.currentTarget.value = b)
            },
            onTextareaHeightChange: function () {
                for (var a = -1, b = 0; b < this.niceTexts.length; b++)this.niceTexts[b].height > a && (a = this.niceTexts[b].height);
                this.$textareas.css("min-height", a);
                b = this.$textareas.first().parent().height();
                b > a && this.$textareas.css("min-height", b)
            },
            deleteRow: function () {
                this.table.sorter.removeItems(this.$tr);
                this.$tr.remove();
                this.table.settings.onDeleteRow(this.$tr)
            }
        },
        {numericKeyCodes: [9, 8, 37, 38, 39, 40, 45, 91, 46, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]});
    Craft.ElementActionTrigger = Garnish.Base.extend({
        maxLevels: null,
        newChildUrl: null,
        $trigger: null,
        $selectedItems: null,
        triggerEnabled: !0,
        init: function (a) {
            this.setSettings(a, Craft.ElementActionTrigger.defaults);
            this.$trigger = c("#" + a.handle + "-actiontrigger");
            this.settings.activate && (this.$trigger.data("custom-handler", !0), "FORM" == this.$trigger.prop("nodeName") ? this.addListener(this.$trigger, "submit", "handleTriggerActivation") :
                this.addListener(this.$trigger, "click", "handleTriggerActivation"));
            this.updateTrigger();
            Craft.elementIndex.on("selectionChange", c.proxy(this, "updateTrigger"))
        },
        updateTrigger: function () {
            0 != Craft.elementIndex.getSelectedElements().length && (this.validateSelection() ? this.enableTrigger() : this.disableTrigger())
        },
        validateSelection: function () {
            var a = !0;
            this.$selectedItems = Craft.elementIndex.getSelectedElements();
            !this.settings.batch && 1 < this.$selectedItems.length ? a = !1 : "function" == typeof this.settings.validateSelection &&
            (a = this.settings.validateSelection(this.$selectedItems));
            return a
        },
        enableTrigger: function () {
            this.triggerEnabled || (this.$trigger.removeClass("disabled"), this.triggerEnabled = !0)
        },
        disableTrigger: function () {
            this.triggerEnabled && (this.$trigger.addClass("disabled"), this.triggerEnabled = !1)
        },
        handleTriggerActivation: function (a) {
            a.preventDefault();
            a.stopPropagation();
            this.triggerEnabled && this.settings.activate(this.$selectedItems)
        }
    }, {defaults: {handle: null, batch: !0, validateSelection: null, activate: null}});
    Craft.ElementEditor =
        Garnish.Base.extend({
            $element: null,
            elementId: null,
            locale: null,
            $form: null,
            $fieldsContainer: null,
            $cancelBtn: null,
            $saveBtn: null,
            $spinner: null,
            $localeSelect: null,
            $localeSpinner: null,
            hud: null,
            init: function (a, b) {
                "undefined" == typeof b && c.isPlainObject(a) && (b = a, a = null);
                this.$element = a;
                this.setSettings(b, Craft.ElementEditor.defaults);
                this.loadHud()
            },
            setElementAttribute: function (a, b) {
                this.settings.attributes || (this.settings.attributes = {});
                null === b ? delete this.settings.attributes[a] : this.settings.attributes[a] =
                    b
            },
            getBaseData: function () {
                var a = c.extend({}, this.settings.params);
                this.settings.locale ? a.locale = this.settings.locale : this.$element && this.$element.data("locale") && (a.locale = this.$element.data("locale"));
                this.settings.elementId ? a.elementId = this.settings.elementId : this.$element && this.$element.data("id") && (a.elementId = this.$element.data("id"));
                this.settings.elementType && (a.elementType = this.settings.elementType);
                this.settings.attributes && (a.attributes = this.settings.attributes);
                return a
            },
            loadHud: function () {
                this.onBeginLoading();
                var a = this.getBaseData();
                a.includeLocales = this.settings.showLocaleSwitcher;
                Craft.postActionRequest("elements/getEditorHtml", a, c.proxy(this, "showHud"))
            },
            showHud: function (a, b) {
                this.onEndLoading();
                if ("success" == b) {
                    var d = c();
                    if (a.locales) {
                        var e = c('<div class="header"/>'), f = c('<div class="select"/>').appendTo(e);
                        this.$localeSelect = c("<select/>").appendTo(f);
                        this.$localeSpinner = c('<div class="spinner hidden"/>').appendTo(e);
                        for (f = 0; f < a.locales.length; f++) {
                            var g = a.locales[f];
                            c('<option value="' + g.id + '"' +
                                (g.id == a.locale ? ' selected="selected"' : "") + ">" + g.name + "</option>").appendTo(this.$localeSelect)
                        }
                        this.addListener(this.$localeSelect, "change", "switchLocale");
                        d = d.add(e)
                    }
                    this.$form = c("<div/>");
                    this.$fieldsContainer = c('<div class="fields"/>').appendTo(this.$form);
                    this.updateForm(a);
                    this.onCreateForm(this.$form);
                    e = c('<div class="footer"/>').appendTo(this.$form);
                    e = c('<div class="buttons right"/>').appendTo(e);
                    this.$cancelBtn = c('<div class="btn">' + Craft.t("Cancel") + "</div>").appendTo(e);
                    this.$saveBtn = c('<input class="btn submit" type="submit" value="' +
                        Craft.t("Save") + '"/>').appendTo(e);
                    this.$spinner = c('<div class="spinner hidden"/>').appendTo(e);
                    d = d.add(this.$form);
                    this.hud ? (this.hud.updateBody(d), this.hud.updateSizeAndPosition()) : (this.hud = new Garnish.HUD(this.settings.hudTrigger || this.$element, d, {
                        bodyClass: "body elementeditor",
                        closeOtherHUDs: !1,
                        onShow: c.proxy(this, "onShowHud"),
                        onHide: c.proxy(this, "onHideHud"),
                        onSubmit: c.proxy(this, "saveElement")
                    }), this.hud.$hud.data("elementEditor", this), this.hud.on("hide", c.proxy(function () {
                            delete this.hud
                        },
                        this)));
                    d.find(".text:first").focus();
                    this.addListener(this.$cancelBtn, "click", function () {
                        this.hud.hide()
                    })
                }
            },
            switchLocale: function () {
                var a = this.$localeSelect.val();
                if (a != this.locale) {
                    this.$localeSpinner.removeClass("hidden");
                    var b = this.getBaseData();
                    b.locale = a;
                    Craft.postActionRequest("elements/getEditorHtml", b, c.proxy(function (a, b) {
                        this.$localeSpinner.addClass("hidden");
                        "success" == b ? this.updateForm(a) : this.$localeSelect.val(this.locale)
                    }, this))
                }
            },
            updateForm: function (a) {
                this.locale = a.locale;
                this.$fieldsContainer.html(a.html);
                for (var b = this.$fieldsContainer.find("> .meta > .field > .heading > .instructions"), d = 0; d < b.length; d++)b.eq(d).replaceWith(c("<span/>", {
                    "class": "info",
                    html: b.eq(d).children().html()
                })).infoicon();
                Garnish.requestAnimationFrame(c.proxy(function () {
                    Craft.appendHeadHtml(a.headHtml);
                    Craft.appendFootHtml(a.footHtml);
                    Craft.initUiElements(this.$fieldsContainer)
                }, this))
            },
            saveElement: function () {
                var a = this.settings.validators;
                if (c.isArray(a))for (var b = 0; b < a.length; b++)if (c.isFunction(a[b]) && !a[b].call())return !1;
                this.$spinner.removeClass("hidden");
                a = c.param(this.getBaseData()) + "&" + this.hud.$body.serialize();
                Craft.postActionRequest("elements/saveElement", a, c.proxy(function (a, b) {
                    this.$spinner.addClass("hidden");
                    if ("success" == b)if ("success" == b && a.success) {
                        if (this.$element && this.locale == this.$element.data("locale")) {
                            var c = this.$element.find(".title"), g = c.find("a");
                            g.length && a.cpEditUrl ? (g.attr("href", a.cpEditUrl), g.text(a.newTitle)) : c.text(a.newTitle)
                        }
                        "undefined" != typeof Craft.livePreview && Craft.livePreview.updateIframe(!0);
                        this.closeHud();
                        this.onSaveElement(a)
                    } else this.updateForm(a), Garnish.shake(this.hud.$hud)
                }, this))
            },
            closeHud: function () {
                this.hud.hide();
                delete this.hud
            },
            onShowHud: function () {
                this.settings.onShowHud();
                this.trigger("showHud")
            },
            onHideHud: function () {
                this.settings.onHideHud();
                this.trigger("hideHud")
            },
            onBeginLoading: function () {
                this.$element && this.$element.addClass("loading");
                this.settings.onBeginLoading();
                this.trigger("beginLoading")
            },
            onEndLoading: function () {
                this.$element && this.$element.removeClass("loading");
                this.settings.onEndLoading();
                this.trigger("endLoading")
            },
            onSaveElement: function (a) {
                this.settings.onSaveElement(a);
                this.trigger("saveElement", {response: a})
            },
            onCreateForm: function (a) {
                this.settings.onCreateForm(a)
            }
        }, {
            defaults: {
                hudTrigger: null,
                showLocaleSwitcher: !0,
                elementId: null,
                elementType: null,
                locale: null,
                attributes: null,
                params: null,
                onShowHud: c.noop,
                onHideHud: c.noop,
                onBeginLoading: c.noop,
                onEndLoading: c.noop,
                onCreateForm: c.noop,
                onSaveElement: c.noop,
                validators: []
            }
        });
    Craft.ElevatedSessionForm = Garnish.Base.extend({
        $form: null,
        inputs: null, init: function (a, b) {
            this.$form = c(a);
            if ("undefined" !== typeof b) {
                this.inputs = [];
                b = c.makeArray(b);
                for (var d = 0; d < b.length; d++)for (var e = c(b[d]), f = 0; f < e.length; f++) {
                    var g = e.eq(f);
                    this.inputs.push({input: g, val: Garnish.getInputPostVal(g)})
                }
            }
            this.addListener(this.$form, "submit", "handleFormSubmit")
        }, handleFormSubmit: function (a) {
            if (Craft.elevatedSessionManager.fetchingTimeout)a.preventDefault(); else {
                if (this.inputs) {
                    for (var b = !1, d = 0; d < this.inputs.length; d++)if (Garnish.getInputPostVal(this.inputs[d].input) !=
                        this.inputs[d].val) {
                        b = !0;
                        break
                    }
                    if (!b)return
                }
                a.preventDefault();
                Craft.elevatedSessionManager.requireElevatedSession(c.proxy(this, "submitForm"))
            }
        }, submitForm: function () {
            this.disable();
            this.$form.submit();
            this.enable()
        }
    });
    Craft.ElevatedSessionManager = Garnish.Base.extend({
        fetchingTimeout: !1,
        passwordModal: null,
        $passwordInput: null,
        $passwordSpinner: null,
        $submitBtn: null,
        $errorPara: null,
        callback: null,
        requireElevatedSession: function (a) {
            this.callback = a;
            this.fetchingTimeout = !0;
            Craft.postActionRequest("users/getElevatedSessionTimeout",
                c.proxy(function (a, c) {
                    this.fetchingTimeout = !1;
                    "success" == c && (a.timeout >= Craft.ElevatedSessionManager.minSafeElevatedSessionTimeout ? this.callback() : this.showPasswordModal())
                }, this))
        },
        showPasswordModal: function () {
            if (this.passwordModal)this.passwordModal.show(); else {
                var a = c('<form id="elevatedsessionmodal" class="modal secure fitted"/>'), b = c('<div class="body"><p>' + Craft.t("Enter your password to continue.") + "</p></div>").appendTo(a), d = c('<div class="inputcontainer">').appendTo(b), e = c('<table class="inputs fullwidth"/>').appendTo(d),
                    f = c("<tr/>").appendTo(e), e = c("<td/>").appendTo(f), f = c('<td class="thin"/>').appendTo(f), e = c('<div class="passwordwrapper"/>').appendTo(e);
                this.$passwordInput = c('<input type="password" class="text password fullwidth" placeholder="' + Craft.t("Password") + '"/>').appendTo(e);
                this.$passwordSpinner = c('<div class="spinner hidden"/>').appendTo(d);
                this.$submitBtn = c('<input type="submit" class="btn submit disabled" value="' + Craft.t("Submit") + '" />').appendTo(f);
                this.$errorPara = c('<p class="error"/>').appendTo(b);
                this.passwordModal = new Garnish.Modal(a, {
                    closeOtherModals: !1, onFadeIn: c.proxy(function () {
                        setTimeout(c.proxy(this, "focusPasswordInput"), 100)
                    }, this), onFadeOut: c.proxy(function () {
                        this.$passwordInput.val("")
                    }, this)
                });
                new Craft.PasswordInput(this.$passwordInput, {
                    onToggleInput: c.proxy(function (a) {
                        this.$passwordInput = a
                    }, this)
                });
                this.addListener(this.$passwordInput, "textchange", "validatePassword");
                this.addListener(a, "submit", "submitPassword")
            }
        },
        focusPasswordInput: function () {
            Garnish.isMobileBrowser(!0) || this.$passwordInput.focus()
        },
        validatePassword: function () {
            if (6 <= this.$passwordInput.val().length)return this.$submitBtn.removeClass("disabled"), !0;
            this.$submitBtn.addClass("disabled");
            return !1
        },
        submitPassword: function (a) {
            a && a.preventDefault();
            this.validatePassword() && (this.$passwordSpinner.removeClass("hidden"), this.clearLoginError(), a = {password: this.$passwordInput.val()}, Craft.postActionRequest("users/startElevatedSession", a, c.proxy(function (a, c) {
                this.$passwordSpinner.addClass("hidden");
                "success" == c ? a.success ? (this.passwordModal.hide(),
                    this.callback()) : (this.showPasswordError(Craft.t("Incorrect password.")), Garnish.shake(this.passwordModal.$container), this.focusPasswordInput()) : this.showPasswordError()
            }, this)))
        },
        showPasswordError: function (a) {
            if (null === a || "undefined" == typeof a)a = Craft.t("An unknown error occurred.");
            this.$errorPara.text(a);
            this.passwordModal.updateSizeAndPosition()
        },
        clearLoginError: function () {
            this.showPasswordError("")
        }
    }, {minSafeElevatedSessionTimeout: 5});
    Craft.elevatedSessionManager = new Craft.ElevatedSessionManager;
    Craft.EntryIndex = Craft.BaseElementIndex.extend({
        publishableSections: null, $newEntryBtnGroup: null, $newEntryBtn: null, afterInit: function () {
            this.publishableSections = [];
            for (var a = 0; a < Craft.publishableSections.length; a++) {
                var b = Craft.publishableSections[a];
                this.getSourceByKey("section:" + b.id) && this.publishableSections.push(b)
            }
            this.base()
        }, getDefaultSourceKey: function () {
            if ("index" == this.settings.context && "undefined" != typeof defaultSectionHandle) {
                if ("singles" == defaultSectionHandle)return "singles";
                for (var a =
                    0; a < this.$sources.length; a++) {
                    var b = c(this.$sources[a]);
                    if (b.data("handle") == defaultSectionHandle)return b.data("key")
                }
            }
            return this.base()
        }, onSelectSource: function () {
            var a = "singles" == this.$source.data("key") ? "singles" : this.$source.data("handle");
            if (this.publishableSections.length) {
                this.$newEntryBtnGroup && this.$newEntryBtnGroup.remove();
                var b;
                if (a)for (var d = 0; d < this.publishableSections.length; d++)if (this.publishableSections[d].handle == a) {
                    b = this.publishableSections[d];
                    break
                }
                this.$newEntryBtnGroup = c('<div class="btngroup submit"/>');
                var e;
                if (b) {
                    var f = this._getSectionTriggerHref(b), g = "index" == this.settings.context ? Craft.t("New entry") : Craft.t("New {section} entry", {section: b.name});
                    this.$newEntryBtn = c('<a class="btn submit add icon" ' + f + ">" + g + "</a>").appendTo(this.$newEntryBtnGroup);
                    "index" != this.settings.context && this.addListener(this.$newEntryBtn, "click", function (a) {
                        this._openCreateEntryModal(a.currentTarget.getAttribute("data-id"))
                    });
                    1 < this.publishableSections.length && (e = c('<div class="btn submit menubtn"></div>').appendTo(this.$newEntryBtnGroup))
                } else this.$newEntryBtn =
                    e = c('<div class="btn submit add icon menubtn">' + Craft.t("New entry") + "</div>").appendTo(this.$newEntryBtnGroup);
                if (e) {
                    for (var h = '<div class="menu"><ul>', d = 0; d < this.publishableSections.length; d++)if (g = this.publishableSections[d], "index" == this.settings.context || g != b)f = this._getSectionTriggerHref(g), g = "index" == this.settings.context ? g.name : Craft.t("New {section} entry", {section: g.name}), h += "<li><a " + f + '">' + g + "</a></li>";
                    c(h + "</ul></div>").appendTo(this.$newEntryBtnGroup);
                    b = new Garnish.MenuBtn(e);
                    if ("index" !=
                        this.settings.context)b.on("optionSelect", c.proxy(function (a) {
                        this._openCreateEntryModal(a.option.getAttribute("data-id"))
                    }, this))
                }
                this.addButton(this.$newEntryBtnGroup)
            }
            "index" == this.settings.context && "undefined" != typeof history && (b = "entries", a && (b += "/" + a), history.replaceState({}, "", Craft.getUrl(b)));
            this.base()
        }, _getSectionTriggerHref: function (a) {
            return "index" == this.settings.context ? 'href="' + Craft.getUrl("entries/" + a.handle + "/new") + '"' : 'data-id="' + a.id + '"'
        }, _openCreateEntryModal: function (a) {
            if (!this.$newEntryBtn.hasClass("loading")) {
                for (var b,
                         d = 0; d < this.publishableSections.length; d++)if (this.publishableSections[d].id == a) {
                    b = this.publishableSections[d];
                    break
                }
                if (b) {
                    this.$newEntryBtn.addClass("inactive");
                    var e = this.$newEntryBtn.text();
                    this.$newEntryBtn.text(Craft.t("New {section} entry", {section: b.name}));
                    new Craft.ElementEditor({
                        hudTrigger: this.$newEntryBtnGroup,
                        elementType: "Entry",
                        locale: this.locale,
                        attributes: {sectionId: a},
                        onBeginLoading: c.proxy(function () {
                            this.$newEntryBtn.addClass("loading")
                        }, this),
                        onEndLoading: c.proxy(function () {
                                this.$newEntryBtn.removeClass("loading")
                            },
                            this),
                        onHideHud: c.proxy(function () {
                            this.$newEntryBtn.removeClass("inactive").text(e)
                        }, this),
                        onSaveElement: c.proxy(function (b) {
                            var c = "section:" + a;
                            this.sourceKey != c && this.selectSourceByKey(c);
                            this.selectElementAfterUpdate(b.id);
                            this.updateElements()
                        }, this)
                    })
                }
            }
        }
    });
    Craft.registerElementIndexClass("Entry", Craft.EntryIndex);
    Craft.EntryUrlFormatGenerator = Craft.BaseInputGenerator.extend({
        generateTargetValue: function (a) {
            a = a.replace("/<(.*?)>/g", "");
            a = a.toLowerCase();
            a = Craft.asciiString(a);
            a = a.replace(/^[^a-z]+/,
                "");
            a = a.replace(/[^a-z0-9]+$/, "");
            (a = Craft.filterArray(a.split(/[^a-z0-9]+/)).join("-")) && this.settings.suffix && (a += this.settings.suffix);
            return a
        }
    });
    Craft.FieldLayoutDesigner = Garnish.Base.extend({
        $container: null,
        $tabContainer: null,
        $unusedFieldContainer: null,
        $newTabBtn: null,
        $allFields: null,
        tabGrid: null,
        unusedFieldGrid: null,
        tabDrag: null,
        fieldDrag: null,
        init: function (a, b) {
            this.$container = c(a);
            this.setSettings(b, Craft.FieldLayoutDesigner.defaults);
            this.$tabContainer = this.$container.children(".fld-tabs");
            this.$unusedFieldContainer = this.$container.children(".unusedfields");
            this.$newTabBtn = this.$container.find("> .newtabbtn-container > .btn");
            this.$allFields = this.$unusedFieldContainer.find(".fld-field");
            this.tabGrid = new Craft.Grid(this.$tabContainer, Craft.FieldLayoutDesigner.gridSettings);
            this.unusedFieldGrid = new Craft.Grid(this.$unusedFieldContainer, Craft.FieldLayoutDesigner.gridSettings);
            for (var d = this.$tabContainer.children(), e = 0; e < d.length; e++)this.initTab(c(d[e]));
            this.fieldDrag = new Craft.FieldLayoutDesigner.FieldDrag(this);
            this.settings.customizableTabs && (this.tabDrag = new Craft.FieldLayoutDesigner.TabDrag(this), this.addListener(this.$newTabBtn, "activate", "addTab"))
        },
        initTab: function (a) {
            if (this.settings.customizableTabs) {
                var b = a.find(".tabs .settings"), d = c('<div class="menu" data-align="center"/>').insertAfter(b), d = c("<ul/>").appendTo(d);
                c('<li><a data-action="rename">' + Craft.t("Rename") + "</a></li>").appendTo(d);
                c('<li><a data-action="delete">' + Craft.t("Delete") + "</a></li>").appendTo(d);
                new Garnish.MenuBtn(b, {
                    onOptionSelect: c.proxy(this,
                        "onTabOptionSelect")
                })
            }
            a = a.children(".fld-tabcontent").children();
            for (b = 0; b < a.length; b++)this.initField(c(a[b]))
        },
        initField: function (a) {
            var b = a.find(".settings"), d = c('<div class="menu" data-align="center"/>').insertAfter(b), d = c("<ul/>").appendTo(d);
            a.hasClass("fld-required") ? c('<li><a data-action="toggle-required">' + Craft.t("Make not required") + "</a></li>").appendTo(d) : c('<li><a data-action="toggle-required">' + Craft.t("Make required") + "</a></li>").appendTo(d);
            c('<li><a data-action="remove">' + Craft.t("Remove") +
                "</a></li>").appendTo(d);
            new Garnish.MenuBtn(b, {onOptionSelect: c.proxy(this, "onFieldOptionSelect")})
        },
        onTabOptionSelect: function (a) {
            if (this.settings.customizableTabs) {
                a = c(a);
                var b = a.data("menu").$anchor.parent().parent().parent();
                switch (a.data("action")) {
                    case "rename":
                        this.renameTab(b);
                        break;
                    case "delete":
                        this.deleteTab(b)
                }
            }
        },
        onFieldOptionSelect: function (a) {
            a = c(a);
            var b = a.data("menu").$anchor.parent();
            switch (a.data("action")) {
                case "toggle-required":
                    this.toggleRequiredField(b, a);
                    break;
                case "remove":
                    this.removeField(b)
            }
        },
        renameTab: function (a) {
            if (this.settings.customizableTabs) {
                var b = a.find(".tabs .tab span"), c = b.text(), e = prompt(Craft.t("Give your tab a name."), c);
                e && e != c && (b.text(e), a.find(".id-input").attr("name", this.getFieldInputName(e)))
            }
        },
        deleteTab: function (a) {
            if (this.settings.customizableTabs) {
                for (var b = a.find(".fld-field"), d = 0; d < b.length; d++) {
                    var e = c(b[d]).attr("data-id");
                    this.removeFieldById(e)
                }
                this.tabGrid.removeItems(a);
                this.tabDrag.removeItems(a);
                a.remove()
            }
        },
        toggleRequiredField: function (a, b) {
            a.hasClass("fld-required") ?
                (a.removeClass("fld-required"), a.find(".required-input").remove(), setTimeout(function () {
                    b.text(Craft.t("Make required"))
                }, 500)) : (a.addClass("fld-required"), c('<input class="required-input" type="hidden" name="' + this.settings.requiredFieldInputName + '" value="' + a.data("id") + '">').appendTo(a), setTimeout(function () {
                b.text(Craft.t("Make not required"))
            }, 500))
        },
        removeField: function (a) {
            var b = a.attr("data-id");
            a.remove();
            this.removeFieldById(b);
            this.tabGrid.refreshCols(!0)
        },
        removeFieldById: function (a) {
            a =
                this.$allFields.filter("[data-id=" + a + "]:first");
            var b = a.closest(".fld-tab");
            a.removeClass("hidden");
            b.hasClass("hidden") ? (b.removeClass("hidden"), this.unusedFieldGrid.addItems(b), this.settings.customizableTabs && this.tabDrag.addItems(b)) : this.unusedFieldGrid.refreshCols(!0)
        },
        addTab: function () {
            if (this.settings.customizableTabs) {
                var a = c('<div class="fld-tab"><div class="tabs"><div class="tab sel draggable"><span>Tab ' + (this.tabGrid.$items.length + 1) + '</span><a class="settings icon" title="' + Craft.t("Rename") +
                    '"></a></div></div><div class="fld-tabcontent"></div></div>').appendTo(this.$tabContainer);
                this.tabGrid.addItems(a);
                this.tabDrag.addItems(a);
                this.initTab(a)
            }
        },
        getFieldInputName: function (a) {
            return this.settings.fieldInputName.replace(/__TAB_NAME__/g, Craft.encodeUriComponent(a))
        }
    }, {
        gridSettings: {
            itemSelector: ".fld-tab:not(.hidden)",
            minColWidth: 240,
            percentageWidths: !1,
            fillMode: "grid",
            snapToGrid: 30
        },
        defaults: {
            customizableTabs: !0,
            fieldInputName: "fieldLayout[__TAB_NAME__][]",
            requiredFieldInputName: "requiredFields[]"
        }
    });
    Craft.FieldLayoutDesigner.BaseDrag = Garnish.Drag.extend({
        designer: null,
        $insertion: null,
        showingInsertion: !1,
        $caboose: null,
        draggingUnusedItem: !1,
        addToTabGrid: !1,
        init: function (a, b) {
            this.designer = a;
            var c = this.designer.$tabContainer.find(this.itemSelector).add(this.designer.$unusedFieldContainer.find(this.itemSelector));
            this.base(c, b)
        },
        onDragStart: function () {
            this.base();
            this.draggingUnusedItem = this.$draggee.hasClass("unused");
            this.$insertion = this.getInsertion();
            this.addCaboose();
            this.$items = c().add(this.$items.add(this.$caboose));
            this.addToTabGrid && this.designer.tabGrid.addItems(this.$caboose);
            this.draggingUnusedItem ? this.showingInsertion = !1 : (this.$insertion.insertBefore(this.$draggee), this.$draggee.detach(), this.$items = c().add(this.$items.not(this.$draggee).add(this.$insertion)), this.showingInsertion = !0, this.addToTabGrid && (this.designer.tabGrid.removeItems(this.$draggee), this.designer.tabGrid.addItems(this.$insertion)));
            this.setMidpoints()
        },
        addCaboose: c.noop,
        getItemContainer: c.noop,
        isItemInTabContainer: function (a) {
            return this.getItemContainer(a)[0] ==
                this.designer.$tabContainer[0]
        },
        setMidpoints: function () {
            for (var a = 0; a < this.$items.length; a++) {
                var b = c(this.$items[a]);
                if (this.isItemInTabContainer(b)) {
                    var d = b.offset();
                    b.data("midpoint", {left: d.left + b.outerWidth() / 2, top: d.top + b.outerHeight() / 2})
                }
            }
        },
        onDrag: function () {
            this.draggingUnusedItem && !Garnish.hitTest(this.mouseX, this.mouseY, this.designer.$tabContainer) ? this.showingInsertion && (this.$insertion.remove(), this.$items = c().add(this.$items.not(this.$insertion)), this.showingInsertion = !1, this.addToTabGrid ?
                this.designer.tabGrid.removeItems(this.$insertion) : this.designer.tabGrid.refreshCols(!0), this.setMidpoints()) : (this.onDrag._closestItem = this.getClosestItem(), this.onDrag._closestItem != this.$insertion[0] && (this.showingInsertion && c.inArray(this.$insertion[0], this.$items) < c.inArray(this.onDrag._closestItem, this.$items) && -1 == c.inArray(this.onDrag._closestItem, this.$caboose) ? this.$insertion.insertAfter(this.onDrag._closestItem) : this.$insertion.insertBefore(this.onDrag._closestItem), this.$items = c().add(this.$items.add(this.$insertion)),
                this.showingInsertion = !0, this.addToTabGrid ? this.designer.tabGrid.addItems(this.$insertion) : this.designer.tabGrid.refreshCols(!0), this.setMidpoints()));
            this.base()
        },
        getClosestItem: function () {
            this.getClosestItem._closestItem = null;
            this.getClosestItem._closestItemMouseDiff = null;
            for (this.getClosestItem._i = 0; this.getClosestItem._i < this.$items.length; this.getClosestItem._i++)if (this.getClosestItem._$item = c(this.$items[this.getClosestItem._i]), this.isItemInTabContainer(this.getClosestItem._$item) && (this.getClosestItem._midpoint =
                    this.getClosestItem._$item.data("midpoint"), this.getClosestItem._mouseDiff = Garnish.getDist(this.getClosestItem._midpoint.left, this.getClosestItem._midpoint.top, this.mouseX, this.mouseY), null === this.getClosestItem._closestItem || this.getClosestItem._mouseDiff < this.getClosestItem._closestItemMouseDiff))this.getClosestItem._closestItem = this.getClosestItem._$item[0], this.getClosestItem._closestItemMouseDiff = this.getClosestItem._mouseDiff;
            return this.getClosestItem._closestItem
        },
        onDragStop: function () {
            this.showingInsertion &&
            (this.$insertion.replaceWith(this.$draggee), this.$items = c().add(this.$items.not(this.$insertion).add(this.$draggee)), this.addToTabGrid && (this.designer.tabGrid.removeItems(this.$insertion), this.designer.tabGrid.addItems(this.$draggee)));
            this.$items = this.$items.not(this.$caboose);
            this.$caboose.remove();
            this.addToTabGrid && this.designer.tabGrid.removeItems(this.$caboose);
            this.$draggee.css({display: this.draggeeDisplay, visibility: "hidden"});
            this.designer.tabGrid.refreshCols(!0);
            this.designer.unusedFieldGrid.refreshCols(!0);
            this.returnHelpersToDraggees();
            this.base()
        }
    });
    Craft.FieldLayoutDesigner.TabDrag = Craft.FieldLayoutDesigner.BaseDrag.extend({
        itemSelector: "> div.fld-tab", addToTabGrid: !0, init: function (a) {
            this.base(a, {handle: ".tab"})
        }, addCaboose: function () {
            this.$caboose = c('<div class="fld-tab fld-tab-caboose"/>').appendTo(this.designer.$tabContainer)
        }, getInsertion: function () {
            var a = this.$draggee.find(".tab");
            return c('<div class="fld-tab fld-insertion" style="height: ' + this.$draggee.height() + 'px;"><div class="tabs"><div class="tab sel draggable" style="width: ' +
                a.width() + "px; height: " + a.height() + 'px;"></div></div><div class="fld-tabcontent" style="height: ' + this.$draggee.find(".fld-tabcontent").height() + 'px;"></div></div>')
        }, getItemContainer: function (a) {
            return a.parent()
        }, onDragStop: function () {
            if (this.draggingUnusedItem && this.showingInsertion) {
                var a = this.$draggee.clone().removeClass("unused"), b = a.find(".tab span").text();
                a.find(".fld-field").removeClass("unused");
                a.find(".tabs .tab").append('<a class="settings icon" title="' + Craft.t("Edit") + '"></a>');
                var d =
                    a.find(".fld-field"), e = d.filter(".hidden").remove(), d = d.not(e);
                d.prepend('<a class="settings icon" title="' + Craft.t("Edit") + '"></a>');
                for (e = 0; e < d.length; e++) {
                    var f = c(d[e]), g = this.designer.getFieldInputName(b);
                    f.append('<input class="id-input" type="hidden" name="' + g + '" value="' + f.data("id") + '">')
                }
                this.designer.fieldDrag.addItems(d);
                this.designer.initTab(a);
                this.$draggee.css({visibility: "inherit", display: "field"}).addClass("hidden");
                this.$draggee.find(".fld-field").addClass("hidden");
                this.$draggee =
                    a;
                this.addItems(a);
                this.designer.tabGrid.addItems(a);
                this.designer.unusedFieldGrid.removeItems(this.$draggee)
            }
            this.base()
        }
    });
    Craft.FieldLayoutDesigner.FieldDrag = Craft.FieldLayoutDesigner.BaseDrag.extend({
        itemSelector: "> div.fld-tab .fld-field", addCaboose: function () {
            this.$caboose = c();
            for (var a = this.designer.$tabContainer.children().children(".fld-tabcontent"), b = 0; b < a.length; b++) {
                var d = c('<div class="fld-tab fld-tab-caboose"/>').appendTo(a[b]);
                this.$caboose = this.$caboose.add(d)
            }
        }, getInsertion: function () {
            return c('<div class="fld-field fld-insertion" style="height: ' +
                this.$draggee.height() + 'px;"/>')
        }, getItemContainer: function (a) {
            return a.parent().parent().parent()
        }, onDragStop: function () {
            if (this.draggingUnusedItem && this.showingInsertion) {
                var a = this.$draggee.clone().removeClass("unused");
                a.prepend('<a class="settings icon" title="' + Craft.t("Edit") + '"></a>');
                this.designer.initField(a);
                this.$draggee.css({visibility: "inherit", display: "field"}).addClass("hidden");
                if (0 == this.$draggee.siblings(":not(.hidden)").length) {
                    var b = this.$draggee.parent().parent();
                    b.addClass("hidden");
                    this.designer.unusedFieldGrid.removeItems(b)
                }
                this.$draggee = a;
                this.addItems(a)
            }
            this.showingInsertion && (a = this.$insertion.parent().parent().find(".tab span").text(), a = this.designer.getFieldInputName(a), this.draggingUnusedItem ? this.$draggee.append('<input class="id-input" type="hidden" name="' + a + '" value="' + this.$draggee.data("id") + '">') : this.$draggee.find(".id-input").attr("name", a));
            this.base()
        }
    });
    Craft.FieldToggle = Garnish.Base.extend({
        $toggle: null, targetPrefix: null, targetSelector: null, reverseTargetSelector: null,
        _$target: null, _$reverseTarget: null, type: null, init: function (a) {
            this.$toggle = c(a);
            this.$toggle.data("fieldtoggle") && (Garnish.log("Double-instantiating a field toggle on an element"), this.$toggle.data("fieldtoggle").destroy());
            this.$toggle.data("fieldtoggle", this);
            this.type = this.getType();
            "select" == this.type ? this.targetPrefix = this.$toggle.attr("data-target-prefix") || "" : (this.targetSelector = this.normalizeTargetSelector(this.$toggle.data("target")), this.reverseTargetSelector = this.normalizeTargetSelector(this.$toggle.data("reverse-target")));
            this.findTargets();
            "link" == this.type ? this.addListener(this.$toggle, "click", "onToggleChange") : this.addListener(this.$toggle, "change", "onToggleChange")
        }, normalizeTargetSelector: function (a) {
            a && !a.match(/^[#\.]/) && (a = "#" + a);
            return a
        }, getType: function () {
            if ("INPUT" == this.$toggle.prop("nodeName") && "checkbox" == this.$toggle.attr("type").toLowerCase())return "checkbox";
            if ("SELECT" == this.$toggle.prop("nodeName"))return "select";
            if ("A" == this.$toggle.prop("nodeName"))return "link";
            if ("DIV" == this.$toggle.prop("nodeName") &&
                this.$toggle.hasClass("lightswitch"))return "lightswitch"
        }, findTargets: function () {
            "select" == this.type ? this._$target = c(this.normalizeTargetSelector(this.targetPrefix + this.getToggleVal())) : (this.targetSelector && (this._$target = c(this.targetSelector)), this.reverseTargetSelector && (this._$reverseTarget = c(this.reverseTargetSelector)))
        }, getToggleVal: function () {
            return "lightswitch" == this.type ? this.$toggle.children("input").val() : Garnish.getInputPostVal(this.$toggle)
        }, onToggleChange: function () {
            "select" == this.type ?
                (this.hideTarget(this._$target), this.findTargets(), this.showTarget(this._$target)) : (this.onToggleChange._show = "link" == this.type ? this.$toggle.hasClass("collapsed") || !this.$toggle.hasClass("expanded") : !!this.getToggleVal(), this.onToggleChange._show ? (this.showTarget(this._$target), this.hideTarget(this._$reverseTarget)) : (this.hideTarget(this._$target), this.showTarget(this._$reverseTarget)), delete this.onToggleChange._show)
        }, showTarget: function (a) {
            a && a.length && (this.showTarget._currentHeight = a.height(),
                a.removeClass("hidden"), "select" != this.type && ("link" == this.type && (this.$toggle.removeClass("collapsed"), this.$toggle.addClass("expanded")), a.height("auto"), this.showTarget._targetHeight = a.height(), a.css({
                height: this.showTarget._currentHeight,
                overflow: "hidden"
            }), a.velocity("stop"), a.velocity({height: this.showTarget._targetHeight}, "fast", function () {
                a.css({height: "", overflow: ""})
            }), delete this.showTarget._targetHeight), delete this.showTarget._currentHeight, Garnish.$win.trigger("resize"))
        }, hideTarget: function (a) {
            a &&
            a.length && ("select" == this.type ? a.addClass("hidden") : ("link" == this.type && (this.$toggle.removeClass("expanded"), this.$toggle.addClass("collapsed")), a.css("overflow", "hidden"), a.velocity("stop"), a.velocity({height: 0}, "fast", function () {
                a.addClass("hidden")
            })))
        }
    });
    Craft.Grid = Garnish.Base.extend({
        $container: null,
        $items: null,
        items: null,
        totalCols: null,
        colPctWidth: null,
        sizeUnit: null,
        possibleItemColspans: null,
        possibleItemPositionsByColspan: null,
        itemPositions: null,
        itemColspansByPosition: null,
        layouts: null,
        layout: null,
        itemHeights: null,
        leftPadding: null,
        _refreshingCols: !1,
        _refreshColsAfterRefresh: !1,
        _setItems: null,
        init: function (a, b) {
            this.$container = c(a);
            this.$container.data("grid") && (Garnish.log("Double-instantiating a grid on an element"), this.$container.data("grid").destroy());
            this.$container.data("grid", this);
            this.setSettings(b, Craft.Grid.defaults);
            this.sizeUnit = "pct" == this.settings.mode ? "%" : "px";
            this.handleContainerHeightProxy = c.proxy(function () {
                this.refreshCols(!1, !0)
            }, this);
            this.$items = this.$container.children(this.settings.itemSelector);
            this.setItems();
            this.refreshCols(!0, !1);
            Garnish.$doc.ready(c.proxy(function () {
                this.refreshCols(!1, !1)
            }, this))
        },
        addItems: function (a) {
            this.$items = c().add(this.$items.add(a));
            this.setItems();
            this.refreshCols(!0, !0);
            c(a).velocity("finish")
        },
        removeItems: function (a) {
            this.$items = c().add(this.$items.not(a));
            this.setItems();
            this.refreshCols(!0, !0)
        },
        resetItemOrder: function () {
            this.$items = c().add(this.$items);
            this.setItems();
            this.refreshCols(!0, !0)
        },
        setItems: function () {
            this.setItems._ = {};
            this.items = [];
            for (this.setItems._.i =
                     0; this.setItems._.i < this.$items.length; this.setItems._.i++)this.items.push(c(this.$items[this.setItems._.i]));
            delete this.setItems._
        },
        refreshCols: function (a, b) {
            if (this._refreshingCols)this._refreshColsAfterRefresh = !0; else if (this._refreshingCols = !0, this.items.length)if (this.refreshCols._ = {}, this.refreshCols._.oldHeight = this.$container[0].style.height, this.$container[0].style.height = 1, this.refreshCols._.scrollHeight = this.$container[0].scrollHeight, this.$container[0].style.height = this.refreshCols._.oldHeight,
                0 == this.refreshCols._.scrollHeight)delete this.refreshCols._; else if (this.settings.cols ? this.refreshCols._.totalCols = this.settings.cols : (this.refreshCols._.totalCols = Math.floor(this.$container.width() / this.settings.minColWidth), this.settings.maxCols && this.refreshCols._.totalCols > this.settings.maxCols && (this.refreshCols._.totalCols = this.settings.maxCols)), 0 == this.refreshCols._.totalCols && (this.refreshCols._.totalCols = 1), !0 !== a && this.totalCols === this.refreshCols._.totalCols)delete this.refreshCols._;
            else {
                this.totalCols = this.refreshCols._.totalCols;
                this.removeListener(this.$container, "resize");
                if ("grid" == this.settings.fillMode)for (this.refreshCols._.itemIndex = 0; this.refreshCols._.itemIndex < this.items.length;) {
                    this.refreshCols._.tallestItemHeight = -1;
                    this.refreshCols._.colIndex = 0;
                    for (this.refreshCols._.i = this.refreshCols._.itemIndex; this.refreshCols._.i < this.refreshCols._.itemIndex + this.totalCols && this.refreshCols._.i < this.items.length; this.refreshCols._.i++)this.refreshCols._.itemHeight = this.items[this.refreshCols._.i].height("auto").height(),
                    this.refreshCols._.itemHeight > this.refreshCols._.tallestItemHeight && (this.refreshCols._.tallestItemHeight = this.refreshCols._.itemHeight), this.refreshCols._.colIndex++;
                    this.settings.snapToGrid && (this.refreshCols._.remainder = this.refreshCols._.tallestItemHeight % this.settings.snapToGrid, this.refreshCols._.remainder && (this.refreshCols._.tallestItemHeight += this.settings.snapToGrid - this.refreshCols._.remainder));
                    for (this.refreshCols._.i = this.refreshCols._.itemIndex; this.refreshCols._.i < this.refreshCols._.itemIndex +
                    this.totalCols && this.refreshCols._.i < this.items.length; this.refreshCols._.i++)this.items[this.refreshCols._.i].height(this.refreshCols._.tallestItemHeight);
                    this.refreshCols._.itemIndex += this.totalCols
                } else if (this.removeListener(this.$items, "resize"), 1 == this.totalCols)this.$container.height("auto"), this.$items.show().css({
                    position: "relative",
                    width: "auto",
                    top: 0
                }).css(Craft.left, 0); else {
                    this.$items.css("position", "absolute");
                    "pct" == this.settings.mode && (this.colPctWidth = 100 / this.totalCols);
                    this.layouts =
                        [];
                    this.itemPositions = [];
                    this.itemColspansByPosition = [];
                    this.possibleItemColspans = [];
                    this.possibleItemPositionsByColspan = [];
                    this.itemHeightsByColspan = [];
                    for (this.refreshCols._.item = 0; this.refreshCols._.item < this.items.length; this.refreshCols._.item++)for (this.possibleItemColspans[this.refreshCols._.item] = [], this.possibleItemPositionsByColspan[this.refreshCols._.item] = {}, this.itemHeightsByColspan[this.refreshCols._.item] = {}, this.refreshCols._.$item = this.items[this.refreshCols._.item].show(), this.refreshCols._.positionRight =
                        "right" == this.refreshCols._.$item.data("position"), this.refreshCols._.positionLeft = "left" == this.refreshCols._.$item.data("position"), this.refreshCols._.minColspan = this.refreshCols._.$item.data("colspan") ? this.refreshCols._.$item.data("colspan") : this.refreshCols._.$item.data("min-colspan") ? this.refreshCols._.$item.data("min-colspan") : 1, this.refreshCols._.maxColspan = this.refreshCols._.$item.data("colspan") ? this.refreshCols._.$item.data("colspan") : this.refreshCols._.$item.data("max-colspan") ? this.refreshCols._.$item.data("max-colspan") :
                        this.totalCols, this.refreshCols._.minColspan > this.totalCols && (this.refreshCols._.minColspan = this.totalCols), this.refreshCols._.maxColspan > this.totalCols && (this.refreshCols._.maxColspan = this.totalCols), this.refreshCols._.colspan = this.refreshCols._.minColspan; this.refreshCols._.colspan <= this.refreshCols._.maxColspan; this.refreshCols._.colspan++)for (this.refreshCols._.$item.css("width", this.getItemWidth(this.refreshCols._.colspan) + this.sizeUnit), this.itemHeightsByColspan[this.refreshCols._.item][this.refreshCols._.colspan] =
                        this.refreshCols._.$item.outerHeight(), this.possibleItemColspans[this.refreshCols._.item].push(this.refreshCols._.colspan), this.possibleItemPositionsByColspan[this.refreshCols._.item][this.refreshCols._.colspan] = [], this.refreshCols._.positionLeft ? (this.refreshCols._.minPosition = 0, this.refreshCols._.maxPosition = 0) : this.refreshCols._.positionRight ? (this.refreshCols._.minPosition = this.totalCols - this.refreshCols._.colspan, this.refreshCols._.maxPosition = this.refreshCols._.minPosition) : (this.refreshCols._.minPosition =
                        0, this.refreshCols._.maxPosition = this.totalCols - this.refreshCols._.colspan), this.refreshCols._.position = this.refreshCols._.minPosition; this.refreshCols._.position <= this.refreshCols._.maxPosition; this.refreshCols._.position++)this.possibleItemPositionsByColspan[this.refreshCols._.item][this.refreshCols._.colspan].push(this.refreshCols._.position);
                    this.refreshCols._.colHeights = [];
                    for (this.refreshCols._.i = 0; this.refreshCols._.i < this.totalCols; this.refreshCols._.i++)this.refreshCols._.colHeights.push(0);
                    this.createLayouts(0, [], [], this.refreshCols._.colHeights, 0);
                    this.refreshCols._.layoutTotalCols = [];
                    for (this.refreshCols._.i = 0; this.refreshCols._.i < this.layouts.length; this.refreshCols._.i++)for (this.refreshCols._.layoutTotalCols[this.refreshCols._.i] = 0, this.refreshCols._.j = 0; this.refreshCols._.j < this.totalCols; this.refreshCols._.j++)this.layouts[this.refreshCols._.i].colHeights[this.refreshCols._.j] && this.refreshCols._.layoutTotalCols[this.refreshCols._.i]++;
                    this.refreshCols._.highestTotalCols = Math.max.apply(null,
                        this.refreshCols._.layoutTotalCols);
                    for (this.refreshCols._.i = this.layouts.length - 1; 0 <= this.refreshCols._.i; this.refreshCols._.i--)this.refreshCols._.layoutTotalCols[this.refreshCols._.i] != this.refreshCols._.highestTotalCols && this.layouts.splice(this.refreshCols._.i, 1);
                    this.refreshCols._.layoutHeights = [];
                    for (this.refreshCols._.i = 0; this.refreshCols._.i < this.layouts.length; this.refreshCols._.i++)this.refreshCols._.layoutHeights.push(Math.max.apply(null, this.layouts[this.refreshCols._.i].colHeights));
                    this.refreshCols._.shortestHeight = Math.min.apply(null, this.refreshCols._.layoutHeights);
                    this.refreshCols._.shortestLayouts = [];
                    this.refreshCols._.emptySpaces = [];
                    for (this.refreshCols._.i = 0; this.refreshCols._.i < this.refreshCols._.layoutHeights.length; this.refreshCols._.i++)if (this.refreshCols._.layoutHeights[this.refreshCols._.i] == this.refreshCols._.shortestHeight) {
                        this.refreshCols._.shortestLayouts.push(this.layouts[this.refreshCols._.i]);
                        this.refreshCols._.emptySpace = this.layouts[this.refreshCols._.i].emptySpace;
                        for (this.refreshCols._.j = 0; this.refreshCols._.j < this.totalCols; this.refreshCols._.j++)this.refreshCols._.emptySpace += this.refreshCols._.shortestHeight - this.layouts[this.refreshCols._.i].colHeights[this.refreshCols._.j];
                        this.refreshCols._.emptySpaces.push(this.refreshCols._.emptySpace)
                    }
                    this.layout = this.refreshCols._.shortestLayouts[c.inArray(Math.min.apply(null, this.refreshCols._.emptySpaces), this.refreshCols._.emptySpaces)];
                    this.refreshCols._.totalEmptyCols = 0;
                    for (this.refreshCols._.i = this.layout.colHeights.length -
                        1; 0 <= this.refreshCols._.i; this.refreshCols._.i--)if (0 == this.layout.colHeights[this.refreshCols._.i])this.refreshCols._.totalEmptyCols++; else break;
                    this.leftPadding = this.getItemWidth(this.refreshCols._.totalEmptyCols) / 2;
                    "fixed" == this.settings.mode && (this.leftPadding += (this.$container.width() - this.settings.minColWidth * this.totalCols) / 2);
                    for (this.refreshCols._.i = 0; this.refreshCols._.i < this.items.length; this.refreshCols._.i++)this.refreshCols._.css = {
                        width: this.getItemWidth(this.layout.colspans[this.refreshCols._.i]) +
                        this.sizeUnit
                    }, this.refreshCols._.css[Craft.left] = this.leftPadding + this.getItemWidth(this.layout.positions[this.refreshCols._.i]) + this.sizeUnit, b ? this.items[this.refreshCols._.i].velocity(this.refreshCols._.css, {queue: !1}) : this.items[this.refreshCols._.i].velocity("finish").css(this.refreshCols._.css);
                    this.isSimpleLayout() ? (this.$container.height("auto"), this.$items.css("position", "relative")) : (this.$items.css("position", "absolute"), this.positionItems(b), this.addListener(this.$items, "resize", "onItemResize"))
                }
                this.onRefreshCols();
                delete this.refreshCols._;
                this.addListener(this.$container, "resize", this.handleContainerHeightProxy);
                this._refreshingCols = !1;
                this._refreshColsAfterRefresh && (this._refreshColsAfterRefresh = !1, this.refreshCols())
            }
        },
        getItemWidth: function (a) {
            return "pct" == this.settings.mode ? this.colPctWidth * a : this.settings.minColWidth * a
        },
        createLayouts: function (a, b, c, e, f) {
            (new Craft.Grid.LayoutGenerator(this)).createLayouts(a, b, c, e, f)
        },
        isSimpleLayout: function () {
            this.isSimpleLayout._ = {};
            for (this.isSimpleLayout._.i = 0; this.isSimpleLayout._.i <
            this.layout.positions.length; this.isSimpleLayout._.i++)if (0 != this.layout.positions[this.isSimpleLayout._.i])return delete this.isSimpleLayout._, !1;
            delete this.isSimpleLayout._;
            return !0
        },
        positionItems: function (a) {
            this.positionItems._ = {};
            this.positionItems._.colHeights = [];
            for (this.positionItems._.i = 0; this.positionItems._.i < this.totalCols; this.positionItems._.i++)this.positionItems._.colHeights.push(0);
            for (this.positionItems._.i = 0; this.positionItems._.i < this.items.length; this.positionItems._.i++) {
                this.positionItems._.endingCol =
                    this.layout.positions[this.positionItems._.i] + this.layout.colspans[this.positionItems._.i] - 1;
                this.positionItems._.affectedColHeights = [];
                for (this.positionItems._.col = this.layout.positions[this.positionItems._.i]; this.positionItems._.col <= this.positionItems._.endingCol; this.positionItems._.col++)this.positionItems._.affectedColHeights.push(this.positionItems._.colHeights[this.positionItems._.col]);
                this.positionItems._.top = Math.max.apply(null, this.positionItems._.affectedColHeights);
                a ? this.items[this.positionItems._.i].velocity({top: this.positionItems._.top},
                    {queue: !1}) : this.items[this.positionItems._.i].velocity("finish").css("top", this.positionItems._.top);
                for (this.positionItems._.col = this.layout.positions[this.positionItems._.i]; this.positionItems._.col <= this.positionItems._.endingCol; this.positionItems._.col++)this.positionItems._.colHeights[this.positionItems._.col] = this.positionItems._.top + this.itemHeightsByColspan[this.positionItems._.i][this.layout.colspans[this.positionItems._.i]]
            }
            this.$container.height(Math.max.apply(null, this.positionItems._.colHeights));
            delete this.positionItems._
        },
        onItemResize: function (a) {
            this.onItemResize._ = {};
            a.stopPropagation();
            this.onItemResize._.item = c.inArray(a.currentTarget, this.$items);
            -1 != this.onItemResize._.item && (this.onItemResize._.newHeight = this.items[this.onItemResize._.item].outerHeight(), this.onItemResize._.newHeight != this.itemHeightsByColspan[this.onItemResize._.item][this.layout.colspans[this.onItemResize._.item]] && (this.itemHeightsByColspan[this.onItemResize._.item][this.layout.colspans[this.onItemResize._.item]] =
                this.onItemResize._.newHeight, this.positionItems(!1)));
            delete this.onItemResize._
        },
        onRefreshCols: function () {
            this.trigger("refreshCols");
            this.settings.onRefreshCols()
        }
    }, {
        defaults: {
            itemSelector: ".item",
            cols: null,
            maxCols: null,
            minColWidth: 320,
            mode: "pct",
            fillMode: "top",
            colClass: "col",
            snapToGrid: null,
            onRefreshCols: c.noop
        }
    });
    Craft.Grid.LayoutGenerator = Garnish.Base.extend({
        grid: null, _: null, init: function (a) {
            this.grid = a
        }, createLayouts: function (a, b, d, e, f) {
            this._ = {};
            for (this._.c = 0; this._.c < this.grid.possibleItemColspans[a].length; this._.c++) {
                this._.colspan =
                    this.grid.possibleItemColspans[a][this._.c];
                this._.tallestColHeightsByPosition = [];
                for (this._.p = 0; this._.p < this.grid.possibleItemPositionsByColspan[a][this._.colspan].length; this._.p++) {
                    this._.position = this.grid.possibleItemPositionsByColspan[a][this._.colspan][this._.p];
                    this._.colHeightsForPosition = [];
                    this._.endingCol = this._.position + this._.colspan - 1;
                    for (this._.col = this._.position; this._.col <= this._.endingCol; this._.col++)this._.colHeightsForPosition.push(e[this._.col]);
                    this._.tallestColHeightsByPosition[this._.p] =
                        Math.max.apply(null, this._.colHeightsForPosition)
                }
                this._.p = c.inArray(Math.min.apply(null, this._.tallestColHeightsByPosition), this._.tallestColHeightsByPosition);
                this._.position = this.grid.possibleItemPositionsByColspan[a][this._.colspan][this._.p];
                this._.positions = b.slice(0);
                this._.colspans = d.slice(0);
                this._.colHeights = e.slice(0);
                this._.emptySpace = f;
                this._.positions.push(this._.position);
                this._.colspans.push(this._.colspan);
                this._.tallestColHeight = this._.tallestColHeightsByPosition[this._.p];
                this._.endingCol =
                    this._.position + this._.colspan - 1;
                for (this._.col = this._.position; this._.col <= this._.endingCol; this._.col++)this._.emptySpace += this._.tallestColHeight - this._.colHeights[this._.col], this._.colHeights[this._.col] = this._.tallestColHeight + this.grid.itemHeightsByColspan[a][this._.colspan];
                a == this.grid.items.length - 1 ? this.grid.layouts.push({
                    positions: this._.positions,
                    colspans: this._.colspans,
                    colHeights: this._.colHeights,
                    emptySpace: this._.emptySpace
                }) : this.grid.createLayouts(a + 1, this._.positions, this._.colspans,
                    this._.colHeights, this._.emptySpace)
            }
            delete this._
        }
    });
    Craft.HandleGenerator = Craft.BaseInputGenerator.extend({
        generateTargetValue: function (a) {
            a = a.replace("/<(.*?)>/g", "");
            a = a.replace(/['"\u2018\u2019\u201c\u201d\[\]\(\)\{\}:]/g, "");
            a = a.toLowerCase();
            a = Craft.asciiString(a);
            a = a.replace(/^[^a-z]+/, "");
            var b = Craft.filterArray(a.split(/[^a-z0-9]+/));
            a = "";
            for (var c = 0; c < b.length; c++)a = 0 == c ? a + b[c] : a + (b[c].charAt(0).toUpperCase() + b[c].substr(1));
            return a
        }
    });
    Craft.ImageUpload = Garnish.Base.extend({
        _imageHandler: null,
        init: function (a) {
            this.setSettings(a, Craft.ImageUpload.defaults);
            this._imageHandler = new Craft.ImageHandler(a)
        }, destroy: function () {
            this._imageHandler.destroy();
            delete this._imageHandler;
            this.base()
        }
    }, {
        $modalContainerDiv: null, defaults: {
            postParameters: {},
            modalClass: "",
            uploadButton: {},
            uploadAction: "",
            deleteButton: {},
            deleteMessage: "",
            deleteAction: "",
            cropAction: "",
            constraint: 500,
            areaToolOptions: {aspectRatio: "1", initialRectangle: {mode: "auto", x1: 0, x2: 0, y1: 0, y2: 0}},
            onImageDelete: function (a) {
                location.reload()
            },
            onImageSave: function (a) {
                location.reload()
            }
        }
    });
    Craft.ImageHandler = Garnish.Base.extend({
        modal: null, progressBar: null, $container: null, init: function (a) {
            this.setSettings(a);
            var b = a.uploadButton, d = c('<input type="file" name="image-upload"/>').hide().insertBefore(b);
            this.progressBar = new Craft.ProgressBar(c('<div class="progress-shade"></div>').insertBefore(b));
            this.progressBar.$progressBar.css({top: Math.round(b.outerHeight() / 2) - 6});
            this.$container = b.parent();
            d = {
                url: Craft.getActionUrl(this.settings.uploadAction),
                fileInput: d,
                element: this.settings.uploadButton[0],
                action: Craft.actionUrl + "/" + this.settings.uploadAction,
                formData: "object" === typeof this.settings.postParameters ? this.settings.postParameters : {},
                events: {
                    fileuploadstart: c.proxy(function () {
                        this.$container.addClass("uploading");
                        this.progressBar.resetProgressBar();
                        this.progressBar.showProgressBar()
                    }, this), fileuploadprogressall: c.proxy(function (a) {
                        a = parseInt(100 * (a.loaded / a.total), 10);
                        this.progressBar.setProgressPercentage(a)
                    }, this), fileuploaddone: c.proxy(function (b,
                                                                d) {
                        this.progressBar.hideProgressBar();
                        this.$container.removeClass("uploading");
                        var g = d.result;
                        g.error ? alert(g.error) : (null == Craft.ImageUpload.$modalContainerDiv && (Craft.ImageUpload.$modalContainerDiv = c('<div class="modal fitted"></div>').addClass(a.modalClass).appendTo(Garnish.$bod)), g.fileName && (this.source = g.fileName), g.html && (Craft.ImageUpload.$modalContainerDiv.empty().append(g.html), this.modal ? this.modal.show() : (this.modal = new Craft.ImageModal(Craft.ImageUpload.$modalContainerDiv, {
                            postParameters: a.postParameters,
                            cropAction: a.cropAction
                        }), this.modal.imageHandler = this), this.modal.bindButtons(), this.modal.addListener(this.modal.$saveBtn, "click", "saveImage"), this.modal.addListener(this.modal.$cancelBtn, "click", "cancel"), this.modal.removeListener(Garnish.Modal.$shade, "click"), setTimeout(c.proxy(function () {
                            Craft.ImageUpload.$modalContainerDiv.find("img").load(c.proxy(function () {
                                var b = new Craft.ImageAreaTool(a.areaToolOptions, this.modal);
                                b.showArea();
                                this.modal.cropAreaTool = b
                            }, this))
                        }, this), 1)))
                    }, this)
                },
                acceptFileTypes: /(jpg|jpeg|gif|png)/
            };
            "undefined" !== typeof Craft.csrfTokenName && "undefined" !== typeof Craft.csrfTokenValue && (d.formData[Craft.csrfTokenName] = Craft.csrfTokenValue);
            this.uploader = new Craft.Uploader(b, d);
            this.addListener(c(a.deleteButton), "click", function (b) {
                confirm(a.deleteMessage) && (c(b.currentTarget).parent().append('<div class="blocking-modal"></div>'), Craft.postActionRequest(a.deleteAction, a.postParameters, c.proxy(function (a, b) {
                    if ("success" == b)this.onImageDelete(a)
                }, this)))
            });
            this.addListener(c(a.uploadButton), "click",
                function (a) {
                    c(a.currentTarget).siblings("input[type=file]").click()
                })
        }, onImageSave: function (a) {
            this.settings.onImageSave.apply(this, [a])
        }, onImageDelete: function (a) {
            this.settings.onImageDelete.apply(this, [a])
        }, destroy: function () {
            this.progressBar.destroy();
            delete this.progressBar;
            this.modal && (this.modal.destroy(), delete this.modal);
            this.uploader && (this.uploader.destroy(), delete this.uploader);
            this.base()
        }
    });
    Craft.ImageModal = Garnish.Modal.extend({
        $container: null,
        $saveBtn: null,
        $cancelBtn: null,
        areaSelect: null,
        source: null,
        _postParameters: null,
        _cropAction: "",
        imageHandler: null,
        cropAreaTool: null,
        init: function (a, b) {
            this.cropAreaTool = null;
            this.base(a, b);
            this._postParameters = b.postParameters;
            this._cropAction = b.cropAction
        },
        bindButtons: function () {
            this.$saveBtn = this.$container.find(".submit:first");
            this.$cancelBtn = this.$container.find(".cancel:first")
        },
        cancel: function () {
            this.hide();
            this.$container.remove();
            this.destroy()
        },
        saveImage: function () {
            var a = this.areaSelect.tellSelect(), a = {x1: a.x, y1: a.y, x2: a.x2, y2: a.y2, source: this.source},
                a = c.extend(this._postParameters, a);
            Craft.postActionRequest(this._cropAction, a, c.proxy(function (a, c) {
                "success" == c && (a.error ? Craft.cp.displayError(a.error) : this.imageHandler.onImageSave.apply(this.imageHandler, [a]));
                this.hide();
                this.$container.remove();
                this.destroy()
            }, this));
            this.areaSelect.setOptions({disable: !0});
            this.removeListener(this.$saveBtn, "click");
            this.removeListener(this.$cancelBtn, "click");
            this.$container.find(".crop-image").fadeTo(50, 0.5)
        }
    });
    Craft.ImageAreaTool = Garnish.Base.extend({
        api: null,
        $container: null, containingModal: null, init: function (a, b) {
            this.$container = Craft.ImageUpload.$modalContainerDiv;
            this.setSettings(a);
            this.containingModal = b
        }, showArea: function () {
            var a = this.$container.find("img"), b = {
                aspectRatio: this.settings.aspectRatio,
                maxSize: [a.width(), a.height()],
                bgColor: "none"
            }, d = c.proxy(function (b) {
                this.api = b;
                b = this.settings.initialRectangle.x1;
                var c = this.settings.initialRectangle.x2, d = this.settings.initialRectangle.y1, h = this.settings.initialRectangle.y2;
                "auto" == this.settings.initialRectangle.mode &&
                (h = c = 0, "" == this.settings.aspectRatio ? (c = a.width(), h = a.height()) : 1 < this.settings.aspectRatio ? (c = a.width(), h = c / this.settings.aspectRatio) : 1 > this.settings.aspectRatio ? (h = a.height(), c = h * this.settings.aspectRatio) : h = c = Math.min(a.width(), a.height()), b = Math.round((a.width() - c) / 2), d = Math.round((a.height() - h) / 2), c = b + c, h = d + h);
                this.api.setSelect([b, d, c, h]);
                this.containingModal.areaSelect = this.api;
                this.containingModal.source = a.attr("src").split("/").pop();
                this.containingModal.updateSizeAndPosition()
            }, this);
            a.Jcrop(b,
                function () {
                    d(this)
                })
        }
    });
    Craft.InfoIcon = Garnish.Base.extend({
        $icon: null, hud: null, init: function (a) {
            this.$icon = c(a);
            this.addListener(this.$icon, "click", "showHud")
        }, showHud: function () {
            this.hud ? this.hud.show() : this.hud = new Garnish.HUD(this.$icon, this.$icon.html(), {
                hudClass: "hud info-hud",
                closeOtherHUDs: !1
            })
        }
    });
    Craft.LightSwitch = Garnish.Base.extend({
        settings: null,
        $outerContainer: null,
        $innerContainer: null,
        $input: null,
        small: !1,
        on: null,
        dragger: null,
        dragStartMargin: null,
        init: function (a, b) {
            this.$outerContainer =
                c(a);
            this.$outerContainer.data("lightswitch") && (Garnish.log("Double-instantiating a lightswitch on an element"), this.$outerContainer.data("lightswitch").destroy());
            this.$outerContainer.data("lightswitch", this);
            this.small = this.$outerContainer.hasClass("small");
            this.setSettings(b, Craft.LightSwitch.defaults);
            this.$innerContainer = this.$outerContainer.find(".lightswitch-container:first");
            this.$input = this.$outerContainer.find("input:first");
            this.$input.prop("disabled") || (this.on = this.$outerContainer.hasClass("on"),
                this.addListener(this.$outerContainer, "mousedown", "_onMouseDown"), this.addListener(this.$outerContainer, "keydown", "_onKeyDown"), this.dragger = new Garnish.BaseDrag(this.$outerContainer, {
                axis: Garnish.X_AXIS,
                ignoreHandleSelector: null,
                onDragStart: c.proxy(this, "_onDragStart"),
                onDrag: c.proxy(this, "_onDrag"),
                onDragStop: c.proxy(this, "_onDragStop")
            }))
        },
        turnOn: function () {
            this.$outerContainer.addClass("dragging");
            var a = {};
            a["margin-" + Craft.left] = 0;
            this.$innerContainer.velocity("stop").velocity(a, Craft.LightSwitch.animationDuration,
                c.proxy(this, "_onSettle"));
            this.$input.val("1");
            this.$outerContainer.addClass("on");
            this.on = !0;
            this.onChange()
        },
        turnOff: function () {
            this.$outerContainer.addClass("dragging");
            var a = {};
            a["margin-" + Craft.left] = this._getOffMargin();
            this.$innerContainer.velocity("stop").velocity(a, Craft.LightSwitch.animationDuration, c.proxy(this, "_onSettle"));
            this.$input.val("");
            this.$outerContainer.removeClass("on");
            this.on = !1;
            this.onChange()
        },
        toggle: function (a) {
            this.on ? this.turnOff() : this.turnOn()
        },
        onChange: function () {
            this.trigger("change");
            this.settings.onChange();
            this.$outerContainer.trigger("change")
        },
        _onMouseDown: function () {
            this.addListener(Garnish.$doc, "mouseup", "_onMouseUp")
        },
        _onMouseUp: function () {
            this.removeListener(Garnish.$doc, "mouseup");
            this.dragger.dragging || this.toggle()
        },
        _onKeyDown: function (a) {
            switch (a.keyCode) {
                case Garnish.SPACE_KEY:
                    this.toggle();
                    a.preventDefault();
                    break;
                case Garnish.RIGHT_KEY:
                    "ltr" == Craft.orientation ? this.turnOn() : this.turnOff();
                    a.preventDefault();
                    break;
                case Garnish.LEFT_KEY:
                    "ltr" == Craft.orientation ? this.turnOff() :
                        this.turnOn(), a.preventDefault()
            }
        },
        _getMargin: function () {
            return parseInt(this.$innerContainer.css("margin-" + Craft.left))
        },
        _onDragStart: function () {
            this.$outerContainer.addClass("dragging");
            this.dragStartMargin = this._getMargin()
        },
        _onDrag: function () {
            var a = "ltr" == Craft.orientation ? this.dragStartMargin + this.dragger.mouseDistX : this.dragStartMargin - this.dragger.mouseDistX;
            a < this._getOffMargin() ? a = this._getOffMargin() : 0 < a && (a = 0);
            this.$innerContainer.css("margin-" + Craft.left, a)
        },
        _onDragStop: function () {
            this._getMargin() >
            this._getOffMargin() / 2 ? this.turnOn() : this.turnOff()
        },
        _onSettle: function () {
            this.$outerContainer.removeClass("dragging")
        },
        destroy: function () {
            this.base();
            this.dragger.destroy()
        },
        _getOffMargin: function () {
            return this.small ? -9 : -11
        }
    }, {animationDuration: 100, defaults: {onChange: c.noop}});
    Craft.LivePreview = Garnish.Base.extend({
        $extraFields: null,
        $trigger: null,
        $spinner: null,
        $shade: null,
        $editorContainer: null,
        $editor: null,
        $dragHandle: null,
        $iframeContainer: null,
        $iframe: null,
        $fieldPlaceholder: null,
        previewUrl: null,
        basePostData: null,
        inPreviewMode: !1,
        fields: null,
        lastPostData: null,
        updateIframeInterval: null,
        loading: !1,
        checkAgain: !1,
        dragger: null,
        dragStartEditorWidth: null,
        _handleSuccessProxy: null,
        _handleErrorProxy: null,
        _scrollX: null,
        _scrollY: null,
        _editorWidth: null,
        _editorWidthInPx: null,
        init: function (a) {
            this.setSettings(a, Craft.LivePreview.defaults);
            this.previewUrl = this.settings.previewUrl ? this.settings.previewUrl : Craft.baseSiteUrl.replace(/\/+$/, "") + "/";
            "https:" == document.location.protocol && (this.previewUrl = this.previewUrl.replace(/^http:/,
                "https:"));
            this.basePostData = c.extend({
                action: this.settings.previewAction,
                livePreview: !0
            }, this.settings.previewParams);
            Craft.csrfTokenName && (this.basePostData[Craft.csrfTokenName] = Craft.csrfTokenValue);
            this._handleSuccessProxy = c.proxy(this, "handleSuccess");
            this._handleErrorProxy = c.proxy(this, "handleError");
            this.$extraFields = c(this.settings.extraFields);
            this.$trigger = c(this.settings.trigger);
            this.$spinner = this.settings.spinner ? c(this.settings.spinner) : this.$trigger.find(".spinner");
            this.$fieldPlaceholder =
                c("<div/>");
            this.editorWidth = Craft.getLocalStorage("LivePreview.editorWidth", Craft.LivePreview.defaultEditorWidth);
            this.addListener(this.$trigger, "activate", "toggle");
            Craft.cp.on("beforeSaveShortcut", c.proxy(function () {
                this.inPreviewMode && this.moveFieldsBack()
            }, this))
        },
        get editorWidth() {
            return this._editorWidth
        },
        get editorWidthInPx() {
            return this._editorWidthInPx
        },
        set editorWidth(a) {
            if (1 <= a) {
                var b = a;
                a /= Garnish.$win.width()
            } else b = Math.round(a * Garnish.$win.width());
            b < Craft.LivePreview.minEditorWidthInPx &&
            (b = Craft.LivePreview.minEditorWidthInPx, a = b / Garnish.$win.width());
            this._editorWidth = a;
            this._editorWidthInPx = b
        },
        toggle: function () {
            this.inPreviewMode ? this.exit() : this.enter()
        },
        enter: function () {
            if (!this.inPreviewMode) {
                this.trigger("beforeEnter");
                c(document.activeElement).blur();
                if (!this.$editor) {
                    this.$shade = c('<div class="modal-shade dark"/>').appendTo(Garnish.$bod).css("z-index", 2);
                    this.$editorContainer = c('<div class="lp-editor-container"/>').appendTo(Garnish.$bod);
                    this.$editor = c('<div class="lp-editor"/>').appendTo(this.$editorContainer);
                    this.$iframeContainer = c('<div class="lp-iframe-container"/>').appendTo(Garnish.$bod);
                    this.$iframe = c('<iframe class="lp-iframe" frameborder="0"/>').appendTo(this.$iframeContainer);
                    this.$dragHandle = c('<div class="lp-draghandle"/>').appendTo(this.$editorContainer);
                    var a = c('<header class="header"></header>').appendTo(this.$editor), b = c('<div class="btn">' + Craft.t("Close Live Preview") + "</div>").appendTo(a), a = c('<div class="btn submit">' + Craft.t("Save") + "</div>").appendTo(a);
                    this.dragger = new Garnish.BaseDrag(this.$dragHandle,
                        {
                            axis: Garnish.X_AXIS,
                            onDragStart: c.proxy(this, "_onDragStart"),
                            onDrag: c.proxy(this, "_onDrag"),
                            onDragStop: c.proxy(this, "_onDragStop")
                        });
                    this.addListener(b, "click", "exit");
                    this.addListener(a, "click", "save")
                }
                this.handleWindowResize();
                this.addListener(Garnish.$win, "resize", "handleWindowResize");
                this.$editorContainer.css(Craft.left, -(this.editorWidthInPx + Craft.LivePreview.dragHandleWidth) + "px");
                this.$iframeContainer.css(Craft.right, -this.getIframeWidth());
                this.fields = [];
                b = c(this.settings.fields);
                for (a =
                         0; a < b.length; a++) {
                    var d = c(b[a]), e = this._getClone(d);
                    this.$fieldPlaceholder.insertAfter(d);
                    d.detach();
                    this.$fieldPlaceholder.replaceWith(e);
                    d.appendTo(this.$editor);
                    this.fields.push({$field: d, $clone: e})
                }
                this.updateIframe() ? (this.$spinner.removeClass("hidden"), this.addListener(this.$iframe, "load", function () {
                    this.slideIn();
                    this.removeListener(this.$iframe, "load")
                })) : this.slideIn();
                this.inPreviewMode = !0;
                this.trigger("enter")
            }
        },
        save: function () {
            Craft.cp.submitPrimaryForm()
        },
        handleWindowResize: function () {
            this.editorWidth =
                this.editorWidth;
            this.updateWidths()
        },
        slideIn: function () {
            c("html").addClass("noscroll");
            this.$spinner.addClass("hidden");
            this.$shade.velocity("fadeIn");
            this.$editorContainer.show().velocity("stop").animateLeft(0, "slow", c.proxy(function () {
                this.trigger("slideIn");
                Garnish.$win.trigger("resize")
            }, this));
            this.$iframeContainer.show().velocity("stop").animateRight(0, "slow", c.proxy(function () {
                this.updateIframeInterval = setInterval(c.proxy(this, "updateIframe"), 1E3);
                this.addListener(Garnish.$bod, "keyup", function (a) {
                    a.keyCode ==
                    Garnish.ESC_KEY && this.exit()
                })
            }, this))
        },
        exit: function () {
            this.inPreviewMode && (this.trigger("beforeExit"), c("html").removeClass("noscroll"), this.removeListener(Garnish.$win, "resize"), this.removeListener(Garnish.$bod, "keyup"), this.updateIframeInterval && clearInterval(this.updateIframeInterval), this.moveFieldsBack(), Garnish.$win.width(), this.$shade.delay(200).velocity("fadeOut"), this.$editorContainer.velocity("stop").animateLeft(-(this.editorWidthInPx + Craft.LivePreview.dragHandleWidth), "slow", c.proxy(function () {
                for (var a =
                    0; a < this.fields.length; a++)this.fields[a].$newClone.remove();
                this.$editorContainer.hide();
                this.trigger("slideOut")
            }, this)), this.$iframeContainer.velocity("stop").animateRight(-this.getIframeWidth(), "slow", c.proxy(function () {
                this.$iframeContainer.hide()
            }, this)), this.inPreviewMode = !1, this.trigger("exit"))
        },
        moveFieldsBack: function () {
            for (var a = 0; a < this.fields.length; a++) {
                var b = this.fields[a];
                b.$newClone = this._getClone(b.$field);
                this.$fieldPlaceholder.insertAfter(b.$field);
                b.$field.detach();
                this.$fieldPlaceholder.replaceWith(b.$newClone);
                b.$clone.replaceWith(b.$field)
            }
            Garnish.$win.trigger("resize")
        },
        getIframeWidth: function () {
            return Garnish.$win.width() - (this.editorWidthInPx + Craft.LivePreview.dragHandleWidth)
        },
        updateWidths: function () {
            this.$editorContainer.css("width", this.editorWidthInPx + "px");
            this.$iframeContainer.width(this.getIframeWidth())
        },
        updateIframe: function (a) {
            a && (this.lastPostData = null);
            if (!this.inPreviewMode)return !1;
            if (this.loading)return this.checkAgain = !0, !1;
            a = c.extend(Garnish.getPostData(this.$editor), Garnish.getPostData(this.$extraFields));
            if (this.lastPostData && Craft.compare(a, this.lastPostData))return !1;
            this.lastPostData = a;
            this.loading = !0;
            c.extend({}, a, this.basePostData);
            var b = c(this.$iframe[0].contentWindow.document);
            this._scrollX = b.scrollLeft();
            this._scrollY = b.scrollTop();
            c.ajax({
                url: this.previewUrl,
                method: "POST",
                data: c.extend({}, a, this.basePostData),
                xhrFields: {withCredentials: !0},
                crossDomain: !0,
                success: this._handleSuccessProxy,
                error: this._handleErrorProxy
            });
            return !0
        },
        handleSuccess: function (a, b, d) {
            a = a + '<script type="text/javascript">window.scrollTo(' +
                this._scrollX + ", " + this._scrollY + ");\x3c/script>";
            this.$iframe.css("background", c(this.$iframe[0].contentWindow.document.body).css("background"));
            this.$iframe[0].contentWindow.document.open();
            this.$iframe[0].contentWindow.document.write(a);
            this.$iframe[0].contentWindow.document.close();
            this.onResponse()
        },
        handleError: function (a, b, c) {
            this.onResponse()
        },
        onResponse: function () {
            this.loading = !1;
            this.checkAgain && (this.checkAgain = !1, this.updateIframe())
        },
        _getClone: function (a) {
            var b = a.clone();
            Garnish.copyInputValues(a,
                b);
            b.attr("id", "");
            b.find("[id]").attr("id", "");
            return b
        },
        _onDragStart: function () {
            this.dragStartEditorWidth = this.editorWidthInPx;
            this.$iframeContainer.addClass("dragging")
        },
        _onDrag: function () {
            this.editorWidth = "ltr" == Craft.orientation ? this.dragStartEditorWidth + this.dragger.mouseDistX : this.dragStartEditorWidth - this.dragger.mouseDistX;
            this.updateWidths()
        },
        _onDragStop: function () {
            this.$iframeContainer.removeClass("dragging");
            Craft.setLocalStorage("LivePreview.editorWidth", this.editorWidth)
        }
    }, {
        defaultEditorWidth: 0.33,
        minEditorWidthInPx: 320,
        dragHandleWidth: 4,
        defaults: {
            trigger: ".livepreviewbtn",
            spinner: null,
            fields: null,
            extraFields: null,
            previewUrl: null,
            previewAction: null,
            previewParams: {}
        }
    });
    Craft.LivePreview.init = function (a) {
        Craft.livePreview = new Craft.LivePreview(a)
    };
    Craft.Pane = Garnish.Base.extend({
        $pane: null,
        $content: null,
        $sidebar: null,
        $tabsContainer: null,
        tabs: null,
        selectedTab: null,
        hasSidebar: null,
        init: function (a) {
            this.$pane = c(a);
            this.$pane.data("pane") && (Garnish.log("Double-instantiating a pane on an element"),
                this.$pane.data("pane").destroy());
            this.$pane.data("pane", this);
            this.$content = this.$pane.find(".content:not(.hidden):first");
            this.$tabsContainer = this.$pane.children(".tabs");
            a = this.$tabsContainer.find("a");
            if (a.length) {
                this.tabs = {};
                for (var b = 0; b < a.length; b++) {
                    var d = c(a[b]), e = d.attr("href");
                    e && "#" == e.charAt(0) && (this.tabs[e] = {
                        $tab: d,
                        $target: c(e)
                    }, this.addListener(d, "activate", "selectTab"));
                    !this.selectedTab && d.hasClass("sel") && (this.selectedTab = e)
                }
                document.location.hash && "undefined" != typeof this.tabs[document.location.hash] ?
                    this.tabs[document.location.hash].$tab.trigger("activate") : this.selectedTab || c(a[0]).trigger("activate")
            }
            this.$pane.hasClass("meta") && (a = Garnish.findInputs(this.$pane), this.addListener(a, "focus", "focusMetaField"), this.addListener(a, "blur", "blurMetaField"));
            this.initContent()
        },
        focusMetaField: function (a) {
            c(a.currentTarget).closest(".field").removeClass("has-errors").addClass("has-focus")
        },
        blurMetaField: function (a) {
            c(a.currentTarget).closest(".field").removeClass("has-focus")
        },
        selectTab: function (a) {
            this.selectedTab &&
            a.currentTarget == this.tabs[this.selectedTab].$tab[0] || (this.deselectTab(), this.selectedTab = c(a.currentTarget).addClass("sel").attr("href"), a = this.tabs[this.selectedTab].$target, a.removeClass("hidden"), a.hasClass("content") && (this.$content = a), Garnish.$win.trigger("resize"), Garnish.$doc.trigger("scroll"))
        },
        deselectTab: function () {
            this.selectedTab && (this.tabs[this.selectedTab].$tab.removeClass("sel"), this.tabs[this.selectedTab].$target.addClass("hidden"))
        },
        initContent: function () {
            if (this.hasSidebar = this.$content.hasClass("has-sidebar"))this.$sidebar =
                this.$content.children(".sidebar"), this.addListener(this.$content, "resize", function () {
                this.updateSidebarStyles()
            }), this.addListener(this.$sidebar, "resize", "setMinContentSizeForSidebar"), this.setMinContentSizeForSidebar(), this.addListener(Garnish.$win, "resize", "updateSidebarStyles"), this.addListener(Garnish.$win, "scroll", "updateSidebarStyles"), this.updateSidebarStyles()
        },
        setMinContentSizeForSidebar: function () {
            this.setMinContentSizeForSidebar._minHeight = this.$sidebar.prop("scrollHeight") - this.$tabsContainer.height() -
                48;
            this.$content.css("min-height", this.setMinContentSizeForSidebar._minHeight)
        },
        updateSidebarStyles: function () {
            this.updateSidebarStyles._styles = {};
            this.updateSidebarStyles._scrollTop = Garnish.$win.scrollTop();
            this.updateSidebarStyles._paneOffset = this.$pane.offset().top + this.$tabsContainer.height();
            this.updateSidebarStyles._paneHeight = this.$pane.outerHeight() - this.$tabsContainer.height();
            this.updateSidebarStyles._windowHeight = Garnish.$win.height();
            992 < Garnish.$win.width() && this.updateSidebarStyles._scrollTop >
            this.updateSidebarStyles._paneOffset ? (this.updateSidebarStyles._styles.position = "fixed", this.updateSidebarStyles._styles.top = "24px") : (this.updateSidebarStyles._styles.position = "absolute", this.updateSidebarStyles._styles.top = "auto");
            this.updateSidebarStyles._styles.maxHeight = Math.min(this.updateSidebarStyles._paneHeight - (this.updateSidebarStyles._scrollTop - this.updateSidebarStyles._paneOffset), this.updateSidebarStyles._windowHeight);
            this.updateSidebarStyles._styles.height = this.updateSidebarStyles._paneHeight >
            this.updateSidebarStyles._windowHeight ? this.updateSidebarStyles._styles.maxHeight : this.updateSidebarStyles._paneHeight;
            this.$sidebar.css(this.updateSidebarStyles._styles)
        },
        destroy: function () {
            this.base();
            this.$pane.data("pane", null)
        }
    });
    Craft.PasswordInput = Garnish.Base.extend({
        $passwordInput: null,
        $textInput: null,
        $currentInput: null,
        $showPasswordToggle: null,
        showingPassword: null,
        init: function (a, b) {
            this.$passwordInput = c(a);
            this.settings = c.extend({}, Craft.PasswordInput.defaults, b);
            this.$passwordInput.data("passwordInput") &&
            (Garnish.log("Double-instantiating a password input on an element"), this.$passwordInput.data("passwordInput").destroy());
            this.$passwordInput.data("passwordInput", this);
            this.$showPasswordToggle = c("<a/>").hide();
            this.$showPasswordToggle.addClass("password-toggle");
            this.$showPasswordToggle.insertAfter(this.$passwordInput);
            this.addListener(this.$showPasswordToggle, "mousedown", "onToggleMouseDown");
            this.hidePassword()
        },
        setCurrentInput: function (a) {
            this.$currentInput && (a.addClass("focus"), this.$currentInput.replaceWith(a),
                a.focus(), a.removeClass("focus"), a.val(this.$currentInput.val()));
            this.$currentInput = a;
            this.addListener(this.$currentInput, "keypress,keyup,change,blur", "onInputChange")
        },
        updateToggleLabel: function (a) {
            this.$showPasswordToggle.text(a)
        },
        showPassword: function () {
            this.showingPassword || (this.$textInput || (this.$textInput = this.$passwordInput.clone(!0), this.$textInput.attr("type", "text")), this.setCurrentInput(this.$textInput), this.updateToggleLabel(Craft.t("Hide")), this.showingPassword = !0)
        },
        hidePassword: function () {
            !1 !==
            this.showingPassword && (this.setCurrentInput(this.$passwordInput), this.updateToggleLabel(Craft.t("Show")), this.showingPassword = !1, this.addListener(this.$passwordInput, "keydown", "onKeyDown"))
        },
        togglePassword: function () {
            this.showingPassword ? this.hidePassword() : this.showPassword();
            this.settings.onToggleInput(this.$currentInput)
        },
        onKeyDown: function (a) {
            a.keyCode == Garnish.ALT_KEY && this.$currentInput.val() && (this.showPassword(), this.$showPasswordToggle.hide(), this.addListener(this.$textInput, "keyup", "onKeyUp"))
        },
        onKeyUp: function (a) {
            a.preventDefault();
            a.keyCode == Garnish.ALT_KEY && (this.hidePassword(), this.$showPasswordToggle.show())
        },
        onInputChange: function () {
            this.$currentInput.val() ? this.$showPasswordToggle.show() : this.$showPasswordToggle.hide()
        },
        onToggleMouseDown: function (a) {
            a.preventDefault();
            if (this.$currentInput[0].setSelectionRange)var b = this.$currentInput[0].selectionStart, c = this.$currentInput[0].selectionEnd;
            this.togglePassword();
            this.$currentInput[0].setSelectionRange && this.$currentInput[0].setSelectionRange(b,
                c)
        }
    }, {defaults: {onToggleInput: c.noop}});
    Craft.ProgressBar = Garnish.Base.extend({
        $progressBar: null, $innerProgressBar: null, _itemCount: 0, _processedItemCount: 0, init: function (a) {
            this.$progressBar = c('<div class="progressbar pending hidden"/>').appendTo(a);
            this.$innerProgressBar = c('<div class="progressbar-inner"/>').appendTo(this.$progressBar);
            this.resetProgressBar()
        }, resetProgressBar: function () {
            this.setProgressPercentage(100);
            this.$progressBar.addClass("pending");
            this.setItemCount(1);
            this.setProcessedItemCount(0)
        },
        hideProgressBar: function () {
            this.$progressBar.fadeTo("fast", 0.01, c.proxy(function () {
                this.$progressBar.addClass("hidden").fadeTo(1, 1, c.noop)
            }, this))
        }, showProgressBar: function () {
            this.$progressBar.removeClass("hidden")
        }, setItemCount: function (a) {
            this._itemCount = a
        }, incrementItemCount: function (a) {
            this._itemCount += a
        }, setProcessedItemCount: function (a) {
            this._processedItemCount = a
        }, incrementProcessedItemCount: function (a) {
            this._processedItemCount += a
        }, updateProgressBar: function () {
            this._itemCount = Math.max(this._itemCount,
                1);
            var a = Math.min(100, Math.round(100 * this._processedItemCount / this._itemCount));
            this.setProgressPercentage(a)
        }, setProgressPercentage: function (a, b) {
            0 == a ? this.$progressBar.addClass("pending") : (this.$progressBar.removeClass("pending"), b ? this.$innerProgressBar.velocity("stop").velocity({width: a + "%"}, "fast") : this.$innerProgressBar.velocity("stop").width(a + "%"))
        }
    });
    Craft.PromptHandler = Garnish.Base.extend({
        $modalContainerDiv: null,
        $prompt: null,
        $promptApplyToRemainingContainer: null,
        $promptApplyToRemainingCheckbox: null,
        $promptApplyToRemainingLabel: null,
        $promptButtons: null,
        _prompts: [],
        _promptBatchCallback: c.noop,
        _promptBatchReturnData: [],
        _promptBatchNum: 0,
        init: function () {
        },
        resetPrompts: function () {
            this._prompts = [];
            this._promptBatchCallback = c.noop;
            this._promptBatchReturnData = [];
            this._promptBatchNum = 0
        },
        addPrompt: function (a) {
            this._prompts.push(a)
        },
        getPromptCount: function () {
            return this._prompts.length
        },
        showBatchPrompts: function (a) {
            this._promptBatchCallback = a;
            this._promptBatchReturnData = [];
            this._promptBatchNum = 0;
            this._showNextPromptInBatch()
        },
        _showNextPromptInBatch: function () {
            var a = this._prompts[this._promptBatchNum].prompt, b = this._prompts.length - (this._promptBatchNum + 1);
            this._showPrompt(a.message, a.choices, c.proxy(this, "_handleBatchPromptSelection"), b)
        },
        _handleBatchPromptSelection: function (a, b) {
            var d = this._prompts.length - (this._promptBatchNum + 1), e = c.extend(this._prompts[this._promptBatchNum], {choice: a});
            this._promptBatchReturnData.push(e);
            d ? (this._promptBatchNum++, b ? this._handleBatchPromptSelection(a, !0) : this._showNextPromptInBatch()) :
            "function" == typeof this._promptBatchCallback && this._promptBatchCallback(this._promptBatchReturnData)
        },
        _showPrompt: function (a, b, d, e) {
            this._promptCallback = d;
            null == this.modal && (this.modal = new Garnish.Modal({closeOtherModals: !1}));
            null == this.$modalContainerDiv && (this.$modalContainerDiv = c('<div class="modal fitted prompt-modal"></div>').addClass().appendTo(Garnish.$bod));
            this.$prompt = c('<div class="body"></div>').appendTo(this.$modalContainerDiv.empty());
            this.$promptMessage = c('<p class="prompt-msg"/>').appendTo(this.$prompt);
            c("<p>").html(Craft.t("What do you want to do?")).appendTo(this.$prompt);
            this.$promptApplyToRemainingContainer = c('<label class="assets-applytoremaining"/>').appendTo(this.$prompt).hide();
            this.$promptApplyToRemainingCheckbox = c('<input type="checkbox"/>').appendTo(this.$promptApplyToRemainingContainer);
            this.$promptApplyToRemainingLabel = c("<span/>").appendTo(this.$promptApplyToRemainingContainer);
            this.$promptButtons = c('<div class="buttons"/>').appendTo(this.$prompt);
            this.modal.setContainer(this.$modalContainerDiv);
            this.$promptMessage.html(a);
            for (a = 0; a < b.length; a++)d = c('<div class="btn" data-choice="' + b[a].value + '">' + b[a].title + "</div>"), this.addListener(d, "activate", function (a) {
                a = a.currentTarget.getAttribute("data-choice");
                var b = this.$promptApplyToRemainingCheckbox.prop("checked");
                this._selectPromptChoice(a, b)
            }), this.$promptButtons.append(d);
            e && (this.$promptApplyToRemainingContainer.show(), this.$promptApplyToRemainingLabel.html(" " + Craft.t("Apply this to the {number} remaining conflicts?", {number: e})));
            this.modal.show();
            this.modal.removeListener(Garnish.Modal.$shade, "click");
            this.addListener(Garnish.Modal.$shade, "click", "_cancelPrompt")
        },
        _selectPromptChoice: function (a, b) {
            this.$prompt.fadeOut("fast", c.proxy(function () {
                this.modal.hide();
                this._promptCallback(a, b)
            }, this))
        },
        _cancelPrompt: function () {
            this._selectPromptChoice("cancel", !0)
        }
    });
    Craft.SlugGenerator = Craft.BaseInputGenerator.extend({
        generateTargetValue: function (a) {
            a = a.replace(/<(.*?)>/g, "");
            a = a.replace(/['"\u2018\u2019\u201c\u201d\[\]\(\)\{\}:]/g, "");
            a = a.toLowerCase();
            Craft.limitAutoSlugsToAscii && (a = Craft.asciiString(a));
            a = Craft.filterArray(XRegExp.matchChain(a, [XRegExp("[\\p{L}\\p{N}\\p{M}]+")]));
            return a.length ? a.join(Craft.slugWordSeparator) : ""
        }
    });
    Craft.Structure = Garnish.Base.extend({
        id: null, $container: null, state: null, structureDrag: null, init: function (a, b, d) {
            this.id = a;
            this.$container = c(b);
            this.setSettings(d, Craft.Structure.defaults);
            this.$container.data("structure") && (Garnish.log("Double-instantiating a structure on an element"), this.$container.data("structure").destroy());
            this.$container.data("structure", this);
            this.state = {};
            this.settings.storageKey && c.extend(this.state, Craft.getLocalStorage(this.settings.storageKey, {}));
            "undefined" == typeof this.state.collapsedElementIds && (this.state.collapsedElementIds = []);
            a = this.$container.find("ul").prev(".row");
            for (b = 0; b < a.length; b++) {
                d = c(a[b]);
                var e = d.parent(), f = c('<div class="toggle" title="' + Craft.t("Show/hide children") + '"/>').prependTo(d);
                -1 != c.inArray(d.children(".element").data("id"), this.state.collapsedElementIds) && e.addClass("collapsed");
                this.initToggle(f)
            }
            this.settings.sortable && (this.structureDrag = new Craft.StructureDrag(this, this.settings.maxLevels));
            this.settings.newChildUrl && this.initNewChildMenus(this.$container.find(".add"))
        }, initToggle: function (a) {
            a.click(c.proxy(function (a) {
                a = c(a.currentTarget).closest("li");
                var d = a.children(".row").find(".element:first").data("id"), e = c.inArray(d, this.state.collapsedElementIds);
                a.hasClass("collapsed") ? (a.removeClass("collapsed"), -1 != e && this.state.collapsedElementIds.splice(e, 1)) : (a.addClass("collapsed"),
                -1 == e && this.state.collapsedElementIds.push(d));
                this.settings.storageKey && Craft.setLocalStorage(this.settings.storageKey, this.state)
            }, this))
        }, initNewChildMenus: function (a) {
            this.addListener(a, "click", "onNewChildMenuClick")
        }, onNewChildMenuClick: function (a) {
            a = c(a.currentTarget);
            if (!a.data("menubtn")) {
                var b = a.parent().children(".element").data("id"), b = Craft.getUrl(this.settings.newChildUrl, "parentId=" + b);
                c('<div class="menu"><ul><li><a href="' + b + '">' + Craft.t("New child") + "</a></li></ul></div>").insertAfter(a);
                (new Garnish.MenuBtn(a)).showMenu()
            }
        }, getIndent: function (a) {
            return Craft.Structure.baseIndent + (a - 1) * Craft.Structure.nestedIndent
        }, addElement: function (a) {
            var b = c('<li data-level="1"/>').appendTo(this.$container), d = c('<div class="row" style="margin-' + Craft.left + ": -" + Craft.Structure.baseIndent + "px; padding-" + Craft.left + ": " + Craft.Structure.baseIndent + 'px;">').appendTo(b);
            d.append(a);
            this.settings.sortable && (d.append('<a class="move icon" title="' + Craft.t("Move") + '"></a>'), this.structureDrag.addItems(b));
            this.settings.newChildUrl && (a = c('<a class="add icon" title="' + Craft.t("New child") + '"></a>').appendTo(d), this.initNewChildMenus(a));
            d.css("margin-bottom", -30);
            d.velocity({"margin-bottom": 0}, "fast")
        }, removeElement: function (a) {
            var b = a.parent().parent();
            this.settings.sortable && this.structureDrag.removeItems(b);
            if (!b.siblings().length)var d = b.parent();
            b.css("visibility", "hidden").velocity({marginBottom: -b.height()}, "fast", c.proxy(function () {
                b.remove();
                "undefined" != typeof d && this._removeUl(d)
            }, this))
        },
        _removeUl: function (a) {
            a.siblings(".row").children(".toggle").remove();
            a.remove()
        }
    }, {
        baseIndent: 8,
        nestedIndent: 35,
        defaults: {storageKey: null, sortable: !1, newChildUrl: null, maxLevels: null}
    });
    Craft.StructureDrag = Garnish.Drag.extend({
        structure: null,
        maxLevels: null,
        draggeeLevel: null,
        $helperLi: null,
        $targets: null,
        draggeeHeight: null,
        init: function (a, b) {
            this.structure = a;
            this.maxLevels = b;
            this.$insertion = c('<li class="draginsertion"/>');
            var d = this.structure.$container.find("li");
            this.base(d, {
                handle: ".element:first, .move:first",
                helper: c.proxy(this, "getHelper")
            })
        },
        getHelper: function (a) {
            this.$helperLi = a;
            var b = c('<ul class="structure draghelper"/>').append(a);
            a.css("padding-" + Craft.left, this.$draggee.css("padding-" + Craft.left));
            a.find(".move").removeAttr("title");
            return b
        },
        onDragStart: function () {
            this.$targets = c();
            this.findTargets(this.structure.$container);
            this.draggeeLevel = 0;
            var a = this.$draggee;
            do this.draggeeLevel++, a = a.find("> ul > li"); while (a.length);
            this.draggeeHeight = this.$draggee.height();
            this.$draggee.velocity({height: 0},
                "fast", c.proxy(function () {
                    this.$draggee.addClass("hidden")
                }, this));
            this.base();
            this.addListener(Garnish.$doc, "keydown", function (a) {
                a.keyCode == Garnish.ESC_KEY && this.cancelDrag()
            })
        },
        findTargets: function (a) {
            a = a.children().not(this.$draggee);
            for (var b = 0; b < a.length; b++) {
                var d = c(a[b]);
                this.$targets = this.$targets.add(d.children(".row"));
                d.hasClass("collapsed") || this.findTargets(d.children("ul"))
            }
        },
        onDrag: function () {
            this._.$closestTarget && (this._.$closestTarget.removeClass("draghover"), this.$insertion.remove());
            this._.$closestTarget = null;
            this._.closestTargetPos = null;
            this._.closestTargetYDiff = null;
            this._.closestTargetOffset = null;
            this._.closestTargetHeight = null;
            for (this._.i = 0; this._.i < this.$targets.length; this._.i++)if (this._.$target = c(this.$targets[this._.i]), this._.targetOffset = this._.$target.offset(), this._.targetHeight = this._.$target.outerHeight(), this._.targetYMidpoint = this._.targetOffset.top + this._.targetHeight / 2, this._.targetYDiff = Math.abs(this.mouseY - this._.targetYMidpoint), 0 == this._.i || this.mouseY >=
                this._.targetOffset.top + 5 && this._.targetYDiff < this._.closestTargetYDiff)this._.$closestTarget = this._.$target, this._.closestTargetPos = this._.i, this._.closestTargetYDiff = this._.targetYDiff, this._.closestTargetOffset = this._.targetOffset, this._.closestTargetHeight = this._.targetHeight; else break;
            if (this._.$closestTarget)if (0 == this._.closestTargetPos && this.mouseY < this._.closestTargetOffset.top + 5)this.$insertion.prependTo(this.structure.$container); else if (this._.$closestTargetLi = this._.$closestTarget.parent(),
                    this._.closestTargetLevel = this._.$closestTargetLi.data("level"), this._.closestTargetPos < this.$targets.length - 1 ? (this._.$nextTargetLi = c(this.$targets[this._.closestTargetPos + 1]).parent(), this._.nextTargetLevel = this._.$nextTargetLi.data("level")) : (this._.$nextTargetLi = null, this._.nextTargetLevel = null), this._.hoveringBetweenRows = this.mouseY >= this._.closestTargetOffset.top + this._.closestTargetHeight - 5, this._.$nextTargetLi && this._.nextTargetLevel == this._.closestTargetLevel)this._.hoveringBetweenRows ? (!this.maxLevels ||
            this.maxLevels >= this._.closestTargetLevel + this.draggeeLevel - 1) && this.$insertion.insertAfter(this._.$closestTargetLi) : (!this.maxLevels || this.maxLevels >= this._.closestTargetLevel + this.draggeeLevel) && this._.$closestTarget.addClass("draghover"); else if (this._.$nextTargetLi && this._.nextTargetLevel > this._.closestTargetLevel) {
                if (!this.maxLevels || this.maxLevels >= this._.nextTargetLevel + this.draggeeLevel - 1)this._.hoveringBetweenRows ? this.$insertion.insertBefore(this._.$nextTargetLi) : (this._.$closestTarget.addClass("draghover"),
                    this.$insertion.appendTo(this._.$closestTargetLi.children("ul")))
            } else if (this._.hoveringBetweenRows) {
                this._.draggeeX = this.mouseX - this.targetItemMouseDiffX;
                "rtl" == Craft.orientation && (this._.draggeeX += this.$helperLi.width());
                this._.$parentLis = this._.$closestTarget.parentsUntil(this.structure.$container, "li");
                this._.$closestParentLi = null;
                this._.closestParentLiXDiff = null;
                this._.closestParentLevel = null;
                for (this._.i = 0; this._.i < this._.$parentLis.length; this._.i++)this._.$parentLi = c(this._.$parentLis[this._.i]),
                    this._.parentLiX = this._.$parentLi.offset().left, "rtl" == Craft.orientation && (this._.parentLiX += this._.$parentLi.width()), this._.parentLiXDiff = Math.abs(this._.parentLiX - this._.draggeeX), this._.parentLevel = this._.$parentLi.data("level"), (!this.maxLevels || this.maxLevels >= this._.parentLevel + this.draggeeLevel - 1) && (!this._.$closestParentLi || this._.parentLiXDiff < this._.closestParentLiXDiff && (!this._.$nextTargetLi || this._.parentLevel >= this._.nextTargetLevel)) && (this._.$closestParentLi = this._.$parentLi, this._.closestParentLiXDiff =
                    this._.parentLiXDiff, this._.closestParentLevel = this._.parentLevel);
                this._.$closestParentLi && this.$insertion.insertAfter(this._.$closestParentLi)
            } else(!this.maxLevels || this.maxLevels >= this._.closestTargetLevel + this.draggeeLevel) && this._.$closestTarget.addClass("draghover")
        },
        cancelDrag: function () {
            this.$insertion.remove();
            this._.$closestTarget && this._.$closestTarget.removeClass("draghover");
            this.onMouseUp()
        },
        onDragStop: function () {
            if (this._.$closestTarget && (this.$insertion.parent().length || this._.$closestTarget.hasClass("draghover"))) {
                var a =
                    this.$draggee.siblings().length ? null : this.$draggee.parent();
                if (this.$insertion.parent().length) {
                    var b = this.$insertion.next().add(this.$insertion.prev());
                    -1 == c.inArray(this.$draggee[0], b) ? (this.$insertion.replaceWith(this.$draggee), b = !0) : (this.$insertion.remove(), b = !1)
                } else b = this._.$closestTargetLi.children("ul"), a && b.length && b[0] == a[0] ? b = !1 : (b.length ? this._.$closestTargetLi.hasClass("collapsed") && this._.$closestTarget.children(".toggle").trigger("click") : (b = c('<div class="toggle" title="' + Craft.t("Show/hide children") +
                    '"/>').prependTo(this._.$closestTarget), this.structure.initToggle(b), b = c("<ul>").appendTo(this._.$closestTargetLi)), this.$draggee.appendTo(b), b = !0);
                this._.$closestTarget.removeClass("draghover");
                b && (a && this.structure._removeUl(a), a = this.$draggee.parentsUntil(this.structure.$container, "li").length + 1, a != this.$draggee.data("level") && (1 == this.$draggee.data("level") ? (b = {}, b["padding-" + Craft.left] = 38, this.$helperLi.velocity(b, "fast")) : 1 == a && (b = {}, b["padding-" + Craft.left] = Craft.Structure.baseIndent, this.$helperLi.velocity(b,
                    "fast")), this.setLevel(this.$draggee, a)), a = this.$draggee.children(".row").children(".element"), a = {
                    structureId: this.structure.id,
                    elementId: a.data("id"),
                    locale: a.data("locale"),
                    prevId: this.$draggee.prev().children(".row").children(".element").data("id"),
                    parentId: this.$draggee.parent("ul").parent("li").children(".row").children(".element").data("id")
                }, Craft.postActionRequest("structures/moveElement", a, function (a, b) {
                    "success" == b && Craft.cp.displayNotice(Craft.t("New order saved."))
                }))
            }
            this.$draggee.velocity("stop").removeClass("hidden").velocity({height: this.draggeeHeight},
                "fast", c.proxy(function () {
                    this.$draggee.css("height", "auto")
                }, this));
            this.returnHelpersToDraggees();
            this.base()
        },
        setLevel: function (a, b) {
            a.data("level", b);
            var d = this.structure.getIndent(b), e = {};
            e["margin-" + Craft.left] = "-" + d + "px";
            e["padding-" + Craft.left] = d + "px";
            this.$draggee.children(".row").css(e);
            d = a.children("ul").children();
            for (e = 0; e < d.length; e++)this.setLevel(c(d[e]), b + 1)
        }
    });
    Craft.StructureTableSorter = Garnish.DragSort.extend({
        tableView: null,
        structureId: null,
        maxLevels: null,
        _helperMargin: null,
        _$firstRowCells: null,
        _$titleHelperCell: null,
        _titleHelperCellOuterWidth: null,
        _ancestors: null,
        _updateAncestorsFrame: null,
        _updateAncestorsProxy: null,
        _draggeeLevel: null,
        _draggeeLevelDelta: null,
        draggingLastElements: null,
        _loadingDraggeeLevelDelta: !1,
        _targetLevel: null,
        _targetLevelBounds: null,
        _positionChanged: null,
        init: function (a, b, d) {
            this.tableView = a;
            this.structureId = this.tableView.$table.data("structure-id");
            this.maxLevels = parseInt(this.tableView.$table.attr("data-max-levels"));
            d = c.extend({}, Craft.StructureTableSorter.defaults,
                d, {
                    handle: ".move",
                    collapseDraggees: !0,
                    singleHelper: !0,
                    helperSpacingY: 2,
                    magnetStrength: 4,
                    helper: c.proxy(this, "getHelper"),
                    helperLagBase: 1.5,
                    axis: Garnish.Y_AXIS
                });
            this.base(b, d)
        },
        startDragging: function () {
            this._helperMargin = Craft.StructureTableSorter.HELPER_MARGIN + (this.tableView.elementIndex.actions ? 24 : 0);
            this.base()
        },
        findDraggee: function () {
            this._draggeeLevel = this._targetLevel = this.$targetItem.data("level");
            this._draggeeLevelDelta = 0;
            for (var a = c(this.$targetItem), b = this.$targetItem.next(); b.length;) {
                var d =
                    b.data("level");
                if (d <= this._draggeeLevel)break;
                d -= this._draggeeLevel;
                d > this._draggeeLevelDelta && (this._draggeeLevelDelta = d);
                a = a.add(b);
                b = b.next()
            }
            this.draggingLastElements = !b.length;
            this.maxLevels && this.draggingLastElements && this.tableView.getMorePending() && (this._loadingDraggeeLevelDelta = !0, b = this._getAjaxBaseData(this.$targetItem), Craft.postActionRequest("structures/getElementLevelDelta", b, c.proxy(function (a, b) {
                "success" == b && (this._loadingDraggeeLevelDelta = !1, this.dragging && (this._draggeeLevelDelta =
                    a.delta, this.drag(!1)))
            }, this)));
            return a
        },
        getHelper: function (a) {
            var b = c('<div class="elements datatablesorthelper"/>').appendTo(Garnish.$bod), d = c('<div class="tableview"/>').appendTo(b), d = c('<table class="data"/>').appendTo(d), d = c("<tbody/>").appendTo(d);
            a.appendTo(d);
            this._$firstRowCells = this.tableView.$elementContainer.children("tr:first").children();
            a = a.children();
            for (d = 0; d < a.length; d++) {
                var e = c(a[d]);
                if (e.hasClass("checkbox-cell"))e.remove(); else {
                    var f = c(this._$firstRowCells[d]), g = f.width();
                    f.width(g);
                    e.width(g);
                    Garnish.hasAttr(f, "data-titlecell") && (this._$titleHelperCell = e, f = parseInt(f.css("padding-" + Craft.left)), this._titleHelperCellOuterWidth = g + f - (this.tableView.elementIndex.actions ? 12 : 0), e.css("padding-" + Craft.left, Craft.StructureTableSorter.BASE_PADDING))
                }
            }
            return b
        },
        canInsertBefore: function (a) {
            return this._loadingDraggeeLevelDelta ? !1 : !1 !== this._getLevelBounds(a.prev(), a)
        },
        canInsertAfter: function (a) {
            return this._loadingDraggeeLevelDelta ? !1 : !1 !== this._getLevelBounds(a, a.next())
        },
        onDragStart: function () {
            this._ancestors = this._getAncestors(this.$targetItem, this.$targetItem.data("level"));
            this._setTargetLevelBounds();
            this.tableView.maybeLoadMore();
            this.base()
        },
        onDrag: function () {
            this.base();
            this._updateIndent()
        },
        onInsertionPointChange: function () {
            this._setTargetLevelBounds();
            this._updateAncestorsBeforeRepaint();
            this.base()
        },
        onDragStop: function () {
            this._positionChanged = !1;
            this.base();
            if (this._targetLevel != this._draggeeLevel) {
                for (var a = this._targetLevel - this._draggeeLevel, b = 0; b < this.$draggee.length; b++) {
                    var d =
                        c(this.$draggee[b]), e = d.data("level") + a, f = Craft.StructureTableSorter.BASE_PADDING + (this.tableView.elementIndex.actions ? 7 : 0) + this._getLevelIndent(e);
                    d.data("level", e);
                    d.find(".element").data("level", e);
                    d.children("[data-titlecell]:first").css("padding-" + Craft.left, f)
                }
                this._positionChanged = !0
            }
            if (this._positionChanged) {
                a = this._getAjaxBaseData(this.$draggee);
                for (b = this.$draggee.first().prev(); b.length;) {
                    d = b.data("level");
                    if (d == this._targetLevel) {
                        a.prevId = b.data("id");
                        break
                    }
                    if (d < this._targetLevel) {
                        a.parentId =
                            b.data("id");
                        var g = b.find("> td > .toggle");
                        if (!g.hasClass("expanded")) {
                            g.addClass("expanded");
                            var h = this.tableView._createSpinnerRowAfter(b);
                            this.tableView.elementSelect && this.tableView.elementSelect.removeItems(this.$targetItem);
                            this.removeItems(this.$targetItem);
                            this.$targetItem.remove();
                            this.tableView._totalVisible--
                        }
                        break
                    }
                    b = b.prev()
                }
                Craft.postActionRequest("structures/moveElement", a, c.proxy(function (a, b) {
                    "success" == b && (Craft.cp.displayNotice(Craft.t("New position saved.")), this.onPositionChange(),
                    h && h.parent().length && (h.remove(), this.tableView._expandElement(g, !0)), Craft.cp.runPendingTasks())
                }, this))
            }
        },
        onSortChange: function () {
            this.tableView.elementSelect && this.tableView.elementSelect.resetItemOrder();
            this._positionChanged = !0;
            this.base()
        },
        onPositionChange: function () {
            Garnish.requestAnimationFrame(c.proxy(function () {
                this.trigger("positionChange");
                this.settings.onPositionChange()
            }, this))
        },
        onReturnHelpersToDraggees: function () {
            this._$firstRowCells.css("width", "");
            if (this.draggingLastElements &&
                this.tableView.getMorePending()) {
                this.tableView._totalVisible += this.newDraggeeIndexes[0] - this.oldDraggeeIndexes[0];
                var a = this.$draggee.last().nextAll();
                a.length && (this.removeItems(a), a.remove(), this.tableView.maybeLoadMore())
            }
            this.base()
        },
        _getLevelBounds: function (a, b) {
            this._getLevelBounds._minLevel = b && b.length ? b.data("level") : 1;
            this._getLevelBounds._maxLevel = a && a.length ? a.data("level") + 1 : 1;
            if (this.maxLevels) {
                if (1 != this._getLevelBounds._minLevel && this._getLevelBounds._minLevel + this._draggeeLevelDelta >
                    this.maxLevels)return !1;
                this._getLevelBounds._maxLevel + this._draggeeLevelDelta > this.maxLevels && (this._getLevelBounds._maxLevel = this.maxLevels - this._draggeeLevelDelta, this._getLevelBounds._maxLevel < this._getLevelBounds._minLevel && (this._getLevelBounds._maxLevel = this._getLevelBounds._minLevel))
            }
            return {min: this._getLevelBounds._minLevel, max: this._getLevelBounds._maxLevel}
        },
        _setTargetLevelBounds: function () {
            this._targetLevelBounds = this._getLevelBounds(this.$draggee.first().prev(), this.$draggee.last().next())
        },
        _updateIndent: function (a) {
            this._updateIndent._mouseDist = this.realMouseX - this.mousedownX;
            "rtl" == Craft.orientation && (this._updateIndent._mouseDist *= -1);
            this._updateIndent._indentationDist = Math.round(this._updateIndent._mouseDist / Craft.StructureTableSorter.LEVEL_INDENT);
            this._updateIndent._targetLevel = this._draggeeLevel + this._updateIndent._indentationDist;
            this._updateIndent._targetLevel < this._targetLevelBounds.min ? (this._updateIndent._indentationDist += this._targetLevelBounds.min - this._updateIndent._targetLevel,
                this._updateIndent._targetLevel = this._targetLevelBounds.min) : this._updateIndent._targetLevel > this._targetLevelBounds.max && (this._updateIndent._indentationDist -= this._updateIndent._targetLevel - this._targetLevelBounds.max, this._updateIndent._targetLevel = this._targetLevelBounds.max);
            this._targetLevel !== (this._targetLevel = this._updateIndent._targetLevel) && this._updateAncestorsBeforeRepaint();
            this._updateIndent._targetLevelMouseDiff = this._updateIndent._mouseDist - this._updateIndent._indentationDist * Craft.StructureTableSorter.LEVEL_INDENT;
            this._updateIndent._magnetImpact = Math.round(this._updateIndent._targetLevelMouseDiff / 15);
            Math.abs(this._updateIndent._magnetImpact) > Craft.StructureTableSorter.MAX_GIVE && (this._updateIndent._magnetImpact = (0 < this._updateIndent._magnetImpact ? 1 : -1) * Craft.StructureTableSorter.MAX_GIVE);
            this._updateIndent._closestLevelMagnetIndent = this._getLevelIndent(this._targetLevel) + this._updateIndent._magnetImpact;
            this.helpers[0].css("margin-" + Craft.left, this._updateIndent._closestLevelMagnetIndent + this._helperMargin);
            this._$titleHelperCell.width(this._titleHelperCellOuterWidth - (this._updateIndent._closestLevelMagnetIndent + Craft.StructureTableSorter.BASE_PADDING))
        },
        _getLevelIndent: function (a) {
            return (a - 1) * Craft.StructureTableSorter.LEVEL_INDENT
        },
        _getAjaxBaseData: function (a) {
            return {
                structureId: this.structureId,
                elementId: a.data("id"),
                locale: a.find(".element:first").data("locale")
            }
        },
        _getAncestors: function (a, b) {
            this._getAncestors._ancestors = [];
            if (0 != b)for (this._getAncestors._level = b, this._getAncestors._$prevRow = a.prev(); this._getAncestors._$prevRow.length && !(this._getAncestors._$prevRow.data("level") < this._getAncestors._level && (this._getAncestors._ancestors.unshift(this._getAncestors._$prevRow), this._getAncestors._level = this._getAncestors._$prevRow.data("level"), 0 == this._getAncestors._level));)this._getAncestors._$prevRow = this._getAncestors._$prevRow.prev();
            return this._getAncestors._ancestors
        },
        _updateAncestorsBeforeRepaint: function () {
            this._updateAncestorsFrame && Garnish.cancelAnimationFrame(this._updateAncestorsFrame);
            this._updateAncestorsProxy || (this._updateAncestorsProxy =
                c.proxy(this, "_updateAncestors"));
            this._updateAncestorsFrame = Garnish.requestAnimationFrame(this._updateAncestorsProxy)
        },
        _updateAncestors: function () {
            this._updateAncestorsFrame = null;
            for (this._updateAncestors._i = 0; this._updateAncestors._i < this._ancestors.length; this._updateAncestors._i++)this._updateAncestors._$ancestor = this._ancestors[this._updateAncestors._i], this._updateAncestors._$ancestor.data("descendants", this._updateAncestors._$ancestor.data("descendants") - 1), 0 == this._updateAncestors._$ancestor.data("descendants") &&
            this._updateAncestors._$ancestor.find("> td > .toggle:first").remove();
            this._updateAncestors._newAncestors = this._getAncestors(this.$targetItem, this._targetLevel);
            for (this._updateAncestors._i = 0; this._updateAncestors._i < this._updateAncestors._newAncestors.length; this._updateAncestors._i++)this._updateAncestors._$ancestor = this._updateAncestors._newAncestors[this._updateAncestors._i], this._updateAncestors._$ancestor.data("descendants", this._updateAncestors._$ancestor.data("descendants") + 1), 1 == this._updateAncestors._$ancestor.data("descendants") &&
            c('<span class="toggle expanded" title="' + Craft.t("Show/hide children") + '"></span>').insertAfter(this._updateAncestors._$ancestor.find("> td .move:first"));
            this._ancestors = this._updateAncestors._newAncestors;
            delete this._updateAncestors._i;
            delete this._updateAncestors._$ancestor;
            delete this._updateAncestors._newAncestors
        }
    }, {BASE_PADDING: 36, HELPER_MARGIN: -7, LEVEL_INDENT: 44, MAX_GIVE: 22, defaults: {onPositionChange: c.noop}});
    Craft.TableElementIndexView = Craft.BaseElementIndexView.extend({
        $table: null,
        $selectedSortHeader: null,
        structureTableSort: null,
        _totalVisiblePostStructureTableDraggee: null,
        _morePendingPostStructureTableDraggee: !1,
        getElementContainer: function () {
            this.$table = this.$container.find("table:first");
            return this.$table.children("tbody:first")
        },
        afterInit: function () {
            Craft.cp.$collapsibleTables = Craft.cp.$collapsibleTables.add(this.$table);
            Craft.cp.updateResponsiveTables();
            this.initTableHeaders();
            "index" == this.elementIndex.settings.context && "structure" == this.elementIndex.getSelectedSortAttribute() && Garnish.hasAttr(this.$table,
                "data-structure-id") ? this.structureTableSort = new Craft.StructureTableSorter(this, this.getAllElements(), {onSortChange: c.proxy(this, "_onStructureTableSortChange")}) : this.structureTableSort = null;
            "structure" == this.elementIndex.getSelectedSortAttribute() && this.addListener(this.$elementContainer, "click", function (a) {
                a = c(a.target);
                a.hasClass("toggle") && !1 === this._collapseElement(a) && this._expandElement(a)
            })
        },
        initTableHeaders: function () {
            for (var a = this.elementIndex.getSelectedSortAttribute(), b = this.$table.children("thead").children().children("[data-attribute]"),
                     d = 0; d < b.length; d++) {
                var e = b.eq(d), f = e.attr("data-attribute");
                f == a ? (this.$selectedSortHeader = e, f = this.elementIndex.getSelectedSortDirection(), e.addClass("ordered " + f).click(c.proxy(this, "_handleSelectedSortHeaderClick"))) : this.elementIndex.getSortAttributeOption(f).length && e.addClass("orderable").click(c.proxy(this, "_handleUnselectedSortHeaderClick"))
            }
        },
        isVerticalList: function () {
            return !0
        },
        getTotalVisible: function () {
            return this._isStructureTableDraggingLastElements() ? this._totalVisiblePostStructureTableDraggee :
                this._totalVisible
        },
        setTotalVisible: function (a) {
            this._isStructureTableDraggingLastElements() ? this._totalVisiblePostStructureTableDraggee = a : this._totalVisible = a
        },
        getMorePending: function () {
            return this._isStructureTableDraggingLastElements() ? this._morePendingPostStructureTableDraggee : this._morePending
        },
        setMorePending: function (a) {
            this._isStructureTableDraggingLastElements() ? this._morePendingPostStructureTableDraggee = a : this._morePending = this._morePendingPostStructureTableDraggee = a
        },
        getLoadMoreParams: function () {
            var a =
                this.base();
            this._isStructureTableDraggingLastElements() && (a.criteria.positionedAfter = this.structureTableSort.$targetItem.data("id"));
            return a
        },
        appendElements: function (a) {
            this.base(a);
            this.structureTableSort && this.structureTableSort.addItems(a);
            Craft.cp.updateResponsiveTables()
        },
        createElementEditor: function (a) {
            new Craft.ElementEditor(a, {
                params: {includeTableAttributesForSource: this.elementIndex.sourceKey},
                onSaveElement: c.proxy(function (b) {
                        b.tableAttributes && this._updateTableAttributes(a, b.tableAttributes)
                    },
                    this)
            })
        },
        destroy: function () {
            this.$table && (Craft.cp.$collapsibleTables = Craft.cp.$collapsibleTables.not(this.$table));
            this.base()
        },
        _collapseElement: function (a, b) {
            if (!b && !a.hasClass("expanded"))return !1;
            a.removeClass("expanded");
            for (var c = a.parent().parent(), e = c.data("id"), f = c.data("level"), c = c.next(); c.length;) {
                if (!Garnish.hasAttr(c, "data-spinnerrow")) {
                    if (c.data("level") <= f)break;
                    this.elementSelect && this.elementSelect.removeItems(c);
                    this.structureTableSort && this.structureTableSort.removeItems(c);
                    this._totalVisible--
                }
                var g =
                    c.next();
                c.remove();
                c = g
            }
            this.elementIndex.instanceState.collapsedElementIds || (this.elementIndex.instanceState.collapsedElementIds = []);
            this.elementIndex.instanceState.collapsedElementIds.push(e);
            this.elementIndex.setInstanceState("collapsedElementIds", this.elementIndex.instanceState.collapsedElementIds);
            this.maybeLoadMore()
        },
        _expandElement: function (a, b) {
            if (!b && a.hasClass("expanded"))return !1;
            a.addClass("expanded");
            if (this.elementIndex.instanceState.collapsedElementIds) {
                var d = a.parent().parent(), e =
                    d.data("id"), f = c.inArray(e, this.elementIndex.instanceState.collapsedElementIds);
                if (-1 != f) {
                    this.elementIndex.instanceState.collapsedElementIds.splice(f, 1);
                    this.elementIndex.setInstanceState("collapsedElementIds", this.elementIndex.instanceState.collapsedElementIds);
                    var g = this._createSpinnerRowAfter(d), d = c.extend(!0, {}, this.settings.params);
                    d.criteria.descendantOf = e;
                    Craft.postActionRequest("elementIndex/getMoreElements", d, c.proxy(function (a, b) {
                        if (g.parent().length && "success" == b) {
                            var d = c(a.html), e = this._totalVisible +
                                d.length, f = this.settings.batchSize && d.length == this.settings.batchSize;
                            if (f) {
                                var n = g.nextAll();
                                this.elementSelect && this.elementSelect.removeItems(n);
                                this.structureTableSort && this.structureTableSort.removeItems(n);
                                n.remove();
                                e -= n.length
                            } else f = this._morePending;
                            g.replaceWith(d);
                            if (this.elementIndex.actions || this.settings.selectable)this.elementSelect.addItems(d.filter(":not(.disabled)")), this.elementIndex.updateActionTriggers();
                            this.structureTableSort && this.structureTableSort.addItems(d);
                            Craft.appendHeadHtml(a.headHtml);
                            Craft.appendFootHtml(a.footHtml);
                            Craft.cp.updateResponsiveTables();
                            this.setTotalVisible(e);
                            this.setMorePending(f);
                            this.maybeLoadMore()
                        }
                    }, this))
                }
            }
        },
        _createSpinnerRowAfter: function (a) {
            return c('<tr data-spinnerrow><td class="centeralign" colspan="' + a.children().length + '"><div class="spinner"/></td></tr>').insertAfter(a)
        },
        _isStructureTableDraggingLastElements: function () {
            return this.structureTableSort && this.structureTableSort.dragging && this.structureTableSort.draggingLastElements
        },
        _handleSelectedSortHeaderClick: function (a) {
            var b =
                c(a.currentTarget);
            if (!b.hasClass("loading")) {
                var d = "asc" == this.elementIndex.getSelectedSortDirection() ? "desc" : "asc";
                this.elementIndex.setSortDirection(d);
                this._handleSortHeaderClick(a, b)
            }
        },
        _handleUnselectedSortHeaderClick: function (a) {
            var b = c(a.currentTarget);
            if (!b.hasClass("loading")) {
                var d = b.attr("data-attribute");
                this.elementIndex.setSortAttribute(d);
                this._handleSortHeaderClick(a, b)
            }
        },
        _handleSortHeaderClick: function (a, b) {
            this.$selectedSortHeader && this.$selectedSortHeader.removeClass("ordered asc desc");
            b.removeClass("orderable").addClass("ordered loading");
            this.elementIndex.storeSortAttributeAndDirection();
            this.elementIndex.updateElements();
            this.elementIndex.setIndexAvailable()
        },
        _updateTableAttributes: function (a, b) {
            var c = a.closest("tr"), e;
            for (e in b)c.children('td[data-attr="' + e + '"]:first').html(b[e])
        }
    });
    Craft.TagSelectInput = Craft.BaseElementSelectInput.extend({
        searchTimeout: null,
        searchMenu: null,
        $container: null,
        $elementsContainer: null,
        $elements: null,
        $addTagInput: null,
        $spinner: null,
        _ignoreBlur: !1,
        init: function (a) {
            if (!c.isPlainObject(a)) {
                for (var b = {}, d = ["id", "name", "tagGroupId", "sourceElementId"], e = 0; e < d.length; e++)if ("undefined" != typeof arguments[e])b[d[e]] = arguments[e]; else break;
                a = b
            }
            this.base(c.extend({}, Craft.TagSelectInput.defaults, a));
            this.$addTagInput = this.$container.children(".add").children(".text");
            this.$spinner = this.$addTagInput.next();
            this.addListener(this.$addTagInput, "textchange", c.proxy(function () {
                this.searchTimeout && clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(c.proxy(this,
                    "searchForTags"), 500)
            }, this));
            this.addListener(this.$addTagInput, "keypress", function (a) {
                a.keyCode == Garnish.RETURN_KEY && (a.preventDefault(), this.searchMenu && this.selectTag(this.searchMenu.$options[0]))
            });
            this.addListener(this.$addTagInput, "focus", function () {
                this.searchMenu && this.searchMenu.show()
            });
            this.addListener(this.$addTagInput, "blur", function () {
                this._ignoreBlur ? this._ignoreBlur = !1 : setTimeout(c.proxy(function () {
                    this.searchMenu && this.searchMenu.hide()
                }, this), 1)
            })
        },
        getAddElementsBtn: c.noop,
        getElementSortAxis: function () {
            return null
        },
        searchForTags: function () {
            this.searchMenu && this.killSearchMenu();
            if (this.$addTagInput.val()) {
                this.$spinner.removeClass("hidden");
                for (var a = [], b = 0; b < this.$elements.length; b++) {
                    var d = c(this.$elements[b]).data("id");
                    d && a.push(d)
                }
                this.settings.sourceElementId && a.push(this.settings.sourceElementId);
                var e = {search: this.$addTagInput.val(), tagGroupId: this.settings.tagGroupId, excludeIds: a};
                Craft.postActionRequest("tags/searchForTags", e, c.proxy(function (a, b) {
                    this.$spinner.addClass("hidden");
                    if ("success" == b) {
                        for (var d =
                            c('<div class="menu tagmenu"/>').appendTo(Garnish.$bod), k = c("<ul/>").appendTo(d), m = 0; m < a.tags.length; m++) {
                            var l = c("<li/>").appendTo(k);
                            c('<a data-icon="tag"/>').appendTo(l).text(a.tags[m].title).data("id", a.tags[m].id)
                        }
                        a.exactMatch || (l = c("<li/>").appendTo(k), c('<a data-icon="+"/>').appendTo(l).text(e.search));
                        k.find("> li:first-child > a").addClass("hover");
                        this.searchMenu = new Garnish.Menu(d, {
                            attachToElement: this.$addTagInput,
                            onOptionSelect: c.proxy(this, "selectTag")
                        });
                        this.addListener(d, "mousedown",
                            c.proxy(function () {
                                this._ignoreBlur = !0
                            }, this));
                        this.searchMenu.show()
                    }
                }, this))
            } else this.$spinner.addClass("hidden")
        },
        selectTag: function (a) {
            var b = c(a);
            a = b.data("id");
            var b = b.text(), d = c('<div class="element small removable" data-id="' + a + '" data-editable/>').appendTo(this.$elementsContainer), e = c('<input type="hidden" name="' + this.settings.name + '[]" value="' + a + '"/>').appendTo(d);
            c('<a class="delete icon" title="' + Craft.t("Remove") + '"></a>').appendTo(d);
            c('<span class="label">' + b + "</span>").appendTo(d);
            var f = -(d.outerWidth() + 10);
            this.$addTagInput.css("margin-" + Craft.left, f + "px");
            f = {};
            f["margin-" + Craft.left] = 0;
            this.$addTagInput.velocity(f, "fast");
            this.$elements = this.$elements.add(d);
            this.addElements(d);
            this.killSearchMenu();
            this.$addTagInput.val("");
            this.$addTagInput.focus();
            a || (d.addClass("loading disabled"), Craft.postActionRequest("tags/createTag", {
                groupId: this.settings.tagGroupId,
                title: b
            }, c.proxy(function (a, b) {
                "success" == b && a.success ? (d.attr("data-id", a.id), e.val(a.id), d.removeClass("loading disabled")) :
                    (this.removeElement(d), "success" == b && Craft.cp.displayError(Craft.t("An unknown error occurred.")))
            }, this)))
        },
        killSearchMenu: function () {
            this.searchMenu.hide();
            this.searchMenu.destroy();
            this.searchMenu = null
        }
    }, {defaults: {tagGroupId: null}});
    Craft.ThumbsElementIndexView = Craft.BaseElementIndexView.extend({
        getElementContainer: function () {
            return this.$container.children("ul")
        }
    });
    Craft.ui = {
        createTextInput: function (a) {
            var b = c("<input/>", {
                "class": "text",
                type: a.type || "text",
                id: a.id,
                size: a.size,
                name: a.name,
                value: a.value,
                maxlength: a.maxlength,
                "data-show-chars-left": a.showCharsLeft,
                autofocus: this.getAutofocusValue(a.autofocus),
                autocomplete: "undefined" !== typeof a.autocomplete && a.autocomplete ? null : "off",
                disabled: this.getDisabledValue(a.disabled),
                readonly: a.readonly,
                title: a.title,
                placeholder: a.placeholder
            });
            a.class && b.addClass(a.class);
            a.placeholder && b.addClass("nicetext");
            "password" == a.type && b.addClass("password");
            a.disabled && b.addClass("disabled");
            a.size || b.addClass("fullwidth");
            a.showCharsLeft && a.maxlength && b.css("padding-" +
                ("ltr" == Craft.orientation ? "right" : "left"), 7.2 * a.maxlength.toString().length + 14 + "px");
            (a.placeholder || a.showCharsLeft) && new Garnish.NiceText(b);
            return "password" == a.type ? c('<div class="passwordwrapper"/>').append(b) : b
        }, createTextField: function (a) {
            return this.createField(this.createTextInput(a), a)
        }, createCheckbox: function (a) {
            var b = a.id || "checkbox" + Math.floor(1E9 * Math.random()), d = c("<input/>", {
                type: "checkbox",
                value: "undefined" !== typeof a.value ? a.value : "1",
                id: b,
                "class": "checkbox",
                name: a.name,
                checked: a.checked ?
                    "checked" : null,
                autofocus: this.getAutofocusValue(a.autofocus),
                disabled: this.getDisabledValue(a.disabled),
                "data-target": a.toggle,
                "data-reverse-target": a.reverseToggle
            });
            a.class && d.addClass(a.class);
            if (a.toggle || a.reverseToggle)d.addClass("fieldtoggle"), new Craft.FieldToggle(d);
            b = c("<label/>", {"for": b, text: a.label});
            return a.name && (3 > a.name.length || "[]" != a.name.substr(-2)) ? c([c("<input/>", {
                type: "hidden",
                name: a.name,
                value: ""
            })[0], d[0], b[0]]) : c([d[0], b[0]])
        }, createCheckboxField: function (a) {
            var b = c('<div class="field checkboxfield"/>',
                {id: cofig.id ? a.id + "-field" : null});
            a.first && b.addClass("first");
            a.instructions && b.addClass("has-instructions");
            this.createCheckbox(a).appendTo(b);
            a.instructions && c('<div class="instructions"/>').text(a.instructions).appendTo(b);
            return b
        }, createCheckboxSelect: function (a) {
            var b = a.allValue || "*", d = !a.values || a.values == a.allValue, e = c('<div class="checkbox-select"/>');
            a.class && e.addClass(a.class);
            c("<div/>").appendTo(e).append(this.createCheckbox({
                id: a.id, "class": "all", label: "<b>" + (a.allLabel || Craft.t("All")) +
                "</b>", name: a.name, value: b, checked: d, autofocus: a.autofocus
            }));
            for (var f = 0; f < a.options.length; f++) {
                var g = a.options[f];
                g.value != b && c("<div/>").appendTo(e).append(this.createCheckbox({
                    label: g.label,
                    name: a.name ? a.name + "[]" : null,
                    value: g.value,
                    checked: d || Craft.inArray(g.value, a.values),
                    disabled: d
                }))
            }
            new Garnish.CheckboxSelect(e);
            return e
        }, createCheckboxSelectField: function (a) {
            return this.createField(this.createCheckboxSelect(a), a)
        }, createField: function (a, b) {
            var d = b.label && "__blank__" != b.label ? b.label : null,
                e = Craft.isLocalized && b.locale ? b.locale : null, f = c("<div/>", {
                    "class": "field",
                    id: b.id ? b.id + "-field" : null
                });
            b.first && f.addClass("first");
            if (d || b.instructions) {
                var g = c('<div class="heading"/>').appendTo(f);
                d && (d = c("<label/>", {
                    "class": b.required ? "required" : null,
                    "for": b.id,
                    text: d
                }).appendTo(g), e && c('<span class="locale"/>').text(e).appendTo(d));
                b.instructions && c('<div class="instructions"/>').text(b.instructions).appendTo(g)
            }
            c('<div class="input"/>').append(a).appendTo(f);
            b.warning && c('<p class="warning"/>').text(b.warning).appendTo(f);
            b.errors && this.addErrorsToField(f, b.errors);
            return f
        }, createErrorList: function (a) {
            var b = c('<ul class="errors"/>');
            a && this.addErrorsToList(b, a);
            return b
        }, addErrorsToList: function (a, b) {
            for (var d = 0; d < b.length; d++)c("<li/>").text(b[d]).appendTo(a)
        }, addErrorsToField: function (a, b) {
            if (b) {
                a.addClass("has-errors");
                a.children(".input").addClass("errors");
                var c = a.children("ul.errors");
                c.length || (c = this.createErrorList().appendTo(a));
                this.addErrorsToList(c, b)
            }
        }, clearErrorsFromField: function (a) {
            a.removeClass("has-errors");
            a.children(".input").removeClass("errors");
            a.children("ul.errors").remove()
        }, getAutofocusValue: function (a) {
            return a && !Garnish.isMobileBrowser(!0) ? "autofocus" : null
        }, getDisabledValue: function (a) {
            return a ? "disabled" : null
        }
    };
    Craft.UpgradeModal = Garnish.Modal.extend({
        $container: null,
        $body: null,
        $compareScreen: null,
        $checkoutScreen: null,
        $successScreen: null,
        $checkoutForm: null,
        $checkoutLogo: null,
        $checkoutSubmitBtn: null,
        $checkoutSpinner: null,
        $checkoutFormError: null,
        $checkoutSecure: null,
        clearCheckoutFormTimeout: null,
        $customerNameInput: null,
        $customerEmailInput: null,
        $ccField: null,
        $ccNumInput: null,
        $ccExpInput: null,
        $ccCvcInput: null,
        $businessFieldsToggle: null,
        $businessNameInput: null,
        $businessAddress1Input: null,
        $businessAddress2Input: null,
        $businessCityInput: null,
        $businessStateInput: null,
        $businessCountryInput: null,
        $businessZipInput: null,
        $businessTaxIdInput: null,
        $purchaseNotesInput: null,
        $couponInput: null,
        $couponSpinner: null,
        submittingPurchase: !1,
        stripePublicKey: null,
        editions: null,
        countries: null,
        states: null,
        edition: null,
        initializedCheckoutForm: !1,
        applyingCouponCode: !1,
        applyNewCouponCodeAfterDoneLoading: !1,
        couponPrice: null,
        formattedCouponPrice: null,
        init: function (a) {
            this.$container = c('<div id="upgrademodal" class="modal loading"/>').appendTo(Garnish.$bod);
            this.base(this.$container, c.extend({resizable: !0}, a));
            Craft.postActionRequest("app/getUpgradeModal", c.proxy(function (a, d) {
                this.$container.removeClass("loading");
                if ("success" == d) {
                    if (a.success) {
                        this.stripePublicKey = a.stripePublicKey;
                        this.editions = a.editions;
                        this.countries =
                            a.countries;
                        this.states = a.states;
                        this.$container.append(a.modalHtml);
                        this.$container.append('<script type="text/javascript" src="' + Craft.getResourceUrl("lib/jquery.payment" + (Craft.useCompressedJs ? ".min" : "") + ".js") + '">\x3c/script>');
                        this.$compareScreen = this.$container.children("#upgrademodal-compare");
                        this.$checkoutScreen = this.$container.children("#upgrademodal-checkout");
                        this.$successScreen = this.$container.children("#upgrademodal-success");
                        this.$checkoutLogo = this.$checkoutScreen.find(".logo:first");
                        this.$checkoutForm = this.$checkoutScreen.find("form:first");
                        this.$checkoutSubmitBtn = this.$checkoutForm.find("#pay-button");
                        this.$checkoutSpinner = this.$checkoutForm.find("#pay-spinner");
                        this.$customerNameInput = this.$checkoutForm.find("#customer-name");
                        this.$customerEmailInput = this.$checkoutForm.find("#customer-email");
                        this.$ccField = this.$checkoutForm.find("#cc-inputs");
                        this.$ccNumInput = this.$ccField.find("#cc-num");
                        this.$ccExpInput = this.$ccField.find("#cc-exp");
                        this.$ccCvcInput = this.$ccField.find("#cc-cvc");
                        this.$businessFieldsToggle = this.$checkoutForm.find(".fieldtoggle");
                        this.$businessNameInput = this.$checkoutForm.find("#business-name");
                        this.$businessAddress1Input = this.$checkoutForm.find("#business-address1");
                        this.$businessAddress2Input = this.$checkoutForm.find("#business-address2");
                        this.$businessCityInput = this.$checkoutForm.find("#business-city");
                        this.$businessStateInput = this.$checkoutForm.find("#business-state");
                        this.$businessCountryInput = this.$checkoutForm.find("#business-country");
                        this.$businessZipInput =
                            this.$checkoutForm.find("#business-zip");
                        this.$businessTaxIdInput = this.$checkoutForm.find("#business-taxid");
                        this.$purchaseNotesInput = this.$checkoutForm.find("#purchase-notes");
                        this.$checkoutSecure = this.$checkoutScreen.find(".secure:first");
                        this.$couponInput = this.$checkoutForm.find("#coupon-input");
                        this.$couponSpinner = this.$checkoutForm.find("#coupon-spinner");
                        var e = this.$compareScreen.find(".buybtn");
                        this.addListener(e, "click", "onBuyBtnClick");
                        e = this.$compareScreen.find(".btn.test");
                        this.addListener(e,
                            "click", "onTestBtnClick");
                        e = this.$checkoutScreen.find("#upgrademodal-cancelcheckout");
                        this.addListener(e, "click", "cancelCheckout")
                    } else e = a.error ? a.error : Craft.t("An unknown error occurred."), this.$container.append('<div class="body">' + e + "</div>");
                    c('<script type="text/javascript" src="https://js.stripe.com/v1/">\x3c/script>').appendTo(Garnish.$bod)
                }
            }, this))
        },
        initializeCheckoutForm: function () {
            this.$ccNumInput.payment("formatCardNumber");
            this.$ccExpInput.payment("formatCardExpiry");
            this.$ccCvcInput.payment("formatCardCVC");
            this.$businessFieldsToggle.fieldtoggle();
            this.$businessCountryInput.selectize({
                valueField: "iso",
                labelField: "name",
                searchField: ["name", "iso"],
                dropdownParent: "body",
                inputClass: "selectize-input text"
            });
            this.$businessCountryInput[0].selectize.addOption(this.countries);
            this.$businessCountryInput[0].selectize.refreshOptions(!1);
            this.$businessStateInput.selectize({
                valueField: "abbr",
                labelField: "name",
                searchField: ["name", "abbr"],
                dropdownParent: "body",
                inputClass: "selectize-input text",
                create: !0
            });
            this.$businessStateInput[0].selectize.addOption(this.states);
            this.$businessStateInput[0].selectize.refreshOptions(!1);
            this.addListener(this.$couponInput, "textchange", {delay: 500}, "applyCoupon");
            this.addListener(this.$checkoutForm, "submit", "submitPurchase")
        },
        applyCoupon: function () {
            if (this.applyingCouponCode)this.applyNewCouponCodeAfterDoneLoading = !0; else {
                var a = this.$couponInput.val();
                a ? (a = {
                    edition: this.edition,
                    couponCode: a
                }, this.applyingCouponCode = !0, this.$couponSpinner.removeClass("hidden"), Craft.postActionRequest("app/getCouponPrice", a, c.proxy(function (a, c) {
                    this.applyingCouponCode = !1;
                    this.applyNewCouponCodeAfterDoneLoading ? (this.applyNewCouponCodeAfterDoneLoading = !1, this.applyCoupon()) : (this.$couponSpinner.addClass("hidden"), "success" == c && a.success && (this.couponPrice = a.couponPrice, this.formattedCouponPrice = a.formattedCouponPrice, this.updateCheckoutUi()))
                }, this))) : (this.couponPrice = null, this.updateCheckoutUi())
            }
        },
        onHide: function () {
            this.initializedCheckoutForm && (this.$businessCountryInput[0].selectize.blur(), this.$businessStateInput[0].selectize.blur());
            this.clearCheckoutFormInABit();
            this.base()
        },
        onBuyBtnClick: function (a) {
            this.edition = c(a.currentTarget).data("edition");
            this.formattedCouponPrice = this.couponPrice = null;
            switch (this.edition) {
                case 1:
                    this.$checkoutLogo.attr("class", "logo craftclient").text("Client");
                    break;
                case 2:
                    this.$checkoutLogo.attr("class", "logo craftpro").text("Pro")
            }
            this.updateCheckoutUi();
            this.clearCheckoutFormTimeout && clearTimeout(this.clearCheckoutFormTimeout);
            a = this.getWidth();
            this.$compareScreen.velocity("stop").animateLeft(-a, "fast", c.proxy(function () {
                this.$compareScreen.addClass("hidden");
                this.initializedCheckoutForm || (this.initializeCheckoutForm(), this.initializedCheckoutForm = !0)
            }, this));
            this.$checkoutScreen.velocity("stop").css(Craft.left, a).removeClass("hidden").animateLeft(0, "fast")
        },
        updateCheckoutUi: function () {
            0 == this.getPrice() ? this.$ccField.hide() : this.$ccField.show();
            this.$checkoutSubmitBtn.val(Craft.t("Pay {price}", {price: this.getFormattedPrice()}))
        },
        getPrice: function () {
            return null !== this.couponPrice ? this.couponPrice : this.editions[this.edition].salePrice ? this.editions[this.edition].salePrice :
                this.editions[this.edition].price
        },
        getFormattedPrice: function () {
            return null !== this.couponPrice ? this.formattedCouponPrice : this.editions[this.edition].salePrice ? this.editions[this.edition].formattedSalePrice : this.editions[this.edition].formattedPrice
        },
        onTestBtnClick: function (a) {
            a = {edition: c(a.currentTarget).data("edition")};
            Craft.postActionRequest("app/testUpgrade", a, c.proxy(function (a, d) {
                if ("success" == d) {
                    var e = this.getWidth();
                    this.$compareScreen.velocity("stop").animateLeft(-e, "fast", c.proxy(function () {
                            this.$compareScreen.addClass("hidden")
                        },
                        this));
                    this.onUpgrade()
                }
            }, this))
        },
        cancelCheckout: function () {
            var a = this.getWidth();
            this.$compareScreen.velocity("stop").removeClass("hidden").animateLeft(0, "fast");
            this.$checkoutScreen.velocity("stop").animateLeft(a, "fast", c.proxy(function () {
                this.$checkoutScreen.addClass("hidden")
            }, this));
            this.clearCheckoutFormInABit()
        },
        getExpiryValues: function () {
            return this.$ccExpInput.payment("cardExpiryVal")
        },
        submitPurchase: function (a) {
            a.preventDefault();
            if (!this.submittingPurchase) {
                this.cleanupCheckoutForm();
                var b =
                    this.getPrice();
                a = this.getExpiryValues();
                a = {
                    name: this.$customerNameInput.val(),
                    number: this.$ccNumInput.val(),
                    exp_month: a.month,
                    exp_year: a.year,
                    cvc: this.$ccCvcInput.val()
                };
                var d = !0;
                a.name || (d = !1, this.$customerNameInput.addClass("error"));
                0 != b && (Stripe.validateCardNumber(a.number) || (d = !1, this.$ccNumInput.addClass("error")), Stripe.validateExpiry(a.exp_month, a.exp_year) || (d = !1, this.$ccExpInput.addClass("error")), Stripe.validateCVC(a.cvc) || (d = !1, this.$ccCvcInput.addClass("error")));
                d ? (this.submittingPurchase = !0, this.$checkoutSubmitBtn.addClass("active"), this.$checkoutSpinner.removeClass("hidden"), 0 != b ? (Stripe.setPublishableKey(this.stripePublicKey), Stripe.createToken(a, c.proxy(function (a, c) {
                    c.error ? (this.onPurchaseResponse(), this.showError(c.error.message), Garnish.shake(this.$checkoutForm, "left")) : this.sendPurchaseRequest(b, c.id)
                }, this))) : this.sendPurchaseRequest(0, null)) : Garnish.shake(this.$checkoutForm, "left")
            }
        },
        sendPurchaseRequest: function (a, b) {
            var d = 0 != a ? this.getExpiryValues() : {month: null, year: null},
                d = {
                    ccTokenId: b,
                    expMonth: d.month,
                    expYear: d.year,
                    edition: this.edition,
                    expectedPrice: a,
                    name: this.$customerNameInput.val(),
                    email: this.$customerEmailInput.val(),
                    businessName: this.$businessNameInput.val(),
                    businessAddress1: this.$businessAddress1Input.val(),
                    businessAddress2: this.$businessAddress2Input.val(),
                    businessCity: this.$businessCityInput.val(),
                    businessState: this.$businessStateInput.val(),
                    businessCountry: this.$businessCountryInput.val(),
                    businessZip: this.$businessZipInput.val(),
                    businessTaxId: this.$businessTaxIdInput.val(),
                    purchaseNotes: this.$purchaseNotesInput.val(),
                    couponCode: this.$couponInput.val()
                };
            Craft.postActionRequest("app/purchaseUpgrade", d, c.proxy(this, "onPurchaseUpgrade"))
        },
        onPurchaseResponse: function () {
            this.submittingPurchase = !1;
            this.$checkoutSubmitBtn.removeClass("active");
            this.$checkoutSpinner.addClass("hidden")
        },
        onPurchaseUpgrade: function (a, b) {
            this.onPurchaseResponse();
            if ("success" == b)if (a.success) {
                var d = this.getWidth();
                this.$checkoutScreen.velocity("stop").animateLeft(-d, "fast", c.proxy(function () {
                        this.$checkoutScreen.addClass("hidden")
                    },
                    this));
                this.onUpgrade()
            } else {
                if (a.errors) {
                    var d = "", e;
                    for (e in a.errors)d && (d += "<br>"), d += a.errors[e];
                    this.showError(d)
                } else d = Craft.t("An unknown error occurred.");
                Garnish.shake(this.$checkoutForm, "left")
            }
        },
        showError: function (a) {
            this.$checkoutFormError = c('<p class="error centeralign">' + a + "</p>").insertBefore(this.$checkoutSecure)
        },
        onUpgrade: function () {
            this.$successScreen.css(Craft.left, this.getWidth()).removeClass("hidden").animateLeft(0, "fast");
            var a = this.$successScreen.find(".btn:first");
            this.addListener(a,
                "click", function () {
                    location.reload()
                });
            this.trigger("upgrade")
        },
        cleanupCheckoutForm: function () {
            this.$checkoutForm.find(".error").removeClass("error");
            this.$checkoutFormError && (this.$checkoutFormError.remove(), this.$checkoutFormError = null)
        },
        clearCheckoutForm: function () {
            this.$customerNameInput.val("");
            this.$customerEmailInput.val("");
            this.$ccNumInput.val("");
            this.$ccExpInput.val("");
            this.$ccCvcInput.val("");
            this.$businessNameInput.val("");
            this.$businessAddress1Input.val("");
            this.$businessAddress2Input.val("");
            this.$businessCityInput.val("");
            this.$businessStateInput.val("");
            this.$businessCountryInput.val("");
            this.$businessZipInput.val("");
            this.$businessTaxIdInput.val("");
            this.$purchaseNotesInput.val("");
            this.$couponInput.val("")
        },
        clearCheckoutFormInABit: function () {
            this.clearCheckoutFormTimeout = setTimeout(c.proxy(this, "clearCheckoutForm"), Craft.UpgradeModal.clearCheckoutFormTimeoutDuration)
        }
    }, {clearCheckoutFormTimeoutDuration: 3E4});
    Craft.Uploader = Garnish.Base.extend({
        uploader: null,
        allowedKinds: null,
        $element: null,
        settings: null,
        _rejectedFiles: {},
        _extensionList: null,
        _totalFileCounter: 0,
        _validFileCounter: 0,
        init: function (a, b) {
            this._rejectedFiles = {size: [], type: [], limit: []};
            this.$element = a;
            this._extensionList = this.allowedKinds = null;
            this._validFileCounter = this._totalFileCounter = 0;
            b = c.extend({}, Craft.Uploader.defaults, b);
            var d = b.events;
            delete b.events;
            b.allowedKinds && b.allowedKinds.length && ("string" == typeof b.allowedKinds && (b.allowedKinds = [b.allowedKinds]), this.allowedKinds = b.allowedKinds, delete b.allowedKinds);
            b.autoUpload = !1;
            this.uploader = this.$element.fileupload(b);
            for (var e in d)this.uploader.on(e, d[e]);
            this.settings = b;
            this.uploader.on("fileuploadadd", c.proxy(this, "onFileAdd"))
        },
        setParams: function (a) {
            "undefined" !== typeof Craft.csrfTokenName && "undefined" !== typeof Craft.csrfTokenValue && (a[Craft.csrfTokenName] = Craft.csrfTokenValue);
            this.uploader.fileupload("option", {formData: a})
        },
        getInProgress: function () {
            return this.uploader.fileupload("active")
        },
        isLastUpload: function () {
            return 2 > this.getInProgress()
        },
        onFileAdd: function (a,
                             b) {
            a.stopPropagation();
            var d = !1;
            this.allowedKinds && (this._extensionList || this._createExtensionList(), d = !0);
            b.process().done(c.proxy(function () {
                var a = b.files[0], f = !0;
                if (d) {
                    var g = a.name.match(/\.([a-z0-4_]+)$/i)[1];
                    -1 == c.inArray(g.toLowerCase(), this._extensionList) && (f = !1, this._rejectedFiles.type.push("\u201c" + a.name + "\u201d"))
                }
                a.size > this.settings.maxFileSize && (this._rejectedFiles.size.push("\u201c" + a.name + "\u201d"), f = !1);
                f && "function" == typeof this.settings.canAddMoreFiles && !this.settings.canAddMoreFiles(this._validFileCounter) &&
                (this._rejectedFiles.limit.push("\u201c" + a.name + "\u201d"), f = !1);
                f && (this._validFileCounter++, b.submit());
                ++this._totalFileCounter == b.originalFiles.length && (this._validFileCounter = this._totalFileCounter = 0, this.processErrorMessages())
            }, this));
            return !0
        },
        processErrorMessages: function () {
            if (this._rejectedFiles.type.length) {
                var a = 1 == this._rejectedFiles.type.length ? "The file {files} could not be uploaded. The allowed file kinds are: {kinds}." : "The files {files} could not be uploaded. The allowed file kinds are: {kinds}.",
                    a = Craft.t(a, {files: this._rejectedFiles.type.join(", "), kinds: this.allowedKinds.join(", ")});
                this._rejectedFiles.type = [];
                alert(a)
            }
            this._rejectedFiles.size.length && (a = 1 == this._rejectedFiles.size.length ? "The file {files} could not be uploaded, because it exceeds the maximum upload size of {size}." : "The files {files} could not be uploaded, because they exceeded the maximum upload size of {size}.", a = Craft.t(a, {
                files: this._rejectedFiles.size.join(", "),
                size: this.humanFileSize(Craft.maxUploadSize)
            }), this._rejectedFiles.size =
                [], alert(a));
            this._rejectedFiles.limit.length && (a = 1 == this._rejectedFiles.limit.length ? "The file {files} could not be uploaded, because the field limit has been reached." : "The files {files} could not be uploaded, because the field limit has been reached.", a = Craft.t(a, {files: this._rejectedFiles.limit.join(", ")}), this._rejectedFiles.limit = [], alert(a))
        },
        humanFileSize: function (a, b) {
            if (1024 > a)return a + " B";
            var c = -1;
            do a /= 1024, ++c; while (1024 <= a);
            return a.toFixed(1) + " " + "kB MB GB TB PB EB ZB YB".split(" ")[c]
        },
        _createExtensionList: function () {
            this._extensionList = [];
            for (var a = 0; a < this.allowedKinds.length; a++) {
                var b = this.allowedKinds[a];
                if ("undefined" !== typeof Craft.fileKinds[b])for (var c = 0; c < Craft.fileKinds[b].extensions.length; c++)this._extensionList.push(Craft.fileKinds[b].extensions[c])
            }
        },
        destroy: function () {
            this.$element.fileupload("destroy");
            this.base()
        }
    }, {
        defaults: {
            dropZone: null,
            pasteZone: null,
            fileInput: null,
            sequentialUploads: !0,
            maxFileSize: Craft.maxUploadSize,
            allowedKinds: null,
            events: {},
            canAddMoreFiles: null
        }
    })
})(jQuery);

//# sourceMappingURL=craft.min.map
