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

    gMeme =  getMeme()
    resizeCanvas()
    renderMeme()
    gMeme.lines[0].x = gElCanvas.width / 2


    const elMain = document. querySelector('main')
    elMain.classList.remove('hidden') 

    closeModal('.gallery')
    closeModal('.saved-memes')
    onNavClick('editor')
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

    onNavClick('saved')
    
    // closeGalleryModal()
    closeModal('.gallery')
    elMainToggle('hide')
    // elMainToggle('hide')

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
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
    closeModal('.gallery')
    closeModal('.saved-memes')
    onNavClick('editor')
    elMainToggle('show')

    loadSavedMeme(memeId)
}

function onShowMsg(msg){
    const elUserMsg = document.querySelector('.user-msg') 
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-board')
    elUserMsg.innerText = msg
    elUserMsg.showModal()
    
    setTimeout(() => {
        elUserMsg.close()
        }, 2500)
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

function closeModal(className){
    const elModal = document.querySelector(className)
    elModal.close()
}

function elMainToggle(action){
    const elMain = document.querySelector('main')
    if (action === 'hide') elMain.classList.add('hidden')
   else  elMain.classList.remove('hidden')
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    uploadImg(canvasData, onSuccess)
}





