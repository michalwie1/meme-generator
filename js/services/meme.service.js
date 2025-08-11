'use strict'

var gMeme = {
 selectedImgId: 5,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'Write you text here...',
 size: 20,
 color: 'white'
 }
 ]
}

var gY = 50

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
            console.log('size',line.size)
            drawText(line.txt, gElCanvas.width / 2, (line.size) + gY)
        })
    }
}

function drawText(text, x, y) {
    console.log('Drawing text:', text, x, y)
    gCtx.lineWidth = 2
    gCtx.font = 'bold 40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.tex
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'  
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function setText(txt) {
    if(gMeme.lines.length === gMeme.selectedLineIdx + 1){
        gMeme.lines[gMeme.selectedLineIdx].txt = txt
    }

        else {
        gMeme.lines.push(
            {  
                txt,
                size: 40 * (gMeme.selectedLineIdx+1),
                color: 'white'
            }
        )
        console.log(gMeme)
    }

    renderMeme()
}

function addTxtLine(){
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx)

    setText('Write your new line here...')
}

function changeTxtLine(){
    console.log('selectedLineIdx',gMeme.selectedLineIdx)
    console.log('lines length',gMeme.lines.length -1)

    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
    console.log(gMeme.selectedLineIdx)
}

function removeTxtLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    renderMeme()
}

