Ti.include('../shared/default.js');
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var restaurant_name = '';

var data = [];

bgFrame(12,10,12,17);
//Titanium.App.fireEvent('show_indicator');

var idLabel = Ti.UI.createLabel({
  text:Ti.App.Properties.getString('restaurant_name')+' Inventories',
  top:20,
  left:20,
  height:'auto',
  color:'#357'
});
win.add(idLabel);
/*
var lblFrame = Ti.UI.createView({
	top : 52,
	left : 19,
	height : 30,
	width : 44,
	borderRadius:4,
	borderWidth:0,
	backgroundColor:'#89a'
});
//win.add(lblFrame);
*/
var bttnLbl = Ti.UI.createLabel({
  text:'Duplicate',
  font:{fontWeight:'normal',fontSize:10},
  top:50,
  left:20,
  height:'auto',
  color:'#fff',
  shadowColor:'#89a', 
  shadowOffset:{x:2,y:2}
});
win.add(bttnLbl);
/*
var addBttn = Titanium.UI.createButton({
  	right:16,
  	top:16,
  	height:32,
  	width:32,
	style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
});

addBttn.addEventListener('click', function(e)
{
	dialog.title = 'Are you sure you want to \n add a new inventory sheet?';
	dialog.show();
});

win.add(addBttn);

// Add dialog menu

var optionsDialogOpts = {
	options:['Add Inventory Sheet', 'Cancel'],
	cancel:1,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener
dialog.addEventListener('click',function(e)
{
	
	if(e.index == 0) {
		var user_id = Ti.App.Properties.getString('r_id');
		var xhr = Ti.Network.createHTTPClient();
	  	xhr.onload = function(e) {
			setData();
	  	};
		xhr.onerror = function(e) {
			alert("error");
			Ti.API.info("post error:" + e.error);
		};
	  	xhr.open('POST', url("/inventories.json"));
	  	xhr.send({
			"inventory[status]":1,
			"inventory[user_id]":Ti.App.Properties.getString('r_id')
		});
	};
	
});
*/

//getUnits();
//getCategories();

function setData() {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		if(items.length ==0 ){
			Titanium.App.fireEvent('hide_indicator');
			bttnLbl.visible = false;
			tableview.visible = false;
			//tvBg.visible = false;
			noInvLbl.visible = true;
			openBtn.visible = true;
		} else {
			bttnLbl.visible = true;
			tableview.visible = true;
			//tvBg.visible = true;
			noInvLbl.visible = false;
			openBtn.visible = false;
	    data = [];
	    var invTitle;
		tableview.data = data;
	    for(i=0;i<items.length;i++) {
	    	if(items[i].name == ""||items[i].name == null) { 
				invTitle = String(moment(items[i].created_at).format("MMM DD YYYY, hA"));
			}else{
				invTitle = String(items[i].name);
			}
			row = Ti.UI.createTableViewRow({
				//indentionLevel:3,
				//title:String(invTitle),
				height:40
			});
			
			var invDate = Ti.UI.createLabel({
				text: moment(items[i].created_at).format("MM.DD.YY"),
				textAlign:'right',
				font:{fontWeight:'normal',fontSize:12},
				left:44,
				bottom:3
				//height:40
	        });
	        var dupeBttn = Titanium.UI.createButton({
	        //var dupeBttn = Titanium.UI.createImage({
	        	left:4,
			  	height:28,
			  	width:36,
				//style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
				backgroundImage:'../../images/duplicate.png',
				inv_title:invTitle,
				inv_id:items[i].id
			});
				
			var invLabel = Titanium.UI.createLabel({
				text:invTitle,
				font:{fontWeight:'bold',fontSize:(invTitle.length>=26)?12:16},
				//width:'65%',
				textAlign:'left',
				left:44,
				top:3
			});
			row = Ti.UI.createTableViewRow({
				//indentionLevel:3,
				//title:String(invTitle),
				height:40
			});
			row.add(invLabel);
			row.add(dupeBttn);
			row.add(invDate);
			row.inv_title=String(invTitle);
			row.inv_date=items[i].created_at;
			row.inventory_id=items[i].id;
			data.push(row);
	    }
		tableview.data = data;
		Titanium.App.fireEvent('hide_indicator');
		}
  	};
	xhr.onerror = function(e) {
	
		Ti.API.info("get error:" + e.error);
	};
  	//xhr.open('GET', url("/manager/inventories.json?user_id="+user_id));
  	xhr.open('GET', url("/api/v1/inventories.json"));
  	xhr.send();	
};
setData();

