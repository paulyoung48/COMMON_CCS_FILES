/* --COPYRIGHT--,EPL
 *  Copyright (c) 2008 Texas Instruments and others.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the Eclipse Public License v1.0
 *  which accompanies this distribution, and is available at
 *  http://www.eclipse.org/legal/epl-v10.html
 * 
 *  Contributors:
 *      Texas Instruments - initial implementation
 * 
 * --/COPYRIGHT--*/

/*!
 *  ======== Generic.xdc ========
 *  @_nodoc
 *  Generic C28x target
 *
 *  This target is used to support "generation only" configurations in which
 *  we don't want/need to supply a compiler toolchain.  During configuration,
 *  some products generate sources that would normally be compiled and linked
 *  into  the application.  In some use cases, however, we simply want to
 *  generate the sources and let the user compile the sources as they see fit.
 *
 *  This target allows existing makefile templates to be largely unaware that
 *  they are, in fact, participating in a "generation only" configuration.
 *  This, in turn, allows the generated makefile to serve as documentation
 *  or even a user modifiable makefile for building the generated sources.
 */
@TargetHeader("xdc/bld/stddefs.xdt")
metaonly module Generic inherits xdc.bld.ITarget2 {
    override readonly config string name    = "Generic"; 
    override readonly config string suffix  = "28L";
    override readonly config string isa     = "28";    

    override readonly config xdc.bld.ITarget.Model model = {
      dataModel: "large", endian: "little"};

    final override readonly config Bool alignDirectiveSupported = false;

    override readonly config xdc.bld.ITarget2.Command cc = {
        cmd:  "cl2000 -c",
        opts: ""
    };

    /*
     *  ======== stdInclude ========
     */
    override readonly config string stdInclude = "devkits/target/std.h";

    /*!
     *  ======== includeOpts ========
     *  Default include search path
     */
    override config string includeOpts = "";

    /*!
     *  ======== profiles ========
     *  Standard options profiles
     */
    override config xdc.bld.ITarget.OptionSet profiles[string] = [
	["debug", {
	    compileOpts: {
		copts: "",
		defs:  "-D_DEBUG_=1",
	    }
	}],
	["release", {
	    compileOpts: {
		copts: "",
	    },
	}],
    ];

    override readonly config xdc.bld.ITarget.StdTypes stdTypes = {
        t_IArg          : { size: 2, align: 2 },
        t_Char          : { size: 1, align: 1 },
        t_Double        : { size: 2, align: 2 },
        t_Float         : { size: 2, align: 2 },
        t_Fxn           : { size: 2, align: 2 }, /* far */
        t_Int           : { size: 1, align: 1 },
        t_Int8          : { size: 1, align: 1 },
        t_Int16         : { size: 1, align: 1 },
        t_Int32         : { size: 2, align: 2 },
        t_Int64         : { size: 4, align: 2 },
        t_Long          : { size: 2, align: 2 },
        t_LDouble       : { size: 2, align: 2 },
        t_LLong         : { size: 4, align: 2 },
        t_Ptr           : { size: 2, align: 2 },
        t_Short         : { size: 1, align: 1 },
        t_Size          : { size: 2, align: 2 },
    };

    override readonly config Int bitsPerChar = 16;

    /*!
     *  ======== asmName ========
     *  The function that converts a C name into an assembly name
     */
    String asmName(String CName);
}
