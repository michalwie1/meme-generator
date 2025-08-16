'use strict'

function onShowMsg(msg){
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerText = msg
    elUserMsg.classList.add('open')


    setTimeout(() => {
  elUserMsg.classList.remove('open')
}, 3000);

}