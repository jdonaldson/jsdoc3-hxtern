jsdoc3-hxtern
============


Jsdoc3-hxtern is a [Jsdoc](http://usejsdoc.org/) plugin that uses extended  [closure
compiler annotations](https://developers.google.com/closure/compiler/docs/js-for-compiler).
in order to generate [Haxe externs](http://haxe.org/doc/js/extern_libraries).

It's currently in an incomplete alpha state.


## Basic workflow

You use jsdoc3-hxtern with jsdoc as follows:

```bash
jsdoc -t /path/to/jsdoc3-hxtern some_js_library.js
```
The haxe externs will be written to a directory called "out" in the current
working directory.  See the documentation for [jsdoc command line
options](http://usejsdoc.org/about-commandline.html) for more details.

jsdoc3-hxtern works by plugging directly into jsdoc, extracting individual 
methods, variables, modules, and classes, and then expanding the type
information there using a special closure compiler-comaptible parser called
[doctrine](https://github.com/Constellation/doctrine).

After doclets are extracted and type information gathered from doctrine, there
are still several situations that require special handling.  
 
-  It's typical to have static methods attached to "modules" in javascript,
   rather than to a "class".  E.g. if there were a module of "foo.bar", it's
   common to attach a method to it:
   ```js
   foo.bar.baz = function(){...}
   ```
   In Haxe, this isn't possible.  Hxtern converts the last module into a
   "virtual" class, and attaches the method to that instead:

   ```haxe
   package foo;
   @:native("foo.bar")
   class Bar {
      public static function baz(){...}
   }
   ```
   If there's already a Bar class in the js file, then the process will fail.

-  Hxtern tries to convert js types and jsdoc tags to Haxe equivalents.
   Here's an (incomplete) list:
   ```
      boolean  -> Bool;
      string   -> String;
      Array    -> Array;
      number   -> Float;
      Object   -> Dynamic;
      Function -> Dynamic;
      void     -> Void;
   ```
   Further transformations are possible depending on type details... e.g. 
   Object<string, number> will get translated to Map<String,Float>.

## TODO

- handle @extends
- handle union types
- handle methods, variables, etc. that do not have documentation

