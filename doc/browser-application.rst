===============================
Browser Application
===============================

DESCRIPTION
===============================

There are browser API as a standard library.

Development
-------------------------------

TODO

* compiling
* web interface
* script loader
* debugging source map

DOM API
-------------------------------

The ``dom`` class provied by ``js/dom.jsx`` is a low-level interface to the browser platform API.
Here is an example to display a message box.::

    import "js/dom.jsx";

    class _Main {
        static function main(args : string[]) : void {
            dom.window.alert("Hello, JSX!");
        }
    }

``dom.window`` is the current Window object and you can call its method in the same way as JavaScript.

.. note::

    Unlike JavaScript, JSX has no global variable so you have to refer ``alert`` in the fully-qualified name, i.e. ``dom.window.alert``.

There is another example which sets a tick function in 60 FPS.::

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

SEE ALSO
===============================

* http://www.w3.org/TR/DOM-Level-2-Core/
* http://www.w3.org/TR/DOM-Level-3-Core/
* http://dev.w3.org/html5/spec/

