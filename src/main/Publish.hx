/**
  The main template plugin file
 **/
import Doclet;
import Doctrine;
import Exports;
import Fs;
import Path;
import Taffy;

using Taffy.TaffyHelper;
using Doclet.DocletHelper;
using Doctrine.DoctrineHelper;

class Publish {
    static var pack_obj     : Pack;
    static var class_list   : Array<String>;
    static var global_alias : String;
    static var dest         : String;
    static function publish(taffy: Taffy, opts: PublishOpts, tutorial : Dynamic){
        taffy.sort("longname, version, since");
        var taffy_items = taffy.retrieve();
        taffy_items.each(function(x,y){
            var comment = '';
            if (x.description != null) comment = fixDescription(x.description);
            switch(x.docletType()){
                case DocletFunction(doc) : {
                    var p = Doctrine.parse(x.comment, {unwrap: true});
                    var params = [];
                    var ret = 'Void';
                    var is_constructor = false;
                    for (t in p.tags){
                        if (t.title == 'constructor' || t.title == 'interface'){
                            is_constructor = true;
                        } else if (t.title == 'param'){
                            switch(t.type.chooseType()){
                                case RestType(type) : {
                                    for (i in 0...6){
                                        params.push('?_opt$i: ${renderType(type.expression)}');
                                    }
                                }
                                default : {
                                    var optional = '';
                                    if (isOptional(t.type)) optional = '?';
                                    params.push('$optional${keywordDodge(t.name)}: ${renderType(t.type)}');
                                }
                            }

                        } else if (t.title == 'return'){
                            ret = renderType(t.type);
                        }
                    }
                    if (!is_constructor){
                        if (doc.memberof == null){
                            doc.memberof = global_alias + ".Global";
                        } else if (doc.memberof == "Window"){
                            doc.memberof = global_alias + ".Window";
                        }
                    }
                    var param_list = params.join(', ');

                    if (is_constructor){
                        var cls_pack = classModule(doc.memberof, null,  doc.name);

                        var sig = '\tpublic function new($param_list);';
                        var clazz = makeClazz(cls_pack, doc);
                        clazz.fields.push(sig);
                    } else {
                        var clazz = makeClazz(doc.memberof, doc);

                        var args = {
                            name      : doc.name,
                            clazz     : clazz,
                            doc       : doc,
                            signature : ''
                        };

                        switch(doc.scope){
                            case "instance" : {
                                var sig = '\tpublic function ${doc.name}($param_list): $ret {}';
                                clazz.fields.push(sig);
                            }
                            case "static", "global"   : {
                                var sig = '\tpublic static function ${doc.name}($param_list): $ret {}';
                                clazz.fields.push(sig);
                            }
                        }
                    }
                }
                case DocletMember(doc) : {
                    if (doc.memberof == null) {
                        trace('INFO: ${doc.name} is a member with no "memberof" field.  This can happen if it is meant to be a module.  Ignoring it for now');
                        return;
                    }
                    var p = Doctrine.parse(x.comment, {unwrap:true});
                    var clazz = makeClazz(doc.memberof, doc);
                    var args = {
                        name : doc.name,
                        clazz : clazz ,
                        doc : doc,
                        signature : ''
                    }
                    var type = 'Dynamic';
                    for (t in p.tags){
                        if (t.title == 'type') {
                            type = renderType(t.type);
                        }
                    }
                    switch(doc.scope){
                        case "instance" : {
                            var sig = '${comment}\tpublic var ${doc.name}: $type;';
                            clazz.fields.push(sig);
                        }
                        case "static", "global" : {
                            var sig = '${comment}\tpublic static var ${doc.name}: $type;';
                            clazz.fields.push(sig);
                        }
                    }
                }
                case DocletClass(doc) : {
                    var name = doc.name;
                    if (doc.memberof != null && doc.memberof.length > 0){
                        name = doc.memberof + '.' + name;
                    }
                    var p = Doctrine.parse(x.comment, {unwrap:true});
                    var is_constructor = false;
                    var params = [];
                    var ret = 'Void';
                    var isprivate = false;
                    for (t in p.tags){
                        switch(t.title){
                            case 'private' : isprivate = true;
                            case 'constructor', 'interface' : is_constructor = true;
                            case 'param' : {
                                var optional = '';
                                if (isOptional(t.type)) optional = '?';
                                params.push('$optional${keywordDodge(t.name)}: ${renderType(t.type)}');
                            }
                            case 'return' : ret = renderType(t.type);
                        }
                    }
                    var clazz = makeClazz(name, doc);
                    var param_list = params.join(', ');
                    var private_status = isprivate ? 'private' : 'public';
                    clazz.comment = '${x.name} : generated by hxtern';
                    if (x.description != null) clazz.comment += '\n${x.description}';
                    if (is_constructor){
                        var cls_pack = classModule(doc.memberof, null, doc.name);
                        var sig = '\t$private_status function new($param_list);';

                        var clazz = makeClazz(cls_pack, doc);
                        clazz.fields.push(sig);
                    }
                }
                case DocletTypedef(doc) : {
                    var name = doc.name;
                    if (doc.memberof != null && doc.memberof.length > 0){
                        name = doc.memberof + '.' + name;
                    }
                    var p = Doctrine.parse(x.comment, {unwrap:true});
                    var td = '';
                    for (t in p.tags){
                        if (t.title == 'typedef'){
                            td = renderType(t.type);
                        }
                    }
                    if (td == '') td = '{}';
                    var clazz = makeClazz(name, doc, true);
                    clazz.fields = [td];

                }
                case DocletUnknown(_) : {
                    throw('Unknown doclet type: ${x.kind}');
                }
                default : null;
            }
        });
        ensureDirectory(dest);
        render(pack_obj, dest);
    }

