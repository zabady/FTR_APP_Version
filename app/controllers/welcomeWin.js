// TODO: Make sure that timeouts used in creating httpClients are good
// TODO: Handle android windows animation

function openPhoneNumberWin(e) 
{
	var phoneNumberWin = Alloy.createController("phoneNumberWin").getView();
	//var phoneNumberWin = Alloy.createController("userMainDetailsWin").getView(); // For testing
 	if(OS_IOS) {
		Alloy.Globals.mainNav.openWindow(phoneNumberWin);
	} else {
		phoneNumberWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left });
	}
}

var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'userProfile_info');
Alloy.Globals.globalUserSignUpData = file.read();
alert(Alloy.Globals.globalUserSignUpData);

$.win.navBarHidden = true;
$.win.open(); 