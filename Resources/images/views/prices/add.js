Ti.include('../shared/default.js');
var product_name = win.product_name;
var product_id = win.product_id;
var unit_id = 0;
var vendor_id = 0;
var location_id = win.location_id;


var pickerUnits = Ti.UI.createPickerColumn({opacity:0,width:'200%'});
var pickerVendors = Ti.UI.createPickerColumn({opacity:0,width:'380%'});

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
		pickerVendors.addRow(row);
	}
};
//get unit names
var units = JSON.parse(Ti.App.Properties.getString('units'));
rowText('Select a Unit','header','units',0);
for(i=0;i<units.length;i++) {
	rowText(units[i].name,'','units',units[i].id);
}

var vendors = {};
function getVendors() {
	var user_id = Ti.App.Properties.getString('user_id');
	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
		vendors = JSON.parse(this.responseText);
		rowText('Select a Vendor','header','vendors',0);
	    for(i=0;i<vendors.length;i++) {
	    	
			rowText(vendors[i].name,'','vendors',vendors[i].id);;
	    }
	    picker.add([pickerVendors,pickerUnits]);
	    win.add(picker);
	};
	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("get error:" + e.error);
	};
  	xhr.open('GET', url("/manager/vendors.json"));
  	xhr.send();	
};
getVendors();

var transformPicker = Titanium.UI.create2DMatrix().scale(0.5);
var picker = Ti.UI.createPicker({
	width: '200%',
	bottom:-10,
	transform:transformPicker,
	selectionIndicator:true
});

picker.addEventListener('change',function(e)
{
	if(e.columnIndex == 0) vendor_id = e.row.id;
	if(e.columnIndex == 1) unit_id = e.row.id;
	
	if((vendor_id > 0) && (unit_id > 0) && (priceField.value.length > 0)){
		invBtn.enabled = true;
	} else {
		invBtn.enabled = false;
	}
	Ti.API.info("vendor = "+vendor_id+": unit = "+unit_id);
});

var itemLabel = Ti.UI.createLabel({
      text:product_name,
      font:{fontSize:18,fontWeight:'bold'},
      top:10,
      left:10,
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

var priceField = Ti.UI.createTextField({
  hintText:'New Item Price',
  height:32,
  right:6,
  top:36,
  left:6,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(priceField);

priceField.addEventListener('change',function(e)
{
	if((vendor_id > 0) && (unit_id > 0) && (priceField.value.length > 0)){
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
		alert("post error: "+ e.error);
	};
	// newer method - post directly to inventory
	xhr.open("POST", url('/manager/prices.json'));
	xhr.send({
		"utf8":"✓",
		"price[product_id]":product_id,
		"price[unit_id]":unit_id,
		"price[user_id]":Ti.App.Properties.getString('r_id'),
		"price[vendor_id]":vendor_id,
		"price[unit_price]":priceField.value
		//"price[_destroy]":0,
	});
	
});

win.addEventListener("open", function(event, type) {
   priceField.focus();
    
});
