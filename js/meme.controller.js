'use strict'

var gElCanvas
var gCtx

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gImgs = loadFromStorage('gImgs')

    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-board')
    gElCanvas.width = elContainer.clientWidth

    // const elEditor = document.querySelector('.editor')
    // elEditor.style.width = elContainer.clientWidth

    if (gMeme.selectedImgId) {
    setImg(gMeme.selectedImgId)
    }
}

function renderMeme(){
    const imgId = loadFromStorage('selectedImgId') || gMeme.selectedImgId //service??
    setImg(imgId)

    // drawText('Write your text',50,50)
}



function onSetTxt(txt){
    setText(txt)
}

function onAddTxtLine(){
    const elTxtLine = document.querySelector('.txt-box input')
    elTxtLine.value = 'Write your new line here...'
    addTxtLine()
}

function onChangeTxtLine(){
    // const elTxtLine = document.querySelector('.txt-box input')
    // elTxtLine.value = 'Write your new line here...'

    changeTxtLine()
}

function onRemoveTxtLine(){
    removeTxtLine()
}