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
    static var pack_obj : Pack;
    static function main() {
        var dest = Env.opts.destination;
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial: Dynamic ){
            taffy.sort("longname, version, since");
            var haxetypes = taffy.retrieve().map(function(x,y){
                switch(x.docletType()){
                    case DocletFunction(doc) : {
                        if (uc(doc.name)){
                            // assume constructor. Use name as class
                            var cls_pack = doc.memberof + '.' + doc.name;
                            var clazz = makeClazz(cls_pack);
                            return HaxeConstructor({
                                clazz : makeClazz(cls_pack),
                                file  : pack2file(cls_pack),
                                doc   : doc
                            });
                        } else {
                            var clazz = makeClazz(doc.memberof);

                            var args = {
                                name  : doc.name,
                                clazz : clazz,
                                file  : pack2file(clazz.pack + '.' + doc.name),
                                doc   : doc
                            };

                            switch(doc.scope){
                                case "instance" : return HaxeInstanceMethod(args);
                                case "static"   : return HaxeStaticMethod(args);
                            }
                        }
                    }
                    case DocletMember(doc) : {}
                    case DocletUnknown(_) : {
                        throw('Unknown doclet type: ${x.kind}');
                    }
                    default : null;
                }
                return NoOp;
            });
            var packs:Dynamic = {};
            for (t in haxetypes){
                switch(t){
                    case HaxeConstructor(args) : {

                    }
                    default : null;
                }
            }

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
            native : memberof
        } : {
            name : cls,
            pack : extractPacks(memberof)
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
