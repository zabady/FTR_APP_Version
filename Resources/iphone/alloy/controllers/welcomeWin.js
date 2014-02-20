function Controller() {
    function openPhoneNumberWin() {
        var phoneNumberWin = Alloy.createController("phoneNumberWin").getView();
        Alloy.Globals.mainNav.openWindow(phoneNumberWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "welcomeWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#58c8f3",
                offset: 0
            }, {
                color: "#41bae8",
                offset: .4
            }, {
                color: "#2585b7",
                offset: .9
            } ]
        },
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId22 = Ti.UI.createView({
        id: "__alloyId22"
    });
    $.__views.win.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        left: 10,
        top: "5%",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: "18"
        },
        text: "WELCOME TO BOFFF ME!",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createImageView({
        image: "/images/bofffme_logo_512x512.png",
        width: "200",
        height: "200",
        top: "25%",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createButton({
        bottom: 0,
        font: {
            fontSize: "22",
            fontWeight: "bold"
        },
        height: "10%",
        width: "100%",
        backgroundColor: "transparent",
        color: "white",
        title: "Continue",
        id: "__alloyId25"
    });
    $.__views.__alloyId22.add($.__views.__alloyId25);
    openPhoneNumberWin ? $.__views.__alloyId25.addEventListener("click", openPhoneNumberWin) : __defers["$.__views.__alloyId25!click!openPhoneNumberWin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.navBarHidden = true;
    $.win.open();
    __defers["$.__views.__alloyId25!click!openPhoneNumberWin"] && $.__views.__alloyId25.addEventListener("click", openPhoneNumberWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;