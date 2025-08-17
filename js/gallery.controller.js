'use strict'

function onOpenGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.show()

    // closeSavedModal()
    closeModal('.saved-memes')
    onNavClick('gallery')
   elMainToggle

   window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
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
    closeModal('.gallery')
    saveToStorage(STORAGE_CURR_MEME, gMeme)
    setImg(elImg.id)
}