/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (a) {
    var s = a(".s3-key-id"), t = a(".s3-secret-key");
    $s3BucketSelect = a(".s3-bucket-select > select");
    $s3RefreshBucketsBtn = a(".s3-refresh-buckets");
    $s3RefreshBucketsSpinner = $s3RefreshBucketsBtn.parent().next().children();
    $s3UrlPrefixInput = a(".s3-url-prefix");
    $s3BucketLocationInput = a(".s3-bucket-location");
    refreshingS3Buckets = !1;
    $s3RefreshBucketsBtn.click(function () {
        if (!$s3RefreshBucketsBtn.hasClass("disabled")) {
            $s3RefreshBucketsBtn.addClass("disabled");
            $s3RefreshBucketsSpinner.removeClass("hidden");
            var a = {keyId: s.val(), secret: t.val()};
            Craft.postActionRequest("assetSources/getS3Buckets", a, function (b, a) {
                $s3RefreshBucketsBtn.removeClass("disabled");
                $s3RefreshBucketsSpinner.addClass("hidden");
                if ("success" == a)if (b.error)alert(b.error); else if (0 < b.length) {
                    var d = $s3BucketSelect.val(), e = !1;
                    refreshingS3Buckets = !0;
                    $s3BucketSelect.prop("readonly", !1).empty();
                    for (var c = 0; c < b.length; c++)b[c].bucket == d && (e = !0), $s3BucketSelect.append('<option value="' + b[c].bucket + '" data-url-prefix="' + b[c].urlPrefix + '" data-location="' +
                        b[c].location + '">' + b[c].bucket + "</option>");
                    e && $s3BucketSelect.val(d);
                    refreshingS3Buckets = !1;
                    e || $s3BucketSelect.trigger("change")
                }
            })
        }
    });
    $s3BucketSelect.change(function () {
        if (!refreshingS3Buckets) {
            var a = $s3BucketSelect.children("option:selected");
            $s3UrlPrefixInput.val(a.data("url-prefix"));
            $s3BucketLocationInput.val(a.data("location"))
        }
    });
    var n = a(".rackspace-username"), p = a(".racskspace-api-key"), g = a(".rackspace-region-select > select"), h = a(".rackspace-refresh-regions"), q = h.parent().next().children(),
        f = a(".rackspace-container-select > select"), k = a(".rackspace-refresh-containers"), r = k.parent().next().children(), u = a(".rackspace-url-prefix"), l = !1;
    h.click(function () {
        if (!h.hasClass("disabled")) {
            h.addClass("disabled");
            q.removeClass("hidden");
            var a = {username: n.val(), apiKey: p.val()};
            Craft.postActionRequest("assetSources/getRackspaceRegions", a, function (b, a) {
                h.removeClass("disabled");
                q.addClass("hidden");
                if ("success" == a)if (b.error)alert(b.error); else if (0 < b.length) {
                    var d = g.val(), e = !1;
                    g.prop("readonly",
                        !1).empty();
                    for (var c = 0; c < b.length; c++)b[c] == d && (e = !0), g.append('<option value="' + b[c] + '">' + b[c] + "</option>");
                    e && g.val(d)
                }
            })
        }
    });
    k.click(function () {
        if ("-" == g.val())alert(Craft.t("Select a region first!")); else if (!k.hasClass("disabled")) {
            k.addClass("disabled");
            r.removeClass("hidden");
            var a = {username: n.val(), apiKey: p.val(), region: g.val()};
            Craft.postActionRequest("assetSources/getRackspaceContainers", a, function (b, a) {
                k.removeClass("disabled");
                r.addClass("hidden");
                if ("success" == a)if (b.error)alert(b.error);
                else if (0 < b.length) {
                    var d = f.val(), e = !1;
                    l = !0;
                    f.prop("readonly", !1).empty();
                    for (var c = 0; c < b.length; c++)b[c].container == d && (e = !0), f.append('<option value="' + b[c].container + '" data-urlprefix="' + b[c].urlPrefix + '">' + b[c].container + "</option>");
                    e && f.val(d);
                    l = !1;
                    e || f.trigger("change")
                }
            })
        }
    });
    f.change(function () {
        if (!l) {
            var a = f.children("option:selected");
            u.val(a.data("urlprefix"))
        }
    });
    var v = a(".google-key-id"), w = a(".google-secret-key");
    $googleBucketSelect = a(".google-bucket-select > select");
    $googleRefreshBucketsBtn =
        a(".google-refresh-buckets");
    $googleRefreshBucketsSpinner = $googleRefreshBucketsBtn.parent().next().children();
    $googleUrlPrefixInput = a(".google-url-prefix");
    refreshingGoogleBuckets = !1;
    $googleRefreshBucketsBtn.click(function () {
        if (!$googleRefreshBucketsBtn.hasClass("disabled")) {
            $googleRefreshBucketsBtn.addClass("disabled");
            $googleRefreshBucketsSpinner.removeClass("hidden");
            var a = {keyId: v.val(), secret: w.val()};
            Craft.postActionRequest("assetSources/getGoogleCloudBuckets", a, function (a, d) {
                $googleRefreshBucketsBtn.removeClass("disabled");
                $googleRefreshBucketsSpinner.addClass("hidden");
                if ("success" == d)if (a.error)alert(a.error); else if (0 < a.length) {
                    var f = $googleBucketSelect.val(), e = !1;
                    refreshingGoogleBuckets = !0;
                    $googleBucketSelect.prop("readonly", !1).empty();
                    for (var c = 0; c < a.length; c++)a[c].bucket == f && (e = !0), $googleBucketSelect.append('<option value="' + a[c].bucket + '" data-url-prefix="' + a[c].urlPrefix + '">' + a[c].bucket + "</option>");
                    e && $googleBucketSelect.val(f);
                    refreshingGoogleBuckets = !1;
                    e || $googleBucketSelect.trigger("change")
                }
            })
        }
    });
    $googleBucketSelect.change(function () {
        if (!refreshingGoogleBuckets) {
            var a =
                $googleBucketSelect.children("option:selected");
            $googleUrlPrefixInput.val(a.data("url-prefix"))
        }
    });
    var m = function () {
        var d = a(this).parents(".field"), b = d.find(".expires-amount").val(), f = d.find(".expires-period select").val(), b = 0 == parseInt(b, 10) || 0 == f.length ? "" : b + f;
        d.find("[type=hidden]").val(b)
    };
    a(".expires-amount").keyup(m).change(m);
    a(".expires-period select").change(m)
})(jQuery);

//# sourceMappingURL=asseteditsourcesettings.min.map
