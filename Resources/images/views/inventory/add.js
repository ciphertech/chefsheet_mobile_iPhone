Ti.include('../shared/default.js');
var product_name = win.product_name;
var product_id = 0;
var unit_id = 0;
var location_id = win.location_id;
var lstIndex = -1;


// create table view data object

var data = [];

/*
var unitField = Ti.UI.createButton({
  title:'lbs',
  height:35,
  width: 100,
  bottom:80,
  right:20
});
win.add(unitField);
*/
var itemLabel = Ti.UI.createLabel({
      text:product_name,
      font:{fontSize:18,fontWeight:'bold'},
      top:10,
      left:20,
      height:'auto'
    });
win.add(itemLabel);

var tf = Titanium.UI.createSearchBar({
	height:32,
	barColor: '#1C4E7E',
	font:{fontSize:13},
	showCancel:false,
	hintText:'Filter Items'
});

/* var tf = Titanium.UI.createTextField({
	height:32,
	backgroundImage:'../../images/inputfield.png',
	width:200,
	font:{fontSize:13},
	color:'#000',
	paddingLeft:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
});
*/
var filterLbl = Ti.UI.createLabel({
	text: 'Filter Items',
	textAlign:'left',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});

var invBtn =  Titanium.UI.createButton({
	title:'Add',
	enabled:false,
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
 
var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var qtyField = Ti.UI.createTextField({
  hintText:'Count',
  height:35,
  width: 0,
  top:40,
  left:20,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  //keyboardToolbar:[spacer,filterLbl,spacer,tf,spacer],
  keyboardType:Titanium.UI.KEYBOARD_ALPHA_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_SEARCH
  //keyboardToolbarbarColor: '#1C4E7E',	
  //keyboardToolbarHeight: 40
});
win.add(qtyField);

var ivBg = Ti.UI.createImageView({
	borderColor:'#fff',
	top:40,
	left:19,
	right:19,
	height:130,
	borderRadius:8,
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(ivBg);

var itemview = Ti.UI.createTableView({
	top:40,
	left:20,
	right:20,
	height:128,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#999',
	rowHeight:32,
	separatorColor:'#aaa',
	search:tf,
	searchHidden:false,
	filterAttribute:'product_name'
});

itemview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;

	setTimeout(function()
	{
		// reset checks
		if(lstIndex>=0) {
			section.rows[lstIndex].hasCheck = false;
			section.rows[lstIndex].children[0].color = '#000';
		}
		// set current check
		section.rows[index].hasCheck = true;
		section.rows[index].children[0].color = '#1C4E7E';
		itemview.scrollToIndex(index);
		product_id = e.row.product_id;
		unit_id = e.row.unit_id;
		
		Ti.API.info("loc: "+location_id+"| prod: "+product_id+"| unit: "+unit_id);
		
		invBtn.enabled = true;
		lstIndex = index;
		
	},250);
	
	
});

win.add(itemview);

function setData() {
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	var data = [];
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
  		
		var items = JSON.parse(this.responseText);

	    for(i=0;i<items.length;i++) {
			var row = Titanium.UI.createTableViewRow();
	      	var product = items[i];
			var productitem = Titanium.UI.createLabel({
				text:product.name,
				font:{fontSize:14,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:6,
				left:36, //10
				height:16,
			});
			
			var catThumb = Titanium.UI.createImageView({
		    	image:'../../images/categories/'+items[i].category_id+'.png',
				left:3,
				top:2,
				width:28,
				height:28,
				borderRadius:6,
				backgroundColor:'#BBBBC0',
				preventDefaultImage:true
	    	});
	    	
			row.add(catThumb);
			row.product_name = product.name;
			row.product_id = product.id;
			row.unit_id = product.unit_id;
			row.add(productitem);
			data.push(row);
	    }

	    itemview.setData(data);
  	};
  	xhr.open('GET', url("/api/v1/products.json"));
  	xhr.send();	
};
setData();

var toolbar =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	items:[invBtn,spacer,cancelBtn]
});
win.add(toolbar);

cancelBtn.addEventListener('click', function() {
	Ti.App.fireEvent('popClose');
	win.close();
});

invBtn.addEventListener('click', function() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("good");
		getGrpInv('currInv_refresh');
		Ti.App.fireEvent('popClose');
		win.close();
		//win.setData();
	};
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
		
	};
	//xhr.open("POST", url('manager/productlocations.json'));
	xhr.open("PUT", url('/api/v1/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
	xhr.send({
		/*
		"productlocation[location_id]":location_id,
		"productlocation[product_id]":product_id,
		"productlocation[user_id]":Ti.App.Properties.getString('user_id')
		*/
		"utf8":"✓",
		"inventory[items_attributes][][location_id]":location_id,
		"inventory[items_attributes][][unit_id]":unit_id,
		"inventory[items_attributes][][product_id]":product_id,
		"inventory[items_attributes][][_destroy]":0,
		"inventory[items_attributes][][status]":1
	});	 
});

tf.addEventListener('blur', function(e){
	qtyField.focus();
});

tf.addEventListener('cancel', function(e){
	qtyField.focus();
});

tf.addEventListener('return', function(e){
	qtyField.focus();
	setTimeout(function(){
		qtyField.focus()
	},250);
});

win.addEventListener("open", function(event, type) {
   qtyField.focus();
    setTimeout(function()
	{
		//tf.focus();
	},250);
    
});
