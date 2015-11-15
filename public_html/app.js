Ext.application({
    requires: ["TM.view.Login", "TM.view.Home"],
    views: [
        "Login",
        "Home"
    ],
    name: "TM",
    init: function() {
        var splashscreen = Ext.getBody().mask("Loading...", splashscreen);
        var key = Ext.util.Cookies.get("logIn");
        var task = new Ext.util.DelayedTask(function() {
            splashscreen.fadeOut({
                duration: 100,
                remove: true
            });
            splashscreen.next().fadeOut({
                duration: 100,
                remove: true,
                listeners: {
                    afteranimate: function(el, startTime, elOpts) {
                        
                        if (!key) {
                            //Ext.widget("login");
                            Ext.widget("home");
                        } else {
                            Ext.widget("home");
                        }
                    }
                }
            });
        });
        task.delay(100);
    }
});