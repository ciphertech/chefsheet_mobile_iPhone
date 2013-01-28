Ti.include('../shared/default.js');

Ti.App.addEventListener('switchTab', function (e) {
	if(e.tab == 'prices') {
		win.close();
		hideIndicator();
	}
});

var user_id = win.user_id;
var product_id = win.product_id;
var product_name = win.product_name;

var data = [];
var avg = 0;
var max = 0;
var min = -1;
var chrtImg = '';

bgFrame(12,10,12,17);
Titanium.App.fireEvent('show_indicator');

var idLabel = Ti.UI.createLabel({
  text:product_name,
  font:{fontSize:(product_name.length>=32)?12:18},
  top:18,
  left:20,
  width:'80%',
  height:'auto',
  color:'#357'
});
win.add(idLabel);
/*
var addBttn = Titanium.UI.createButton({
  	right:16,
  	top:13,
  	height:32,
	style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
});

addBttn.addEventListener('click', function(e)
{
	popWin(e);
});

win.add(addBttn);
*/
var ivBg = Ti.UI.createImageView({
	bottom:23,
	left:19,
	right:19,
	height:189,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#cde',
	backgroundColor:'transparent',
	backgroundImage:'../../images/tableBG.png'
});
win.add(ivBg);

var itemview = Titanium.UI.createTableView({
	bottom:25,
	left:20,
	right:20,
	height:187,
	borderWidth:1,
	borderRadius:8,
	borderColor:'#999',
	rowHeight:32,
	separatorColor:'#aaa',
	backgroundColor:'transparent'
});
win.add(itemview);

function setData() {

	var xhr = Ti.Network.createHTTPClient();
  	xhr.onload = function(e) {
  		var itemSum = 0;
  		var chartData = '';
		var items = JSON.parse(this.responseText);
		items.reverse();
		
	    for(i=0;i<items.length;i++) {
	    	itemSum = itemSum + Number(items[i].unit_price);
	    	if(max<=Number(items[i].price)) max = Number(items[i].price);
	    	if(min > Number(items[i].price) || min == -1) min = Number(items[i].price);
	    	
			var row = Titanium.UI.createTableViewRow();
	      	//var product = items[i];
			var price_per = Titanium.UI.createLabel({
				text:'$'+Number(items[i].price).toFixed(2)+' / '+items[i].unit.name,
				font:{fontSize:14,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:6,
				left:10,
				height:16
			});
			
			avg = itemSum/items.length;
			
			var vendor = Ti.UI.createLabel({
				text: items[i].vendor.name,
				textAlign:'center',
				font:{fontWeight:'normal',fontSize:12},
				color:'#444',
				height:16
	        });
			
			var price_date = Ti.UI.createLabel({
				text: moment(items[i].updated_at).format("MM.DD.YYYY"),
				textAlign:'right',
				font:{fontWeight:'normal',fontSize:12},
				right:10,
				height:16
	        });
	            
			row.add(price_per)
			row.add(vendor);
			row.add(price_date);			
			data.push(row);
	    }
	    items.reverse();

	    for(i=0;i<items.length;i++) {
	    	chartData = chartData + parseInt((Number(items[i].price-min)/(max-min))*100);
	    	if(i<items.length-1) chartData = chartData + ',';
	    }
	    if(items.length == 1) chartData ='50,50';
	    
	    if(items.length == 0) {
	    	chartData ='50,50';
	    	items[0] = [{updated_at: ''}];
	    	//items[0].updated_at = 'No Data Yet';
	    	min=0;
	    }

	    itemview.setData(data);
	    var mid = (max+min)/2;
	    chrtImg = 'http://chart.apis.google.com/chart?chxt=x,y&chxl=0:|'+moment(items[0].updated_at).format("MMM DD YYYY")+'|'+moment(items[items.length-1].updated_at).format("MMM DD YYYY")+'|1:|'+'$'+min.toFixed(2)+'|'+'$'+mid.toFixed(2)+'|'+'$'+max.toFixed(2)+'&cht=lc&chd=t:'+chartData+
	    	'&chco=ffffff&chls=2.0&chs=280x140&chma=0,0,0,0&chm=B,cccccc,0,0,0&chf=bg,s,AABBCC|c,lg,90,667A99,0,AABBCC,1'+
	    	'&chxp=0,13,87&&chg=0,51';
	    
	    // temporary until pricing structure is in place...
		setRemoteChart(chrtImg);
	    
    	Titanium.App.fireEvent('hide_indicator');
	    
  	};
  	xhr.onerror = function(e) {
		alert("error");
		Ti.API.info("get error:" + e.error);
	};
  	//xhr.open('GET', url("/manager/prices.json?product_id="+product_id));
  	xhr.open('GET', url("/manager/inventory_items/price_list.json?sku_name="+product_name+"&sku_id="+product_id,true));
  	xhr.send();	
};
setData();

win.addEventListener("focus", function(event, type) {
    //setData();
});
/*
// temporary until pricing structure is in place...
chrtImg = 'https://chart.googleapis.com/chart?chxt=x,y&chxl=0:|2011|2012|1:|0|50|100&cht=lc&chd=t:10,20,10,40,30,50,80'+
	    	'&chco=ffffff&chls=2.0&chs=280x100&chma=0,0,0,0&chm=B,cccccc,0,0,0&chf=bg,s,AABBCC|c,lg,90,667A99,0,AABBCC,1'+
	    	'&chxp=0,13,87&&chg=0,51';
// temporary until pricing structure is in place...
setRemoteChart(chrtImg);
*/

// pull in google charts the hard way
function setRemoteChart(chart){
	var c = Titanium.Network.createHTTPClient();
	c.setTimeout(10000);
	c.onload = function(){
		Ti.API.info('IN ONLOAD ');

		var rImg = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'chart.png');    
    	var imgview = Titanium.UI.createImageView({
	    	image: rImg.nativePath,
	    	top:54,
			left:20,
			right:20,
			height:140,
			width:280,
			backgroundColor:'#fff',
			preventDefaultImage:false,
			scalesPageToFit:false
		});

    	win.add(imgview);
	};
	
	c.onerror = function(e){
		Ti.API.info('XHR Error ' + e.error);
	};
	// open the client
		c.open('GET',chart);
		c.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'chart.png');
	// send the data
	c.send();
};

function popWin(e){
	Titanium.API.info('Clicked:'+e);
	var pHeader = 'Add a new price for this item';
    var pUrl = '../inventory/add.js';
    var pHeight = '49%';
    var bgColor='#eee';
    var bColor='#666';
    var bWidth=1;
    var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	 	 
     var w = Titanium.UI.createWindow({
     	url:'../prices/add.js',
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
		product_name:product_name,
		product_id: product_id
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


var bg = Titanium.UI.createView({
	width: '100%',
	height: '100%',
	backgroundColor: '#000',
	opacity: 0.5
});

Ti.App.addEventListener('popClose', function (e) {
	win.remove(bg);
});