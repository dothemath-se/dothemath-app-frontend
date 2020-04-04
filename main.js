function setName () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1") == '') {
        document.querySelector('#window-wrapper').style.filter = 'blur(5px)'

        var namePopup = document.createElement('div')

        namePopup.setAttribute('id', 'popup')
        namePopup.innerHTML= '<div id="popup-container"><h3>Hey there buddy! <br> Who are you?</h3><input id="name-input" type="text" placeholder="Hi, my name is..."><button class="btn--primary" onclick="closePopUp()">ENTER</button></div>'

        document.body.appendChild(namePopup)
    }
}

function closePopUp () {
    var nameInput = document.querySelector('#name-input')
    if (nameInput.value && nameInput.value.length > 1) {
        document.cookie ='name=' + nameInput.value
        document.querySelector('#popup').remove()
        document.querySelector('#window-wrapper').style.filter = 'none'
    }
    else if (nameInput.value && nameInput.value.length <= 1) {
        nameInput.value = 'Name too short'
    }
    else {
        nameInput.value = 'Did you forget something?'
    }
}

function populateChat (message) {
    var chatContainer = document.querySelector('#conversation-container')
    if (message) {
        var newChatBubble = document.createElement('div')
        newChatBubble.setAttribute('class', 'chat-bubble--to')
        newChatBubble.innerHTML = '<p class="chat-text">' + message + '</p>'
        document.querySelector('#conversation-container').insertBefore(newChatBubble, chatContainer.firstChild)
    }
}