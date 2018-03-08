/*
 *  Do not modify this file; it is automatically 
 *  generated and any modifications will be overwritten.
 *
 * @(#) xdc-A65
 */
import java.util.*;
import org.mozilla.javascript.*;
import xdc.services.intern.xsr.*;
import xdc.services.spec.Session;

public class devkits_target
{
    static final String VERS = "@(#) xdc-A65\n";

    static final Proto.Elm $$T_Bool = Proto.Elm.newBool();
    static final Proto.Elm $$T_Num = Proto.Elm.newNum();
    static final Proto.Elm $$T_Str = Proto.Elm.newStr();
    static final Proto.Elm $$T_Obj = Proto.Elm.newObj();

    static final Proto.Fxn $$T_Met = new Proto.Fxn(null, null, 0, -1, false);
    static final Proto.Map $$T_Map = new Proto.Map($$T_Obj);
    static final Proto.Arr $$T_Vec = new Proto.Arr($$T_Obj);

    static final XScriptO $$DEFAULT = Value.DEFAULT;
    static final Object $$UNDEF = Undefined.instance;

    static final Proto.Obj $$Package = (Proto.Obj)Global.get("$$Package");
    static final Proto.Obj $$Module = (Proto.Obj)Global.get("$$Module");
    static final Proto.Obj $$Instance = (Proto.Obj)Global.get("$$Instance");
    static final Proto.Obj $$Params = (Proto.Obj)Global.get("$$Params");

    static final Object $$objFldGet = Global.get("$$objFldGet");
    static final Object $$objFldSet = Global.get("$$objFldSet");
    static final Object $$proxyGet = Global.get("$$proxyGet");
    static final Object $$proxySet = Global.get("$$proxySet");
    static final Object $$delegGet = Global.get("$$delegGet");
    static final Object $$delegSet = Global.get("$$delegSet");

    Scriptable xdcO;
    Session ses;
    Value.Obj om;

    boolean isROV;
    boolean isCFG;

    Proto.Obj pkgP;
    Value.Obj pkgV;

    ArrayList<Object> imports = new ArrayList<Object>();
    ArrayList<Object> loggables = new ArrayList<Object>();
    ArrayList<Object> mcfgs = new ArrayList<Object>();
    ArrayList<Object> icfgs = new ArrayList<Object>();
    ArrayList<String> inherits = new ArrayList<String>();
    ArrayList<Object> proxies = new ArrayList<Object>();
    ArrayList<Object> sizes = new ArrayList<Object>();
    ArrayList<Object> tdefs = new ArrayList<Object>();

    void $$IMPORTS()
    {
        Global.callFxn("loadPackage", xdcO, "xdc");
        Global.callFxn("loadPackage", xdcO, "xdc.corevers");
        Global.callFxn("loadPackage", xdcO, "xdc.bld");
    }

    void $$OBJECTS()
    {
        pkgP = (Proto.Obj)om.bind("devkits.target.Package", new Proto.Obj());
        pkgV = (Value.Obj)om.bind("devkits.target", new Value.Obj("devkits.target", pkgP));
    }

