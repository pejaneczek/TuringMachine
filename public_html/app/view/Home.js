Ext.define("TM.view.Home", {
    extend: "Ext.panel.Panel",
    xtype: "layout-border",
    requires: [
        "Ext.layout.container.Border",
        "Ext.layout.container.Fit",
        "TM.machines.Add",
        "TM.controller.StepController",
        "TM.view.Tape"
    ],
    alias: "widget.home",
    plugins: "viewport",
    layout: "border",
    width: "100%",
    height: 400,
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },
    viewModel: {},
    licz: 0,
    initComponent: function() {
        var Home = this,
            tmValues, viewModel = Home.getViewModel();


        viewModel.set("startButton", true);
        viewModel.set("pauseButton", true);
        viewModel.set("nextStepButton", true);
        viewModel.set("resetButton", true);
        viewModel.set("addButton", false);
        viewModel.set("subButton", true);
        viewModel.set("mulButton", true);
        viewModel.set("divButton", true);

        Home.tapeContainer = Ext.create({
            xtype: "container",
            items: []
        });

        Home.tapePanel = Ext.create({
            xtype: "panel",
            title: "Taśma",
            region: "north",
            height: 100,
            width: "100%",
            layout: {
                type: "hbox",
                align: "stretch"
            },
            items: [{
                xtype: "label",
                flex: 1
            }, Home.tapeContainer, {
                xtype: "label",
                flex: 1
            }]
        });

        Home.firstValue = Ext.create({
            xtype: "textfield",
            fieldLabel: "Liczba 1",
            maskRe: /[0-1]/
        });

        Home.secondValue = Ext.create({
            xtype: "textfield",
            fieldLabel: "Liczba 2",
            maskRe: /[0-1]/
        });

        Home.naviPanel = Ext.create({
            xtype: "panel",
            title: "Menu",
            region: "east",
            floatable: false,
            margin: "5 0 0 0",
            width: 300,
            minWidth: 300,
            maxWidth: 300,
            items: [{
                xtype: "panel",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [{
                    xtype: "button",
                    text: "Start",
                    bind: {
                        disabled: "{startButton}"
                    }
                }, {
                    xtype: "button",
                    text: "Pauza",
                    bind: {
                        disabled: "{pauseButton}"
                    }
                }, {
                    xtype: "button",
                    text: "Następny krok",
                    bind: {
                        disabled: "{nextStepButton}"
                    },
                    handler: function() {
                        var currentSelectedButton, licz, i;
                        var itemsOfTapeContainer = Home.tapeContainer.getChildItemsToDisable();

                        for ( i = 0; i < itemsOfTapeContainer.length; i++) {
                            if (itemsOfTapeContainer[i].amISelected) {
                                currentSelectedButton = itemsOfTapeContainer[i];
                                licz = i;
                                console.log(licz);
                            } else {
                                currentSelectedButton = itemsOfTapeContainer[0];
                            }
                        }
                        Home.licz++;
                        TM.controller.StepController.step(Home.progressPanel, Home.tapeContainer, /*currentSelectedButton*/itemsOfTapeContainer[Home.licz - 1], Home.licz);
                    }
                }, {
                    xtype: "button",
                    text: "Resetuj",
                    bind: {
                        disabled: "{resetButton}"
                    }
                }]
            }, {
                xtype: "label",
                text: "Dane wejściowe"
            }, {
                xtype: "panel",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [Home.firstValue, Home.secondValue]
            }, {
                xtype: "label",
                text: "Wybierz program"
            }, {
                xtype: "panel",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [{
                    xtype: "button",
                    text: "Dodawanie",
                    bind: {
                        disabled: "{addButton}"
                    },
                    handler: function() {
                        var addMachineProgram = TM.machines.Add.getProgram();
                        Home.progressPanelStore.removeAll();
                        if (!Home.firstValue.getValue() || !Home.secondValue.getValue()) {
                            Ext.Msg.show({
                                title: "Komunikat",
                                message: "Proszę uzupełnić dane dane wejściowe.",
                                icon: Ext.Msg.OK
                            });
                        } else {
                            tmValues = "";
                            tmValues = Home.firstValue.getValue() + " " + Home.secondValue.getValue();
                            console.log(tmValues);
                            Home.progressPanelStore.setProxy({
                                type: "memory",
                                data: addMachineProgram,
                                reader: {
                                    type: "json"
                                }
                            });
                            Home.progressPanelStore.load();
                            Home.progressPanel.setSelection(Home.progressPanelStore.data.items[1]);
                            viewModel.set("tmValues", tmValues);
                            viewModel.set("nextStepButton", false);
                            Home.tapeContainer.removeAll();
                            Home.tapeContainer.insert(1, Ext.create({
                                xtype: "tm_container",
                                tmValue: tmValues
                            }));
                            Home.tapeContainer.getChildItemsToDisable()[0].setStyle({
                                background: "orange"
                            });
                            Home.tapeContainer.getChildItemsToDisable()[0].amISelected = true;
                        }
                    }
                }, {
                    xtype: "button",
                    text: "Odejmowanie",
                    bind: {
                        disabled: "{subButton}"
                    }
                }, {
                    xtype: "button",
                    text: "Mnożenie",
                    bind: {
                        disabled: "{mulButton}"
                    }
                }, {
                    xtype: "button",
                    text: "Dzielenie",
                    bind: {
                        disabled: "{divButton}"
                    }
                }]
            }]
        });

        Home.progressPanelStore = new Ext.data.Store({
            fields: [{
                name: "step",
                type: "int"
            }, {
                name: "position",
                type: "string"
            }, {
                name: "instruction",
                type: "string"
            }, {
                name: "goto",
                type: "string"
            }],
            autoLoad: true,
        });

        Home.progressPanel = Ext.create({
            xtype: "grid",
            title: "Program maszyny Turinga",
            store: Home.progressPanelStore,
            collapsible: false,
            region: "center",
            margin: "5 0 0 0",
            flex: 10,
            columns: [{
                text: "",
                flex: 0.1
            }, {
                text: "L.p.",
                dataIndex: "step",
                flex: 1
            }, {
                text: "Pozycja",
                dataIndex: "position",
                flex: 2
            }, {
                text: "Instrukcja",
                flex: 5,
                dataIndex: "instruction"
            }, {
                text: "Idź do",
                flex: 1,
                dataIndex: "goto"
            }]
        });

        Home.items = [
            Home.tapePanel,
            Home.naviPanel,
            Home.progressPanel
        ];
        this.callParent(arguments);
    }
});