(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var DocletType = { __ename__ : true, __constructs__ : ["DocletFile","DocletMember","DocletFunction","DocletClass","DocletConstant","DocletTypedef","DocletPackage","DocletUnknown"] }
DocletType.DocletFile = function(doc) { var $x = ["DocletFile",0,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletMember = function(doc) { var $x = ["DocletMember",1,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletFunction = function(doc) { var $x = ["DocletFunction",2,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletClass = function(doc) { var $x = ["DocletClass",3,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletConstant = function(doc) { var $x = ["DocletConstant",4,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletTypedef = function(doc) { var $x = ["DocletTypedef",5,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletPackage = function(doc) { var $x = ["DocletPackage",6,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
DocletType.DocletUnknown = function(doc) { var $x = ["DocletUnknown",7,doc]; $x.__enum__ = DocletType; $x.toString = $estr; return $x; }
var DocletHelper = function() { }
DocletHelper.__name__ = true;
DocletHelper.docletType = function(doc) {
	return (function($this) {
		var $r;
		switch(doc.kind) {
		case "file":
			$r = DocletType.DocletFile(doc);
			break;
		case "function":
			$r = DocletType.DocletFunction(doc);
			break;
		case "member":
			$r = DocletType.DocletMember(doc);
			break;
		case "class":
			$r = DocletType.DocletClass(doc);
			break;
		case "constant":
			$r = DocletType.DocletConstant(doc);
			break;
		case "typedef":
			$r = DocletType.DocletTypedef(doc);
			break;
		case "package":
			$r = DocletType.DocletPackage(doc);
			break;
		default:
			$r = DocletType.DocletUnknown(doc);
		}
		return $r;
	}(this));
}
var Publish = function() { }
Publish.__name__ = true;
Publish.main = function() {
	exports.publish = function(taffy,opts,tutorial) {
		var pack = { };
		taffy.sort("longname, version, since");
		taffy().each(function(x,y) {
			var _g = DocletHelper.docletType(x);
			var $e = (_g);
			switch( $e[1] ) {
			case 2:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,pack);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 0:
				var doc = $e[2];
				break;
			case 1:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,pack);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 3:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,pack);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 4:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,pack);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 5:
				var doc = $e[2];
				var cur = Publish.extractPackages(doc.memberof,pack);
				Reflect.setField(cur,doc.name,doc.kind);
				break;
			case 6:
				var doc = $e[2];
				break;
			default:
				throw "Unknown doclet type: " + x.kind;
			}
		});
		var dest = env.opts.destination;
		Publish.ensureDirectory(dest);
		Publish.visitPackage(pack,".");
	};
}
Publish.visitPackage = function(pack,cwd) {
	var _g = 0, _g1 = Reflect.fields(pack);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
	}
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
Publish.ensureDirectory = function(path) {
	if(!require('fs').existsSync(path)) require('fs').mkdirSync(path);
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
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
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
