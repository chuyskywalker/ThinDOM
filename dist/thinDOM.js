/**
 * thindom - Inspired by jQuery, this simple library lets you create DOM elements really fast, with significantly more expressiveness than native DOM methods.
 * @version v1.1.0
 * @link https://github.com/somecallmechief/ThinDOM
 * @license Puclic Domain, CC0 (http://creativecommons.org/about/pdm)
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/ThinDOM.coffee":[function(require,module,exports){
(function (global){
var ThinDOM, jQuery, removeMethod, thisGlobal, _;

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

jQuery = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);


/*
Capture the global object in order of: global, window, this
 */

thisGlobal = (typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));


/*
Capture the correct remove method for use when dropping nodes
 */

removeMethod = (function() {
  var el;
  if (typeof document !== 'undefined') {
    el = document.body;
    if (el.remove) {
      return 'remove';
    } else if (el.removeNode) {
      return 'removeNode';
    } else {
      return 'valueOf';
    }
  }
})();


/*
A little thin DOM wrapper with chaining
 */

ThinDOM = (function() {
  function ThinDOM(tag, attributes, el) {
    this.tag = tag;
    this.el = el != null ? el : null;
    if (this.el == null) {
      this.el = document.createElement(this.tag);
    }
    if (attributes) {
      this.attr(attributes);
    }
  }

  ThinDOM.prototype.THINDOM = 'THINDOM';


  /*
  Convenience method for adding props to objects
   */

  ThinDOM.prototype.add = function(name, val) {
    this[name] = value;
    return this;
  };

  ThinDOM.prototype._append = function(other) {
    this.el.appendChild(other);
    return this.el;
  };


  /*
  Append one node to another
   */

  ThinDOM.prototype.append = function(other) {
    var ret;
    ret = this;
    if (other.THINDOM) {
      this._append(other.get());
    } else if (_.isElement(other)) {
      this._append(other);
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        _.forEach(other, (function(_this) {
          return function(i, otherEl) {
            _this._append(otherEl);
          };
        })(this));
      } else {
        this._append(other[0]);
      }
    }
    return ret;
  };

  ThinDOM.prototype._prepend = function(other) {
    this.el.insertBefore(other, this.el.firstChild);
    return this.el;
  };


  /*
  Prepend one node to the first child node position of another
   */

  ThinDOM.prototype.prepend = function(other) {
    var ret;
    ret = this;
    if (other.THINDOM) {
      this._prepend(other.get());
    } else if (_.isElement(other)) {
      this._prepend(other);
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        _.forEach(other, (function(_this) {
          return function(i, otherEl) {
            _this._prepend(otherEl);
          };
        })(this));
      } else {
        this._prepend(other[0]);
      }
    }
    return ret;
  };


  /*
  Drop a node
   */

  ThinDOM.prototype.remove = function() {
    this.el[removeMethod]();
  };


  /*
  Set the element's style attributes
   */

  ThinDOM.prototype.css = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (value) {
        this.el.style[properties] = value;
      } else {
        ret = this.el.style[properties];
      }
    } else if (_.isPlainObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (val !== '') {
            _this.el.style[key] = val;
          }
        };
      })(this));
    }
    return ret;
  };


  /*
  Set the inner HTML (slow)
   */

  ThinDOM.prototype.html = function(html) {
    var ret;
    ret = this;
    if (html == null) {
      ret = this.el.innerHTML;
    } else {
      this.el.innerHTML = html;
    }
    return ret;
  };


  /*
  Add text node (fast)
   */

  ThinDOM.prototype.text = function(str) {
    var ret, t;
    ret = this;
    if (!str) {
      ret = self.el.innerHTML;
    } else {
      t = document.createTextNode(str);
      this.el.appendChild(t);
    }
    return ret;
  };


  /*
  Set props on the node
   */

  ThinDOM.prototype.attr = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (value) {
        this.el.setAttribute(properties, value);
      } else {
        ret = this.el.getAttribute(properties);
      }
    } else if (_.isObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (val !== '') {
            _this.el.setAttribute(key, val);
          }
        };
      })(this));
    }
    return ret;
  };


  /*
  Add data props
  per: http://jsperf.com/data-dataset/9
  setAttribute is fastest
   */

  ThinDOM.prototype.data = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (false === (properties.indexOf('data-') === 0)) {
        properties = 'data-' + properties;
      }
      ret = this.attr(properties, value);
    } else if (_.isPlainObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (false === (key.indexOf('data-') === 0)) {
            key = 'data-' + key;
          }
          ret = _this.attr(key, value);
        };
      })(this));
    }
    return ret;
  };


  /*
  Get the HTML Element
   */

  ThinDOM.prototype.get = function() {
    return this.el;
  };

  return ThinDOM;

})();

