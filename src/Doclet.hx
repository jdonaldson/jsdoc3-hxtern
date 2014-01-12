/**
  Datatypes and helpers for jsdoc3 doclets
 **/

/**
  The base doclet type.  Most doclets should have this info.
 **/
typedef Doclet = {
    comment      : String,
    ?meta        : Dynamic,
    kind         : String,
    name         : Dynamic,
    longname     : String,
    ?see         : Array<String>,
    ?description : String,
}

/**
  A file doclet
 **/
typedef DocletFile = {
    > Doclet,
    preserveName : String
}

/**
  Member base.  Simple fields have a type, member functions have this info 
  in their params 
 **/
typedef DocletMemberBase = {
    > Doclet,
    memberof : String,
    scope    : String, // static, instance, global
    ?access  : String, // private
}
typedef DocletMember = {
    > DocletMemberBase,
    type : { names : Array<String>},
}

typedef DocletFunction = {
    > DocletMemberBase,
    params : Array<FunctionParam>,
}

/**
  These can be simple aliases, no extra info
 **/
typedef DocletClass    = DocletMember;
typedef DocletConstant = DocletMemberBase;
typedef DocletTypedef  = DocletMember;

/**
  packages sometimes have version, license, etc. info
 **/
typedef DocletPackage = {
    >Doclet,
    version  : String,
    licenses : String,
    files    : Array<String>
}


/**
  Wrap all expected types
 **/
enum DocletType {
    DocletFileType     ( doc : DocletFile);
    DocletMemberType   ( doc : DocletMember);
    DocletFunctionType ( doc : DocletFunction);
    DocletClassType    ( doc : DocletClass);
    DocletConstantType ( doc : DocletConstant);
    DocletTypedefType  ( doc : DocletTypedef);
    DocletPackageType  ( doc : DocletPackage);
    DocletUnknownType  ( doc : Doclet);
}


/**
  The metadata that most doclets posess.  TODO: figure out which ones have 
  this *for sure*
 **/
typedef Meta = {
    filename : String,
    range    : Array<Int>,
    lineno   : Int,
    path     : String,
    code     : Dynamic // TODO
}

/**
  Simple helper class to disambiguate the dynamic anonymous object information
  in extracted doclets
 **/
class DocletHelper {
    /**
      Looks a the the doclet kind and return the enum for the 
      proper type.
     **/
    public static function kindType(doc:Doclet) : DocletType{
        if      ( doc.kind == 'file'     ) return DocletFileType( cast doc) ;
        else if ( doc.kind == 'function' ) return DocletFunctionType( cast doc ) ;
        else if ( doc.kind == 'member'   ) return DocletMemberType( cast doc) ;
        else if ( doc.kind == 'class'    ) return DocletClassType( cast doc) ;
        else if ( doc.kind == 'constant' ) return DocletConstantType( cast doc) ;
        else if ( doc.kind == 'typedef'  ) return DocletTypedefType( cast doc) ;
        else if ( doc.kind == 'package'  ) return DocletPackageType( cast doc) ;
        else return DocletUnknownType(doc);
    }
}

/**
  Function params 
 **/
typedef FunctionParam = {
    type          : { names : Array<String> },
    ?optional     : Bool,
    ?nullable     : Bool,
    ?variable     : Bool,
    ?defaultvalue : Bool,
    description   : String,
    name          : String
}
