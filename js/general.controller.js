'use strict'

function onShowMsg(msg){
    const elUserMsg = document.querySelector('.user-msg') 
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-board')
    elUserMsg.innerText = msg
    elUserMsg.show()
    elEditor.classList.add('background')
    elCanvas.classList.add('background')
    
    setTimeout(() => {
        elEditor.classList.remove('background')
        elCanvas.classList.remove('background')
        elUserMsg.close()
        }, 2500)
}