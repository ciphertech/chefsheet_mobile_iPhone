var is_android = (Ti.Platform.osname == 'android');
var run1st = true;
var buttonSystem = true;

//hiding Indicator if it is open
try{
hideIndicator();
}
catch(Exce){	
}

if(!Ti.App.Properties.getString('developer') || Ti.App.Properties.getString('developer') == '') {
  Ti.App.Properties.setString('developer', false);
}

Ti.include('views/shared/default.js');
if  (Ti.Platform.osname != 'android'){ Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;  }
Titanium.UI.setBackgroundColor('#000');
Ti.App.Properties.setString('inventory_id', null);

// Force user_id now
if(Ti.App.Properties.getString('user_id') == '') {
  Ti.App.Properties.setString('user_id', 1);
}
if(Ti.App.Properties.getString('autologin') == '') {
  Ti.App.Properties.setString('autologin', false);
}
//Ti.App.Properties.setString('autologin', false);
var mainWin = Ti.UI.createWindow();

var initView = Ti.UI.createView({
	backgroundGradient:{
		type:'linear',
		colors:['#000','#02242d','#065c74','#1185a6','#81d1e6'],
		startPoint:{x:0,y:0},
		endPoint:{x:0,y:480},
		backFillStart:true
	},
	top:0,
	left:0,
	width:320,
	height:'100%'
});

var scrollView = Titanium.UI.createScrollView({
	contentWidth:257,
	contentHeight:'auto',
	top:0,
	left:0,
	height:'auto',
	width:257
});

var navBG = Ti.UI.createImageView({
	image:'images/nav-icons/cs_navbar.png',
	height:44,
	left:0,
	top:0
});
var navLabel = Ti.UI.createLabel({
	text:'user name',
	font:{fontSize:14,fontWeight:"normal"},
	color:'#fff',
	height:44,
	width:257,
	left:40,
	top:0
});

var navIcon = Ti.UI.createImageView({
	image:'',
	borderWidth:1,
	borderRadius:5,
	borderColor:'#173f6b',
	height:32,
	width:32,
	left:4,
	top:6
});

var tabGroup = Titanium.UI.createTabGroup({
	allowUserCustomization:false,
	top:0,
	left:0,
	width:320,
	height:'100%',
	backgroundGradient:{
	type:'linear',
	colors:['#000','#02242d','#065c74','#1185a6','#81d1e6'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:480},
	backFillStart:true
	}
	
});

var restaurantWin = Ti.UI.createWindow({
  //backgroundColor:'#BBBBC0',
  barColor: '#1C4E7E',
  title:'Restaurants',
  leftnav:true,
  leftNavButton: menuBtn,
  tabBarHidden: true,
  url: 'views/restaurants/index.js'
});
var restaurantTab = Titanium.UI.createTab({icon:'images/48-fork-and-knife.png',title:'Restaurants',window:restaurantWin});

var inventoriesWin = Ti.UI.createWindow({
  //backgroundColor:'#BBBBC0',
  barColor: '#1C4E7E',
  title:'Inventories',
  leftnav:true,
  leftNavButton: menuBtn,
  tabBarHidden: true,
  url: 'views/inventory/inventories.js'
});
var inventoriesTab = Titanium.UI.createTab({icon:'images/83-calendar.png',title:'Inventories',window:inventoriesWin});

var inventoryWin = Ti.UI.createWindow({
  //backgroundColor:'#BBBBC0',
  barColor: '#1C4E7E',
  title:'Count Inventory',
  leftnav:true,
  leftNavButton: menuBtn,
  tabBarHidden: true,
  url: 'views/inventory/locations.js'
});
var inventoryTab = Titanium.UI.createTab({icon:'images/179-notepad.png',title:'Count Inventory',window:inventoryWin});

var reportsWin = Ti.UI.createWindow({
  barColor: '#1C4E7E',
  title:'Inventory Reports',
  leftnav:true,
  leftNavButton: menuBtn,
  tabBarHidden: true,
  url: 'views/reports/index.js'
});
var reportsTab = Ti.UI.createTab({title:'Inventory Reports',icon:'images/17-bar-chart.png',window:reportsWin});

var pricingWin = Ti.UI.createWindow({
  barColor: '#1C4E7E',
  title:'Product Search',
  leftnav:true,
  leftNavButton: menuBtn,
  tabBarHidden: true,
  url: 'views/prices/index.js'
});
var pricingTab = Ti.UI.createTab({title:'Product Search',icon:'images/14-tag.png',window:pricingWin});

