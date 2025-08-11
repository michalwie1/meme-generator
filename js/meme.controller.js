'use strict'

var gElCanvas
var gCtx

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imgId = loadFromStorage('selectedImgId') || gMeme.selectedImgId
    gImgs = loadFromStorage('gImgs')
    setImg(imgId)


    //     if (imgId) {
    //     setImg(imgId)
    // } else {
    //     renderMeme()
    // }
    // renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-board')
    gElCanvas.width = elContainer.clientWidth

    if (gMeme.selectedImgId) {
    setImg(gMeme.selectedImgId)
    }
}

function renderMeme(){
    gCtx.fillStyle =  'var(--clr3)'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function onSetTxt(elTxt){
    setText()
}