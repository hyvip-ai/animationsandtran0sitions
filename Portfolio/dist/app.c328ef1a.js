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
})({"app.js":[function(require,module,exports) {
var down = false;
var cltl = new TimelineLite({
  onComplete: function onComplete() {
    this.restart();
  }
});
cltl.fromTo(".cloud1", 15, {
  x: -500
}, {
  x: 1200
}).fromTo(".cloud2", 20, {
  x: -1500
}, {
  x: 1200
}, "-=12").fromTo(".cloud3", 30, {
  x: 1500
}, {
  x: -1200
}, "-=22");
var asttl = new TimelineLite({
  paused: true
});
asttl.play();
var tl = new TimelineLite({
  paused: true
});
tl.to(".bar1", 0.5, {
  rotation: 45,
  y: 16
}).to(".bar2", 0.5, {
  rotation: -45,
  y: -20
}, "-=0.5").to(".bar_cover", 1, {
  height: "100%"
}).fromTo(".home", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".About", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".work", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".conatct", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
});

function clicked() {
  // console.log("clicked");
  if (!down) {
    tl.play();
    down = true;
  } else {
    tl.reverse();
    down = false;
  }
}

var options = {
  strings: ["", "Student", "Web-Designer", "Web-Developer", "Coder", "Geek", "Enthusiast"],
  showCursor: false,
  backSpeed: 20,
  typeSpeed: 80,
  loop: true
};
var typed = new Typed('#hobbies', options);
typed.start();
document.addEventListener("mousemove", function (e) {
  document.querySelectorAll("#parallax").forEach(function (parallax) {
    var speed = parallax.getAttribute("data-speed");
    var x = (window.innerWidth - e.pageX * speed) / 100;
    var y = (window.innerHeight - e.pageY * speed) / 100;
    parallax.style.transform = "translateX(".concat(-x, "px) translateY(").concat(-y, "px)");
  });
  document.getElementById("move").style.transform = "translateX(".concat((e.pageX - window.innerWidth) / 50, "px) translateY(").concat((e.pageY - window.innerHeight) / 50, "px)");
});
document.addEventListener("mousemove", function (e) {
  document.querySelectorAll(".stars").forEach(function (parallax) {
    var speed = parallax.getAttribute("data-speed");
    var x = (window.innerWidth - e.pageX * speed) / 100;
    var y = (window.innerHeight - e.pageY * speed) / 100;
    parallax.style.transform = "translateX(".concat(-x, "px) translateY(").concat(-y, "px)");
  });
});
var hptl = new TimelineLite({
  paused: true
});
hptl.fromTo(".firstcover", 8, {
  opacity: 1
}, {
  opacity: 0
}).fromTo(".main-menu", 0.8, {
  y: -150
}, {
  y: 0
}).fromTo(".mainsvg", 1, {
  x: 200,
  opacity: -2
}, {
  x: 0,
  opacity: 1
}).fromTo(".paar", 0.8, {
  opacity: 0
}, {
  opacity: 1
}).fromTo(".myname", 1, {
  opacity: 0,
  y: 150
}, {
  opacity: 1,
  y: 0
}, "-=0.8").fromTo(".middle", 1, {
  opacity: 0
}, {
  opacity: 1
}, "-=0.6").fromTo(".hobbs", 1, {
  x: -100,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=1").fromTo(".mainlinks", 1, {
  opacity: 0,
  y: -100
}, {
  opacity: 1,
  y: 0
}, "-=1").fromTo(".click", 0.5, {
  opacity: 0,
  x: -80
}, {
  opacity: 1,
  x: 0
});
window.addEventListener("load", function (e) {
  document.getElementById("cov").style.pointerEvents = "none";
  document.getElementById("homeline").style.background = "tomato";
  document.getElementById("aboutline").style.background = "white"; // document.getElementById("aboutline").style.background = "white"
  // document.getElementById("aboutline").style.background = "white"

  hptl.play();
});
var options = {
  strings: ["", "I love Technology!", "I love Animations!", "I love Programming!", "I love Challenges!", "I love Designs!", "I like Engineering!"],
  showCursor: false,
  backSpeed: 20,
  typeSpeed: 80,
  loop: true
};
var homeopen = true;
var aboutopen = false;
var workopen = false;
var conatctopen = false;
var type = new Typed('#abtme', options);

function openabout() {
  document.getElementById("homeline").style.background = "white";
  document.getElementById("aboutline").style.background = "tomato"; // document.getElementById("aboutline").style.background = "white"
  // document.getElementById("aboutline").style.background = "white"

  if (!aboutopen) {
    currentpage = "about";
    homeopen = false;
    aboutopen = true;
    workopen = false;
    conatctopen = false;
    aptl.restart();
    sttl.restart();
  }
} // function openhire(){
// }
// function opencontact(){
// }


document.addEventListener("wheel", function (e) {
  if (currentpage == "home") {
    if (e.deltaY > 0) {
      var x = document.getElementById("aboutbtn1");
      x.click();
    }
  }

  if (currentpage == "about") {
    if (e.deltaY < 0) {
      var _x = document.getElementById("homebtn1");

      _x.click();
    }
  }
});

function homeclick() {
  var x = document.getElementById("homebtn1");
  tl.reverse();
  x.click();
}

function aboutclick() {
  var x = document.getElementById("aboutbtn1");
  tl.reverse();
  x.click();
}

var currentpage = "home";
var homepage = document.getElementById("home");
var aboutpage = document.getElementById("abt");
var aptl = new TimelineLite({
  paused: true
});
aptl.to(".hm", 0.5, {
  opacity: 0
}).fromTo(".about", 1, {
  width: 0,
  opacity: 0
}, {
  width: "100%",
  opacity: 1
}).fromTo(".me", 1, {
  opacity: 0,
  x: -150
}, {
  opacity: 1,
  x: 0
}).fromTo(".underline1", 0.5, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=0.6").fromTo(".underline2", 0.5, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".types", 1, {
  y: 100,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".skill-set", 1, {
  y: -150,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".main-card1", 1, {
  y: 150,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".main-card2", 1, {
  x: -150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".main-card3", 1, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".page-number1", 1, {
  y: 100,
  opacity: 0
}, {
  y: 0,
  opacity: 1
});
var sttl = new TimelineLite({
  paused: true,
  onComplete: function onComplete() {
    this.restart();
  }
});
sttl.fromTo(".star1", 2, {
  opacity: 0,
  x: 0,
  y: 0
}, {
  opacity: 1,
  x: -1200,
  y: 1200
}).fromTo(".star2", 1.5, {
  opacity: 0,
  x: 250,
  y: 0
}, {
  opacity: 1,
  x: -950,
  y: 1150
}, "-=1").fromTo(".star3", 3, {
  opacity: 0,
  x: 400,
  y: 0
}, {
  opacity: 1,
  x: -1300,
  y: 1450
}, "-=0.8").fromTo(".star4", 3, {
  opacity: 0,
  x: 520,
  y: 100
}, {
  opacity: 1,
  x: -1300,
  y: 1450
}, "-=2.5").fromTo(".star5", 3, {
  opacity: 0,
  x: 620,
  y: 250
}, {
  opacity: 1,
  x: -1550,
  y: 1700
}, "-=2.5");
var abtcltl = new TimelineLite({
  paused: true
});
abtcltl.to(".about", 0.5, {
  opacity: 0,
  width: 0
});

function openhome() {
  document.getElementById("homeline").style.background = "tomato";
  document.getElementById("aboutline").style.background = "white"; // document.getElementById("aboutline").style.background = "white"
  // document.getElementById("aboutline").style.background = "white"

  if (!homeopen) {
    if (currentpage == "about") {
      // console.log("triggered");
      abtcltl.restart(); // console.log("berolo")
    }

    currentpage = "home";
    homepage.style.height = "80%";
    homepage.style.opacity = "1";
    homeopen = true;
    aboutopen = false;
    workopen = false;
    conatctopen = false;
    newhptl.restart();
  }
}

var newhptl = new TimelineLite({
  paused: true
});
newhptl.fromTo(".mainsvg", 1, {
  x: 200,
  opacity: -2
}, {
  x: 0,
  opacity: 1
}).fromTo(".paar", 0.8, {
  opacity: 0
}, {
  opacity: 1
}).fromTo(".myname", 1, {
  opacity: 0,
  y: 150
}, {
  opacity: 1,
  y: 0
}, "-=0.8").fromTo(".middle", 1, {
  opacity: 0
}, {
  opacity: 1
}, "-=0.6").fromTo(".hobbs", 1, {
  x: -100,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=1").fromTo(".click", 0.5, {
  opacity: 0,
  x: -80
}, {
  opacity: 1,
  x: 0
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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map