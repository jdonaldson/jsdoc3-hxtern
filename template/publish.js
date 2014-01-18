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
var HaxeType = { __ename__ : true, __constructs__ : ["HaxeFile","HaxeMember","HaxeFunction","HaxeClass","HaxeConstant","HaxeTypedef","HaxePackage","HaxeUnknown","NoOp"] }
HaxeType.HaxeFile = function(file,doc) { var $x = ["HaxeFile",0,file,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeMember = function(cls,name,doc) { var $x = ["HaxeMember",1,cls,name,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeFunction = function(cls,name,doc) { var $x = ["HaxeFunction",2,cls,name,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeClass = function(doc) { var $x = ["HaxeClass",3,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeConstant = function(doc) { var $x = ["HaxeConstant",4,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeTypedef = function(doc) { var $x = ["HaxeTypedef",5,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxePackage = function(doc) { var $x = ["HaxePackage",6,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeUnknown = function(doc) { var $x = ["HaxeUnknown",7,doc]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.NoOp = ["NoOp",8];
HaxeType.NoOp.toString = $estr;
HaxeType.NoOp.__enum__ = HaxeType;
var ClassType = { __ename__ : true, __constructs__ : ["Class","VirtualClass","ChildClass"] }
ClassType.Class = function(pack,name) { var $x = ["Class",0,pack,name]; $x.__enum__ = ClassType; $x.toString = $estr; return $x; }
ClassType.VirtualClass = function(pack,name) { var $x = ["VirtualClass",1,pack,name]; $x.__enum__ = ClassType; $x.toString = $estr; return $x; }
ClassType.ChildClass = function(pack,parent_name,name) { var $x = ["ChildClass",2,pack,parent_name,name]; $x.__enum__ = ClassType; $x.toString = $estr; return $x; }
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
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var IMap = function() { }
IMap.__name__ = true;
var Publish = function() { }
Publish.__name__ = true;
Publish.main = function() {
	var dest = env.opts.destination;
	var class_registry = new haxe.ds.StringMap();
	Publish.ensureDirectory(dest);
	exports.publish = function(taffy,opts,tutorial) {
		taffy.sort("longname, version, since");
		var haxe_types = taffy().map(function(x,y) {
			var type = (function($this) {
				var $r;
				var _g = DocletHelper.docletType(x);
				$r = (function($this) {
					var $r;
					var $e = (_g);
					switch( $e[1] ) {
					case 2:
						var doc = $e[2];
						$r = (function($this) {
							var $r;
							var name = doc.name;
							var cls = doc.memberof;
							if(ClassRegistry.uc(doc.name)) {
								cls = doc.memberof + "." + Std.string(doc.name);
								name = "new";
							}
							var cls_type = ClassRegistry.resolve(cls,name);
							$r = HaxeType.HaxeFunction(cls_type,name,doc);
							return $r;
						}($this));
						break;
					case 1:
						var doc = $e[2];
						$r = (function($this) {
							var $r;
							var cls_type = ClassRegistry.resolve(doc.memberof,doc.name);
							$r = HaxeType.HaxeMember(cls_type,doc.name,doc);
							return $r;
						}($this));
						break;
					case 7:
						$r = (function($this) {
							var $r;
							throw "Unknown doclet type: " + x.kind;
							$r = HaxeType.NoOp;
							return $r;
						}($this));
						break;
					default:
						$r = HaxeType.NoOp;
					}
					return $r;
				}($this));
				return $r;
			}(this));
			return type;
		});
		var _g = 0;
		while(_g < haxe_types.length) {
			var t = haxe_types[_g];
			++_g;
			var $e = (t);
			switch( $e[1] ) {
			case 1:
				var doc = $e[4], name = $e[3], cls = $e[2];
				Publish.ensureClassFile(cls,dest);
				break;
			case 2:
				var doc = $e[4], name = $e[3], cls = $e[2];
				Publish.ensureClassFile(cls,dest);
				break;
			default:
				null;
			}
		}
	};
}
Publish.classSig = function(cls,debug) {
	if(debug == null) debug = false;
	var arr = (function($this) {
		var $r;
		var $e = (cls);
		switch( $e[1] ) {
		case 0:
			var name = $e[3], pack = $e[2];
			$r = [pack,name];
			break;
		case 1:
			var name = $e[3], pack = $e[2];
			$r = debug?[pack,"#" + name + "#"]:[pack,name];
			break;
		case 2:
			var name = $e[4], parent_name = $e[3], pack = $e[2];
			$r = [pack,parent_name,name];
			break;
		}
		return $r;
	}(this));
	return arr.filter(function(x) {
		return x != "";
	}).join(".");
}
Publish.pack2file = function(arg) {
	return arg.split(".").join(require('path').sep) + ".hx";
}
Publish.pack2dir = function(arg) {
	return arg.split(".").join(require('path').sep);
}
Publish.ensureClassFile = function(cls,dest) {
	var $e = (cls);
	switch( $e[1] ) {
	case 0:
		var name = $e[3], pack = $e[2];
		Publish.ensureDirectory(dest + require('path').sep + Publish.pack2dir(pack + "." + name));
		break;
	case 1:
		var name = $e[3], pack = $e[2];
		Publish.ensureDirectory(dest + require('path').sep + Publish.pack2dir(pack + "." + name));
		break;
	case 2:
		var name = $e[4], parent_name = $e[3], pack = $e[2];
		Publish.ensureDirectory(dest + require('path').sep + Publish.pack2dir(pack + "." + name));
		break;
	}
}
Publish.ensureDirectory = function(path) {
	if(!require('fs').existsSync(path)) {
		var dirs = path.split(require('path').sep);
		var current = "";
		var _g = 0;
		while(_g < dirs.length) {
			var d = dirs[_g];
			++_g;
			current += d + require('path').sep;
			if(!require('fs').existsSync(current)) require('fs').mkdirSync(current);
		}
	}
}
var ClassRegistry = function() { }
ClassRegistry.__name__ = true;
ClassRegistry.resolve = function(packAndClass,name) {
	if(ClassRegistry.registry == null) ClassRegistry.registry = new haxe.ds.StringMap();
	var arg_class = ClassRegistry.hxClass(packAndClass);
	if(ClassRegistry.registry.exists(packAndClass)) {
		var reg_class = ClassRegistry.registry.get(packAndClass);
		var reg_type = reg_class[0];
		var arg_type = arg_class[0];
		if(reg_type != arg_type) throw "field " + name + " has a problem:  mismatch in " + packAndClass + " between " + reg_type + " and " + arg_type;
	} else ClassRegistry.registry.set(packAndClass,arg_class);
	return arg_class;
}
ClassRegistry.hxClass = function(packAndClass) {
	if(packAndClass == null) return null;
	var packs = packAndClass.split(".");
	var cls = packs.pop();
	if(ClassRegistry.lc(cls)) {
		var uc_cls = ClassRegistry.titleCase(cls);
		var fullname = packs.join(".") + "." + uc_cls;
		return ClassType.VirtualClass(packs.join("."),uc_cls);
	} else if(ClassRegistry.uc(packs[packs.length - 1])) {
		var parent_cls = packs.pop();
		return ClassType.ChildClass(packs.join("."),parent_cls,cls);
	} else if(packs.length > 2 && ClassRegistry.uc(packs[packs.length - 2])) throw "Error: " + cls + " has invalid class signature for " + packAndClass + ": too many title case objects to convert to classes"; else return ClassType.Class(packs.join("."),cls);
}
ClassRegistry.lc = function(arg) {
	return new EReg("^[a-z]","").match(arg);
}
ClassRegistry.uc = function(arg) {
	return new EReg("^[A-Z]","").match(arg);
}
ClassRegistry.titleCase = function(arg) {
	return arg.charAt(0).toUpperCase() + arg.substring(1);
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var TaffyHelper = function() { }
TaffyHelper.__name__ = true;
TaffyHelper.retrieve = function(taffy) {
	return taffy();
}
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
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
