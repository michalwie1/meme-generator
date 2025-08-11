'use strict'

var gImgs = []


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
    }
}

function getImgById(imgId){
    console.log(imgId)
    console.log(gImgs)
    
    return gImgs.findIndex(img => +img.id === +imgId)
}

function _createImgs(){
    for (var i = 1; i < 18; i++) {
        gImgs.push(_createImg(i,['cat','dog'])) //should change the array keywords
    }

    saveToStorage('gImgs',gImgs)
    console.log(gImgs)
}

function _createImg(id,keywords){
    return {
        id,
        url: `img/${id}.jpg`,
        keywords: keywords
    }
}