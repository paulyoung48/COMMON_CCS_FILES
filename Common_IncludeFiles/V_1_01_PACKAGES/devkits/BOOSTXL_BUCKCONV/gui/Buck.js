/*
 *  ======== {Solution}.js ========
 * 	javascipt file for manipulating GUI widgets and
 *  bindings to RTSC config params.
 * {Solution} -> 'Buck'
 */

require(["dojo/io/script"]);

/*  Global object defined in the solution.js
 *  file in the current CCS project
 */
var $solution;

/* this */
var $buck = {};

/* Angularjs {Solution} module */
$buck.app = angular.module('$buck.app', ['gc-angular']);

/*
 *  ======== ${Solution}.app.config ========
 *  Registers work that needs to be done on ${Solution}.app module loading
 */
$buck.app.config(function ($routeProvider) {
    /*  Register routing. This uses an Angularjs routing template that can
     *  be set dynamically. In powerSUITE, this route is set after the
     *  solution.js file in the current CCS project is read. See
     *  call to $location.path() in the ${Solution}.app.run().
     *  Our routing provides a controller function in this file,
     *  a template Url (html file) and a bindingsUrl, which is a .json
     *  file that contains bindings to RTSC config params in {Solution}.xdc.
     */
    $routeProvider
        .when('/buckConfigure:solution',
            {
                controller  :  '$buck.configurationController',
                templateUrl :  function (params) { return ('pages/Buck_' + params.solution + '.html'); },
                bindingsUrl :  'BuckConfigure.json'
            })
});

/*
 *  ======== ${Solution}.app.run ========
 * Called when all Angularjs modules are loaded
 */
$buck.app.run(function($rootScope, $location) {

    /*  Listener for the config param solutionParams, declared in {Solution}.xdc
     *  solutionParams is a string that contains the solution.js file in the
     *  current CCS project. This listener gets fired when solutionParams
     *  is initialized in the {Solution}.xs function readSolutionParams()
     */
    $rootScope.$watch('solutionParams',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            if (newValue.length > 0) {

                /* Evaluates the contents of solution.js as javascript code
                 * making the $solution variable defined in solution.js available
                 * as a global object.
                 */
                eval(newValue);

                /*  Parse the $solution.name field to get the general solution
                 *  and device. $solution.name is in the format "{Solution}_{Type}_{device}"
                 */
                var nameArr = $solution.name.split('_');

                /* Set the solution config param. Used to generate files in {Solution}.xs */
                $rootScope.solution = $buck.solution = nameArr[1];
				
				/* Set the type config param. Used to generate files in {Solution}.xs */
                $rootScope.type = $buck.type = nameArr[2];

                /* Set the device config param. Used to generate files in {Solution}.xs */
                $rootScope.device = $buck.device = nameArr[3];

                /* Route to the specific solution. Routes were initialized in ${Solution}.app.config() */
                $location.path('/buckConfigure' + $buck.type);
            }
            gcAngular.$apply($rootScope);  /* apply all changes to $rootScope */
    });
});

/*
 *  ======== $buck.configurationController ========
 *  Angularjs controller function for the HTML page of the current
 *  solution. This function is specified when routing is registerd in
 *  $buck.app.config(). The $scope input parameter is the scope of the
 *  current HTML page that is being displayed.
 */
