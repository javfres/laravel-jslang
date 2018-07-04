'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// Autoexec function
//
(function (dict) {

    //
    // This is only supposed to work in a browser
    //
    if (typeof window === 'undefined') {
        console.err("JsLang: Not in browser");
        return;
    }

    //
    // Set the functions into the window object
    //
    window.trans = trans;
    window.trans_choice = trans_choice;

    //
    // Divide a key in components
    //
    function divide_key(key) {

        if (!key.includes('::')) {
            key = '*::' + key;
        }

        key = key.replace('::', '.');

        return key.split('.');
    } // divide_key


    //
    // Get a line by its key
    //
    function getLine(key) {

        var path = divide_key(key);

        var current = dict;

        for (var i = 0; i < path.length; i++) {
            if (!(path[i] in current)) return null;
            current = current[path[i]];
        }

        return current;
    } // getLine


    //
    // Do the replaces in a line
    //
    function do_replaces(line, replaces) {

        if (!isString(line)) return line;

        for (key in replaces) {

            var value = replaces[key];
            line = line.replace(':' + key, value);
        }

        return line.trim();
    } // do_replaces


    //
    // The trans function
    //
    function trans(key) {
        var replaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


        var line = getLine(key);

        if (!line) {
            return key;
        }

        if (replaces) {
            line = do_replaces(line, replaces);
        }

        return line;
    }; // trans


    //
    // The trans_choice function
    //
    function trans_choice(key) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var replaces = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        if (!isNaN(count)) {
            count = +count;
        } else {
            count = count.length;
        }

        var line = getLine(key);

        if (!line) {
            return key;
        }

        //
        // Add count to replaces
        //
        if (!replaces.hasOwnProperty('count')) {
            replaces.count = count;
        }

        var choicer = new Choicer(line);
        line = choicer.get(count);

        if (!line) {
            return key;
        }

        line = do_replaces(line, replaces);

        return line;
    }; // trans_choice


    //
    // The class that does the magic of the trans_choice function
    //

    var Choicer = function () {
        function Choicer(line) {
            var _this = this;

            _classCallCheck(this, Choicer);

            this.options = [];

            line.split('|').map(function (line, i) {
                line = line.trim();
                if (!line.length) return;

                var option = _this.process_line(line);

                if (!option.selector) {

                    if (i === 0) {
                        option.selector = new List([1]);
                    } else {
                        option.selector = new Rest();
                    }
                }

                _this.options.push(option);
            });
        }

        _createClass(Choicer, [{
            key: 'process_line',
            value: function process_line(line) {

                if (line[0] === '{') {
                    var parts = line.substring(1).split('}');
                    var nums = parts[0].split(',');
                    line = parts[1].trim();

                    var selector = new List(nums);

                    return {
                        selector: selector,
                        line: line
                    };
                }

                if (line[0] === '[') {

                    var _parts = line.substring(1).split(']');
                    var _nums = _parts[0].split(',');
                    line = _parts[1].trim();
                    var _selector = new Range(_nums[0], _nums[1]);

                    return {
                        selector: _selector,
                        line: line
                    };
                }

                return {
                    selector: null,
                    line: line
                };
            }
        }, {
            key: 'get',
            value: function get(count) {

                if (this.options.length === 1) return this.options[0].line;

                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].selector.contains(count)) {
                        return this.options[i].line;
                    }
                }

                return null;
            }
        }]);

        return Choicer;
    }(); // class


    //
    // Utility classes for the trans_choice
    //

    var Range = function () {
        function Range(a, b) {
            _classCallCheck(this, Range);

            this.a = a.trim() === '*' ? null : +a;
            this.b = b.trim() === '*' ? null : +b;
        }

        _createClass(Range, [{
            key: 'contains',
            value: function contains(x) {

                if (this.a === null) return x <= this.b;
                if (this.b === null) return x >= this.a;

                return this.a <= x && this.b >= x;
            }
        }]);

        return Range;
    }();

    ;

    var List = function () {
        function List(arr) {
            _classCallCheck(this, List);

            this.list = arr.map(function (x) {
                return +x;
            });
        }

        _createClass(List, [{
            key: 'contains',
            value: function contains(x) {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i] === x) return true;
                }
                return false;
            }
        }]);

        return List;
    }();

    ;

    var Rest = function () {
        function Rest() {
            _classCallCheck(this, Rest);
        }

        _createClass(Rest, [{
            key: 'contains',
            value: function contains(x) {
                return true;
            }
        }]);

        return Rest;
    }();

    ;

    //
    // Utils
    //
    function isString(x) {
        return Object.prototype.toString.call(x) === "[object String]";
    }
})(JsLang_DICT); // End of Autoexec function
