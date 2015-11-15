Ext.define("TM.machines.Add", {
    singleton: true,
    getProgram: function() {
        var data = [{
            step: 1,
            position: "0",
            instruction: "_ _ r",
            goto: "1"
        }, {
            step: 2,
            position: "0",
            instruction: "* * r",
            goto: "0"
        }, {
            step: 3,
            position: "1",
            instruction: "_ _ l",
            goto: "2"
        }, {
            step: 4,
            position: "1",
            instruction: "* * r",
            goto: "1"
        }, {
            step: 5,
            position: "2",
            instruction: "0 _ l",
            goto: "3x"
        }, {
            step: 6,
            position: "2",
            instruction: "1 _ l",
            goto: "3y"
        }, {
            step: 7,
            position: "2",
            instruction: "_ _ l",
            goto: "7"
        }, {
            step: 8,
            position: "3x",
            instruction: "_ _ l",
            goto: "4x"
        }, {
            step: 9,
            position: "3x",
            instruction: "* * l",
            goto: "3x"
        }, {
            step: 10,
            position: "3y",
            instruction: "_ _ l",
            goto: "4y"
        }, {
            step: 11,
            position: "3y",
            instruction: "* * l",
            goto: "3y"
        }, {
            step: 12,
            position: "4x",
            instruction: "0 x r",
            goto: "0"
        }, {
            step: 13,
            position: "4x",
            instruction: "1 y r",
            goto: "0"
        }, {
            step: 14,
            position: "4x",
            instruction: "_ x r",
            goto: "0"
        }, {
            step: 15,
            position: "4x",
            instruction: "* * l",
            goto: "4x"
        }, {
            step: 16,
            position: "4y",
            instruction: "1 0 l",
            goto: "4y"
        }, {
            step: 18,
            position: "4y",
            instruction: "_ 1 *",
            goto: "5"
        }, {
            step: 19,
            position: "4y",
            instruction: "* * l",
            goto: "4y"
        }, {
            step: 20,
            position: "5",
            instruction: "x x l",
            goto: "6"
        }, {
            step: 21,
            position: "5",
            instruction: "y y l",
            goto: "6"
        }, {
            step: 22,
            position: "5",
            instruction: "_ _ l",
            goto: "6"
        }, {
            step: 23,
            position: "5",
            instruction: "* * r",
            goto: "5"
        }, {
            step: 24,
            position: "6",
            instruction: "0 x r",
            goto: "0"
        }, {
            step: 25,
            position: "6",
            instruction: "1 y r",
            goto: "0"
        }, {
            step: 26,
            position: "7",
            instruction: "x 0 l",
            goto: "7"
        }, {
            step: 27,
            position: "7",
            instruction: "y 1 l",
            goto: "7"
        }, {
            step: 28,
            position: "7",
            instruction: " _ _ r",
            goto: "halt"
        }, {
            step: 29,
            position: "7",
            instruction: "* * l",
            goto: "7"
        }];

        return data;
    }
});