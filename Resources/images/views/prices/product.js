Ti.include('../shared/default.js');
var product_name = win.product_name;
var product_id = win.product_id;
var data = [];

var itemLabel = Ti.UI.createLabel({
      text:product_name,
      font:{fontSize:18,fontWeight:'bold'},
      top:10,
      left:20,
      height:'auto'
    });
win.add(itemLabel);

function setData() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		//alert(items);
	    var data = [];
		tableview.data = data;
	    for(i=0;i<items.length;i++) {
			//data[i] = Ti.UI.createTableViewRow({title:items[i].formatted_created_at+" "+items[i].user.name+" $"+items[i].unit_price+"/"+items[i].unit.name,backgroundColor:'#fff',font{fontSize:12}});
	    	
	    	data[i] = Titanium.UI.createTableViewRow();
 
	        var listItem = Titanium.UI.createLabel({
	            text:items[i].formatted_created_at+" "+items[i].user.name+" $"+items[i].unit_price+"/"+items[i].unit.name,
	            font:{fontSize:12,fontWeight:'bold'},
	            width:'auto',
	            textAlign:'left',
	            top:5,
	            //left:40,
	            height:16
	        });
	 
        	data[i].add(listItem);
	    
	    }
		tableview.data = data;
  	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/manager/prices.json?product_id="+product_id));
  	xhr.send();	
};
setData();

var tableview = Titanium.UI.createTableView({
	bottom:30,
	left:20,
	right:20,
	height:200,
	borderWidth:1,
	borderRadius:10,
	borderColor:'#999'
});

win.add(tableview);

var cancelBtn =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});


var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar =  Titanium.UI.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	items:[spacer,cancelBtn]
});


win.add(toolbar);

cancelBtn.addEventListener('click', function() {
	win.close();
});



