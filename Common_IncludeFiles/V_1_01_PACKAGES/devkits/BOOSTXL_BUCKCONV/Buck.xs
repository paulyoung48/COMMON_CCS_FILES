/*
 *  ======== Buck.xs ========
 *  Buck module logic
 *
 */

 /* this module */
var mod;

/* PowerStage xml document */
var buckXMLDoc = null;

/* development kits directory */
var devKitsDir = '';

/* development kits directory */
var LockFilePath = '';

/* Directory of SRFA app executable */
var SRFADir = '';

/* Directory of Power Stage app executable */
var powerStageGuiDir = '';

/* for access to the powerSuite Home module */
var home = xdc.module("devkits.Home");

/* Path to xml file used to exchange date with powerState gui */
var powerStageXMLFile = '';

/* current CCS project directory */
var projectDir = '';

/*
 *  ======== module$meta$init ========
 *  module init function
 */
function module$meta$init() {

    /* only do any of this stuff in the config model */
    if (xdc.om.$name != "cfg") {
        return;
    }

    mod = this;  /* global access to params in Buck.xdc */

    /*  GetSet manages listener functions for config params defined
     *  in Buck.xdc
     */
    var GetSet = xdc.module("xdc.services.getset.GetSet");
    GetSet.init(this);
    
    GetSet.init(this.COMP[0]);

    /* define listener functions for config params */
    GetSet.onSet(this, "execPowerStage", execPowerStage);
    GetSet.onSet(this, "refreshPowerStage", refreshPowerStageSettings);
    GetSet.onSet(this, "execSFRA", execSFRA);
    GetSet.onSet(this, "saveSettings", saveSettings);

    /* init some directories, which are relative to devkits package */
    var controlSuiteDir = xdc.getPackageBase('devkits') + '../../../../';
    devKitsDir = java.io.File(controlSuiteDir + '/development_kits').getCanonicalPath();
    devKitsDir = String(devKitsDir).replace(/\\/g,'/');
	
    SRFADir = java.io.File(controlSuiteDir + '/libs/app_libs/SFRA/v1_10_00_00/GUI').getCanonicalPath();
    SRFADir = String(SRFADir).replace(/\\/g,'/');
    powerStageGuiDir = xdc.getPackageBase('devkits') + '/utils';
    projectDir = java.io.File(home.getProjectDir()).getCanonicalPath();
    projectDir = String(projectDir).replace(/\\/g,'/');
    powerStageXMLFile = projectDir + '/Buck.xml';
	LockFilePath =  projectDir + '/.cookie';
	
 	print('projectDir: ' + projectDir);
	print('LockFilePath: ' + LockFilePath);
    /* see if our project is in controlSuite installation */
    checkCurrentProjectDir(LockFilePath);

    /* read the solution.js file in the current CCS project */
    readSolutionParams();

    /* Fires $buck.onBuckInitedChanged listener in Buck.js */
    this.SolutionInited = true;
}

/*
 *  ======== module$use ========
 *  Called when this moduled is used via xdc.useModule()
 */
function module$use()
{
}

/*
 *  ======== module$validate ========
 *  Called when the cfg file is saved
 */
function module$validate()
{
    print('validate, xmlFile: ' + powerStageXMLFile);
    if (mod.solution.length > 0 && mod.device.length > 0 && java.io.File(powerStageXMLFile).exists()) {
        writePowerStageXml();
        genHeaderFile();
    }
}

/*
 *  ======== checkCurrentProjectDir ========
 *  Check if the current CCS project is inside of a
 *  controlSUITE installation. If yes, set the config param
 *  projIsInControlSuite to true.
 *  See $scope.$watch('projIsInControlSuite') in Buck.js for
 *  further details.
 */
