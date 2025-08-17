'use strict'

var gMeme
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
var gSavedMeme = []

function getMeme(){
    if (loadFromStorage(STORAGE_CURR_MEME)) return loadFromStorage(STORAGE_CURR_MEME)
    else return {
                selectedImgId: 5,
                selectedLineIdx: 0,
                lines: [
                    {
                        txt: 'Write your line here...',
                        size: 30,
                        align: 'center',
                        fontColor: 'white',
                        borderColor: 'black',
                        font: 'Arial',
                        x: gElCanvas.width / 2,
                        y: 50,
                        isDrag: false
                    }
                ]
           }
}

function renderMeme(hideBorder = false){
    const imgId = loadFromStorage(STORAGE_CURR_MEME).selectedImgId
    saveToStorage(STORAGE_CURR_MEME, gMeme)
    setImg(imgId, hideBorder)
}

function renderSavedMemes(){
    gSavedMeme = loadFromStorage(STORAGE_SAVED_MEME)
    let strHtml = ''
    const ElSavedMemes = document.querySelector('.saved-memes')

    gSavedMeme.forEach(savedMeme => {
        strHtml +=
            `
        <div class="img-wrapper">
            <img src="${savedMeme.url}" alt="Loaded Image" onclick=onSelectMeme('${savedMeme.memeId}') id="${savedMeme.memeId}">
            <button class="btn-close" onclick=onRemoveMeme('${savedMeme.memeId}')>X</button>
        </div>
            ` 
    })

    ElSavedMemes.innerHTML = strHtml
}

function saveMeme() {
    const imgId = loadFromStorage(STORAGE_CURR_MEME).selectedImgId
    const memeId = generateId()
    
    const imgIdx = getImgById(gImgs, +imgId)
    if (imgIdx === -1) return
    
    const img = new Image()
    img.src = gImgs[imgIdx].url

    img.onload = () => {
        gElCanvas.width = img.width
        gElCanvas.height = img.height

        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, line.x, line.y, idx, true) 
        })

        const canvasData = gElCanvas.toDataURL('image/jpeg')
        const currSavedMeme = _createMeme(memeId, imgId, canvasData, gMeme.lines)

        gSavedMeme.unshift(currSavedMeme)

        saveToStorage(STORAGE_SAVED_MEME, gSavedMeme)
        renderMeme(false)
        renderSavedMemes()
        onShowMsg('Your meme was saved successfully')
    }
}

function removeMeme(id){
    const memeIdx = getImgById(gSavedMeme,id)
    console.log('memeIdx',memeIdx)
    if (memeIdx === -1) return

    gSavedMeme.splice(memeIdx, 1)
    saveToStorage(STORAGE_SAVED_MEME,gSavedMeme)
}

function loadSavedMeme(memeId){
    const memeIdx = getImgById(gSavedMeme,memeId)
    const meme = gSavedMeme[memeIdx]
    const imgId = meme.imgId
    const img = new Image()

    saveToStorage(STORAGE_CURR_MEME, gMeme)
    gMeme.selectedLineIdx = 0
    gMeme.selectedImgId = imgId
    gMeme.lines = meme.lines

    img.src = meme.url

    img.onload = () => {
        gElCanvas.width = img.width
        gElCanvas.height = img.height

        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line,idx) => {
            drawText(line.txt, line.x, line.y, idx)
        })
    }

}

