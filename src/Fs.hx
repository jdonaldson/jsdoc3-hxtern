/**
  Minimal fs commands to get me started
 **/
@:native("require('fs')")
extern class Fs {
    //Tests
    public static function existsSync(path : String) : Bool {}
    //Directories
    public static function makeDirectory(path : String, permissions_opt : Dynamic) : Void {}
    public static function makeTree(path : String) : Void {}
    public static function removeTree(path : String) : Void {}
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
