/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (b) {
    Craft.Locales = Garnish.Base.extend({
        $addLocaleField: null,
        $addLocaleInput: null,
        $addLocaleSpinner: null,
        $resultsSheet: null,
        $resultsList: null,
        $activeLocale: null,
        locales: null,
        selectedLocales: null,
        adminTable: null,
        inputVal: null,
        showingResultsSheet: !1,
        init: function (a, c) {
            this.locales = {};
            for (var d in a)this.locales[d] = {
                name: a[d],
                words: Craft.asciiString(d + " " + a[d]).match(Craft.Locales.wordRegex)
            };
            this.selectedLocales = c;
            this.$addLocaleField = b("#addlocale");
            this.$addLocaleInput = b("#addlocaleinput");
            this.$addLocaleSpinner = this.$addLocaleField.find(".spinner");
            this.adminTable = new k(this);
            this.addListener(this.$addLocaleInput, "keydown", "onKeyDown");
            this.addListener(this.$addLocaleInput, "focus", "onFocus");
            this.addListener(this.$addLocaleInput, "blur", "onBlur")
        },
        onKeyDown: function (a) {
            switch (a.keyCode) {
                case Garnish.ESC_KEY:
                    this.$addLocaleInput.val("");
                    this.hideResultsSheet();
                    return;
                case Garnish.RETURN_KEY:
                    a.preventDefault();
                    this.addSelectedLocale();
                    return;
                case Garnish.UP_KEY:
                    this.setRelativeActiveLocale("prev");
                    return;
                case Garnish.DOWN_KEY:
                    this.setRelativeActiveLocale("next");
                    return
            }
            setTimeout(b.proxy(this, "checkInputVal"), 1)
        },
        onFocus: function () {
            this.inputVal && this.showResultsSheet()
        },
        onBlur: function () {
            this.hideResultsSheet()
        },
        setRelativeActiveLocale: function (a) {
            this.$activeLocale && (a = this.$activeLocale.parent()[a]().children("a"), a.length && (this.$activeLocale.removeClass("hover"), a.addClass("hover"), this.$activeLocale = a))
        },
        checkInputVal: function () {
            if (this.inputVal !== (this.inputVal = this.$addLocaleInput.val())) {
                var a =
                    this.findMatchingLocales();
                if (a.length) {
                    a = a.sort(function (a, c) {
                        return a.length - c.length
                    });
                    this.showResultsSheet();
                    this.$resultsList.html("");
                    for (var c = 0; c < a.length; c++) {
                        var d = this.locales[a[c]], f = b("<li/>").appendTo(this.$resultsList), d = b('<a data-id="' + a[c] + '">' + d.name + " (" + a[c] + ")</a>").appendTo(f);
                        0 == c && (d.addClass("hover"), this.$activeLocale = d)
                    }
                } else this.hideResultsSheet(), this.$activeLocale = null
            }
        },
        findMatchingLocales: function () {
            var a = [], c = Craft.asciiString(this.inputVal).match(Craft.Locales.wordRegex);
            if (c) {
                for (var d = [], b = 0; b < c.length; b++)d.push(RegExp("^" + c[b], "i"));
                for (var e in this.locales)if (!Craft.inArray(e, this.selectedLocales)) {
                    c = !0;
                    for (b = 0; b < d.length; b++) {
                        for (var g = !1, h = 0; h < this.locales[e].words.length; h++)if (-1 != this.locales[e].words[h].search(d[b])) {
                            g = !0;
                            break
                        }
                        if (!g) {
                            c = !1;
                            break
                        }
                    }
                    c && a.push(e)
                }
            }
            return a
        },
        showResultsSheet: function () {
            this.showingResultsSheet || (this.$resultsSheet || (this.$resultsSheet = b('<div id="addlocaleresults" class="menu" style="position: relative;"/>').appendTo(this.$addLocaleField),
                this.$resultsList = b("<ul/>").appendTo(this.$resultsSheet), this.addListener(this.$resultsList, "mousedown", "addSelectedLocale")), this.$resultsSheet.show(), this.showingResultsSheet = !0)
        },
        hideResultsSheet: function () {
            this.showingResultsSheet && (this.$resultsSheet.hide(), this.showingResultsSheet = !1)
        },
        addSelectedLocale: function (a) {
            if (a)a = b(a.target); else {
                if (!this.$activeLocale)return;
                a = this.$activeLocale
            }
            this.hideResultsSheet();
            this.$addLocaleInput.val(this.$activeLocale.text()).prop("disabled", !0);
            this.$addLocaleSpinner.removeClass("hidden");
            var c = a.attr("data-id");
            Craft.postActionRequest("localization/addLocale", {id: c}, b.proxy(function (a, f) {
                this.$addLocaleSpinner.addClass("hidden");
                if ("success" == f)if (a.success) {
                    var e = b('<tr data-id="' + c + '" data-name="' + this.locales[c].name + '"><th scope="row" data-title="' + Craft.t("Name") + '" width="40%">' + this.locales[c].name + '</th><td data-title="' + Craft.t("Locale ID") + '">' + c + '</td><td class="thin"><a class="move icon" title="' + Craft.t("Reorder") + '"></a></td><td class="thin"><a class="delete icon" title="' +
                        Craft.t("Delete") + '"></a></td></tr>');
                    this.adminTable.addRow(e);
                    this.selectedLocales.push(c);
                    this.$addLocaleInput.val("").prop("disabled", !1).trigger("keydown");
                    this.checkInputVal();
                    Craft.cp.displayNotice(Craft.t("New locale added."));
                    Craft.cp.runPendingTasks()
                } else Craft.cp.displayError(Craft.t("Unable to add the new locale."))
            }, this))
        }
    }, {wordRegex: /[a-zA-Z]+/g});
    var k = Craft.AdminTable.extend({
        manager: null,
        confirmDeleteModal: null,
        $rowToDelete: null,
        $deleteActionRadios: null,
        $deleteSubmitBtn: null,
        $deleteSpinner: null,
        _deleting: !1,
        init: function (a) {
            this.manager = a;
            this.base({
                tableSelector: "#locales",
                sortable: !0,
                minObjects: 1,
                reorderAction: "localization/reorderLocales",
                deleteAction: "localization/deleteLocale"
            })
        },
        confirmDeleteObject: function (a) {
            this.confirmDeleteModal && (this.confirmDeleteModal.destroy(), delete this.confirmDeleteModal);
            this._createConfirmDeleteModal(a);
            Garnish.isMobileBrowser(!0) || setTimeout(b.proxy(function () {
                this.$deleteActionRadios.first().focus()
            }, this), 100);
            return !1
        },
        onDeleteObject: function (a) {
            var c =
                b.inArray(a, this.manager.selectedLocales);
            -1 != c && this.manager.selectedLocales.splice(c, 1);
            this.base(a)
        },
        validateDeleteInputs: function () {
            var a = this.$deleteActionRadios.eq(0).prop("checked") || this.$deleteActionRadios.eq(1).prop("checked");
            a ? this.$deleteSubmitBtn.removeClass("disabled") : this.$deleteSubmitBtn.addClass("disabled");
            return a
        },
        submitDeleteLocale: function (a) {
            a.preventDefault();
            !this._deleting && this.validateDeleteInputs() && (this.$deleteSubmitBtn.addClass("active"), this.$deleteSpinner.removeClass("hidden"),
                this.disable(), this._deleting = !0, a = {id: this.getObjectId(this.$rowToDelete)}, this.$deleteActionRadios.eq(0).prop("checked") && (a.transferContentTo = this.$transferSelect.val()), Craft.postActionRequest(this.settings.deleteAction, a, b.proxy(function (a, b) {
                "success" == b && (this._deleting = !1, this.enable(), this.confirmDeleteModal.hide(), this.handleDeleteObjectResponse(a, this.$rowToDelete))
            }, this)))
        },
        _createConfirmDeleteModal: function (a) {
            this.$rowToDelete = a;
            var c = this.getObjectId(a), d = this.getObjectName(a);
            a = b('<form id="confirmdeletemodal" class="modal fitted" method="post" accept-charset="UTF-8">' +
                Craft.getCsrfInput() + '<input type="hidden" name="action" value="localization/deleteLocale"/><input type="hidden" name="id" value="' + c + '"/></form>').appendTo(Garnish.$bod);
            var f = b('<div class="body"><p>' + Craft.t("What do you want to do with any content that is only available in {language}?", {language: d}) + '</p><div class="options"><label><input type="radio" name="contentAction" value="transfer"/> ' + Craft.t("Transfer it to:") + '</label><div id="transferselect" class="select"><select/></div></div><div><label><input type="radio" name="contentAction" value="delete"/> ' +
                Craft.t("Delete it") + "</label></div></div>").appendTo(a), e = b('<div class="buttons right"/>').appendTo(f), g = b('<div class="btn">' + Craft.t("Cancel") + "</div>").appendTo(e);
            this.$deleteActionRadios = f.find("input[type=radio]");
            this.$transferSelect = b("#transferselect > select");
            this.$deleteSubmitBtn = b('<input type="submit" class="btn submit disabled" value="' + Craft.t("Delete {language}", {language: d}) + '" />').appendTo(e);
            this.$deleteSpinner = b('<div class="spinner hidden"/>').appendTo(e);
            for (d = 0; d < this.manager.selectedLocales.length; d++)this.manager.selectedLocales[d] !=
            c && this.$transferSelect.append('<option value="' + this.manager.selectedLocales[d] + '">' + this.manager.locales[this.manager.selectedLocales[d]].name + "</option>");
            this.confirmDeleteModal = new Garnish.Modal(a);
            this.addListener(g, "click", function () {
                this.confirmDeleteModal.hide()
            });
            this.addListener(this.$deleteActionRadios, "change", "validateDeleteInputs");
            this.addListener(a, "submit", "submitDeleteLocale")
        }
    })
})(jQuery);

//# sourceMappingURL=locales.min.map
