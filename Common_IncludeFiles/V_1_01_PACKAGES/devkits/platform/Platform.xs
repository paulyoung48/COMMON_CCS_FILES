/*
 *  ======== Platform.xs ========
 *  Platform support for the generic platform
 */

var Utils = xdc.useModule('xdc.platform.Utils');

/*
 *  ======== Platform.getCpuDataSheet ========
 *  This Platform's implementation xdc.platform.IPlatform.getCpuDataSheet.
 *
 *  Return the xdc.platform.ICpuDataSheet.Instance object that corresponds
 *  to the device that runs executables loaded on the specified cpuId.
 */
function getCpuDataSheet(cpuId)
{
    return (Utils.getCpuDataSheet(this.CPU));
}

/*
 *  ======== Platform.getExeContext ========
 *  This Platform's implementation xdc.platform.IPlatform.getExeContext.
 *
 *  Return the xdc.platform.IPlatform.ExeContext object that will run the 
 *  specified program prog.
 */
function getExeContext(prog)
{
    /* create an execution context using the "stock" implementation */
    var ExeContext = xdc.useModule('xdc.platform.ExeContext');
    var cpu = ExeContext.create(this.CPU, this.$module.BOARD);

    /* Set the initial memory map from the cpu datasheet. */
    cpu.memoryMap = Utils.assembleMemoryMap(cpu, this, true);

    // check for the overlap in the memory map
    var overlap = Utils.checkOverlap(cpu.memoryMap);

    if (overlap != null) {
	this.$module.$logError("Memory objects " + overlap + " overlap", this,
	    overlap);
    }

    /* assign values to codeMemory and dataMemory */
    _initDefaultMemory(this, cpu.memoryMap);
    Utils.checkDefaults(this, cpu.memoryMap);
    return (cpu);
}

/*
 *  ======== Platform.getExecCmd ========
 *  This Platform's implementation of xdc.platform.IPlatform.getExecCmd.
 */
function getExecCmd(prog)
{
    return ("@$(ECHO) "	+ this.$package.$name + " cannot run " + prog.name);
}

/*
 *  ======== Platform.getLinkTemplate ========
 *  This is Platform's implementation of xdc.platform.IPlatform.getLinkTemplate
 */
function getLinkTemplate(prog)
{
    var templateName = "devkits/platform/linkcmd.xdt";

    if (xdc.findFile(templateName) != null) {
        return (templateName);
    }
    else {
        throw xdc.$$XDCException(
            this.$package.$name + ".LINK_TEMPLATE_ERROR",
            "can't find linker command template 'linkcmd.xdt'.");
    }
}

/*
 *  ======== Platform.Instance.init ========
 *  This function is called to initialize a newly created instance of a
 *  platform.  Platform instances are created just prior to running
 *  program configuration scripts.
 *
 *  Platform instances may also be created in the build domain.
 *
 *  @param(name)	the name used to identify this instance (without
 *  			the package name prefix).
 */
function instance$meta$init(name)
{
    this.$private.name = name;    /* instance name */

    var nameParams = name.split(":");
    var dev = nameParams[0];

    this.catalogName = "ti.catalog.c2800";
    this.clockRate = 60;

    if (dev == "") {
	this.deviceName = "TMS320F28069";
    }
    else {
	var k = dev.lastIndexOf('.');
	if (k != -1) {
	    this.deviceName = dev.substring(k + 1);
	    this.catalogName = dev.substring(0, k);
	}
	else {
	    this.deviceName = dev;
	}
    }	    

    if (this.deviceName == null) {
        this.$module.$logError("Parameter 'deviceName' must be specified for"
            + " 'devkits.platform' platform.", this, this.deviceName);
    }
        
    if (this.catalogName == null) {
	this.$module.$logError("Parameter 'catalogName' must be specified for"
            + " 'devkits.platform' platform.", this, this.catalogName);
    }

    /* since we are a generic platform we don't know the catalog package until 
     * now, we must dynamically import it here; "real" platforms would declare 
     * this statically in their package.xdc file.
     */
    xdc.loadPackage(this.catalogName);

    if (!(this.deviceName in xdc.om[this.catalogName])) {
        this.$module.$logError("Device " + this.deviceName + " does not exist " 
            + "in " + this.catalogName, this, this.deviceName);
    }

    if (this.clockRate == null) {
        this.$module.$logError("Parameter 'clockRate' must be specified for"
            + " 'devkits.platform' platform.", this, this.clockRate);	
    }
        
    this.CPU.deviceName = this.deviceName;
    this.CPU.catalogName = this.catalogName;
    this.CPU.clockRate = this.clockRate;
}

/*
 *  ======== _initDefaultMemory ========
 *  Initialize platform's config parameters that define in which memory 
 *  segments to place code and data sections
 */
function _initDefaultMemory(plat, memMap)
{
    /* We need to automatically select codeMemory, dataMemory and stackMemory
     * if they are not defined. The three flags defined below are used to
     * differentiate between user selected objects and selections made in this
     * function. If we already selected a memory object, when we later find
     * another one that could be used and has more space, we switch to that
     * new one. But, if the user selected a memory object, we don't want to
     * redefine it.
     */ 
    var userCodeMem = (plat.codeMemory != null);
    var userDataMem = (plat.dataMemory != null);
    var userStackMem = (plat.stackMemory != null);

    /* The references to the select memory objects are needed to be able to
     * quickly read their 'len' parameters.
     */
    var codeObj = null;
    var dataObj = null;

    /* look for a memory of the right type */
    for (var j = 0; j < memMap.length; j++) {
	var mem = memMap[j];
	/* If neither 'space' nor 'page' are defined, the memory segment
	 * can be used for both, code and data.
	 */
	if (mem.space == undefined && mem.page == undefined) {
            if (!userCodeMem && (codeObj == null || codeObj.len < mem.len)) {
                codeObj = mem;
                plat.codeMemory = codeObj.name;
	    }
            if (!userDataMem && (dataObj == null || dataObj.len < mem.len)) {
                dataObj = mem;
                plat.dataMemory = dataObj.name;
	    }
	}
	    
	else if (mem.space != undefined) {
	    if (mem.space.indexOf("code") >= 0) {
                if (!userCodeMem &&
                    (codeObj == null || codeObj.len < mem.len)) {
                    codeObj = mem;
                    plat.codeMemory = codeObj.name;
	        }
	    }
	    if (mem.space.indexOf("data") >= 0) {
                if (!userDataMem &&
                    (dataObj == null || dataObj.len < mem.len)) {
                    dataObj = mem;
                    plat.dataMemory = dataObj.name;
	        }
	    }
	}

	else if (mem.page != undefined) {
	    if (mem.page == 0) {
                if (!userCodeMem &&
                    (codeObj == null || codeObj.len < mem.len)) {
                    codeObj = mem;
                    plat.codeMemory = codeObj.name;
	        }
	    }
	    if (mem.page == 1) {
                if (!userDataMem &&
                    (dataObj == null || dataObj.len < mem.len)) {
                    dataObj = mem;
                    plat.dataMemory = dataObj.name;
	        }
	    }
	
	}
    }

    /* if any of two config parameters is null, we cannot continue because the
     * name of the segment for some section would be 'null'.
     */
    if (plat.dataMemory == null) {
	this.$module.$logError(
	    "dataMemory in the devkits.platform platform is null");
    }
    if (plat.codeMemory == null) {
	this.$module.$logError(
	    "codeMemory in the devkits.platform platform is null");
    }
    if (!userStackMem) {
        plat.stackMemory = plat.dataMemory;
    }
}