var signinWin = Ti.UI.createWindow({
  //backgroundColor:'#BBBBC0',
  barColor: '#1C4E7E',
  title:'Sign In',
  leftnav:true,
  leftNavButton: menuBtn,
  url: 'views/shared/signin.js',
  top:0,
  left:0,
  width:320,
  height:480,
	backgroundColor:'#000',
	backgroundGradient:{
	type:'linear',
	colors:['#000','#02242d','#065c74','#1185a6','#81d1e6'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:480},
	backFillStart:true
	}
});
//var signinTab = Titanium.UI.createTab({icon:'images/56-cloud.png',title:'Sign In',window:signinWin});

var settingsWin = Ti.UI.createWindow({
  //barColor: '#1C4E7E',
  //title:'Settings',
  //leftnav:true,
  //leftNavButton: menuBtn,
  tabBarHidden: true,
  navBarHidden: true,
  url: 'views/settings/show.js',
  
  top:0,
  left:0,
  width:320,
  height:480,
  backgroundColor:'#000',
	backgroundGradient:{
	type:'linear',
	colors:['#000','#02242d','#065c74','#1185a6','#81d1e6'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:480},
	backFillStart:true }
});

var logoutTab = Ti.UI.createTab({title:'Log Out',icon:'images/17-bar-chart.png',});  //temporary by bidyut
var settingsTab = Ti.UI.createTab({title:'Settings',icon:'images/17-bar-chart.png',});  //temporary by bidyut

//var settingsTab = Ti.UI.createTab({title:'Settings',icon:'images/20-gear2.png',window:settingsWin});
tabGroup.addTab(restaurantTab);
tabGroup.addTab(inventoriesTab);
tabGroup.addTab(inventoryTab);
tabGroup.addTab(reportsTab); 

tabGroup.addTab(settingsTab);  //temporary by bidyut
tabGroup.addTab(logoutTab);  //temporary by bidyut

//tabGroup.addTab(pricingTab); // add back soon!
//tabGroup.addTab(settingsTab);
//tabGroup.tabs[0].active = true;

var winData = [
	{title:'Restaurants',icon:'images/nav-icons/48-fork-and-knife.png', tab:0,wView:'restaurantWin'},
	{title:'Inventories',icon:'images/nav-icons/83-calendar.png', tab:1,wView:'inventoriesWin'},
	{title:'Count Inventory',icon:'images/nav-icons/179-notepad.png', tab:2,wView:'inventoryWin'},
	{title:'Inventory Reports',icon:'images/nav-icons/17-bar-chart.png', tab:3,wView:'reportsWin'},
	//{title:'Product Search',icon:'images/nav-icons/14-tag.png', tab:4,wView:'pricingWin'},
	{title:'Settings',icon:'images/nav-icons/20-gear2.png', tab:4,wView:'settingsWin'},
	{title:'Sign Out',icon:'images/nav-icons/56-cloud.png', tab:5,wView:'signinWin'}
	];
// make nav list
var single = true;
var adj = 1
function makeNav(single) {
	adj = single?1:0;
	 for(i=adj;i<winData.length;i++) {
	 	var btnView = Ti.UI.createView({
			backgroundGradient:{
				type:'linear',
				colors:['#222','#000'],
				startPoint:{x:0,y:0},
				endPoint:{x:0,y:44},
				backFillStart:true
			},
			width:258,
			height:44,
			left:0,
			top:(i+1-adj)*44,
			link:winData[i].tab
		});
		var btnImage = Ti.UI.createImageView({
			image:winData[i].icon,
			opacity:0.7,
			left:6,
			link:winData[i].tab
		});
		btnView.add(btnImage);
		var menuLbl = Ti.UI.createLabel({
			text:winData[i].title,
			font:{fontSize:14,fontWeight:"bold"},
			opacity:.6,
			color:'#fff',
			width:'auto',
			left:40,
			height:'auto',
			link:winData[i].tab
		});
		btnView.add(menuLbl);
		
		scrollView.add(btnView);
		
	 }
};
//makeNav();
var lastLink = -1;
var signout = false;
scrollView.addEventListener('click', function(e){
	if(scrollView.children && e.source.link < scrollView.children.length+adj) {
		if(e.source.link > 3) { //4
			switch (e.source.link) {
				case 4: //5 
		        	settingsWin.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL });
		        	break;
		        case 5: //6
					logout();
		        	break;
			}
		} else {
			tabGroup.tabs[e.source.link].active = true;
			Ti.API.info("tab: "+tabGroup.activeTab.window.title);
			//tabGroup.activeTab.window.setData();
			tabGroup.animate(menuClosed);
			showMenu = false;
		}
	}
});

