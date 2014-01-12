(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var DocletType = { __ename__ : true, __constructs__ : ["DocletFileType","DocletMemberType","DocletFunctionType","DocletClassType","DocletConstantType","DocletTypedefType","DocletPackageType","DocletUnknownType"] }
DocletType.DocletFileType = function(doc) { var $x = ["DocletFileType",0,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletMemberType = function(doc) { var $x = ["DocletMemberType",1,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletFunctionType = function(doc) { var $x = ["DocletFunctionType",2,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletClassType = function(doc) { var $x = ["DocletClassType",3,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletConstantType = function(doc) { var $x = ["DocletConstantType",4,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletTypedefType = function(doc) { var $x = ["DocletTypedefType",5,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletPackageType = function(doc) { var $x = ["DocletPackageType",6,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletUnknownType = function(doc) { var $x = ["DocletUnknownType",7,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
var DocletHelper = function() { }
DocletHelper.__name__ = true;
DocletHelper.kindType = function(doc) {
	if(doc.kind == "file") return DocletType.DocletFileType(doc); else if(doc.kind == "function") return DocletType.DocletFunctionType(doc); else if(doc.kind == "member") return DocletType.DocletMemberType(doc); else if(doc.kind == "class") return DocletType.DocletClassType(doc); else if(doc.kind == "constant") return DocletType.DocletConstantType(doc); else if(doc.kind == "typedef") return DocletType.DocletTypedefType(doc); else if(doc.kind == "package") return DocletType.DocletPackageType(doc); else return DocletType.DocletUnknownType(doc);
}
var Publish = function() { }
Publish.__name__ = true;
Publish.main = function() {
	var cnt = 0;
	exports.publish = function(taffy,opts,tutorial) {
		var packages = { };
		var data = taffy;
		data.sort("longname, version, since");
		data().each(function(x,y) {
			var _g = DocletHelper.kindType(x);
			var $e = (_g);
			switch( $e[1] ) {
			case 2:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,packages);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 0:
				var doc = $e[2];
				break;
			case 1:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,packages);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 3:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,packages);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 4:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,packages);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 5:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,packages);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 6:
				var doc = $e[2];
				break;
			default:
				throw "Unknown doclet type: " + x.kind;
			}
		});
		if(!require('fs').existsSync(env.opts.destination)) {
		}
		console.log(require("path"));
	};
}
Publish.extractPackages = function(pack,packages) {
	if(pack == null) pack = "";
	var packs = pack.split(".");
	var cur = packages;
	var _g = 0;
	while(_g < packs.length) {
		var p = packs[_g];
		++_g;
		if(Reflect.hasField(cur,p)) {
			var val = Reflect.field(cur,p);
			if(js.Boot.__instanceof(val,String)) {
				var new_cur = { };
				cur[p] = new_cur;
				cur = new_cur;
			} else cur = val;
		} else {
			var new_cur = { };
			cur[p] = new_cur;
			cur = new_cur;
		}
	}
	return cur;
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
var TaffyHelper = function() { }
TaffyHelper.__name__ = true;
TaffyHelper.retrieve = function(taffy) {
	return taffy();
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Publish.main();
})();
