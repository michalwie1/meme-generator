'use strict'

let STORAGE_SAVED_MEME = 'my-images'
let STORAGE_CURR_MEME = 'curr-meme'

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    if (!json || json === 'undefined') return []
    return JSON.parse(json)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}


