# NAME

Introduction - Introduction to JSX

# ABSTRACT

This document introduces JSX and describes why JSX is created and why you use it.

# DESCRIPTION

JSX is a statically-typed, object-oriented programming language compiling to JavaScript. The reason why JSX is created is our needs for a more robust programming language than JavaScript.

## Static Types

JSX is a statically-typed language. All the values and variables have a static type and you can only assign a correct-typed value to the variable. In addition, all the functions including member functions have a type which is decided by the type of parameters and a return value, where you cannot call a function with wrong-typed arguments.

This is useful especially in middle- to large-scaled software development to which a number of engineers may get engaged, because certain types of runtime problems, for example a typo in a function name, are detected at compile time.

## Class-Based Language

JavaScript has _class_ and _interface_ as a unit of data and procedures.

## Performance

One of the most important reasons why JSX is developed is to boost JavaScript performance. JavaScript itself is not so slow but large-scale development is tend to have many abstraction layers, e.g. accessor methods instead of direct access to properties, and they often hit performance.

# SEE ALSO

[Standard ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm)

