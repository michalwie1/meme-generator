'use strict'

var gElCanvas
var gCtx
var gImg
var gLastPos

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

// DRAG & DROP :

function onDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gLastPos = pos
}


function onMove(ev) { //not moving on x axis, only y ???
    ev.preventDefault()
    const pos = getEvPos(ev)
    const line = gMeme.lines[gMeme.selectedLineIdx]

    if (isLineClicked(pos)) {
        document.body.style.cursor = 'all-scroll'
    } else {
        document.body.style.cursor = 'default'
    }

    if (!line.isDrag) return

    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y

    line.x += dx
    line.y += dy

    gLastPos = pos
    renderMeme()
}


function onUp() {
    setLineDrag(false)
}







