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
  console.log("[INCOGNITO-TAB] window.localStorage:", window.localStorage)
  Object.defineProperty(window, "localStorage", 
    { value: FakeStorage()
    , configurable: false
    , writable: false })
  console.log("[INCOGNITO-TAB] window.localStorage:", window.localStorage)
}

replaceStorage()

