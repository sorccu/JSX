========================================
Introduction
========================================

Overview
========================================

JSX is a statically-typed, object-oriented programming language compiling to standalone JavaScript. The reason why JSX is developed is our needs for a more robust programming language than JavaScript. However, JSX is fairly close to JavaScript especially in its statements and expressions.

Statically-typed programming language is robust because certain sort of problems, for example typos in function and property names, are detected at compile-time. This is important especially in middle- to large-scaled software development to which a number of engineers may get engaged.

Therefore, JSX is designed as a statically-typed language. All the values and variables have a static type and you can only assign a correct-typed value to the variable. In addition, all the functions including closures have a type which is determined by the types of parameters and the return value, where you cannot call a function with wrong-typed arguments.

Also, other important reason why JSX is developed is to boost JavaScript performance. JavaScript itself is not so slow but large-scaled development is tend to have many abstraction layers, e.g. proxy classes and accessor methods, which often hit performance. JSX boosts performance by *inline expansion*: function bodies are expanded where the function is called if the function call can be determined at compile-time. This is the power of static typed language in performance.

Run "Hello, world!"
========================================

There's ``jsx`` command in the SDK, which is the JSX compiler.

You can start JSX with a usual program. Type as follows in the JSX distribution and/or repository and you will see it says "Hello, world!". ::

    jsx$ bin/jsx --run example/hello.jsx

Class Structure
========================================

Here is the simplest "Hello, world" program. You can see several features of JSX in this program, namely, static types and class structure. ::

    // hello.jsx
    // usage: jsx --run hello.jsx
    class _Main {

        static function main(args :string[]) :void {

            log "Hello, world!";

        }
    }

Class ``_Main`` has a static member function (a.k.a. a class method) named ``main``, which takes an array of strings and returns nothing. ``Main._main(:string[]):void`` is an entry point of JSX applications, which is called when a user invokes an application. JSX, like Java, doesn't allow top-level statements which most scripting languages do.

``log`` statement is mapped to ``console.log()`` in JavaScript, which displays the argument to stdout with a newline.

Here is another typical library class, ``Point``: ::

    class Point {
        var x = 0;
        var y = 0;

        // without arguments
        function constructor() {
        }

        // with arguments
        function constructor(x :number, y :number) {
            this.x = x;
            this.y = y;
        }
    }

As you can see, member variables of Point, ``var x`` and ``var y``, are declared without types, but they are actually typed as ``number`` by deducing types with initial values.

You might be surprised at multiple definition of constructors: one takes no parameters and the other takes two parameters. They are overloaded by their signatures (types of parameters). When you construct the class with ``new Point()``, the first constructor, which takes no parameters, is called. The second with two parameters will be called on ``new Point(2, 3)``. Other forms of construction, e.g. ``new Point(42)`` or ``new Pint("foo", "bar")`` will cause compilation errors of mismatching signatures.

Static Types
========================================

There are primitive types, object types, variant type, MayBeUndefined types in JSX. They are static types which appear only at compile time.

Primitive types, e.g. ``string``, ``boolean`` or ``number``,  are non-nullable, immutable types. ::

    var s : string = "hello";
    var n : number = 42;
    var b : boolean = true;

Object types, e.g. ``string[]`` (array of string) or ``Date``, are nullable, mutable types. ::

    var d : Date = new Date(); // Date
    var f : function():void = function() : void { log "Hi!"; };
    var a : string[] = ["foo"]; // the same as Array.<string>

Variant type has no static type info and you have to cast it to another type to use it. Some JavaScript libraries may return a variant value, which type is not determined statically.

MayBeUndefined type is a meta type which indicates a value may be undefined. For example, the return type of ``Array.<string>#shift()`` is ``MayBeUndefined.<string>``. When you use a MayBeUndefined value, you have to make sure of the value is not undefined. ::

    function f(args : string[]) : void {
        assert args.length > 0; // make sure args.shift() returns a value
        var value = args.shift() as string;
    }

.. note::

    Static types exist only at compile time. That is, run-time representation of a value has no information about its static type. For example, the run-time representation of ``var a : MayBeUndefined.<number> = 10`` is the same as ``var b : number = 10``.

Modules
========================================

JSX has module system. You can reuse JSX class libraries by the ``import`` statement. For example, the following program uses "timer.jsx" module, which exports a class ``Timer``. ::

    // print-after-one-sec.jsx
    // usage: jsx --run
    import "timer.jsx";

    class _Main {

        static function main(args : string[]) : void {
            Timer.setTimeout(function() : void {
                log "Hello, world!";
            }, 1000);
        }

    }

A module may export multiple classes, but you can specify what modules you import or name a namespace which the module is imported into.


