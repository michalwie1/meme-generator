'use strict'

var gElCanvas
var gCtx
var gImg

function onInit(){
    _createImgs()
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

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
    console.log(gMeme.selectedImgId)
    const imgId =  gMeme.selectedImgId //check!!!!!!!??
    setImg(imgId)
}

function onOpenGallery(){
    


    const elGallery = document.querySelector('.gallery')
    elGallery.show()

}

 // WHEN CLICKING ON BACKGROUND GO TO EDITOR??? *****
// function onCloseGallery(){
//     const elGallery = document.querySelector('.gallery')
//     elGallery.close()
// }

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

    const elGallery = document.querySelector('.gallery')
    elGallery.close()
}


function onSetTxt(txt){
    setText(txt)
}

function onAddTxtLine(){
    const elTxtLine = document.querySelector('.txt-box input')
    elTxtLine.value = 'Write your new line here...'
    addTxtLine()
}

function onSwitchTxtLine(){
    // const elTxtLine = document.querySelector('.txt-box input')
    // elTxtLine.value = 'Write your new line here...'

    switchTxtLine()
}

function onRemoveTxtLine(){
    removeTxtLine()
}

function onDownloadImg(elLink){ 
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSetTxtSize(size){
    setTxtSize(size)
}

function onSetTxtAlign(alignment){
    setTxtAlign(alignment)
}

function onSetFont(font){
    console.log(font)
    setFont(font)
}

function onSetTxtColor(color){
    setTxtColor(color)
}

function onSetBorderColor(color){
    setBorderColor(color)
}






