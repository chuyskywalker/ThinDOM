/**
 * thindom - Inspired by jQuery, this simple library lets you create DOM elements really fast, with significantly more expressiveness than native DOM methods.
 * @version v0.0.6
 * @link https://github.com/somecallmechief/ThinDOM
 * @license 
 */
(function() {
  var ThinDOM, obj, prop, removeMethod, thisGlobal;

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

  prop = function(obj, name, value, writable, configurable, enumerable) {
    if (writable == null) {
      writable = false;
    }
    if (configurable == null) {
      configurable = false;
    }
    if (enumerable == null) {
      enumerable = false;
    }
    if (!obj) {
      throw new Error("Cannot define a property without an Object.");
    }
    if (typeof name !== "string") {
      throw new Error("Cannot create a property without a valid property name.");
    }
    Object.defineProperty(obj, name, {
      value: value,
      writable: writable,
      configurable: configurable,
      enumerable: enumerable
    });
    return obj;
  };

  obj = function(properties, inheritsFromPrototype) {
    if (properties == null) {
      properties = {};
    }
    if (inheritsFromPrototype == null) {
      inheritsFromPrototype = null;
    }
    obj = Object.create(inheritsFromPrototype, properties);
    prop(obj, 'add', (function(name, val, writable, configurable, enumerable) {
      return prop(obj, name, val, writable, configurable, enumerable);
    }), false, false, false);
    return obj;
  };


  /*
  A little thin DOM wrapper with chaining
   */

  ThinDOM = function(tag, attributes, el) {
    var ret;
    if (el == null) {
      el = null;
    }
    ret = obj();
    return ret.add('el', el || document.createElement(tag));
  };


  /*
  	Append one element to another
   */

  ret.add('append', function(other) {
    var self;
    self = ret;
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
  });


  /*
  Remove the element
   */

  ret.add('remove', function() {
    var self;
    self = ret;
    self.el[removeMethod]();
  });


  /*
  Set the element's style attributes
   */

  ret.add('css', function(properties, value) {
    var self;
    self = ret;
    if (properties.constructor === String) {
      self.el.style.properties = value;
    } else if (properties instanceof Object) {
      _.forOwn(properties, function(val, key) {
        if (!_.isEmpty(val)) {
          self.el.style.key = val;
        }
      });
    }
    return self;
  });


  /*
  Set the inner HTML of the element.
   */

  ret.add('html', function(html) {
    var self, val;
    val = void 0;
    self = ret;
    if (!html) {
      val = self.el.innerHTML;
    } else {
      self.el.innerHTML = html;
      val = self;
    }
    return val;
  });


  /*
  Set the inner text of the element as a Text Node
   */

  ret.add('text', function(text) {
    var self, t, val;
    val = void 0;
    self = ret;
    if (!text) {
      val = self.el.innerHTML;
    } else {
      t = document.createTextNode(text);
      self.el.appendChild(t);
      val = self;
    }
    return val;
  });


  /*
  Set attributes on the element
   */

  ret.add('attr', function(properties, value) {
    var self;
    self = ret;
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
  });


  /*
  Get the HTML Element
   */

  ret.add('get', function() {
    return ret.el;
  });

  if (attributes) {
    ret.attr(attributes);
  }

  ret;

  thisGlobal.ThinDOM = ThinDOM;

}).call(this);
