function pageLoaded()
{
	var action = localStorage["rtButtonAction"];
	
	if( !action )
	{
		action = localStorage["rtButtonAction"] = "oneWin";
	}
	
	if( action != "menu" )
	{
		document.getElementById("body").innerHTML = "";
		chrome.extension.sendMessage( {"action":action} );
		window.close();
	}
}

window.onload = function() {

	pageLoaded();

	document.getElementById('menuReloadAllTabs').onclick = function() {
		chrome.extension.sendMessage( {'action':'oneWin'} ); window.close();
	}

	document.getElementById('menuReloadAllWindows').onclick = function() {
		chrome.extension.sendMessage( {'action':'allWin'} ); window.close();
	}

	document.getElementById('menuReloadPinnedTabs').onclick = function() {
		chrome.extension.sendMessage( {'action':'pinned'} ); window.close();
	}

	document.getElementById('menuOptions').onclick = function() {
		chrome.extension.sendMessage( {'action':'options'} ); window.close();
	}
}
