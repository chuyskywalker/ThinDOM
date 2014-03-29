/**
 * thindom - Inspired by jQuery, this simple library lets you create DOM elements really fast, with significantly more expressiveness than native DOM methods.
 * @version v0.0.2
 * @link https://github.com/somecallmechief/ThinDOM
 * @license 
 */

/*
A little thin DOM wrapper with chaining
 */

(function() {
  var ThinDOM, thisGlobal;

  ThinDOM = function(tag, attributes) {
    this.el = document.createElement(tag);
    if (attributes) {
      this.attr(attributes);
    }
  };


  /*
  Iterate over all of the element's attributes.
  @param cb(key, value)
   */

  ThinDOM.prototype.append = (function(other) {
    var self;
    self = this;
    if (other instanceof ThinDOM) {
      self.el.appendChild(other.get());
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        self = this;
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
  Set the element's style attributes
   */

  ThinDOM.prototype.css = (function(properties, value) {
    var self;
    self = this;
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

  ThinDOM.prototype.html = (function(html) {
    var ret, self;
    ret = void 0;
    self = this;
    if (!html) {
      ret = self.el.innerHTML;
    } else {
      self.el.innerHTML = html;
      ret = self;
    }
    return ret;
  });


  /*
  Set the inner text of the element as a Text Node
   */

  ThinDOM.prototype.text = (function(text) {
    var ret, self, t;
    ret = void 0;
    self = this;
    if (!text) {
      ret = self.el.innerHTML;
    } else {
      t = document.createTextNode(text);
      self.el.appendChild(t);
      ret = self;
    }
    return ret;
  });


  /*
  Set attributes on the element
   */

  ThinDOM.prototype.attr = (function(properties, value) {
    var self;
    self = this;
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

  ThinDOM.prototype.get = (function() {
    return this.el;
  });

  thisGlobal = (typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));

  thisGlobal.ThinDOM = ThinDOM;

}).call(this);
