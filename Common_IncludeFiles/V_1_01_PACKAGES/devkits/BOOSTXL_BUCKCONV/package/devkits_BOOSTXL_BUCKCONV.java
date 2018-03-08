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

public class devkits_BOOSTXL_BUCKCONV
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
        pkgP = (Proto.Obj)om.bind("devkits.BOOSTXL_BUCKCONV.Package", new Proto.Obj());
        pkgV = (Value.Obj)om.bind("devkits.BOOSTXL_BUCKCONV", new Value.Obj("devkits.BOOSTXL_BUCKCONV", pkgP));
    }

    void Buck$$OBJECTS()
    {
        Proto.Obj po, spo;
        Value.Obj vo;

        po = (Proto.Obj)om.bind("devkits.BOOSTXL_BUCKCONV.Buck.Module", new Proto.Obj());
        vo = (Value.Obj)om.bind("devkits.BOOSTXL_BUCKCONV.Buck", new Value.Obj("devkits.BOOSTXL_BUCKCONV.Buck", po));
        pkgV.bind("Buck", vo);
        // decls 
        spo = (Proto.Obj)om.bind("devkits.BOOSTXL_BUCKCONV.Buck$$COMP_Struct_t", new Proto.Obj());
        om.bind("devkits.BOOSTXL_BUCKCONV.Buck.COMP_Struct_t", new Proto.Str(spo, true));
    }

    void Buck$$CONSTS()
    {
        // module Buck
    }

    void Buck$$CREATES()
    {
        Proto.Fxn fxn;
        StringBuilder sb;

    }

    void Buck$$FUNCTIONS()
    {
        Proto.Fxn fxn;

    }

    void Buck$$SIZES()
    {
    }

    void Buck$$TYPES()
    {
        Scriptable cap;
        Proto.Obj po;
        Proto.Str ps;
        Proto.Typedef pt;
        Object fxn;

        cap = (Scriptable)Global.callFxn("loadCapsule", xdcO, "devkits/BOOSTXL_BUCKCONV/Buck.xs");
        om.bind("devkits.BOOSTXL_BUCKCONV.Buck$$capsule", cap);
        po = (Proto.Obj)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck.Module", "devkits.BOOSTXL_BUCKCONV");
        po.init("devkits.BOOSTXL_BUCKCONV.Buck.Module", $$Module);
                po.addFld("$hostonly", $$T_Num, 1, "r");
        po.addFld("pwmIndex", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("pwmNo", Proto.Elm.newCNum("(xdc_Int)"), 1L, "wh");
        po.addFld("adcTriggerSource", Proto.Elm.newCNum("(xdc_Int)"), 5L, "wh");
        po.addFld("adcPinVIN", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcPinVINIndex", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcPinVOUT", Proto.Elm.newCNum("(xdc_Int)"), 1L, "wh");
        po.addFld("adcPinVOUTIndex", Proto.Elm.newCNum("(xdc_Int)"), 1L, "wh");
        po.addFld("adcILIndex", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcILPin", Proto.Elm.newCNum("(xdc_Int)"), 2L, "wh");
        po.addFld("adcILComparator", Proto.Elm.newCNum("(xdc_Int)"), 1L, "wh");
        po.addFld("adcPinIin", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcPinIinIndex", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcPinIL_AVG", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcPinIL_AVGIndex", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("adcModuleNo", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("Fsw", Proto.Elm.newCNum("(xdc_Int)"), 100L, "wh");
        po.addFld("Fctrl", Proto.Elm.newCNum("(xdc_Int)"), 100L, "wh");
        po.addFld("Vin", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Vout", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Iout", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Vin_SenseMax", Proto.Elm.newCNum("(xdc_Float)"), 13.3, "wh");
        po.addFld("Vout_SenseMax", Proto.Elm.newCNum("(xdc_Float)"), 9.76, "wh");
        po.addFld("Il_SenseMax", Proto.Elm.newCNum("(xdc_Float)"), 5.5, "wh");
        po.addFld("Il_TripLevel", Proto.Elm.newCNum("(xdc_Float)"), 4.0, "wh");
        po.addFld("Rds1", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rds2", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("L", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("DCR", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Ccer", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Celec", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("ESRcer", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("ESRelec", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("ESLcer", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("ESLelec", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rfltr_a", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("Cfltr_a", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rfltr_b", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("Cfltr_b", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Ra", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rb", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rc", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rd", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Rcs", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("I_gain", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Vout_Sense_Fltr_Cuttoff", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("Il_Sense_Fltr_Cuttoff", Proto.Elm.newCNum("(xdc_Float)"), 0.0, "wh");
        po.addFld("powerStageData", $$T_Str, "", "wh");
        po.addFld("COMP", new Proto.Arr((Proto)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck.COMP_Struct_t", "devkits.BOOSTXL_BUCKCONV"), false, xdc.services.intern.xsr.Enum.intValue(5L)), $$DEFAULT, "wh");
        po.addFld("Fsw_Fctrl_Ratio_Index", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("Fsw_Fctrl_Ratio", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("COMP_NUM_Index", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("COMP_NUM", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("INCR_BUILD_Index", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("INCR_BUILD", Proto.Elm.newCNum("(xdc_Int)"), 0L, "wh");
        po.addFld("SolutionInited", $$T_Bool, false, "wh");
        po.addFld("saveSettings", $$T_Bool, false, "wh");
        po.addFld("solution", $$T_Str, "", "wh");
        po.addFld("type", $$T_Str, "", "wh");
        po.addFld("device", $$T_Str, "", "wh");
        po.addFld("execPowerStage", $$T_Bool, false, "wh");
        po.addFld("refreshPowerStage", $$T_Bool, false, "wh");
        po.addFld("execSFRA", $$T_Bool, false, "wh");
        po.addFld("solutionParams", $$T_Str, "", "wh");
        po.addFld("projIsInControlSuite", $$T_Bool, false, "wh");
        fxn = Global.get(cap, "module$use");
        if (fxn != null) om.bind("devkits.BOOSTXL_BUCKCONV.Buck$$module$use", true);
        if (fxn != null) po.addFxn("module$use", $$T_Met, fxn);
        fxn = Global.get(cap, "module$meta$init");
        if (fxn != null) om.bind("devkits.BOOSTXL_BUCKCONV.Buck$$module$meta$init", true);
        if (fxn != null) po.addFxn("module$meta$init", $$T_Met, fxn);
        fxn = Global.get(cap, "module$validate");
        if (fxn != null) om.bind("devkits.BOOSTXL_BUCKCONV.Buck$$module$validate", true);
        if (fxn != null) po.addFxn("module$validate", $$T_Met, fxn);
        // struct Buck.COMP_Struct_t
        po = (Proto.Obj)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck$$COMP_Struct_t", "devkits.BOOSTXL_BUCKCONV");
        po.init("devkits.BOOSTXL_BUCKCONV.Buck.COMP_Struct_t", null);
                po.addFld("$hostonly", $$T_Num, 1, "r");
                po.addFld("A0", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("A1", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("A2", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("A3", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("B0", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("B1", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("B2", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
                po.addFld("B3", Proto.Elm.newCNum("(xdc_Float)"), $$UNDEF, "w");
    }

    void Buck$$ROV()
    {
    }

    void $$SINGLETONS()
    {
        pkgP.init("devkits.BOOSTXL_BUCKCONV.Package", (Proto.Obj)om.findStrict("xdc.IPackage.Module", "devkits.BOOSTXL_BUCKCONV"));
        pkgP.bind("$capsule", $$UNDEF);
        pkgV.init2(pkgP, "devkits.BOOSTXL_BUCKCONV", Value.DEFAULT, false);
        pkgV.bind("$name", "devkits.BOOSTXL_BUCKCONV");
        pkgV.bind("$category", "Package");
        pkgV.bind("$$qn", "devkits.BOOSTXL_BUCKCONV.");
        pkgV.bind("$vers", Global.newArray(1, 0, 0));
        Value.Map atmap = (Value.Map)pkgV.getv("$attr");
        atmap.seal("length");
        imports.clear();
        pkgV.bind("$imports", imports);
        StringBuilder sb = new StringBuilder();
        sb.append("var pkg = xdc.om['devkits.BOOSTXL_BUCKCONV'];\n");
        sb.append("if (pkg.$vers.length >= 3) {\n");
            sb.append("pkg.$vers.push(Packages.xdc.services.global.Vers.getDate(xdc.csd() + '/..'));\n");
        sb.append("}\n");
        sb.append("if ('devkits.BOOSTXL_BUCKCONV$$stat$base' in xdc.om) {\n");
            sb.append("pkg.packageBase = xdc.om['devkits.BOOSTXL_BUCKCONV$$stat$base'];\n");
            sb.append("pkg.packageRepository = xdc.om['devkits.BOOSTXL_BUCKCONV$$stat$root'];\n");
        sb.append("}\n");
        sb.append("pkg.build.libraries = [\n");
        sb.append("];\n");
        sb.append("pkg.build.libDesc = [\n");
        sb.append("];\n");
        Global.eval(sb.toString());
    }

    void Buck$$SINGLETONS()
    {
        Proto.Obj po;
        Value.Obj vo;

        vo = (Value.Obj)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck", "devkits.BOOSTXL_BUCKCONV");
        po = (Proto.Obj)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck.Module", "devkits.BOOSTXL_BUCKCONV");
        vo.init2(po, "devkits.BOOSTXL_BUCKCONV.Buck", $$DEFAULT, false);
        vo.bind("Module", po);
        vo.bind("$category", "Module");
        vo.bind("$capsule", om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck$$capsule", "devkits.BOOSTXL_BUCKCONV"));
        vo.bind("$package", om.findStrict("devkits.BOOSTXL_BUCKCONV", "devkits.BOOSTXL_BUCKCONV"));
        tdefs.clear();
        proxies.clear();
        mcfgs.clear();
        icfgs.clear();
        inherits.clear();
        vo.bind("COMP_Struct_t", om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck.COMP_Struct_t", "devkits.BOOSTXL_BUCKCONV"));
        tdefs.add(om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck.COMP_Struct_t", "devkits.BOOSTXL_BUCKCONV"));
        vo.bind("$$tdefs", Global.newArray(tdefs.toArray()));
        vo.bind("$$proxies", Global.newArray(proxies.toArray()));
        vo.bind("$$mcfgs", Global.newArray(mcfgs.toArray()));
        vo.bind("$$icfgs", Global.newArray(icfgs.toArray()));
        vo.bind("$$inherits", Global.newArray(inherits.toArray()));
        ((Value.Arr)pkgV.getv("$modules")).add(vo);
        ((Value.Arr)om.findStrict("$modules", "devkits.BOOSTXL_BUCKCONV")).add(vo);
        vo.bind("$$instflag", 0);
        vo.bind("$$iobjflag", 1);
        vo.bind("$$sizeflag", 1);
        vo.bind("$$dlgflag", 0);
        vo.bind("$$iflag", 0);
        vo.bind("$$romcfgs", "|");
        vo.bind("$$nortsflag", 0);
        Proto.Str ps = (Proto.Str)vo.find("Module_State");
        if (ps != null) vo.bind("$object", ps.newInstance());
        vo.bind("$$meta_iobj", om.has("devkits.BOOSTXL_BUCKCONV.Buck$$instance$static$init", null) ? 1 : 0);
        vo.bind("$$fxntab", Global.newArray());
        vo.bind("$$logEvtCfgs", Global.newArray());
        vo.bind("$$errorDescCfgs", Global.newArray());
        vo.bind("$$assertDescCfgs", Global.newArray());
        Value.Map atmap = (Value.Map)vo.getv("$attr");
        atmap.seal("length");
        pkgV.bind("Buck", vo);
        ((Value.Arr)pkgV.getv("$unitNames")).add("Buck");
    }

    void $$INITIALIZATION()
    {
        Value.Obj vo;

        if (isCFG) {
        }//isCFG
        Global.callFxn("module$meta$init", (Scriptable)om.findStrict("devkits.BOOSTXL_BUCKCONV.Buck", "devkits.BOOSTXL_BUCKCONV"));
        Global.callFxn("init", pkgV);
        ((Value.Obj)om.getv("devkits.BOOSTXL_BUCKCONV.Buck")).bless();
        ((Value.Arr)om.findStrict("$packages", "devkits.BOOSTXL_BUCKCONV")).add(pkgV);
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
        Buck$$OBJECTS();
        Buck$$CONSTS();
        Buck$$CREATES();
        Buck$$FUNCTIONS();
        Buck$$SIZES();
        Buck$$TYPES();
        if (isROV) {
            Buck$$ROV();
        }//isROV
        $$SINGLETONS();
        Buck$$SINGLETONS();
        $$INITIALIZATION();
    }
}
