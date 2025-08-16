'use strict'

var gImgs = []

function setImg(imgId) {
    const imgIdx = getImgById(imgId)
    if (imgIdx === -1) return
    
    const img = new Image()   
    img.src = gImgs[imgIdx].url
    
    img.onload = () => {
        gElCanvas.width = img.width
        gElCanvas.height = img.height

        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        // gMeme.lines[gMeme.selectedLineIdx].x = gElCanvas.width / 2 //needed?

        gMeme.lines.forEach((line,idx) => {
            drawText(line.txt, line.x, line.y, idx)
        })
    }
}