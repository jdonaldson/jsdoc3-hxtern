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
    static var pack_obj : Pack;
    static function main() {
        pack_obj = {
            packs   : new Map<String, Pack>(),
            classes : new Map<String, Clazz>()
        };
        var dest = Env.opts.destination;
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial : Dynamic){
            taffy.sort("longname, version, since");
            var haxetypes = taffy.retrieve().map(function(x,y){
                var comment = '';
                if (x.description != null && x.description.length > 0) {
                    var fixed_description = x.description.split('\n').join('\n\t');
                    comment = '\t/**\n\t$fixed_description\n\t */\n';
                }
                switch(x.docletType()){
                    case DocletFunction(doc) : {
                        var p = Doctrine.parse(x.comment, {unwrap:true});
                        var is_constructor = false;
                        var params = [];
                        var ret = 'Void';
                        for (t in p.tags){
                            if (t.title == 'constructor' || t.title == 'interface'){
                                is_constructor = true;
                            } else if (t.title == 'param'){
                                var optional = '';
                                if (isOptional(t.type)) optional = '?';
                                params.push('$optional${keywordDodge(t.name)}: ${renderType(t.type)}');

                            } else if (t.title == 'return'){
                                ret = renderType(t.type);
                            }
                        }
                        var param_list = params.join(', ');

                        if (is_constructor){
                            var cls_pack = doc.memberof + '.' + doc.name;
                            var sig = '${comment}\tpublic function new($param_list);';
                            var clazz = makeClazz(cls_pack);
                            clazz.fields.push(sig);
                            return HaxeConstructor({
                                clazz     : clazz,
                                doc       : doc,
                                signature : sig
                            });
                        } else {
                            var clazz = makeClazz(doc.memberof);

                            var args = {
                                name      : doc.name,
                                clazz     : clazz,
                                doc       : doc,
                                signature : ''
                            };
                            
                            switch(doc.scope){
                                case "instance" : {
                                    // clazz.push('${doc.description}\npublic function ${args.name}
                                    var sig = '${comment}\tpublic function ${doc.name}($param_list);';
                                    args.signature = sig;
                                    return HaxeInstanceMethod(args);
                                }
                                case "static"   : {
                                    var sig = '${comment}\tpublic static function ${doc.name}($param_list);';
                                    args.signature = sig; 
                                    return HaxeStaticMethod(args);
                                }
                            }
                        }
                    }
                    case DocletMember(doc) : {
                        var p = Doctrine.parse(x.comment, {unwrap:true});
                        var clazz = makeClazz(doc.memberof);
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
                            }
                        }
                    }
                    case DocletUnknown(_) : {
                        throw('Unknown doclet type: ${x.kind}');
                    }
                    default : null;
                }
                return NoOp;
            });
            ensureDirectory(dest);
            render(pack_obj, dest);
        }
        
    }
    public static function isOptional(type : UnknownType) : Bool {
        switch(type.chooseType()){
            case OptionalType(doc) : return true;
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
            case UndefinedLiteral(type) : { return ''; }
            case NameExpression(type) : {
                return nameExpressionType(type.name);
            }
            case VoidLiteral(type) : return 'Void'; 
            case AllLiteral(type)  : return 'Dynamic'; 
            case UnionType(type)   : {
                return renderType(type.elements[0]);
            }
            case NullableLiteral(type) : return 'Dynamic';
            case TypeApplication(type) : {
                var container = renderType(type.expression);
                var params = [for (a in type.applications) renderType(a)].join(', ');
                return '$container<$params>';
                
            }
            case _ : throw 'unknown type in renderType: $type';
        }
        return '';
    }

    public static function nameExpressionType(expression : String){
        switch(expression){
            case 'boolean' : return 'Bool';
            case 'string'  : return 'String';
            case 'Array'   : return 'Array';
            case 'number'  : return 'Float';
            case 'Object'  : return 'Dynamic';
            default        : return expression;
        }
    }

    public static function render(pack : Pack, cwd : String){
        ensureDirectory(cwd);
        for (c in pack.classes.keys()){
           var clazz = pack.classes.get(c); 
           var file = cwd + Path.sep + clazz.name + '.hx';
           // Fs.writeFileSync(file, 'woeafijwoefijawoefij');
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
        for (p in packs){
            if (cur_obj.packs.exists(p)) cur_obj = cur_obj.packs.get(p);
            else {
                var new_pack = {
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
    public static function makeClazz(memberof : String) : Clazz {
        var packs = memberof.split('.');
        var cls  : String= packs.pop();
        var pack = packs.join('.');
        var clazz : Clazz = lc(cls) ?
        {
            name   : titleCase(cls),
            pack   : extractPacks(packs.join('.')),
            native : memberof,
            fields : []
        } : {
            name : cls,
            pack : extractPacks(packs.join('.')),
            fields : []
        }
        var cur_clazzes = clazz.pack.classes;
        if (cur_clazzes.exists(clazz.name)){
            var cur_clazz = cur_clazzes.get(clazz.name);
            if (cur_clazz.native != clazz.native){
                throw ("Two different definitions for ${clazz.name} : $clazz and $cur_clazz");
            } 
        } else {
            cur_clazzes.set(clazz.name, clazz);
        }
        return clazz;

    }
    public static function lc(arg: String) return ~/^[a-z]/.match(arg);
    public static function uc(arg: String) return ~/^[A-Z]/.match(arg);
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




    // public static function pack2dir(arg: String) {
    //     return arg.split('.').join(Path.sep);
    // }

    // static function ensureClassFile(cls : ClassType, dest :String){
    //    switch(cls){
    //        case Class(pack, name), VirtualClass(pack, name) : {
    //            ensureDirectory(dest + Path.sep + pack2dir(pack + '.' + name));
    //        }
    //        case ChildClass(pack, parent_name, name) : {
    //            ensureDirectory(dest + Path.sep + pack2dir(pack + '.' + name));
    //        }
    //    }
    // }

    // static function ensureDirectory(path : String){
    //     if(!Fs.existsSync(path)){
    //         var dirs = path.split(Path.sep);
    //         var current = '';
    //         for (d in dirs){
    //             current += d + Path.sep;
    //             if(!Fs.existsSync(current)){
    //                 Fs.mkdirSync(current);
    //             }
    //         }
    //     }
    // }