function logout() {
	var xhr = Titanium.Network.createHTTPClient();
	signout=true;
	xhr.onload = function(e) {
	  
		Ti.App.Properties.setString('user_pass','');
		Ti.App.Properties.setString('token', '');
		Ti.App.Properties.setString('user_name', '');
		Ti.App.Properties.setString('user_email','');
		signout=true;
		signinWin.open({ transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP });
	  
	};
	xhr.onerror = function(e) {
		Ti.API.info("get error:" + e.error);
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online ) {
					alertnoInternet.show();
		}
	};

	xhr.open("POST", url('/auth/users/sign_out.json'));
	xhr.send({
		"_method":"delete"
	});
}

tabGroup.addEventListener('focus', function(e){
	try{
	if(scrollView.children && e.index < scrollView.children.length) {
		if (lastLink >= 0) {
			scrollView.children[lastLink].backgroundGradient = {
				type:'linear',
				colors:['#222','#000'],
				startPoint:{x:0,y:0},
				endPoint:{x:0,y:44},
				backFillStart:true
			};
		}
		scrollView.children[e.index-adj].backgroundGradient = {
			type:'linear',
			colors:['#777','#222'],
			startPoint:{x:0,y:0},
			endPoint:{x:0,y:44},
			backFillStart:true
		};
		lastLink =e.index-adj;
	}
	
	hideIndicator();
	Ti.API.info("Restaurant ID: "+Ti.App.Properties.getString('r_id'));
    switch (e.tab.title) {
        case 'Restaurants': 
        	//Ti.App.fireEvent('switchTab', { tab: 'restaurants' });
        	//Ti.App.fireEvent('refresh', { tab: 'restaurants' });
        	break;
        case 'Inventories': 
			//Ti.App.fireEvent('switchTab', { tab: 'inventories' });
			Ti.App.fireEvent('refresh', { tab: 'inventories' });
			break;
        case 'Inventory': 
        	Ti.App.fireEvent('switchTab', { tab: 'inventory' });
        	Ti.App.fireEvent('refresh', { tab: 'inventory' });
      		break;
      	case 'Prices': 
        	Ti.App.fireEvent('switchTab', { tab: 'prices' });
      		break;
      	case 'Reports': 
			Ti.App.fireEvent('refresh', { tab: 'reports' });
			break;
        case 'Settings': 
        	//Ti.App.fireEvent('switchTab', { tab: 'settings' }); 
        	break;
    }
   }catch(exception){
   	try{hideIndicator();}
   	catch(e){}
   	
   }
});

mainWin.addEventListener('open',function() {
	// set background color back to grey after tab group transition
	//Titanium.UI.setBackgroundColor('#000');
	//Titanium.UI.setBackgroundImage('images/bg.png');
	//tabGroup.tabs[5].active = true;
	//tabGroup.tabs[5].show = true;
	signinWin.open();	
});

//tabGroup.setActiveTab(1);
//tabGroup.open({
function setMenu() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
	    if(items.length<2) {
	    	single = true;
	    	Ti.App.Properties.setString('r_id', items[0].r_id);
			Ti.App.Properties.setString('restaurant_name', items[0].name);
	    	Ti.App.fireEvent('refresh', { tab: 'inventories' });
		} else {
			single = false;
			Ti.App.fireEvent('refresh', { tab: 'restaurants' });
		}
		tabGroup.tabs[single?1:0].active = true;
		makeNav(single);
  	};
	xhr.onerror = function(e) {
	
		Ti.API.info("get error:" + e.error);
	};
	xhr.open('GET', url("/api/v1/restaurants.json"));
	xhr.send();	
};

setTimeout(function() {
	mainWin.open({ transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN });
	//setMenu();
},1000);

var tgBg = Ti.UI.createImageView({
	top:0,
	left:0,
	width:320,
	height:159,
	backgroundImage:'images/bg.png'
});
//tabGroup.add(tgBg);
//signinWin.add(tgBg);

var tgTitle = Ti.UI.createImageView({
	bottom:21,
	left:0,
	width:320,
	height:21,
	Image:'images/cs-title.png'
});
tabGroup.add(tgTitle);
settingsWin.add(tgTitle);

