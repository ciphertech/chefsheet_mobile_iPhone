//Replace on 28th by y

Ti.include('../shared/default.js');

//var added for logic by yogesh 24th
var entered = false;
var error_shown = false;
var checkwhether_signin_button_click = false;

//custom alerts
//added by y on 24th 
var myactivityIndicator = Ti.UI.createAlertDialog({
    buttonNames : [],
    title : "Cheefsheet",
    message : "Loading..."
});

var alertfillemailpass = Ti.UI.createAlertDialog({
    buttonNames : ["OK"],
    title : "Cheefsheet",
    message : "Please Fill Email and Password",
    cancel : 0
});

var alertwrongemailpass = Ti.UI.createAlertDialog({
    buttonNames : ["OK"],
    title : "Cheefsheet",
    message : "Email or Password is Incorrect ",
    cancel : 0
});




/*
 var devLabel = Ti.UI.createLabel({
 color:'#fff',
 text:'Dev Server',
 top:55,
 left:10,
 height:'auto'
 });
 win.add(devLabel);

 var devSwitch = Ti.UI.createSwitch({
 value:Boolean(parseInt(Ti.App.Properties.getString('developer'),10)),
 top:55,
 right:10
 });
 win.add(devSwitch);
 */



Ti.App.fireEvent('closeMenu');

//Bidyut Nath
//added code for preventing landscape mode.
win.orientationModes = [Titanium.UI.PORTRAIT];


