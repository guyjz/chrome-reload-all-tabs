window.onload = function() {
	restore_options();
	document.getElementById('save').onclick = save_options;
}


// Saves options to localStorage & close tab.
function save_options()
{
	var buttonAction = "allWin";

	if( document.getElementById( "oneWin" ).checked == true )
	{
		buttonAction = "oneWin";
	}
	else if( document.getElementById( "menu" ).checked == true )
	{
		buttonAction = "menu";
	}

	localStorage["rtButtonAction"] = buttonAction;
	
	localStorage["rtMainContext"] = (document.getElementById("mainContext").checked)?1:0;
	localStorage["rtWinContext"] = (document.getElementById("winContext").checked)?1:0;
	localStorage["rtPinContext"] = (document.getElementById("pinContext").checked)?1:0;

	localStorage.support = !(document.getElementById("dontsupport").checked);///


	// Close tab.
	chrome.extension.sendMessage( {'action':'allWin'} );
	window.close();
}

// Restores select box state to saved value from localStorage.
function restore_options()
{
	document.getElementById("mainContext").checked = parseInt(localStorage["rtMainContext"]);
	document.getElementById("winContext").checked = parseInt(localStorage["rtWinContext"]);
	document.getElementById("pinContext").checked = parseInt(localStorage["rtPinContext"]);
	
	var buttonAction = localStorage["rtButtonAction"];
	
	if( !buttonAction )
	{
		buttonAction = "oneWin";
	}
	
	document.getElementById(buttonAction).checked = true;

	document.getElementById("dontsupport").checked = (localStorage.support == "false");///
}