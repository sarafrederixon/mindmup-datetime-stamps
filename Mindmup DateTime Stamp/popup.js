var INITIALS = "";
var	KEYSTROKE = {
	keyCode: 118,
	altKey: "",
	shiftKey: "",
	ctrlKey: ""
};
var newKeystroke = false;

window.onload = function()
{
	newKeystroke = false;	
	var initialsTextbox = document.getElementById('initialsText');
	var initials;
	var keystrokeTextBox = document.getElementById('shortcutText');
	var keystroke;
	chrome.storage.sync.get(function(storage){
		initialsTextbox.value= storage.initials;		
		keystrokeTextBox.value = readKeyValue(storage.keystroke);
	});

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('savebutton').addEventListener('click', onSave);
    document.getElementById('shortcutText').addEventListener('keydown', onKeyDown);
})

function onSave(e)
{
	var initialsTextbox = document.getElementById('initialsText');
	INITIALS = initialsTextbox.value;

	if( validKeystrokeBox() )
	{
		if(newKeystroke){
			chrome.storage.sync.set({'initials': INITIALS, 'keystroke': KEYSTROKE}, function(storage){			
				chrome.storage.sync.set(storage);
			});
		}
		else{
			chrome.storage.sync.set( {'initials': INITIALS}, function(storage){
				chrome.storage.sync.set(storage);
			});
		}
		window.close();
	}
}

function validKeystrokeBox(){
	var keystrokeTextbox = document.getElementById('shortcutText');
	var keystroke = keystrokeTextbox.value;

	if(keystroke == "")
	{
		return false;
	}
	else if(keystroke.length >= " + ".length && keystroke.substr(keystroke.length - " + ".length) == " + ")
	{
		return false;
	}

	return true;
}

function onKeyDown(e)
{
	if(e.keyCode == 13){
		onSave();
		newKeystroke = false;
		return false;
	}

	newKeystroke = true;
	var shortcutTextBox = document.getElementById('shortcutText');	
	shortcutTextBox.value = "";
	shortcutTextBox.value = readKeyValue(e);

	KEYSTROKE['keyCode'] = e.keyCode;
	KEYSTROKE['altKey'] = e.altKey;
	KEYSTROKE['shiftKey'] = e.shiftKey;
	KEYSTROKE['ctrlKey'] = e.ctrlKey;

	

	e.preventDefault();
	return false;
}

function readKeyValue(e)
{
	var newText = "";
	if(e.altKey)
	{
		newText += "Alt + ";
	}
	if(e.shiftKey)
	{
		newText += "Shift + ";	
	}
	if(e.ctrlKey)
	{ 
		newText += "Ctrl + ";
	}
	newText+= convertCode(e.keyCode);

	return newText;
}

function convertCode(charCode)
{
	if (charCode == 96) stringCode = "numpad 0"; // numpad 0
	else if (charCode == 97) stringCode = "numpad 1"; // numpad 1
	else if (charCode == 98) stringCode = "numpad 2"; // numpad 2
	else if (charCode == 99) stringCode = "numpad 3"; // numpad 3
	else if (charCode == 100) stringCode = "numpad 4"; // numpad 4
	else if (charCode == 101) stringCode = "numpad 5"; // numpad 5
	else if (charCode == 102) stringCode = "numpad 6"; // numpad 6
	else if (charCode == 103) stringCode = "numpad 7"; // numpad 7
	else if (charCode == 104) stringCode = "numpad 8"; // numpad 8
	else if (charCode == 105) stringCode = "numpad 9"; // numpad 9
	else if (charCode == 106) stringCode = "multiply"; // multiply
	else if (charCode == 107) stringCode = "add"; // add
	else if (charCode == 109) stringCode = "subtract"; // subtract
	else if (charCode == 110) stringCode = "decimal point"; // decimal point
	else if (charCode == 111) stringCode = "divide"; // divide
	else if (charCode == 112) stringCode = "F1"; // F1
	else if (charCode == 113) stringCode = "F2"; // F2
	else if (charCode == 114) stringCode = "F3"; // F3
	else if (charCode == 115) stringCode = "F4"; // F4
	else if (charCode == 116) stringCode = "F5"; // F5
	else if (charCode == 117) stringCode = "F6"; // F6
	else if (charCode == 118) stringCode = "F7"; // F7
	else if (charCode == 119) stringCode = "F8"; // F8
	else if (charCode == 120) stringCode = "F9"; // F9
	else if (charCode == 121) stringCode = "F10"; 
	else if (charCode == 122) stringCode = "F11"; 
	else if (charCode == 123) stringCode = "F12"; 
	else if (charCode == 124) stringCode = "F13"; 
	else if (charCode == 125) stringCode = "F14"; 
	else if (charCode == 126) stringCode = "F15"; 
	else if (charCode == 127) stringCode = "F16"; 
	else if (charCode == 128) stringCode = "F17"; 
	else if (charCode == 129) stringCode = "F18"; 
	else if (charCode == 130) stringCode = "F19"; 
	else if (charCode == 131) stringCode = "F20"; 
	else if (charCode == 132) stringCode = "F21"; 
	else if (charCode == 133) stringCode = "F22"; 
	else if (charCode == 134) stringCode = "F23"; 
	else if (charCode == 135) stringCode = "F24"; 
	else if (charCode == 186) stringCode = ";"; // semi-colon
	else if (charCode == 187) stringCode = "="; // equal-sign
	else if (charCode == 188) stringCode = ","; // comma
	else if (charCode == 189) stringCode = "-"; // dash
	else if (charCode == 190) stringCode = "."; // period
	else if (charCode == 191) stringCode = "/"; // forward slash
	else if (charCode == 192) stringCode = "`"; // grave accent
	else if (charCode == 219) stringCode = "["; // open bracket
	else if (charCode == 220) stringCode = "\\"; // back slash
	else if (charCode == 221) stringCode = "]"; // close bracket
	else if (charCode == 222) stringCode = "'"; // single quote
	else stringCode = String.fromCharCode(charCode);
	return stringCode;
}