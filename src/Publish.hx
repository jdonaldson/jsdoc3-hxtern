/**
  The main template plugin file
 **/
import Exports;
import Fs;
import Taffy;

using Taffy.TaffyHelper;
using Doclet.DocletHelper;

class Publish {
    static function main() {
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial: Dynamic ){
            var pack: Dynamic = {};
            taffy.sort("longname, version, since");
            taffy.retrieve().each(function(x,y){
                switch(x.docletType()){
                    case DocletFunction(doc) : {
                        var cur = extractPackages(doc.memberof, pack);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletFile(doc)     : {}
                    case DocletMember(doc)   : {
                        var cur = extractPackages(doc.memberof, pack);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletClass(doc)    : {
                        var cur = extractPackages(doc.memberof, pack);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletConstant(doc) : {
                        var cur = extractPackages(doc.memberof, pack);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletTypedef(doc)  : {
                        var cur = extractPackages(doc.memberof, pack);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletPackage(doc)  : {}
                    case _ : throw('Unknown doclet type: ${x.kind}');
                }
            });
            var dest = Env.opts.destination;
            ensureDirectory(dest);
            visitPackage(pack, '.');
        }
    }
    static function visitPackage(pack : Dynamic, cwd : String){
        for (f in Reflect.fields(pack)){

        }
    }
    static function extractPackages(pack = '', packages: Dynamic) : {} {
        var packs = pack.split('.');
        var cur = packages;
        for (p in packs){
            if (Reflect.hasField(cur,p)){
                var val = Reflect.field(cur,p);
                if (Std.is(val, String)) {
                    var new_cur = {};
                    Reflect.setField(cur,p, new_cur);
                    cur = new_cur;
                } else {
                    cur = val;
                }
            } else {
                var new_cur:Dynamic = {}; 
                Reflect.setField(cur, p, new_cur);
                cur = new_cur;
            }
        }
        return cur;
    }

    static function ensureDirectory(path : String){
        if(!Fs.existsSync(path)) Fs.mkdirSync(path);
    }
}

