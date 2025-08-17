'use strict'

var gElCanvas
var gCtx
var gImg
var gLastPos

function onInit(){
    _createImgs()
    renderGallery()
    renderSavedMemes()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // gMeme = loadFromStorage(STORAGE_CURR_MEME) || getMeme()
    gMeme =  getMeme()

    resizeCanvas()
    gMeme.lines[0].x = gElCanvas.width / 2
    renderMeme()

    // const elEditor = document. querySelector('.editor')
    // elEditor.classList.remove('hidden') 

    onNavClick('editor')
    // onNavClick('editor a')
}

function onNavClick(el){
    const elClicked = document.querySelector('.clicked')
    if (elClicked) elClicked.classList.remove('clicked')

    const elEditorHeader = document.querySelector(`.nav-${el}`)
    elEditorHeader.classList.toggle('clicked')
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

function onSetTxt(txt){
    setText(txt)
}

function onAddTxtLine(){
    const elTxtLine = document.querySelector('.txt-box input')
    elTxtLine.value = 'Write your new line here...'
    addTxtLine(elTxtLine.value)
}

function onSwitchTxtLine(){
    switchTxtLine()
}

function onRemoveTxtLine(){
    removeTxtLine()
}

function onDownloadMeme(elLink){ 
    // renderMeme(true)
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

function onSetEmoji(elEmoji){
    setEmoji(elEmoji)
}

// DRAG & DROP :

function onDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gLastPos = pos
}

function onOpenSavedMemes(){
    renderSavedMemes() 
    const ElSavedMemes = document.querySelector('.saved-memes')
    ElSavedMemes.show()

    closeGalleryModal()
    onNavClick('saved')
}

function onSaveMeme(ev){
    ev.preventDefault()
    saveMeme()

    // renderSavedMemes() 
}

function onRemoveMeme(memeId){
    removeMeme(memeId)
    renderSavedMemes()
}

function onSelectMeme(memeId) { //open saved memes?
    closeSavedModal()
    closeGalleryModal()

    loadSavedMeme(memeId)
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

function closeGalleryModal(){
    const elGallery = document.querySelector('.gallery')
    elGallery.close()
}

function closeSavedModal(){
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.close()
}







