'use strict'

function onOpenGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.show()

    closeSavedModal()
}

function renderGallery(){
    let strHtml = ''
    const elGallery = document.querySelector('.gallery')

    gImgs.forEach(img => {
        strHtml +=
            `
        <div class="img-wrapper">
            <img src="${img.url}" alt="Loaded Image" onclick=onSelectImg(this) id="${img.id}">
        </div>
            ` 
    })

    elGallery.innerHTML = strHtml
}

function onSelectImg(elImg) {
    gMeme.selectedImgId = elImg.id
    saveToStorage('selectedImgId', +elImg.id)

    setImg(elImg.id)

    closeGalleryModal()
}