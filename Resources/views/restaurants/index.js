Ti.include('../shared/default.js');

try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
Titanium.App.fireEvent('show_indicator');



bgFrame(12,65,12,67);

if(os_And){
	bgFrame(12,10,12,17);
}


if (!os_And) {
var idLabel = Ti.UI.createLabel({
  text:'Pick a Restaurant Location',
  top:75,
  left:20,
  height:'auto',
  color:'#357'
});
}
else
{
var idLabel = Ti.UI.createLabel({
	text : 'Pick a Restaurant Location',
	top : 20,
	left : 20,
	height : 'auto',
	color : 'black'
});

}
win.add(idLabel);

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

var data = [];
function setData() {
	try{
hideIndicator();
}
catch(Exce){
	
}
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
  		data = [];
		tableview.data = data;
		var items = JSON.parse(this.responseText);
	    for(i=0;i<items.length;i++) {
	    	
	    	row = Ti.UI.createTableViewRow({
				r_name:items[i].name,
				r_id:items[i].id,
				height:40,
			});
	    	
	    	var rThumb = Titanium.UI.createImageView({
	    		image:'http://s3.amazonaws.com/chefsheet-pro/restaurants/'+items[i].id+'/medium/'+items[i].image_file_name,
		    	//image:cropImage('http://s3.amazonaws.com/chefsheet-pro/restaurants/'+items[i].id+'/medium/'+items[i].image_file_name,96,96,64,64),
				//backgroundImage:'http://s3.amazonaws.com/chefsheet-pro/restaurants/'+items[i].id+'/medium/'+items[i].image_file_name,
				left:4,
				top:3,
				width:33,
				height:33,
				borderRadius:6,
				//backgroundColor:'#999',
				preventDefaultImage:true
	    	});
	    	
			//data[i] = Ti.UI.createTableViewRow({title:items[i].name,r_id:items[i].id});
			
			if (!os_And) {
				var name = Titanium.UI.createLabel({
					text : items[i].name,
					font : {
						fontWeight : 'bold',
						fontSize : (items[i].name.length >= 18) ? 16 : 20
					},
					width : '70%',
					textAlign : 'left',
					top : 8,
					left : 42,
				});
			} else {
				var name = Titanium.UI.createLabel({
					text : items[i].name,
					font : {
						fontWeight : 'bold',
						fontSize : (items[i].name.length >= 22) ? 16 : 20
					},
					width : '70%',
					textAlign : 'left',
					top : 8,
					left : 42,
					color : '#112f55'
				});
			}

			row.add(rThumb);
			row.add(name);
			row.img_url = items[i].image_file_name;
			row.r_id = items[i].id;
			data.push(row);
	    }
		tableview.data = data;
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
		renderTableImgs();
  	};
	xhr.onerror = function(e) {
		//alert("error");
		Ti.API.info("post error:" + e.error);
	};
	xhr.open('GET', global_url+"/api/v1/restaurants.json"+token_variable); // Changed 23rd B & Y
	xhr.send();	
};
setData();

