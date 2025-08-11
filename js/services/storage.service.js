'use strict'

let STORAGE_KEY = 'my-images'

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    if (!json || json === 'undefined') return []
    return JSON.parse(json)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}