function checkCurrentProjectDir(LockFilePath)
{
	if(java.io.File(LockFilePath).exists())
	{
		mod.projIsInControlSuite = false;
	}
	else
	{
		mod.projIsInControlSuite = true;
	}
	
    /*if(f.exists())
		 mod.projIsInControlSuite = true;
	else
		 mod.projIsInControlSuite = false;
	*/
    /*if (projectDir.length > devKitsDir.length) {
        if (devKitsDir == projectDir.substr(0, devKitsDir.length)) {
            mod.projIsInControlSuite = true;
        }
    }*/
}

/*
 *  ======== execPowerStage ========
 *  Execute the BuckVMC_PowerStageModel app vi xdc.exec(). This
 *  function is triggered in Buck.js, $scope.execPowerStageClicked()
 *  function. Refer to that function for more detail.
 */
function execPowerStage(sel, val)
{
    if (val == undefined) {
        return;
    }
    if (val == true) {
		writePowerStageXml();

        mod.execPowerStage = false;
        var status = {};
        var attrs = {};
        attrs.cwd = powerStageGuiDir;
        
        print(powerStageGuiDir);

        /* TODO: Scrape 'windir' from the environment. Don't hard code it!!!! */
        attrs.envs = ['PATH=' + attrs.cwd, 'windir=C:/Windows'];
        attrs.async = false;
        xdc.exec('CompDesigner.exe ' + powerStageXMLFile, attrs, status);
		
		readPowerStageXml();
		genHeaderFile();
    }
}

/*
 *  ======== execSFRA ========
 *  Execute the SFRA_GUI app vi xdc.exec(). This function is
 *  triggered in Buck.js, $scope.execSFRAClicked() function. See
 *  that function for more detail.
 */
function execSFRA(sel, val)
{
 	
 
    if (val == undefined) {
        return;
    }
    if (val == true) {

        mod.execSFRA = false;
        var status = {};
        var attrs = {};
        attrs.cwd = SRFADir;
        
     	print('SFRA: '+SRFADir);

        /* TODO: Scrape 'windir' from the environment. Don't hard code it!!!! */
        attrs.envs = ['PATH=' + attrs.cwd, 'windir=C:/Windows'];
        attrs.async = true;
        xdc.exec('SFRA_GUI.exe '+ projectDir + ' 1', attrs, status);
       
    }
}

/*
 *  ======== genHeaderFile ========
 */
function genHeaderFile()
{
	readPowerStageXml();
    var hFile = mod.solution +'_'+mod.type+ '-Settings.h';
    print('genHeaderFile ' + projectDir + '/' + hFile);
    var templateDir = 'devkits/BOOSTXL_BUCKCONV/templates/'+mod.solution+'_'+mod.type+'_' + mod.device;
    var tmpl = xdc.loadTemplate(templateDir + '/' + hFile + '.xdt');
    tmpl.genFile(projectDir + '/' + hFile, mod, [], false);
}

/*
 *  ======== saveSettings ========
 *  Generate source code with values of config params modified
 *  on the Buck HTML page. This function is triggered in Buck.js,
 *  $scope.saveSettingsClicked() function. See that function for more
 *  detail.
 */
function saveSettings(sel, val)
{
    if (val == undefined) {
        return;
    }
    print('saveSettings ' + sel + '  ' + val + '  solution ' + mod.solution + ', device ' +   mod.device);
    if (val == true && mod.solution.length > 0 && mod.device.length > 0) {

        if (String(sel) == 'saveSettings') {
            mod.saveSettings = false;
            print('  calling  writePowerStageXml()');
            writePowerStageXml();
            readPowerStageXml();
        }
        else {
            print('  NOT calling ' + writePowerStageXml());
        }
        genHeaderFile();
    }
}

/*
 *  ======== readPowerStageXml ========
 *  Read the XML file used to exchange data with
 *  BuckVMC_PowerStageModel.exe into config params declared in
 *  Buck.xdc.
 */
