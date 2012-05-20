===============================
Browser Application
===============================


Development
===============================

.. warning::

    This document is under construction and JSX doesn't suport full browser binding yet.


TODO

* compiling
* web interface
* script loader
* debugging with source map

Browser Binding
===============================

The ``dom`` class provied by ``js/dom.jsx`` is a low-level interface to the browser platform API.
Here is an example to display a message box. ::

    import "js/dom.jsx";

    class _Main {
        static function main(args : string[]) : void {
            dom.window.alert("Hello, JSX!");
        }
    }

``dom.window`` is the current Window object and you can call its method in the same way as JavaScript.

.. note::

    Unlike JavaScript, there are no global variable in JSX, so you have to refer ``alert`` in the fully-qualified name, i.e. ``dom.window.alert``.

There is another example which sets a tick function in 60 FPS. ::

    class _Main {
        static tick() : void {
            /*
             * do something here
             */

            dom.window.setTimeout(_Main.tick, (1000 / 60) as int);
        }

        static function main(args : string[]) : void {
            _Main.tick();
        }
    }




