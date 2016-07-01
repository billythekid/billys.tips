/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (c) {
    var f = Garnish.Base.extend({
        messages: null, init: function () {
            this.messages = [];
            for (var a = c("#messages").find(".message"), b = 0; b < a.length; b++) {
                var d = new e(a[b]);
                this.messages.push(d)
            }
        }
    }), e = Garnish.Base.extend({
        $container: null, key: null, $subject: null, $body: null, modal: null, init: function (a) {
            this.$container = c(a);
            this.key = this.$container.attr("data-key");
            this.$subject = this.$container.find(".subject:first");
            this.$body = this.$container.find(".body:first");
            this.addListener(this.$container, "click", "edit")
        },
        edit: function () {
            this.modal ? this.modal.show() : this.modal = new g(this)
        }, updateHtmlFromModal: function () {
            var a = this.modal.$subjectInput.val(), b = this.modal.$bodyInput.val().replace(/\n/g, "<br>");
            this.$subject.html(a);
            this.$body.html(b)
        }
    }), g = Garnish.Modal.extend({
        message: null,
        $localeSelect: null,
        $subjectInput: null,
        $bodyInput: null,
        $saveBtn: null,
        $cancelBtn: null,
        $spinner: null,
        loading: !1,
        init: function (a) {
            this.message = a;
            this.base(null, {resizable: !0});
            this.loadContainer()
        },
        loadContainer: function (a) {
            a = {
                key: this.message.key,
                locale: a
            };
            "undefined" !== typeof Craft.csrfTokenName && "undefined" !== typeof Craft.csrfTokenValue && (a[Craft.csrfTokenName] = Craft.csrfTokenValue);
            c.post(Craft.getUrl("settings/email/_message_modal"), a, c.proxy(function (a, d, h) {
                    "success" == d && (this.$container ? this.$container.html(a) : (a = c('<form class="modal fitted message-settings" accept-charset="UTF-8">' + a + "</form>").appendTo(Garnish.$bod), this.setContainer(a), this.show()), this.$localeSelect = this.$container.find(".locale:first > select"), this.$subjectInput =
                        this.$container.find(".message-subject:first"), this.$bodyInput = this.$container.find(".message-body:first"), this.$saveBtn = this.$container.find(".submit:first"), this.$cancelBtn = this.$container.find(".cancel:first"), this.$spinner = this.$container.find(".spinner:first"), this.addListener(this.$localeSelect, "change", "switchLocale"), this.addListener(this.$container, "submit", "saveMessage"), this.addListener(this.$cancelBtn, "click", "cancel"), setTimeout(c.proxy(function () {
                        this.$subjectInput.focus()
                    }, this), 100))
                },
                this))
        },
        switchLocale: function () {
            var a = this.$localeSelect.val();
            this.loadContainer(a)
        },
        saveMessage: function (a) {
            a.preventDefault();
            if (!this.loading) {
                var b = {
                    key: this.message.key,
                    locale: this.$localeSelect.length ? this.$localeSelect.val() : Craft.locale,
                    subject: this.$subjectInput.val(),
                    body: this.$bodyInput.val()
                };
                this.$subjectInput.removeClass("error");
                this.$bodyInput.removeClass("error");
                b.subject && b.body ? (this.loading = !0, this.$saveBtn.addClass("active"), this.$spinner.show(), Craft.postActionRequest("emailMessages/saveMessage",
                    b, c.proxy(function (a, c) {
                        this.$saveBtn.removeClass("active");
                        this.$spinner.hide();
                        this.loading = !1;
                        "success" == c && (a.success ? (b.locale == Craft.locale && this.message.updateHtmlFromModal(), this.hide(), Craft.cp.displayNotice(Craft.t("Message saved."))) : Craft.cp.displayError())
                    }, this))) : (b.subject || this.$subjectInput.addClass("error"), b.body || this.$bodyInput.addClass("error"), Garnish.shake(this.$container))
            }
        },
        cancel: function () {
            this.hide();
            this.message && (this.message.modal = null)
        }
    });
    new f
})(jQuery);

//# sourceMappingURL=email_messages.min.map
