
/**
  Minimal doctrine commands to get me started
 **/
@:native("require('doctrine')")
extern class Doctrine {
    public static function parse(comment : String, ?options : ParseOptions) : DocStructure;
}

typedef ParseOptions = {
    ?unwrap      : Bool,           // default : false
    ?tags        : Array<String>,  // default : null
    ?recoverable : Bool,           // default : false
    ?sloppy      : Bool            // default : false
}

typedef DocStructure = {
    description : String,
    tags        : Array<Tag>
}

typedef Tag = {
    title       : String,
    description : String,
    type        : Dynamic
}
