/*!
 *  ======== Home ========
 *  PowerSuite top-level module
 */
metaonly module Home
{
    /*!
     *  ======== configApiVersion ========
     *  The version of the configuration API
     *
     *  Scripts can assign a different value to this string to specify the
     *  version of the configuration API they require.  The implementation
     *  checks this assignment with the default value declared here and
     *  either allows the script to continue or fails with a message
     *  describing the version required.
     *
     *  The compatibility check follows a conventional `Major.Minor.Patch`
     *  version number scheme:
     *  @p(blist)
     *      - if the first digit of the version number differs, the script
     *        is incompatible with this release of Grace,
     *      - if the second digit declared in the script is larger than
     *        the second digit declared here, the script is incompatible,
     *      - otherwise the script is compatible and no error is triggered
     *  @p
     *  This scheme allows us to:
     *  @p(blist)
     *       - declare a compatibility break in a new release by increasing
     *         the first digit
     *       - support scripts from previous releases that share the same
     *         first digit, and
     *       - cleanly detect and handle situations where a script requires
     *         a newly added config parameter but the current release does
     *         not support the parameter.
     *  @p
     *
     */
    config String configApiVersion = "1.00.00";

    /*!
     *  ======== projectDir ========
     *  The absolute path of the CCS project of the
     *  of the .cfg script using this module
     *  @_nodoc
     */
    config String projectDir;


    /*!
     *  ======== solutionName ========
     *  Used to dymaically load solution-specific files and route
     *  to HTML pages. This is read from the solution.js file that
     *  resides in the directory of the .cfg script using this module.
     *  @_nodoc
     */
    @Transient
    config String solutionName = "";

    /*!
     *  ======== copyFile ========
     *  Copy file named in src to dst
     *  @_nodoc
     */
    Void copyFile(String src, String dst);

    /*!
     *  ======== getProjectDir ========
     *  projectDir getter
     *  @_nodoc
     */
    function getProjectDir();
}
