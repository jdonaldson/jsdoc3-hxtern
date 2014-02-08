jsdoc3-hxtern
============


Jsdoc3-hxtern is a [Jsdoc](http://usejsdoc.org/) plugin that uses extended
[closure compiler
annotations](https://developers.google.com/closure/compiler/docs/js-for-compiler)
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
 
1.  It's typical to have static methods attached to "modules" in javascript,
   rather than to a "class".  E.g. if there were a module of "foo.bar", it's
   you might see a method defined like this:
   ```js
   foo.bar.baz = function(){...}
   ```
   In Haxe, this isn't possible.  Haxe requires that you define methods only on 
   classes.  And classes must be upper case.  To work around this problem, 
   Hxtern converts the last module into an "alias" class, and attaches the 
   method to that instead:

   ```haxe
   package foo;
   @:native("foo.bar")
   class Bar {
      public static function baz(){...}
   }
   ```
   The upper class alias can coexist along side the lower class module with no
   problems.  however, If there's already an *additional* Bar class in the js 
   file, then the process will fail.

2.  Hxtern tries to convert js types and jsdoc tags to Haxe equivalents.
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

3. Hxtern will change the name of callback arguments to avoid using haxe
  keywords.  It will prepend a '\_' character to arguments named "callback".

4. Haxe does not have a traditional ellipses operator for arguments (e.g. a 
  function that accepts an arbitrary number of arguments.  When Hxtern
  encounters one of these it will generate 6 optional arguments in its place.

## TODO

- handle @extends
- handle union types
- handle methods, variables, etc. that do not have documentation

