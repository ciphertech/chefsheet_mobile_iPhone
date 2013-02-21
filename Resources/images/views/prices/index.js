Ti.include('../shared/default.js');
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var restaurant_name = '';

var data = [];

bgFrame(12,50,12,17);
//Titanium.App.fireEvent('show_indicator');

var search = Titanium.UI.createSearchBar({
	barColor:'#013',
	showCancel:false,
	hintText:'Search for Products',
	height:43,
	top:0
});

win.add(search);

var idLabel = Ti.UI.createLabel({
  text:Ti.App.Properties.getString('restaurant_name'),
  top:56,
  left:20,
  height:'auto',
  font:{fontSize:14},
  color:'#357'
});
win.add(idLabel);
var prdctLabel = Ti.UI.createLabel({
  text:'Product Results',
  top:72,
  left:20,
  height:'auto',
  font:{fontSize:16},
  color:'#357'
});
win.add(prdctLabel);

// global/local switch
var globalLbl = Ti.UI.createLabel({
	text: 'Global',
	top:65,
	right:90,
	font:{fontWeight:'bold',fontSize:12},
	color:'#579'
});

var tf = Titanium.UI.create2DMatrix().scale(0.75);
var globalSwitch = Titanium.UI.createSwitch({
	value:false,
	top:60,
	right:10,
	transform:tf
});
win.add(globalLbl);
win.add(globalSwitch);


//getCategories();
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });


function setData() {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
	    var data = [];
	    //var index = [];
	    var catHeader = 0;
		tableview.data = data;
	    for(i=0;i<items.length;i++) {
			//data[i] = Ti.UI.createTableViewRow({title:items[i].name,backgroundColor:'#fff',product_id:items[i].id,product_name:items[i].name});
	    	var row = Titanium.UI.createTableViewRow({
	    		hasChild:true
	    	});
			
			var catThumb = Titanium.UI.createImageView({
		    	//image:'../../images/categories/'+items[i].category_id+'.png',
		    	image:cropImage(prodImg(items[i],'medium'),84,56,56,56),
				left:3,
				top:2,
				width:28,
				height:28,
				borderRadius:6,
				backgroundColor:'#BBBBC0',
				preventDefaultImage:true
	    	});
			
			var productitem = Titanium.UI.createLabel({
				text:items[i].name,
				font:{fontSize:14,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:6,
				left:36,
				height:16
			});
			if(items[i].category_id != catHeader) {
				catHeader = items[i].category_id;
				row.header = categories[catHeader][0].name;
				//index.push({title:''+i,index:i});
			}
			row.add(catThumb);
			row.add(productitem);
			row.productitem = productitem.text;
			row.product_id = items[i].id;
			row.user_id = items[i].user_id;
			data.push(row);
	    }
		tableview.data = data;
		tableview.index = index;
		Titanium.App.fireEvent('hide_indicator');
  	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', 
  		globalSwitch.value?url("/manager/products.json?searchbar="+search.value,true):url("/manager/products/index_restaurant.json?searchbar="+search.value,true)
  	);
  	xhr.send();	
};
//setData();

var tvBg = Ti.UI.createImageView({
	bottom:24,
	left:19,
	right:19,
	top:98,
	//height:295,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#cde',
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvBg);
/*
var tf = Titanium.UI.createSearchBar({
	height:32,
	barColor: '#1C4E7E',
	font:{fontSize:13},
	showCancel:false,
	hintText:'Filter Products'
});
*/
var tableview = Titanium.UI.createTableView({
	bottom:26,
	left:20,
	right:20,
	top:98,
	//height:293,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#999',
	rowHeight:32,
	separatorColor:'#aaa',
	backgroundColor:'transparent',
	//search:tf,
	searchHidden:false,
	filterAttribute:'productitem'	
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	// popWin(e);
	var w = Ti.UI.createWindow({
	    url:'../prices/price.js',
	    barColor: '#1C4E7E',
	    title:"Price Details",
	    navBarHidden:false,
	    modal:false,
		user_id:e.row.user_id,
		product_id:e.row.product_id,
		product_name:e.row.productitem
  	});
  	
	w.backButtonTitle = 'Product Search';
	backtitle = true;
	Ti.UI.currentTab.open(w,{animated:true,navBarHidden:false});
});

win.add(tableview);

// Search bar events
/*
search.addEventListener('change', function(e) {
	Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);

});
*/
search.addEventListener('return', function(e) {
	//Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
	if (search.value != '') {
		//Titanium.App.fireEvent('show_indicator');
		tableview.setData([]);
		setData();
		search.blur();
	}
});

globalSwitch.addEventListener('change', function(e) {
	if(e.value) {
		idLabel.text = 'Global';
	} else {
		idLabel.text = Ti.App.Properties.getString('restaurant_name');
	}
});

// Refresh Event
refresh.addEventListener('click', function()
{
	Titanium.App.fireEvent('show_indicator');
	tableview.setData([]);
	setTimeout(function()
	{
		//alert("setting data");
		setData();
	},1000);
});

if (Ti.Platform.name == 'iPhone OS') {
	win.rightNavButton = refresh;
} else {
	refresh.top = 5;
	refresh.title = "Refresh";
	refresh.width = 200;
	tv.top = 60;
	win.add(refresh);
}

win.addEventListener("focus", function() {
	if(globalSwitch.value) {
		idLabel.text = 'Global';
	} else {
		idLabel.text = Ti.App.Properties.getString('restaurant_name');
	}
	//tableview.setData([]);
});



function popWin(e){
	//Titanium.API.info('Clicked:'+e.index);
	//Titanium.API.info('Clicked:'+e.row.productitem.text);
	Titanium.API.info('Clicked:'+e);

	//pHeader = e.row.productitem.text;
	pUrl = '../prices/product.js';
	pHeight = '49%';
	pId = e.row.product_id;

     var bgColor='#eee';
     var bColor='#666'
     var bWidth=1;
     var t = Titanium.UI.create2DMatrix();
	 t = t.scale(0);
	 
     var w = Titanium.UI.createWindow({
     	url:pUrl,
     	product_id:pId,
     	product_name:e.row.product_name,
		backgroundColor:bgColor,
		borderWidth:bWidth,
		borderColor:bColor,
		top:10,
		left:10,
		right:10,
		height:278,
		borderRadius:10,
		opacity:0.85,
		transform:t
	});

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		//Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1);
		w.animate({transform:t2, duration:200});

	});
	
	w.open(a);
    
}
