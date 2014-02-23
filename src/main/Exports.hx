import Taffy;

@:native("exports")
extern class Exports {
    public static var publish : Taffy->PublishOpts->Dynamic->Void;
}


/**
  Not really used
 **/
typedef PublishOpts = {
    template      : String,
    encoding      : String,
    readme        : String,
    mainpagetitle : String,
}
