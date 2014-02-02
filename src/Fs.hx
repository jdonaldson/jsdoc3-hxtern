/**
  Minimal fs commands to get me started
 **/
@:native("require('fs')")
extern class Fs {
    //Tests
    public static function existsSync(path : String) : Bool {}
    //Directories
    public static function mkdirSync(path : String, ?permissions_opt : Dynamic) : Void {}
    public static function rmdirSync(path : String) : Void {}
    //Files
    public static function openSync(source : String, flags : Dynamic) : Stream;
    public static function writeFileSync(file : String, buffer : String, ?encoding : String ) : Stream;
    public static function appendFileSync(file : String, buffer : String, ?encoding : String ) : Stream;
    //Paths
    public static function workingDirectory() : String;
}

typedef ModeObj = {
    ?read      : Bool,
    ?write     : Bool,
    ?append    : Bool,
    ?truncate  : Bool,
    ?create    : Bool,
    ?exclusive : Bool
}

typedef Stream = {
    function read(): String;
}
