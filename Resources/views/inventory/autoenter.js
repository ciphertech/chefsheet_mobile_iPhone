Ti.include('../shared/default.js');
//var product_name = win.product_name;
//var product_id = win.product_id;
//var product_unit = win.product_unit;
//var product_unit_id = win.product_unit_id;
var list_index = win.list_index;
var inventory = win.inventory;
var issaved = true;

 
 var clickedT=1;
var location_id = win.location_id;
var autoFlow = win.autoFlow;
var completed = false;


views = [];


var nxtBtn =  Titanium.UI.createButton({
	title:'Skip',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var cancelBtn =  Titanium.UI.createButton({
	title:'Done',
	
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

//this appears at counting items section
var flowLbl = Ti.UI.createLabel({
	text: 'Multi-Count',
	textAlign:'center',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});
/*
var qtyField = Ti.UI.createTextField({
  hintText:'Count',
  height:0,
  width: 100,
  top:60,
  left:20,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});
win.add(qtyField);
*/

//get unit names
units = _.groupBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) { return e.id });
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });

for(i=0;i<inventory.length;i++) { 
	var view = Ti.UI.createView({
		backgroundColor:'#eee',
		borderColor:'#666',
		borderRadius:10,
		borderWidth:1
	});
	Ti.API.info('test......');
	Ti.API.info(inventory[i].id);
	
	//var catBG_id = inventory[i].product?inventory[i].product.category_id:0;
	var catBG = Titanium.UI.createImageView({
		    	//image:'../../images/categories/bg'+catBG_id+'.png',
		    	image:cropImage(prodImg(inventory[i],'medium'),340,340,320,240),
				right:0,
				top:0,
				//width:300,
				opacity:.4,
				preventDefaultImage:true
	});
	view.add(catBG);
	
	var product_name = inventory[i].product?inventory[i].product.name:inventory[i].name;
	
	var itemLabel = Ti.UI.createLabel({
		text:product_name,
		font:{fontSize:(product_name.length>=48)?14:18,fontWeight:'bold'},
		top:10,
		left:20,
		height:'auto'
    });
	view.add(itemLabel);
	
	var unit = 'units';
  	if(inventory[i].unit_id == null || inventory[i].unit_id == undefined || inventory[i].unit_id == 0) {
  		unit = 'No Unit';
  	} else {
  		unit = units[inventory[i].unit_id][0].name;
  	}
	

	
	
	var bg = Titanium.UI.createView({
		top:35,
		left:10,
		right:10,
		height:55,
		backgroundColor: '#000',
		opacity: 0.4,
		borderRadius:8
	});
	view.add(bg);

	var qtyField = Ti.UI.createTextField({
		hintText:inventory[i].quantity!=null?inventory[i].quantity:'Count',
		height:35,
		width: 100,
		top:40,
		left:60,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	  index:i
	});
	view.add(qtyField);
	
	var parField = Ti.UI.createTextField({
	  hintText: inventory[i].par !=null?inventory[i].par:'Par',
	  height:35,
	  width: 70,
	  top:100,
	  left:60,
	  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
	  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	  index:i
	});
	view.add(parField);
	
	var orderField = Ti.UI.createTextField({
	  hintText: inventory[i].order !=null?inventory[i].order:'Order',
	  height:35,
	  width: 70,
	  top:100,
	  right:20,
	  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
	  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
	});
	view.add(orderField);
	
	var parLabel = Ti.UI.createLabel({
	  text:'Par',
	  height:35,
	  top:100,
	  left:20,
	  font:{fontWeight:'bold'},
	  color:'#444'
	});
	view.add(parLabel);
	
	var orderLabel = Ti.UI.createLabel({
	  text:'Order',
	  height:35,
	  top:100,
	  right:110,
	  font:{fontWeight:'bold'},
	  color:'#444'
	});
	view.add(orderLabel);
	
	var qtyLabel = Ti.UI.createLabel({
	  text:'Qty',
	  height:35,
	  top:40,
	  left:20,
	  font:{fontSize:18,fontWeight:'bold'},
	  color:'#fff'
	});
	view.add(qtyLabel);
	
	var unitLabel = Ti.UI.createLabel({
		text:unit,
		height:35,
		top:40,
		left:180,
		font:{fontSize:18,fontWeight:'bold'},
		color:'#fff'
	});
	view.add(unitLabel);
	
	
	
	
	
	

 
 	


 
 
	qtyField.addEventListener('change', function(e) {
		if(e.value && (scrollView.views[e.source.index].children[4].value || scrollView.views[e.source.index].children[4].hintText !="Par")) {
			var calc;
			if (!scrollView.views[e.source.index].children[4].value && scrollView.views[e.source.index].children[4].hintText !="Par") {
				calc = scrollView.views[e.source.index].children[4].hintText - e.value;
			} else {
				calc = scrollView.views[e.source.index].children[4].value - e.value;
			}
			scrollView.views[e.source.index].children[5].value = (calc <=0) ? 0:calc;
			Titanium.API.info("calc: "+calc);
		}
	});
	
	parField.addEventListener('change', function(e) {
		if(e.value && (scrollView.views[e.source.index].children[3].value || scrollView.views[e.source.index].children[3].hintText !="Count")) {
			//var calc = e.value - scrollView.views[e.source.index].children[4].value;
			var calc;
			if (!scrollView.views[e.source.index].children[3].value && scrollView.views[e.source.index].children[3].hintText !="Count") {
				calc = e.value - scrollView.views[e.source.index].children[3].hintText;
			} else {
				calc = e.value - scrollView.views[e.source.index].children[3].value;
			}
			scrollView.views[e.source.index].children[5].value = (calc <=0) ? 0:calc;
			Titanium.API.info("calc: "+calc);
		}
	});
	views.push(view);
}//end of for

 

var scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:false,
	//pagingControlHeight:30,
	maxZoomScale:1.0,
	currentPage:list_index
});

win.add(scrollView);
var i_lst= -1 ;
var i=list_index; 
var activeView = scrollView.views[i];

scrollView.addEventListener('scroll', function(e)
{
	activeView = e.view;  // the object handle to the view that is about to become visible

   updateInv();
   clickedT=1;
	unitType.title="Purchase";
	i_lst = i;
	i = e.currentPage;

	scrollView.views[i].children[3].focus();
	Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
	Titanium.API.info("scroll called - last index " + i_lst + ' active view ' + activeView);

	if (i >= (scrollView.views.length)&&(i == i_lst)){    //scrollView.views.length-1  before changed to scrollView.views.length by yogesh
				updateInv();
				
				Ti.App.fireEvent('popClose');
				win.close();
	}				
	if (i >= (scrollView.views.length )){  //scrollView.views.length-1 before changed to scrollView.views.length by yogesh
		
		completed = true;
	}
});

scrollView.addEventListener('click', function(e)
{
	Ti.API.info('ScrollView received click event, source = ' + e.source);
});
scrollView.addEventListener('touchend', function(e)
{
	Ti.API.info('ScrollView received touchend event, source = ' + e.source);
});
scrollView.addEventListener('swipe', function(e)
{
	Ti.API.info('ScrollView received swipe event, direction = ' + e.direction);
	if(scrollView.currentPage == scrollView.views.length-1 && e.direction == 'left') {
		 updateInv();
		Ti.App.fireEvent('popClose');
		win.close();
	}
});


scrollView.addEventListener('scrollEnd', function()
{
	Titanium.API.info("scrollEnd called");
	if(completed == true) {
		scrollView.currentPage = i;
		scrollView.removeView(scrollView.views[i]);
		completed = false;
	}
});
/*
// add button to dynamically add a view
var add = Titanium.UI.createButton({
	title:'Add',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
add.addEventListener('click',function()
{
	var newView = Ti.UI.createView({
		backgroundColor:'purple'
	});
	var l = Ti.UI.createLabel({
		text:'View ' + (scrollView.views.length+1),
		color:'#fff',
		width:'auto',
		height:'auto'
	});
	newView.add(l);
	scrollView.addView(newView);
});

// jump button to dynamically change go directly to a page (non-animated)
var jump = Titanium.UI.createButton({
	title:'Jump',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
jump.addEventListener('click',function()
{
	i = (scrollView.currentPage + 1) % scrollView.views.length;
	scrollView.currentPage = i;
});

// change button to dynamically change a view
var change = Titanium.UI.createButton({
	title:'Change',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
change.addEventListener('click',function()
{
	var newView = Ti.UI.createView({
		backgroundColor:'#ff9900'
	});
	var l = Ti.UI.createLabel({
		text:'View (Changed) ' + (i+1),
		color:'#fff',
		height:'auto',
		width:'auto'
	});
	newView.add(l);
	var ar = [];
	for (var x=0;x<scrollView.views.length;x++)
	{
		if (x==i)
		{
			Ti.API.info('SETTING TO NEW VIEW ' + x);
			ar[x] = newView;
		}
		else
		{
			Ti.API.info('SETTING TO OLD VIEW ' + x);

			ar[x] = scrollView.views[x];
		}
	}
	scrollView.views = ar;
});
*/

