jsdoc3-hxtern
============

a jsdoc3 plugin for generating haxe externs

[Jsdoc](http://usejsdoc.org/) is a popular documentation generator for
javascript.  Google uses a special version of jsdoc for its [closure
compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler).
The extended documentation tags enable more specific typing information for
callback arguments, etc.



It's currently in an incomplete alpha state.


## Basic workflow
jsdoc3-hxtern works by plugging directly into jsdoc, extracting individual 
methods, variables, modules, and classes, and then expanding the type
information there using a special closure compiler-comaptible parser called
[doctrine](https://github.com/Constellation/doctrine).

After doclets are extracted and type information gathered from doctrine, there
are still several situations that require special handling.  
 
-  It's typical to have static methods attached to "modules" in javascript,
   rather than to a "class".   


## TODO

- handle @extends
- handle union types
- handle methods, variables, etc. that do not have documentation

