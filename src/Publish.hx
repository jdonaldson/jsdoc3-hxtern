/**
  The main template plugin file
 **/
import Exports;
import Fs;
import Path;
import Taffy;
import Doclet;

using Taffy.TaffyHelper;
using Doclet.DocletHelper;

class Publish {
    static function main() {
        var dest = Env.opts.destination;
        var class_registry = new Map<String, ClassType>();
        ensureDirectory(dest);
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial: Dynamic ){

            taffy.sort("longname, version, since");
            var haxe_types = taffy.retrieve().map(function(x,y){
                var type:HaxeType = 
                switch(x.docletType()){
                    case DocletFunction(doc) : {
                        var name = doc.name;
                        var cls = doc.memberof;
                        if (ClassRegistry.uc(doc.name)){
                            // if it's uppercase, just assume it's a constructor.
                            // we need to patch up javascript constructors for haxe format
                            cls = doc.memberof + '.' + doc.name;
                            name = "new";
                        } 
                        var cls_type = ClassRegistry.resolve(cls, name);

                        HaxeFunction( cls_type, name, doc);
                    }
                    case DocletMember(doc) : {
                        var cls_type = ClassRegistry.resolve(doc.memberof, doc.name);
                        HaxeMember(cls_type, doc.name, doc);
                    }
                    case DocletUnknown(_) : {
                        throw('Unknown doclet type: ${x.kind}');
                        NoOp;
                    }
                    default :  NoOp; 
                }
            return type;
            });
            for (t in haxe_types) switch(t){
                case HaxeMember(cls, name, doc) : {
                    ensureClassFile(cls, dest);
                }
                case HaxeFunction(cls, name, doc) : {
                    ensureClassFile(cls, dest);
                }
                default : null;
            }
        }
    }
    public static function classSig(cls : ClassType, debug = false){
        var arr =  switch(cls){
            case Class (pack, name) : [pack,name];
            case VirtualClass (pack, name) : {
                debug ? [pack,'#$name#']: [pack,name];
            }
            case ChildClass (pack, parent_name, name) :  [pack, parent_name, name];
        }
        return arr.filter(function(x) return x != '').join('.');
    }

    public static function pack2file(arg: String) {
        return arg.split('.').join(Path.sep) + '.hx';
    }
    public static function pack2dir(arg: String) {
        return arg.split('.').join(Path.sep);
    }

    static function ensureClassFile(cls : ClassType, dest :String){
       switch(cls){
           case Class(pack, name), VirtualClass(pack, name) : {
               ensureDirectory(dest + Path.sep + pack2dir(pack + '.' + name));
           }
           case ChildClass(pack, parent_name, name) : {
               ensureDirectory(dest + Path.sep + pack2dir(pack + '.' + name));
           }
       }
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

class ClassRegistry{
    public static var registry: Map<String, ClassType>;
    public static function resolve(packAndClass : String, name : String) {
        if (registry == null) registry = new Map();
        var arg_class = hxClass(packAndClass);
        if (registry.exists(packAndClass)){
            var reg_class = registry.get(packAndClass);
            var reg_type = Type.enumConstructor(reg_class);
            var arg_type = Type.enumConstructor(arg_class);
            if (reg_type != arg_type) throw 'field $name has a problem:  mismatch in $packAndClass between $reg_type and $arg_type';
        } else registry.set(packAndClass, arg_class);
        return arg_class;
    }

    public static function hxClass(packAndClass : String): ClassType {
        if (packAndClass == null) return null;
        var packs = packAndClass.split('.');
        var cls = packs.pop();
        if (lc(cls)){
            var uc_cls = titleCase(cls);
            var fullname = packs.join('.') + '.' + uc_cls;
            return VirtualClass(packs.join('.'), uc_cls);
        } else if (uc(packs[packs.length-1])){
            var parent_cls = packs.pop();
            return ChildClass(packs.join('.'), parent_cls, cls);
        } else if (packs.length > 2 && uc(packs[packs.length-2])){
            throw 'Error: $cls has invalid class signature for $packAndClass: too many title case objects to convert to classes';
        } else return Class(packs.join('.'), cls);
    }
    public static function lc(arg: String) return ~/^[a-z]/.match(arg);
    public static function uc(arg: String) return ~/^[A-Z]/.match(arg);
    public static function titleCase(arg: String) {
        return arg.charAt(0).toUpperCase() + arg.substring(1);
    }
}


