var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.mainNav = new Object();

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.firstTimeRun = false;

Alloy.Globals.userSignUpData = new Object({
    pin: "temp",
    name: "temp",
    phone: "temp",
    email: "temp",
    gender: "temp",
    profilePicture: new Object()
});

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        var response = JSON.parse(this.responseText);
        Alloy.Globals.countryCode = response[0].cc.toLowerCase();
    },
    onerror: function() {
        Ti.UI.createAlertDialog({
            title: "No Internet Connection",
            message: "Please connect to the internet and restart the app.",
            cancel: 0,
            buttonNames: [ "Ok" ]
        }).show();
    }
});

xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");

xhr.send();

Alloy.createController("index");