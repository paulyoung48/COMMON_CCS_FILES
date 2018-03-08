var dojoParser, dijitRegistry;
var gcAngular = angular.module('gc-angular', []);

gcAngular.bootstrap = function(element, modules) {
    return require([
        "dojo/_base/declare",
        "dojo/parser",
        "dijit/registry",
        "dijit/form/Button"
    ], function(declare, parser, registry, dijitButton) {
        dojoParser = parser;
        dijitRegistry = registry;

        // put the 'prop' widget in the registry to handle all browser prop objects.
        if (typeof $TI != undefined) {
        	if (typeof $TI.guiComposerServer.replacePropObject != undefined){
            	$TI.guiComposerServer.replacePropObject(gcAngular.$nsPropWidget)
        	}
        	else {
	            $TI.guiComposerServer.registerWidget(gcAngular.$nsPropWidget, 'ns-prop');
	            $TI.guiComposerServer._widgets['prop'] = $TI.guiComposerServer._widgets['ns-prop'];
        	}
        }

        // see note in $routeChangeStart
        window.ManagedButton = declare(dijitButton, {
            'ng-click': '',
            '_setNgClickAttr': { node: 'focusNode', type: 'attribute' }
        });

		angular.bootstrap(element == null ? document.body : element, modules);
    });
};

gcAngular.run(function($rootScope, $parse) {
	gcAngular.$rootScope = $rootScope;
	gcAngular.$parse = $parse;
	if (parent.gcAngular !== gcAngular) {
		// register child iFrame root scope with parent instance
		parent.gcAngular.childDocumentRootScope = $rootScope;
		
		// insert parent frame scope into rootScope of child frame.
		var e = parent.document.getElementById('iframe');
    	gcAngular.parentDocumentScope = parent.angular.element(e).scope();
    	$rootScope.global = gcAngular.parentDocumentScope.global; 
	}
	else {
		$rootScope.global = gcAngular.$rootScope;
	}
});

gcAngular.$promiseQueue = null;
gcAngular.doLater = function(fn) {
	this.$promiseQueue = dojo.when(this.$promiseQueue, fn);
};

gcAngular.config(function($provide) {
    $provide.decorator('$compile', function($delegate) {
        return function customCompile($compileNodes, transcludeFn, maxPriority) {
            angular.forEach($compileNodes, function(node) {
                if (node.nodeType == 3) return;    // skip text nodes (dojo throws errors).
                gcAngular.doLater(function() {
                        return dojoParser.parse(node);
                });
            });

            return function customLink(scope, cloneAttachFn) {
                gcAngular.doLater(function() {
                
                    $delegate($compileNodes, transcludeFn, maxPriority)(scope, cloneAttachFn);
                    try {
	                    scope.$digest();  // angular needs to be kicked to get it to update bindings after dojo compiles.
	                }
	                catch(err) {
	                }
                });
            }
        }
    });
});

// augment the ng-view directive in angular to add id="ng-view" attribute, so we can determine if Dijit's are inside or outside the view.
gcAngular.directive("ngView", function() {
    return {
        restrict: 'ECA',
        template: "<div id='ng-view'></div>",
        priority: 100,
        replace: true
    };
});

// add listener to route changes and remove dijits within the previous view.
gcAngular.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(evt, next, current) {
    	gcAngular.childDocumentRootScope = null; // clear child frame root scope whenever the routing changes
        var dijits = dijitRegistry.toArray();
        dojo.forEach(dijits, function(dijit) {
            //  only destroy Dijit widgets that are decendents of ng-view
            if (dijit && dojo.isDescendant(dijit.id, 'ng-view')) {
            	if (typeof $TI != undefined && $TI.guiComposerServer.synchronizeWithDojo == undefined) {
            		dijit.set("bindingDisabled",true);   // disable bindings in backplane before removing destroying widget
            	}
                dijit.destroyRecursive();
            }
        });
        try {
       		$TI.guiComposerServer.synchronizeWithDojo();
        } catch(err) {
        }
    });
    if (typeof $TI != undefined) {
        // add json bindings for next route, but only add them the first time we switch to a route.
        $rootScope.$on("$routeChangeSuccess", function(evt, next, current) {
            if (next && next.$$route && next.$$route.bindingsUrl) {
            	gcAngular.$nextBindingsUrlToLoad = next.$$route.bindingsUrl;
                next.$$route.bindingsUrl = null;
            }
        });
        // wait till after view content compiled and linked stages to start before queuing up the add bindings from file.
		gcAngular.$rootScope = $rootScope;
        $rootScope.$on("$viewContentLoaded", function() {
        	gcAngular.doLater(function() {
                $TI.guiComposerServer.addBindingsFromFile(gcAngular.$nextBindingsUrlToLoad);
                gcAngular.$nextBindingsUrlToLoad = null;
                try {
               		$TI.guiComposerServer.synchronizeWithDojo();
                } catch(err) {
                }
        	});
        });
    }
});

