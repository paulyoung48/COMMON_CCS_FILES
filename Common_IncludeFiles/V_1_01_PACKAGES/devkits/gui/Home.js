require(["dojo/io/script"]);

/*
 *  ======== Home.js ========
 */

/* Main Angularjs module. This is bootstrapped in Home.html */
var Main_app = angular.module('Main_app', ['gc-angular']);

/*
 *  ======== Main_app.config ========
 *  Main_app.config is called when Main_app module is loaded
 */
Main_app.config(function ($routeProvider) {
    /*  Configure routing behavior. This uses the template '/devkist:solutionName'
     *  to dynamically route to the HTML page corresponding to the solution
     *  name read from the solution.js file in the current CCS project.
     */

    $routeProvider

    	.when('/devkits:solutionName', {
            controller : 'SolutionCtrl',
            template :  "<div style=\"position:relative; display: block; width:100%; height:100%\"><iframe id=\"iframe\"></iframe></div>",
            bindingsUrl: null
         })
});

/*
 *  ======== Main_app.run ========
 *  Main_app.run is called when the injector is done
 *  loading all modules
 */
Main_app.run(function($rootScope, $location) {

    /*  Watch RTSC config param solutionName. It's value is read from
     *  the solution.js file in the current CCS project, and is used to
     *  load the corresponding HTML page.
     */
    $rootScope.$watch('solutionName',
        function (newValue, oldValue) {
            if (newValue == undefined) {
                return;
            }
            routeToSolution(newValue);
    });

    $rootScope.$on("$routeChangeSuccess", function(evt, next, current) {
        if ($location.path() == '/' && $rootScope.solutionName) {
            routeToSolution($rootScope.solutionName);
        }
    });

    function routeToSolution(solutionName) {
        if (solutionName.length > 0) {
            if (String(solutionName).search(/BOOSTXLBUCKCONV_Buck_VMC/i) > -1) {
                $location.path('/devkits.BOOSTXL_BUCKCONV.Buck');
            }
            if (String(solutionName).search(/HV1PHDCAC/i) > -1) {
                $location.path('/devkits.HV_1PH_DCAC.Kit');
            }
			if (String(solutionName).search(/ILPFCKIT/i) > -1) {
                $location.path('/devkits.ILPFCKIT.Kit');
            }
            else if (String(solutionName).search(/TMDSWORKSHOPKITDUMMY_Buck_VMC/i) > -1) {
                $location.path('/devkits.TMDS_WORKSHOPKIT_DUMMY.Kit');
            }
            else if (String(solutionName).search(/TMDSSOLARUINVKIT_MicroInv_Base/i) > -1) {
                $location.path('/devkits.TMDSSOLARUINVKIT.Kit');
            }
            else if (String(solutionName).search(/ILPFC/i) > -1) {
                $location.path('/devkits.TMDSILPFCKIT.ILPFC');
            }
            gcAngular.$apply($rootScope);
        }
    }

});

/*
 *  ======== MainCtrl ========
 *  A controller is required in Home.html, even if it is empty
 */
function MainCtrl ($scope, $location, $rootScope, $route) {
}

/*  Register MainCtrl and inject dependencies */
Main_app.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['$scope', '$location', '$rootScope', '$route'];

/*
 *  ======== SolutionCtrl ========
 *  Controller used to route to the RTSC module and HTML
 *  page that correspond to $routeParams.solutionName.
 */
function SolutionCtrl ($scope, $routeParams, $location) {
    /* this $scope is $parentDocumentScope */
	$scope.solutionUrl = "../devkits" + $routeParams.solutionName + "/index.html";
	var hash = $location.hash();
	if (hash != null && hash.length > 0) {
        $scope.solutionUrl += '#' + hash;
    }
   grace.activePage.setIFrameLocation('iframe', $scope.solutionUrl);
}

/*  Register SolutionCtrl and inject dependencies */
Main_app.controller('SolutionCtrl', SolutionCtrl);
SolutionCtrl.$inject = ['$scope', '$routeParams', '$location'];