    static function main() {
        class_list = [];
        pack_obj = {
            name : '',
            packs   : new Map<String, Pack>(),
            classes : new Map<String, Clazz>()
        };
        dest = Env.opts.destination;
        var query = Env.opts.query;
        if (query == null || query.global == null){
            throw "Must pass query parameter of global=<packname> for global class alias";
        }
        global_alias = query.global;
        Exports.publish = publish;
    }
    public static function isOptional(type : UnknownType) : Bool {
        switch(type.chooseType()){
            case OptionalType(doc) : return true;
            default : return false;
        }
    }
    public static function isRestArgument(arg : UnknownType) {
        switch(arg.chooseType()){
            case RestType(doc) : return true;
            default : return false;
        }

    }
    public static function keywordDodge(arg : String) : String{
        switch(arg){
            case 'callback' : return "_callback";
            default : return arg;
        }
    }
    public static function renderType(type : UnknownType){
        switch(type.chooseType()){
            case FunctionType(type) : {
                var params = [for (t in type.params)  renderType(t)].join('->');
                var result = 'Void';
                if (type.result != null) result = renderType(type.result);
                if (params == '') params = 'Void';

                return '$params->$result';
            }
            case OptionalType(type): {
                return renderType(type.expression);
            }
            case NonNullableType(type) : {
                return renderType(type.expression);
            }
            case NullableType(type) : {
                return renderType(type.expression);
            }
            case RecordType(type) : {
                var fields = [for (f in type.fields) renderType(f)].join(', ');
                var res = '{$fields}';
                return res;
            }
            case FieldType(type) : {
                var value = renderType(type.value);
                return '${type.key}: $value';
            }
            case UndefinedLiteral(type) :  return 'Null<Dynamic>';
            case NameExpression(type) : {
                return nameExpressionType(type.name);
            }
            case VoidLiteral(type) : return 'Void';
            case AllLiteral(type)  : return 'Dynamic';
            case UnionType(type)   : {
                // return renderType(type.elements[0]);
                var types = [for (e in type.elements) renderType(e)].join(',');
                var count = type.elements.length;
                if (count == 0){
                    throw "No types in uniontype for $type";
                } else if (count == 1){
                    return renderType(type.elements[0]);
                } else if (count > 6){
                    throw "Too many types in union type $type";
                } else {
                    return 'Hxtern.Any$count<$types>';
                }
            }
            case NullableLiteral(type) : return 'Dynamic';
            case TypeApplication(type) : {
                var container = renderType(type.expression);
                if (container == "Dynamic" && type.applications.length == 2){
                    var type1 = renderType(type.applications[0]);
                    switch(type1){
                        case 'String', 'Dynamic' : type.applications.shift();
                    }
                }
                if (container == "Dynamic" && type.applications.length != 1){
                    trace('Too many parameters for $type.  Using "Dynamic"\n');
                    return 'Dynamic';
                }
                var params = [for (a in type.applications) renderType(a)].join(', ');
                return '$container<$params>';

            }
            case ArrayType(type) : {
                if (type.elements.length > 1){
                    trace('Too many array type elements in $type');
                    return 'Dynamic';
                } else {
                    var firstType = renderType(type.elements[0]);
                    return 'Array<$firstType>';
                }
            }
            case RestType(type) : {
                var resttype = renderType(type.expression);
                return [for (i in 0...6) '?$resttype'].join('->');
            }
            case _ : throw 'unknown type in renderType: $type';
        }
        return '';
    }

    public static function nameExpressionType(expression : String){
        switch(expression){
            case 'boolean'  : return 'Bool';
            case 'string'   : return 'String';
            case 'Array'    : return 'Array';
            case 'number'   : return 'Float';
            case 'Object'   : return 'Dynamic';
            case 'Function' : return 'Dynamic';
            case 'void'     : return 'Void';
            default         : {
                return fixType(expression);
            }
        }
    }

    public static function fixType(signature:String){
        var parts = signature.split('.');
        var fixed = [];
        var name = titleCase(parts.pop());
        switch(name){
            case "Element" : return 'js.html.Element';
        }

        name = ~/^[^a-zA-Z]*/.replace(name,'');
        if (name == '') name = global_alias;
        name = titleCase(name);

        var pack = [];
        while(parts.length > 0 && lc(parts[0])){
            pack.push(parts.shift());
        }
        var pname = '';
        if (parts.length > 0){
            pname = parts[0];
        }
        return classModule(pack.join('.'), pname, name);
    }