gcAngular.provider('$parentDocumentScope', function() {
    return {
        $get: function() {
            var e = parent.document.getElementById('iframe');
            return parent.angular.element(e).scope();
        }
    }
});

if (typeof $TI != undefined) {
	
    gcAngular.$nsPropWidget = {

        getters : {},
        unwatchers : {},

        _getter: function(property) {
            var getter = this.getters[property];
            if (getter === undefined) {
                getter = gcAngular.$parse(property);
                this.getters[property] = getter;
            }
            return getter;
        },

        get: function(property) {
            var getter = this._getter(property);

            if (getter != null) {
                return getter(gcAngular.$rootScope);
            }
            return null;
        },

        set: function(property, value, exception) {
            var getter = this._getter(property);

            if (getter != null && getter.assign != null) {
                getter.assign(gcAngular.$rootScope, value);
                gcAngular.$apply(gcAngular.$rootScope);
            }
        },

        watch: function(property, listener) {
        	this.unwatchers[property] = gcAngular.$rootScope.$watch(property, function(newValue, oldValue, scope) {
                if (newValue !== undefined || oldValue !== undefined) {
                    listener(property, oldValue, newValue);
                }
            });
        },
        
        unwatch: function(property, listener) {
        	var unwatcher = this.unwatchers[property];
        	if (unwatcher != null) {
        		unwatcher();
        		this.unwatchers[property] = null;
        	}
        },

        getBindStatus : function (property) {
            var getter = this._getter('global.errors.' + property);
            reurn (getter != null ? getter(gcAngular.$rootScope) : null);
        },

        setBindStatus : function (property, status) {
            var getter = this._getter('global.errors.' + property);
            if (getter != null && getter.assign != null) {
                var oldStatus = getter(gcAngular.$rootScope);
                if( !$TI.helper.valuesEqual(oldStatus,status)) {
                    getter.assign(gcAngular.$rootScope, status);
                    gcAngular.$apply(gcAngular.$rootScope);
                }
                var bind = $TI.guiComposerServer._bindings.getBind( 'ns-prop', property);
                if( bind && bind.onBindStatusChanged) {
                    try {
                        bind.onBindStatusChanged(property, status, oldStatus);
                    }
                    catch(err) {
                        $TI.helper.log("gc-angular.js: ERROR in onBindStatusChanged :" + err);
                    }
                }
            }
        },

        watchBindStatus : function(property, listener) {
        	this.watch('global.errors.' + property, listener);
        }

    };
}

gcAngular.$broadcast = function(scope, name, args) {
	var scopeParam = [].shift.apply(arguments);
	scopeParam.$broadcast.apply(scopeParam, arguments);
	if (gcAngular.childDocumentRootScope != null) {
		gcAngular.childDocumentRootScope.$broadcast.apply(gcAngular.childDocumentRootScope, arguments);
	}
}

gcAngular.$emit = function(scope, name, args) {
	var scopeParam = [].shift.apply(arguments);
	var event = scopeParam.$emit.apply(scopeParam, arguments);
	if (gcAngular.parentDocumentScope != null) {
		gcAngular.parentDocumentScope.$emit.apply(gcAngular.parentDocumentScope, arguments);
	}
	return event;
}

gcAngular.$apply = function(scope, exp) {
    if (!scope.$$phase) {
		scope.$apply(exp);
	}
	if (gcAngular.childDocumentRootScope != null && !gcAngular.childDocumentRootScope.$$phase) {
		gcAngular.childDocumentRootScope.$apply(exp);
	}
	else if (gcAngular.parentDocumentScope != null) {
	    if (!gcAngular.parentDocumentScope.$$phase) {
			gcAngular.parentDocumentScope.$apply(exp);
		}
	}
}