function readPowerStageXml()
{
 	print('Read compensation values from XML ');
    if (!java.io.File(powerStageXMLFile).exists()) {
        throw new Error("Can't find PowerStage GUI XML file: " + powerStageXMLFile);
    }
    buckXMLDoc = xdc.loadXML(powerStageXMLFile);
    var PLANT = buckXMLDoc.PLANT;
	
    /* Read power stage xml only for the compensation values */
    var COMP = buckXMLDoc.COMP;
	mod.COMP[0].A0 = Number(COMP.COMP1.A0);
	
	mod.COMP[0].A1 = Number(COMP.COMP1.A1);
	print('Writing COMP0_A1 '+Number(COMP.COMP1.A1) + ' ' + mod.COMP[0].A1);
	mod.COMP[0].A2 = Number(COMP.COMP1.A2);
	mod.COMP[0].A3 = Number(COMP.COMP1.A3);
	mod.COMP[0].B0 = Number(COMP.COMP1.B0);
	mod.COMP[0].B1 = Number(COMP.COMP1.B1);
	mod.COMP[0].B2 = Number(COMP.COMP1.B2);
	mod.COMP[0].B3 = Number(COMP.COMP1.B3);
	
	mod.COMP[1].A0 = Number(COMP.COMP2.A0);
	mod.COMP[1].A1 = Number(COMP.COMP2.A1);
	mod.COMP[1].A2 = Number(COMP.COMP2.A2);
	mod.COMP[1].A3 = Number(COMP.COMP2.A3);
	mod.COMP[1].B0 = Number(COMP.COMP2.B0);
	mod.COMP[1].B1 = Number(COMP.COMP2.B1);
	mod.COMP[1].B2 = Number(COMP.COMP2.B2);
	mod.COMP[1].B3 = Number(COMP.COMP2.B3);
	
	mod.COMP[2].A0 = Number(COMP.COMP3.A0);
	mod.COMP[2].A1 = Number(COMP.COMP3.A1);
	mod.COMP[2].A2 = Number(COMP.COMP3.A2);
	mod.COMP[2].A3 = Number(COMP.COMP3.A3);
	mod.COMP[2].B0 = Number(COMP.COMP3.B0);
	mod.COMP[2].B1 = Number(COMP.COMP3.B1);
	mod.COMP[2].B2 = Number(COMP.COMP3.B2);
	mod.COMP[2].B3 = Number(COMP.COMP3.B3);
	
	mod.COMP[3].A0 = Number(COMP.COMP3.A0);
	mod.COMP[3].A1 = Number(COMP.COMP3.A1);
	mod.COMP[3].A2 = Number(COMP.COMP3.A2);
	mod.COMP[3].A3 = Number(COMP.COMP3.A3);
	mod.COMP[3].B0 = Number(COMP.COMP3.B0);
	mod.COMP[3].B1 = Number(COMP.COMP3.B1);
	mod.COMP[3].B2 = Number(COMP.COMP3.B2);
	mod.COMP[3].B3 = Number(COMP.COMP3.B3);
	
	mod.COMP[4].A0 = Number(COMP.COMP5.A0);
	mod.COMP[4].A1 = Number(COMP.COMP5.A1);
	mod.COMP[4].A2 = Number(COMP.COMP5.A2);
	mod.COMP[4].A3 = Number(COMP.COMP5.A3);
	mod.COMP[4].B0 = Number(COMP.COMP5.B0);
	mod.COMP[4].B1 = Number(COMP.COMP5.B1);
	mod.COMP[4].B2 = Number(COMP.COMP5.B2);
	mod.COMP[4].B3 = Number(COMP.COMP5.B3);
	
	//var COMP_OPTIONS  = buckXMLDoc.COMP_OPTIONS;
	//mod.COMP_NUM_Index = Number(COMP_OPTIONS.COMP_NUM)-1;

}

/*
 *  ======== readSolutionParams ========
 *  Read the solution.js file in the current CCS project,
 *  to be passed as a string in the config param solutionParams
 *  to Buck.js
 *  See $rootScope.$watch('solutionParams') in Buck.js for more details.
 */
