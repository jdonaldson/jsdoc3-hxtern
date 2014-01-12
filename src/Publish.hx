/**
  The main template plugin file
 **/
import Taffy;
import Fs;
using Taffy.TaffyHelper;
using Doclet.DocletHelper;
using Publish.ParseHelper;

class Publish {
    static function main() {
        var cnt = 0;
        Exports.publish = function(taffyData: TaffyData, opts: PublishOpts, tutorial: Dynamic ){
            var packages: Dynamic = {};
            var data = taffyData;
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




class ParseHelper {
    public static function isClass(arg : String) {
        return ~/^[A-Z]/.match(arg);
    }
}


@:native("exports")
extern class Exports {
    public static var publish : TaffyData->PublishOpts->Dynamic->Void;
}


/**
  Not really used
 **/
typedef PublishOpts = {
    template      : String,
    encoding      : String,
    readme        : String,
    mainpagetitle : String,
}

/**
  Not really used
 **/
@:native("env")
extern class Env {
     static public var conf : EnvConf;
     static public var opts : EnvOpts; 
}

/**
  Not really used
 **/
typedef EnvConf = {
    public var templates : Map<String, String>;
}

typedef EnvOpts = {
    _ : String,
    destination : String,
    encoding : String
}

