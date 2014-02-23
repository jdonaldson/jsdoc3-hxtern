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
var DoctrineHelper = function() { }
DoctrineHelper.__name__ = true;
DoctrineHelper.chooseType = function(type) {
	switch(type.type) {
	case "AllLiteral":
		return DoctrineType.AllLiteral(type);
	case "FieldType":
		return DoctrineType.FieldType(type);
	case "FunctionType":
		return DoctrineType.FunctionType(type);
	case "NameExpression":
		return DoctrineType.NameExpression(type);
	case "NonNullableType":
		return DoctrineType.NonNullableType(type);
	case "NullLiteral":
		return DoctrineType.NullLiteral(type);
	case "NullableLiteral":
		return DoctrineType.NullableLiteral(type);
	case "NullableType":
		return DoctrineType.NullableType(type);
	case "OptionalType":
		return DoctrineType.OptionalType(type);
	case "RecordType":
		return DoctrineType.RecordType(type);
	case "TypeApplication":
		return DoctrineType.TypeApplication(type);
	case "UndefinedLiteral":
		return DoctrineType.UndefinedLiteral(type);
	case "UnionType":
		return DoctrineType.UnionType(type);
	case "VoidLiteral":
		return DoctrineType.VoidLiteral(type);
	case "RestType":
		return DoctrineType.RestType(type);
	case "ArrayType":
		return DoctrineType.ArrayType(type);
	default:
		throw "error! " + Std.string(type) + " is an unknown doctrine type.";
	}
}
var DoctrineType = { __ename__ : true, __constructs__ : ["ArrayType","AllLiteral","FieldType","FunctionType","NameExpression","NonNullableType","NullLiteral","NullableLiteral","NullableType","OptionalType","RecordType","TypeApplication","UndefinedLiteral","UnionType","Unknown","VoidLiteral","RestType"] }
DoctrineType.ArrayType = function(type) { var $x = ["ArrayType",0,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.AllLiteral = function(type) { var $x = ["AllLiteral",1,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.FieldType = function(type) { var $x = ["FieldType",2,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.FunctionType = function(type) { var $x = ["FunctionType",3,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.NameExpression = function(type) { var $x = ["NameExpression",4,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.NonNullableType = function(type) { var $x = ["NonNullableType",5,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.NullLiteral = function(type) { var $x = ["NullLiteral",6,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.NullableLiteral = function(type) { var $x = ["NullableLiteral",7,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.NullableType = function(type) { var $x = ["NullableType",8,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.OptionalType = function(type) { var $x = ["OptionalType",9,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.RecordType = function(type) { var $x = ["RecordType",10,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.TypeApplication = function(type) { var $x = ["TypeApplication",11,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.UndefinedLiteral = function(type) { var $x = ["UndefinedLiteral",12,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.UnionType = function(type) { var $x = ["UnionType",13,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.Unknown = function(type) { var $x = ["Unknown",14,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.VoidLiteral = function(type) { var $x = ["VoidLiteral",15,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
DoctrineType.RestType = function(type) { var $x = ["RestType",16,type]; $x.__enum__ = DoctrineType; $x.toString = $estr; return $x; }
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
Publish.publish = function(taffy,opts,tutorial) {
	taffy.sort("longname, version, since");
	var taffy_items = taffy();
	taffy_items.each(function(x,y) {
		var comment = "";
		if(x.description != null) comment = Publish.fixDescription(x.description);
		var _g = DocletHelper.docletType(x);
		var $e = (_g);
		switch( $e[1] ) {
		case 2:
			var doc = $e[2];
			var p = require('doctrine').parse(x.comment,{ unwrap : true});
			var params = [];
			var ret = "Void";
			var is_constructor = false;
			var _g1 = 0, _g2 = p.tags;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				if(t.title == "constructor" || t.title == "interface") is_constructor = true; else if(t.title == "param") {
					var _g3 = DoctrineHelper.chooseType(t.type);
					var $e = (_g3);
					switch( $e[1] ) {
					case 16:
						var type = $e[2];
						var _g4 = 0;
						while(_g4 < 6) {
							var i = _g4++;
							params.push("?_opt" + i + ": " + Publish.renderType(type.expression));
						}
						break;
					default:
						var optional = "";
						if(Publish.isOptional(t.type)) optional = "?";
						params.push("" + optional + Publish.keywordDodge(t.name) + ": " + Publish.renderType(t.type));
					}
				} else if(t.title == "return") ret = Publish.renderType(t.type);
			}
			if(!is_constructor) {
				if(doc.memberof == null) doc.memberof = Publish.global_alias + ".Global"; else if(doc.memberof == "Window") doc.memberof = Publish.global_alias + ".Window";
			}
			var param_list = params.join(", ");
			if(is_constructor) {
				var cls_pack = Publish.classModule(doc.memberof,null,doc.name);
				var sig = "\tpublic function new(" + param_list + ");";
				var clazz = Publish.makeClazz(cls_pack,doc);
				clazz.fields.push(sig);
			} else {
				var clazz = Publish.makeClazz(doc.memberof,doc);
				var args = { name : doc.name, clazz : clazz, doc : doc, signature : ""};
				switch(doc.scope) {
				case "instance":
					var sig = "\tpublic function " + Std.string(doc.name) + "(" + param_list + "): " + ret + " {}";
					clazz.fields.push(sig);
					break;
				case "static":case "global":
					var sig = "\tpublic static function " + Std.string(doc.name) + "(" + param_list + "): " + ret + " {}";
					clazz.fields.push(sig);
					break;
				}
			}
			break;
		case 1:
			var doc = $e[2];
			if(doc.memberof == null) {
				console.log("INFO: " + Std.string(doc.name) + " is a member with no \"memberof\" field.  This can happen if it is meant to be a module.  Ignoring it for now");
				return;
			}
			var p = require('doctrine').parse(x.comment,{ unwrap : true});
			var clazz = Publish.makeClazz(doc.memberof,doc);
			var args = { name : doc.name, clazz : clazz, doc : doc, signature : ""};
			var type = "Dynamic";
			var _g1 = 0, _g2 = p.tags;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				if(t.title == "type") type = Publish.renderType(t.type);
			}
			switch(doc.scope) {
			case "instance":
				var sig = "" + comment + "\tpublic var " + Std.string(doc.name) + ": " + type + ";";
				clazz.fields.push(sig);
				break;
			case "static":case "global":
				var sig = "" + comment + "\tpublic static var " + Std.string(doc.name) + ": " + type + ";";
				clazz.fields.push(sig);
				break;
			}
			break;
		case 3:
			var doc = $e[2];
			var name = doc.name;
			if(doc.memberof != null && doc.memberof.length > 0) name = doc.memberof + "." + name;
			var p = require('doctrine').parse(x.comment,{ unwrap : true});
			var is_constructor = false;
			var params = [];
			var ret = "Void";
			var isprivate = false;
			var _g1 = 0, _g2 = p.tags;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				switch(t.title) {
				case "private":
					isprivate = true;
					break;
				case "constructor":case "interface":
					is_constructor = true;
					break;
				case "param":
					var optional = "";
					if(Publish.isOptional(t.type)) optional = "?";
					params.push("" + optional + Publish.keywordDodge(t.name) + ": " + Publish.renderType(t.type));
					break;
				case "return":
					ret = Publish.renderType(t.type);
					break;
				}
			}
			var clazz = Publish.makeClazz(name,doc);
			var param_list = params.join(", ");
			var private_status = isprivate?"private":"public";
			clazz.comment = "" + Std.string(x.name) + " : generated by hxtern";
			if(x.description != null) clazz.comment += "\n" + x.description;
			if(is_constructor) {
				var cls_pack = Publish.classModule(doc.memberof,null,doc.name);
				var sig = "\t" + private_status + " function new(" + param_list + ");";
				var clazz1 = Publish.makeClazz(cls_pack,doc);
				clazz1.fields.push(sig);
			}
			break;
		case 5:
			var doc = $e[2];
			var name = doc.name;
			if(doc.memberof != null && doc.memberof.length > 0) name = doc.memberof + "." + name;
			var p = require('doctrine').parse(x.comment,{ unwrap : true});
			var td = "";
			var _g1 = 0, _g2 = p.tags;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				if(t.title == "typedef") td = Publish.renderType(t.type);
			}
			if(td == "") td = "{}";
			var clazz = Publish.makeClazz(name,doc,true);
			clazz.fields = [td];
			break;
		case 7:
			throw "Unknown doclet type: " + x.kind;
			break;
		default:
			null;
		}
	});
	Publish.ensureDirectory(Publish.dest);
	Publish.render(Publish.pack_obj,Publish.dest);
}
Publish.main = function() {
	Publish.class_list = [];
	Publish.pack_obj = { name : "", packs : new haxe.ds.StringMap(), classes : new haxe.ds.StringMap()};
	Publish.dest = env.opts.destination;
	var query = env.opts.query;
	if(query == null || query.global == null) throw "Must pass query parameter of global=<packname> for global class alias";
	Publish.global_alias = query.global;
	exports.publish = Publish.publish;
}
Publish.isOptional = function(type) {
	var _g = DoctrineHelper.chooseType(type);
	var $e = (_g);
	switch( $e[1] ) {
	case 9:
		var doc = $e[2];
		return true;
	default:
		return false;
	}
}
Publish.isRestArgument = function(arg) {
	var _g = DoctrineHelper.chooseType(arg);
	var $e = (_g);
	switch( $e[1] ) {
	case 16:
		var doc = $e[2];
		return true;
	default:
		return false;
	}
}
Publish.keywordDodge = function(arg) {
	switch(arg) {
	case "callback":
		return "_callback";
	default:
		return arg;
	}
}
Publish.renderType = function(type) {
	var _g = DoctrineHelper.chooseType(type);
	var $e = (_g);
	switch( $e[1] ) {
	case 3:
		var type1 = $e[2];
		var params = ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0, _g3 = type1.params;
				while(_g2 < _g3.length) {
					var t = _g3[_g2];
					++_g2;
					_g1.push(Publish.renderType(t));
				}
			}
			$r = _g1;
			return $r;
		}(this))).join("->");
		var result = "Void";
		if(type1.result != null) result = Publish.renderType(type1.result);
		if(params == "") params = "Void";
		return "" + params + "->" + result;
	case 9:
		var type1 = $e[2];
		return Publish.renderType(type1.expression);
	case 5:
		var type1 = $e[2];
		return Publish.renderType(type1.expression);
	case 8:
		var type1 = $e[2];
		return Publish.renderType(type1.expression);
	case 10:
		var type1 = $e[2];
		var fields = ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0, _g3 = type1.fields;
				while(_g2 < _g3.length) {
					var f = _g3[_g2];
					++_g2;
					_g1.push(Publish.renderType(f));
				}
			}
			$r = _g1;
			return $r;
		}(this))).join(", ");
		var res = "{" + fields + "}";
		return res;
	case 2:
		var type1 = $e[2];
		var value = Publish.renderType(type1.value);
		return "" + type1.key + ": " + value;
	case 12:
		var type1 = $e[2];
		return "Null<Dynamic>";
	case 4:
		var type1 = $e[2];
		return Publish.nameExpressionType(type1.name);
	case 15:
		var type1 = $e[2];
		return "Void";
	case 1:
		var type1 = $e[2];
		return "Dynamic";
	case 13:
		var type1 = $e[2];
		var types = ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0, _g3 = type1.elements;
				while(_g2 < _g3.length) {
					var e = _g3[_g2];
					++_g2;
					_g1.push(Publish.renderType(e));
				}
			}
			$r = _g1;
			return $r;
		}(this))).join(",");
		var count = type1.elements.length;
		if(count == 0) throw "No types in uniontype for $type"; else if(count == 1) return Publish.renderType(type1.elements[0]); else if(count > 6) throw "Too many types in union type $type"; else return "hxtern.Any.Any" + count + "<" + types + ">";
		break;
	case 7:
		var type1 = $e[2];
		return "Dynamic";
	case 11:
		var type1 = $e[2];
		var container = Publish.renderType(type1.expression);
		if(container == "Dynamic" && type1.applications.length == 2) {
			var type11 = Publish.renderType(type1.applications[0]);
			switch(type11) {
			case "String":case "Dynamic":
				type1.applications.shift();
				break;
			}
		}
		if(container == "Dynamic" && type1.applications.length != 1) {
			console.log("Too many parameters for " + Std.string(type1) + ".  Using \"Dynamic\"\n");
			return "Dynamic";
		}
		var params = ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0, _g3 = type1.applications;
				while(_g2 < _g3.length) {
					var a = _g3[_g2];
					++_g2;
					_g1.push(Publish.renderType(a));
				}
			}
			$r = _g1;
			return $r;
		}(this))).join(", ");
		return "" + container + "<" + params + ">";
	case 0:
		var type1 = $e[2];
		if(type1.elements.length > 1) {
			console.log("Too many array type elements in " + Std.string(type1));
			return "Dynamic";
		} else {
			var firstType = Publish.renderType(type1.elements[0]);
			return "Array<" + firstType + ">";
		}
		break;
	case 16:
		var type1 = $e[2];
		var resttype = Publish.renderType(type1.expression);
		return ((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g2 = 0;
				while(_g2 < 6) {
					var i = _g2++;
					_g1.push("?" + resttype);
				}
			}
			$r = _g1;
			return $r;
		}(this))).join("->");
	default:
		throw "unknown type in renderType: " + Std.string(type);
	}
	return "";
}
Publish.nameExpressionType = function(expression) {
	switch(expression) {
	case "boolean":
		return "Bool";
	case "string":
		return "String";
	case "Array":
		return "Array";
	case "number":
		return "Float";
	case "Object":
		return "Dynamic";
	case "Function":
		return "Dynamic";
	case "void":
		return "Void";
	default:
		return Publish.fixType(expression);
	}
}
Publish.fixType = function(signature) {
	var parts = signature.split(".");
	var fixed = [];
	var name = Publish.titleCase(parts.pop());
	switch(name) {
	case "Element":
		return "js.html.Element";
	}
	var pack = [];
	while(parts.length > 0 && Publish.lc(parts[0])) pack.push(parts.shift());
	var pname = "";
	if(parts.length > 0) pname = parts[0];
	return Publish.classModule(pack.join("."),pname,name);
}
Publish.render = function(pack,cwd) {
	Publish.ensureDirectory(cwd);
	var $it0 = pack.classes.keys();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		var clazz = pack.classes.get(c);
		var clazz_name = clazz.name;
		var package_line = "package " + pack.name + ";";
		var $native = "";
		if(clazz["native"] != clazz.signature) $native = "@:native(\"" + clazz["native"] + "\")";
		if(clazz.pname != null) {
			clazz_name = clazz.pname;
			package_line = "";
		} else {
			var name = pack.name == ""?c:pack.name + "." + c;
			Publish.class_list.push(name);
		}
		if(clazz.pname != null) package_line = "";
		var file = cwd + require('path').sep + clazz_name + ".hx";
		clazz.fields = clazz.fields.filter(function(x) {
			return x != null;
		});
		var content = clazz.fields.join("\n\n");
		if(clazz.comment == null) clazz.comment = "  " + clazz.name + " : generated by hxtern";
		if(clazz.type == "class") content = "/**\n" + clazz.comment + "\n*/\n" + package_line + "\n" + $native + "\nextern class " + clazz.name + "{\n" + content + "\n}\n"; else content = "/**\n" + clazz.comment + "\n*/\n" + package_line + "\n" + $native + "\nextern typedef " + clazz.name + " = " + content + "\n\n";
		require('fs').appendFileSync(file,content);
	}
	var $it1 = pack.packs.keys();
	while( $it1.hasNext() ) {
		var p = $it1.next();
		var next_pack = pack.packs.get(p);
		var next_dir = cwd + require('path').sep + p;
		Publish.render(next_pack,next_dir);
	}
}
Publish.extractPacks = function(pack) {
	var packs = pack.split(".");
	var cur_obj = Publish.pack_obj;
	var cur_name = "";
	var _g = 0;
	while(_g < packs.length) {
		var p = packs[_g];
		++_g;
		if(cur_name == "") cur_name = p; else cur_name = [cur_name,p].join(".");
		if(cur_obj.packs.exists(p)) cur_obj = cur_obj.packs.get(p); else {
			var new_pack = { name : cur_name, packs : new haxe.ds.StringMap(), classes : new haxe.ds.StringMap()};
			cur_obj.packs.set(p,new_pack);
			cur_obj = new_pack;
		}
	}
	return cur_obj;
}
Publish.makeClazz = function(memberof,doclet,is_typedef,is_private) {
	if(is_private == null) is_private = false;
	if(is_typedef == null) is_typedef = false;
	if(memberof == null) {
		console.log(doclet);
		throw "missing memberof for makeClazz";
	}
	var packs = memberof.split(".");
	var cls = packs.pop();
	var pname = null;
	if(packs.length > 0) {
		var pcls = packs.pop();
		if(Publish.uc(pcls)) while(Publish.uc(pcls)) {
			pname = pcls;
			pcls = packs.pop();
		} else packs.push(pcls);
	}
	var pack = Publish.extractPacks(packs.join("."));
	var type = is_typedef?"typedef":"class";
	var name = Publish.titleCase(cls);
	var signature = Publish.classModule(pack.name,pname,name);
	var clazz = { name : name, type : type, pack : pack, pname : pname, is_private : is_private, 'native' : memberof, signature : signature, fields : []};
	var cur_clazzes = clazz.pack.classes;
	var full_name = pack.name == null || pack.name == ""?clazz.name:pack.name + "." + clazz.name;
	if(cur_clazzes.exists(full_name)) {
		var cur_clazz = cur_clazzes.get(full_name);
		if(cur_clazz["native"] != clazz["native"]) throw "Two different definitions for " + clazz.name + " : " + Std.string(clazz) + " and " + Std.string(cur_clazz);
		clazz = cur_clazz;
	} else cur_clazzes.set(full_name,clazz);
	return clazz;
}
Publish.classModule = function(pack,parent,name) {
	return [pack,parent,name].filter(function(x) {
		return x != null && x != "";
	}).join(".");
}
Publish.lc = function(arg) {
	return new EReg("^[a-z]","").match(arg);
}
Publish.uc = function(arg) {
	return new EReg("^[A-Z]","").match(arg);
}
Publish.fixDescription = function(description) {
	var fixed_description = description.split("\n").join("\n\t  ");
	return "\t/**\n\t  " + fixed_description + "\n\t */\n";
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