thisGlobal.ThinDOM = ThinDOM;

module.exports = ThinDOM;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["./src/ThinDOM.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzpcXEdpdGh1YlxcdGhpbmRvbVxcc3JjXFxUaGluRE9NLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsNENBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBQUosQ0FBQTs7QUFBQSxNQUNBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FEVCxDQUFBOztBQUdBO0FBQUE7O0dBSEE7O0FBQUEsVUFNQSxHQUFhLENBQUksTUFBQSxDQUFBLE1BQUEsS0FBbUIsV0FBbkIsSUFBbUMsTUFBdEMsR0FBa0QsTUFBbEQsR0FBK0QsQ0FBSSxNQUFBLENBQUEsTUFBQSxLQUFtQixXQUF0QixHQUF1QyxNQUF2QyxHQUFtRCxJQUFwRCxDQUFoRSxDQU5iLENBQUE7O0FBUUE7QUFBQTs7R0FSQTs7QUFBQSxZQVdBLEdBQWUsQ0FBQyxTQUFBLEdBQUE7QUFDZCxNQUFBLEVBQUE7QUFBQSxFQUFBLElBQUcsTUFBQSxDQUFBLFFBQUEsS0FBcUIsV0FBeEI7QUFDRSxJQUFBLEVBQUEsR0FBSyxRQUFRLENBQUMsSUFBZCxDQUFBO0FBQ0EsSUFBQSxJQUFHLEVBQUUsQ0FBQyxNQUFOO2FBQ0UsU0FERjtLQUFBLE1BRUssSUFBRyxFQUFFLENBQUMsVUFBTjthQUNILGFBREc7S0FBQSxNQUFBO2FBR0gsVUFIRztLQUpQO0dBRGM7QUFBQSxDQUFELENBQUEsQ0FBQSxDQVhmLENBQUE7O0FBc0JBO0FBQUE7O0dBdEJBOztBQUFBO0FBMkJlLEVBQUEsaUJBQUUsR0FBRixFQUFPLFVBQVAsRUFBb0IsRUFBcEIsR0FBQTtBQUNYLElBRFksSUFBQyxDQUFBLE1BQUEsR0FDYixDQUFBO0FBQUEsSUFEOEIsSUFBQyxDQUFBLGtCQUFBLEtBQUssSUFDcEMsQ0FBQTs7TUFBQSxJQUFDLENBQUEsS0FBTSxRQUFRLENBQUMsYUFB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QixDQURGO1dBQUE7QUFBQSxVQUVBLEdBQUEsR0FBTSxLQUFDLENBQUEsSUFBRCxDQUFNLEdBQU4sRUFBVyxLQUFYLENBRk4sQ0FEbUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQixDQUFBLENBREc7S0FMTDtXQVdBLElBWkk7RUFBQSxDQTlITixDQUFBOztBQTRJQTtBQUFBOztLQTVJQTs7QUFBQSxvQkErSUEsR0FBQSxHQUFLLFNBQUEsR0FBQTtXQUNILElBQUMsQ0FBQSxHQURFO0VBQUEsQ0EvSUwsQ0FBQTs7aUJBQUE7O0lBM0JGLENBQUE7O0FBQUEsVUE4S1UsQ0FBQyxPQUFYLEdBQXFCLE9BOUtyQixDQUFBOztBQUFBLE1BZ0xNLENBQUMsT0FBUCxHQUFpQixPQWhMakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJfID0gcmVxdWlyZSAnbG9kYXNoJ1xyXG5qUXVlcnkgPSByZXF1aXJlICdqcXVlcnknXHJcblxyXG4jIyNcclxuQ2FwdHVyZSB0aGUgZ2xvYmFsIG9iamVjdCBpbiBvcmRlciBvZjogZ2xvYmFsLCB3aW5kb3csIHRoaXNcclxuIyMjXHJcbnRoaXNHbG9iYWwgPSAoaWYgdHlwZW9mIGdsb2JhbCBpc250ICd1bmRlZmluZWQnIGFuZCBnbG9iYWwgdGhlbiBnbG9iYWwgZWxzZSAoKGlmIHR5cGVvZiB3aW5kb3cgaXNudCAndW5kZWZpbmVkJyB0aGVuIHdpbmRvdyBlbHNlIHRoaXMpKSlcclxuXHJcbiMjI1xyXG5DYXB0dXJlIHRoZSBjb3JyZWN0IHJlbW92ZSBtZXRob2QgZm9yIHVzZSB3aGVuIGRyb3BwaW5nIG5vZGVzXHJcbiMjI1xyXG5yZW1vdmVNZXRob2QgPSAoLT5cclxuICBpZiB0eXBlb2YgZG9jdW1lbnQgaXNudCAndW5kZWZpbmVkJ1xyXG4gICAgZWwgPSBkb2N1bWVudC5ib2R5XHJcbiAgICBpZiBlbC5yZW1vdmVcclxuICAgICAgJ3JlbW92ZSdcclxuICAgIGVsc2UgaWYgZWwucmVtb3ZlTm9kZVxyXG4gICAgICAncmVtb3ZlTm9kZSdcclxuICAgIGVsc2UgI2tsdWRnZSBmb3IgYW4gZWRnZSBjYXNlIHRoYXQgcHJvYmFibHkgZG9lc24ndCBleGlzdFxyXG4gICAgICAndmFsdWVPZidcclxuKSgpXHJcblxyXG4jIyNcclxuQSBsaXR0bGUgdGhpbiBET00gd3JhcHBlciB3aXRoIGNoYWluaW5nXHJcbiMjI1xyXG5jbGFzcyBUaGluRE9NXHJcblxyXG4gIGNvbnN0cnVjdG9yOiAoQHRhZywgYXR0cmlidXRlcywgQGVsID0gbnVsbCkgLT5cclxuICAgIEBlbCA/PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IEB0YWdcclxuICAgIGlmIGF0dHJpYnV0ZXMgdGhlbiBAYXR0ciBhdHRyaWJ1dGVzXHJcblxyXG4gIFRISU5ET006ICdUSElORE9NJ1xyXG5cclxuICAjIyNcclxuICBDb252ZW5pZW5jZSBtZXRob2QgZm9yIGFkZGluZyBwcm9wcyB0byBvYmplY3RzXHJcbiAgIyMjXHJcbiAgYWRkOiAobmFtZSwgdmFsKSAtPlxyXG4gICAgQFtuYW1lXSA9IHZhbHVlXHJcbiAgICBAXHJcblxyXG4gIF9hcHBlbmQ6IChvdGhlcikgLT5cclxuICAgIEBlbC5hcHBlbmRDaGlsZCBvdGhlclxyXG4gICAgQGVsXHJcblxyXG4gICMjI1xyXG4gIEFwcGVuZCBvbmUgbm9kZSB0byBhbm90aGVyXHJcbiAgIyMjXHJcbiAgYXBwZW5kOiAob3RoZXIpIC0+XHJcbiAgICByZXQgPSBAXHJcbiAgICBpZiBvdGhlci5USElORE9NXHJcbiAgICAgIEBfYXBwZW5kIG90aGVyLmdldCgpXHJcbiAgICBlbHNlIGlmIF8uaXNFbGVtZW50IG90aGVyXHJcbiAgICAgIEBfYXBwZW5kIG90aGVyXHJcbiAgICBlbHNlIGlmIG90aGVyIGluc3RhbmNlb2YgalF1ZXJ5XHJcbiAgICAgIGlmIG90aGVyLmxlbmd0aCA+IDFcclxuICAgICAgICBfLmZvckVhY2ggb3RoZXIsIChpLCBvdGhlckVsKSA9PlxyXG4gICAgICAgICAgQF9hcHBlbmQgb3RoZXJFbFxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgIGVsc2VcclxuICAgICAgICBAX2FwcGVuZCBvdGhlclswXVxyXG4gICAgcmV0XHJcblxyXG4gIF9wcmVwZW5kOiAob3RoZXIpIC0+XHJcbiAgICBAZWwuaW5zZXJ0QmVmb3JlIG90aGVyLCBAZWwuZmlyc3RDaGlsZFxyXG4gICAgQGVsXHJcblxyXG4gICMjI1xyXG4gIFByZXBlbmQgb25lIG5vZGUgdG8gdGhlIGZpcnN0IGNoaWxkIG5vZGUgcG9zaXRpb24gb2YgYW5vdGhlclxyXG4gICMjI1xyXG4gIHByZXBlbmQ6IChvdGhlcikgLT5cclxuICAgIHJldCA9IEBcclxuICAgIGlmIG90aGVyLlRISU5ET01cclxuICAgICAgQF9wcmVwZW5kIG90aGVyLmdldCgpXHJcbiAgICBlbHNlIGlmIF8uaXNFbGVtZW50IG90aGVyXHJcbiAgICAgIEBfcHJlcGVuZCBvdGhlclxyXG4gICAgZWxzZSBpZiBvdGhlciBpbnN0YW5jZW9mIGpRdWVyeVxyXG4gICAgICBpZiBvdGhlci5sZW5ndGggPiAxXHJcbiAgICAgICAgXy5mb3JFYWNoIG90aGVyLCAoaSwgb3RoZXJFbCkgPT5cclxuICAgICAgICAgIEBfcHJlcGVuZCBvdGhlckVsXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgZWxzZVxyXG4gICAgICAgIEBfcHJlcGVuZCBvdGhlclswXVxyXG4gICAgcmV0XHJcblxyXG4gICMjI1xyXG4gIERyb3AgYSBub2RlXHJcbiAgIyMjXHJcbiAgcmVtb3ZlOiAtPlxyXG4gICAgQGVsW3JlbW92ZU1ldGhvZF0oKVxyXG4gICAgcmV0dXJuXHJcblxyXG4gICMjI1xyXG4gIFNldCB0aGUgZWxlbWVudCdzIHN0eWxlIGF0dHJpYnV0ZXNcclxuICAjIyNcclxuICBjc3M6IChwcm9wZXJ0aWVzLCB2YWx1ZSkgLT5cclxuICAgIHJldCA9IEBcclxuICAgIGlmIF8uaXNTdHJpbmcgcHJvcGVydGllc1xyXG4gICAgICBpZiB2YWx1ZVxyXG4gICAgICAgIEBlbC5zdHlsZVtwcm9wZXJ0aWVzXSA9IHZhbHVlXHJcbiAgICAgIGVsc2VcclxuICAgICAgICByZXQgPSBAZWwuc3R5bGVbcHJvcGVydGllc11cclxuICAgIGVsc2UgaWYgXy5pc1BsYWluT2JqZWN0IHByb3BlcnRpZXNcclxuICAgICAgXy5mb3JPd24gcHJvcGVydGllcywgKHZhbCwga2V5KSA9PlxyXG4gICAgICAgIGlmIHZhbCBpc250ICcnXHJcbiAgICAgICAgICBAZWwuc3R5bGVba2V5XSA9IHZhbFxyXG4gICAgICAgIHJldHVyblxyXG4gICAgcmV0XHJcblxyXG4gICMjI1xyXG4gIFNldCB0aGUgaW5uZXIgSFRNTCAoc2xvdylcclxuICAjIyNcclxuICBodG1sOiAoaHRtbCkgLT5cclxuICAgIHJldCA9IEBcclxuICAgIHVubGVzcyBodG1sP1xyXG4gICAgICByZXQgPSBAZWwuaW5uZXJIVE1MXHJcbiAgICBlbHNlXHJcbiAgICAgIEBlbC5pbm5lckhUTUwgPSBodG1sXHJcbiAgICByZXRcclxuXHJcbiAgIyMjXHJcbiAgQWRkIHRleHQgbm9kZSAoZmFzdClcclxuICAjIyNcclxuICB0ZXh0OiAoc3RyKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgdW5sZXNzIHN0clxyXG4gICAgICByZXQgPSBzZWxmLmVsLmlubmVySFRNTFxyXG4gICAgZWxzZVxyXG4gICAgICB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgc3RyXHJcbiAgICAgIEBlbC5hcHBlbmRDaGlsZCB0XHJcbiAgICByZXRcclxuXHJcbiAgIyMjXHJcbiAgU2V0IHByb3BzIG9uIHRoZSBub2RlXHJcbiAgIyMjXHJcbiAgYXR0cjogKHByb3BlcnRpZXMsIHZhbHVlKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgaWYgXy5pc1N0cmluZyhwcm9wZXJ0aWVzKVxyXG4gICAgICBpZiB2YWx1ZVxyXG4gICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgcHJvcGVydGllcywgdmFsdWVcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHJldCA9IEBlbC5nZXRBdHRyaWJ1dGUgcHJvcGVydGllc1xyXG4gICAgZWxzZSBpZiBfLmlzT2JqZWN0KHByb3BlcnRpZXMpXHJcbiAgICAgIF8uZm9yT3duIHByb3BlcnRpZXMsICh2YWwsIGtleSkgPT5cclxuICAgICAgICBpZiB2YWwgaXNudCAnJ1xyXG4gICAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSBrZXksIHZhbFxyXG4gICAgICAgIHJldHVyblxyXG4gICAgcmV0XHJcblxyXG4gICMjI1xyXG4gIEFkZCBkYXRhIHByb3BzXHJcbiAgcGVyOiBodHRwOi8vanNwZXJmLmNvbS9kYXRhLWRhdGFzZXQvOVxyXG4gIHNldEF0dHJpYnV0ZSBpcyBmYXN0ZXN0XHJcbiAgIyMjXHJcbiAgZGF0YTogKHByb3BlcnRpZXMsIHZhbHVlKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgaWYgXy5pc1N0cmluZyBwcm9wZXJ0aWVzXHJcbiAgICAgIGlmIGZhbHNlIGlzIChwcm9wZXJ0aWVzLmluZGV4T2YoJ2RhdGEtJykgaXMgMClcclxuICAgICAgICBwcm9wZXJ0aWVzID0gJ2RhdGEtJyArIHByb3BlcnRpZXNcclxuICAgICAgcmV0ID0gQGF0dHIgcHJvcGVydGllcywgdmFsdWVcclxuICAgIGVsc2UgaWYgXy5pc1BsYWluT2JqZWN0IHByb3BlcnRpZXNcclxuICAgICAgXy5mb3JPd24gcHJvcGVydGllcywgKHZhbCwga2V5KSA9PlxyXG4gICAgICAgIGlmIGZhbHNlIGlzIChrZXkuaW5kZXhPZignZGF0YS0nKSBpcyAwKVxyXG4gICAgICAgICAga2V5ID0gJ2RhdGEtJyArIGtleVxyXG4gICAgICAgIHJldCA9IEBhdHRyIGtleSwgdmFsdWVcclxuICAgICAgICByZXR1cm5cclxuICAgIHJldFxyXG5cclxuICAjIyNcclxuICBHZXQgdGhlIEhUTUwgRWxlbWVudFxyXG4gICMjI1xyXG4gIGdldDogLT5cclxuICAgIEBlbFxyXG5cclxuIyBleHBvcnQgVGhpbkRvbSB0byB0aGUgZ2xvYmFsIG9iamVjdFxyXG50aGlzR2xvYmFsLlRoaW5ET00gPSBUaGluRE9NXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRoaW5ET01cclxuIl19
