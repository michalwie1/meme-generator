'use strict'

var gElCanvas
var gCtx
var gImg

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

function onOpenGallery(){
    _createImgs()
    renderGallery()


    const elGallery = document.querySelector('.gallery')
    // elGallery.style.display = 'block'
    elGallery.show()

}

function renderGallery(){
    let strHtml = ''
    const elGallery = document.querySelector('.gallery')

    gImgs.forEach(img => {
        strHtml +=
            `
        <div class="img-wrapper">
            <img src="${img.url}" alt="Loaded Image" onclick=onSelectImg(this) id="${img.id}">
            <button class="btn-close" onclick=onRemoveImg('${img.id}')>X</button>
        </div>
            ` 
    })

    elGallery.innerHTML = strHtml
}

function onSelectImg(elImg) {
    gMeme.selectedImgId = elImg.id
    saveToStorage('selectedImgId', +elImg.id)

    setImg(elImg.id)
    
    window.location.href = 'editor.html'
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



