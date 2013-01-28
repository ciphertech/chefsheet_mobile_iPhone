Ti.include('../shared/default.js');
//Ti.include('autoenter.js');
Ti.API.info('User_id: '+ Ti.App.Properties.getString('user_id'));
Ti.API.info('Inventory_id: '+ Ti.App.Properties.getString('inventory_id'));
Ti.API.info('Location_id: '+ win.location_id);
Ti.App.addEventListener('switchTab', function (e) {
	if(e.tab == 'inventory') {
		win.close();
		hideIndicator();
	}
});

var location_id = win.location_id;
//alert("location_id:"+location_id);
var oCnt = 0;
var cCnt = 0;

var dataComplete = [];
var data = [];
var invComplete = [];
var inv = [];


try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
bgFrame(12,8,12,50);
Titanium.App.fireEvent('show_indicator');

var cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var flowLbl = Ti.UI.createLabel({
	text: 'Multi-Count',
	textAlign:'right',
	font:{fontWeight:'bold',fontSize:12},
	color:'#fff'
});

// autoflow switch
var tf = Titanium.UI.create2DMatrix().scale(0.75);
var flowSwitch = Titanium.UI.createSwitch({
	value:true,
	transform:tf
});
/* 
var done =  Titanium.UI.createButton({
	title:'Done',
	//style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
*/
var create =  Titanium.UI.createButton({
	title:'Add / Create Item',
	//style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
 
var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
// set toolbar
var toolbar =  Titanium.UI.iOS.createToolbar({
	barColor: '#1C4E7E',
	bottom:0,
	items:[flowSwitch,flowLbl,spacer,create]
});
win.add(toolbar);

var outstandingLabel = Ti.UI.createLabel({
  //text:'Outstanding Items',
  text:'Un-Counted Items',
  top:16,
  left:20,
  height:'auto',
  color:'#357'
});

win.add(outstandingLabel);

var cntBox1 = Ti.UI.createImageView({
	top:8,
	right:6,
	width:62,
	height:46,
	backgroundImage:'../../images/count-box.png'
});
win.add(cntBox1);

var cntBox2 = Ti.UI.createImageView({
	bottom:187,
	right:6,
	width:62,
	height:46,
	backgroundImage:'../../images/count-box.png'
});
win.add(cntBox2);

var tvOutBg = Ti.UI.createImageView({
	top:46,
	left:19,
	right:19,
	//height:130,
	bottom:231,
	borderRadius:8,
	borderColor:'#cde',
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvOutBg);

var tvOutstanding = Ti.UI.createTableView({
	top:46,
	left:20,
	right:20,
	//height:128,
	bottom:233,
	rowHeight:32,
	borderWidth:1,
	borderRadius:8,
	separatorColor:'#aaa',
	backgroundColor:'transparent',
	borderColor:'#999',
	editable:true,
	allowsSelectionDuringEditing:true,
	deleteButtonTitle:"Remove"
});

var tvBg = Ti.UI.createImageView({
	bottom:58,
	left:19,
	right:19,
	height:138,
	borderRadius:8,
	borderColor:'#cde',
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(tvBg);

var tvCompleted = Ti.UI.createTableView({
	bottom:60,
	left:20,
	right:20,
	height:136,
	borderWidth:1,
	borderRadius:8,
	rowHeight:32,
	separatorColor:'#aaa',
	backgroundColor:'transparent',
	borderColor:'#999'
});

//get unit names
units = _.groupBy(JSON.parse(Ti.App.Properties.getString('units')), function(e) { return e.id });
categories = _.groupBy(JSON.parse(Ti.App.Properties.getString('categories')), function(e) { return e.id });



function setData() {
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	invComplete = [];
	inv = [];
	dataComplete = [];
	data = [];
	Ti.API.info('reloading...');
	tvOutstanding.data = data;
	tvCompleted.data = dataComplete;
	
	oCnt = 0;
  		cCnt = 0;
  		//get all items including counted and un-counted
		var items = JSON.parse(Ti.App.Properties.getString("currInventory"));
		//Ti.API.info(items[location_id]);
	    for(i=0;i<items[location_id].length;i++) {
			var row = Titanium.UI.createTableViewRow({
				productitem:'',
				productunit:'',
				productid:0,
				unitname:'',
				unit_id:0,
				location_id:1,
				inv_id:0
			});
			//get one by one product
	      	var product = items[location_id][i];
	      	//alert(product);
	      	var unit = 'units';
	      	unit_id = product.unit_id;
	      	if(unit_id == null || unit_id == undefined || unit_id == 0) {
	      		unit = 'No Unit';
	      	} else {
	      		//get all unit names
	      		unit = units[unit_id][0].name;
	      	}
	      	
			//var ma = JSON.stringify(product.productlocation.product.inventoryitems);
			//var mas = ma.match(/quantity/i);
			//Ti.API.info("inventoryitems:" + ma);
			
			// p_name will contain product name one by one
			var p_name = product.product?product.product.name:product.name
			var productitem = Titanium.UI.createLabel({
				text:p_name,
				font:{fontSize:(p_name.length>=26)?10:14,fontWeight:'bold'},
				width:'70%',
				textAlign:'left',
				top:(p_name.length>=26)?2:6,//6,
				left:36, //10,
				height:'auto' //height:16
			});
			var thumb_id = product.product?product.product.category_id:0;
			Ti.API.info('product.category_i='+product.category_id);			
			
			var catThumb = Titanium.UI.createImageView({
		    	//image:'../../images/categories/'+thumb_id+'.png',
		    	//backgroundImage:prodImg(product,'medium'),
		    	image:prodImg(product,'medium'),
				left:3,
				top:2,
				width:28,
				height:28,
				borderRadius:6,
				backgroundColor:'#BBBBC0',
				preventDefaultImage:true,
	    	});
	    		 
			
			 if (product.quantity != null) {
			 	//alert(product.length);  //added for testing
			 	//only product that is counted
				var productunit = Ti.UI.createLabel({
		          text: product.quantity  + ' ' +  unit,
		          textAlign:'right',
		          font:{fontWeight:'normal',fontSize:14},
		          left:85,
		          right:10,
				  height:16
	            });
	            invComplete.push(product);
	            row.add(catThumb);
	            row.add(productitem);
	            row.add(productunit);
	            row.productitem = productitem; //assign Labels to row properties
				row.productunit = productunit;
				row.productid = product.product_id;
				row.catid = thumb_id;
				row.unitname = unit;
				row.unitid = unit_id;
				row.location_id = location_id;
				row.inv_id = product.id;
				row.product_qty = product.quantity;
				row.product_order = product.order;
				row.product_par = product.par;
				row.product_img = prodImg(product,'medium');
				
			 	dataComplete.push(row);
			 	cCnt++;
			 } else {
			 	inv.push(product);
			 	row.add(catThumb);
				row.add(productitem);
				row.productitem = productitem; //assign Labels to row properties
				row.productid = product.product_id;
				row.catid = thumb_id;
				row.unitname = unit;
				row.unitid = unit_id;
				row.location_id = location_id;
				row.inv_id = product.id;
				row.product_order = product.order;
				row.product_par = product.par;
				row.product_qty = null;
				row.product_img = prodImg(product,'medium');
			 	data.push(row);
			 	oCnt++;
			 }
	    }
		if (data.length == 0) {
			for(i=0;i<4;i++) {
				//data[i] = Ti.UI.createTableViewRow({height:32});
				//tvOutstanding.data = data;
			}
		}
		if (dataComplete.length == 0) {
			 for(i=0;i<4;i++) {
			 	//dataComplete[i] = Ti.UI.createTableViewRow({height:32});
			 	//tvCompleted.data = data;
			 }
		}
	    tvOutstanding.setData(data);
		tvCompleted.setData(dataComplete);
		//invCounts();
		oCountLabel.text = oCnt;      // number of Un-Counted products
		cCountLabel.text = cCnt;      //number of counted products
		try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
}

tvOutstanding.addEventListener('click', function(e)
{
	popWin(e,'edit');
});

// add delete event listener
tvOutstanding.addEventListener('delete',function(e)
{
	var s = e.section;
	Ti.API.info('rows ' + s.rows + ' rowCount ' + s.rowCount + ' headerTitle ' + s.headerTitle + ' title ' + e.rowData.productitem.text);
	Titanium.API.info("deleted - row="+e.row+", index="+e.index+", section="+e.section + ' inv_id ' + e.rowData.inv_id);
	
	var destroy_id = e.rowData.inv_id;
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: ['Yes', 'No!'],
	    message: "Are you really sure you want to permanently remove \n"+e.rowData.productitem.text+"\n from your inventory?",
	    title: 'Removing Product'
	 });
	 dialog.show(); 
	 dialog.addEventListener('click',function(e) {
		if(e.index == 0){
			// send destroy attribute
			var xhr = Titanium.Network.createHTTPClient();
			xhr.onerror = function(e) {
				Ti.API.info("post error:" + e.error);
				
			};
			// newer method - post directly to inventory
			xhr.open("PUT", url('/api/v1/inventories/'+Ti.App.Properties.getString('inventory_id')+'.json'));
			xhr.send({
				"utf8":"✓",
				"inventory[items_attributes][][id]":destroy_id,
				"inventory[items_attributes][][_destroy]":1,
				"commit":"Update Inventory"
			});
			Ti.App.fireEvent('refresh', { tab: 'inventories' });
		} else {
			setData();
		}
	});
});

win.add(tvOutstanding);
//setData();

var completeLabel = Ti.UI.createLabel({
  //text:'Completed Items',
  text:'Counted Items',
  bottom:204,
  left:20,
  height:'auto',
  color:'#357'
});
win.add(completeLabel);
//function invCounts() {
var oCountLabel = Ti.UI.createLabel({
  font:{fontSize:18,fontWeight:'bold'},
  text:oCnt,
  top:20,
  right:20,
  color:'#C52',
  height:'auto',
  width:'auto'
});
win.add(oCountLabel);

var cCountLabel = Ti.UI.createLabel({
  font:{fontSize:18,fontWeight:'bold'},
  text:cCnt,
  bottom:199,
  right:20,
  color:'#C52',
  height:'auto',
  width:'auto'
});
win.add(cCountLabel);
//}

tvCompleted.addEventListener('click', function(e) 
{
	popWin(e,'edit');
});

function popWin(e,popType){	
	//Titanium.API.info('Clicked:'+e.index);
	//Titanium.API.info('Clicked:'+e.row.productitem.text);
	Titanium.API.info('Clicked:'+e);
	if ((e.rowData && e.row.productitem.text) || popType == 'create')
	{
	
     var pHeader = '';
     var pUrl = '../inventory/add.js';
     var pHeight = '49%';
     var autoFlow = false;
     var pUnit = '';
     var pId = '';
     var pQty = null;
     var pPar = null;
     var pOrder = null;
     var pImg = '';
     var pUid = '';
     var pCatId = '';
     var bgColor='#eee';
     var bColor='#666';
     var bWidth=1;
     var inventory=[];
     var invId = '';
     var t = Titanium.UI.create2DMatrix();
	 t = t.scale(0);
	 
	 if(flowSwitch.value == true) autoFlow = true;
	 
	 if (popType == 'edit') 
	 {	
	 	pHeader = e.row.productitem.text;
	 	pUrl = '../inventory/enter.js';
	 	pHeight = '49%';
	 	pId = e.row.productid;
		pUnit = e.row.unitname;
		pQty = e.row.product_qty
		pUid = e.row.unit_id;
		pCatId = e.row.catid;
		pOrder = e.row.product_order;
		pPar = e.row.product_par;
		invId = e.row.inv_id;
		pImg = e.row.product_img;
	 }
	 
	 if(autoFlow == true && popType == 'edit') {
	 	
	 	if(e.row.productunit) {
	 		inventory = invComplete;
	 		
	 	}else{
	 		inventory = inv;	
	 	}
	 	
	 	pUrl = '../inventory/autoenter.js';
	 	bgColor='transparent';
	 	bColor=bgColor;
	 	bWidth=0;
	 }
	 
	 if (popType == 'create') 
	 {
	 	pHeader = 'Add or Create a New Item';
	 	pUrl = '../inventory/addcreate.js';
	 	pHeight = '95%';
	 }
	 
     var w = Titanium.UI.createWindow({
     	url:pUrl,
		backgroundColor:bgColor,
		borderWidth:bWidth,
		borderColor:bColor,
		top:10,
		left:10,
		right:10,
		height:pHeight,
		borderRadius:10,
		opacity:0.85,
		transform:t,
		product_name:pHeader,
		product_id: pId,
		product_unit: pUnit,
		product_unit_id: pUid,
		product_par:pPar,
		product_order:pOrder,
		product_qty: pQty,
		category_id:pCatId,
		list_index: e.index,
		inventory: inventory,
		location_id: location_id,
		product_img: pImg,
		inv_id: invId,
		autoFlow:autoFlow
	});

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	win.add(bg);
	
	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		//Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1);
		w.animate({transform:t2, duration:200});

	});
	
	w.open(a);
	}
}

var bg = Titanium.UI.createView({
	width: '100%',
	height: '100%',
	backgroundColor: '#000',
	opacity: 0.5
});

function getGrpInv() {
	try{
	Titanium.App.fireEvent('hide_indicator');
	}catch(e)
	{
		
	}
	Titanium.App.fireEvent('show_indicator');
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		//alert("gotcha");
		var items = JSON.parse(this.responseText);
		var invGrp = _.groupBy(items.items, function(e) { return e.location_id });
		var invData = _.toArray(invGrp);
		Ti.App.Properties.setString("currInventory", JSON.stringify(invGrp));
		Titanium.App.fireEvent('hide_indicator');
		setData();
	};
	xhr.onerror = function(e) {
		
		Ti.API.info("post error:" + e.error);
	};
	xhr.open('GET', url("/api/v1/inventories/"+Ti.App.Properties.getString('inventory_id')+".json"));
	xhr.send();
	};

Ti.App.addEventListener('popClose', function (e) {
	win.remove(bg);
	getGrpInv();	
});


win.add(tvCompleted);

// win.addEventListener("open", function(event, type) {
//     setData();
// });
win.addEventListener("focus", function(event, type) {
    setData();
});

create.addEventListener('click', function(e) 
{
	popWin(e,'create');
});
/*
done.addEventListener('click', function(){
	var missedTxt = '';
	if(oCnt > 0) {
		var missedTxt = '\n\n You have '+oCnt+' item';
		if(oCnt > 1) missedTxt = missedTxt+'s that have not been counted.';		
		else missedTxt = missedTxt+' that has not been counted.';
	}
	dialog.title = 'Are you sure your done with this Inventory?'+missedTxt;
	dialog.show();
});

// Done dialog menu

var optionsDialogOpts = {
	options:['Yes, I am.', 'No, I missed some.'],
	cancel:1,
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
// add event listener
dialog.addEventListener('click',function(e)
{
	
	if(e.index == 0) {
		win.close();
	};
	
});
*/
