Ext.define("TM.controller.LoginController", {
    singleton: true,
    log: function(logParams) {
        Ext.util.Cookies.set("logIn", true);
        Ext.widget("home");
    }
});