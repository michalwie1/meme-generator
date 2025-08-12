'use strict'

var gElCanvas
var gCtx
var gImg

function onInit(){
    _createImgs()
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // gImgs = loadFromStorage('gImgs')

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

    // drawText('Write your text',50,50)
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
    
    // window.location.href = 'editor.html'
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



