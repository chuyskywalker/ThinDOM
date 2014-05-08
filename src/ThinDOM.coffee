###
Capture the global object in order of: global, window, this
###
thisGlobal = (if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))

###
Convert a hyphened-property to camelCaseProperty
###
camelCase = (->
  toUpper = (match, group1) ->
    if group1 then group1.toUpperCase() else ''
    
  defaultRegex = /[-_]+(.)?/g
  ret = (str, delimiters) ->
    if delemiters then regex = new RegExp '[' + delimiters + ']+(.)?', 'g' else regex = defaultRegex
    str.replace regex, toUpper
  ret
)()

###
Convenience method for adding props to objects
###
prop = (obj, name, value) ->
  obj[name] = value
  obj

###
Capture the correct remove method for use when dropping nodes
###
removeMethod = (->
  if typeof document isnt 'undefined'
    el = document.body
    if el.remove
      'remove'
    else if el.removeNode
      'removeNode'
    else
      'valueOf'
)()

###
Append one node to another
###
append = (self, other) ->
  if other.THINDOM
    self.el.appendChild other.get()
  else if other instanceof jQuery
    if other.length > 1
      _.forEach other, (i, otherEl) ->
        self.el.appendChild otherEl
        return
    else
      self.el.appendChild other[0]
  else self.el.appendChild other  if _.isElement(other)
  self

###
Drop a node
###
remove = (self) ->
  self.el[removeMethod]()
  return

getPropName = (key) ->
  ret = key
  if _.contains key, '-'
    ret = camelCase key
  ret  

###
Add styles
###
css = (self, properties, value) ->
  if _.isString properties
    self.el.style.properties = value
  else if _.isPlainObject properties
    _.forOwn properties, (val, key) ->
      self.el.style[key] = val
      return

###
Add data props
per: http://jsperf.com/data-dataset/9
setAttribute is fastest
###
data = (self, properties, value) ->
  if _.isString properties
    if false is (properties.indexOf('data-') is 0)
      properties = 'data-' + properties
    attr self, properties, value
  else if _.isPlainObject properties
    _.forOwn properties, (val, key) ->
      if false is (key.indexOf('data-') is 0)
        key = 'data-' + key
      attr self, key, value
      return

###
Set the inner HTML (slow)
###
html = (self, html) ->
  val = undefined
  unless html
    val = self.el.innerHTML
  else
    self.el.innerHTML = html
    val = self
  val

###
Add text node (fast)
###
text = (self, str) ->
  val = undefined
  unless str
    val = self.el.innerHTML
  else
    t = document.createTextNode(str)
    self.el.appendChild t
    val = self
  val

###
Set props on the node 
###
attr = (self, properties, value) ->
  if _.isString(properties)
    self.el.setAttribute properties, value
  else if _.isObject(properties)
    _.forOwn properties, (val, key) ->
      self.el.setAttribute key, val
      return

  self
  
###
A little thin DOM wrapper with chaining
###
ThinDOM = (tag, attributes, el = null) ->
  ret = {} 
  
  ret.THINDOM = 'THINDOM'
  
  ret.el = el or document.createElement(tag)
  ret.add = (name, val) ->
    prop ret, name, val
  
  ###
  Append one element to another
  ###
  ret.append = (other) ->
    append ret, other
  
  ###
  Remove the element
  ###
  ret.remove = ->
    remove ret
  
  ###
  Set the element's style attributes
  ###
  ret.css = (properties, value) ->
    css ret, properties, value

  ###
  Set the inner HTML of the element.
  ###
  ret.html = (html) ->
    html ret, html
  
  ###
  Set the inner text of the element as a Text Node
  ###
  ret.text = (str) ->
    text ret, str
    
  ###
  Set attributes on the element
  ###
  ret.attr = (properties, value) ->
    attr ret, properties, value
  
  ###
  Get the HTML Element
  ###
  ret.get = ->
    ret.el
  
  if attributes then ret.attr attributes
  ret

# export ThinDom to the global object  
thisGlobal.ThinDOM = ThinDOM