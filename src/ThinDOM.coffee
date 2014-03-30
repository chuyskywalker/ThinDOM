thisGlobal = (if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))

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
A little thin DOM wrapper with chaining
###
ThinDOM = (tag, attributes, el = null) ->
  @el = el or document.createElement(tag)
  @attr attributes if attributes
  return

###
Append one element to another
###
ThinDOM::append = ((other) ->
  self = this
  if other instanceof ThinDOM
    self.el.appendChild other.get()
  else if other instanceof jQuery
    if other.length > 1
      self = this
      _.forEach other, (i, otherEl) ->
        self.el.appendChild otherEl
        return

    else
      self.el.appendChild other[0]
  else self.el.appendChild other  if _.isElement(other)
  self
)

###
Remove the element
###
ThinDOM::remove = (() ->
  self = this
  self.el[removeMethod]()
  return
)

###
Set the element's style attributes
###
ThinDOM::css = ((properties, value) ->
  self = this
  if properties.constructor is String
    self.el.style.properties = value
  else if properties instanceof Object
    _.forOwn properties, (val, key) ->
      self.el.style.key = val  unless _.isEmpty(val)
      return

  self
)

###
Set the inner HTML of the element.
###
ThinDOM::html = ((html) ->
  ret = undefined
  self = this
  unless html
    ret = self.el.innerHTML
  else
    self.el.innerHTML = html
    ret = self
  ret
)

###
Set the inner text of the element as a Text Node
###
ThinDOM::text = ((text) ->
  ret = undefined
  self = this
  unless text
    ret = self.el.innerHTML
  else
    t = document.createTextNode(text)
    self.el.appendChild t
    ret = self
  ret
)

###
Set attributes on the element
###
ThinDOM::attr = ((properties, value) ->
  self = this
  if _.isString(properties)
    self.el.setAttribute properties, value
  else if _.isObject(properties)
    _.forOwn properties, (val, key) ->
      self.el.setAttribute key, val  unless _.isEmpty(val)
      return

  self
)

###
Get the HTML Element
###
ThinDOM::get = (->
  @el
)


thisGlobal.ThinDOM = ThinDOM