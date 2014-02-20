// TODO: Discussion about how many pictures for one user should we save ? 2
// TODO: Handling image rotation for camera
// TODO: Handling image rotation for photoGallery

/////////////////////////////////////////////////////////////////////////// LOGIC FUNCTIONS
// Name valicator funtcion ---- > text only 
function validate_name()
{
	var regexp =/^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/;
    if($.txt_name.value.match(regexp) && $.txt_name.value.length > 2) {
    	// If it's correct, save it
    	Alloy.Globals.globalUserSignUpData.name = $.txt_name.value;
    	return true;
    } else {
    	alert("Invalid name, it should be greater than 2 charachters and text only !");
		$.txt_name.focus();
		return false;
    }
}

//  Email validation ------ > email format
function validate_email()
{
	var emailvalid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if ($.txt_email.value.match(emailvalid)) {
		// If it's correct, save it
    	Alloy.Globals.globalUserSignUpData.email = $.txt_email.value;
		return true;
	} else {
		alert("Invalid email !");
		$.txt_email.focus();
		return false;
	}
}

// Check if a gender is selected or not
function checkGender()
{
	if(Alloy.Globals.globalUserSignUpData.gender == "temp") {
		alert("Please Select Gender");
		return false;
	} else return true;
}

// Defining a function to be executed when facebook finish
function facebookFinished() {
	// Set user name, email, gender and photo
	$.txt_name.value = Alloy.Globals.globalUserSignUpData.name;
	$.txt_email.value = Alloy.Globals.globalUserSignUpData.email;
	Alloy.Globals.globalUserSignUpData.gender ? $.img_gender_male.fireEvent('click') : $.img_gender_female.fireEvent('click');
	$.img_user.image = Alloy.Globals.globalUserSignUpData.profilePicture.large.read();
	$.img_user.height = 100;
	$.img_user.width = Ti.UI.SIZE;
}

// Defining a function that resize the profile pic to icon and large then saves them on appDataDirectory
function resizeAndSaveProfilePictures(image)
{
	var resizedImage = image.imageAsResized(500, image.height * 500 / image.width);
	Alloy.Globals.globalUserSignUpData.profilePicture.large = 
		Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'img_profile_pic_large.jpg');
	Alloy.Globals.globalUserSignUpData.profilePicture.large.write(resizedImage);
	
	resizedImage = image.imageAsResized(50, 50);
	Alloy.Globals.globalUserSignUpData.profilePicture.icon = 
		Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'img_profile_pic_icon.jpg');
	Alloy.Globals.globalUserSignUpData.profilePicture.icon.write(resizedImage);
	
	// Read and load the largeImage to the imageView
	$.img_user.image = Alloy.Globals.globalUserSignUpData.profilePicture.large.read();
	$.img_user.height = 100;
	$.img_user.width = Ti.UI.SIZE;
}

// Defining a function that sends the user's data to the server
function signUp()
{
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			Alloy.Globals.loading.hide();
			var response = JSON.parse(this.responseText);
			//this returns the pin of the user you should convert it to md5
			alert(response.rows);
			//this is to convert the pin to md5 to be able to search with it in the DB you should save it alloy.globals
			//var pinInMd5=Titanium.Utils.md5HexDigest(response.rows);
		},
		onerror: function(e) {
			Alloy.Globals.loading.hide();
			alert('Check your internet connection.');
		},
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "insert/bofff/user_accounts");
	var params = {
		fullName: Alloy.Globals.globalUserSignUpData.name,
		gender: Alloy.Globals.globalUserSignUpData.gender,
		primary_mobile:	Alloy.Globals.globalUserSignUpData.phone,
		primary_email: Alloy.Globals.globalUserSignUpData.email,
		profile_picture: Alloy.Globals.globalUserSignUpData.profilePicture.large ? Alloy.Globals.globalUserSignUpData.profilePicture.large.read() : null,
	};
	xhr.send(params); // request is actually sent with this statement
}


// Adding facebookFinished function to be global function to get fired by facebook.js
Ti.App.addEventListener('facebookFinished', facebookFinished);

// Removing facebookFinished event listener when the window is closed to save memory
$.win.addEventListener('close', function(){
	Ti.App.removeEventListener('facebookFinished', facebookFinished);
});
/////////////////////////////////////////////////////////////////////////// END OF LOGIC FUNCTIONS


/////////////////////////////////////////////////////////////////////////// HANDLING UI AND EVENT LISTENERS
// A workaround to remove autofocus keyboard on android
if(OS_ANDROID) {
	var firstTime = true;
	$.txt_name.addEventListener('focus', function(e) {
		if(firstTime) {
			e.source.blur();
			firstTime = false;
		}
	});
}

// Adding a click event listener for the window to blur the keyboard
$.win.addEventListener('click', function(){
	$.txt_name.blur();
	$.txt_email.blur();
});

// Removing back button on iOS
$.win.leftNavButton = Ti.UI.createButton();

// Defining a function for pressing on Import from facebook
function facebookImgPressed() {
	
	// Including FacebookFunctions.js to call loginWithFacebook
	Ti.include("/facebookFunctions.js");
	// Send login with facebook the two functions that will be executed after login
	loginWithFacebook(requestWithGraphPath, getNameEmailPicture);
}

// Defining a function for pressing on the image
function imgPressed(e) {
	$.optionDialog.show();
}

// Defining a function for the option dialog to open the camera or choose a photo from library 
function optionDialogClick(e)
{
	// index "0" equals camera selection as a source
	if (e.index == 0) 
	{
		Ti.Media.showCamera({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You have cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			saveToPhotoGallery : false, // TODO: Change it in real app
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	// Index "1" equals gallery images as a source
	else if (e.index == 1)
	{
		Ti.Media.openPhotoGallery({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You've Cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
}

// Defining a function to give focus to email text field when return is pressed
function txtNameReturnKeyPressed() {
	$.txt_email.focus();
}

// Defining a function for gender selection
function genderSelected(e) {
	if(e.source.id == "img_gender_male") {
		$.lbl_gender_male.font = { fontSize: "20" };
		$.lbl_gender_female.font = { fontSize: "17" };;
		$.lbl_gender_male.color = "#2279bc";
		$.lbl_gender_female.color = "gray";
		$.img_gender_male.image = "/images/gender_male.png";
		$.img_gender_female.image = "/images/gender_female[shaded].png";
		Alloy.Globals.globalUserSignUpData.gender = "male";
	} else {
		$.lbl_gender_male.font = { fontSize: "17" };
		$.lbl_gender_female.font = { fontSize: "20" };;
		$.img_gender_male.image = "/images/gender_male[shaded].png";
		$.img_gender_female.image = "/images/gender_female.png";
		$.lbl_gender_male.color = "gray";
		$.lbl_gender_female.color = "#2279bc";
		Alloy.Globals.globalUserSignUpData.gender = "female";
	}
}

// Defining a function for pressing on Continue button
function continueBtnPressed() {
	if(validate_name() && validate_email() && checkGender()) {
		$.win.fireEvent('click');	// To blur keyboard
		
		Alloy.Globals.loading.show("Please Wait ..", false);
		// signUp(); // TODO: For testing
		
		// Save the global sign up data to a file
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'signUpData');
		file.write(); // TODO: Not finished
	}
}