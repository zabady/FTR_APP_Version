var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.mainNav = new Object();

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.firstTimeRun = false;

Alloy.Globals.globalUserSignUpData = new Object({
    name: "Ahmed Atif",
    phone: "+201009091995",
    email: "ahmed.atif15@gamil.com",
    profilePicture: new Object(),
    gender: "temp"
});

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        var response = JSON.parse(this.responseText);
        Alloy.Globals.countryCode = response[0].cc.toLowerCase();
    },
    onerror: function() {
        Ti.UI.createAlertDialog({
            title: "Error",
            message: "Check your internet connection.",
            cancel: 0,
            buttonNames: [ "Ok" ]
        }).show();
    }
});

xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");

xhr.send();

Alloy.createController("index");