// move scroll view left
var left = Titanium.UI.createButton({
	image:'../../images/25-circle-west.png'
});
left.addEventListener('click', function(e)
{
	clickedT=1;
	unitType.title="Purchase";
	updateInv();
	if (i === 0){ // alert("Item's  Updated");  //added by yogesh 
	return; }
	//i--;
	scrollView.scrollToView(i-1);
});

// move scroll view right
var right = Titanium.UI.createButton({
	image:'../../images/21-circle-east.png'
});
right.addEventListener('click', function(e)
{clickedT=1;
	unitType.title="Purchase";
	 
	if (i === (scrollView.views.length-1)){ 
	//	alert("Item's  Updated");  //added by yogesh
	updateInv2();
		return; 
	}else{
		updateInv();
	}
	//i++;
	scrollView.scrollToView(scrollView.views[i+1]);
	
	
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	//items:[invBtn,spacer,flowLbl,spacer,cancelBtn]
	//items:[flexSpace,left,change,add,jump,right,flexSpace]
	items:[left,flowLbl,right,flexSpace,cancelBtn]
});

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
cancelBtn.addEventListener('click', updateInv2);

//bidyut nath
//call method to save count on button title change



win.add(toolbar);
win.addEventListener("open", function(event, type) {
	scrollView.currentPage=list_index;
	//Ti.API.info("VIEWS:" + scrollView.views[list_index].children[0].text);
    scrollView.views[list_index].children[3].focus();
});

function updateInv2() {
	try{
	Titanium.App.fireEvent('hide_indicator_auto');
	}catch(e)
	{
		
	}
	cancelBtn.enabled=false;
	unitType.enabled=false;
	Titanium.App.fireEvent('show_indicator_auto');
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		try{
	Titanium.App.fireEvent('hide_indicator_auto');
	}catch(e)
	{
		
	}
	cancelBtn.enabled=true;
	unitType.enabled=true;
		Ti.App.fireEvent('popClose');
		win.close();
		
		
	};

 
	if(scrollView.views[i].children[3].value !=null || scrollView.views[i].children[4].value !=null || scrollView.views[i].children[5].value !=null){
			xhr.onerror = function(e) {
				Ti.API.info("post error:" + e.error);
							};
			xhr.open("PUT", url('/manager/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
			
			//alert(inventory[i].product);
			
			// for recipe count
			try{
				if (unitType.title == 'Recipe') {
					if (inventory[i].product != null) {
						xhr.send({
							//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][recipe_unit_id]" : inventory[i].recipe_unit_id ? inventory[i].recipe_unit_id : null,
							"inventory[items_attributes][][recipe_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][product_id]" : inventory[i].product_id,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1

						});
					} else {
						xhr.send({
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][recipe_unit_id]" : inventory[i].recipe_unit_id ? inventory[i].recipe_unit_id : null,
							"inventory[items_attributes][][recipe_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][name]" : inventory[i].name,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1
						});
					}
				}
                }catch(e){}
			
			// for inventory count
			try{
				if (unitType.title == 'Inventory') {
					if (inventory[i].product != null) {
						xhr.send({
							//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][inventory_unit_id]" : inventory[i].inventory_unit_id ? inventory[i].inventory_unit_id : null,
							"inventory[items_attributes][][inventory_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][product_id]" : inventory[i].product_id,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1

						});
					} else {
						xhr.send({
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][inventory_unit_id]" : inventory[i].inventory_unit_id ? inventory[i].inventory_unit_id : null,
							"inventory[items_attributes][][inventory_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][name]" : inventory[i].name,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1
						});
					}
				}
                }catch(e){}
			
			
			// for purchase count
			try{
				if (unitType.title == 'Purchase') {
					if (inventory[i].product != null) {
						xhr.send({
							//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][unit_id]" : inventory[i].unitid ? inventory[i].unitid : null,
							"inventory[items_attributes][][quantity]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][product_id]" : inventory[i].product_id,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1

						});
					} else {
						xhr.send({
							"utf8" : "✓",
							//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
							"inventory[items_attributes][][location_id]" : location_id,
							"inventory[items_attributes][][unit_id]" : inventory[i].unitid ? inventory[i].unitid : null,
							"inventory[items_attributes][][quantity]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
							"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
							"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
							"inventory[items_attributes][][id]" : inventory[i].id,
							"inventory[items_attributes][][name]" : inventory[i].name,
							"inventory[items_attributes][][_destroy]" : 0,
							"inventory[items_attributes][][status]" : 1
						});
					}
				}
                }catch(e){}
			
			
			
		}
		setTimeout(function()
	{
		cancelBtn.enabled=true;
	unitType.enabled=true;
	alert("Please check internet connection");
	Ti.App.fireEvent('popClose');
		win.close();
	},25000);
	}