//Bidyut Nath
//condition for detecting ios device
if (!os_And) {

	var autoLogLabel = Ti.UI.createLabel({
		color : '#fff',
		text : 'Remember Login',
		top : 55,
		left : 10,
		height : 'auto'
	});
	win.add(autoLogLabel);

	var autoLogSwitch = Ti.UI.createSwitch({
		value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
		top : 55,
		right : 10
	});
	win.add(autoLogSwitch);

	var emailField = Ti.UI.createTextField({
		hintText : 'email',
		height : 35,
		width : 300,
		top : 90,
		left : 10,
		autocorrect : false,
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	win.add(emailField);

	var passwordField = Ti.UI.createTextField({
		hintText : 'password',
		passwordMask : true,
		height : 35,
		width : 300,
		top : 130,
		left : 10,
		autocorrect : false,
		keyboardType : Titanium.UI.KEYBOARD_EMAIL,
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	win.add(passwordField);

	var signInBtn = Ti.UI.createButton({
		title : 'Sign in',
		width : 170,
		height : 36,
		top : 174,
		left : 10,
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		backgroundGradient : {
			type : 'linear',
			colors : ['#698aaa', '#1C4E7E', '#173f6b'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 36
			},
			backFillStart : false
		},
		borderWidth : 1,
		borderColor : '#112f55'
	});
	win.add(signInBtn);

	var signUpBtn = Ti.UI.createButton({
		title : 'Sign Up',
		width : 120,
		height : 36,
		top : 174,
		right : 10,
		style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius : 10,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		backgroundGradient : {
			type : 'linear',
			colors : ['#698aaa', '#1C4E7E', '#173f6b'],
			startPoint : {
				x : 0,
				y : 0
			},
			endPoint : {
				x : 0,
				y : 36
			},
			backFillStart : false
		},
		borderWidth : 1,
		borderColor : '#112f55'
	});
	win.add(signUpBtn);

	signUpBtn.addEventListener('click', function() {
		Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
	});

	eventListenerforSignInBtn();

}

//Bidyut Nath
//condition for detecting android device
//added for different android screen resolutions
if (os_And) {

	var width = Titanium.Platform.displayCaps.platformWidth;
	var height = Titanium.Platform.displayCaps.platformHeight;

	//if screen is HVGA
	if ((width == '320') && (height == '480')) {
		var autoLogLabel = Ti.UI.createLabel({
			color : '#fff',
			text : 'Remember Login',
			top : 55,
			left : 10,
			height : 'auto'
		});
		win.add(autoLogLabel);

		var autoLogSwitch = Ti.UI.createSwitch({
			value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
			top : 45,
			right : 10
		});
		win.add(autoLogSwitch);

		var emailField = Ti.UI.createTextField({
			hintText : 'email',
			height : 35,
			width : 300,
			top : 90,
			left : 10,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(emailField);

		var passwordField = Ti.UI.createTextField({
			hintText : 'password',
			passwordMask : true,
			height : 35,
			width : 300,
			top : 130,
			left : 10,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(passwordField);

		var signInBtn = Ti.UI.createButton({
			title : 'Sign in',
			width : 130,
			height : 36,
			top : 174,
			left : 10,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signInBtn);

		var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
		var back = Titanium.UI.createImageView({
			image : back_fn,
			top : 200,
			width : 220
		});
		win.add(back);

		var signUpBtn = Ti.UI.createButton({
			title : 'Sign Up',
			width : 120,
			height : 36,
			top : 174,
			right : 10,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signUpBtn);

		signUpBtn.addEventListener('click', function() {
			Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		});

		eventListenerforSignInBtn();

	}
	//if screen is WQVGA432
	if ((width == 240) && (height == 432)) {
		var autoLogLabel = Ti.UI.createLabel({
			color : '#fff',
			text : 'Remember Login',
			top : 35,
			left : 1,
			height : 'auto'
		});
		win.add(autoLogLabel);

		var autoLogSwitch = Ti.UI.createSwitch({
			value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
			top : 25,
			left : 190
		});
		win.add(autoLogSwitch);

		var emailField = Ti.UI.createTextField({
			hintText : 'email',
			height : 35,
			width : 240,
			top : 70,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(emailField);

		var passwordField = Ti.UI.createTextField({
			hintText : 'password',
			passwordMask : true,
			height : 35,
			width : 240,
			top : 110,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(passwordField);

		var signInBtn = Ti.UI.createButton({
			title : 'Sign in',
			width : 100,
			height : 30,
			top : 154,
			left : 1,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signInBtn);

		var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
		var back = Titanium.UI.createImageView({
			image : back_fn,
			top : 170,
			left : 14,
			width : 220
		});
		win.add(back);

		var signUpBtn = Ti.UI.createButton({
			title : 'Sign Up',
			width : 100,
			height : 30,
			top : 154,
			left : 135,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signUpBtn);

		signUpBtn.addEventListener('click', function() {
			Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		});

		eventListenerforSignInBtn();

	}

	//if screen is QVGA
	if ((width == 240) && (height == 320)) {
		var autoLogLabel = Ti.UI.createLabel({
			color : '#fff',
			text : 'Remember Login',
			top : 15,
			left : 1,
			height : 'auto'
		});
		win.add(autoLogLabel);

		var autoLogSwitch = Ti.UI.createSwitch({
			value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
			top : 5,
			left : 190
		});
		win.add(autoLogSwitch);

		var emailField = Ti.UI.createTextField({
			hintText : 'email',
			height : 28,
			width : 240,
			top : 40,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(emailField);

		var passwordField = Ti.UI.createTextField({
			hintText : 'password',
			passwordMask : true,
			height : 28,
			width : 240,
			top : 70,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(passwordField);

		var signInBtn = Ti.UI.createButton({
			title : 'Sign in',
			width : 100,
			height : 30,
			top : 100,
			left : 1,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signInBtn);

		var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
		var back = Titanium.UI.createImageView({
			image : back_fn,
			top : 120,
			left : 14,
			height : 180,
			width : 220
		});
		win.add(back);

		var signUpBtn = Ti.UI.createButton({
			title : 'Sign Up',
			width : 100,
			height : 30,
			top : 100,
			left : 135,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signUpBtn);

		signUpBtn.addEventListener('click', function() {
			Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		});

		eventListenerforSignInBtn();
	}

	//if screen is WQVGA400
	if ((width == 240) && (height == 400)) {
		var autoLogLabel = Ti.UI.createLabel({
			color : '#fff',
			text : 'Remember Login',
			top : 35,
			left : 1,
			height : 'auto'
		});
		win.add(autoLogLabel);

		var autoLogSwitch = Ti.UI.createSwitch({
			value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
			height : 33,
			top : 28,
			left : 200
		});
		win.add(autoLogSwitch);

		var emailField = Ti.UI.createTextField({
			hintText : 'email',
			height : 35,
			width : 240,
			top : 70,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(emailField);

		var passwordField = Ti.UI.createTextField({
			hintText : 'password',
			passwordMask : true,
			height : 35,
			width : 240,
			top : 110,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(passwordField);

		var signInBtn = Ti.UI.createButton({
			title : 'Sign in',
			width : 100,
			height : 30,
			top : 154,
			left : 1,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signInBtn);

		var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
		var back = Titanium.UI.createImageView({
			image : back_fn,
			top : 180,
			left : 14,
			height : 190,
			width : 220
		});
		win.add(back);

		var signUpBtn = Ti.UI.createButton({
			title : 'Sign Up',
			width : 100,
			height : 30,
			top : 154,
			left : 135,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signUpBtn);

		signUpBtn.addEventListener('click', function() {
			Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		});

		eventListenerforSignInBtn();
	}

	//if screen is WVGA800
	if ((width == 480) && (height == 800)) {

		var autoLogLabel = Ti.UI.createLabel({
			color : '#fff',
			text : 'Remember Login',
			top : 35,
			left : 1,
			height : 'auto'
		});
		win.add(autoLogLabel);

		var autoLogSwitch = Ti.UI.createSwitch({
			value : Boolean(parseInt(Ti.App.Properties.getString('autologin'), 10)),
			height : 33,
			top : 28,
			left : 200
		});
		win.add(autoLogSwitch);

		var emailField = Ti.UI.createTextField({
			hintText : 'email',
			height : 35,
			width : 240,
			top : 70,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(emailField);

		var passwordField = Ti.UI.createTextField({
			hintText : 'password',
			passwordMask : true,
			height : 35,
			width : 240,
			top : 110,
			left : 1,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_EMAIL,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		win.add(passwordField);

		var signInBtn = Ti.UI.createButton({
			title : 'Sign in',
			width : 100,
			height : 30,
			top : 154,
			left : 1,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signInBtn);

		var back_fn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/cs-signtitle.png');
		var back = Titanium.UI.createImageView({
			image : back_fn,
			top : 180,
			left : 14,
			height : 190,
			width : 220
		});
		win.add(back);

		var signUpBtn = Ti.UI.createButton({
			title : 'Sign Up',
			width : 100,
			height : 30,
			top : 154,
			left : 135,
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius : 10,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			backgroundGradient : {
				type : 'linear',
				colors : ['#698aaa', '#1C4E7E', '#173f6b'],
				startPoint : {
					x : 0,
					y : 0
				},
				endPoint : {
					x : 0,
					y : 36
				},
				backFillStart : false
			},
			borderWidth : 1,
			borderColor : '#112f55'
		});
		win.add(signUpBtn);

		signUpBtn.addEventListener('click', function() {
			Titanium.Platform.openURL('http://chefsheet.com/auth/users/sign_up');
		});

		eventListenerforSignInBtn();
	}

}


function eventListenerforSignInBtn() {

	signInBtn.addEventListener('click', function() {
		error_shown = false;
		entered=false;
		try{
		if(!os_And){
			 hideIndicatorSignIn();			
		}else{
			myactivityIndicator.hide();
		}
		}catch(exc){}
		finally{
		//Ti.App.Properties.setString('developer', devSwitch.value);
		if (emailField.value == 'dev' && (passwordField.value == 'true' || passwordField.value == 'false')) {
			switch (passwordField.value) {
				case 'true':
					Ti.App.Properties.setString('developer', true);
					break;
				case 'false':
					Ti.App.Properties.setString('developer', false);
					break;
			}
		} else {
			
			Ti.App.Properties.setString('autologin', autoLogSwitch.value);
			checkwhether_signin_button_click = true;
			//logic added by yogesh
			//temporary commented by bidyut
		if ((emailField.value.length == 0 ) || (passwordField.value.length == 0))//logic added by yogesh
			{
		      alertfillemailpass.show();
			} else//logic added by yogesh
					{ 
							if(os_And)
				{
					myactivityIndicator.show();
				}else
				{
					showIndicatorSignIn();
				}
				login();
				
			}
			
		}
		}
	});

}

function login() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		entered = true;
		var response = JSON.parse(this.responseText);
		//Ti.API.info("login:" + response.token);
		Ti.App.Properties.setString('token', response.token);
		 token_variable="?auth_token=" + Ti.App.Properties.getString("token");	//added 25th B
		Ti.App.Properties.setString('user_name', response.name);
		Ti.App.Properties.setString('user_email', emailField.value);
		Ti.App.Properties.setString('user_pass', passwordField.value);
		Ti.API.info('user name: ' + response.name);
	   
		if(os_And)
				{
					myactivityIndicator.hide();
				}else
				{
					 hideIndicatorSignIn();
				}
		
		if (response.token != undefined) {
			//win.tabGroup.setActiveTab(0);
			setTimeout(function() {
				win.close({
					transition : Titanium.UI.iPhone.AnimationStyle.CURL_UP
				});
			}, 1000);
			Ti.App.fireEvent('signedIn');
		} else {
			alert("Email or Password is incorrect");
		}
	};

	
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
		
		try{
		if (checkwhether_signin_button_click) {
     if(os_And)
				{
					myactivityIndicator.hide();
				}else
				{
					 hideIndicatorSignIn();
				}
     }
    }catch(exception){}
    finally{
     if(!error_shown){  //if 1
     	error_shown=true;
		if (!os_And) {
			
			if (!Titanium.Network.online) {
				alertnoInternet.show();
				
			}// code added by yogesh to display error when internet connection is off
			else if (checkwhether_signin_button_click) {
				alertwrongemailpass.show();
				
			}
		} else {
			if (checkwhether_signin_button_click) {
				alertwrongemailpass.show();
				
			}
  
		}	//END logic added by yogesh for removing give alert on load of page
 } //end of if 1
 } //end of finally
	}; 


	 
	var url = global_url + '/api/v1/tokens.json';
	xhr.open("POST", url);

    //temporary modification by bidyut nath
	xhr.send({
		"email":emailField.value,
		"password":passwordField.value	
	});
	
	//Closing Loading alert when internet connection is off added by y on 24th 
	
	setTimeout(function()
	{
		if(os_And){
			if(!error_shown && !entered){
				error_shown=true;
			alertnoInternet.show();	
			
			}
				myactivityIndicator.hide();		
		
		}else{
			if(!error_shown && !entered){
				error_shown=true;
				alertslowInternet.show();
			
		}
			hideIndicatorSignIn();	
		
		}
	},8000);
	
	
}

if (Ti.App.Properties.getString('autologin') == true) {
	emailField.value = Ti.App.Properties.getString('user_email');
	passwordField.value = Ti.App.Properties.getString('user_pass');
	setTimeout(function() {
		login();
	}, 250);
}


//24th by y for active Indicator
/*
var myActivityIndicator = Ti.UI.createAlertDialog({
    buttonNames : [],
    message : "Loading"
});*/

//24th by y for active Indicator in iphone
var indWins = null;
var actInds = null;
function showIndicatorSignIn()
{
	if (!os_And)
	{
		// window container
		indWins = Titanium.UI.createWindow({
			height:120,
			width:120
		});

		// black view
		var indView = Titanium.UI.createView({
			height:120,
			width:120,
			backgroundColor:'#000',
			borderRadius:12,
			opacity:0.7
		});
		indWins.add(indView);
	

	// loading indicator
	actInds = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
} // brace took down 23rd B & Y
	if (!os_And)
	{
		indWins.add(actInds);

		// message
		var message = Titanium.UI.createLabel({
			text:'Loading',
			color:'#fff',
			width:'auto',
			height:'auto',
			font:{fontSize:20,fontWeight:'bold'},
			bottom:20
		});
		indWins.add(message);
		indWins.open();
	
	actInds.show();
	setTimeout(function()
	{	
			hideIndicatorSignIn();		
		
	},9000);
	
} 
}

function hideIndicatorSignIn() {
if(!os_And){
	if (indWins) {
		
			indWins.close({opacity:0,duration:500});
		}
	}
}