function renderTableImgs() {
	Ti.API.info("tableview length:" + data.length);
}
if(!os_And){
var tvBg = Ti.UI.createImageView({
	bottom:74,
	left:19,
	right:19,
	height:220,
	borderColor:'#cde',
	borderRadius:8,
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvBg);
}
if(!os_And){
var tableview = Titanium.UI.createTableView({
	bottom:76,
	left:20,
	right:20,
	height:218,
	borderWidth:1,
	borderRadius:8,
	backgroundColor:'transparent',
	borderColor:'#999',
	separatorColor:'#aaa'
});
}
else{
	
	//if screen is HVGA
	if ((width == '320') && (height == '480')) {
		var tableview = Titanium.UI.createTableView({
			bottom : 17,
			left : 20,
			right : 20,
			height : 300,
			borderWidth : 1,
			borderRadius : 8,
			backgroundColor : 'transparent',
			borderColor : '#999',
			separatorColor : '#aaa'
		});
	}
	//if screen is WQVGA400
	if ((width == 240) && (height == 400)) {
		var tableview = Titanium.UI.createTableView({
			bottom : 17,
			left : 20,
			right : 20,
			height : 196,
			borderWidth : 1,
			borderRadius : 8,
			backgroundColor : 'transparent',
			borderColor : '#999',
			separatorColor : '#aaa'
		});
	}
	
    //if screen is WQVGA432
	if ((width == 240) && (height == 432)) {
		var tableview = Titanium.UI.createTableView({
			bottom : 17,
			left : 20,
			right : 20,
			height : 220,
			borderWidth : 1,
			borderRadius : 8,
			backgroundColor : 'transparent',
			borderColor : '#999',
			separatorColor : '#aaa'
		});
	}
	
	//if screen is QVGA
	if ((width == 240) && (height == 320)) {
		var tableview = Titanium.UI.createTableView({
			bottom : 17,
			left : 20,
			right : 20,
			height : 120,
			borderWidth : 1,
			borderRadius : 8,
			backgroundColor : 'transparent',
			borderColor : '#999',
			separatorColor : '#aaa'
		});
	}
	
	
}

tableview.addEventListener('click', function(e) {
	// var w = Ti.UI.createWindow({
	//     url:'../inventory/locations.js',
	//     barColor: '#1C4E7E',
	//     title:" Inventory",
	//     navBarHidden:false,
	//     modal:false,
	// user_id:e.source.user_id
	//   });
	//   var locale = Ti.UI.createLabel({
	// 	text:e.source.title,
	// 	color:'#fff',
	// 	font:{fontSize:14}
	// });
	// w.rightNavButton = locale;
	// w.backButtonTitle = 'Locations';
	// backtitle = true;
  //Ti.UI.currentTab.open(w,{animated:true,navBarHidden:false});
  //alert("restaurant:"+ e.source.user_id);
	var index = e.index;
	var section = e.section;
	
	setTimeout(function()
	{
		// reset checks
		for (var i=0;i<section.rows.length;i++)
		{
			//section.rows[i].hasCheck = false;
			section.rows[i].hasDetail = false;
			section.rows[i].color = '#000';
		}
		// set current check
		//section.rows[index].hasCheck = true;
		section.rows[index].hasDetail = true;
		section.rows[index].color = '#1C4E7E';
	},250);
	
	Ti.App.Properties.setString('user_id', e.row.user_id);
  	Ti.App.Properties.setString('r_id', e.row.r_id);
  	Ti.App.Properties.setString('restaurant_name', e.row.r_name);
  	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
  	Titanium.App.fireEvent('show_indicator');
  	setRestaurant(e.row.r_id);
  
});

win.add(tableview);

function setRestaurant(rid) {
	var xhr = Ti.Network.createHTTPClient();
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	
	xhr.onload = function(e) {
		win.tabGroup.setActiveTab(1);
		Ti.App.fireEvent('refresh', { tab: 'inventories' });
		
	}
  	xhr.open('GET', global_url+"/api/v1/restaurants/"+rid+"/switch.json"+token_variable); // Changed 23rd B & Y
  	xhr.send();	
};

// force refresh
Ti.App.addEventListener('refresh', function (e) {
	if(e.tab == 'restaurants') {
		Ti.API.info("force refresh restaurants");
		setData();
	}
});

refresh.addEventListener('click', function()
{
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	Titanium.App.fireEvent('show_indicator');
	tableview.setData([]);
	setTimeout(function()
	{
		setData();
	},1000);
});

if (!os_And) {
	win.rightNavButton = refresh;
} else {
	refresh.right=10;
	refresh.top = 10;
	refresh.title = "Refresh";
	refresh.width = 55;
	refresh.font = {fontWeight:'normal',fontSize:11},
	refresh.height=30;
	//not working 23rd B&Y tv.top = 60;
	win.add(refresh);
}



