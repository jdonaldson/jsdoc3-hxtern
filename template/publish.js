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
var HaxeType = { __ename__ : true, __constructs__ : ["HaxeConstructor","HaxeInstanceField","HaxeStaticField","HaxeInstanceMethod","HaxeStaticMethod","NoOp"] }
HaxeType.HaxeConstructor = function(args) { var $x = ["HaxeConstructor",0,args]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeInstanceField = function(args) { var $x = ["HaxeInstanceField",1,args]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeStaticField = function(args) { var $x = ["HaxeStaticField",2,args]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeInstanceMethod = function(args) { var $x = ["HaxeInstanceMethod",3,args]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.HaxeStaticMethod = function(args) { var $x = ["HaxeStaticMethod",4,args]; $x.__enum__ = HaxeType; $x.toString = $estr; return $x; }
HaxeType.NoOp = ["NoOp",5];
HaxeType.NoOp.toString = $estr;
HaxeType.NoOp.__enum__ = HaxeType;
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
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IMap = function() { }
IMap.__name__ = true;
var Publish = function() { }
Publish.__name__ = true;
Publish.main = function() {
	Publish.pack_obj = { packs : new haxe.ds.StringMap(), classes : new haxe.ds.StringMap()};
	var dest = env.opts.destination;
	exports.publish = function(taffy,opts,tutorial) {
		taffy.sort("longname, version, since");
		var haxetypes = taffy().map(function(x,y) {
			var _g = DocletHelper.docletType(x);
			var $e = (_g);
			switch( $e[1] ) {
			case 2:
				var doc = $e[2];
				console.log(require('doctrine').parse(doc.comment,{ unwrap : true}));
				console.log("-----");
				if(Publish.uc(doc.name)) {
					var cls_pack = doc.memberof + "." + Std.string(doc.name);
					var sig = "" + doc.comment + "\npublic function new();";
					var clazz = Publish.makeClazz(cls_pack);
					clazz.fields.push(sig);
					return HaxeType.HaxeConstructor({ clazz : clazz, doc : doc});
				} else {
					var clazz = Publish.makeClazz(doc.memberof);
					var args = { name : doc.name, clazz : clazz, doc : doc};
					switch(doc.scope) {
					case "instance":
						return HaxeType.HaxeInstanceMethod(args);
					case "static":
						return HaxeType.HaxeStaticMethod(args);
					}
				}
				break;
			case 1:
				var doc = $e[2];
				break;
			case 7:
				throw "Unknown doclet type: " + x.kind;
				break;
			default:
				null;
			}
			return HaxeType.NoOp;
		});
		Publish.ensureDirectory(dest);
		Publish.render(Publish.pack_obj,dest);
	};
}
Publish.render = function(pack,cwd) {
	Publish.ensureDirectory(cwd);
	var $it0 = pack.classes.keys();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		var clazz = pack.classes.get(c);
		var file = cwd + require('path').sep + clazz.name + ".hx";
	}
	var $it1 = pack.packs.keys();
	while( $it1.hasNext() ) {
		var p = $it1.next();
		var next_pack = pack.packs.get(p);
		var next_dir = cwd + require('path').sep + p;
		Publish.render(next_pack,next_dir);
	}
}
Publish.parseSignature = function(arg) {
	var reg = new EReg("@.*","");
	var params = arg.split("\n").filter(function(x) {
		return reg.match(x);
	}).map(function(x) {
		return new EReg("^[^@]*","").replace(x,"");
	}).join("\n");
	console.log(params);
}
Publish.extractPacks = function(pack) {
	var packs = pack.split(".");
	var cur_obj = Publish.pack_obj;
	var _g = 0;
	while(_g < packs.length) {
		var p = packs[_g];
		++_g;
		if(cur_obj.packs.exists(p)) cur_obj = cur_obj.packs.get(p); else {
			var new_pack = { packs : new haxe.ds.StringMap(), classes : new haxe.ds.StringMap()};
			cur_obj.packs.set(p,new_pack);
			cur_obj = new_pack;
		}
	}
	return cur_obj;
}
Publish.makeClazz = function(memberof) {
	var packs = memberof.split(".");
	var cls = packs.pop();
	var pack = packs.join(".");
	var clazz = Publish.lc(cls)?{ name : Publish.titleCase(cls), pack : Publish.extractPacks(packs.join(".")), 'native' : memberof, fields : []}:{ name : cls, pack : Publish.extractPacks(packs.join(".")), fields : []};
	var cur_clazzes = clazz.pack.classes;
	if(cur_clazzes.exists(clazz.name)) {
		var cur_clazz = cur_clazzes.get(clazz.name);
		if(cur_clazz["native"] != clazz["native"]) throw "Two different definitions for ${clazz.name} : $clazz and $cur_clazz";
	} else cur_clazzes.set(clazz.name,clazz);
	return clazz;
}
Publish.lc = function(arg) {
	return new EReg("^[a-z]","").match(arg);
}
Publish.uc = function(arg) {
	return new EReg("^[A-Z]","").match(arg);
}
Publish.titleCase = function(arg) {
	return arg.charAt(0).toUpperCase() + arg.substring(1);
}
Publish.pack2file = function(arg) {
	return arg.split(".").join(require('path').sep) + ".hx";
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
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
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
