const

    menuItem =
      { id:       "incognito-tab"
      , title:    "Open in incognito tab"
      , contexts: ["link"]
      }

  , menuCreateCallback = () => 
      browser.runtime.lastError 
      ? console.log("Error adding context menu item:", browser.runtime.lastError)
      : console.log("Context menu item added successfully.")

  , onClick = async (info, tab) => {
      const thisTab = await browser.tabs.query(
        { active:        true
        , currentWindow: true })
      const newTab  = await browser.tabs.create(
        { url:           info.linkUrl
        , index:         thisTab[0].index + 1 })
      await browser.tabs.executeScript(newTab.id,
        { allFrames:     true
        , file:          "/shim.js"
        , runAt:         "document_start" }) 
    }

  ;

console.log("Attemtping to addd context menu item.")
browser.contextMenus.create(menuItem, menuCreateCallback)
browser.contextMenus.onClicked.addListener(onClick)