var tvBg = Ti.UI.createImageView({
	bottom:24,
	left:19,
	right:19,
	height:325,
	borderColor:'#cde',
	borderRadius:8,
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvBg);

var noInvLbl = Titanium.UI.createLabel({
	top:180,
	text:'No Inventories Present',
	visible:false
});

var openBtn = Ti.UI.createButton({
	title:'Create one at ChefSheet.com',
	top:210,
	width:260,
	height:36,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	font:{fontSize:16,fontWeight:'bold'},
	backgroundGradient:{type:'linear',
	colors:['#698aaa','#1C4E7E','#173f6b'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:36},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#112f55',
	visible:false
});
win.add(noInvLbl);
win.add(openBtn);

openBtn.addEventListener('click', function() {
  Titanium.Platform.openURL('http://chefsheet.com/manager/inventories');
});

var tableview = Titanium.UI.createTableView({
	bottom:26,
	left:20,
	right:20,
	height:323,
	borderWidth:1,
	borderRadius:8,
	backgroundColor:'transparent',
	borderColor:'#999',
	separatorColor:'#aaa'
});

// create table view event listener
var dupe_id = -1;
tableview.addEventListener('click', function(e) {
	/*
	var w = Ti.UI.createWindow({
	    url:'../inventory/locations.js',
	    barColor: '#1C4E7E',
	    title:" Inventory",
	    navBarHidden:false,
	    modal:false,
		inventory_id:e.source.inventory_id
  	});
  	var locale = Ti.UI.createLabel({
		text:e.source.title,
		color:'#fff',
		font:{fontSize:14}
	});
	w.rightNavButton = locale;
	w.backButtonTitle = 'Inventories';
	backtitle = true;
	*/
	if(e.x < 36) {
		dialog.title = 'Do you want to duplicate the "'+e.source.inv_title+'" Inventory?';
		dupe_id = e.source.inv_id;
		dialog.show();
	} else {
		var index = e.index;
		var section = e.section;
		var inv_date = moment(e.source.inv_date).format("MM.DD.YYYY");
	
		setTimeout(function()
		{
			// reset checks
			for (var i=0;i<section.rows.length;i++)
			{
			
				section.rows[i].hasDetail = false;
				section.rows[i].color = '#000';
				section.rows[i].children[0].color = '#000';
			}
			// set current check
			section.rows[index].hasDetail = true;
			section.rows[index].color = '#1C4E7E';
			section.rows[index].children[0].color = '#1C4E7E';
			win.tabGroup.setActiveTab(2);
			Ti.App.fireEvent('refresh', { tab: 'locations' });
		},250);
		
		Ti.App.Properties.setString('inventory_id', e.row.inventory_id);
		//alert(e.source.inventory_id);
		//Ti.App.Properties.setString('inv_date', inv_date);
		Ti.App.Properties.setString('inventory_name', e.row.inv_title);
	  	//Ti.UI.currentTab.open(w,{animated:true,navBarHidden:false});
	  	//win.tabGroup.setActiveTab(2);
	}
});

win.add(tableview);

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

win.addEventListener("focus", function(event, type) {
	if (Ti.App.Properties.getString('restaurant_name') != restaurant_name) {
		Titanium.App.fireEvent('show_indicator');
		setData();
		restaurant_name = Ti.App.Properties.getString('restaurant_name');
	}
    idLabel.text = restaurant_name +' Inventories';
});
// force refresh
Ti.App.addEventListener('refresh', function (e) {
	if(e.tab == 'inventories') {
		Ti.API.info("force refresh inventories");
		setData();
		if (Ti.App.Properties.getString('restaurant_name') != restaurant_name) {
			Titanium.App.fireEvent('show_indicator');
			restaurant_name = Ti.App.Properties.getString('restaurant_name');
		}
	    idLabel.text = restaurant_name +' Inventories';		
	}
});

// Done dialog menu
var optionsDialogOpts = {
	options:['Duplicate', 'Cancel'],
	cancel:1,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener
dialog.addEventListener('click',function(e)
{
	
	if(e.index == 0) {
		win.close();
		
		var xhr = Ti.Network.createHTTPClient();
	  	xhr.onload = function(e) {
			setData();
	  	};
		xhr.onerror = function(e) {
			
			Ti.API.info("set error:" + e.error);
		};
	  	xhr.open('GET', url("/manager/inventories/"+dupe_id+"/duplicate.json"));
	  	xhr.send();
	};
	
});