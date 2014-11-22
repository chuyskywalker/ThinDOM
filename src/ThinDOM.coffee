_ = require 'lodash'
jQuery = require 'jquery'

###
Capture the global object in order of: global, window, this
###
thisGlobal = (if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))

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
    else #kludge for an edge case that probably doesn't exist
      'valueOf'
)()

###
A little thin DOM wrapper with chaining
###
class ThinDOM

  constructor: (@tag, attributes, @el = null) ->
    @el ?= document.createElement @tag
    if attributes then @attr attributes

  THINDOM: 'THINDOM'

  ###
  Convenience method for adding props to objects
  ###
  add: (name, val) ->
    @[name] = value
    @

  _append: (other) ->
    @el.appendChild other
    @el

  ###
  Append one node to another
  ###
  append: (other) ->
    ret = @
    if other.THINDOM
      @_append other.get()
    else if _.isElement other
      @_append other
    else if other instanceof jQuery
      if other.length > 1
        _.forEach other, (i, otherEl) =>
          @_append otherEl
          return
      else
        @_append other[0]
    ret

  _prepend: (other) ->
    @el.insertBefore other, @el.firstChild
    @el

  ###
  Prepend one node to the first child node position of another
  ###
  prepend: (other) ->
    ret = @
    if other.THINDOM
      @_prepend other.get()
    else if _.isElement other
      @_prepend other
    else if other instanceof jQuery
      if other.length > 1
        _.forEach other, (i, otherEl) =>
          @_prepend otherEl
          return
      else
        @_prepend other[0]
    ret

  ###
  Drop a node
  ###
  remove: ->
    @el[removeMethod]()
    return

  ###
  Set the element's style attributes
  ###
  css: (properties, value) ->
    ret = @
    if _.isString properties
      if value
        @el.style[properties] = value
      else
        ret = @el.style[properties]
    else if _.isPlainObject properties
      _.forOwn properties, (val, key) =>
        if val isnt ''
          @el.style[key] = val
        return
    ret

  ###
  Set the inner HTML (slow)
  ###
  html: (html) ->
    ret = @
    unless html?
      ret = @el.innerHTML
    else
      @el.innerHTML = html
    ret

  ###
  Add text node (fast)
  ###
  text: (str) ->
    ret = @
    unless str
      ret = self.el.innerHTML
    else
      t = document.createTextNode str
      @el.appendChild t
    ret

  ###
  Set props on the node
  ###
  attr: (properties, value) ->
    ret = @
    if _.isString(properties)
      if value
        @el.setAttribute properties, value
      else
        ret = @el.getAttribute properties
    else if _.isObject(properties)
      _.forOwn properties, (val, key) =>
        if val isnt ''
          @el.setAttribute key, val
        return
    ret

  ###
  Add data props
  per: http://jsperf.com/data-dataset/9
  setAttribute is fastest
  ###
  data: (properties, value) ->
    ret = @
    if _.isString properties
      if false is (properties.indexOf('data-') is 0)
        properties = 'data-' + properties
      ret = @attr properties, value
    else if _.isPlainObject properties
      _.forOwn properties, (val, key) =>
        if false is (key.indexOf('data-') is 0)
          key = 'data-' + key
        ret = @attr key, value
        return
    ret

  ###
  Get the HTML Element
  ###
  get: ->
    @el

# export ThinDom to the global object
thisGlobal.ThinDOM = ThinDOM

module.exports = ThinDOM