function updateInv() {
	var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function(e) {

};

if (scrollView.views[i].children[3].value != null || scrollView.views[i].children[4].value != null || scrollView.views[i].children[5].value != null) {
	xhr.onerror = function(e) {
		Ti.API.info("post error:" + e.error);
	};
	xhr.open("PUT", url('/manager/inventories/' + Ti.App.Properties.getString('inventory_id') + '.json'));

	//alert(inventory[i].product);

	// for recipe count
	try {
		if (unitType.title == 'Recipe') {
			if (inventory[i].product != null) {
				xhr.send({
					//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][recipe_unit_id]" : inventory[i].recipe_unit_id ? inventory[i].recipe_unit_id : null,
					"inventory[items_attributes][][recipe_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][product_id]" : inventory[i].product_id,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1

				});
			} else {
				xhr.send({
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][recipe_unit_id]" : inventory[i].recipe_unit_id ? inventory[i].recipe_unit_id : null,
					"inventory[items_attributes][][recipe_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][name]" : inventory[i].name,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1
				});
			}
		}
	} catch(e) {
	}

	// for inventory count
	try {
		if (unitType.title == 'Inventory') {
			if (inventory[i].product != null) {
				xhr.send({
					//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][inventory_unit_id]" : inventory[i].inventory_unit_id ? inventory[i].inventory_unit_id : null,
					"inventory[items_attributes][][inventory_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][product_id]" : inventory[i].product_id,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1

				});
			} else {
				xhr.send({
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][inventory_unit_id]" : inventory[i].inventory_unit_id ? inventory[i].inventory_unit_id : null,
					"inventory[items_attributes][][inventory_unit_qty]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][name]" : inventory[i].name,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1
				});
			}
		}
	} catch(e) {
	}

	// for purchase count
	try {
		if (unitType.title == 'Purchase') {
			if (inventory[i].product != null) {
				xhr.send({
					//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][unit_id]" : inventory[i].unitid ? inventory[i].unitid : null,
					"inventory[items_attributes][][quantity]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][product_id]" : inventory[i].product_id,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1

				});
			} else {
				xhr.send({
					"utf8" : "✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]" : location_id,
					"inventory[items_attributes][][unit_id]" : inventory[i].unitid ? inventory[i].unitid : null,
					"inventory[items_attributes][][quantity]" : scrollView.views[i].children[3].value ? scrollView.views[i].children[3].value : inventory[i].quantity,
					"inventory[items_attributes][][par]" : scrollView.views[i].children[4].value ? scrollView.views[i].children[4].value : inventory[i].par,
					"inventory[items_attributes][][order]" : scrollView.views[i].children[5].value ? scrollView.views[i].children[5].value : inventory[i].order,
					"inventory[items_attributes][][id]" : inventory[i].id,
					"inventory[items_attributes][][name]" : inventory[i].name,
					"inventory[items_attributes][][_destroy]" : 0,
					"inventory[items_attributes][][status]" : 1
				});
			}
		}
	} catch(e) {
	}

}

setTimeout(function() {

}, 10000);
}

//Bidyut Nath
// this method will save count when unitType button title gets changed.

