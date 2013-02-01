Ti.include('../shared/default.js');
var product_name = win.product_name;
var inv_id = win.inv_id;
var product_id = win.product_id;
var product_unit = win.product_unit;
var product_unit_id = win.product_unit_id;
var category_id = win.category_id;
var location_id = win.location_id;
var product_qty = win.product_qty;
var product_par = win.product_par;
var product_order = win.product_order;
var product_img = win.product_img;
var autoFlow = win.autoFlow;



Ti.API.info("inv_id:"+inv_id);
/*
if (Ti.App.Properties.getString('inventory_id') == null) {
	alert("inventory_id is null");
}
if (location_id == null) {
	alert("location_id is null");
}
*/
//alert(product_id);
var catBG = Titanium.UI.create
View({
    	//image:'../../images/categories/bg'+category_id+'.png',
    	image:cropImage(product_img,340,340,320,240),
		right:0,
		top:0,
		opacity:.4,
		//width:240,
		preventDefaultImage:true
	});
	win.add(catBG);


var itemLabel = Ti.UI.createLabel({
      text:product_name,
      font:{fontSize:(product_name.length>=48)?14:18,fontWeight:'bold'},
      top:10,
      left:20,
      height:'auto'
    });
win.add(itemLabel);

var bg = Titanium.UI.createView({
	top:60,
	left:10,
	right:10,
	height:55,
	backgroundColor: '#000',
	opacity: 0.4,
	borderRadius:8
});
win.add(bg);

var qtyField = Ti.UI.createTextField({
  hintText: product_qty !=null?product_qty:'Count',
  height:35,
  width: 100,
  top:70,
  left:60,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(qtyField);

var parField = Ti.UI.createTextField({
  hintText: product_par !=null?product_par:'Par',
  height:35,
  width: 70,
  top:130,
  left:60,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(parField);

var parLabel = Ti.UI.createLabel({
  text:'Par',
  height:35,
  top:130,
  left:20,
  font:{fontWeight:'bold'},
  color:'#444'
});
win.add(parLabel);

var orderField = Ti.UI.createTextField({
  hintText: product_order !=null?product_order:'Order',
  height:35,
  width: 70,
  top:130,
  right:20,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(orderField);

var orderLabel = Ti.UI.createLabel({
  text:'Order',
  height:35,
  top:130,
  right:110,
  font:{fontWeight:'bold'},
  color:'#444'
});
win.add(orderLabel);


/*
var unitField = Ti.UI.createButton({
  title:product_unit,
  height:35,
  width: 100,
  top:60,
  right:20
});
win.add(unitField);
*/
var qtyLabel = Ti.UI.createLabel({
  text:'Qty',
  height:35,
  top:70,
  left:20,
  font:{fontSize:18,fontWeight:'bold'},
  color:'#fff'
});
win.add(qtyLabel);

var unitLabel = Ti.UI.createLabel({
	text:product_unit,
	height:35,
	top:70,
	left:180,
	font:{fontSize:18,fontWeight:'bold'},
	color:'#fff'
});
win.add(unitLabel);

qtyField.addEventListener('change', function(e) {
		if(e.value && (parField.value || parField.hintText !="Par")) {
			var calc;
			if (!parField.value && parField.hintText !="Par") {
				calc = parField.hintText - e.value;
			} else {
				calc = parField.value - e.value;
			}
			orderField.hintText = (calc <=0) ? 0:calc;
			Titanium.API.info("calc: "+calc);
		}
	});
	
	parField.addEventListener('change', function(e) {
		if(e.value && (qtyField.value || qtyField.hintText !="Qty")) {
			//var calc = e.value - parField.value;
			var calc;
			if (!qtyField.value && qtyField.hintText !="Qty") {
				calc = e.value - qtyField.hintText;
			} else {
				calc = e.value - qtyField.value;
			}
			orderField.hintText = (calc <=0) ? 0:calc;
			Titanium.API.info("calc: "+calc);
		}
	});

var invBtn =  Titanium.UI.createButton({
	title:'Add',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var nxtBtn =  Titanium.UI.createButton({
	title:'Skip',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Done',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var flowLbl = Ti.UI.createLabel({
	text: 'Auto Flow',
	textAlign:'center',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});
 
var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
if (autoFlow == false) {
	var toolbar =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	items:[invBtn,spacer,cancelBtn]
	});
} else {
	var toolbar =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	items:[invBtn,spacer,flowLbl,spacer,cancelBtn]
	});
}

win.add(toolbar);
// cancel events
cancelBtn.addEventListener('click', function() {
	Ti.App.fireEvent('popClose');
	win.close();
});

win.addEventListener('swipe', enterItem);
invBtn.addEventListener('click', enterItem);

function enterItem() {
	
	//alert("productlocation_id:"+location_id);
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("good");
		Ti.App.fireEvent('popClose');
		win.close();
		//win.setData();
	};
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
	
	};
	xhr.open("PUT", url('/manager/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
	if(product_id>0){
		xhr.send({
		//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
		"utf8":"✓",
		"inventory[items_attributes][][location_id]":location_id,
		//"inventory[items_attributes][][unit_id]":product_unit_id,
		"inventory[items_attributes][][quantity]":qtyField.value?qtyField.value:product_quantity,
		"inventory[items_attributes][][par]":parField.value?parField.value:product_par,
		"inventory[items_attributes][][order]":orderField.value?orderField.value:product_order,
		"inventory[items_attributes][][id]":inv_id,
		"inventory[items_attributes][][product_id]":product_id,
		"inventory[items_attributes][][_destroy]":0,
		"inventory[items_attributes][][status]":1

		});
	} else {
		xhr.send({
		//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
		"utf8":"✓",
		"inventory[items_attributes][][location_id]":location_id,
		//"inventory[items_attributes][][unit_id]":product_unit_id,
		"inventory[items_attributes][][quantity]":qtyField.value?qtyField.value:product_quantity,
		"inventory[items_attributes][][par]":parField.value?parField.value:product_par,
		"inventory[items_attributes][][order]":orderField.value?orderField.value:product_order,
		"inventory[items_attributes][][id]":inv_id,
		"inventory[items_attributes][][name]":product_name,
		"inventory[items_attributes][][_destroy]":0,
		"inventory[items_attributes][][status]":1
	});
	}
};

win.addEventListener("open", function(event, type) {
    qtyField.focus();
});


