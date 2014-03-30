/**
 * thindom - Inspired by jQuery, this simple library lets you create DOM elements really fast, with significantly more expressiveness than native DOM methods.
 * @version v0.0.8
 * @link https://github.com/somecallmechief/ThinDOM
 * @license 
 */
(function() {
  var ThinDOM, append, attr, css, html, remove, removeMethod, text, thisGlobal;

  thisGlobal = (typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));

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

  append = function(self, other) {
    if (other instanceof ThinDOM) {
      self.el.appendChild(other.get());
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        _.forEach(other, function(i, otherEl) {
          self.el.appendChild(otherEl);
        });
      } else {
        self.el.appendChild(other[0]);
      }
    } else {
      if (_.isElement(other)) {
        self.el.appendChild(other);
      }
    }
    return self;
  };

  remove = function(self) {
    self.el[removeMethod]();
  };

  css = function(self, properties, value) {
    if (properties.constructor === String) {
      return self.el.style.properties = value;
    } else if (properties instanceof Object) {
      return _.forOwn(properties, function(val, key) {
        if (!_.isEmpty(val)) {
          self.el.style.key = val;
        }
      });
    }
  };

  html = function(self, html) {
    var val;
    val = void 0;
    if (!html) {
      val = self.el.innerHTML;
    } else {
      self.el.innerHTML = html;
      val = self;
    }
    return val;
  };

  text = function(self, str) {
    var t, val;
    val = void 0;
    if (!str) {
      val = self.el.innerHTML;
    } else {
      t = document.createTextNode(str);
      self.el.appendChild(t);
      val = self;
    }
    return val;
  };

  attr = function(self, properties, value) {
    if (_.isString(properties)) {
      self.el.setAttribute(properties, value);
    } else if (_.isObject(properties)) {
      _.forOwn(properties, function(val, key) {
        if (!_.isEmpty(val)) {
          self.el.setAttribute(key, val);
        }
      });
    }
    return self;
  };


  /*
  A little thin DOM wrapper with chaining
   */

  ThinDOM = function(tag, attributes, el) {
    var ret;
    if (el == null) {
      el = null;
    }
    ret = {};
    ret.el = el || document.createElement(tag);

    /*
    Append one element to another
     */
    ret.append = function(other) {
      return append(ret, other);
    };

    /*
    Remove the element
     */
    ret.remove = function() {
      return remove(ret);
    };

    /*
    Set the element's style attributes
     */
    ret.css = function(properties, value) {
      return css(ret, properties, value);
    };

    /*
    Set the inner HTML of the element.
     */
    ret.html = function(html) {
      return html(ret, html);
    };

    /*
    Set the inner text of the element as a Text Node
     */
    ret.text = function(str) {
      return text(ret, str);
    };

    /*
    Set attributes on the element
     */
    ret.attr = function(properties, value) {
      return attr(ret, properties, value);
    };

    /*
    Get the HTML Element
     */
    ret.get = function() {
      return ret.el;
    };
    if (attributes) {
      ret.attr(attributes);
    }
    return ret;
  };

  thisGlobal.ThinDOM = ThinDOM;

}).call(this);
