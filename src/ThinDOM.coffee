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

prop = (obj, name, value, writable = false, configurable = false, enumerable = false) ->
  throw new Error("Cannot define a property without an Object.")  unless obj
  throw new Error("Cannot create a property without a valid property name.")  unless typeof name is "string"
  
  Object.defineProperty obj, name,
    value: value
    writable: writable
    configurable: configurable
    enumerable: enumerable
  obj

obj = (properties = {}, inheritsFromPrototype = null) ->
  obj = Object.create(inheritsFromPrototype, properties)
  
  prop obj, 'add', ((name, val, writable, configurable, enumerable) ->
    prop obj, name, val, writable, configurable, enumerable
  ), false, false, false
  obj  
  
###
A little thin DOM wrapper with chaining
###
ThinDOM = (tag, attributes, el = null) ->
  ret = obj()
  ret.add 'el', el or document.createElement(tag)

	###
	Append one element to another
	###
	ret.add 'append', (other) ->
	  self = ret
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
  
  ###
  Remove the element
  ###
  ret.add 'remove', ->
    self = ret
    self.el[removeMethod]()
    return
  
  ###
  Set the element's style attributes
  ###
  ret.add 'css', (properties, value) ->
    self = ret
    if properties.constructor is String
      self.el.style.properties = value
    else if properties instanceof Object
      _.forOwn properties, (val, key) ->
        self.el.style.key = val  unless _.isEmpty(val)
        return

    self

  ###
  Set the inner HTML of the element.
  ###
  ret.add 'html', (html) ->
    val = undefined
    self = ret
    unless html
      val = self.el.innerHTML
    else
      self.el.innerHTML = html
      val = self
    val
  
  ###
  Set the inner text of the element as a Text Node
  ###
  ret.add 'text', (text) ->
    val = undefined
    self = ret
    unless text
      val = self.el.innerHTML
    else
      t = document.createTextNode(text)
      self.el.appendChild t
      val = self
    val
    
  ###
  Set attributes on the element
  ###
  ret.add 'attr', (properties, value) ->
    self = ret
    if _.isString(properties)
      self.el.setAttribute properties, value
    else if _.isObject(properties)
      _.forOwn properties, (val, key) ->
        self.el.setAttribute key, val  unless _.isEmpty(val)
        return

    self
  
  ###
  Get the HTML Element
  ###
  ret.add 'get', ->
    ret.el
  
  if attributes then ret.attr attributes
  ret

thisGlobal.ThinDOM = ThinDOM