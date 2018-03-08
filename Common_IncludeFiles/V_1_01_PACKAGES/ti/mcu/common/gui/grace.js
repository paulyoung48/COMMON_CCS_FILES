
var grace = 
{
	/*
	 * Helper function to retrieve a cookie value.
	 */
	cookies : 
	{
		get : function(cookie_name)
		{
		    // http://www.thesitewizard.com/javascripts/cookies.shtml
		    var cookie_string = document.cookie ;
		    if (cookie_string.length != 0) 
		    {
		        var cookie_value = cookie_string.match (
		                        '(^|;)[\\s]*' +
		                        cookie_name +
		                        '=([^;]*)' );
		        if (cookie_value != null)
		        {
		        	return decodeURIComponent ( cookie_value[2] );
		        }
		    }
		    return '' ;
		},
		
		/*
		 * Helper function to set a cookie value.
		 * 
		 * The last parameter 'valid_domain' is optional.  If not present, the current document is used as the domain.
		 */
		set : function(cookie_name, cookie_value, lifespan_in_days, valid_domain)
		{
		    // http://www.thesitewizard.com/javascripts/cookies.shtml
		    var domain_string = valid_domain ?
		                       ("; domain=" + valid_domain) : '' ;
		    var path_string = "; path=" + document.location.pathname;
		    document.cookie = cookie_name +
		                       "=" + encodeURIComponent( cookie_value ) +
		                       "; max-age=" + 60 * 60 *
		                       24 * lifespan_in_days +
		                       path_string + domain_string ;
		},
	},
	
	activePage : 
	{
		_currentID : null,
		_lastActivePageCookie : "lastActivePage",
		
		_addVisiblityListeners : function(iFrameID, firstPageID)
		{
			require(["dojo/query", "dojo/dom-attr"], function(query, domAttr) {
				query('.pagelink').forEach(function(node) {
					var id = domAttr.get(node, 'id');
					if (id != null)
					{
						$TI.GUIVars.onSet('visible', function(propertyName, oldValue, newValue) {
							if (newValue == false && id == grace.activePage._currentID) 
							{
								// we're on the wrong page, need to switch back to firstPageID
								var page = dijit.byId(firstPageID);
								grace.activePage.set(page);
								
								// also switch the location 
								if (iFrameID != null)
								{
									grace.activePage.setIFrameLocation(iFrameID, page.get('href'));
								}
							}
						}, id);
					}
				});
			});
			
		},
		
		/* 
		 * function to call from the page loaded event to switch to the correct default active page.
		 * The active page is either given by the URL ending with #<pageID>, or the last active page for this document 
		 * as presisted in a cookie.  Worst case, the firstPage is used.
		 */
		initialize : function (iFrameID, firstPageID) 
		{
			this._addVisiblityListeners(iFrameID, firstPageID);
			
			require(["dojo/dom-class"], function(domClass) 
			{
				var pageString = window.location.hash;
				if (pageString && pageString.length > 1)
				{
					// use page provided by URL ending with #<pageID>
					pageString = pageString.substring(pageString.indexOf('#/') == 0 ? 2 : 1);
				}
				else
				{
					// find a cookie that contains the last active page and use that
					pageString = grace.cookies.get(grace.activePage._lastActivePageCookie);
					if (!pageString || pageString.length == 0)
					{
						// otherwise default to the first page provided.
						pageString = firstPageID;
					}
				}
			
				// activate that page (if it can be found otherwise use the default first provided) 
				var page = dijit.byId(pageString);
				if (page === undefined || domClass.contains(pageString, 'dijitHidden')) 
				{
					page = dijit.byId(firstPageID);
				}
				
				grace.activePage.set(page);
				
				// also switch the location 
				if (iFrameID != null)
				{
					grace.activePage.setIFrameLocation(iFrameID, page.get('href'));
				}
				
				window.onhashchange = grace.activePage._onLocationHashChanged;
			});
			return true;  
		},
		
		/* 
		 * function to call from onClick() of page activation buttons.  This will not set any iFrame locations.  It is 
		 * expected to be called from <a href="<new location>" onclick="setPageActive('myID')" target="iframe"> so that the location is
		 * updated by the hyperlink and adds a back entry to the browser's navigation. 
		 */
		set : function(page)
		{
			var pageID = page.get('id');
			var pageTitle = page.get('label');
			var gcAngular = parent ? parent.gcAngular : gcAngular;
			if (gcAngular && gcAngular.$rootScope) 
			{
				gcAngular.$rootScope.pageTitle = pageTitle;
				gcAngular.$rootScope.$digest();
			}
			if (pageID != this._currentID)
			{
				require(["dojo/dom-class"], function(domClass)
				{
					grace.activePage._doSet(domClass, pageID);
				});
				return true;  // if called from <a onClick=...> we don't want to suppress the normal link action.
			}
			return false;  // if called from <a onClick=...> suppress the normal link action because the pageID hasn't changed.
		},
		
		switchTo : function(iFrameID, newLocation)
		{
			if (newLocation && newLocation.length > 0)
			{
				var currentLocation = document.getElementById(iFrameID).src;
				if (currentLocation != newLocation)
				{
					document.getElementById(iFrameID).src = newLocation;
				}
			}
		},
		
		_doSet : function(domClass, pageID)
		{
			if (this._currentID != null)
			{
				domClass.remove(this._currentID, "dijitReadOnly");
			}
			if (pageID != null)
			{
				domClass.add(pageID, "dijitReadOnly");
				grace.cookies.set(this._lastActivePageCookie, pageID, 30);  // save cookie for upto 30 days.
			}
			this._currentID = pageID;
		},
		
		onIFrameLoad : function(frame)
		{
			var url = frame.contentWindow.location.href;
			var hyperlinks = document.getElementsByTagName('a');
			for (var i = 0; i < hyperlinks.length; i++) { 
			    var href = hyperlinks[i].getAttribute('href'); 
			    if (href != null && url.indexOf(href) + href.length == url.length ) {
					var pageID = hyperlinks[i].getAttribute('id');
					if (pageID != this._currentID) {
						require(["dojo/dom-class"], function(domClass)
						{
							grace.activePage._doSet(domClass, pageID);
						});
					}
			    }
			}
		},
		
		/*
		 * Private listener to Hash changes.  Hash will only change if the user navigates (forward or backward) to a page within the same document,
		 * or there is a relative link (i.e, href="#page") wihin the page.  
		 */
		_onLocationHashChanged : function(e)
		{
			/* caused by browser navigation backward and forward, or relative URL's like href="#page" */
			var pageString = window.location.hash;
			if (pageString && pageString.length > 1)
			{
				require(["dojo/dom-class"], function(domClass)
				{
					grace.activePage._doSet(domClass, pageString.substring(1));
				});
			}
		},
		
		/* 
		 * function to set the iFrame location with out causing back enties in the browser's navigation.
		 */
		setIFrameLocation : function(iFrameID, newLocation)
		{
			if (newLocation && newLocation.length > 0)
			{
				document.getElementById(iFrameID).contentWindow.location.replace(newLocation);
			}
		},
		
		/* 
		 * Callback function for locations changing on the fly for page links.  If the location changed for the active page
		 * then this method will update the iFrames location.   
		 */
		onPageLocationChanged : function(pageID, newLocation)
		{
			/* called by databinding preprocessing methods */
			if (pageID == this._currentID)
			{
				/* active page's link is updated by newHref, so we need to display the new page without creating back entries in the browser's navigation. */
				var page = dijit.byId(pageID);
				var target = page.get("target");
				grace.activePage.setIFrameLocation(target, newLocation);
			}
			/* do nothing if location changed for non active page */
		},
		
		onRouteChangeSuccess : function(pageString)
		{
			this._nextActivePageID = pageString;
		},
		
		onViewContentLoaded : function()
		{
			var pageString = this._nextActivePageID;
			require(["dojo/dom-class"], function(domClass)
				{
					if (dijit.byId(pageString) != null)
					{
						grace.activePage._doSet(domClass, pageString);
					}
				});
		},
		
		getTitle : function()
		{
			var button = dijit.byId(grace.activePage._currentID);
			var pageTitle = button == null ? "" : button.get('label');
			return pageTitle;
		},
		
		get : function(firstPageID)
		{
			// find a cookie that contains the last active page and use that
			var pageString = grace.cookies.get(this._lastActivePageCookie);
			if (!pageString || pageString.length == 0)
			{
				// otherwise default to the first page provided.
				pageString = firstPageID;
			}
			return pageString;
		},
		
		isActive : function(pageID)
		{
			return this._currentID == pageID;
		}
	},
	
	navigation :
	{
		doOnClick : function(node)
		{
			var pageID = node.get('id');
			if (pageID != null)
			{
				var url = $TI.GUIVars.getValue(pageID + '.link');
				if (url != null)
				{
					// Grace 2.0 backward compatibility support.  
					var pos = url.indexOf(':');
					if (pos < 0 || url.indexOf('ref:') == 0)
					{
						if (pos > 0)
						{
							url = url.substr(pos+1);
						}
						if (url.indexOf('../') != 0 && url.indexOf('#') != 0 && url.indexOf('/index.html') < 0)
						{
							url = '#/' + url;
						}
					}
					else if (url.indexOf('value:') == 0)
					{
						// don't support two levels of indirection in Gui Composer
						return false;
					}
					return this.setUrl(url);
				}
			}
			return true;
		},
		
		doOnHyperlinkClick : function(node)
		{
			var href = node.get('href');
			if (href != null && href.indexOf('http:') != 0 && href.indexOf(':') > 0)
			{
				var	text = node.domNode.innerText || node.domNode.textContent;
				var pos = href.indexOf('#');
				if (pos > 0)
				{
					text = href.substring(pos+1);
					href = href.substring(0, pos);
				}
				$TI.guiComposerServer.executeAsynchOperation('rtsc.$openLink', { href : href, label : text} );
				return false;
			}
			return true;
		},
		
		setUrl : function(url)
		{
			if (url != null && url.indexOf('http:') != 0 && url.indexOf(':') > 0)
			{
				// open link in CCS through server, for non html: protocols like file:, mailto:, and help:.
				$TI.guiComposerServer.executeAsynchOperation('rtsc.$openLink', { href : url });
			}
			else if (url.indexOf('#') == 0)
			{
				top.location.hash = url.substring(1);
			} 
			else
			{
				// change the browsers url directly.
				top.location = url;
			}
			return false;
		}
	},
	
	menu : 
	{
		_bindMenuItemAttr : function(menuItem, fn, initValue, type)
		{
			if (initValue && typeof initValue == 'string')
			{
				var invertLogic = false;
				if (initValue.indexOf('!') == 0)
				{
					// not operator, when disabled bound to an action binding that returns true if allowed.
					invertLogic = true;
					initValue = initValue.substring(1);
				}
				
				// if initValue looks like a serverBind then add the binding if it does not already exists 
				if (initValue.indexOf('rtsc.') == 0)
				{
					var propertyName = initValue.split('.').join('_');
					var bind = $TI.guiComposerServer._bindings.getBind('prop', propertyName);
					if (bind == null)
					{
						// add binding 
						$TI.guiComposerServer.addBinding('prop', propertyName, initValue, null);
					}
					// make initValue look like the property we just added the binding for, and continue with binding
					initValue = 'prop.' + propertyName;
				}
				
				// if initValue looks like a property, then bind it to the menu item attribute.
				if (initValue.indexOf('prop.') == 0 )
				{
					var property = initValue.substring('prop.'.length);
					var value = $TI.GUIVars.getValue(property);
					if (value != undefined)
					{
						// if property exists then use the current value for the menu item
						fn.call(menuItem, invertLogic ? value == false : value);
					}
					// add a listener for when the binding updates the property 
					$TI.GUIVars.onSet(property, function(propertyName, oldValue, newValue) 
						{
							fn.call(menuItem, invertLogic ? newValue == "false" : newValue);					
						});
				}
			}
		},
		
		createMenuItem : function(MenuItem, initData)
		{
			var result = new MenuItem(initData);
			this._bindMenuItemAttr(result, result.setLabel, initData.label);
			this._bindMenuItemAttr(result, result.setDisabled, initData.disabled);
			this._bindMenuItemAttr(result, result.setChecked, initData.checked);
			return result;
		},
		
		createSubMenuItem : function(Menu, PopupMenuItem, label, subMenuItems)
		{
			try
			{
				// create subMenu 
			    var pSubMenu = new Menu();
			    
				// add sub menu items
				for(var i = 0; i < subMenuItems.length; i++)
				{
					pSubMenu.addChild(subMenuItems[i]);
				}
				
				return this.createMenuItem(PopupMenuItem, {
			        label: label,
			        popup: pSubMenu
			    }); 
		    }
		    catch(e)
		    {
		    }
		},
		
		createMenu : function(Menu, widgetIds, menuItems)
		{
			try
			{
				// create menu
				var result = new Menu({
				    targetNodeIds: widgetIds
				});
				
				// add items
				for(var i = 0; i < menuItems.length; i++)
				{
					result.addChild(menuItems[i]);
				}
				
			    pMenu.startup();
		    }
		    catch(e)
		    {
		    }
		},
		
		_createSubMenuItems : function(Menu, MenuItem, CheckedMenuItem, PopupMenuItem, menuItemsData)
		{
			var result = [];
			for(var i = 0; i < menuItemsData.length; i++)
			{
				var menuData = menuItemsData[i];
				if (menuData.subMenu !== undefined)
				{
					// create popup Menu Item
					var subMenuItems = this._createSubMenuItems(Menu, MenuItem, CheckedMenuItem, PopupMenuItem, menuData.subMenu);
					result.push(this.createSubMenuItem(Menu, PopupMenuItem, menuData.label, subMenuItems));
				}
				else // create plain menu item or checked menu item
				{
					result.push(this.createMenuItem(menuData.checked === undefined ? MenuItem : CheckedMenuItem, menuData)); 
				}
			}
			return result;
		},
		
		createContextMenu : function(widgetIds, menuItems)
		{
			require([
			    "dijit/Menu",
			    "dijit/MenuItem",
			    "dijit/CheckedMenuItem",
			    "dijit/MenuSeparator",
			    "dijit/PopupMenuItem", 
			    "dojo/domReady!"
			], function(Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem) {
				var items = grace.menu._createSubMenuItems(Menu, MenuItem, CheckedMenuItem, PopupMenuItem, menuItems);
				if (items.length > 0)
				{
					items.push(new MenuSeparator());
				}
				items.push(grace.menu.createMenuItem(MenuItem, {
			        label: "Back",
			        iconClass: "navBackwardIcon",
			        disabled: "!rtsc.$editor.back", 
			        onClick: function() {$TI.guiComposerServer.executeAsynchOperation('rtsc.$editor.back', { } );}
			    }));
				items.push(grace.menu.createMenuItem(MenuItem, {
			        label: "Forward",
			        iconClass: "navForwardIcon",
			        disabled: "!rtsc.$editor.forward", 
			        onClick: function() {$TI.guiComposerServer.executeAsynchOperation('rtsc.$editor.forward', { } );}
				}));
			    items.push(new MenuSeparator());
			    items.push(grace.menu.createMenuItem(MenuItem, {
			        label: "Refresh",
			        iconClass: "refreshIcon",
			        disabled: "!rtsc.$editor.refresh", 
			        onClick: function() {$TI.guiComposerServer.executeAsynchOperation('rtsc.$editor.refresh', { } );}
			    }));
			    
				grace.menu.createMenu(Menu, widgetIds, items);
			});
		}
	}
}

if (typeof gcAngular == 'undefined')
{
	require(["dojo/ready", "dojo/query", "dojo/dom-attr"], function(ready, query, domAttr) {
		ready(function() {
			query('body').forEach(function(node) {
				grace.menu.createContextMenu([domAttr.get(node, 'id')], []);
			});	
		});
	});
}
else
{
	gcAngular.run(function() {
		require(["dojo/ready", "dojo/query", "dojo/dom-attr"], function(ready, query, domAttr) {
			ready(function() {
				query('body').forEach(function(node) {
					grace.menu.createContextMenu([domAttr.get(node, 'id')], []);
				});	
			});
		});
	});
}
	