$buck.configurationController = function($scope, $rootScope) {

    /*
     *  ======== initBuckConfigurationPage ========
     *  Initialize the widgets on the current HTML page
     */
    function initBuckConfigurationPage() {
        dijit.byId('buckConfigureLabel').set('label', $buck.solution +' '+ $buck.type + ' ' + $buck.device);
        var labels = [];

        /* Populate the adcPinVIN droplist */
        for (var i = 0; i < $solution.adcPinVIN.length; i++) {
            labels.push($solution.adcPinVIN[i].label);
        }
        dijit.byId('adcVinSelect').set('labels', labels);

        /* Populate the PWM droplist */
        labels = [];
        for (i = 0; i < $solution.pwmNo.length; i++) {
            labels.push('PWM' + $solution.pwmNo[i].num);
        }
        dijit.byId('pwmSelect').set('labels', labels);

        /* Populate the adcIL droplist */
        labels = [];
        for (i = 0; i < $solution.adcIL.length; i++) {
            labels.push($solution.adcIL[i].label);
        }
        dijit.byId('adcILSelect').set('labels', labels);

        /* Populate the adcPinVOUT droplist*/
        labels = [];
        for (var i = 0; i < $solution.adcPinVOUT.length; i++) {
            labels.push($solution.adcPinVOUT[i].label);
        }
        dijit.byId('adcVoutSelect').set('labels', labels);
		
		/* Populate the adcPinIL_AVG droplist*/
        labels = [];
        for (var i = 0; i < $solution.adcPinIL_AVG.length; i++) {
            labels.push($solution.adcPinIL_AVG[i].label);
        }
        dijit.byId('adcIL_AVGSelect').set('labels', labels);
		
		/* Populate the COMP_NUM droplist*/
        labels = [];
        for (var i = 0; i < $solution.COMP_NUM.length; i++) {
            labels.push($solution.COMP_NUM[i].label);
        }
        dijit.byId('COMP_NUM_Select').set('labels', labels);
		
		/* Populate the Fsw to Fctrl ratio droplist*/
        labels = [];
        for (var i = 0; i < $solution.Fsw_Fctrl_Ratio.length; i++) {
            labels.push($solution.Fsw_Fctrl_Ratio[i].label);
        }
        dijit.byId('Fsw_Fctrl_Ratio_Select').set('labels', labels);
		
		/* Populate the INCR_BUILD ratio droplist*/
        labels = [];
        for (var i = 0; i < $solution.INCR_BUILD.length; i++) {
            labels.push($solution.INCR_BUILD[i].label);
        }
        dijit.byId('INCR_BUILD_Select').set('labels', labels);
		
        /* Set the label on the "Save Settings" button to the current buck solution */
        dijit.byId('saveSettings').set('label', 'Save ' + $buck.solution + ' ' + $buck.type+ ' Settings');
		
    }

    /* PWM droplist listener. pwmIndex is the index of the item selected */
    $scope.$watch('pwmIndex',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            /*  Set config param pwmNo, which is resonsible for setting
             *  #define BUCK_PWM_NO in the generated header file
             */
            $rootScope.pwmNo = $solution.pwmNo[newValue].num;

            /*  Set config param adcTriggerSource, which is resonsible for setting
             *  #define ADC_TRIG_SOURCE in the generated header file
             */
            $rootScope.adcTriggerSource = $solution.pwmNo[newValue].adcTriggerSrc;
    });

    /* adcPinVIN droplist listener. adcPinVINIndex is the index of the
       item selected
     */
    $scope.$watch('adcPinVINIndex',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            /* Set the adcPinVIN RTSC config param so it is saved
             *  in the current CCS project's .cfg file
             */
            $rootScope.adcPinVIN = $solution.adcPinVIN[newValue].pin;
			
			var vIn = dijit.byId('adcVinSelect').get('value');
			var vOut = dijit.byId('adcVoutSelect').get('value');
			var iIL = dijit.byId('adcILSelect').get('value');
			var iIL_AVG = dijit.byId('adcIL_AVGSelect').get('value');
			
			Repopulate_SafeDropList('adcILSelect',[vIn,vOut,iIL_AVG]);	
			Repopulate_SafeDropList('adcVoutSelect',[vIn,iIL,iIL_AVG]);
			Repopulate_SafeDropList('adcIL_AVGSelect',[vOut,iIL,vIn]);
			
    });

    /* adcPinVOUT droplist listener. adcPinVOUTIndex is the index of the
       item selected
     */
    $scope.$watch('adcPinVOUTIndex',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }

            /* Set the adcPinVOUT RTSC config param so it is saved
             *  in the current CCS project's .cfg file
             */
            $rootScope.adcPinVOUT = $solution.adcPinVOUT[newValue].pin;

            /*  If adcPinVOUT has an asociated moduleNo defined in out current CCS
             *  project's solution.js file, the set the adcModuleNo RTSC config param
             *  so it is saved in our current project's .cfg file
             */
            if ($solution.adcPinVOUT[newValue].moduleNo != undefined) {
                $rootScope.adcModuleNo = $solution.adcPinVOUT[newValue].moduleNo;
            }

            var vIn = dijit.byId('adcVinSelect').get('value');
			var vOut = dijit.byId('adcVoutSelect').get('value');
			var iIL = dijit.byId('adcILSelect').get('value');
			var iIL_AVG = dijit.byId('adcIL_AVGSelect').get('value');
			
			Repopulate_SafeDropList('adcILSelect',[vIn,vOut,iIL_AVG]);	
			Repopulate_SafeDropList('adcVinSelect',[vOut,iIL,iIL_AVG]);
			Repopulate_SafeDropList('adcIL_AVGSelect',[vOut,iIL,vIn]);			
    });
	
	
	/* adcPinIL_AVG droplist listener. adcPinIL_AVGIndex is the index of the
       item selected
     */
    $scope.$watch('adcPinIL_AVGIndex',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }

            /* Set the adcPinIL_AVG RTSC config param so it is saved
             *  in the current CCS project's .cfg file
             */
            $rootScope.adcPinIL_AVG = $solution.adcPinIL_AVG[newValue].pin;

            /*  If adcPinIL_AVG has an asociated moduleNo defined in out current CCS
             *  project's solution.js file, the set the adcModuleNo RTSC config param
             *  so it is saved in our current project's .cfg file
             */
            if ($solution.adcPinIL_AVG[newValue].moduleNo != undefined) {
                $rootScope.adcModuleNo = $solution.adcPinIL_AVG[newValue].moduleNo;
            }

            var vIn = dijit.byId('adcVinSelect').get('value');
			var vOut = dijit.byId('adcVoutSelect').get('value');
			var iIL = dijit.byId('adcILSelect').get('value');
			var iIL_AVG = dijit.byId('adcIL_AVGSelect').get('value');
			
			Repopulate_SafeDropList('adcILSelect',[vIn,vOut,iIL_AVG]);	
			Repopulate_SafeDropList('adcVinSelect',[vOut,iIL,iIL_AVG]);
			Repopulate_SafeDropList('adcVoutSelect',[vIn,iIL,iIL_AVG]);		
    });
	

    /* pwmSwitchingFreq text box listener */
    $scope.$watch('pwmSwitchingFreq',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            /* This is an example of how to validate a text box field entry */
            if (newValue < $solution.pwmSwitchingFreq.min || newValue > $solution.pwmSwitchingFreq.max) {
               /*
                $TI.helper.showDialog('Invalid entry', 'PWM Switching Frequency must be >= ' +
                                      $solution.pwmSwitchingFreq.min + ' and <= ' + $solution.pwmSwitchingFreq.max);
                $rootScope.pwmSwitchingFreq = oldValue;
               */
            }
    });

    /* adcIL droplist listener. adcILIndex is the index of the
       item selected
     */
    $scope.$watch('adcILIndex',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }

            /* Set adcILPin RTSC config param so it is saved in cfg script */
            $rootScope.adcILPin = $solution.adcIL[newValue].pin;

            /* Save the corresponding adcIL comparator value as specified in the
             * solution.js file of the current CCS project
             */
            $rootScope.adcILComparator = $solution.adcIL[newValue].comparator;
			
			var vIn = dijit.byId('adcVinSelect').get('value');
			var vOut = dijit.byId('adcVoutSelect').get('value');
			var iIL = dijit.byId('adcILSelect').get('value');
			var iIL_AVG = dijit.byId('adcIL_AVGSelect').get('value');
			
			Repopulate_SafeDropList('adcVoutSelect',[vIn,iIL]);	
			Repopulate_SafeDropList('adcVinSelect',[vOut,iIL]);
			Repopulate_SafeDropList('adcIL_AVGSelect',[vOut,iIL,vIn]);	
	
    });
	
	/* INCR_BUILD_Index listener. 
     */
    $scope.$watch('INCR_BUILD_Index',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
		$rootScope.INCR_BUILD = $rootScope.INCR_BUILD_Index+1;
	
    });

    /*
     *  ======== saveSettingsClicked ========
     *  Called when the "Save Settings" button is clicked. This function
     *  is registered in the solution's HTML file.
     */
    $scope.saveSettingsClicked = function() {
        if ($scope.saveSettings == false) {

            /*  Set RTSC config param saveSettings to true.
             *  This will invoke the listener function genSolutionSettings()
             *  in Buck.xs, which generates the solution specific header file.
             */
            $rootScope.saveSettings = true;
        }
    };

    /*
     *  ======== execPowerStageClicked ========
     *  Called when the "Compensation Designer..." button is clicked.
     *  This function is registered in the solution's HTML file.
     */
    $scope.execPowerStageClicked = function() {
        if ($scope.execPowerStage == false) {

            /*  Set RTSC config param execPowerStage to true.
             *  This will invoke the listener function execPowerStage()
             *  in Buck.xs, which execs BuckVMC_PowerStageModel.exe
             */
            $rootScope.execPowerStage = true;
        }
    };

    /*
     *  ======== execSFRAClicked ========
     *  Called when the "Runtime FRA ..." button is clicked.
     *  This function is registered in the solution's  HTML file.
     */
    $scope.execSFRAClicked = function() {
        if ($scope.execSFRA == false) {

            /*  Set RTSC config param execSFRA to true.
             *  This will invoke the listener function execSFRA()
             *  in Buck.xs, which execs SFRA_GUI.exe
             */
            $rootScope.execSFRA = true;
        }
    };

    /*
     *  ======== refreshPowerStageClicked ========
     *  Called when the "Refresh" button is clicked.
     *  This function is registered in the solution's HTML file.
     */
    $scope.refreshPowerStageClicked = function() {
        if ($scope.refreshPowerStage == false) {
            $rootScope.refreshPowerStage = true;
        }
    };

    /*  RTSC config param "solutionParams" listener. There is also a listener
     *  in $buck.app.run() that does the same thing. See that function for details.
     *  This is a safety measure in case the listener in $buck.app.run hassn't
     *  been fired yet.
     */
    $scope.$watch('solutionParams',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            if (newValue.length > 0) {
                if ($solution == undefined) {
                    eval(newValue);
                }

                /* Now that we sre sure our current $solution evaluated, we can
                 * init the HTML page
                 */
                initBuckConfigurationPage();
            }
    });

    /*  Listener for config param projIsInControlSuite that tells us if
     *  the current CCS project is inside of a controlSUITE installation.
     *  If yes, we want to disable some widgets for being modified because
     *  the current project is "golden" and should only be modified after
     *  it is imported from CCS to a different location.
     */
    $scope.$watch('projIsInControlSuite',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            if (newValue == true) {
				
				// adcVinSelect 
                if (dijit.byId('adcVinSelect') != undefined) {
                    dijit.byId('adcVinSelect').set('readOnly', true);
                }
				
				// pwmSelect 
                if (dijit.byId('pwmSelect') != undefined) {
                    dijit.byId('pwmSelect').set('disabled', true);
                }
				
				// adcILSelect 
                if (dijit.byId('adcILSelect') != undefined) {
                    dijit.byId('adcILSelect').set('disabled', true);
                }
				
				//adcIL_AVGSelect
                if (dijit.byId('adcIL_AVGSelect') != undefined) {
                    dijit.byId('adcIL_AVGSelect').set('disabled', true);
                }

				
				// adcVoutSelect 
                if (dijit.byId('adcVoutSelect') != undefined) {
                    dijit.byId('adcVoutSelect').set('disabled', true);
                }
				
				// L_TextBox 
                if (dijit.byId('L_TextBox') != undefined) {
                    dijit.byId('L_TextBox').set('readOnly', true);
                }
				
				// DCR_TextBox 
                if (dijit.byId('DCR_TextBox') != undefined) {
                    dijit.byId('DCR_TextBox').set('readOnly', true);
                }
				
				// Celec_TextBox 
                if (dijit.byId('Celec_TextBox') != undefined) {
                    dijit.byId('Celec_TextBox').set('readOnly', true);
                }
				
				// ESRelec_TextBox 
                if (dijit.byId('ESRelec_TextBox') != undefined) {
                    dijit.byId('ESRelec_TextBox').set('readOnly', true);
				}
					
				// ESLelec_TextBox 
                if (dijit.byId('ESLelec_TextBox') != undefined) {
                    dijit.byId('ESLelec_TextBox').set('readOnly', true);
                }
				// Ccer_TextBox 
                if (dijit.byId('Ccer_TextBox') != undefined) {
                    dijit.byId('Ccer_TextBox').set('readOnly', true);
                }
				
				// ESRcer_TextBox 
                if (dijit.byId('ESRcer_TextBox') != undefined) {
                    dijit.byId('ESRcer_TextBox').set('readOnly', true);
				}
					
				// ESLcer_TextBox 
                if (dijit.byId('ESLcer_TextBox') != undefined) {
                    dijit.byId('ESLcer_TextBox').set('readOnly', true);
                }
				
				// Ra_TextBox 
                if (dijit.byId('Ra_TextBox') != undefined) {
                    dijit.byId('Ra_TextBox').set('readOnly', true);
                }
				
				// Rb_TextBox 
                if (dijit.byId('Rb_TextBox') != undefined) {
                    dijit.byId('Rb_TextBox').set('readOnly', true);
                }
				
				// Rc_TextBox 
                if (dijit.byId('Rc_TextBox') != undefined) {
                    dijit.byId('Rc_TextBox').set('readOnly', true);
                }
				
				// Rd_TextBox 
                if (dijit.byId('Rd_TextBox') != undefined) {
                    dijit.byId('Rd_TextBox').set('readOnly', true);
                }
				
				// Rfltr_a_TextBox 
                if (dijit.byId('Rfltr_a_TextBox') != undefined) {
                    dijit.byId('Rfltr_a_TextBox').set('readOnly', true);
                }
				
				// Rfltr_b_TextBox 
                if (dijit.byId('Rfltr_b_TextBox') != undefined) {
                    dijit.byId('Rfltr_b_TextBox').set('readOnly', true);
                }
				
				// Cfltr_a_TextBox 
                if (dijit.byId('Cfltr_a_TextBox') != undefined) {
                    dijit.byId('Cfltr_a_TextBox').set('readOnly', true);
                }
				
				// Cfltr_b_TextBox 
                if (dijit.byId('Cfltr_b_TextBox') != undefined) {
                    dijit.byId('Cfltr_b_TextBox').set('readOnly', true);
                }
				
				// Rcs_TextBox 
                if (dijit.byId('Rcs_TextBox') != undefined) {
                    dijit.byId('Rcs_TextBox').set('readOnly', true);
                }
				
				// I_gain_TextBox
                if (dijit.byId('I_gain_TextBox') != undefined) {
                    dijit.byId('I_gain_TextBox').set('readOnly', true);
                }
				
				// Rds1_TextBox 
                if (dijit.byId('Rds1_TextBox') != undefined) {
                    dijit.byId('Rds1_TextBox').set('readOnly', true);
                }
				
				// Rds2_TextBox 
                if (dijit.byId('Rds2_TextBox') != undefined) {
                    dijit.byId('Rds2_TextBox').set('readOnly', true);
                }
				
			}
				
    });
	

	
	//  Listener for compensation selection change 
 
	$scope.$watch('COMP_NUM_Index',
      function (newValue, oldValue) {
          if (newValue == undefined) {
              return;
          }
		  // Set the RTSC config param so it is saved in cfg script 
          $rootScope.COMP_NUM = $solution.COMP_NUM[newValue].value;
	});
	
	//  Listener for Fsw change 

	$scope.$watch('Fsw',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Fsw_Fctrl_Ratio == undefined) {
              return;
          }
		  // Set the RTSC config param so it is saved in cfg script 
		  $rootScope.Fctrl = Number($rootScope.Fsw) / Number($rootScope.Fsw_Fctrl_Ratio);
	});

	//  Listener for compensation  ratio selection change 

	$scope.$watch('Fsw_Fctrl_Ratio_Index',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Fsw == undefined) {
              return;
          }
		  // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Fsw_Fctrl_Ratio = $solution.Fsw_Fctrl_Ratio[newValue].value;
		  $rootScope.Fctrl = Number($rootScope.Fsw) / Number($rootScope.Fsw_Fctrl_Ratio);
	});
	
	//  Listener for Rd change 

	$scope.$watch('Rd',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Rc == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Vout_SenseMax = Number(((Number($rootScope.Rc) + Number($rootScope.Rd)) * $solution.adcMaxRange)/(Number($rootScope.Rd))).toFixed(2);	
		  
	});
	
	//  Listener for Rc change 

	$scope.$watch('Rc',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Rd == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Vout_SenseMax = Number(((Number($rootScope.Rc) + Number($rootScope.Rd)) * $solution.adcMaxRange)/(Number($rootScope.Rd))).toFixed(2);	
		  
	});
	
	//  Listener for Ra change 

	$scope.$watch('Ra',
      function (newValue, oldValue) {
          if (newValue == undefined  || $rootScope.Rb == undefined) {
              return;
          }
		  $rootScope.Vin_SenseMax = Number(((Number($rootScope.Ra) + Number($rootScope.Rb)) * $solution.adcMaxRange)/(Number($rootScope.Rb))).toFixed(2);	
		  
	});
	
	//  Listener for Rb change 
