/*
 *  Copyright (c) 2014 by Texas Instruments and others.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the Eclipse Public License v1.0
 *  which accompanies this distribution, and is available at
 *  http://www.eclipse.org/legal/epl-v10.html
 *
 *  Contributors:
 *      Texas Instruments - initial implementation
 *
 * */

/*
 *  ======== package.xs ========
 *
 */

/*
 *  ======== Package.init ========
 */
function init()
{
    /* Nothing to do, unless we are in Config Object Model */
    if (xdc.om.$name != "cfg") {
        return;
    }

    /* If Program.bld.rtsName is not 'null', this package will depend on
     * xdc.runtime and we want to establish that dependency early so that the
     * close() functions are invoked in the right order.
     */
    if (Program.build.rtsName !== null) {
        xdc.loadPackage("xdc.runtime");
    }
}

/*
 *  ======== Package.getLibs ========
 */
function getLibs(prog)
{
    var libs = "lib/";

    if (Program.build.cfgScript == null || !Program.build.cfgScript.match(/\.tcf$/)) {
        libs += "Boot.a" + Program.build.target.suffix;
    }

    return (libs);
}

/*
 *  ======== Package.getSects ========
 */
function getSects()
{
    return "ti/catalog/c2800/init/linkcmd.xdt";
}


/*
 *  @(#) ti.catalog.c2800.init; 1, 0, 0,325; 10-24-2014 08:47:18; /db/ztree/library/trees/platform/platform-o64x/src/
 */
