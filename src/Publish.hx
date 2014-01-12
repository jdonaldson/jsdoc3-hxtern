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
        var cnt = 0;
        Exports.publish = function(taffy: Taffy, opts: PublishOpts, tutorial: Dynamic ){
            var packages: Dynamic = {};
            var data = taffy;
            data.sort("longname, version, since");
            data.retrieve().each(function(x,y){
                switch(x.kindType()){
                    case DocletFunctionType(doc) : {
                        var cur = extractPackages(doc.memberof, packages);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletFileType(doc)     : {
                        // trace(x);
                    }
                    case DocletMemberType(doc)   : {
                        var cur = extractPackages(doc.memberof, packages);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletClassType(doc)    : {
                        var cur = extractPackages(doc.memberof, packages);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletConstantType(doc) : {
                        var cur = extractPackages(doc.memberof, packages);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletTypedefType(doc)  : {
                        var cur = extractPackages(doc.memberof, packages);
                        Reflect.setField(cur, doc.name, doc.kind);
                    }
                    case DocletPackageType(doc)  : {}
                    case _ : throw('Unknown doclet type: ${x.kind}');
                }
            });

            if(!Fs.existsSync(Env.opts.destination)){
            }

            // trace(untyped require('fs'));
            trace(untyped require('path'));
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
}

