Ti.include('../shared/default.js');
var product_name = win.product_name;
var unit_id = 0;
var category_id = 0;
var location_id = win.location_id;


var pickerUnits = Ti.UI.createPickerColumn({opacity:0,width:'200%'});
var pickerCats = Ti.UI.createPickerColumn({opacity:0,width:'380%'});


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
categories = _.sortBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });

//rowText('Select a Quantitative Unit','header','units',0);
Ti.API.info("units.length:" + units.length);
Ti.API.info("categories.length:" + categories.length);
		
rowText('Select a Unit','header','units',0);
for(i=0;i<units.length;i++) {
	rowText(units[i].name,'','units',units[i].id);
}

var r_id = Ti.App.Properties.getString('r_id');
rowText('Select a Category','header','cats',0);
for(i=0;i<categories.length;i++) {
	if(categories[i].restaurant_id == null || Number(categories[i].restaurant_id) == Number(r_id)) {
		rowText(categories[i].name,'','cats',categories[i].id);
	}
	
}

picker.add([pickerCats,pickerUnits]);
win.add(picker);


/*
var catgories = {};
function getCategories() {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		catgories = JSON.parse(this.responseText);
		rowText('Select a Category','header','cats',0);
	    for(i=0;i<catgories.length;i++) {
	    	
			//pickerCats.addRow(Ti.UI.createPickerRow({title:items[i].name,id:items[i].id,fontSize:28}));
			rowText(catgories[i].name,'','cats',catgories[i].id);;
	    }
	    picker.add([pickerCats,pickerUnits]);
	    win.add(picker);
	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/manager/categories.json"));
  	xhr.send();	
};
getCategories();

function setUnitData() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		
		rowText('Select a Quantitative Unit','header','units',0);
		
	    for(i=0;i<items.length;i++) {
			//pickerUnits.addRow(Ti.UI.createPickerRow({title:items[i].name,id:items[i].id,fontSize:28}));
			rowText(items[i].name,'','units',items[i].id);
	    }
	    setCatData();
		//tableview.data = unit_data;
  	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("post error:" + e.error);
	};
  	xhr.open('GET', url("/units.json"));
  	xhr.send();	
};

function setCatData() {
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		var items = JSON.parse(this.responseText);
		
		rowText('Select a Category','header','cats',0);
	    for(i=0;i<items.length;i++) {
	    	
			//pickerCats.addRow(Ti.UI.createPickerRow({title:items[i].name,id:items[i].id,fontSize:28}));
			rowText(items[i].name,'','cats',items[i].id);;
	    }
	    picker.add([pickerCats,pickerUnits]);
	    win.add(picker);


		//tableview.data = data;
  	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("post error:" + e.error);
	};
  	xhr.open('GET', url("/categories.json"));
  	xhr.send();	
};
setUnitData();
*/

picker.addEventListener('change',function(e)
{
	if(e.columnIndex == 0) category_id = e.row.id;
	if(e.columnIndex == 1) unit_id = e.row.id;
	
	if((category_id > 0) && (unit_id > 0) && (nameField.value.length > 0)){
		invBtn.enabled = true;
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

var filterLbl = Ti.UI.createLabel({
	text: 'Filter Items',
	textAlign:'left',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});

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

var nameField = Ti.UI.createTextField({
  hintText:'New Item Name',
  height:32,
  right:6,
  top:36,
  left:6,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_ALPHA_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(nameField);

nameField.addEventListener('change',function(e)
{
	if((category_id > 0) && (unit_id > 0) && (nameField.value.length > 0)){
		invBtn.enabled = true;
	} else {
		invBtn.enabled = false;
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
		
	};
	// newer method - post directly to inventory
	xhr.open("PUT", url('/api/v1/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
	xhr.send({
		"utf8":"✓",
		//"inventory[items_attributes][][user_id]":Ti.App.Properties.getString('user_id'),
		"inventory[items_attributes][][name]":nameField.value,
		"inventory[items_attributes][][location_id]":location_id,
		"inventory[items_attributes][][unit_id]":unit_id,
		//"inventory[items_attributes][][category_id]":category_id,
		"inventory[items_attributes][][_destroy]":0,
		"inventory[items_attributes][][status]":2
		//"commit":"Update Inventory"
	});
	/* old method - post to global products
	xhr.open("POST", url('/manager/products.json'));
	xhr.send({
		"utf8":"✓",
		"product[name]":nameField.value,
		"product[category_id]":category_id,
		"product[unit_id]":unit_id
	});	
	*/ 
	
});

win.addEventListener("open", function(event, type) {
   nameField.focus();
    
});
