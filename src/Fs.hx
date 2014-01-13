/**
  Minimal fs commands to get me started
 **/
@:native("require('fs')")
extern class Fs {
    //Tests
    public static function existsSync(path : String) : Bool {}
    //Directories
    public static function mkdirSync(path : String, ?permissions_opt : Dynamic) : Void {}
    //Files
    public static function open(source : String, mode: ModeObj) : Stream;
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
