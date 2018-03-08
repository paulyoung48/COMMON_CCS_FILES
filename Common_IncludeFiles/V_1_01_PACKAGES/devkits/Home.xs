/*
 *  ======== Home.xs ========
 *  Home module script file. The Home module is the top level
 *  global module in powerSuite
 */
 
/*
 *  ======== module$meta$init ========
 *  This function is called just once when the package containing this
 *  file is first imported.
 */
function module$meta$init()
{
    if (xdc.om.$name != "cfg") {
        return;
    }

    /* setup config API version check */
    var GetSet = xdc.module("xdc.services.getset.GetSet");
    GetSet.onSet(this, "configApiVersion", _checkVersion);
}

/*
 *  ======== module$use ========
 *  This function is called only when this module is used in a
 *  configuration (via xdc.useModule()).
 *  Initializes config params projectDir and solutioName.
 */
function module$use()
{
    this.projectDir = getProjectDir();
    if (java.io.File(this.projectDir + '/solution.js').exists()) {
        var $solution;
        var str = readFile(this.projectDir + '/solution.js');
        eval(str);
        this.solutionName = $solution.name;
    }
    else {
        throw new Error('Solution description file: ' + this.projectDir + '/solution.js not found');
    }
}

/*
 *  ======== getProjectDir ========
 *  Return the absolute path of the CCS project that
 *  is currently using this module
 */
function getProjectDir()
{
    var projectDir = null;;
    if (xdc.om.$name == "cfg") {
        /* default to CCS physical design */
        projectDir = java.io.File(Program.build.cfgScript).parent;
    }
    if (projectDir == null) {
        /* if not in the cfg model, assume xdc physical design */
        projectDir = ".";
    }
    if (projectDir.match(/\s/)) {
        var File = xdc.module("xdc.services.io.File");
        projectDir = File.getDOSPath(projectDir);
    }
    return (projectDir);    
}

/*
 *  ======== readFile ========
 *  Read the file specified by the filePath parameter and return
 *  it as a string
 */
function readFile(filePath)
{
    var fileStr = '';
    var fileModule = xdc.module('xdc.services.io.File');
    var line;
    var file = fileModule.open(filePath, "r");
    while ((line = file.readLine()) != null) {
        fileStr += line;
    }
    file.close();
    return (fileStr);
}

/*
 *  ======== copyFile ========
 *  Copy file specified by src to dst
 */
function copyFile(src, dst)
{
    var srcFile = new java.io.File(src);
    var dstFile = new java.io.File(dst);

    /* copy a single file */
    var instr = new java.io.FileInputStream(srcFile);
    var pdir = dstFile.getParentFile();
    if (!pdir.exists() && !pdir.mkdirs()) {
        throw new Error("copy of '" + src + "' to '"
            + dst + "' failed: can't create '" + pdir + "'");
    }

    var outstr = new java.io.FileOutputStream(dstFile);
    var inc = instr.getChannel();
    var outc = outstr.getChannel();
    inc.transferTo(0, inc.size(), outc);

    instr.close();
    outstr.close();
}

/*
 *  ======== _checkVersion ========
 *  Verify that the declared version matches the Home.xdc specified version
 *
 *  Note: In the event of an error, this function is called twice:
 *     o the first call is to triggered by an assignment
 *     o the second call occurs when the config parameter is automatically
 *       restored to its previous value
 */
function _checkVersion(name, newValue)
{
    /* get the version set in the script */
    var vers = this[name];

    /* get the default version declared in Home.xdc */
    var init = String(this.$spec.getDecl(name).getInit().getVal());
    var actual = eval(init);

    /* if they're different, determine appropriate response */
    if (vers != actual) {
        /* split version numbers into arrays: [major, minor, ...] */
        var va = vers.split('.');
        var aa = actual.split('.');

        /*  fail only if major number differs or minor is not large enough */
        if (aa[0] != va[0] || (aa[1] - va[1]) < 0) {
            throw new Error(
                "This script uses a version of the configuration API ("
                + vers + ") that's incompatible with current implementation ("
                + actual + "); "
                + this + "." + name + " = " + vers + " (!= " + actual + ")");
        }
    }
}
