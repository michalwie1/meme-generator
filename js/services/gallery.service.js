'use strict'

var gImgs = []




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