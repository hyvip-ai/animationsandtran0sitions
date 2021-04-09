// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"anime.js":[function(require,module,exports) {
var define;
var _this = this;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * https://animejs.com
 * JavaScript animation engine
 * @version v2.2.0
 * @author Julian Garnier
 * @copyright ©2017 Julian Garnier
 * Released under the MIT license
**/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.anime = factory();
  }
})(this, function () {
  // Defaults
  var defaultInstanceSettings = {
    update: undefined,
    begin: undefined,
    run: undefined,
    complete: undefined,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    offset: 0
  };
  var defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    easing: 'easeOutElastic',
    elasticity: 500,
    round: 0
  };
  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'perspective'];
  var transformString; // Utils

  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }

  var is = {
    arr: function arr(a) {
      return Array.isArray(a);
    },
    obj: function obj(a) {
      return stringContains(Object.prototype.toString.call(a), 'Object');
    },
    pth: function pth(a) {
      return is.obj(a) && a.hasOwnProperty('totalLength');
    },
    svg: function svg(a) {
      return a instanceof SVGElement;
    },
    dom: function dom(a) {
      return a.nodeType || is.svg(a);
    },
    str: function str(a) {
      return typeof a === 'string';
    },
    fnc: function fnc(a) {
      return typeof a === 'function';
    },
    und: function und(a) {
      return typeof a === 'undefined';
    },
    hex: function hex(a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function rgb(a) {
      return /^rgb/.test(a);
    },
    hsl: function hsl(a) {
      return /^hsl/.test(a);
    },
    col: function col(a) {
      return is.hex(a) || is.rgb(a) || is.hsl(a);
    }
  }; // BezierEasing https://github.com/gre/bezier-easing

  var bezier = function () {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

    function A(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }

    ;

    function B(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    }

    ;

    function C(aA1) {
      return 3.0 * aA1;
    }

    ;

    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }

    ;

    function getSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    ;

    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX,
          currentT,
          i = 0;

      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;

        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }

        ;
      } while (Math.abs(currentX) > 0.0000001 && ++i < 10);

      return currentT;
    }

    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < 4; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }

      return aGuessT;
    }

    function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
      var sampleValues = new Float32Array(kSplineTableSize);

      if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= 0.001) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }

      return function (x) {
        if (mX1 === mY1 && mX2 === mY2) return x;
        if (x === 0) return 0;
        if (x === 1) return 1;
        return calcBezier(getTForX(x), mY1, mY2);
      };
    }

    return bezier;
  }();

  var easings = function () {
    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic']; // Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/

    function elastic(t, p) {
      return t === 0 || t === 1 ? t : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2.0) * Math.asin(1)) * (Math.PI * 2) / p);
    } // Approximated Penner equations http://matthewlein.com/ceaser/


    var equations = {
      In: [[0.550, 0.085, 0.680, 0.530],
      /* InQuad */
      [0.550, 0.055, 0.675, 0.190],
      /* InCubic */
      [0.895, 0.030, 0.685, 0.220],
      /* InQuart */
      [0.755, 0.050, 0.855, 0.060],
      /* InQuint */
      [0.470, 0.000, 0.745, 0.715],
      /* InSine */
      [0.950, 0.050, 0.795, 0.035],
      /* InExpo */
      [0.600, 0.040, 0.980, 0.335],
      /* InCirc */
      [0.600, -0.280, 0.735, 0.045],
      /* InBack */
      elastic
      /* InElastic */
      ],
      Out: [[0.250, 0.460, 0.450, 0.940],
      /* OutQuad */
      [0.215, 0.610, 0.355, 1.000],
      /* OutCubic */
      [0.165, 0.840, 0.440, 1.000],
      /* OutQuart */
      [0.230, 1.000, 0.320, 1.000],
      /* OutQuint */
      [0.390, 0.575, 0.565, 1.000],
      /* OutSine */
      [0.190, 1.000, 0.220, 1.000],
      /* OutExpo */
      [0.075, 0.820, 0.165, 1.000],
      /* OutCirc */
      [0.175, 0.885, 0.320, 1.275],
      /* OutBack */
      function (t, f) {
        return 1 - elastic(1 - t, f);
      }
      /* OutElastic */
      ],
      InOut: [[0.455, 0.030, 0.515, 0.955],
      /* InOutQuad */
      [0.645, 0.045, 0.355, 1.000],
      /* InOutCubic */
      [0.770, 0.000, 0.175, 1.000],
      /* InOutQuart */
      [0.860, 0.000, 0.070, 1.000],
      /* InOutQuint */
      [0.445, 0.050, 0.550, 0.950],
      /* InOutSine */
      [1.000, 0.000, 0.000, 1.000],
      /* InOutExpo */
      [0.785, 0.135, 0.150, 0.860],
      /* InOutCirc */
      [0.680, -0.550, 0.265, 1.550],
      /* InOutBack */
      function (t, f) {
        return t < .5 ? elastic(t * 2, f) / 2 : 1 - elastic(t * -2 + 2, f) / 2;
      }
      /* InOutElastic */
      ]
    };
    var functions = {
      linear: bezier(0.250, 0.250, 0.750, 0.750)
    };

    var _loop = function _loop(type) {
      equations[type].forEach(function (f, i) {
        functions['ease' + type + names[i]] = is.fnc(f) ? f : bezier.apply(_this, f);
      });
    };

    for (var type in equations) {
      _loop(type);
    }

    return functions;
  }(); // Strings


  function stringToHyphens(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function selectString(str) {
    if (is.col(str)) return;

    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch (e) {
      return;
    }
  } // Arrays


  function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];

    for (var i = 0; i < len; i++) {
      if (i in arr) {
        var val = arr[i];

        if (callback.call(thisArg, val, i, arr)) {
          result.push(val);
        }
      }
    }

    return result;
  }

  function flattenArray(arr) {
    return arr.reduce(function (a, b) {
      return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
  }

  function toArray(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [o];
  }

  function arrayContains(arr, val) {
    return arr.some(function (a) {
      return a === val;
    });
  } // Objects


  function cloneObject(o) {
    var clone = {};

    for (var p in o) {
      clone[p] = o[p];
    }

    return clone;
  }

  function replaceObjectProps(o1, o2) {
    var o = cloneObject(o1);

    for (var p in o1) {
      o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    }

    return o;
  }

  function mergeObjects(o1, o2) {
    var o = cloneObject(o1);

    for (var p in o2) {
      o[p] = is.und(o1[p]) ? o2[p] : o1[p];
    }

    return o;
  } // Colors


  function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(".concat(rgb[1], ",1)") : rgbValue;
  }

  function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",1)");
  }

  function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1]) / 360;
    var s = parseInt(hsl[2]) / 100;
    var l = parseInt(hsl[3]) / 100;
    var a = hsl[4] || 1;

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var r, g, b;

    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return "rgba(".concat(r * 255, ",").concat(g * 255, ",").concat(b * 255, ",").concat(a, ")");
  }

  function colorToRgb(val) {
    if (is.rgb(val)) return rgbToRgba(val);
    if (is.hex(val)) return hexToRgba(val);
    if (is.hsl(val)) return hslToRgba(val);
  } // Units


  function getUnit(val) {
    var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) return split[2];
  }

  function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
  } // Values


  function minMaxValue(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) return val;
    return val(animatable.target, animatable.id, animatable.total);
  }

  function getCSSValue(el, prop) {
    if (prop in el.style) {
      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
    }
  }

  function getAnimationType(el, prop) {
    if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if (is.dom(el) && (el.getAttribute(prop) || is.svg(el) && el[prop])) return 'attribute';
    if (is.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) return 'css';
    if (el[prop] != null) return 'object';
  }

  function getTransformValue(el, propName) {
    var defaultUnit = getTransformUnit(propName);
    var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
    var str = el.style.transform;
    if (!str) return defaultVal;
    var match = [];
    var props = [];
    var values = [];
    var rgx = /(\w+)\((.+?)\)/g;

    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }

    var value = filterArray(values, function (val, i) {
      return props[i] === propName;
    });
    return value.length ? value[0] : defaultVal;
  }

  function getOriginalTargetValue(target, propName) {
    switch (getAnimationType(target, propName)) {
      case 'transform':
        return getTransformValue(target, propName);

      case 'css':
        return getCSSValue(target, propName);

      case 'attribute':
        return target.getAttribute(propName);
    }

    return target[propName] || 0;
  }

  function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) return to;
    var u = getUnit(to) || 0;
    var x = parseFloat(from);
    var y = parseFloat(to.replace(operator[0], ''));

    switch (operator[0][0]) {
      case '+':
        return x + y + u;

      case '-':
        return x - y + u;

      case '*':
        return x * y + u;
    }
  }

  function validateValue(val, unit) {
    if (is.col(val)) return colorToRgb(val);
    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    return unit && !/\s/g.test(val) ? unitLess + unit : unitLess;
  } // getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes. 
  // adapted from https://gist.github.com/SebLambla/3e0550c496c236709744


  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCircleLength(el) {
    return 2 * Math.PI * el.getAttribute('r');
  }

  function getRectLength(el) {
    return el.getAttribute('width') * 2 + el.getAttribute('height') * 2;
  }

  function getLineLength(el) {
    return getDistance({
      x: el.getAttribute('x1'),
      y: el.getAttribute('y1')
    }, {
      x: el.getAttribute('x2'),
      y: el.getAttribute('y2')
    });
  }

  function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;

    for (var i = 0; i < points.numberOfItems; i++) {
      var currentPos = points.getItem(i);
      if (i > 0) totalLength += getDistance(previousPos, currentPos);
      previousPos = currentPos;
    }

    return totalLength;
  }

  function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  } // Path animation


  function getTotalLength(el) {
    if (el.getTotalLength) return el.getTotalLength();

    switch (el.tagName.toLowerCase()) {
      case 'circle':
        return getCircleLength(el);

      case 'rect':
        return getRectLength(el);

      case 'line':
        return getLineLength(el);

      case 'polyline':
        return getPolylineLength(el);

      case 'polygon':
        return getPolygonLength(el);
    }
  }

  function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute('stroke-dasharray', pathLength);
    return pathLength;
  } // Motion path


  function getPath(path, percent) {
    var el = is.str(path) ? selectString(path)[0] : path;
    var p = percent || 100;
    return function (prop) {
      return {
        el: el,
        property: prop,
        totalLength: getTotalLength(el) * (p / 100)
      };
    };
  }

  function getPathProgress(path, progress) {
    function point() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var l = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l);
    }

    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);

    switch (path.property) {
      case 'x':
        return p.x;

      case 'y':
        return p.y;

      case 'angle':
        return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  } // Decompose value


  function decomposeValue(val, unit) {
    var rgx = /-?\d*\.?\d+/g;
    var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + '';
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: is.str(val) || unit ? value.split(rgx) : []
    };
  } // Animatables


  function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
    return filterArray(targetsArray, function (item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }

  function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function (t, i) {
      return {
        target: t,
        id: i,
        total: parsed.length
      };
    });
  } // Properties


  function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings);

    if (is.arr(prop)) {
      var l = prop.length;
      var isFromTo = l === 2 && !is.obj(prop[0]);

      if (!isFromTo) {
        // Duration divided by the number of tweens
        if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
      } else {
        // Transform [from, to] values shorthand to a valid tween value
        prop = {
          value: prop
        };
      }
    }

    return toArray(prop).map(function (v, i) {
      // Default delay value should be applied only on the first tween
      var delay = !i ? tweenSettings.delay : 0; // Use path object as a tween value

      var obj = is.obj(v) && !is.pth(v) ? v : {
        value: v
      }; // Set default delay value

      if (is.und(obj.delay)) obj.delay = delay;
      return obj;
    }).map(function (k) {
      return mergeObjects(k, settings);
    });
  }

  function getProperties(instanceSettings, tweenSettings, params) {
    var properties = [];
    var settings = mergeObjects(instanceSettings, tweenSettings);

    for (var p in params) {
      if (!settings.hasOwnProperty(p) && p !== 'targets') {
        properties.push({
          name: p,
          offset: settings['offset'],
          tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
      }
    }

    return properties;
  } // Tweens


  function normalizeTweenValues(tween, animatable) {
    var t = {};

    for (var p in tween) {
      var value = getFunctionValue(tween[p], animatable);

      if (is.arr(value)) {
        value = value.map(function (v) {
          return getFunctionValue(v, animatable);
        });
        if (value.length === 1) value = value[0];
      }

      t[p] = value;
    }

    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
  }

  function normalizeEasing(val) {
    return is.arr(val) ? bezier.apply(this, val) : easings[val];
  }

  function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function (t) {
      var tween = normalizeTweenValues(t, animatable);
      var tweenValue = tween.value;
      var originalValue = getOriginalTargetValue(animatable.target, prop.name);
      var previousValue = previousTween ? previousTween.to.original : originalValue;
      var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
      var to = getRelativeValue(is.arr(tweenValue) ? tweenValue[1] : tweenValue, from);
      var unit = getUnit(to) || getUnit(from) || getUnit(originalValue);
      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(to, unit);
      tween.start = previousTween ? previousTween.end : prop.offset;
      tween.end = tween.start + tween.delay + tween.duration;
      tween.easing = normalizeEasing(tween.easing);
      tween.elasticity = (1000 - minMaxValue(tween.elasticity, 1, 999)) / 1000;
      tween.isPath = is.pth(tweenValue);
      tween.isColor = is.col(tween.from.original);
      if (tween.isColor) tween.round = 1;
      previousTween = tween;
      return tween;
    });
  } // Tween progress


  var setTweenProgress = {
    css: function css(t, p, v) {
      return t.style[p] = v;
    },
    attribute: function attribute(t, p, v) {
      return t.setAttribute(p, v);
    },
    object: function object(t, p, v) {
      return t[p] = v;
    },
    transform: function transform(t, p, v, transforms, id) {
      if (!transforms[id]) transforms[id] = [];
      transforms[id].push("".concat(p, "(").concat(v, ")"));
    }
  }; // Animations

  function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);

    if (animType) {
      var tweens = normalizeTweens(prop, animatable);
      return {
        type: animType,
        property: prop.name,
        animatable: animatable,
        tweens: tweens,
        duration: tweens[tweens.length - 1].end,
        delay: tweens[0].delay
      };
    }
  }

  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function (animatable) {
      return properties.map(function (prop) {
        return createAnimation(animatable, prop);
      });
    })), function (a) {
      return !is.und(a);
    });
  } // Create Instance


  function getInstanceTimings(type, animations, instanceSettings, tweenSettings) {
    var isDelay = type === 'delay';

    if (animations.length) {
      return (isDelay ? Math.min : Math.max).apply(Math, animations.map(function (anim) {
        return anim[type];
      }));
    } else {
      return isDelay ? tweenSettings.delay : instanceSettings.offset + tweenSettings.delay + tweenSettings.duration;
    }
  }

  function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var properties = getProperties(instanceSettings, tweenSettings, params);
    var animations = getAnimations(animatables, properties);
    return mergeObjects(instanceSettings, {
      children: [],
      animatables: animatables,
      animations: animations,
      duration: getInstanceTimings('duration', animations, instanceSettings, tweenSettings),
      delay: getInstanceTimings('delay', animations, instanceSettings, tweenSettings)
    });
  } // Core


  var activeInstances = [];
  var raf = 0;

  var engine = function () {
    function play() {
      raf = requestAnimationFrame(step);
    }

    ;

    function step(t) {
      var activeLength = activeInstances.length;

      if (activeLength) {
        var i = 0;

        while (i < activeLength) {
          if (activeInstances[i]) activeInstances[i].tick(t);
          i++;
        }

        play();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    return play;
  }(); // Public Instance


  function anime() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var now,
        startTime,
        lastTime = 0;
    var resolve = null;

    function makePromise(instance) {
      var promise = window.Promise && new Promise(function (_resolve) {
        return resolve = _resolve;
      });
      instance.finished = promise;
      return promise;
    }

    var instance = createNewInstance(params);
    var promise = makePromise(instance);

    function toggleInstanceDirection() {
      instance.reversed = !instance.reversed;
    }

    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }

    function syncInstanceChildren(time) {
      var children = instance.children;
      var childrenLength = children.length;

      if (time >= instance.currentTime) {
        for (var i = 0; i < childrenLength; i++) {
          children[i].seek(time);
        }
      } else {
        for (var _i = childrenLength; _i--;) {
          children[_i].seek(time);
        }
      }
    }

    function setAnimationsProgress(insTime) {
      var i = 0;
      var transforms = {};
      var animations = instance.animations;
      var animationsLength = animations.length;

      while (i < animationsLength) {
        var anim = animations[i];
        var animatable = anim.animatable;
        var tweens = anim.tweens;
        var tweenLength = tweens.length - 1;
        var tween = tweens[tweenLength]; // Only check for keyframes if there is more than one tween

        if (tweenLength) tween = filterArray(tweens, function (t) {
          return insTime < t.end;
        })[0] || tween;
        var elapsed = minMaxValue(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed, tween.elasticity);
        var strings = tween.to.strings;
        var round = tween.round;
        var numbers = [];
        var progress = void 0;
        var toNumbersLength = tween.to.numbers.length;

        for (var n = 0; n < toNumbersLength; n++) {
          var value = void 0;
          var toNumber = tween.to.numbers[n];
          var fromNumber = tween.from.numbers[n];

          if (!tween.isPath) {
            value = fromNumber + eased * (toNumber - fromNumber);
          } else {
            value = getPathProgress(tween.value, eased * toNumber);
          }

          if (round) {
            if (!(tween.isColor && n > 2)) {
              value = Math.round(value * round) / round;
            }
          }

          numbers.push(value);
        } // Manual Array.reduce for better performances


        var stringsLength = strings.length;

        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];

          for (var s = 0; s < stringsLength; s++) {
            var a = strings[s];
            var b = strings[s + 1];
            var _n = numbers[s];

            if (!isNaN(_n)) {
              if (!b) {
                progress += _n + ' ';
              } else {
                progress += _n + b;
              }
            }
          }
        }

        setTweenProgress[anim.type](animatable.target, anim.property, progress, transforms, animatable.id);
        anim.currentValue = progress;
        i++;
      }

      var transformsLength = Object.keys(transforms).length;

      if (transformsLength) {
        for (var id = 0; id < transformsLength; id++) {
          if (!transformString) {
            var t = 'transform';
            transformString = getCSSValue(document.body, t) ? t : "-webkit-".concat(t);
          }

          instance.animatables[id].target.style[transformString] = transforms[id].join(' ');
        }
      }

      instance.currentTime = insTime;
      instance.progress = insTime / instance.duration * 100;
    }

    function setCallback(cb) {
      if (instance[cb]) instance[cb](instance);
    }

    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }

    function setInstanceProgress(engineTime) {
      var insDuration = instance.duration;
      var insOffset = instance.offset;
      var insStart = insOffset + instance.delay;
      var insCurrentTime = instance.currentTime;
      var insReversed = instance.reversed;
      var insTime = adjustTime(engineTime);
      if (instance.children.length) syncInstanceChildren(insTime);

      if (insTime >= insStart || !insDuration) {
        if (!instance.began) {
          instance.began = true;
          setCallback('begin');
        }

        setCallback('run');
      }

      if (insTime > insOffset && insTime < insDuration) {
        setAnimationsProgress(insTime);
      } else {
        if (insTime <= insOffset && insCurrentTime !== 0) {
          setAnimationsProgress(0);
          if (insReversed) countIteration();
        }

        if (insTime >= insDuration && insCurrentTime !== insDuration || !insDuration) {
          setAnimationsProgress(insDuration);
          if (!insReversed) countIteration();
        }
      }

      setCallback('update');

      if (engineTime >= insDuration) {
        if (instance.remaining) {
          startTime = now;
          if (instance.direction === 'alternate') toggleInstanceDirection();
        } else {
          instance.pause();

          if (!instance.completed) {
            instance.completed = true;
            setCallback('complete');

            if ('Promise' in window) {
              resolve();
              promise = makePromise(instance);
            }
          }
        }

        lastTime = 0;
      }
    }

    instance.reset = function () {
      var direction = instance.direction;
      var loops = instance.loop;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.completed = false;
      instance.reversed = direction === 'reverse';
      instance.remaining = direction === 'alternate' && loops === 1 ? 2 : loops;
      setAnimationsProgress(0);

      for (var i = instance.children.length; i--;) {
        instance.children[i].reset();
      }
    };

    instance.tick = function (t) {
      now = t;
      if (!startTime) startTime = now;
      var engineTime = (lastTime + now - startTime) * anime.speed;
      setInstanceProgress(engineTime);
    };

    instance.seek = function (time) {
      setInstanceProgress(adjustTime(time));
    };

    instance.pause = function () {
      var i = activeInstances.indexOf(instance);
      if (i > -1) activeInstances.splice(i, 1);
      instance.paused = true;
    };

    instance.play = function () {
      if (!instance.paused) return;
      instance.paused = false;
      instance.completed = false;
      startTime = 0;
      lastTime = adjustTime(instance.currentTime);
      activeInstances.push(instance);
      if (!raf) engine();
    };

    instance.reverse = function () {
      toggleInstanceDirection();
      startTime = 0;
      lastTime = adjustTime(instance.currentTime);
    };

    instance.restart = function () {
      instance.pause();
      instance.reset();
      instance.play();
    };

    instance.reset();
    if (instance.autoplay) instance.play();
    return instance;
  } // Remove targets from animation


  function removeTargets(targets) {
    var targetsArray = parseTargets(targets);

    for (var i = activeInstances.length; i--;) {
      var instance = activeInstances[i];
      var animations = instance.animations;

      for (var a = animations.length; a--;) {
        if (arrayContains(targetsArray, animations[a].animatable.target)) {
          animations.splice(a, 1);
          if (!animations.length) instance.pause();
        }
      }
    }
  } // Timeline


  function timeline(params) {
    var tl = anime(params);
    tl.pause();
    tl.duration = 0;

    tl.add = function (instancesParams) {
      tl.children.forEach(function (i) {
        i.began = true;
        i.completed = true;
      });
      toArray(instancesParams).forEach(function (instanceParams) {
        var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params || {}));
        insParams.targets = insParams.targets || params.targets;
        var tlDuration = tl.duration;
        var insOffset = insParams.offset;
        insParams.autoplay = false;
        insParams.direction = tl.direction;
        insParams.offset = is.und(insOffset) ? tlDuration : getRelativeValue(insOffset, tlDuration);
        tl.began = true;
        tl.completed = true;
        tl.seek(insParams.offset);
        var ins = anime(insParams);
        ins.began = true;
        ins.completed = true;
        if (ins.duration > tlDuration) tl.duration = ins.duration;
        tl.children.push(ins);
      });
      tl.seek(0);
      tl.reset();
      if (tl.autoplay) tl.restart();
      return tl;
    };

    return tl;
  }

  anime.version = '2.2.0';
  anime.speed = 1;
  anime.running = activeInstances;
  anime.remove = removeTargets;
  anime.getValue = getOriginalTargetValue;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.bezier = bezier;
  anime.easings = easings;
  anime.timeline = timeline;

  anime.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return anime;
});
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52542" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","anime.js"], null)
//# sourceMappingURL=/anime.a86524b9.js.map