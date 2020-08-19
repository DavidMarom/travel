'use strict'
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    console.log('loading from storage')
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}