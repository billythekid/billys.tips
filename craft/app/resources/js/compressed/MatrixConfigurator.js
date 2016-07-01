/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (b) {
    Craft.MatrixConfigurator = Garnish.Base.extend({
        fieldTypeInfo: null,
        inputNamePrefix: null,
        inputIdPrefix: null,
        $container: null,
        $blockTypesColumnContainer: null,
        $fieldsColumnContainer: null,
        $fieldSettingsColumnContainer: null,
        $blockTypeItemsOuterContainer: null,
        $blockTypeItemsContainer: null,
        $fieldItemsContainer: null,
        $fieldSettingItemsContainer: null,
        $newBlockTypeBtn: null,
        $newFieldBtn: null,
        blockTypes: null,
        selectedBlockType: null,
        blockTypeSort: null,
        totalNewBlockTypes: 0,
        init: function (a, e) {
            this.fieldTypeInfo =
                a;
            this.inputNamePrefix = e;
            this.inputIdPrefix = Craft.formatInputId(this.inputNamePrefix);
            this.$container = b("#" + this.inputIdPrefix + "-matrix-configurator:first .input:first");
            this.$blockTypesColumnContainer = this.$container.children(".block-types").children();
            this.$fieldsColumnContainer = this.$container.children(".fields").children();
            this.$fieldSettingsColumnContainer = this.$container.children(".field-settings").children();
            this.$blockTypeItemsOuterContainer = this.$blockTypesColumnContainer.children(".items");
            this.$blockTypeItemsContainer = this.$blockTypeItemsOuterContainer.children(".blocktypes");
            this.$fieldItemsOuterContainer = this.$fieldsColumnContainer.children(".items");
            this.$fieldSettingItemsContainer = this.$fieldSettingsColumnContainer.children(".items");
            this.setContainerHeight();
            this.$newBlockTypeBtn = this.$blockTypeItemsOuterContainer.children(".btn");
            this.$newFieldBtn = this.$fieldItemsOuterContainer.children(".btn");
            this.blockTypes = {};
            for (var c = this.$blockTypeItemsContainer.children(), d = 0; d < c.length; d++) {
                var f =
                    b(c[d]), g = f.data("id");
                this.blockTypes[g] = new h(this, f);
                (f = "string" == typeof g && g.match(/new(\d+)/)) && f[1] > this.totalNewBlockTypes && (this.totalNewBlockTypes = parseInt(f[1]))
            }
            this.blockTypeSort = new Garnish.DragSort(c, {handle: ".move", axis: "y"});
            this.addListener(this.$newBlockTypeBtn, "click", "addBlockType");
            this.addListener(this.$newFieldBtn, "click", "addFieldToSelectedBlockType");
            this.addListener(this.$blockTypesColumnContainer, "resize", "setContainerHeight");
            this.addListener(this.$fieldsColumnContainer,
                "resize", "setContainerHeight");
            this.addListener(this.$fieldSettingsColumnContainer, "resize", "setContainerHeight")
        },
        setContainerHeight: function () {
            setTimeout(b.proxy(function () {
                var a = Math.max(this.$blockTypesColumnContainer.height(), this.$fieldsColumnContainer.height(), this.$fieldSettingsColumnContainer.height(), 400);
                this.$container.height(a)
            }, this), 1)
        },
        getFieldTypeInfo: function (a) {
            for (var b = 0; b < this.fieldTypeInfo.length; b++)if (this.fieldTypeInfo[b].type == a)return this.fieldTypeInfo[b]
        },
        addBlockType: function () {
            this.getBlockTypeSettingsModal();
            this.blockTypeSettingsModal.show();
            this.blockTypeSettingsModal.onSubmit = b.proxy(function (a, e) {
                this.totalNewBlockTypes++;
                var c = "new" + this.totalNewBlockTypes, d = b('<div class="matrixconfigitem mci-blocktype" data-id="' + c + '"><div class="name"></div><div class="handle code"></div><div class="actions"><a class="move icon" title="' + Craft.t("Reorder") + '"></a><a class="settings icon" title="' + Craft.t("Settings") + '"></a></div><input class="hidden" name="types[Matrix][blockTypes][' + c + '][name]"><input class="hidden" name="types[Matrix][blockTypes][' +
                    c + '][handle]"></div>').appendTo(this.$blockTypeItemsContainer);
                this.blockTypes[c] = new h(this, d);
                this.blockTypes[c].applySettings(a, e);
                this.blockTypes[c].select();
                this.blockTypes[c].addField();
                this.blockTypeSort.addItems(d)
            }, this)
        },
        addFieldToSelectedBlockType: function () {
            this.selectedBlockType && this.selectedBlockType.addField()
        },
        getBlockTypeSettingsModal: function () {
            this.blockTypeSettingsModal || (this.blockTypeSettingsModal = new k);
            return this.blockTypeSettingsModal
        }
    });
    var k = Garnish.Modal.extend({
        init: function () {
            this.base();
            this.$form = b('<form class="modal fitted"/>').appendTo(Garnish.$bod);
            this.setContainer(this.$form);
            this.$body = b('<div class="body"/>').appendTo(this.$form);
            this.$nameField = b('<div class="field"/>').appendTo(this.$body);
            this.$nameHeading = b('<div class="heading"/>').appendTo(this.$nameField);
            this.$nameLabel = b('<label for="new-block-type-name">' + Craft.t("Name") + "</label>").appendTo(this.$nameHeading);
            this.$nameInstructions = b('<div class="instructions"><p>' + Craft.t("What this block type will be called in the CP.") +
                "</p></div>").appendTo(this.$nameHeading);
            this.$nameInputContainer = b('<div class="input"/>').appendTo(this.$nameField);
            this.$nameInput = b('<input type="text" class="text fullwidth" id="new-block-type-name"/>').appendTo(this.$nameInputContainer);
            this.$nameErrorList = b('<ul class="errors"/>').appendTo(this.$nameInputContainer).hide();
            this.$handleField = b('<div class="field"/>').appendTo(this.$body);
            this.$handleHeading = b('<div class="heading"/>').appendTo(this.$handleField);
            this.$handleLabel = b('<label for="new-block-type-handle">' +
                Craft.t("Handle") + "</label>").appendTo(this.$handleHeading);
            this.$handleInstructions = b('<div class="instructions"><p>' + Craft.t("How you\u2019ll refer to this block type in the templates.") + "</p></div>").appendTo(this.$handleHeading);
            this.$handleInputContainer = b('<div class="input"/>').appendTo(this.$handleField);
            this.$handleInput = b('<input type="text" class="text fullwidth code" id="new-block-type-handle"/>').appendTo(this.$handleInputContainer);
            this.$handleErrorList = b('<ul class="errors"/>').appendTo(this.$handleInputContainer).hide();
            this.$deleteBtn = b('<a class="error left hidden" style="line-height: 30px;">' + Craft.t("Delete") + "</a>").appendTo(this.$body);
            this.$buttons = b('<div class="buttons right" style="margin-top: 0;"/>').appendTo(this.$body);
            this.$cancelBtn = b('<div class="btn">' + Craft.t("Cancel") + "</div>").appendTo(this.$buttons);
            this.$submitBtn = b('<input type="submit" class="btn submit"/>').appendTo(this.$buttons);
            this.handleGenerator = new Craft.HandleGenerator(this.$nameInput, this.$handleInput);
            this.addListener(this.$cancelBtn,
                "click", "hide");
            this.addListener(this.$form, "submit", "onFormSubmit");
            this.addListener(this.$deleteBtn, "click", "onDeleteClick")
        }, onFormSubmit: function (a) {
            a.preventDefault();
            if (this.visible) {
                this.handleGenerator.listening && this.handleGenerator.updateTarget();
                a = Craft.trim(this.$nameInput.val());
                var b = Craft.trim(this.$handleInput.val());
                a && b ? (this.hide(), this.onSubmit(a, b)) : Garnish.shake(this.$form)
            }
        }, onDeleteClick: function () {
            confirm(Craft.t("Are you sure you want to delete this block type?")) && (this.hide(),
                this.onDelete())
        }, show: function (a, e, c) {
            this.$nameInput.val("string" == typeof a ? a : "");
            this.$handleInput.val("string" == typeof e ? e : "");
            e ? this.handleGenerator.stopListening() : this.handleGenerator.startListening();
            "undefined" == typeof a ? (this.$deleteBtn.addClass("hidden"), this.$submitBtn.val(Craft.t("Create"))) : (this.$deleteBtn.removeClass("hidden"), this.$submitBtn.val(Craft.t("Save")));
            this.displayErrors("name", c ? c.name : null);
            this.displayErrors("handle", c ? c.handle : null);
            Garnish.isMobileBrowser() || setTimeout(b.proxy(function () {
                    this.$nameInput.focus()
                },
                this), 100);
            this.base()
        }, displayErrors: function (a, e) {
            var c = this["$" + a + "Input"], d = this["$" + a + "ErrorList"];
            d.children().remove();
            if (e)for (c.addClass("error"), d.show(), c = 0; c < e.length; c++)b("<li/>").text(e[c]).appendTo(d); else c.removeClass("error"), d.hide()
        }
    }), h = Garnish.Base.extend({
        configurator: null,
        id: null,
        errors: null,
        inputNamePrefix: null,
        inputIdPrefix: null,
        $item: null,
        $nameLabel: null,
        $handleLabel: null,
        $nameHiddenInput: null,
        $handleHiddenInput: null,
        $settingsBtn: null,
        $fieldItemsContainer: null,
        $fieldSettingsContainer: null,
        fields: null,
        selectedField: null,
        fieldSort: null,
        totalNewFields: 0,
        fieldSettings: null,
        init: function (a, e) {
            this.configurator = a;
            this.$item = e;
            this.id = this.$item.data("id");
            this.errors = this.$item.data("errors");
            this.inputNamePrefix = this.configurator.inputNamePrefix + "[blockTypes][" + this.id + "]";
            this.inputIdPrefix = this.configurator.inputIdPrefix + "-blockTypes-" + this.id;
            this.$nameLabel = this.$item.children(".name");
            this.$handleLabel = this.$item.children(".handle");
            this.$nameHiddenInput = this.$item.find('input[name$="[name]"]:first');
            this.$handleHiddenInput = this.$item.find('input[name$="[handle]"]:first');
            this.$settingsBtn = this.$item.find(".settings");
            this.$fieldItemsContainer = this.configurator.$fieldItemsOuterContainer.children('[data-id="' + this.id + '"]:first');
            this.$fieldItemsContainer.length || (this.$fieldItemsContainer = b('<div data-id="' + this.id + '"/>').insertBefore(this.configurator.$newFieldBtn));
            this.$fieldSettingsContainer = this.configurator.$fieldSettingItemsContainer.children('[data-id="' + this.id + '"]:first');
            this.$fieldSettingsContainer.length ||
            (this.$fieldSettingsContainer = b('<div data-id="' + this.id + '"/>').appendTo(this.configurator.$fieldSettingItemsContainer));
            this.fields = {};
            for (var c = this.$fieldItemsContainer.children(), d = 0; d < c.length; d++) {
                var f = b(c[d]), g = f.data("id");
                this.fields[g] = new Field(this.configurator, this, f);
                (f = "string" == typeof g && g.match(/new(\d+)/)) && f[1] > this.totalNewFields && (this.totalNewFields = parseInt(f[1]))
            }
            this.addListener(this.$item, "click", "select");
            this.addListener(this.$settingsBtn, "click", "showSettings");
            this.fieldSort =
                new Garnish.DragSort(c, {
                    handle: ".move", axis: "y", onSortChange: b.proxy(function () {
                        for (var a = 0; a < this.fieldSort.$items.length; a++) {
                            var c = b(this.fieldSort.$items[a]).data("id");
                            this.fields[c].$fieldSettingsContainer.appendTo(this.$fieldSettingsContainer)
                        }
                    }, this)
                })
        },
        select: function () {
            this.configurator.selectedBlockType != this && (this.configurator.selectedBlockType && this.configurator.selectedBlockType.deselect(), this.configurator.$fieldsColumnContainer.removeClass("hidden").trigger("resize"), this.$fieldItemsContainer.removeClass("hidden"),
                this.$item.addClass("sel"), this.configurator.selectedBlockType = this)
        },
        deselect: function () {
            this.$item.removeClass("sel");
            this.configurator.$fieldsColumnContainer.addClass("hidden").trigger("resize");
            this.$fieldItemsContainer.addClass("hidden");
            this.$fieldSettingsContainer.addClass("hidden");
            this.configurator.selectedBlockType = null;
            this.selectedField && this.selectedField.deselect()
        },
        showSettings: function () {
            var a = this.configurator.getBlockTypeSettingsModal();
            a.show(this.$nameHiddenInput.val(), this.$handleHiddenInput.val(),
                this.errors);
            a.onSubmit = b.proxy(this, "applySettings");
            a.onDelete = b.proxy(this, "selfDestruct")
        },
        applySettings: function (a, b) {
            this.errors && (this.errors = null, this.$settingsBtn.removeClass("error"));
            this.$nameLabel.text(a);
            this.$handleLabel.text(b);
            this.$nameHiddenInput.val(a);
            this.$handleHiddenInput.val(b)
        },
        addField: function () {
            this.totalNewFields++;
            var a = "new" + this.totalNewFields, e = b('<div class="matrixconfigitem mci-field" data-id="' + a + '"><div class="name"><em class="light">' + Craft.t("(blank)") + '</em>&nbsp;</div><div class="handle code">&nbsp;</div><div class="actions"><a class="move icon" title="' +
                Craft.t("Reorder") + '"></a></div></div>').appendTo(this.$fieldItemsContainer);
            this.fields[a] = new Field(this.configurator, this, e);
            this.fields[a].select();
            this.fieldSort.addItems(e)
        },
        selfDestruct: function () {
            this.deselect();
            this.$item.remove();
            this.$fieldItemsContainer.remove();
            this.$fieldSettingsContainer.remove();
            this.configurator.blockTypes[this.id] = null;
            delete this.configurator.blockTypes[this.id]
        }
    });
    Field = Garnish.Base.extend({
        configurator: null,
        blockType: null,
        id: null,
        inputNamePrefix: null,
        inputIdPrefix: null,
        selectedFieldType: null,
        initializedFieldTypeSettings: null,
        $item: null,
        $nameLabel: null,
        $handleLabel: null,
        $fieldSettingsContainer: null,
        $nameInput: null,
        $handleInput: null,
        $requiredCheckbox: null,
        $typeSelect: null,
        $typeSettingsContainer: null,
        $deleteBtn: null,
        init: function (a, e, c) {
            this.configurator = a;
            this.blockType = e;
            this.$item = c;
            this.id = this.$item.data("id");
            this.inputNamePrefix = this.blockType.inputNamePrefix + "[fields][" + this.id + "]";
            this.inputIdPrefix = this.blockType.inputIdPrefix + "-fields-" + this.id;
            this.initializedFieldTypeSettings =
            {};
            this.$nameLabel = this.$item.children(".name");
            this.$handleLabel = this.$item.children(".handle");
            this.$fieldSettingsContainer = this.blockType.$fieldSettingsContainer.children('[data-id="' + this.id + '"]:first');
            if (a = !this.$fieldSettingsContainer.length)this.$fieldSettingsContainer = b(this.getDefaultFieldSettingsHtml()).appendTo(this.blockType.$fieldSettingsContainer);
            this.$nameInput = this.$fieldSettingsContainer.find('input[name$="[name]"]:first');
            this.$handleInput = this.$fieldSettingsContainer.find('input[name$="[handle]"]:first');
            this.$requiredCheckbox = this.$fieldSettingsContainer.find('input[type="checkbox"][name$="[required]"]:first');
            this.$typeSelect = this.$fieldSettingsContainer.find('select[name$="[type]"]:first');
            this.$typeSettingsContainer = this.$fieldSettingsContainer.children(".fieldtype-settings:first");
            this.$deleteBtn = this.$fieldSettingsContainer.children("a.delete:first");
            a ? this.setFieldType("PlainText") : (this.selectedFieldType = this.$typeSelect.val(), this.initializedFieldTypeSettings[this.selectedFieldType] = this.$typeSettingsContainer.children());
            this.$handleInput.val() || new Craft.HandleGenerator(this.$nameInput, this.$handleInput);
            this.addListener(this.$item, "click", "select");
            this.addListener(this.$nameInput, "textchange", "updateNameLabel");
            this.addListener(this.$handleInput, "textchange", "updateHandleLabel");
            this.addListener(this.$requiredCheckbox, "change", "updateRequiredIcon");
            this.addListener(this.$typeSelect, "change", "onTypeSelectChange");
            this.addListener(this.$deleteBtn, "click", "confirmDelete")
        },
        select: function () {
            this.blockType.selectedField !=
            this && (this.blockType.selectedField && this.blockType.selectedField.deselect(), this.configurator.$fieldSettingsColumnContainer.removeClass("hidden").trigger("resize"), this.blockType.$fieldSettingsContainer.removeClass("hidden"), this.$fieldSettingsContainer.removeClass("hidden"), this.$item.addClass("sel"), this.blockType.selectedField = this, Garnish.isMobileBrowser() || setTimeout(b.proxy(function () {
                this.$nameInput.focus()
            }, this), 100))
        },
        deselect: function () {
            this.$item.removeClass("sel");
            this.configurator.$fieldSettingsColumnContainer.addClass("hidden").trigger("resize");
            this.blockType.$fieldSettingsContainer.addClass("hidden");
            this.$fieldSettingsContainer.addClass("hidden");
            this.blockType.selectedField = null
        },
        updateNameLabel: function () {
            var a = this.$nameInput.val();
            this.$nameLabel.html((a ? Craft.escapeHtml(a) : '<em class="light">' + Craft.t("(blank)") + "</em>") + "&nbsp;")
        },
        updateHandleLabel: function () {
            this.$handleLabel.html(Craft.escapeHtml(this.$handleInput.val()) + "&nbsp;")
        },
        updateRequiredIcon: function () {
            this.$requiredCheckbox.prop("checked") ? this.$nameLabel.addClass("required") :
                this.$nameLabel.removeClass("required")
        },
        onTypeSelectChange: function () {
            this.setFieldType(this.$typeSelect.val())
        },
        setFieldType: function (a) {
            this.selectedFieldType && this.initializedFieldTypeSettings[this.selectedFieldType].detach();
            this.selectedFieldType = a;
            this.$typeSelect.val(a);
            var e = "undefined" == typeof this.initializedFieldTypeSettings[a];
            if (e) {
                var c = this.configurator.getFieldTypeInfo(a), d = this.getParsedFieldTypeHtml(c.settingsBodyHtml), c = this.getParsedFieldTypeHtml(c.settingsFootHtml), d = b("<div>" +
                    d + "</div>");
                this.initializedFieldTypeSettings[a] = d
            } else d = this.initializedFieldTypeSettings[a];
            d.appendTo(this.$typeSettingsContainer);
            e && (Craft.initUiElements(d), Garnish.$bod.append(c));
            this.$typeSettingsContainer.trigger("resize")
        },
        getParsedFieldTypeHtml: function (a) {
            "string" == typeof a ? (a = a.replace(/__BLOCK_TYPE__/g, this.blockType.id), a = a.replace(/__FIELD__/g, this.id)) : a = "";
            return a
        },
        getDefaultFieldSettingsHtml: function () {
            var a = '<div data-id="' + this.id + '"><div class="field" id="' + this.inputIdPrefix +
                '-name-field"><div class="heading"><label for="' + this.inputIdPrefix + '-name">' + Craft.t("Name") + '</label></div><div class="input"><input class="text fullwidth" type="text" id="' + this.inputIdPrefix + '-name" name="' + this.inputNamePrefix + '[name]" autofocus="" autocomplete="off"/></div></div><div class="field" id="' + this.inputIdPrefix + '-handle-field"><div class="heading"><label class="required" for="' + this.inputIdPrefix + '-handle">' + Craft.t("Handle") + '</label></div><div class="input"><input class="text fullwidth code" type="text" id="' +
                this.inputIdPrefix + '-handle" name="' + this.inputNamePrefix + '[handle]" autofocus="" autocomplete="off"/></div></div><div class="field" id="' + this.inputIdPrefix + '-instructions-field"><div class="heading"><label for="' + this.inputIdPrefix + '-instructions">' + Craft.t("Instructions") + '</label></div><div class="input"><textarea class="text nicetext fullwidth" rows="2" cols="50" id="' + this.inputIdPrefix + '-instructions" name="' + this.inputNamePrefix + '[instructions]"></textarea></div></div><div class="field checkboxfield"><label><input type="hidden" name="' +
                this.inputNamePrefix + '[required]" value=""/><input type="checkbox" value="1" name="' + this.inputNamePrefix + '[required]"/> ' + Craft.t("This field is required") + "</label></div>";
            Craft.isLocalized && (a += '<div class="field checkboxfield"><label><input type="hidden" name="' + this.inputNamePrefix + '[translatable]" value=""/><input type="checkbox" value="1" name="' + this.inputNamePrefix + '[translatable]"/> ' + Craft.t("This field is translatable") + "</label></div>");
            for (var a = a + ('<hr/><div class="field" id="type-field"><div class="heading"><label for="type">' +
                Craft.t("Field Type") + '</label></div><div class="input"><div class="select"><select id="type" class="fieldtoggle" name="' + this.inputNamePrefix + '[type]">'), b = 0; b < this.configurator.fieldTypeInfo.length; b++)var c = this.configurator.fieldTypeInfo[b], a = a + ('<option value="' + c.type + '"' + ("PlainText" == c.type ? ' selected=""' : "") + ">" + c.name + "</option>");
            return a += '</select></div></div></div><div class="fieldtype-settings"/><hr/><a class="error delete">' + Craft.t("Delete") + "</a></div>"
        },
        confirmDelete: function () {
            confirm(Craft.t("Are you sure you want to delete this field?")) &&
            this.selfDestruct()
        },
        selfDestruct: function () {
            this.deselect();
            this.$item.remove();
            this.$fieldSettingsContainer.remove();
            this.blockType.fields[this.id] = null;
            delete this.blockType.fields[this.id]
        }
    })
})(jQuery);

//# sourceMappingURL=MatrixConfigurator.min.map
