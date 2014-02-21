// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// // Check for internet connectivity
// if(!Ti.Network.online) {
	// Ti.UI.createAlertDialog({
		// title : 'No Internet Connection',
		// message : 'Please connect to the internet and restart the app.',
		// cancel : 0,
		// buttonNames : ['Ok']
	// }).show();
// }

// Defining a global loading variable to access loading widget
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

// Defining the navigation bar for iOS
if(OS_IOS) {
	Alloy.Globals.mainNav = new Object();
}

// Defining the server's api url
Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';

// Defining a variable for detecting if it's FTR or not
Alloy.Globals.firstTimeRun = false;

// Defining an associative array to save users data
Alloy.Globals.userSignUpData = new Object({
	pin: 'temp',
	name: 'temp',
	phone: 'temp',
	email: 'temp',
	gender: "temp",
	profilePicture: new Object(),
});


// Getting the country code with the IP from the server side
var xhr = Ti.Network.createHTTPClient({
	onload: function(e) {
		var response = JSON.parse(this.responseText);
		Alloy.Globals.countryCode = response[0].cc.toLowerCase();
	},
	onerror: function(e) {
		Ti.UI.createAlertDialog({
			title : 'No Internet Connection',
			message : 'Please connect to the internet and restart the app.',
			cancel : 0,
			buttonNames : ['Ok']
		}).show();
	},
});
xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");
xhr.send();  // request is actually sent with this statement