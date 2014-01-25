// TODO: mention npm module requirement
@:native("require('catharsis')")
extern class Catharsis {
    public static function parse(arg : String, ?options : {?jsdoc : Bool, ?useCache: Bool}) : Dynamic;
}
