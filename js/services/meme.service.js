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

        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gElCanvas.width / 2, 50)
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
    if(gMeme.lines.length <2) {
        gMeme.lines[0].txt = txt
    }
    else {
        gMeme.lines.push(
            {  
                txt,
                size: 20,
                color: 'white'
            }
        )
    }

    renderMeme()
    // drawText(txt,200,50)
    // drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gElCanvas.width / 2, 50)
    console.log(gMeme)
}


