function reloadTab(id, url) {
	//chrome.tabs.update(id, {url:url});
	//chrome.tabs.reload(id);
	var details = { code: "window.location.reload(true)" };
	chrome.tabs.executeScript(id, details);
}

function reloadCurrent()
{
	chrome.windows.getLastFocused( function( window )
	{
		chrome.tabs.getAllInWindow( window.id, function( tabList )
		{
			var length = tabList.length;
			
			for( var i=0; i<length; i++ )
			{
				var url = tabList[i].url;
				var id = tabList[i].id;
				
				reloadTab(id, url);
			}
		});
	});
}

function reloadAll()
{
	chrome.windows.getAll( null, function( windowList )
	{
		var winLength = windowList.length;
		
		for( var i=0; i<winLength; i++ )
		{
			var winId = windowList[i].id;
		
			chrome.tabs.getAllInWindow( winId, function( tabList )
			{
				var tabLength = tabList.length;
				
				for( var j=0; j<tabLength; j++ )
				{
					var id = tabList[j].url;
					var url = tabList[j].id;
					
					reloadTab(id, url);
				}
			});
		}
	});
}

function reloadPinned()
{
	chrome.windows.getLastFocused( function( window )
	{
		chrome.tabs.getAllInWindow( window.id, function( tabList )
		{
			var length = tabList.length;
			
			for( var i=0; i<length; i++ )
			{
				if( tabList[i].pinned )
				{
					var url = tabList[i].url;
					var id = tabList[i].id;
				
					reloadTab(id, url);
				}
			}
		});
	});
}

function showOptionsTab()
{
	chrome.tabs.create({url:chrome.extension.getURL('options.html')});
}

chrome.extension.onMessage.addListener(
	function( request, sender, sendResponse )
	{
		if( request.action == "oneWin" )
		{
			reloadCurrent();
		}
		else if( request.action == "allWin" )
		{
			reloadAll();
		}
		else if( request.action == "pinned" )
		{
			reloadPinned();
		}
		else if( request.action == "options" )
		{
			showOptionsTab();
		}
		
		var ctx = false;
		
		chrome.contextMenus.removeAll();

		if( localStorage["rtMainContext"] == 1 )
		{
			chrome.contextMenus.create( { "title": "Reload All Tabs",  "onclick": reloadCurrent } );
			ctx = true;
		}

		if( localStorage["rtWinContext"] == 1 )
		{
			chrome.contextMenus.create( { "title": "Reload All Windows",  "onclick": reloadAll } );
			ctx = true;
		}

		if( localStorage["rtPinContext"] == 1 )
		{
			chrome.contextMenus.create( { "title": "Reload All Pinned Tabs",  "onclick": reloadPinned } );
			ctx = true;
		}
		
		if( ctx )
		{
			chrome.contextMenus.create( { "type":"separator" } );
			chrome.contextMenus.create( { "title": "Options",  "onclick": showOptionsTab } );
		}
	}
);