/*
	$scope.$watch('Rb',
      function (newValue, oldValue ) {
          if (newValue == undefined || $rootScope.Ra == undefined) {
              return;
          }
		  $rootScope.Vin_SenseMax = Number(((Number($rootScope.Ra) + Number($rootScope.Rb)) * $solution.adcMaxRange)/(Number($rootScope.Rb))).toFixed(2);
		  
	});
*/
	
	//  Listener for Cfltr_a change 
	 
	$scope.$watch('Cfltr_a',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Rfltr_a == undefined) {
              return;
          }
		 // Set the RTSC config param so it is saved in cfg script 
         $rootScope.Vout_Sense_Fltr_Cuttoff = Number(1000.0 / (2*3.14*(Number($rootScope.Rfltr_a))*(Number($rootScope.Cfltr_a)))).toFixed(3);	 
	});
	
	//  Listener for Rfltr_a change 
	 
	$scope.$watch('Rfltr_a',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Cfltr_a == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Vout_Sense_Fltr_Cuttoff = Number(1000.0 / (2*3.14*(Number($rootScope.Rfltr_a))*(Number($rootScope.Cfltr_a)))).toFixed(3);	 
	});
	
	
	//  Listener for Cfltr_b change 
	 
	$scope.$watch('Cfltr_b',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Rfltr_b == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Il_Sense_Fltr_Cuttoff = Number(1000.0 / (2*3.14*(Number($rootScope.Rfltr_b))*(Number($rootScope.Cfltr_b)))).toFixed(3);	 
	});

	
	//  Listener for Rfltr_a change 
	 
	$scope.$watch('Rfltr_b',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Cfltr_b == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Il_Sense_Fltr_Cuttoff = Number(1000.0 / (2*3.14*(Number($rootScope.Rfltr_b))*(Number($rootScope.Cfltr_b)))).toFixed(3);	 
	});	

	//  Listener for Rcs change 
	
	$scope.$watch('Rcs',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.I_gain == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Il_SenseMax = Number($solution.adcMaxRange/(Number($rootScope.Rcs)*Number($rootScope.I_gain))).toFixed(2);
	});
	
	//  Listener for I_gain change 
	 
	$scope.$watch('I_gain',
      function (newValue, oldValue) {
          if (newValue == undefined || $rootScope.Rcs == undefined) {
              return;
          }
		   // Set the RTSC config param so it is saved in cfg script 
          $rootScope.Il_SenseMax = Number($solution.adcMaxRange/(Number($rootScope.Rcs)*Number($rootScope.I_gain))).toFixed(2);
	});
	
    //  Since these are Transient config params, they need to be initiazed
    //  in this controller controller
	
	$rootScope.type = $buck.type;
    $rootScope.solution = $buck.solution;
    $rootScope.device = $buck.device;
    gcAngular.$apply($rootScope);
};

