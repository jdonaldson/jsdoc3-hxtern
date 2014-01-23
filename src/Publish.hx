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
        pack_obj = {
            packs   : new Map<String, Pack>(),
            classes : new Map<String, Clazz>()
        };
        var dest = Env.opts.destination;
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial: Dynamic ){
            taffy.sort("longname, version, since");
            var haxetypes = taffy.retrieve().map(function(x,y){
                switch(x.docletType()){
                    case DocletFunction(doc) : {
                        if (uc(doc.name)){
                            // assume constructor. Use name as class
                            var cls_pack = doc.memberof + '.' + doc.name;
                            var sig = '${doc.comment}\npublic function new();';
                            var clazz = makeClazz(cls_pack);
                            clazz.fields.push(sig);
                            return HaxeConstructor({
                                clazz : clazz,
                                doc   : doc
                            });
                        } else {
                            var clazz = makeClazz(doc.memberof);

                            var args = {
                                name  : doc.name,
                                clazz : clazz,
                                doc   : doc
                            };
                            parseParams(doc.comment);
                            trace('-----');
                            switch(doc.scope){
                                case "instance" : {
                                    // clazz.push('${doc.comment}\npublic function ${args.name}
                                    return HaxeInstanceMethod(args);
                                }
                                case "static"   : {
                                    return HaxeStaticMethod(args);
                                }
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
            ensureDirectory(dest);
            render(pack_obj, dest);
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
    public static function parseParams(arg : String){
        var reg = ~/@.*/;
        var params = arg.split('\n')
          .filter(function(x) return reg.match(x))
          .map(function(x) return ~/^[^@]*/.replace(x, ''))
          .join('\n');
        trace(params);
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
