chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
  	sendResponse({});
});

chrome.runtime.onInstalled.addListener(function(details){
 	if(details.reason == "install"){
 		var initials = "";
 		var	keystroke = {
			keyCode: 118,
			altKey: "",
			shiftKey: "",
			ctrlKey: ""
		};
		chrome.storage.sync.set({'initials': initials, 'keystroke': keystroke}, function(storage){		
			chrome.storage.sync.set(storage);
		});
		
	
    }
});