    void Generic$$OBJECTS()
    {
        Proto.Obj po, spo;
        Value.Obj vo;

        po = (Proto.Obj)om.bind("devkits.target.Generic.Module", new Proto.Obj());
        vo = (Value.Obj)om.bind("devkits.target.Generic", new Value.Obj("devkits.target.Generic", po));
        pkgV.bind("Generic", vo);
        // decls 
        om.bind("devkits.target.Generic.Model", om.findStrict("xdc.bld.ITarget.Model", "devkits.target"));
        om.bind("devkits.target.Generic.DebugGen", om.findStrict("xdc.bld.ITarget.DebugGen", "devkits.target"));
        om.bind("devkits.target.Generic.Extension", om.findStrict("xdc.bld.ITarget.Extension", "devkits.target"));
        om.bind("devkits.target.Generic.CompileOptions", om.findStrict("xdc.bld.ITarget.CompileOptions", "devkits.target"));
        om.bind("devkits.target.Generic.OptionSet", om.findStrict("xdc.bld.ITarget.OptionSet", "devkits.target"));
        om.bind("devkits.target.Generic.CompileGoal", om.findStrict("xdc.bld.ITarget.CompileGoal", "devkits.target"));
        om.bind("devkits.target.Generic.LinkGoal", om.findStrict("xdc.bld.ITarget.LinkGoal", "devkits.target"));
        om.bind("devkits.target.Generic.ArchiveGoal", om.findStrict("xdc.bld.ITarget.ArchiveGoal", "devkits.target"));
        om.bind("devkits.target.Generic.CommandSet", om.findStrict("xdc.bld.ITarget.CommandSet", "devkits.target"));
        om.bind("devkits.target.Generic.TypeInfo", om.findStrict("xdc.bld.ITarget.TypeInfo", "devkits.target"));
        om.bind("devkits.target.Generic.StdTypes", om.findStrict("xdc.bld.ITarget.StdTypes", "devkits.target"));
        om.bind("devkits.target.Generic.Command", om.findStrict("xdc.bld.ITarget2.Command", "devkits.target"));
        om.bind("devkits.target.Generic.Options", om.findStrict("xdc.bld.ITarget2.Options", "devkits.target"));
    }

    void Generic$$CONSTS()
    {
        // module Generic
    }

    void Generic$$CREATES()
    {
        Proto.Fxn fxn;
        StringBuilder sb;

    }

    void Generic$$FUNCTIONS()
    {
        Proto.Fxn fxn;

        // fxn Generic.asmName
        fxn = (Proto.Fxn)om.bind("devkits.target.Generic$$asmName", new Proto.Fxn(om.findStrict("devkits.target.Generic.Module", "devkits.target"), $$T_Str, 1, 1, false));
                fxn.addArg(0, "CName", $$T_Str, $$UNDEF);
    }

    void Generic$$SIZES()
    {
    }

