Ti.include('../shared/default.js');
var product_name = win.product_name;
var prod_id = 0;
var prod_name = '';
var unit_id = 0;
var category_id = 0;
var location_id = win.location_id;


var pickerUnits = Ti.UI.createPickerColumn({opacity:0,width:'200%'});
var pickerCats = Ti.UI.createPickerColumn({opacity:0,width:'380%'});

//hiding Indicator if it is open
try{
hideIndicator();
}
catch(Exce){
	
}

function rowText(Ritem,Rtype,Rcolumn,Rid) {
	
	var row = Ti.UI.createPickerRow({id:Rid});
	
	var label = Ti.UI.createLabel({
		text:Ritem,
		font:{fontSize:28,fontWeight:'bold'},
		width:'auto',
		height:'auto'
	});
	
	if(Rtype == 'header'){
		label.color = '#026';
		label.font = {fontSize:21,fontWeight:'bold'};
	} else {
		label.left = 30;
	}
	row.add(label);
	
	if(Rcolumn == 'units') {
		pickerUnits.addRow(row);
	} else {
		pickerCats.addRow(row);
	}
};

var transformPicker = Titanium.UI.create2DMatrix().scale(0.5);
var picker = Ti.UI.createPicker({
	width: '200%',
	bottom:-10,
	transform:transformPicker,
	selectionIndicator:true
});

units = _.sortBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) { return e.id });
catPickerList = _.sortBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });

//rowText('Select a Quantitative Unit','header','units',0);
Ti.API.info("units.length:" + units.length);
Ti.API.info("catPickerList.length:" + catPickerList.length);
		
rowText('Select a Unit','header','units',0);
for(i=0;i<units.length;i++) {
	rowText(units[i].name,'','units',units[i].id);
}

var r_id = Ti.App.Properties.getString('r_id');
rowText('Select a Category','header','cats',0);
for(i=0;i<catPickerList.length;i++) {
	if(catPickerList[i].restaurant_id == null || Number(catPickerList[i].restaurant_id) == Number(r_id)) {
		rowText(catPickerList[i].name,'','cats',catPickerList[i].id);
	}
	
}

picker.add([pickerCats,pickerUnits]);
win.add(picker);

var tvBg = Ti.UI.createImageView({
	bottom:158,
	left:9,
	right:9,
	top:86,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#fff',
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png',
	opacity:0.5
});
win.add(tvBg);

var tableview = Titanium.UI.createTableView({
	bottom:160,
	left:10,
	right:10,
	top:86,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#999',
	rowHeight:32,
	separatorColor:'#aaa',
	backgroundColor:'transparent',	
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	// update nameField, categoryPicker and unitPicker
	nameField.value = e.row.productitem;
	prod_name = e.row.productitem;
	prod_id = e.row.product_id;
	for(i=0;i<units.length;i++) {
		if(units[i].id == e.row.unit_id) {
			picker.setSelectedRow(1, i, true);
		}
	}
	var setCat = false;
	for(i=0;i<catPickerList.length;i++) {		
		if(catPickerList[i].restaurant_id == null || Number(catPickerList[i].restaurant_id) == Number(r_id)) {
			if(catPickerList[i].id == e.row.category_id) {
				picker.setSelectedRow(0, i+1, true);
				setCat = true;
			}
		}
	}
	if(!setCat) { picker.setSelectedRow(0, 0, true); }
	nameField.blur();
});

win.add(tableview);

picker.addEventListener('change',function(e)
{
	if(e.columnIndex == 0) category_id = e.row.id;
	if(e.columnIndex == 1) unit_id = e.row.id;
	
	if((category_id > 0) && (unit_id > 0) && !(nameField.value == null)){  //logic updated by yogesh nameField.value.length > 0 to !(nameField.value == null)
		invBtn.enabled = true;  //yogesh  logic is for save button enabling and disabling
	} else {
		invBtn.enabled = false;
	}
	Ti.API.info("category = "+category_id+": unit = "+unit_id);
});

