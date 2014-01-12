import Doclet;

typedef Taffy = {
    insert   : String->Void,
    merge    : String->Void,
    TAFFY    : Bool,
    sort     : String->Void,
    settings : Dynamic,
    store    : Dynamic
}

class TaffyHelper {
    inline public static function retrieve(taffy:Taffy) : TaffyQueryObject{
        return untyped taffy();
    }
}

// TODO: add the rest of these: http://www.taffydb.com/workingwithdata
extern class TaffyQueryObject {
    public function update() : TaffyQueryObject;
    public function remove(over_ride: Bool) : Int;
    public function each(f: Doclet->Int->Void) : TaffyQueryObject;
    public function first() : TaffyQueryObject;

}
