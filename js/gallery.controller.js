'use strict'

function onOpenGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.show()

    closeSavedModal()
    onNavClick('gallery')

    // const elEditor = document. querySelector('.editor')
    // elEditor.classList.add('hidden') 
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
    const txt = 'Write your line here...'
    gMeme.selectedImgId = +elImg.id
    gMeme.lines[gMeme.selectedLineIdx] = _createLine(txt) 
    const elInput = document.querySelector('.txt-box input')
    elInput.value = txt

    onNavClick('editor')
    saveToStorage(STORAGE_CURR_MEME, gMeme)
    setImg(elImg.id)
    closeGalleryModal()
}