    void Generic$$TYPES()
    {
        Scriptable cap;
        Proto.Obj po;
        Proto.Str ps;
        Proto.Typedef pt;
        Object fxn;

        cap = (Scriptable)Global.callFxn("loadCapsule", xdcO, "devkits/target/Generic.xs");
        om.bind("devkits.target.Generic$$capsule", cap);
        po = (Proto.Obj)om.findStrict("devkits.target.Generic.Module", "devkits.target");
        po.init("devkits.target.Generic.Module", om.findStrict("xdc.bld.ITarget2.Module", "devkits.target"));
                po.addFld("$hostonly", $$T_Num, 1, "r");
        po.addFld("name", $$T_Str, "Generic", "rh");
        po.addFld("suffix", $$T_Str, "28L", "rh");
        po.addFld("isa", $$T_Str, "28", "rh");
        po.addFld("model", (Proto)om.findStrict("xdc.bld.ITarget.Model", "devkits.target"), Global.newObject("dataModel", "large", "endian", "little"), "rh");
        po.addFld("alignDirectiveSupported", $$T_Bool, false, "rh");
        po.addFld("cc", (Proto)om.findStrict("xdc.bld.ITarget2.Command", "devkits.target"), Global.newObject("cmd", "cl2000 -c", "opts", ""), "rh");
        po.addFld("stdInclude", $$T_Str, "devkits/target/std.h", "rh");
        po.addFld("includeOpts", $$T_Str, "", "wh");
        po.addFld("profiles", new Proto.Map((Proto)om.findStrict("xdc.bld.ITarget.OptionSet", "devkits.target")), Global.newArray(new Object[]{Global.newArray(new Object[]{"debug", Global.newObject("compileOpts", Global.newObject("copts", "", "defs", "-D_DEBUG_=1"))}), Global.newArray(new Object[]{"release", Global.newObject("compileOpts", Global.newObject("copts", ""))})}), "wh");
        po.addFld("stdTypes", (Proto)om.findStrict("xdc.bld.ITarget.StdTypes", "devkits.target"), Global.newObject("t_IArg", Global.newObject("size", 2L, "align", 2L), "t_Char", Global.newObject("size", 1L, "align", 1L), "t_Double", Global.newObject("size", 2L, "align", 2L), "t_Float", Global.newObject("size", 2L, "align", 2L), "t_Fxn", Global.newObject("size", 2L, "align", 2L), "t_Int", Global.newObject("size", 1L, "align", 1L), "t_Int8", Global.newObject("size", 1L, "align", 1L), "t_Int16", Global.newObject("size", 1L, "align", 1L), "t_Int32", Global.newObject("size", 2L, "align", 2L), "t_Int64", Global.newObject("size", 4L, "align", 2L), "t_Long", Global.newObject("size", 2L, "align", 2L), "t_LDouble", Global.newObject("size", 2L, "align", 2L), "t_LLong", Global.newObject("size", 4L, "align", 2L), "t_Ptr", Global.newObject("size", 2L, "align", 2L), "t_Short", Global.newObject("size", 1L, "align", 1L), "t_Size", Global.newObject("size", 2L, "align", 2L)), "rh");
        po.addFld("bitsPerChar", Proto.Elm.newCNum("(xdc_Int)"), 16L, "rh");
        fxn = Global.get(cap, "module$use");
        if (fxn != null) om.bind("devkits.target.Generic$$module$use", true);
        if (fxn != null) po.addFxn("module$use", $$T_Met, fxn);
        fxn = Global.get(cap, "module$meta$init");
        if (fxn != null) om.bind("devkits.target.Generic$$module$meta$init", true);
        if (fxn != null) po.addFxn("module$meta$init", $$T_Met, fxn);
        fxn = Global.get(cap, "module$validate");
        if (fxn != null) om.bind("devkits.target.Generic$$module$validate", true);
        if (fxn != null) po.addFxn("module$validate", $$T_Met, fxn);
                fxn = Global.get(cap, "archive");
                if (fxn != null) po.addFxn("archive", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$archive", "devkits.target"), fxn);
                fxn = Global.get(cap, "compile");
                if (fxn != null) po.addFxn("compile", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$compile", "devkits.target"), fxn);
                fxn = Global.get(cap, "scompile");
                if (fxn != null) po.addFxn("scompile", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$scompile", "devkits.target"), fxn);
                fxn = Global.get(cap, "link");
                if (fxn != null) po.addFxn("link", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$link", "devkits.target"), fxn);
                fxn = Global.get(cap, "getVersion");
                if (fxn != null) po.addFxn("getVersion", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$getVersion", "devkits.target"), fxn);
                fxn = Global.get(cap, "getISAChain");
                if (fxn != null) po.addFxn("getISAChain", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$getISAChain", "devkits.target"), fxn);
                fxn = Global.get(cap, "findSuffix");
                if (fxn != null) po.addFxn("findSuffix", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$findSuffix", "devkits.target"), fxn);
                fxn = Global.get(cap, "selectSuffix");
                if (fxn != null) po.addFxn("selectSuffix", (Proto.Fxn)om.findStrict("xdc.bld.ITarget$$selectSuffix", "devkits.target"), fxn);
                fxn = Global.get(cap, "genConstCustom");
                if (fxn != null) po.addFxn("genConstCustom", (Proto.Fxn)om.findStrict("xdc.bld.ITarget2$$genConstCustom", "devkits.target"), fxn);
                fxn = Global.get(cap, "genVisibleData");
                if (fxn != null) po.addFxn("genVisibleData", (Proto.Fxn)om.findStrict("xdc.bld.ITarget2$$genVisibleData", "devkits.target"), fxn);
                fxn = Global.get(cap, "genVisibleFxns");
                if (fxn != null) po.addFxn("genVisibleFxns", (Proto.Fxn)om.findStrict("xdc.bld.ITarget2$$genVisibleFxns", "devkits.target"), fxn);
                fxn = Global.get(cap, "genVisibleLibFxns");
                if (fxn != null) po.addFxn("genVisibleLibFxns", (Proto.Fxn)om.findStrict("xdc.bld.ITarget2$$genVisibleLibFxns", "devkits.target"), fxn);
                po.addFxn("asmName", (Proto.Fxn)om.findStrict("devkits.target.Generic$$asmName", "devkits.target"), Global.get(cap, "asmName"));
    }

    void Generic$$ROV()
    {
    }

    void $$SINGLETONS()
    {
        pkgP.init("devkits.target.Package", (Proto.Obj)om.findStrict("xdc.IPackage.Module", "devkits.target"));
        pkgP.bind("$capsule", $$UNDEF);
        pkgV.init2(pkgP, "devkits.target", Value.DEFAULT, false);
        pkgV.bind("$name", "devkits.target");
        pkgV.bind("$category", "Package");
        pkgV.bind("$$qn", "devkits.target.");
        pkgV.bind("$vers", Global.newArray());
        Value.Map atmap = (Value.Map)pkgV.getv("$attr");
        atmap.seal("length");
        imports.clear();
        pkgV.bind("$imports", imports);
        StringBuilder sb = new StringBuilder();
        sb.append("var pkg = xdc.om['devkits.target'];\n");
        sb.append("if (pkg.$vers.length >= 3) {\n");
            sb.append("pkg.$vers.push(Packages.xdc.services.global.Vers.getDate(xdc.csd() + '/..'));\n");
        sb.append("}\n");
        sb.append("if ('devkits.target$$stat$base' in xdc.om) {\n");
            sb.append("pkg.packageBase = xdc.om['devkits.target$$stat$base'];\n");
            sb.append("pkg.packageRepository = xdc.om['devkits.target$$stat$root'];\n");
        sb.append("}\n");
        sb.append("pkg.build.libraries = [\n");
        sb.append("];\n");
        sb.append("pkg.build.libDesc = [\n");
        sb.append("];\n");
        Global.eval(sb.toString());
    }

    void Generic$$SINGLETONS()
    {
        Proto.Obj po;
        Value.Obj vo;

        vo = (Value.Obj)om.findStrict("devkits.target.Generic", "devkits.target");
        po = (Proto.Obj)om.findStrict("devkits.target.Generic.Module", "devkits.target");
        vo.init2(po, "devkits.target.Generic", $$DEFAULT, false);
        vo.bind("Module", po);
        vo.bind("$category", "Module");
        vo.bind("$capsule", om.findStrict("devkits.target.Generic$$capsule", "devkits.target"));
        vo.bind("$package", om.findStrict("devkits.target", "devkits.target"));
        tdefs.clear();
        proxies.clear();
        mcfgs.clear();
        icfgs.clear();
        inherits.clear();
        vo.bind("Model", om.findStrict("xdc.bld.ITarget.Model", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.Model", "devkits.target"));
        vo.bind("DebugGen", om.findStrict("xdc.bld.ITarget.DebugGen", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.DebugGen", "devkits.target"));
        vo.bind("Extension", om.findStrict("xdc.bld.ITarget.Extension", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.Extension", "devkits.target"));
        vo.bind("CompileOptions", om.findStrict("xdc.bld.ITarget.CompileOptions", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.CompileOptions", "devkits.target"));
        vo.bind("OptionSet", om.findStrict("xdc.bld.ITarget.OptionSet", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.OptionSet", "devkits.target"));
        vo.bind("CompileGoal", om.findStrict("xdc.bld.ITarget.CompileGoal", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.CompileGoal", "devkits.target"));
        vo.bind("LinkGoal", om.findStrict("xdc.bld.ITarget.LinkGoal", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.LinkGoal", "devkits.target"));
        vo.bind("ArchiveGoal", om.findStrict("xdc.bld.ITarget.ArchiveGoal", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.ArchiveGoal", "devkits.target"));
        vo.bind("CommandSet", om.findStrict("xdc.bld.ITarget.CommandSet", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.CommandSet", "devkits.target"));
        vo.bind("StringArray", om.findStrict("xdc.bld.ITarget.StringArray", "devkits.target"));
        vo.bind("TypeInfo", om.findStrict("xdc.bld.ITarget.TypeInfo", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.TypeInfo", "devkits.target"));
        vo.bind("StdTypes", om.findStrict("xdc.bld.ITarget.StdTypes", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget.StdTypes", "devkits.target"));
        vo.bind("Command", om.findStrict("xdc.bld.ITarget2.Command", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget2.Command", "devkits.target"));
        vo.bind("Options", om.findStrict("xdc.bld.ITarget2.Options", "devkits.target"));
        tdefs.add(om.findStrict("xdc.bld.ITarget2.Options", "devkits.target"));
        vo.bind("$$tdefs", Global.newArray(tdefs.toArray()));
        vo.bind("$$proxies", Global.newArray(proxies.toArray()));
        vo.bind("$$mcfgs", Global.newArray(mcfgs.toArray()));
        vo.bind("$$icfgs", Global.newArray(icfgs.toArray()));
        inherits.add("xdc.bld");
        inherits.add("xdc.bld");
        vo.bind("$$inherits", Global.newArray(inherits.toArray()));
        ((Value.Arr)pkgV.getv("$modules")).add(vo);
        ((Value.Arr)om.findStrict("$modules", "devkits.target")).add(vo);
        vo.bind("$$instflag", 0);
        vo.bind("$$iobjflag", 1);
        vo.bind("$$sizeflag", 1);
        vo.bind("$$dlgflag", 0);
        vo.bind("$$iflag", 1);
        vo.bind("$$romcfgs", "|");
        vo.bind("$$nortsflag", 0);
        Proto.Str ps = (Proto.Str)vo.find("Module_State");
        if (ps != null) vo.bind("$object", ps.newInstance());
        vo.bind("$$meta_iobj", om.has("devkits.target.Generic$$instance$static$init", null) ? 1 : 0);
        vo.bind("$$fxntab", Global.newArray());
        vo.bind("$$logEvtCfgs", Global.newArray());
        vo.bind("$$errorDescCfgs", Global.newArray());
        vo.bind("$$assertDescCfgs", Global.newArray());
        Value.Map atmap = (Value.Map)vo.getv("$attr");
        atmap.setElem("", "xdc/bld/stddefs.xdt");
        atmap.seal("length");
        pkgV.bind("Generic", vo);
        ((Value.Arr)pkgV.getv("$unitNames")).add("Generic");
    }

    void $$INITIALIZATION()
    {
        Value.Obj vo;

        if (isCFG) {
        }//isCFG
        Global.callFxn("module$meta$init", (Scriptable)om.findStrict("devkits.target.Generic", "devkits.target"));
        Global.callFxn("init", pkgV);
        ((Value.Obj)om.getv("devkits.target.Generic")).bless();
        ((Value.Arr)om.findStrict("$packages", "devkits.target")).add(pkgV);
    }

    public void exec( Scriptable xdcO, Session ses )
    {
        this.xdcO = xdcO;
        this.ses = ses;
        om = (Value.Obj)xdcO.get("om", null);

        Object o = om.geto("$name");
        String s = o instanceof String ? (String)o : null;
        isCFG = s != null && s.equals("cfg");
        isROV = s != null && s.equals("rov");

        $$IMPORTS();
        $$OBJECTS();
        Generic$$OBJECTS();
        Generic$$CONSTS();
        Generic$$CREATES();
        Generic$$FUNCTIONS();
        Generic$$SIZES();
        Generic$$TYPES();
        if (isROV) {
            Generic$$ROV();
        }//isROV
        $$SINGLETONS();
        Generic$$SINGLETONS();
        $$INITIALIZATION();
    }
}