if (!String.prototype.trim) {
   String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};
}

gcAngular.errorRegistry = {
	add: function(scopeVariableName, errMessage, errStatusType) {
		// register error message  
		if (gcAngular.$rootScope.global.errors == null)
		{
			gcAngular.$rootScope.global.errors = { };
			gcAngular.$rootScope.global.errors.global = gcAngular.$rootScope.global.errors;
		}
		
        var getter = gcAngular.$parse('global.errors.' + scopeVariableName);
        if (getter != null && getter.assign != null) {
            getter.assign(gcAngular.$rootScope, { message: errMessage, statusType: errStatusType || "error"});
        }

//		_updateSummary();
		return { 
			remove: function() {
				getter.assign(gcAngular.$rootScope, null);
			}
		}
	},
	_updateSummary: function() {
		var errCount = 0;
		var warningCount = 0;
		var errorMessages = '';
		var warningMessages = '';
		var errors = gcAngular.$rootScope.global.errors || {};
		for(err in _errors) {
			if (_errors.hasOwnProperty(err)) {
				if (err.statusType != 'error') {
					warningCount++;
					warningMessages = warningMessages + 'warning: ' + err.errMsg + '\n';
				} else {
					errorCount++;
					errorMessages = errorMessages + 'error: ' + err.errMsg + '\n';
				}
			}
		}
			
		summary = (errorCount > 0 ? errorCount : 'no') + ' error' + (errorCount == 1 ? '' : 's') + ', ' 
			+ (warningCount > 0 ? warningCount : 'no') + ' warning' + (warningCount == 1 ? '' : 's');
		detailedErrorMessage = errorMessages + warningMessages;
	},
	summary: "no errors, no warnings",
	deatiledErrorMessages: '',
	
	getError: function(relativeUrl, widgetId) {
		return this._errors[relativeUrl+widgetId];
	}
};

function parseProps(props, scope) {
    var result = {};
    if (props != undefined) {
        var propsArray = props.split(";");
        angular.forEach(propsArray, function (prop, index) {
            var propSplit = prop.split(":");
            if (scope.$parent[propSplit[1].trim()]) {
                result[propSplit[0].trim()] = scope.$parent[propSplit[1].trim()];
            }else{
                result[propSplit[0].trim()] = scope.$eval(propSplit[1].trim());            
            }
        });
    }
    return result;
};

gcAngular.directive('dojoWidget', function() {
    return {
        restrict: "A",
        replace: false,
        transclude: false,
        require: '?ngModel',
        scope: {
            'ngModel' : '=',
            'ngClick' : '&',
            'ngChange' : '&',
            'dojoStore' : '&',
            'dojoProps' : '@',
            'dojoDisplayValue' : '='
        },
        link: function(scope, element, attrs, model) {
            require(["dojo/ready", "dijit/dijit",
                attrs.dojoWidget, "dojo/on"], function(ready, dijit, DojoWidget, on) {
                var elem = angular.element(element[0]);
                
                ready(function () {
                    var properties = {};
                    if (attrs.dojoProps) {
                        properties = parseProps(attrs.dojoProps, scope);
                    }
                    
                    if (attrs.dojoStore) {
                        properties.store = scope.dojoStore();
                    };
                    
//                    properties.value = scope.ngModel;
                
                    scope.widget = new DojoWidget(properties, /*element[0],*/ attrs.id);
                    
/*                    on(scope.widget, "blur", function () {
                        if (scope.widget.displayedValue) {
                          scope.dojoDisplayValue = scope.widget.displayedValue;
                        }
                    });

                    on(scope.widget, "change", function(newValue) {
                        scope.ngModel = newValue;
                        scope.$digest();
                        if (scope.ngChange) {
                            scope.ngChange();
                        }
                        scope.$apply();
                    });

                    if (attrs.ngClick) {
                        on(scope.widget, 'click', function() {
                            if (scope.ngClick) {
                                scope.ngClick();
                            }
                        });  
                    }

                    scope.ngModel = scope.widget.get('value');
                    */
                });
            });
        }
    };
});

