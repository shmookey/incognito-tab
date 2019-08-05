let FakeStorage = () =>
 ({ _data:       {}
  , key:         function(n)   { return Object.keys(this._data)[n] }
  , getItem:     function(k)   { return this._data[k] }
  , setItem:     function(k,v) { this._data[k] = v }
  , removeItem:  function(k)   { delete this._data[k] }
  , clear:       function()    { this._data = {} }
  , get length()               { return Object.keys(this._data).length }
  })

function replaceStorage() {
  let elem = document.createElement("script")
  elem.type = "text/javascript"
  elem.innerHTML = 'Object.defineProperty(window, "localStorage", { value: {}, configurable: false, writable: false })'
  document.getElementsByTagName("head")[0].appendChild(elem)
}

window.addEventListener('DOMContentLoaded', () => replaceStorage())