    public static function render(pack : Pack, cwd : String){
        ensureDirectory(cwd);
        for (c in pack.classes.keys()){
            var clazz = pack.classes.get(c);
            var clazz_name = clazz.name;
            var package_line = 'package ${pack.name};';
            var native = '';
            if (clazz.native != clazz.signature) {
                native = '@:native("${clazz.native}")';
            }
            if (clazz.pname != null){
                clazz_name = clazz.pname;
                package_line = '';
            } else {
                var name = pack.name == '' ? c : pack.name + '.' + c;
                class_list.push(name);
            }
            if (clazz.pname != null) package_line = '';
            var file = cwd + Path.sep + clazz_name + '.hx';
            clazz.fields = clazz.fields.filter(function(x) return x != null);
            var content = clazz.fields.join('\n\n');
            if (clazz.comment == null) clazz.comment = '  ${clazz.name} : generated by hxtern';
            if (clazz.type == 'class'){
                content = '/**\n${clazz.comment}\n*/\n$package_line\n$native\nextern class ${clazz.name}{\n$content\n}\n';
            } else {
                content = '/**\n${clazz.comment}\n*/\n$package_line\n$native\nextern typedef ${clazz.name} = $content\n\n';
            }
            Fs.appendFileSync(file, content);
        }
        for (p in pack.packs.keys()){
            var next_pack  = pack.packs.get(p);
            var next_dir = cwd + Path.sep + p;
            render(next_pack,  next_dir);
        }
    }

    /**
      Split the pack string argument into an array, and iterate through them,
      ensuring that the pack_object contains an entry for each pack.  Return
      the last created/returned pack object.
     **/
    public static function extractPacks(pack : String) : Pack {
        var packs = pack.split('.');
        var cur_obj = pack_obj;
        var cur_name = '';
        for (p in packs){
            cur_name == '' ? cur_name = p : cur_name = [cur_name, p].join('.');
            if (cur_obj.packs.exists(p)) cur_obj = cur_obj.packs.get(p);
            else {
                var new_pack = {
                    name    : cur_name,
                    packs   : new Map<String, Pack>(),
                    classes : new Map<String, Clazz>()
                };
                cur_obj.packs.set(p, new_pack);
                cur_obj = new_pack;
            }
        }
        return cur_obj;
    }

    /**
      Return the "clazz".  Check if it's lower case, if so
      add a native field giving its native name.
     **/
    public static function makeClazz(memberof : String, doclet : Doclet, is_typedef = false, is_private=false) : Clazz {
        if (memberof == null) {
            trace(doclet);
            throw "missing memberof for makeClazz";
        }
        var packs = memberof.split('.');
        var cls = packs.pop();
        var pname : String = null;
        if (packs.length > 0){
            var pcls = packs.pop();
            if (uc(pcls)){
                while (uc(pcls)){
                    pname = fixType(pcls);
                    pcls = packs.pop();
                }
            } else {
                packs.push(pcls);
            }
        }
        var pack = extractPacks(packs.join('.'));
        var type = is_typedef ? 'typedef' : 'class';
        var name = cls;
        name = ~/^[^a-zA-Z]*/.replace(name,'');
        if (name == '') name = global_alias;
        name = titleCase(name);
        var signature = classModule(pack.name, pname, name);
        var clazz : Clazz = {
            name       : name,
            type       : type,
            pack       : pack,
            pname      : pname,
            is_private : is_private,
            native     : memberof,
            signature  : signature,
            fields     : []
        }
        var cur_clazzes = clazz.pack.classes;
        var full_name = (pack.name == null || pack.name == '') ? clazz.name : pack.name + '.' + clazz.name;

        if (cur_clazzes.exists(full_name)){
            var cur_clazz = cur_clazzes.get(full_name);
            if (cur_clazz.native != clazz.native){
                throw ('Two different definitions for ${clazz.name} : $clazz and $cur_clazz');
            }
            clazz = cur_clazz;
        } else {
            cur_clazzes.set(full_name, clazz);
        }
        return clazz;

    }
    public static function classModule(?pack:String, ?parent:String, ?name:String){
        return [pack, parent, name]
                .filter(function(x) return x != null && x != '')
                .join('.');
    }
    public static function lc(arg: String) return ~/^[a-z]/.match(arg);
    public static function uc(arg: String) return ~/^[A-Z]/.match(arg);
    public static function fixDescription(description:String) : String {
        var fixed_description = description.split('\n').join('\n\t  ');
        return '\t/**\n\t  $fixed_description\n\t */\n';
    }
    public static function titleCase(arg: String) : String {
        return arg.charAt(0).toUpperCase() + arg.substring(1);
    }
    public static function pack2file(arg: String) {
        return arg.split('.').join(Path.sep) + '.hx';
    }

    static function ensureDirectory(path : String){
        if(!Fs.existsSync(path)){
            var dirs = path.split(Path.sep);
            var current = '';
            for (d in dirs){
                current += d + Path.sep;
                if(!Fs.existsSync(current)){
                    Fs.mkdirSync(current);
                }
            }
        }
    }

}

