

/**
  A wrapper class for the normal Doctrine methods.  Pre-processes
  doctrine comments to prevent certain avoidable errors.
 **/
class Doctrine {
    public static function parse(comment : String, ?options : ParseOptions) {
        return DoctrineLib.parse(fix(comment));
    }
    /**
      This method just removes any extra lines from @ tag statements.
     **/
    static function fix(arg:String){
        var lines = arg.split('\n');
        var ret_lines = [];
        var tagfound = false;
        while(lines.length > 0){
            var line = lines.shift();
            if (~/^\s\*\s*@/.match(line)){
                tagfound = true;
                ret_lines.push(line);
            } else if (tagfound){
                var stripped = ~/^\s*\*\s*/.replace(line, '');
                stripped = ~/Read only\./.replace(stripped, '');
                ret_lines[ret_lines.length-1] += stripped;
            } else {
                ret_lines.push(line);
            }
        }

        return ret_lines.join('\n');
    }
}

/**
  Minimal doctrine commands to get me started.  This is the class that 
  actually externs the lib.
 **/
@:native("require('doctrine')")
extern class DoctrineLib {
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

typedef MultiType = {
    > UnknownType,
    elements : Array<UnknownType>
}

typedef ArrayType = MultiType;
typedef UnionType = MultiType;

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

typedef RestType = {
    >UnknownType,
    expression : UnknownType 
}

typedef RecordType = {
    >UnknownType,
    fields : Array<UnknownType>
}

typedef VoidLiteral  = UnknownType
typedef NullLiteral  = UnknownType
typedef AllLiteral   = UnknownType
typedef NullableLiteral = UnknownType
typedef UndefinedLiteral = UnionType

typedef NullableType = NonNullableType


/**
  A class for autoconstructing enums from unknown types
 **/
class DoctrineHelper {
    public static function chooseType(type : UnknownType) : DoctrineType {
        switch(type.type){
            case "AllLiteral"       : return AllLiteral       (cast type);
            case "FieldType"        : return FieldType        (cast type);
            case "FunctionType"     : return FunctionType     (cast type);
            case "NameExpression"   : return NameExpression   (cast type);
            case "NonNullableType"  : return NonNullableType  (cast type);
            case "NullLiteral"      : return NullLiteral      (cast type);
            case "NullableLiteral"  : return NullableLiteral  (cast type);
            case "NullableType"     : return NullableType     (cast type);
            case "OptionalType"     : return OptionalType     (cast type);
            case "RecordType"       : return RecordType       (cast type);
            case "TypeApplication"  : return TypeApplication  (cast type);
            case "UndefinedLiteral" : return UndefinedLiteral (cast type);
            case "UnionType"        : return UnionType        (cast type);
            case "VoidLiteral"      : return VoidLiteral      (cast type);
            case "RestType"         : return RestType         (cast type);
            case "ArrayType"        : return ArrayType        (cast type);
            default                 : throw 'error! $type is an unknown doctrine type.';
        }
    }
}


enum DoctrineType {
    ArrayType        ( type : ArrayType);
    AllLiteral       ( type : AllLiteral);
    FieldType        ( type : FieldType);
    FunctionType     ( type : FunctionType);
    NameExpression   ( type : NameExpression);
    NonNullableType  ( type : NonNullableType);
    NullLiteral      ( type : NullLiteral);
    NullableLiteral  ( type : NullableLiteral);
    NullableType     ( type : NullableType);
    OptionalType     ( type : OptionalType);
    RecordType       ( type : RecordType);
    TypeApplication  ( type : TypeApplication);
    UndefinedLiteral ( type : UndefinedLiteral);
    UnionType        ( type : UnionType);
    Unknown          ( type : UnknownType);
    VoidLiteral      ( type : VoidLiteral);
    RestType         ( type : RestType);
}

/* unimplemented */

// NullableLiteral: 'NullableLiteral',
// AllLiteral: 'AllLiteral',
// NullLiteral: 'NullLiteral',
// UndefinedLiteral: 'UndefinedLiteral',
// VoidLiteral: 'VoidLiteral',
// UnionType: 'UnionType',
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
