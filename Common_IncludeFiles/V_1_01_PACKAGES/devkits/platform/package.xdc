requires xdc.platform [1,0,1];

/*!
 *  ======== devkits.platform ========
 *  Platform package for the generic platform.
 *
 *  This package implements the interfaces (xdc.platform.IPlatform)
 *  necessary to build and run executables on a "generic" 28x platform; a
 *  platform specified by:
 *  @p(blist)
 *      - device name; e.g., "TMS320C2812"
 *      - catalog name; the name of a package containing the device named above
 *      - clock rate; the clock rate in MHz of the CPU
 *      - external memory map; an array of memory blocks external to the device
 *  @p
 *
 *  @a(Throws)
 *  `XDCException` exceptions are thrown for fatal errors. The following error
 *  codes are reported in the exception message:
 *  @p(dlist)                            
 *      -  `devkits.platform.LINK_TEMPLATE_ERROR`
 *           This error is raised when this platform cannot found the default
 *           linker command template `linkcmd.xdt` in the build target's
 *           package. When a target does not contain this file, the config
 *           parameter `{@link xdc.cfg.Program#linkTemplate}` must be set.
 *  @p
 *
 *  @see xdc.platform.IPlatform
 */
package devkits.platform [1, 0, 0] {
    module Platform;
}
