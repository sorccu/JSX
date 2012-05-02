# NAME

Introduction - Introduction to JSX

# ABSTRACT

This document introduces JSX and describes why JSX is created and why you use it, targetting those who already know JavaScript.

# DESCRIPTION

## Overview

JSX is a statically-typed, object-oriented programming language compiling to JavaScript. The reason why JSX is created is our needs for a more robust programming language than JavaScript.

Statically-typed programming language is important especially in middle- to large-scaled software development to which a number of engineers may get engaged, because certain sort of runtime problems, for example a typo in a function name, are detected at compile time.

Therefore, JSX is a statically-typed language. All the values and variables have a static type and you can only assign a correct-typed value to the variable. In addition, all the functions including member functions have a type which is determined by the types of parameters and the return value, where you cannot call a function with wrong-typed arguments.

Also, One of the most important reasons why JSX is developed is to boost JavaScript performance. JavaScript itself is not so slow but large-scale development is tend to have many abstraction layers, e.g. proxy classes and accessor methods, and then they often hit performance.

JSX boosts performance by inlining functions. When a function is called, it can be resolved at compile time, inlining the body of the function unless it is called polymophicly. This is the power of static typed language.

## Basic Structure

Here is the simplest "hello, world" program. You can see several features of JSX, namely, static types and class structure.

    class Hello {

        static function main(args :string[]) :void {

            log "Hello, world!";

        }
    }

Class `Hello` has a static function (a.k.a. a class method) named `main`,

`log` statement is the same as `console.log()` in JavaScript,
which displays the argument to stdout with a newline.

Here is another typicall class, `Point`:

    class Point {
        var x = 0;
        var y = 0;

        function initialize() {}

        function initialize(x :number, y :number) {
            this.x = x;
            this.y = y;
        }
    }

As you can see, member variables, `var x` and `var y`, are declared without
types, but they are actually typed as `number` by deducing types with initial values.

You might be suprized at multiple definition of constructors; one takes no parameters and the other takes two parameters. They are overloaded by their signatures (types of parameters). When you construct the class with `new Point()`, the first constructor, which takes no parameters, is called. The second with two parameters will be called on `new Point(2, 3)`. Other forms of construction, e.g. `new Point(42)` or `new Pint("foo", "bar")` will cause compilation errors of mismatching signatures.

## Types

## Expressions

## Statements

## Classes

## Modules

# SEE ALSO

[Standard ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm)