function readSolutionParams()
{
    var solutionStr = '';
    var fileModule = xdc.module('xdc.services.io.File');

    /* The solution.js file in the current CCS project */
    var solutionFile = projectDir + '/solution.js';

    if (java.io.File(solutionFile).exists()) {
        var line;
        var file = fileModule.open(solutionFile, "r");
        while ((line = file.readLine()) != null) {
              solutionStr += line;
        }
        file.close();

        /* This assignment fires the solutioParams listener in
         * the $buck.configurationController() function in Buck.js
         */
        mod.solutionParams = solutionStr;
    }
    else {
        throw new Error("Can't find solution description file: " + solutionFile);
    }
}

/*
 *  ======== refreshPowerStageSettings ========
 *  Sync data with BuckVMC_PowerStageModel.exe.
 *  This function is triggered in Buck.js,
 *  $scope.refreshPowerStageClicked() function.
 */
function refreshPowerStageSettings(sel, val)
{
    if (val == undefined) {
        return;
    }
    if (val == true) {
        mod.refreshPowerStage = false;
        readPowerStageXml();
    }
}

/*
 *  ======== writePowerStageXml ========
 *  Write the XML file used to exchange data with
 *  BuckVMC_PowerStageModel.exe from config params declared in
 *  Buck.xdc.
 */
function writePowerStageXml()
{

	// This routine writes 
    if (!java.io.File(powerStageXMLFile).exists()) {
        throw new Error("Can't find PowerStage GUI XML file: " + powerStageXMLFile);
    }
    try {
        if (buckXMLDoc == null) {
            buckXMLDoc = xdc.loadXML(powerStageXMLFile);
        }
        var PLANT = buckXMLDoc.PLANT;
        PLANT.Fsw = String(mod.Fsw*1000);
        PLANT.Fctrl = String(mod.Fctrl*1000);
        PLANT.Vin = String(mod.Vin);
        PLANT.Vout = String(mod.Vout);
        PLANT.Iout = String(mod.Iout);
        PLANT.Vout_SenseMax = String(mod.Vout_SenseMax);
        PLANT.Vin_SenseMax = String(mod.Vin_SenseMax);
        PLANT.Il_SenseMax = String(mod.Il_SenseMax);
        PLANT.Rds1 = String(mod.Rds1);
        PLANT.Rds2 = String(mod.Rds2);
        PLANT.L = String(mod.L/1000000);
        PLANT.DCR = String(mod.DCR);
        PLANT.Ccer = String(mod.Ccer/1000000);
        PLANT.Celec = String(mod.Celec/1000000);
        PLANT.ESRcer = String(mod.ESRcer);
        PLANT.ESRelec = String(mod.ESRelec);
        PLANT.ESLcer = String(mod.ESLcer/1000000);
        PLANT.ESLelec = String(mod.ESLelec/1000000);
        PLANT.Rfltr_a = String(mod.Rfltr_a);
        PLANT.Rfltr_b = String(mod.Rfltr_b);
        PLANT.Cfltr_a = String(mod.Cfltr_a/1000000);
        PLANT.Cfltr_b = String(mod.Cfltr_b/1000000);
        
        var COMP_OPTIONS = buckXMLDoc.COMP_OPTIONS;
        
        COMP_OPTIONS.SFRAPATH = projectDir+"/SFRAData/SFRAData.csv";
        
        print('Writing power stage params to XML and compensation option number!');
        /* save the doc to file */
        var file = java.io.File(powerStageXMLFile);
        var toFile = java.io.RandomAccessFile(file, "rwd");
        toFile.setLength(0);
        toFile.writeBytes(buckXMLDoc.toXMLString());
        toFile.close();
        
        readPowerStageXml();
    }
    catch (e) {
        print('ERROR '+ e.message);
   }
}
