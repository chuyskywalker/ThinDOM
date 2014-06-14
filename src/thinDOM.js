/**
 * thindom - Inspired by jQuery, this simple library lets you create DOM elements really fast, with significantly more expressiveness than native DOM methods.
 * @version v1.0.1
 * @link https://github.com/somecallmechief/ThinDOM
 * @license 
 */

/*
Capture the global object in order of: global, window, this
 */

(function() {
  var ThinDOM, append, attr, camelCase, css, data, getPropName, html, prop, remove, removeMethod, text, thisGlobal;

  thisGlobal = (typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));


  /*
  Convert a hyphened-property to camelCaseProperty
   */

  camelCase = (function() {
    var defaultRegex, ret, toUpper;
    toUpper = function(match, group1) {
      if (group1) {
        return group1.toUpperCase();
      } else {
        return '';
      }
    };
    defaultRegex = /[-_]+(.)?/g;
    ret = function(str, delimiters) {
      var regex;
      if (delemiters) {
        regex = new RegExp('[' + delimiters + ']+(.)?', 'g');
      } else {
        regex = defaultRegex;
      }
      return str.replace(regex, toUpper);
    };
    return ret;
  })();


  /*
  Convenience method for adding props to objects
   */

  prop = function(obj, name, value) {
    obj[name] = value;
    return obj;
  };


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
  Append one node to another
   */

  append = function(self, other) {
    if (other.THINDOM) {
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


  /*
  Drop a node
   */

  remove = function(self) {
    self.el[removeMethod]();
  };

  getPropName = function(key) {
    var ret;
    ret = key;
    if (_.contains(key, '-')) {
      ret = camelCase(key);
    }
    return ret;
  };


  /*
  Add styles
   */

  css = function(self, properties, value) {
    if (_.isString(properties)) {
      return self.el.style.properties = value;
    } else if (_.isPlainObject(properties)) {
      return _.forOwn(properties, function(val, key) {
        if (val !== '') {
          self.el.style[key] = val;
        }
      });
    }
  };


  /*
  Add data props
  per: http://jsperf.com/data-dataset/9
  setAttribute is fastest
   */

  data = function(self, properties, value) {
    if (_.isString(properties)) {
      if (false === (properties.indexOf('data-') === 0)) {
        properties = 'data-' + properties;
      }
      return attr(self, properties, value);
    } else if (_.isPlainObject(properties)) {
      return _.forOwn(properties, function(val, key) {
        if (false === (key.indexOf('data-') === 0)) {
          key = 'data-' + key;
        }
        attr(self, key, value);
      });
    }
  };


  /*
  Set the inner HTML (slow)
   */

  html = function(self, html) {
    var val;
    val = void 0;
    if (html == null) {
      val = self.el.innerHTML;
    } else {
      self.el.innerHTML = html;
      val = self;
    }
    return val;
  };


  /*
  Add text node (fast)
   */

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


  /*
  Set props on the node
   */

  attr = function(self, properties, value) {
    if (_.isString(properties)) {
      self.el.setAttribute(properties, value);
    } else if (_.isObject(properties)) {
      _.forOwn(properties, function(val, key) {
        if (val !== '') {
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
    ret.THINDOM = 'THINDOM';
    ret.el = el || document.createElement(tag);
    ret.add = function(name, val) {
      return prop(ret, name, val);
    };

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
    ret.html = function(html_content) {
      return html(ret, html_content);
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