function drawText(text, x, y,idx, hideBorder = false) {
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[idx]

    gCtx.lineWidth = 1.5
    gCtx.font = `bold ${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'
    gCtx.fillStyle = line.fontColor
    gCtx.strokeStyle = line.borderColor 

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    if (!hideBorder && lineIdx === idx) drawBorder(text,x,y, lineIdx)
}

function drawBorder(text,x,y,lineIdx){
    const space = 10
    const textMeasure = gCtx.measureText(text)
    const lineWidth = textMeasure.width + space * 2
    const lineHeight = gMeme.lines[lineIdx].size + space

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1

    let squareX
    const align = gMeme.lines[lineIdx].align

    if (align === 'center') {
        squareX = x - lineWidth / 2
    } else if (align === 'left') {
        squareX = x - space
    } else if (align === 'right') {
        squareX = x - lineWidth + space
    }

    gCtx.strokeRect(squareX, y - lineHeight / 2, lineWidth, lineHeight)
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme()
}

function addTxtLine(txt){ // TEXT - SHOULD ADD - DON'T OVERRIDE LINES !!!!
    const newLine = _createLine('Write your new line here...')
    newLine.txt = txt
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    renderMeme()
}

function switchTxtLine(){
    console.log('selectedLineIdx',gMeme.selectedLineIdx)
    console.log('lines length',gMeme.lines.length -1)

    //change logic to 0-1-2-3-2-1-0-1-2-3....
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
    renderMeme()
    console.log('selectedLineIdx',gMeme.selectedLineIdx)
}

function removeTxtLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)

    updateLineIdx()
    renderMeme()
}

function getImgById(arr, id){
    if (arr === gImgs){
        return arr.findIndex(img => img.id === id)
    } else {
        return arr.findIndex(img => img.memeId === id)
    }
}

function setTxtSize(size){ 
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]

    if (size ==='increase' && line.size < 60){
        line.size += 2
    }
    else if (size ==='decrease' && line.size > 3) {
        line.size -= 2
    }
    else return

    renderMeme()
}

function setTxtAlign(alignment){ //if (textMeasure > gElCanvas.width), if txt overflow?
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]

    line.align = alignment

    if (line.align === 'left') {
        line.x = 10 
    } else if (line.align === 'right') {
        line.x = gElCanvas.width
    } else if (line.align === 'center') {
        line.x = gElCanvas.width / 2
    }

    renderMeme()
}

function setFont(font){
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].font = font
    renderMeme()
}

function setTxtColor(color){
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].fontColor = color
    renderMeme()
}

function setBorderColor(color){
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].borderColor = color
    renderMeme()
}

function setEmoji(elEmoji){ // should check, override lines?
    const emojiSelected = elEmoji.innerText
    addTxtLine(emojiSelected)
    drawEmoji(emojiSelected, gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y)
}

function drawEmoji(emoji, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.font = '40px'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(emoji, x, y)
    gCtx.strokeText(emoji, x, y)
}

function isLineClicked(clickedPos) { //update
    const space = 10
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const textMeasure = gCtx.measureText(line.txt)
    // const width = textMeasure.width
    // const height = line.size
    const lineWidth = textMeasure.width + space * 2
    const lineHeight = line.size + space

    // line.x = gElCanvas.width / 2


    const xStart = line.x - lineWidth / 2
    const xEnd = line.x + lineWidth
    const yStart = line.y - lineHeight / 2
    const yEnd = line.y + lineHeight 

    // gCtx.strokeRect(x - lineWidth / 2, y - lineHeight / 2, lineWidth, lineHeight)

    return (
        clickedPos.x >= xStart &&
        clickedPos.x <= xEnd &&
        clickedPos.y >= yStart &&
        clickedPos.y <= yEnd
    )
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function updateLineIdx(){
    gMeme.selectedLineIdx = gMeme.selectedLineIdx > 0 ? gMeme.selectedLineIdx - 1 : 0
}

function _createImgs(){
    for (var i = 1; i < 18; i++) {
        gImgs.push(_createImg(i,['cat','dog'])) //should change the array keywords
    }
}

function _createImg(id,keywords){
    return {
        id,
        url: `img/${id}.jpg`,
        keywords: keywords
    }
}

function _createLine(txt){
    return {
        txt,
        size: 30,
        align: 'center',
        fontColor: 'white',
        borderColor: 'black',
        font: 'Arial',
        x: gElCanvas.width / 2,
        y: gMeme.lines.length ? gMeme.lines[gMeme.lines.length - 1].y + 50 : 50,
        isDrag: false
    }
}

function _createMeme (memeId, imgId, url,lines){
     return {
        memeId,
        imgId,
        url,
        lines
     }
}
