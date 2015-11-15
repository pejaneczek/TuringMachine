Ext.define("TM.controller.StepController", {
    singleton: true,
    step: function(grid, tape, currentSelectedButton, licz) {
        var sNewState,
            sNewSymbol,
            nAction,
            nLineNumber,
            childItems = tape.getChildItemsToDisable(),
            instruction,
            nextInstruction,
            tapeSymbol;

        instruction = grid.getSelectionModel().getSelection()[0].data.instruction;

        var dirtyTapePos = grid.getSelectionModel().getSelection()[0].id;
        var tapePos = dirtyTapePos.replace(/extModel([0-9]+)-/, ""); // wartośc na tasmie

        var currentSymbol;
        var nextSymbol;

        var tape = Ext.ComponentQuery.query("widget.tm_container");

        /*  Pobranie wartości z aktualnie zaznaczonego rekordu w gridzie  */
        var currendSelectedRecord = grid.getSelectionModel().getSelection[0];
        console.log(currendSelectedRecord);

        /* Pobranie wartości aktualnie zaznaczonego buttona */
        console.log(currentSelectedButton);

        /* wykonanie operacji na aktualnie zaznaczonym buttonie  */

        /* po wykonaniu operacji, jesli pozostal zmieniamy mu na standardowy kolor i usuwamy zaznaczenie */
        currentSelectedButton.amISelected = false,
            currentSelectedButton.setStyle({
                background: "blue"
            });


        /* Pobranie wartości następnego button na ktorym bedą wykonywane operacje */
        var nextSelectedButton = childItems[licz]
        console.log(licz);
        /* Ustawienie mu zaznaczenia oraz (kolor pomarańczowy) */

        nextSelectedButton.amISelected = true;
        nextSelectedButton.setStyle({
            background: "orange"
        });

    },
    getNextInstruction: function() {

    }
});