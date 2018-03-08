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

public class devkits
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
    }

    void $$OBJECTS()
    {
        pkgP = (Proto.Obj)om.bind("devkits.Package", new Proto.Obj());
        pkgV = (Value.Obj)om.bind("devkits", new Value.Obj("devkits", pkgP));
    }

    void Home$$OBJECTS()
    {
        Proto.Obj po, spo;
        Value.Obj vo;

        po = (Proto.Obj)om.bind("devkits.Home.Module", new Proto.Obj());
        vo = (Value.Obj)om.bind("devkits.Home", new Value.Obj("devkits.Home", po));
        pkgV.bind("Home", vo);
        // decls 
    }

    void Home$$CONSTS()
    {
        // module Home
    }

    void Home$$CREATES()
    {
        Proto.Fxn fxn;
        StringBuilder sb;

    }

    void Home$$FUNCTIONS()
    {
        Proto.Fxn fxn;

        // fxn Home.copyFile
        fxn = (Proto.Fxn)om.bind("devkits.Home$$copyFile", new Proto.Fxn(om.findStrict("devkits.Home.Module", "devkits"), null, 2, 2, false));
                fxn.addArg(0, "src", $$T_Str, $$UNDEF);
                fxn.addArg(1, "dst", $$T_Str, $$UNDEF);
        // fxn Home.getProjectDir
        fxn = (Proto.Fxn)om.bind("devkits.Home$$getProjectDir", new Proto.Fxn(om.findStrict("devkits.Home.Module", "devkits"), null, 0, -1, false));
    }

    void Home$$SIZES()
    {
    }

    void Home$$TYPES()
    {
        Scriptable cap;
        Proto.Obj po;
        Proto.Str ps;
        Proto.Typedef pt;
        Object fxn;

        cap = (Scriptable)Global.callFxn("loadCapsule", xdcO, "devkits/Home.xs");
        om.bind("devkits.Home$$capsule", cap);
        po = (Proto.Obj)om.findStrict("devkits.Home.Module", "devkits");
        po.init("devkits.Home.Module", $$Module);
                po.addFld("$hostonly", $$T_Num, 1, "r");
        po.addFld("configApiVersion", $$T_Str, "1.00.00", "wh");
        po.addFld("projectDir", $$T_Str, $$UNDEF, "wh");
        po.addFld("solutionName", $$T_Str, "", "wh");
        fxn = Global.get(cap, "module$use");
        if (fxn != null) om.bind("devkits.Home$$module$use", true);
        if (fxn != null) po.addFxn("module$use", $$T_Met, fxn);
        fxn = Global.get(cap, "module$meta$init");
        if (fxn != null) om.bind("devkits.Home$$module$meta$init", true);
        if (fxn != null) po.addFxn("module$meta$init", $$T_Met, fxn);
        fxn = Global.get(cap, "module$validate");
        if (fxn != null) om.bind("devkits.Home$$module$validate", true);
        if (fxn != null) po.addFxn("module$validate", $$T_Met, fxn);
                po.addFxn("copyFile", (Proto.Fxn)om.findStrict("devkits.Home$$copyFile", "devkits"), Global.get(cap, "copyFile"));
                po.addFxn("getProjectDir", (Proto.Fxn)om.findStrict("devkits.Home$$getProjectDir", "devkits"), Global.get(cap, "getProjectDir"));
    }

    void Home$$ROV()
    {
    }

    void $$SINGLETONS()
    {
        pkgP.init("devkits.Package", (Proto.Obj)om.findStrict("xdc.IPackage.Module", "devkits"));
        Scriptable cap = (Scriptable)Global.callFxn("loadCapsule", xdcO, "devkits/package.xs");
        om.bind("xdc.IPackage$$capsule", cap);
        Object fxn;
                fxn = Global.get(cap, "init");
                if (fxn != null) pkgP.addFxn("init", (Proto.Fxn)om.findStrict("xdc.IPackage$$init", "devkits"), fxn);
                fxn = Global.get(cap, "close");
                if (fxn != null) pkgP.addFxn("close", (Proto.Fxn)om.findStrict("xdc.IPackage$$close", "devkits"), fxn);
                fxn = Global.get(cap, "validate");
                if (fxn != null) pkgP.addFxn("validate", (Proto.Fxn)om.findStrict("xdc.IPackage$$validate", "devkits"), fxn);
                fxn = Global.get(cap, "exit");
                if (fxn != null) pkgP.addFxn("exit", (Proto.Fxn)om.findStrict("xdc.IPackage$$exit", "devkits"), fxn);
                fxn = Global.get(cap, "getLibs");
                if (fxn != null) pkgP.addFxn("getLibs", (Proto.Fxn)om.findStrict("xdc.IPackage$$getLibs", "devkits"), fxn);
                fxn = Global.get(cap, "getSects");
                if (fxn != null) pkgP.addFxn("getSects", (Proto.Fxn)om.findStrict("xdc.IPackage$$getSects", "devkits"), fxn);
        pkgP.bind("$capsule", cap);
        pkgV.init2(pkgP, "devkits", Value.DEFAULT, false);
        pkgV.bind("$name", "devkits");
        pkgV.bind("$category", "Package");
        pkgV.bind("$$qn", "devkits.");
        pkgV.bind("$vers", Global.newArray());
        Value.Map atmap = (Value.Map)pkgV.getv("$attr");
        atmap.seal("length");
        imports.clear();
        pkgV.bind("$imports", imports);
        StringBuilder sb = new StringBuilder();
        sb.append("var pkg = xdc.om['devkits'];\n");
        sb.append("if (pkg.$vers.length >= 3) {\n");
            sb.append("pkg.$vers.push(Packages.xdc.services.global.Vers.getDate(xdc.csd() + '/..'));\n");
        sb.append("}\n");
        sb.append("if ('devkits$$stat$base' in xdc.om) {\n");
            sb.append("pkg.packageBase = xdc.om['devkits$$stat$base'];\n");
            sb.append("pkg.packageRepository = xdc.om['devkits$$stat$root'];\n");
        sb.append("}\n");
        sb.append("pkg.build.libraries = [\n");
        sb.append("];\n");
        sb.append("pkg.build.libDesc = [\n");
        sb.append("];\n");
        Global.eval(sb.toString());
    }

    void Home$$SINGLETONS()
    {
        Proto.Obj po;
        Value.Obj vo;

        vo = (Value.Obj)om.findStrict("devkits.Home", "devkits");
        po = (Proto.Obj)om.findStrict("devkits.Home.Module", "devkits");
        vo.init2(po, "devkits.Home", $$DEFAULT, false);
        vo.bind("Module", po);
        vo.bind("$category", "Module");
        vo.bind("$capsule", om.findStrict("devkits.Home$$capsule", "devkits"));
        vo.bind("$package", om.findStrict("devkits", "devkits"));
        tdefs.clear();
        proxies.clear();
        mcfgs.clear();
        icfgs.clear();
        inherits.clear();
        vo.bind("$$tdefs", Global.newArray(tdefs.toArray()));
        vo.bind("$$proxies", Global.newArray(proxies.toArray()));
        vo.bind("$$mcfgs", Global.newArray(mcfgs.toArray()));
        vo.bind("$$icfgs", Global.newArray(icfgs.toArray()));
        vo.bind("$$inherits", Global.newArray(inherits.toArray()));
        ((Value.Arr)pkgV.getv("$modules")).add(vo);
        ((Value.Arr)om.findStrict("$modules", "devkits")).add(vo);
        vo.bind("$$instflag", 0);
        vo.bind("$$iobjflag", 1);
        vo.bind("$$sizeflag", 1);
        vo.bind("$$dlgflag", 0);
        vo.bind("$$iflag", 0);
        vo.bind("$$romcfgs", "|");
        vo.bind("$$nortsflag", 0);
        Proto.Str ps = (Proto.Str)vo.find("Module_State");
        if (ps != null) vo.bind("$object", ps.newInstance());
        vo.bind("$$meta_iobj", om.has("devkits.Home$$instance$static$init", null) ? 1 : 0);
        vo.bind("$$fxntab", Global.newArray());
        vo.bind("$$logEvtCfgs", Global.newArray());
        vo.bind("$$errorDescCfgs", Global.newArray());
        vo.bind("$$assertDescCfgs", Global.newArray());
        Value.Map atmap = (Value.Map)vo.getv("$attr");
        atmap.seal("length");
        pkgV.bind("Home", vo);
        ((Value.Arr)pkgV.getv("$unitNames")).add("Home");
    }

    void $$INITIALIZATION()
    {
        Value.Obj vo;

        if (isCFG) {
        }//isCFG
        Global.callFxn("module$meta$init", (Scriptable)om.findStrict("devkits.Home", "devkits"));
        Global.callFxn("init", pkgV);
        ((Value.Obj)om.getv("devkits.Home")).bless();
        ((Value.Arr)om.findStrict("$packages", "devkits")).add(pkgV);
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
        Home$$OBJECTS();
        Home$$CONSTS();
        Home$$CREATES();
        Home$$FUNCTIONS();
        Home$$SIZES();
        Home$$TYPES();
        if (isROV) {
            Home$$ROV();
        }//isROV
        $$SINGLETONS();
        Home$$SINGLETONS();
        $$INITIALIZATION();
    }
}
