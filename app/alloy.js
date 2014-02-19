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


// Defining the navigation bar for iOS
if(OS_IOS) {
	Alloy.Globals.mainNav = new Object();
}

// Defining the server's api url
Alloy.Globals.apiUrl = 'http://www.bofffme.com/api/index.php/home/';

// Defining a variable for detecting if it's FTR or not
Alloy.Globals.firstTimeRun = false;

// Defining an associative array to save users data
Alloy.Globals.globalUserSignUpData = new Object({
	//name: 'temp',
	name: 'Ahmed Atif', // for testing
	//phone: 'temp',
	phone: '+201009091995',	// for testing
	//email: 'temp',
	email: 'ahmed.atif15@gamil.com', // for testing
	profilePicture: new Object(),
	gender: "temp",
	//gender: "male",
});


// Getting the country code with the IP from the server side
var xhr = Ti.Network.createHTTPClient({
	onload: function(e) {
		var response = JSON.parse(this.responseText);
		Alloy.Globals.countryCode = response[0].cc.toLowerCase();
	},
	onerror: function(e) {
		Ti.UI.createAlertDialog({
			title : 'Error',
			message : 'Check your internet connection.',
			cancel : 0,
			buttonNames : ['Ok']
		}).show();
	},
});
xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");
xhr.send();  // request is actually sent with this statement