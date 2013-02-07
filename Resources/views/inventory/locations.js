Ti.include('../shared/default.js');
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

var restaurant_name = '';
var inventory_name = '';

var showerror = false;
var showederror = false;
// if (user_id == null) {
// 	alert("no user, using:"+ Ti.App.Properties.getString('user_id'));
// 	user_id = Ti.App.Properties.getString('user_id');
// }
// Ti.App.Properties.setString('user_id', user_id);

var data = [];

bgFrame(12,60,12,62);
//Titanium.App.fireEvent('show_indicator');

var idLabel = Ti.UI.createLabel({
  text:Ti.App.Properties.getString('restaurant_name'),
  top:68,
  left:20,
  height:'auto',
  color:'#357'
});
win.add(idLabel);

var idLabel2 = Ti.UI.createLabel({
  text:Ti.App.Properties.getString('inventory_name'),
  font:{fontSize:16,fontWeight:'bold'},
  top:90,
  left:20,
  height:'auto',
  width:'auto',
  color:'#357'
});
win.add(idLabel2);
/*
var inv_date = Ti.UI.createLabel({
	text:Ti.App.Properties.getString('inv_date'),
	textAlign:'right',
	font:{fontWeight:'normal',fontSize:12},
	top:94,
	right:20,
	height:'auto',
	width:'auto',
	color:'#357'
});
win.add(inv_date);
*/
function setData() {
	if(Ti.App.Properties.getString('inventory_id')>0) {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		//alert(JSON.parse(this.responseText));
		//Ti.API.info("location data length:" + items.items.length);
		var invGrp = _.groupBy(items.items, function(e) { return e.location_id });
		var invData = _.toArray(invGrp);
		Ti.App.Properties.setString("currInventory", JSON.stringify(invGrp));
		Ti.API.info("location data groups - invData length: "+invData.length);
	    data = [];
		tableview.data = data;
		for(i=0;i<invData.length;i++) {
			//Ti.API.info("location qty's: "+_.pluck(_.toArray(invData[i]),'quantity'));
			var locDone = !_.any(_.pluck(_.toArray(invData[i]),'quantity'), _.identity(_.isNull));
			//Ti.API.info("location "+invData[i][0].location.name+" finished is: "+locDone);
			var locTitle = 'null';
			if(invData[i][0].location){
				locTitle = (invData[i][0].location.name != '') ? invData[i][0].location.name:'not set';
			}
			data[i] = Ti.UI.createTableViewRow({
				title:locTitle,
				height:40,
				location_id:invData[i][0].location_id,
				leftImage: locDone ? '../../images/19-check.png':null
			});
			/*
			var row = Titanium.UI.createTableViewRow({
	    		title:locTitle,
				location_id:invData[i][0].location_id,
				leftImage: locDone ? '../../images/19-check.png':null
	    	});
	    	*/
	    	
			var inv_sum = Ti.UI.createLabel({
				text: invData[i].length,
				textAlign:'right',
				font:{fontWeight:'normal',fontSize:12},
				right:10
	        });
	        data[i].add(inv_sum);
	        data[i].title = locTitle;
	        data[i].location_id = invData[i][0].location_id
	    }
		tableview.data = data;
		Titanium.App.fireEvent('hide_indicator');
  	};
	xhr.onerror = function(e) {
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online  && !showerror && !showederror) {
			showederror = true;
		alertnoInternet.show();
		}
		showerror = !showerror;
				Ti.API.info("post error:" + e.error);
	};
  	xhr.open('GET', url("/api/v1/inventories/"+Ti.App.Properties.getString('inventory_id')+".json"));
  	xhr.send();
  	} else {
  		Ti.App.fireEvent('signedIn');
  	}	
};
setData();

if(!os_And){
var tvBg = Ti.UI.createImageView({
	bottom:68,
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

var tableview = Titanium.UI.createTableView({
	bottom:70,
	left:20,
	right:20,
	height:218,
	borderWidth:1,
	borderRadius:8,
	backgroundColor:'transparent',
	borderColor:'#999',
	separatorColor:'#aaa'
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online) {
			
		alertnoInternet.show();
		}
		
	
	
	
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
	
	var w = Ti.UI.createWindow({
	    url:'../inventory/inventory.js',
	    barColor: '#1C4E7E',
	    title:" Inventory",
	    navBarHidden:false,
	    modal:false,
		location_id:e.row.location_id
  	});
  	var locale = Ti.UI.createLabel({
		text:e.row.title,
		font:{fontSize:12,fontWeight:'normal'},
		color:'#fff'
	});
	w.rightNavButton = locale;
	w.backButtonTitle = 'Rooms';
	backtitle = true;
	Ti.UI.currentTab.open(w,{animated:true,navBarHidden:false});
});

// add table view to the window
win.add(tableview);

refresh.addEventListener('click', function()
{showederror = false;
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	Titanium.App.fireEvent('show_indicator');
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online  && !showerror && !showederror) {
			showederror = true;
		alertnoInternet.show();
		}
		showerror = !showerror;
	tableview.setData([]);
	setTimeout(function()
	{
		
		//alert("setting data");
		setData();
	},1000);
});

// force refresh
Ti.App.addEventListener('refresh', function (e) {
	if(e.tab == 'inventory' || e.tab == 'locations') {
		setData();
	}
});


if (!os_And) {
	win.rightNavButton = refresh;
} else {
	refresh.top = 5;
	refresh.title = "Refresh";
	refresh.width = 200;
	//not working 23rd B&Y tv.top = 60;
	win.add(refresh);
}

win.addEventListener("focus", function(event, type) {
	setData();
	if ((Ti.App.Properties.getString('restaurant_name') != restaurant_name) || (Ti.App.Properties.getString('inventory_name') != inventory_name)) {
try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
		restaurant_name = Ti.App.Properties.getString('restaurant_name');
		inventory_name = Ti.App.Properties.getString('inventory_name');
	}
    idLabel.text = Ti.App.Properties.getString('restaurant_name')
    idLabel2.text = Ti.App.Properties.getString('inventory_name');
});