/* Register $buck.configurationController */
$buck.app.controller('$buck.configurationController', $buck.configurationController);

/*  Inject $scope and $rootScope dependencies into $buck.configurationController()
 *  These will be passed to $buck.configurationController() as paramters in the
 *  same order indicated here.
 */
$buck.configurationController.$inject = ['$scope', '$rootScope'];

/*
 *  ======== $buck.initialBindings ========
 *  $buck initialBindings object. This contains a listener function,
 *  notifyChanged(), which is called when RTSC config params that are required
 *  for current HTML page initialization have been bound by guiComposer to the
 *  current $scope. When all required bindings are complete, gcAngular.bootstrap()
 *  is call to load the HTML.
 */
$buck.initialBindings = {
    inited: false,
    ready: false,
    notifyChanged: function() {
        if (this.ready == false && this.inited == true) {
            this.ready = true;
            $TI.helper.log("Buck.js: bootstrapping gcAngular now.");
            gcAngular.bootstrap(document.body, ['$buck.app']);
        }
    }
};

/*
 *  ======== $buck.onSolutionInitedChanged ========
 *  Listener on RTSC config param buckInited. This function
*   is registered in Buck.json.
 */
$buck.onSolutionInitedChanged = function (newValue) {
    if (newValue == true) {
        $buck.initialBindings.inited = true;
        $buck.initialBindings.notifyChanged();
    }
};

/*
 *  ======== Repopulate_SafeDropList(wdgtName,selArr) ========
 *  Greys out the entries in the drop down list for the widget 
*   if the string of those entries matches i.e. is a substring of 
*   of entries in a selection array that is passes as an argument
 */
	function Repopulate_SafeDropList(wdgtName,selArr)
	{
		/* gets the labels in an array*/
        var wdgtLabels = dijit.byId(wdgtName).get('labels');
        var foundArr = [];	
		for (var j=0; j<selArr.length; j++) {
			for (var i=0;i < wdgtLabels.length; i++) {
				if(wdgtLabels[i].indexOf(selArr[j]) > -1){
					foundArr.push(i);
				}
				else if(selArr[j].indexOf(wdgtLabels[i])>-1){
					foundArr.push(i);
				}
			}
		}
		if (foundArr.length>0) {
			var index = dijit.byId(wdgtName).get('index');
			dijit.byId(wdgtName).set('labels', wdgtLabels);
			for(var k=0; k<foundArr.length;k++){
				dijit.byId(wdgtName).options[foundArr[k]].disabled = true;
			}
			dijit.byId(wdgtName).set('index', index);
		}	
	}