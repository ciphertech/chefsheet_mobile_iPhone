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
var clickedT = 1;
var inventory_unit_qty=win.pInventory_unit_qty;
var inventory_unit_id=win.pInventory_unit_id;
var inventory_unit=win.pInventory_unit;
var recipe_unit_id=win.pRecipe_unit_id;
var recipe_unit_qty=win.pRecipe_unit_qty;
var recipe_unit=win.pRecipe_unit;

var product_price = win.pProduct_price;  			
var inventory_unit_price = win.pInventory_unit_price;
var recipe_unit_price  =  win.pRecipe_unit_price;	

var if_changed_save=false;


Ti.API.info("inv_id:"+inv_id);
/*pInventory_unit_qty=e.row.product_recipe_qty;
			pInventory_unit_id=e.row.product_inventory_id;
			pRecipe_unit_id=e.row.product_recipe_id;
			pRecipe_unit_qty=e.row.product_recipe_qty;
			*/

/*
if (Ti.App.Properties.getString('inventory_id') == null) {
	alert("inventory_id is null");
}
if (location_id == null) {
	alert("location_id is null");
}
*/
//alert(product_id);
var catBG = Titanium.UI.createImageView({
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
	top:30,
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
  height:40,
  width: 100,
  top:35,
  left:60,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(qtyField);

var parField = Ti.UI.createTextField({
  hintText: product_par !=null?product_par:'Par',
  height:35,
  width:70,
  top:100,
  left:60,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(parField);

var parLabel = Ti.UI.createLabel({
  text:'Par',
  height:35,
  top:100,
  left:20,
  font:{fontWeight:'bold'},
  color:'#444'
});
win.add(parLabel);

var orderField = Ti.UI.createTextField({
  hintText: product_order !=null?product_order:'Order',
  height:35,
  width: 70,
  top:100,
  right:20,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(orderField);

var orderLabel = Ti.UI.createLabel({
  text:'Order',
  height:35,
  top:100,
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
  top:40,
  left:20,
  font:{fontSize:18,fontWeight:'bold'},
  color:'#fff'
});
win.add(qtyLabel);

var unitLabel = Ti.UI.createLabel({
	text:product_unit,
	height:35,
	top:40,
	left:180,
	font:{fontSize:18,fontWeight:'bold'},
	color:'#fff'
});
win.add(unitLabel);

	
	
	
qtyField.addEventListener('change', function(e) {
	if_changed_save=true;
	
		if(e.value && (parField.value || parField.hintText !="Par")) {
			var calc;
			if (!parField.value && parField.hintText !="Par") {
				calc = parField.hintText - e.value;
			} else {
				calc = parField.value - e.value;
			}
			orderField.value = (calc <=0) ? 0:calc;
			if(orderField.value=='NaN'){
				orderField.value=0;
			}
			Titanium.API.info("calc: "+calc);
		}
		if(qtyField.value==''){
					if_changed_save=false;
		}
	});
	
	parField.addEventListener('change', function(e) {
			if_changed_save=true;
			
			if(e.value && (qtyField.value || qtyField.hintText !="Count")) {
			//var calc = e.value - parField.value;
			var calc;
			if (!qtyField.value && qtyField.hintText !="Qty") {
				calc = e.value - qtyField.hintText;
			} else {
				calc = e.value - qtyField.value;
			}
			orderField.value = (calc <=0) ? 0:calc;
			if(orderField.value=='NaN'){
				orderField.value=0;
			}
			Titanium.API.info("calc: "+calc);
		}
		if(qtyField.value==''){
				qtyField.value=qtyField.hintText;
		}
	});

var invBtn =  Titanium.UI.createButton({
	title:'Save',
	
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var nxtBtn =  Titanium.UI.createButton({
	title:'Skip',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Cancel',	
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
	items:[invBtn,cancelBtn]
	});
}
var unitTypeLabel = Ti.UI.createLabel({
		text:"Select Unit Type -",
		height:35,
		left:30
		
				
	});
var unitType = Titanium.UI.createButton({            
        left:100,
        height:33,
        width:140,      
        title:"Purchase",                           
        style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED                                    
    });

var toolbar2 =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:40,
	items:[unitTypeLabel,unitType]
});

win.add(toolbar2);


win.add(toolbar);
// cancel events
cancelBtn.addEventListener('click', function() {
	Ti.App.fireEvent('popClose');
	win.close();
});

win.addEventListener('swipe', enterItem);
invBtn.addEventListener('click', enterItem);

function enterItem() {
	if(if_changed_save){
		
	var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {
Ti.App.fireEvent('popClose');
		win.close();
		};
		xhr.onerror = function(e) {
		
			Ti.API.info("post error:" + e.error);

		};
		
		xhr.open("PUT", url('/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json'));
	
		try {
			if (unitType.title == 'Purchase') {
			
				if (product_id > 0) {
					
					
						var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_purchase_recipe=false;
						var inventory_Count=0;
                var recipe_Count=0;

try{					
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (product_price>0  && inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (product_price>0   && recipe_unit_price >0){
	
	relation_between_purchase_recipe=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;
 recipe_Count=(product_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;

}else if(relation_between_purchase_recipe)
{
  recipe_Count=(product_price * qtyField.value)/recipe_unit_price;

}
					
}catch(exx){
	
}											
					
					
					
						var params={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
						
					xhr.send(params);
					
				} else {
		
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_purchase_recipe=false;
						var inventory_Count=0;
                var recipe_Count=0;

try{					
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (product_price>0  && inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (product_price>0   && recipe_unit_price >0){
	
	relation_between_purchase_recipe=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;
 recipe_Count=(product_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;

}else if(relation_between_purchase_recipe)
{
  recipe_Count=(product_price * qtyField.value)/recipe_unit_price;

}
					
}catch(exx){
	
}								
		
					var params={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
						
					xhr.send(params);
					
				}
			} else if (unitType.title == 'Inventory') {

				if (product_id > 0) {
						var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_recipe_inventory=false;
						var purchase_Count=0;
                var recipe_Count=0;

					
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory_unit_price>0 &&  product_price>0  )
{
relation_between_purchase_inventory=true;

}else if (inventory_unit_price>0 &&   recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;
 recipe_Count=(inventory_unit_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;

}
if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 
					
					var parms2={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				} else {
		
 	var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_recipe_inventory=false;
						var purchase_Count=0;
                var recipe_Count=0;

					
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory_unit_price>0 &&  product_price>0  )
{
relation_between_purchase_inventory=true;

}else if (inventory_unit_price>0 &&   recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;
 recipe_Count=(inventory_unit_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;

}
if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 
					
					var parms2={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				}
				

			} else if (unitType.title == 'Recipe') {
				if (product_id > 0) {
					
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_recipe_inventory=false;
						var relation_between_purchase_recipe=false;
						var purchase_Count=0;
                var inventory_Count=0;

					//****
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (recipe_unit_price>0 &&  product_price>0 )
{
relation_between_purchase_recipe=true;

}else if (inventory_unit_price>0   && recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;
 inventory_Count=(recipe_unit_price * qtyField.value)/inventory_unit_price;


}else if(relation_between_purchase_recipe)
{
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;

}

if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 var params3={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
						"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,          
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
				};
					xhr.send(params3);
				
				} else {
				
 
 	var relation_between_purchase_inventory_recipe=false;
						var relation_between_recipe_inventory=false;
						var relation_between_purchase_recipe=false;
						var purchase_Count=0;
                var inventory_Count=0;

					//****
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (recipe_unit_price>0 &&  product_price>0 )
{
relation_between_purchase_recipe=true;

}else if (inventory_unit_price>0   && recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;
 inventory_Count=(recipe_unit_price * qtyField.value)/inventory_unit_price;


}else if(relation_between_purchase_recipe)
{
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;

}

if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 var params3={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
						"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,          
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
				};
					xhr.send(params3);
				}
				
			}
		} 
		catch(e) {		} 
		}else{
			Ti.App.fireEvent('popClose');
		win.close();
		}
	
};

win.addEventListener("open", function(event, type) {
    qtyField.focus();
});


	unitType.addEventListener('click', function() {
if(if_changed_save)
{
	return;
}		
enterItem2();

		
		if (clickedT == 1) {
if (inventory_unit_qty != null) {
					qtyField.hintText = inventory_unit_qty;
					unitLabel.text = inventory_unit;
					unitType.title = "Inventory";
			clickedT = 2;
		}else if(recipe_unit_qty != null) {
					qtyField.hintText = recipe_unit_qty;
					unitLabel.text = recipe_unit;
					unitType.title = "Recipe";
					clickedT = 3;
				}
				else{
			
			unitLabel.text =product_unit;
				qtyField.hintText = product_qty;
				unitType.title = "Purchase";
		}
			
		} else if (clickedT == 2) {
			if (recipe_unit_qty != null) {
					qtyField.hintText = recipe_unit_qty;
					unitLabel.text = recipe_unit;
					unitType.title = "Recipe";
			clickedT = 3;
			}else{
			qtyField.hintText = product_qty;
				unitLabel.text = product_unit;
				unitType.title = "Purchase";
		}
			
		} else {
			clickedT = 1;
			try {
				qtyField.hintText = product_qty;
				unitLabel.text = product_unit;
				unitType.title = "Purchase";
			
			} catch(e) {

			}

		}
	});

	function enterItem2() {

		//alert("productlocation_id:"+location_id);
		if(if_changed_save){
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(e) {

		};
		xhr.onerror = function(e) {
			Ti.API.info("post error:" + e.error);

		};
		xhr.open("PUT", url('/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json'));
		
			try {
			if (unitType.title == 'Purchase') {
				alert("I am in ");
				if (product_id > 0) {
					
					
						var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_purchase_recipe=false;
						var inventory_Count=0;
                var recipe_Count=0;

try{					
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (product_price>0  && inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (product_price>0   && recipe_unit_price >0){
	
	relation_between_purchase_recipe=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;
 recipe_Count=(product_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;

}else if(relation_between_purchase_recipe)
{
  recipe_Count=(product_price * qtyField.value)/recipe_unit_price;

}
					
}catch(exx){
	
}											
					
					
					
						var params={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
						
					xhr.send(params);
					
				} else {
		
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_purchase_recipe=false;
						var inventory_Count=0;
                var recipe_Count=0;

try{					
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (product_price>0  && inventory_unit_price>0)
{
relation_between_purchase_inventory=true;

}else if (product_price>0   && recipe_unit_price >0){
	
	relation_between_purchase_recipe=true;
}


if(relation_between_purchase_inventory_recipe)
{
	
 inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;
 recipe_Count=(product_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  inventory_Count=(product_price * qtyField.value)/inventory_unit_price ;

}else if(relation_between_purchase_recipe)
{
  recipe_Count=(product_price * qtyField.value)/recipe_unit_price;

}
					
}catch(exx){
	
}								
		
					var params={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][unit_id]":product_unit_id,
						"inventory[items_attributes][][quantity]" : qtyField.value ? qtyField.value : product_quantity,
						"inventory[items_attributes][][inventory_unit_qty]" : inventory_Count,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,	
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					};
						
					xhr.send(params);
					
				}
			} else if (unitType.title == 'Inventory') {

				if (product_id > 0) {
						var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_recipe_inventory=false;
						var purchase_Count=0;
                var recipe_Count=0;

					
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory_unit_price>0 &&  product_price>0  )
{
relation_between_purchase_inventory=true;

}else if (inventory_unit_price>0 &&   recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;
 recipe_Count=(inventory_unit_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;

}
if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 
					
					var parms2={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				} else {
		
 	var relation_between_purchase_inventory_recipe=false;
						var relation_between_purchase_inventory=false;
						var relation_between_recipe_inventory=false;
						var purchase_Count=0;
                var recipe_Count=0;

					
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (inventory_unit_price>0 &&  product_price>0  )
{
relation_between_purchase_inventory=true;

}else if (inventory_unit_price>0 &&   recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;
 recipe_Count=(inventory_unit_price * qtyField.value)/recipe_unit_price;


}else if(relation_between_purchase_inventory)
{
  purchase_Count=(inventory_unit_price * qtyField.value)/product_price ;

}
if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 
					
					var parms2={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][inventory_unit_id]":inventory_unit_id,
						"inventory[items_attributes][][inventory_unit_qty]" : qtyField.value ? qtyField.value : 0,
						"inventory[items_attributes][][recipe_unit_qty]" : recipe_Count,
							"inventory[items_attributes][][quantity]" : purchase_Count, 
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
					}
					xhr.send(parms2);

				}
				

			} else if (unitType.title == 'Recipe') {
				if (product_id > 0) {
					
					var relation_between_purchase_inventory_recipe=false;
						var relation_between_recipe_inventory=false;
						var relation_between_purchase_recipe=false;
						var purchase_Count=0;
                var inventory_Count=0;

					//****
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (recipe_unit_price>0 &&  product_price>0 )
{
relation_between_purchase_recipe=true;

}else if (inventory_unit_price>0   && recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;
 inventory_Count=(recipe_unit_price * qtyField.value)/inventory_unit_price;


}else if(relation_between_purchase_recipe)
{
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;

}

if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 var params3={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
						"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,          
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][product_id]" : product_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
				};
					xhr.send(params3);
				
				} else {
				
 
 	var relation_between_purchase_inventory_recipe=false;
						var relation_between_recipe_inventory=false;
						var relation_between_purchase_recipe=false;
						var purchase_Count=0;
                var inventory_Count=0;

					//****
					
try{							
if(product_price>0  && inventory_unit_price>0  && recipe_unit_price >0)
{
relation_between_purchase_inventory_recipe=true;

}else if (recipe_unit_price>0 &&  product_price>0 )
{
relation_between_purchase_recipe=true;

}else if (inventory_unit_price>0   && recipe_unit_price >0 ){
	
	relation_between_recipe_inventory=true;
}



if(relation_between_purchase_inventory_recipe)
{
	
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;
 inventory_Count=(recipe_unit_price * qtyField.value)/inventory_unit_price;


}else if(relation_between_purchase_recipe)
{
 purchase_Count=(recipe_unit_price * qtyField.value)/product_price ;

}

if(!(product_price>0) || product_price == null){
	purchase_Count=product_qty;
}
}catch(exx){}							
 var params3={
						//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
						"utf8" : "✓",
						"inventory[items_attributes][][location_id]" : location_id,
						//"inventory[items_attributes][][recipe_unit_id]":recipe_unit_id,
						"inventory[items_attributes][][recipe_unit_qty]" : qtyField.value ? qtyField.value :0,
						"inventory[items_attributes][][quantity]" : purchase_Count, 
                        	"inventory[items_attributes][][inventory_unit_qty]" :inventory_Count,          
						"inventory[items_attributes][][par]" : parField.value ? parField.value : product_par,
						"inventory[items_attributes][][order]" : orderField.value ? orderField.value : product_order,
						"inventory[items_attributes][][id]" : inv_id,
						"inventory[items_attributes][][name]" : product_name,
						"inventory[items_attributes][][_destroy]" : 0,
						"inventory[items_attributes][][status]" : 1
				};
					xhr.send(params3);
				}
				
			}
		} 
		catch(e) {		} 
		
		}else{}
	};