var tg1Title = Ti.UI.createImageView({
	//bottom:-10,
	top:200,
	width:220,
	Image:'images/cs-signtitle.png'
});
signinWin.add(tg1Title);
mainWin.add(initView);
mainWin.add(tg1Title);

var showMenu = false;
menuBtn.addEventListener('click', function(e) 
{
	if (showMenu == false) {
		tabGroup.animate(menuOpen);
		showMenu = true;
	} else {
		tabGroup.animate(menuClosed);
		showMenu = false;
	}
});

Ti.App.addEventListener('signedIn', function (e) {
	getUnits();
	getCategories();
	if(run1st) {
	if(is_android)  //from 23rd B & Y		
		{
		
		mainWin.remove(initView);
		mainWin.remove(tg1Title);
		mainWin.add(scrollView);
		mainWin.add(navBG);
		mainWin.add(navLabel);
		mainWin.add(navIcon);
		tabGroup.open();
		//mainWin.add(tabGroup);		
		
		} //if not android
		else{                      //to 23rd B & Y
		mainWin.remove(initView);
		mainWin.remove(tg1Title);
		mainWin.add(scrollView);
		mainWin.add(navBG);
		mainWin.add(navLabel);
		mainWin.add(navIcon);
		mainWin.add(tabGroup);
		tabGroup.open(); 
		}
		run1st = false;
	}
	if(scrollView.children) {
		removeAllChildren(scrollView);
	}
	//if(signout == true) {
		tabGroup.animate(menuClosed);
		showMenu = false;
		setMenu();
	//}
	showMenu = false;
	navLabel.text = 'Welcome '+Ti.App.Properties.getString('user_name');
	navIcon.image = 'http://gravatar.com/avatar/'+Titanium.Utils.md5HexDigest(Ti.App.Properties.getString('user_email'))+'.png';
	navIcon.borderRadius = 5;
});



//
//  CREATE CUSTOM LOADING INDICATOR
//
var indWin = null;
var actInd = null;
function showIndicator()
{
	if (!is_android)
	{
		// window container
		indWin = Titanium.UI.createWindow({
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
		indWin.add(indView);
	

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
} // brace took down 23rd B & Y
	if (!is_android)
	{
		indWin.add(actInd);

		// message
		var message = Titanium.UI.createLabel({
			text:'Loading',
			color:'#fff',
			width:'auto',
			height:'auto',
			font:{fontSize:20,fontWeight:'bold'},
			bottom:20
		});
		indWin.add(message);
		indWin.open();
	/*
	   * commented B & Y 23rd
	   else {
		actInd.message = "Loading";
	}
	*/
	actInd.show();
	
	setTimeout(function()
	{
		hideIndicator();
	},10000);
} 
}

function hideIndicator() {
if(!is_android){
	if (indWin) {
		
			indWin.close({opacity:0,duration:500});
		
	}
	}
}

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator', function(e)
{
	Ti.API.info("IN SHOW INDICATOR");
	showIndicator();
});
Titanium.App.addEventListener('hide_indicator', function(e)
{
	Ti.API.info("IN HIDE INDICATOR");
	hideIndicator();
});




/*

//For Button system

var restaurantButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var inventoriesButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var countInventoriesButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var reportsButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var settingsButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var logoutButton= Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

restaurantButton.addEventListener('click', function()
{
	this.close();
	restaurantWin.show();
	setTimeout(function()
	{
		setData();
	},1000);
});

inventoriesButton.addEventListener('click', function()
{
	this.close();
	inventoriesWin.show();
	setTimeout(function()
	{
		setData();
	},1000);
});

//window
var mainButtonWin = Ti.UI.createWindow({
  //backgroundColor:'#BBBBC0',
  barColor: '#1C4E7E',
  title:"Chefsheet"
    
});

if(buttonSystem)
		{
		mainWin.remove(initView);
		mainWin.remove(tg1Title);
        mainWin.add(scrollView);
		mainWin.add(navBG);
		mainWin.add(navLabel);
		mainWin.add(navIcon);
		mainWin.add(restaurantButton);
		mainWin.add(inventoriesButton);
		mainWin.add(countInventoriesButton);
		mainWin.add(reportsButton);
		mainWin.add(settingsButton);
		mainWin.add(logoutButton);
		
		
		
		}else{}  */
