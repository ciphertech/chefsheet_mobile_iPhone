Ti.include('../shared/default.js');
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var restaurant_name = '';

var data = [];
report_id = -1;

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

function setData() {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
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
				left:8,
				bottom:3
				//height:40
	        });
				
			var invLabel = Titanium.UI.createLabel({
				text:invTitle,
				font:{fontWeight:'bold',fontSize:(invTitle.length>=26)?12:16},
				//width:'65%',
				textAlign:'left',
				left:8,
				top:3
			});
			row = Ti.UI.createTableViewRow({
				//indentionLevel:3,
				//title:String(invTitle),
				height:40
			});
			row.add(invLabel);
			row.add(invDate);
			row.inv_id = items[i].id;
			row.inv_title=String(invTitle);
			row.inv_date=items[i].created_at;
			row.inventory_id=items[i].id;
			data.push(row);
	    }
		tableview.data = data;
		Titanium.App.fireEvent('hide_indicator');
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
tableview.addEventListener('click', function(e) {
	dialog.title = 'Select a Type Report for "'+e.row.inv_title+'" Inventory';
	report_id = e.row.inv_id;
	dialog.show();
});

win.add(tableview);

refresh.addEventListener('click', function()
{
	Titanium.App.fireEvent('show_indicator');
	tableview.setData([]);
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online  ) {
			
		alertnoInternet.show();
		}
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
	if(e.tab == 'inventories' || 'reports') {
		Ti.API.info("force refresh inventories");
		setData();
	}
});

// Done dialog menu
var report_type = ['order', 'sums', 'cat_sums'];
var report_titles = ['Order', 'Category Details', 'Category Sums', 'Cancel']
var optionsDialogOpts = {
	options:report_titles,
	cancel:3,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener
dialog.addEventListener('click',function(e)
{
	
	if(e.index < 3) {
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{	
	}
		if (!Titanium.Network.online  ) {
			
		alertnoInternet.show();
		}else{
		win.close();
		
		var report = url("/manager/inventories/"+report_id+"/"+report_type[e.index]+".pdf");	

		//report = "http://0.0.0.0:3000/manager/inventories/96/order";
		
		var wv = Titanium.UI.createWebView({ 
			url: report,
			width:'auto',
	        height:'auto',
	        top:0,
	        //scalesPageToFit: false,
	        loading: true,
	        backgroundColor: '#fff'
		}); 
		w = Titanium.UI.createWindow({
			title: report_titles[e.index]
		});
		
		w.add(wv); 
		w.open({modal:true});
		Titanium.App.fireEvent('show_indicator');
		
		var close_w = Titanium.UI.createButton({
           title:'Close'
        });
        close_w.addEventListener('click', function() {
           w.close();
        });
        w.setRightNavButton(close_w);
        
        wv.addEventListener('load', function() {
			Titanium.App.fireEvent('hide_indicator');
		});	
		}
	}
	
});
