Ti.include('../shared/default.js');
//var product_name = win.product_name;
//var product_id = win.product_id;
//var product_unit = win.product_unit;
//var product_unit_id = win.product_unit_id;
var list_index = win.list_index;
var inventory = win.inventory;
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
		top:60,
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
		top:70,
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
	  top:130,
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
	  top:130,
	  right:20,
	  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
	  returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
	});
	view.add(orderField);
	
	var parLabel = Ti.UI.createLabel({
	  text:'Par',
	  height:35,
	  top:130,
	  left:20,
	  font:{fontWeight:'bold'},
	  color:'#444'
	});
	view.add(parLabel);
	
	var orderLabel = Ti.UI.createLabel({
	  text:'Order',
	  height:35,
	  top:130,
	  right:110,
	  font:{fontWeight:'bold'},
	  color:'#444'
	});
	view.add(orderLabel);
	
	var qtyLabel = Ti.UI.createLabel({
	  text:'Qty',
	  height:35,
	  top:70,
	  left:20,
	  font:{fontSize:18,fontWeight:'bold'},
	  color:'#fff'
	});
	view.add(qtyLabel);
	
	var unitLabel = Ti.UI.createLabel({
		text:unit,
		height:35,
		top:70,
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
			scrollView.views[e.source.index].children[5].hintText = (calc <=0) ? 0:calc;
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
			scrollView.views[e.source.index].children[5].hintText = (calc <=0) ? 0:calc;
			Titanium.API.info("calc: "+calc);
		}
	});
	views.push(view);
}

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

function updateInv() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("good");
		//win.close();
		/*
		if (i >= (scrollView.views.length-1)&&(i == i_lst)){
				Ti.App.fireEvent('popClose');
				win.close();
			}				
			if (i >= (scrollView.views.length-1)){
				//scrollView.scrollToView(scrollView.views[i]);
				//scrollView.views[i+1].children[3].focus();
				completed = true;
			}
		*/
		//win.setData();
		
	};
//yogesh added for testing 	alert(scrollView.views[i].children[3].value + "  "+scrollView.views[i].children[4].value +"  "+scrollView.views[i].children[5].value);
	if(scrollView.views[i].children[3].value > ''|| scrollView.views[i].children[4].value > '' || scrollView.views[i].children[5].value > ''){
			xhr.onerror = function(e) {
				Ti.API.info("post error:" + e.error);
							};
			xhr.open("PUT", url('/manager/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
			
			
			if(inventory[i].product){
				xhr.send({
					//"inventory[user_id]":Ti.App.Properties.getString('user_id'),
					"utf8":"✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]":location_id,
					"inventory[items_attributes][][unit_id]":inventory[i].unitid?inventory[i].unitid:null,
					"inventory[items_attributes][][quantity]":scrollView.views[i].children[3].value?scrollView.views[i].children[3].value:inventory[i].quantity,
					"inventory[items_attributes][][par]":scrollView.views[i].children[4].value?scrollView.views[i].children[4].value:inventory[i].par,
					"inventory[items_attributes][][order]":scrollView.views[i].children[5].value?scrollView.views[i].children[5].value:inventory[i].order,
					"inventory[items_attributes][][id]":inventory[i].id,
					"inventory[items_attributes][][product_id]":inventory[i].product_id,
					"inventory[items_attributes][][_destroy]":0,
					"inventory[items_attributes][][status]":1
		
				});
			} else {
					xhr.send({
					"utf8":"✓",
					//"inventory[user_id]":Ti.App.Properties.getString('r_id'),
					"inventory[items_attributes][][location_id]":location_id,
					"inventory[items_attributes][][unit_id]":inventory[i].unitid?inventory[i].unitid:null,
					"inventory[items_attributes][][quantity]":scrollView.views[i].children[3].value?scrollView.views[i].children[3].value:inventory[i].quantity,
					"inventory[items_attributes][][par]":scrollView.views[i].children[4].value?scrollView.views[i].children[4].value:inventory[i].par,
					"inventory[items_attributes][][order]":scrollView.views[i].children[5].value?scrollView.views[i].children[5].value:inventory[i].order,
					"inventory[items_attributes][][id]":inventory[i].id,
					"inventory[items_attributes][][name]":inventory[i].name,
					"inventory[items_attributes][][_destroy]":0,
					"inventory[items_attributes][][status]":1
				});
			}
		}
	}

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
{
	 updateInv();
	if (i === (scrollView.views.length-1)){ 
	//	alert("Item's  Updated");  //added by yogesh
	// closed by yogesh	Ti.App.fireEvent('popClose');
		
	// closed by yogesh	win.close();
		
		return; 
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

cancelBtn.addEventListener('click', function() {
	 updateInv();
	Ti.App.fireEvent('popClose');
	win.close();
});

/*
if (Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad')
{
	// set toolbar
	win.setToolbar([flexSpace,left,change,add,jump,right,flexSpace]);
}
else
{
	var toolbar = Titanium.UI.createView({
		bottom: 10,
		height: 50,
		backgroundColor: '#333333',
		borderRadius: 10,
		opacity: 0.3,
		left: 10,
		right: 10
	});

	var floater = Titanium.UI.createView({
		left:10,
		right:10,
		height: 'auto',
		opacity: 0
	});

	toolbar.add(floater);

	left.left = 10;
	left.width = 30;

	change.left = 50;
	change.width = 70;
	change.height = 35;

	add.left = 130;
	add.width = 70;
	add.height = 35;

	jump.left = 210;
	jump.width = 70;
	jump.height = 35;

	right.right = 10;
	right.width = 30;

	floater.add(left);
	floater.add(change);
	floater.add(add);
	floater.add(jump);
	floater.add(right);
	*/
	win.add(toolbar);
//}

win.addEventListener("open", function(event, type) {
	scrollView.currentPage=list_index;
	//Ti.API.info("VIEWS:" + scrollView.views[list_index].children[0].text);
    scrollView.views[list_index].children[3].focus();
});