var itemLabel = Ti.UI.createLabel({
      text:product_name,
      font:{fontSize:18,fontWeight:'bold'},
      top:10,
      left:20,
      height:'auto'
    });
win.add(itemLabel);

var invBtn =  Titanium.UI.createButton({
	title:'Save',
	enabled: false,
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
 
var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var nameField = Titanium.UI.createSearchBar({
	barColor:'#ddd',
	showCancel:false,
	hintText:'Type and Select an Item Name',
	height:43,
	top:36
});

/*
var nameField = Ti.UI.createTextField({
  hintText:'Type and Select an Item Name',
  height:32,
  right:6,
  top:36,
  left:6,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_ALPHA_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
*/
win.add(nameField);

nameField.addEventListener('change',function(e)
{
	if((category_id > 0) && (unit_id > 0) && (nameField.value.length > 0)){
		invBtn.enabled = true;
	} else {
		invBtn.enabled = false;
	}
});

nameField.addEventListener('return', function(e) {
	if (nameField.value != '') {
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
		Titanium.App.fireEvent('show_indicator');
		tableview.setData([]);
		setData();
		nameField.blur();
	}
});

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
	if(nameField.value != prod_name) {
		prod_id = 0;
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Yes!', 'No'],
		    message: "This item doesn't exist in the ChefSheet product Database, are you sure you want to create it?",
		    title: 'Create New Product'
		 });
		 dialog.show(); 
		 dialog.addEventListener('click',function(e) {
			if(e.index == 0){
				addItem();
			}
		});
	
	}else{
		addItem();
	}
});	


function addItem() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("good");
		Ti.App.fireEvent('popClose');
		win.close();
		getGrpInv('currInv_refresh');
		//win.setData();
	};
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
		alert("Sorry unable to add New Item");
	};
	// newer method - post directly to inventory
	xhr.open("PUT", url('/manager/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
	if(prod_id!=0) {
		xhr.send({
			"utf8":"✓",
			"inventory[items_attributes][][restaurant_id]":Ti.App.Properties.getString('r_id'),
			"inventory[items_attributes][][product_id]":prod_id,
			"inventory[items_attributes][][location_id]":location_id,
			"inventory[items_attributes][][unit_id]":unit_id,
			"inventory[items_attributes][][category_id]":category_id,
			"inventory[items_attributes][][_destroy]":0,
			"inventory[items_attributes][][status]":2
			//"commit":"Update Inventory"
		});
	} else {
		xhr.send({
			"utf8":"✓",
			"inventory[items_attributes][][restaurant_id]":Ti.App.Properties.getString('r_id'),
			"inventory[items_attributes][][name]":nameField.value,
			"inventory[items_attributes][][location_id]":location_id,
			"inventory[items_attributes][][unit_id]":unit_id,
			"inventory[items_attributes][][category_id]":category_id,
			"inventory[items_attributes][][_destroy]":0,
			"inventory[items_attributes][][status]":2
			//"commit":"Update Inventory"
		});
	}
	/* old method - post to global products
	xhr.open("POST", url('/manager/products.json'));
	xhr.send({
		"utf8":"✓",
		"product[name]":nameField.value,
		"product[category_id]":category_id,
		"product[unit_id]":unit_id
	});	
	*/ 
	
};

win.addEventListener("open", function(event, type) {
   //nameField.focus();  
});

function setData() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
  		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
		var items = JSON.parse(this.responseText);
	    var data = [];
	    var catHeader = 0;
		tableview.data = data;
	    for(i=0;i<items.length;i++) {
	    	var row = Titanium.UI.createTableViewRow({
	    		hasChild:true
	    	});
			
			var catThumb = Titanium.UI.createImageView({
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
			row.unit_id = items[i].unit_id;
			row.category_id = items[i].category_id;
			data.push(row);
	    }
		tableview.data = data;
		tableview.index = index;
  	};
	xhr.onerror = function(e) {
		
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/api/v1/products.json?searchbar="+nameField.value,true));
  	xhr.send();	
};
