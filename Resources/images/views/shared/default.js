var win = Ti.UI.currentWindow;
var temp_url = "http://chefsheet.herokuapp.com";    //"http://chefsheet.herokuapp.com";                    //"http://chefsheet-staging.herokuapp.com";                    // //  // // //B & Y 23_jan
var os_And = (Ti.Platform.osname == 'android');  //B & Y 23_jan
var global_url = temp_url;
var token_variable="?auth_token=" + Ti.App.Properties.getString("token");  //B & Y 23_jan
var is_android = (Ti.Platform.osname == 'android');
var width = Titanium.Platform.displayCaps.platformWidth;    //B & Y 24_jan
var height = Titanium.Platform.displayCaps.platformHeight;  //B & Y 24_jan

var menuBtn = Titanium.UI.createButton({
	title : 'Menu',
	width : 20
});
var menuImg = Titanium.UI.createImageView({
	image : '../../images/menu.png',
	width : 28,
	height : 28
});
//menuBtn.add(menuImg);

var menuOpen = Titanium.UI.createAnimation({
	left : 258,
	duration : 250
});

var menuClosed = Titanium.UI.createAnimation({
	left : 0,
	duration : 250
});

var alertnoInternet = Ti.UI.createAlertDialog({
    buttonNames : ["OK"],
    title : "Cheefsheet",
    message : "Please check Internet Connection",
    cancel : 0
});


var alertslowInternet= Ti.UI.createAlertDialog({
    buttonNames : ["OK"],
    title : "Cheefsheet",
    message : "Internet is Slow",
    cancel : 0
});


require('lib/require_patch').monkeypatch(this);
var moment = require('lib/moment.min');
var _ = require('lib/underscore-min')._

function url(path,q) {
	//var urlPrefixes = ["http://chefsheet.herokuapp.com", "http://0.0.0.0:3000"];
	var urlPrefixes = [global_url];
	if (q) {
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "&auth_token=" + Ti.App.Properties.getString("token");
	} else {		
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "?auth_token=" + Ti.App.Properties.getString("token");
	}
	/* OLD
	if (q) {
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "&token=" + Ti.App.Properties.getString("token");
	} else {
		return urlPrefixes[Ti.App.Properties.getString('developer')] + path + "?token=" + Ti.App.Properties.getString("token");
	}
	*/
}

function bgFrame(l, t, r, b) {
	var frame = Ti.UI.createView({
		top : t,
		left : l,
		right : r,
		bottom : b,
		borderRadius : 10,
		borderWidth : 2,
		borderColor : '#567',
		backgroundColor : '#abc'
	});
	
	if(os_And){
	 var frame = Ti.UI.createView({
		 top : t,
		 left : l,
		 right : r,
		 bottom : b,
		 borderRadius : 10,
		 borderWidth : 2,
		 borderColor : '#567',
		 backgroundColor : '#fceafe' //changed by bidyut from '#abc' to disable iOS look.
	 }); 
    }

	var gloss = Ti.UI.createImageView({
		image : '../../images/glosstop.png',
		width : '100%',
		height : 40,
		top : 0
	});
	frame.add(gloss);
	win.add(frame);
}
/*
function cropImage(img,w,h,cw,ch) {
	var grImg = '';
	var c = Titanium.Network.createHTTPClient();
	c.setTimeout(10000);
	c.onload = function(){
		Ti.API.info('IN ONLOAD ');

		var rImg = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,grImg);    
	    	    	
    	var baseImage = Titanium.UI.createImageView({
		    image: rImg.nativePath,
		    width:w, height:h,
		    preventDefaultImage:true
		});
		 
		// Here's the view we'll use to do the cropping. 
		var cropView = Titanium.UI.createView({
		    width:cw, height:ch
		});
		 
		// Add the image to the crop-view and center.
		cropView.add(baseImage);
		baseImage.left=-((w-cw)/2);
		baseImage.top=-((h-ch)/2);
		 
		// now convert and return the crop-view to an image Blob
		return cropView.toImage();
	};
	
	c.onerror = function(e){
		Ti.API.info('XHR Error ' + e.error);
	};
	// open the client
	if (img){
		grImg = img_name;
		c.open('GET',img);
		c.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,grImg);
		// send the data
		c.send();
	}
}
*/

function cropImage(img,w,h,cw,ch) {
	var baseImage = Titanium.UI.createImageView({
	    image:img,
	    width:w, height:h,
	    preventDefaultImage:true
	});
	 
	// Here's the view we'll use to do the cropping. 
	var cropView = Titanium.UI.createView({
	    width:cw, height:ch
	});
	 
	// Add the image to the crop-view and center.
	cropView.add(baseImage);
	baseImage.left=-((w-cw)/2);
	baseImage.top=-((h-ch)/2);
	 
	// now convert and return the crop-view to an image Blob
	return cropView.toImage();
}
// get unit names
var units = {};
function getUnits() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		Ti.App.Properties.setString("units", this.responseText);
		//Ti.App.Properties.setString("units", _.groupBy(JSON.parse(this.responseText), function(e) { return e.id }));
  	};
	xhr.onerror = function(e) {
		
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/api/v1/units.json"));
  	xhr.send();	
};
//getUnits();

// get categories
var catgories = {};
function getCategories() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
  		Ti.App.Properties.setString("categories", this.responseText);
		//categories = _.sortBy(JSON.parse(this.responseText), function(e) { return e.id }); //JSON.parse(this.responseText);
		//catgories.reverse();
	};
	xhr.onerror = function(e) {
	
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/api/v1/categories.json"));
  	xhr.send();	
};
//getCategories();

var img_name = '';
function prodImg(obj,size) {
	// size - 'tiny','thumb','medium','large'
	// http://s3.amazonaws.com/chefsheet-pro/products/1/medium/buns21_1_.jpg_w_550
	// http://s3.amazonaws.com/chefsheet-pro/categories/40/medium/baked_products.jpg
	//Ti.API.info("obj.category_id: " +categories[58].image_file_name);
	var prod_img;
	img_name = '';
	if(obj.image_file_name) {
		alert("I am in 1");
		prod_img = 'http://s3.amazonaws.com/chefsheet-pro/products/'+obj.id+'/'+size+'/'+obj.image_file_name;
		img_name = obj.image_file_name;
		if(img_name == null || prod_img== null){
			
			prod_img =	'../../images/default_image2.png';
		    	img_name ='default_image';
		   
		}
		
	} else if (obj.category_id != null && obj.category_id != undefined && obj.category_id != '' && categories[obj.category_id] ) {
		//alert("i am in two");
		Ti.API.info("obj.category_id: "+obj.category_id);
		prod_img = 'http://s3.amazonaws.com/chefsheet-pro/categories/'+obj.category_id+'/'+size+'/'+categories[obj.category_id][0].image_file_name;
		img_name = categories[obj.category_id][0].image_file_name;
		if(img_name == null || prod_img== null){
			
			prod_img =	'../../images/default_image2.png';
		    	img_name ='default_image';
		   
		}
		
		
		
	} else {
		prod_img =	'../../images/default_image2.png';
		    	img_name ='default_image';		
	}
	return prod_img;
}

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}



