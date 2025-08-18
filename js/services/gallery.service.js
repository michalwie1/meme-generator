'use strict'

var gImgs = []

function setImg(imgId, hideBorder = false) {
    const imgIdx = getImgById(gImgs,+imgId)
    if (imgIdx === -1) return
    
    const img = new Image()   
    img.src = gImgs[imgIdx].url
    
    img.onload = () => {
        gElCanvas.width = img.width
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        gMeme.lines.forEach((line,idx) => {
            drawText(line.txt, line.x, line.y, idx, hideBorder)
        })
    }
}