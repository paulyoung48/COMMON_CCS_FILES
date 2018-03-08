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

public class devkits_product
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
        Global.callFxn("loadPackage", xdcO, "xdc.tools.product");
    }

    void $$OBJECTS()
    {
        pkgP = (Proto.Obj)om.bind("devkits.product.Package", new Proto.Obj());
        pkgV = (Value.Obj)om.bind("devkits.product", new Value.Obj("devkits.product", pkgP));
    }

    void ProductView$$OBJECTS()
    {
        Proto.Obj po, spo;
        Value.Obj vo;

        po = (Proto.Obj)om.bind("devkits.product.ProductView.Module", new Proto.Obj());
        vo = (Value.Obj)om.bind("devkits.product.ProductView", new Value.Obj("devkits.product.ProductView", po));
        pkgV.bind("ProductView", vo);
        // decls 
        om.bind("devkits.product.ProductView.ProductElemDesc", om.findStrict("xdc.tools.product.IProductView.ProductElemDesc", "devkits.product"));
    }

    void ProductView$$CONSTS()
    {
        // module ProductView
    }

    void ProductView$$CREATES()
    {
        Proto.Fxn fxn;
        StringBuilder sb;

    }

    void ProductView$$FUNCTIONS()
    {
        Proto.Fxn fxn;

    }

    void ProductView$$SIZES()
    {
    }

    void ProductView$$TYPES()
    {
        Scriptable cap;
        Proto.Obj po;
        Proto.Str ps;
        Proto.Typedef pt;
        Object fxn;

        cap = (Scriptable)Global.callFxn("loadCapsule", xdcO, "devkits/product/ProductView.xs");
        om.bind("devkits.product.ProductView$$capsule", cap);
        po = (Proto.Obj)om.findStrict("devkits.product.ProductView.Module", "devkits.product");
        po.init("devkits.product.ProductView.Module", om.findStrict("xdc.tools.product.IProductView.Module", "devkits.product"));
                po.addFld("$hostonly", $$T_Num, 1, "r");
        po.addFld("homeModule", $$T_Str, "devkits.Home", "wh");
        po.addFld("linksToArray", new Proto.Arr($$T_Str, false), Global.newArray(new Object[]{"org.eclipse.rtsc.xdctools"}), "wh");
        po.addFld("Home", (Proto)om.findStrict("devkits.product.ProductView.ProductElemDesc", "devkits.product"), $$DEFAULT, "wh");
        po.addFld("peripheralsGroup", (Proto)om.findStrict("devkits.product.ProductView.ProductElemDesc", "devkits.product"), $$DEFAULT, "wh");
        po.addFld("homeProduct", (Proto)om.findStrict("devkits.product.ProductView.ProductElemDesc", "devkits.product"), $$DEFAULT, "wh");
        fxn = Global.get(cap, "module$use");
        if (fxn != null) om.bind("devkits.product.ProductView$$module$use", true);
        if (fxn != null) po.addFxn("module$use", $$T_Met, fxn);
        fxn = Global.get(cap, "module$meta$init");
        if (fxn != null) om.bind("devkits.product.ProductView$$module$meta$init", true);
        if (fxn != null) po.addFxn("module$meta$init", $$T_Met, fxn);
        fxn = Global.get(cap, "module$validate");
        if (fxn != null) om.bind("devkits.product.ProductView$$module$validate", true);
        if (fxn != null) po.addFxn("module$validate", $$T_Met, fxn);
                fxn = Global.get(cap, "getProductDescriptor");
                if (fxn != null) po.addFxn("getProductDescriptor", (Proto.Fxn)om.findStrict("xdc.tools.product.IProductView$$getProductDescriptor", "devkits.product"), fxn);
    }

    void ProductView$$ROV()
    {
    }

    void $$SINGLETONS()
    {
        pkgP.init("devkits.product.Package", (Proto.Obj)om.findStrict("xdc.IPackage.Module", "devkits.product"));
        pkgP.bind("$capsule", $$UNDEF);
        pkgV.init2(pkgP, "devkits.product", Value.DEFAULT, false);
        pkgV.bind("$name", "devkits.product");
        pkgV.bind("$category", "Package");
        pkgV.bind("$$qn", "devkits.product.");
        pkgV.bind("$vers", Global.newArray(1, 0, 0));
        Value.Map atmap = (Value.Map)pkgV.getv("$attr");
        atmap.seal("length");
        imports.clear();
        pkgV.bind("$imports", imports);
        StringBuilder sb = new StringBuilder();
        sb.append("var pkg = xdc.om['devkits.product'];\n");
        sb.append("if (pkg.$vers.length >= 3) {\n");
            sb.append("pkg.$vers.push(Packages.xdc.services.global.Vers.getDate(xdc.csd() + '/..'));\n");
        sb.append("}\n");
        sb.append("if ('devkits.product$$stat$base' in xdc.om) {\n");
            sb.append("pkg.packageBase = xdc.om['devkits.product$$stat$base'];\n");
            sb.append("pkg.packageRepository = xdc.om['devkits.product$$stat$root'];\n");
        sb.append("}\n");
        sb.append("pkg.build.libraries = [\n");
        sb.append("];\n");
        sb.append("pkg.build.libDesc = [\n");
        sb.append("];\n");
        Global.eval(sb.toString());
    }

    void ProductView$$SINGLETONS()
    {
        Proto.Obj po;
        Value.Obj vo;

        vo = (Value.Obj)om.findStrict("devkits.product.ProductView", "devkits.product");
        po = (Proto.Obj)om.findStrict("devkits.product.ProductView.Module", "devkits.product");
        vo.init2(po, "devkits.product.ProductView", $$DEFAULT, false);
        vo.bind("Module", po);
        vo.bind("$category", "Module");
        vo.bind("$capsule", om.findStrict("devkits.product.ProductView$$capsule", "devkits.product"));
        vo.bind("$package", om.findStrict("devkits.product", "devkits.product"));
        tdefs.clear();
        proxies.clear();
        mcfgs.clear();
        icfgs.clear();
        inherits.clear();
        vo.bind("ProductElemDesc", om.findStrict("xdc.tools.product.IProductView.ProductElemDesc", "devkits.product"));
        tdefs.add(om.findStrict("xdc.tools.product.IProductView.ProductElemDesc", "devkits.product"));
        vo.bind("$$tdefs", Global.newArray(tdefs.toArray()));
        vo.bind("$$proxies", Global.newArray(proxies.toArray()));
        vo.bind("$$mcfgs", Global.newArray(mcfgs.toArray()));
        vo.bind("$$icfgs", Global.newArray(icfgs.toArray()));
        inherits.add("xdc.tools.product");
        vo.bind("$$inherits", Global.newArray(inherits.toArray()));
        ((Value.Arr)pkgV.getv("$modules")).add(vo);
        ((Value.Arr)om.findStrict("$modules", "devkits.product")).add(vo);
        vo.bind("$$instflag", 0);
        vo.bind("$$iobjflag", 1);
        vo.bind("$$sizeflag", 1);
        vo.bind("$$dlgflag", 0);
        vo.bind("$$iflag", 1);
        vo.bind("$$romcfgs", "|");
        vo.bind("$$nortsflag", 0);
        Proto.Str ps = (Proto.Str)vo.find("Module_State");
        if (ps != null) vo.bind("$object", ps.newInstance());
        vo.bind("$$meta_iobj", om.has("devkits.product.ProductView$$instance$static$init", null) ? 1 : 0);
        vo.bind("$$fxntab", Global.newArray());
        vo.bind("$$logEvtCfgs", Global.newArray());
        vo.bind("$$errorDescCfgs", Global.newArray());
        vo.bind("$$assertDescCfgs", Global.newArray());
        Value.Map atmap = (Value.Map)vo.getv("$attr");
        atmap.seal("length");
        pkgV.bind("ProductView", vo);
        ((Value.Arr)pkgV.getv("$unitNames")).add("ProductView");
    }

    void $$INITIALIZATION()
    {
        Value.Obj vo;

        if (isCFG) {
        }//isCFG
        Global.callFxn("module$meta$init", (Scriptable)om.findStrict("devkits.product.ProductView", "devkits.product"));
        Global.callFxn("init", pkgV);
        ((Value.Obj)om.getv("devkits.product.ProductView")).bless();
        ((Value.Arr)om.findStrict("$packages", "devkits.product")).add(pkgV);
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
        ProductView$$OBJECTS();
        ProductView$$CONSTS();
        ProductView$$CREATES();
        ProductView$$FUNCTIONS();
        ProductView$$SIZES();
        ProductView$$TYPES();
        if (isROV) {
            ProductView$$ROV();
        }//isROV
        $$SINGLETONS();
        ProductView$$SINGLETONS();
        $$INITIALIZATION();
    }
}
