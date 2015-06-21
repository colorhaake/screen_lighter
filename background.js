console.log('background.js running...');

var trun_on_light = true;
/**************************************************
* Chrome browserAction.onClicked Listener
**************************************************/
chrome.browserAction.onClicked.addListener(function(tab)
{
	console.log('ScreenLighter browserAction click');

	var newIconPath = 'light_off_128.png';
	trun_on_light = !trun_on_light;
	if (trun_on_light) {
		var newIconPath = 'light_on_128.png';
	}

    chrome.browserAction.setIcon({
        path: newIconPath,
        tabId: tab.id
    });

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var msg = (trun_on_light)? 'disable_function' : 'enable_function';
		for (var i in tabs) {
			console.log("tab: ", String(i));
		    chrome.tabs.sendMessage(tabs[i].id, {action: msg}, function(response) {});  
		}
	});

});

chrome.runtime.onMessage.addListener (
    function(request, sender, sendResponse) {
   		console.log('receive request from contentscript');

		var msg = (trun_on_light)? 'disable_function' : 'enable_function';
		sendResponse({action: msg});

		var newIconPath = (trun_on_light)? 'light_on_128.png' : 'light_off_128.png';
	    chrome.browserAction.setIcon({
	        path: newIconPath,
	        tabId: sender.tab.id
	    });
    }
);