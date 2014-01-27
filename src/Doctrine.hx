
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
    title        : String,
    ?description : String,
    ?type        : UnknownType,
    ?name        : String
}

typedef UnknownType = { type : String }

typedef FunctionType = {
    > UnknownType,
    params : Array<UnknownType>,
    result : UnknownType 
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
    expression : UnknownType,
    prefix : Bool
}

typedef TypeApplication = {
    expression : UnknownType,
    applications : Array<UnknownType>
}

typedef FieldType = {
    >UnknownType,
    key : String,
    value : UnknownType
}

typedef RecordType = {
    >UnknownType,
    fields : Array<UnknownType>
}

typedef VoidLiteral  = UnknownType
typedef NullLiteral  = UnknownType
typedef AllLiteral   = UnknownType
typedef UndefinedLiteral = UnionType

typedef NullableType = NonNullableType


class DoctrineHelper {
    public static function chooseType(type : UnknownType) : DoctrineType {
        switch(type.type){
            case "FunctionType"     : return FunctionType     (cast type);
            case "NameExpression"   : return NameExpression   (cast type);
            case "NullableType"     : return NullableType     (cast type);
            case "NonNullableType"  : return NonNullableType  (cast type);
            case "OptionalType"     : return OptionalType     (cast type);
            case "TypeApplication"  : return TypeApplication  (cast type);
            case "UnionType"        : return UnionType        (cast type);
            case "RecordType"       : return RecordType       (cast type);
            case "FieldType"        : return FieldType        (cast type);
            case "UndefinedLiteral" : return UndefinedLiteral (cast type);
            case "VoidLiteral"      : return VoidLiteral      (cast type);
            case "NullLiteral"      : return NullLiteral      (cast type);
            case "AllLiteral"       : return AllLiteral       (cast type);
            default                 : throw 'error! $type is an unknown doctrine type.';
        }
    }
}

            // NullableLiteral: 'NullableLiteral',
            // AllLiteral: 'AllLiteral',
            // NullLiteral: 'NullLiteral',
            // UndefinedLiteral: 'UndefinedLiteral',
            // VoidLiteral: 'VoidLiteral',
            // UnionType: 'UnionType',
            // ArrayType: 'ArrayType',
            // RecordType: 'RecordType',
            // FieldType: 'FieldType',
            // FunctionType: 'FunctionType',
            // ParameterType: 'ParameterType',
            // RestType: 'RestType',
            // NonNullableType: 'NonNullableType',
            // OptionalType: 'OptionalType',
            // NullableType: 'NullableType',
            // NameExpression: 'NameExpression',
            // TypeApplication: 'TypeApplication'

enum DoctrineType {
    FunctionType     ( type : FunctionType);
    NameExpression   ( type : NameExpression);
    OptionalType     ( type : OptionalType);
    UnionType        ( type : UnionType);
    RecordType       ( type : RecordType);
    FieldType        ( type : FieldType);
    NullableType     ( type : NullableType);
    NonNullableType  ( type : NonNullableType);
    TypeApplication  ( type : TypeApplication);
    VoidLiteral      ( type : VoidLiteral);
    UndefinedLiteral ( type : UndefinedLiteral);
    NullLiteral      ( type : NullLiteral);
    AllLiteral       ( type : AllLiteral);
    Unknown          ( type : UnknownType);
}
