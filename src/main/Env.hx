
/**
  Not really used
 **/
@:native("env")
extern class Env {
     static public var conf  : EnvConf;
     static public var opts  : EnvOpts;
}

/**
  Not really used
 **/
typedef EnvConf = {
    public var templates : Map<String, String>;
}

typedef EnvOpts = {
    _                       : String,
    destination             : String,
    encoding                : String,
    query : Dynamic
}
