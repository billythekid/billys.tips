/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
 */
(function (d) {
    Craft.TableFieldSettings = Garnish.Base.extend({
        columnsTableName: null,
        defaultsTableName: null,
        columnsTableId: null,
        defaultsTableId: null,
        columnsTableInputPath: null,
        defaultsTableInputPath: null,
        defaults: null,
        columnSettings: null,
        columnsTable: null,
        defaultsTable: null,
        init: function (a, c, b, e, f) {
            this.columnsTableName = a;
            this.defaultsTableName = c;
            this.columnsTableId = Craft.formatInputId(this.columnsTableName);
            this.defaultsTableId = Craft.formatInputId(this.defaultsTableName);
            this.columnsTableInputPath = this.columnsTableId.split("-");
            this.defaultsTableInputPath = this.defaultsTableId.split("-");
            this.defaults = e;
            this.columnSettings = f;
            this.initColumnsTable();
            this.initDefaultsTable(b)
        },
        initColumnsTable: function () {
            this.columnsTable = new Craft.EditableTable(this.columnsTableId, this.columnsTableName, this.columnSettings, {
                rowIdPrefix: "col",
                onAddRow: d.proxy(this, "onAddColumn"),
                onDeleteRow: d.proxy(this, "reconstructDefaultsTable")
            });
            this.initColumnSettingInputs(this.columnsTable.$tbody);
            this.columnsTable.sorter.settings.onSortChange = d.proxy(this,
                "reconstructDefaultsTable")
        },
        initDefaultsTable: function (a) {
            this.defaultsTable = new Craft.EditableTable(this.defaultsTableId, this.defaultsTableName, a, {rowIdPrefix: "row"})
        },
        onAddColumn: function (a) {
            this.reconstructDefaultsTable();
            this.initColumnSettingInputs(a)
        },
        initColumnSettingInputs: function (a) {
            var c = a.find("td:first-child textarea, td:nth-child(3) textarea");
            a = a.find("td:nth-child(4) select");
            this.addListener(c, "textchange", "reconstructDefaultsTable");
            this.addListener(a, "change", "reconstructDefaultsTable")
        },
        reconstructDefaultsTable: function () {
            for (var a = Craft.expandPostArray(Garnish.getPostData(this.columnsTable.$tbody)), c = Craft.expandPostArray(Garnish.getPostData(this.defaultsTable.$tbody)), b = 0; b < this.columnsTableInputPath.length; b++)var e = this.columnsTableInputPath[b], a = a[e];
            for (b = 0; b < this.defaultsTableInputPath.length; b++)e = this.defaultsTableInputPath[b], c = c[e];
            var b = '<table id="' + this.defaultsTableId + '" class="editable shadow-box"><thead><tr>', f;
            for (f in a)b += '<th scope="col" class="header">' + (a[f].heading ?
                    a[f].heading : "&nbsp;") + "</th>";
            var b = b + '<th class="header" colspan="2"></th></tr></thead><tbody>', d;
            for (d in c)b += Craft.EditableTable.getRowHtml(d, a, this.defaultsTableName, c[d]);
            this.defaultsTable.$table.replaceWith(b + "</tbody></table>");
            this.defaultsTable.destroy();
            delete this.defaultsTable;
            this.initDefaultsTable(a)
        }
    })
})(jQuery);

//# sourceMappingURL=TableFieldSettings.min.map
