Ext.define("TM.view.Tape", {
    extend: "Ext.container.Container",
    alias: "widget.tm_container",
    xtype: "tm_container",
    /**
     * Ilosc buttonów na taśmie
     */
    tmValue: "",
    initComponent: function() {
        var Tape = this;

        Tape.container = Ext.create({
            xtype: "container",
            layout: {
                type: "hbox",
                align: "stretch"
            },
            items: []
        });
        if (Tape.tmValue) {
            for (var i = 0; i < Tape.tmValue.length; i++) {
                var tapeBtn = Ext.create({
                    xtype: "button",
                    text: Tape.tmValue.charAt(i),
                    style: {
                        backgroundColor: "blue"
                    },
                    amISelected: false
                });
                Tape.container.insert(i, tapeBtn);
            }
        }

        Tape.items = [Tape.container];
        Tape.callParent(arguments);
    }
});