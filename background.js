const

    tabItem =
      { id:       "incognito-tab"
      , title:    "Open in incognito tab"
      , contexts: ["link"]
      }

  , refreshItem =
      { id:       "incognito-refresh"
      , title:    "Incognito refresh"
      , contexts: ["all"]
      }

  , tabOnClick = async (info, tab) => {
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

  , refreshOnClick = async (info, tab) => {
      const thisTab = await browser.tabs.query(
        { active:        true
        , currentWindow: true })
      const newTab  = await browser.tabs.create(
        { url:           tab.url
        , index:         thisTab[0].index + 1 })
      browser.tabs.executeScript(
        { allFrames:     true
        , file:          "/shim.js"
        , runAt:         "document_start" })
      await browser.tabs.remove(tab.id)
    }

  , onClick = async (info, tab) => {
      if(info.menuItemId == "incognito-tab")
        await tabOnClick(info,tab)
      else if(info.menuItemId == "incognito-refresh")
        await refreshOnClick(info,tab)
    }

  , createCallback = item => () => 
      browser.runtime.lastError 
      ? console.log("Error adding item", item, ":", browser.runtime.lastError)
      : console.log("Context menu item added successfully.")

  , sleep = t => new Promise(r => window.setTimeout(r, t))

;

console.log("Attemtping to addd context menu item: incognito-tab.")
browser.contextMenus.create(tabItem, createCallback("incognito-tab"))

console.log("Attemtping to addd context menu item: incognito-refresh.")
browser.contextMenus.create(refreshItem, createCallback("incognito-refresh"))

browser.contextMenus.onClicked.addListener(onClick)

