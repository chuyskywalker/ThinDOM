thisGlobal = (if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))

prop = (obj, name, value) ->
  obj[name] = value
  obj

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

append = (self, other) ->
  if other instanceof ThinDOM
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

remove = (self) ->
  self.el[removeMethod]()
  return

css = (self, properties, value) ->
  if properties.constructor is String
    self.el.style.properties = value
  else if properties instanceof Object
    _.forOwn properties, (val, key) ->
      self.el.style.key = val  unless _.isEmpty(val)
      return

html = (self, html) ->
  val = undefined
  unless html
    val = self.el.innerHTML
  else
    self.el.innerHTML = html
    val = self
  val

text = (self, str) ->
  val = undefined
  unless str
    val = self.el.innerHTML
  else
    t = document.createTextNode(str)
    self.el.appendChild t
    val = self
  val

attr = (self, properties, value) ->
  if _.isString(properties)
    self.el.setAttribute properties, value
  else if _.isObject(properties)
    _.forOwn properties, (val, key) ->
      self.el.setAttribute key, val  unless _.isEmpty(val)
      return

  self
  
###
A little thin DOM wrapper with chaining
###
ThinDOM = (tag, attributes, el = null) ->
  ret = {} 
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