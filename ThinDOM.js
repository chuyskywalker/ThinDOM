/**
 * A little thin DOM wrapper with chaining
 */
function ThinDOM(tag, attributes) {
    this.el = document.createElement(tag);
    if(typeof attributes != 'undefined') {
        this.attr(attributes);
    }
}

/**
 * Iterate over all of the element's attributes. 
 * @param cb(key, value)
 */
ThinDOM.prototype.append = (function(other) {
    if(other instanceof ThinDOM) {
        this.el.appendChild(other.get());
    } else if (other instanceof jQuery) {
        if(other.length > 1) {
            var self = this;
            other.each(function(i, otherEl) {
                self.el.appendChild(otherEl);
            });
        }
        else {
            this.el.appendChild(other[0]);
        }
    } else if (other instanceof Element) {
        this.el.appendChild(other);
    }
    
    return this;
});

/**
 * Set the element's style attributes
 */
ThinDOM.prototype.css = (function(properties, value) {
    if(properties.constructor === String) {
        this.el.style.properties = value;
    } else if (properties instanceof Object) {
        for(var key in properties) {
            if(properties.hasOwnProperty(key)) {
                this.el.style.key = properties[key];
            }
        }
    }
    return this;
});

/**
 * Set the inner HTML of the element.
 */
ThinDOM.prototype.html = (function(html) {
    if(typeof html == 'undefined') {
        return this.el.innerHTML;
    }
    else {
        this.el.innerHTML = html;
        return this;
    }
});

ThinDOM.prototype.attr = (function(properties, value) {
    if(properties.constructor === String) {
        this.el.setAttribute(properties, value);
    } else if (properties instanceof Object) {
        for(var key in properties) {
            if(properties.hasOwnProperty(key)) {
                this.el.setAttribute(key, properties[key]);
            }
        }
    }
    return this;
});
ThinDOM.prototype.get = (function() {
    return this.el;
});
