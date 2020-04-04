function closePopUp () {
    var nameInput = document.querySelector('#name-input')
    if (nameInput.value && nameInput.value.length > 1) {
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