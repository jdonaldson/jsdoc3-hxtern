
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
    type        : UnknownType
}

typedef UnknownType = { type : String }

typedef FunctionType = {
    > UnknownType,
    params : Dynamic,
    result : { type : Dynamic }
}

/**
  Typedef or class
 **/
typedef NameExpression = {
    > UnknownType,
    name : String
}


typedef OptionalType = {
    > UnknownType,
    expression : UnknownType
}

typedef UnionType = {
    > UnknownType,
    elements : Array<UnknownType>
}

typedef NonNullableType = {
    > UnknownType,
    expression : UnknownType
}

typedef TypeApplication = {
    expression : UnknownType,
    applications : Array<UnknownType>
}


