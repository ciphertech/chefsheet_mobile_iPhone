Ti.include('../shared/default.js');

// bgFrame(12,10,12,12);
bgFrame(12,65,12,67);
/*
var idLabel = Ti.UI.createLabel({
  text:'User ID',
  top:23,
  left:20,
  height:'auto'
});
win.add(idLabel);

var idField = Ti.UI.createTextField({
  value: Ti.App.Properties.getString('user_id'),
  height:35,
  width: 100,
	top:20,
	left:80,
	right:60,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(idField);
*/
Ti.App.fireEvent('closeMenu');

var devLabel = Ti.UI.createLabel({
  text:'Dev Server',
  top:113,
  left:20,
  height:'auto'
});
if(Boolean(parseInt(Ti.App.Properties.getString('developer'),10))) win.add(devLabel);

var devSwitch = Ti.UI.createSwitch({
	value:Boolean(parseInt(Ti.App.Properties.getString('developer'),10)),
	top:115,
	right:20
});
if(Boolean(parseInt(Ti.App.Properties.getString('developer'),10))) win.add(devSwitch);

var autoLogLabel = Ti.UI.createLabel({
  text:'Remember Login',
  top:80,
  left:20,
  height:'auto'
});
win.add(autoLogLabel);

var autoLogSwitch = Ti.UI.createSwitch({
	value:Boolean(parseInt(Ti.App.Properties.getString('autologin'),10)),
	top:82,
	right:20
});
win.add(autoLogSwitch);

var postBtn = Ti.UI.createButton({
	title:'Update Settings',
	width:200,
	height:36,
	bottom:90,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	font:{fontSize:16,fontWeight:'bold'},
	backgroundGradient:{type:'linear',
	colors:['#698aaa','#1C4E7E','#173f6b'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:36},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#112f55'
});
win.add(postBtn);

var cancelBtn = Ti.UI.createButton({
	title:'Cancel',
	width:200,
	height:36,
	bottom:131,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	font:{fontSize:16,fontWeight:'bold'},
	backgroundGradient:{type:'linear',
	colors:['#698aaa','#1C4E7E','#173f6b'],
	startPoint:{x:0,y:0},
	endPoint:{x:0,y:36},
	backFillStart:false},
	borderWidth:1,
	borderColor:'#112f55'
});
win.add(cancelBtn);

postBtn.addEventListener('click', function() {
  //idField.blur();
  //Ti.App.Properties.setString('user_id', idField.value);
  Ti.App.Properties.setString('autologin', autoLogSwitch.value);
  Ti.App.Properties.setString('developer', devSwitch.value);
  //alert('Now posting as user_id: ' + Ti.App.Properties.getString('user_id'));
  win.close();
});


cancelBtn.addEventListener('click', function() {
  win.close();
});