unitType.addEventListener('click', function() {

	updateInv();
	if (clickedT == 1) {

		clickedT = 2;

		/*alert("Itemname000=="+scrollView.views[i].children[0].text);
		 alert("Itemname111=="+scrollView.views[i].children[1].text);
		 alert("Itemname222=="+scrollView.views[i].children[2].text);
		 alert("Itemname333=="+scrollView.views[i].children[3].value);
		 alert("Itemname444=="+scrollView.views[i].children[4].value);
		 alert("Itemname555=="+scrollView.views[i].children[5].text);
		 alert("Itemname666=="+scrollView.views[i].children[6].text);
		 alert("Itemname777=="+scrollView.views[i].children[7].text);
		 alert("Itemname888=="+scrollView.views[i].children[8].text);
		 alert("Itemname999=="+scrollView.views[i].children[9].text);*/

		try {

			scrollView.views[i].children[9].text = units[inventory[i].inventory_unit_id][0].name === null ? 'Qty' : units[inventory[i].inventory_unit_id][0].name;
			//unitLabel
			scrollView.views[i].children[3].value = inventory[i].inventory_unit_qty === null ? 'Count' : inventory[i].inventory_unit_qty;
			unitType.title = "Inventory";
			//QuanityTextBox
			//	alert(unit = units[inventory[i].unit_id][0].name);
		} catch(ex) {
			clickedT = 3;
			try {

				scrollView.views[i].children[9].text = units[inventory[i].recipe_unit_id][0].name === null ? 'Qty' : units[inventory[i].recipe_unit_id][0].name;
				if (inventory[i].recipe_unit_qty !== null) {
					scrollView.views[i].children[3].value = inventory[i].recipe_unit_qty;
				}

				unitType.title = "Recipe";

			} catch(ex) {
				unitType.title = "Purchase";
				clickedT = 1;
			}
		}

	} else if (clickedT == 2) {
		clickedT = 3;

		try {

			scrollView.views[i].children[9].text = units[inventory[i].recipe_unit_id][0].name === null ? 'Qty' : units[inventory[i].recipe_unit_id][0].name;
			if (inventory[i].recipe_unit_qty !== null) {
				scrollView.views[i].children[3].value = inventory[i].recipe_unit_qty;
			}

			unitType.title = "Recipe";

		} catch(ex) {
			unitType.title = "Purchase";
			clickedT = 1;
		}
	} else {
		clickedT = 1;

		try {

			scrollView.views[i].children[9].text = units[inventory[i].unit_id][0].name === null ? 'Qty' : units[inventory[i].unit_id][0].name;
			if (inventory[i].quantity !== null) {
				scrollView.views[i].children[3].value = inventory[i].quantity;
			}

			unitType.title = "Purchase";
			//	alert(unit = units[inventory[i].recipe_unit_id][0].name);
		} catch(ex) {

		}
	}
});

//Indicatorrrrrrrrrrrrrrrrrrrrrrrrr
var indWin = null;
var actInd = null;
function showIndicatorauto() {
	if (!is_android) {
		// window container
		indWin = Titanium.UI.createWindow({
			height : 120,
			width : 120
		});

		// black view
		var indView = Titanium.UI.createView({
			height : 120,
			width : 120,
			backgroundColor : '#000',
			borderRadius : 12,
			opacity : 0.7
		});
		indWin.add(indView);

		// loading indicator
		actInd = Titanium.UI.createActivityIndicator({
			style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
			height : 30,
			width : 30
		});
	}// brace took down 23rd B & Y
	if (!is_android) {
		indWin.add(actInd);

		// message
		var message = Titanium.UI.createLabel({
			text : 'Loading',
			color : '#fff',
			width : 'auto',
			height : 'auto',
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			},
			bottom : 20
		});
		indWin.add(message);
		indWin.open();

		actInd.show();

		setTimeout(function() {
			hideIndicatorauto();
		}, 25000);
	}
}

function hideIndicatorauto() {
	if (!is_android) {
		if (indWin) {

			indWin.close({
				opacity : 0,
				duration : 500
			});

		}
	}
}

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator_auto', function(e) {
	Ti.API.info("IN SHOW INDICATOR");
	showIndicatorauto();
});
Titanium.App.addEventListener('hide_indicator_auto', function(e) {
	Ti.API.info("IN HIDE INDICATOR");
	hideIndicatorauto();
});

