import xdc.tools.product.IProductTemplate;

/*!
 *  ======== Examples ========
 *  PowerSuite configuration examples
 *
 *  This module provides an example and a fragment used to add powerSuite
 *  support to an existing controlSUITE example project.
 *  This support is generated in an eclipse plugin created via xdc.tools.product.plugingen.,
 */
metaonly module Examples inherits IProductTemplate 
{
    /*!
     *  ======== empty ========
     *  Empty PowerSuite Project
     */
    config IProductTemplate.TemplateInfo empty = {
        title:       "Empty PowerSuite Project",
        description: "Enables the use of PowerSuite within your project.",

        groups: ["com.ti.common.project.core.emptyProjectTemplates"],
        
        target:       "devkits.target.Generic",
        platform:     "devkits.platform",
        buildProfile: "debug",
        isHybrid:     true,

        configuroOptions: "-Dxdc.cfg.tsort.policy=fast -Dxdc.cfg.gen.metadataFiles=false -Dxdc.cfg.SourceDir.verbose=7 --compileOptions &quot;${COMPILER_FLAGS} &quot;",

        filterArr: [
            /* all  devices */
            {deviceId: ".*TMS320C28.*", toolChain: "TI"},
        ],
    
        fileList: [
            {
                path: "./empty/main.cfg",
                openOnCreation: false
            }
        ]
    };

    /*!
     *  ======== fragment ========
     *  powerSuite fragment. This provides the capability to add powerSuite support
     *  to an existing CCS project by right-clicking on a project and selecting
     *  Source->Apply Project Template...
     */
    config IProductTemplate.TemplateInfo fragment = {
        title:       "Add PowerSuite code generation",
        description: "Add PowerSuite code generation to an existing project.",

        groups:         ["devkits.fragments"],
        isFragment:     true,

        target:       "devkits.target.Generic",
        platform:     "devkits.platform",
        buildProfile: "debug",
        isHybrid:     true,
        configuroOptions: "-Dxdc.cfg.tsort.policy=fast -Dxdc.cfg.gen.metadataFiles=false -Dxdc.cfg.SourceDir.verbose=7 --compileOptions &quot;${COMPILER_FLAGS} &quot;",
        filterArr: [
            /* all  devices */
            {deviceId: ".*TMS320C28.*", toolChain: "TI"},
        ],

        fileList: [
            {
                path: "./empty/main.cfg",
                openOnCreation: false
            },
        ]
    };

    /*!
     *  ======== templateArr ========
     *  The complete set of examples
     *
     *  This array provides the complete set of examples provided by the
     *  product.
     *
     *  In this case, this array is initialized in Examples.xs using the
     *  `examples[]` array and the the `common` properties defined above.  
     *  This makes it "easy" to declaratively specify the examples with 
     *  minimal duplication of information.
     */
    override config IProductTemplate.TemplateInfo templateArr [] =
        [fragment, empty];


    /*
     *  ======== froot ========
     *  Root for template fragments
     */
    config IProductTemplate.TemplateGroup froot = {
        id          : "devkits.fragments",
        name        : "PowerSuite Additions",
        description : "These templates are used to add PowerSuite to an existing project."
    };

    /*!
     *  ======== templateGroupArr ========
     *  Group structure for examples
     *
     *  This array defines a set of groups that make it possible to
     *  hierarchically organize examples into "groups".  Each example declares
     *  what group(s) it "belongs to" and each group may contain other groups.
     *
     *  This is useful, for example, when providing "paired" examples such as
     *  asymetric multi-core examples or wireless access point <-> end device
     *  pairs.
     *
     *  In this case, we have just one group, root, which is a new
     *  top-level group for PowerSuite examples.  
     */
    override config IProductTemplate.TemplateGroup templateGroupArr [] =
        [froot];
}
