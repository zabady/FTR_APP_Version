function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.loading/" + s : s.substring(0, index) + "/nl.fokkezb.loading/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "white",
        exitOnClose: true
    }
}, {
    isApi: true,
    priority: 1000.0002,
    key: "TextField",
    style: {
        bubbleParent: false
    }
}, {
    isApi: true,
    priority: 1101.0003000000002,
    key: "TextField",
    style: {
        color: "white",
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
    }
} ];