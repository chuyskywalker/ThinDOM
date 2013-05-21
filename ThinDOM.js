/**
 * A little thin DOM wrapper with chaining
 */
function ThinDOM(tag, attributes) {
    this.el = document.createElement(tag);
	if(typeof attributes != 'undefined') {
		this.attr(attributes);
	}
}

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
ThinDOM.prototype.css = (function(properties, value) {
    if(properties.constructor === String) {
        this.el.style.properties = value;
    } else if (properties instanceof Object) {
        for(var key in properties) {
            this.el.style.key = properties[key];
        }
    }
    return this;
});
ThinDOM.prototype.text = (function(txt) {
    this.el.textContent = txt;
    return this;
});
ThinDOM.prototype.attr = (function(properties, value) {
    if(properties.constructor === String) {
        this.el.setAttribute(properties, value);
    } else if (properties instanceof Object) {
        for(var key in properties) {
            this.el.setAttribute(key, properties[key]);
        }
    }
    return this;
});
ThinDOM.prototype.get = (function() {
    return this.el;
});
