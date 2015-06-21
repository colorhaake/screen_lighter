console.log('Change Light Enter');

function changeOverlayOpacity(action) {
	var elemDiv = document.getElementById("lightOverlay");
	if (!elemDiv) {
		var elemDiv = document.createElement('div');
		elemDiv.id = 'lightOverlay';
		elemDiv.style.cssText = 'width: 100%; height: 100%; -webkit-transition: -webkit-transform 10s ease-in-out; transition: -webkit-transform 10s ease-in-out; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; pointer-events: none !important; z-index: 2147483647; opacity: 0; background: rgb(0, 0, 0) !important;';
		document.body.appendChild(elemDiv);
	}

	if (action == 'disable_function') {
		elemDiv.style.opacity = "0";
	} else {
		elemDiv.style.opacity = "0.3";
	}
}

chrome.runtime.sendMessage({ "action" : "check_function" }, function(response) {
	changeOverlayOpacity(response.action);
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	changeOverlayOpacity(msg.action);
});