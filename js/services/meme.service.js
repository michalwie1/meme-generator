'use strict'

var gMeme = {
 selectedImgId: 5,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'Write you text here...',
 size: 40,
 align: 'center',
 fontColor: 'white',
 borderColor: 'black',
 font: 'Arial',
 y: 50
 }
 ]
}

var gImgs = []
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme(){
    return gMeme
}

function setImg(imgId) {
    const imgIdx = getImgById(imgId)
    if (imgIdx === -1) return
    
    const img = new Image()   
    console.log(imgIdx)
    img.src = gImgs[imgIdx].url
    
    img.onload = () => {
        gElCanvas.width = img.width
        gElCanvas.height = img.height

        gCtx.fillStyle = 'white'
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        console.log(gMeme)

        gMeme.lines.forEach(line => {
            console.log('txt',line.txt)
            drawText(line.txt, gElCanvas.width / 2, line.y)
        })
    }
}

function drawText(text, x, y) {
    console.log('Drawing text:', text, x, y)
    const lineIdx = gMeme.selectedLineIdx

    gCtx.lineWidth = 2
    gCtx.font = `bold ${gMeme.lines[lineIdx].size}px ${gMeme.lines[lineIdx].font}`
    gCtx.textAlign = gMeme.lines[lineIdx].align
    gCtx.textBaseline = 'middle'
    gCtx.tex
    gCtx.fillStyle = gMeme.lines[lineIdx].fontColor
    gCtx.strokeStyle = gMeme.lines[lineIdx].borderColor 

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt

    // cursor: all-scroll - should add ondown/on up & more events
    // add border around relavent line
    renderMeme()
}

function addTxtLine(){
    const newLine = _createLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    renderMeme()

    // setText('Write your new line here...')
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
    renderMeme()
}

// TEXT - SHOULD ADD - DON'T OVERRIDE LINES !!!!



function getImgById(imgId){
    console.log(imgId)
    console.log(gImgs)
    
    return gImgs.findIndex(img => +img.id === +imgId)
}



function setTxtSize(size){
    const lineIdx = gMeme.selectedLineIdx

    if (size ==='increase' && gMeme.lines[lineIdx].size < 60){
        gMeme.lines[lineIdx].size += 2
    }
    else if (size ==='decrease' && gMeme.lines[lineIdx].size > 3) {
        gMeme.lines[lineIdx].size -= 2
    }
    else return
    console.log(gMeme.lines[lineIdx].size)

    renderMeme()
}

function setTxtAlign(alignment){ //MAKE SURE THIS STAYS IN THE CANVAS
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].align = alignment
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



function _createImgs(){
    for (var i = 1; i < 18; i++) {
        gImgs.push(_createImg(i,['cat','dog'])) //should change the array keywords
    }

    console.log(gImgs)
}

function _createImg(id,keywords){
    return {
        id,
        url: `img/${id}.jpg`,
        keywords: keywords
    }
}

function _createLine(){
    return {
        txt: 'Write you new line here...',
        size: 40,
        align: 'center',
        fontColor: 'white',
        borderColor: 'black',
        font: 'Arial',
        y: gMeme.lines.length ? gMeme.lines[gMeme.lines.length - 1].y + 50 : 50
    }
}
