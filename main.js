function init () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1") == '') {
        document.querySelector('#window-wrapper').style.filter = 'blur(5px)'

        var namePopup = document.createElement('div')
        var popupContainer = document.createElement('div')
        var title = document.createElement('h3')
        var nameForm = document.createElement('form')

        namePopup.setAttribute('id', 'popup')
        popupContainer.setAttribute('id', 'popup-container')
        nameForm.setAttribute('id', 'name-form')
        title.innerHTML = 'What\'s your name?'
        nameForm.innerHTML= '<input id="name-input" type="text" placeholder="Hi, my name is..."><button class="btn--primary" type="button" onclick="closePopUp()">ENTER</button>'

        popupContainer.appendChild(title)
        popupContainer.appendChild(nameForm)
        namePopup.appendChild(popupContainer)
        document.body.appendChild(namePopup)
    }
    else {
        chooseSubject(['Matte 1', 'Matte 2'])
    }
}

function chooseSubject (subjects) {
    document.querySelector('#window-wrapper').style.filter = 'blur(5px)'
    
    var subjectsPopup = document.createElement('div')
    var subjectsContainer = document.createElement('div')
    var title = document.createElement('h2')

    subjectsPopup.setAttribute('id', 'popup')
    subjectsContainer.setAttribute('id', 'subjects-container')

    title.innerHTML = 'Välj ämne'

    subjectsContainer.appendChild(title)
    subjects.forEach((subject) => {
        var subjectButton = document.createElement('button')
        subjectButton.innerHTML = subject
        subjectButton.setAttribute('onclick', 'subjectSelection(this)')
        subjectButton.setAttribute('class', 'btn--primary')
        subjectsContainer.appendChild(subjectButton)
    })
    subjectsPopup.appendChild(subjectsContainer)
    document.body.appendChild(subjectsPopup)
}

function subjectSelection(target) {
    document.querySelector('#popup').remove()
    document.querySelector('#window-wrapper').style.filter = 'none'
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
    chooseSubject(['Matte 1', 'Matte 2'])
}

function populateChat (toFrom, message) {
    var chatContainer = document.querySelector('#conversation-container')
    if (message) {
        var newChatBubble = document.createElement('div')
        var chatMessage = document.createElement('p')

        newChatBubble.setAttribute('class', 'chat-bubble--' + toFrom)
        chatMessage.setAttribute('class', 'chat-text')

        chatMessage.innerHTML = message
        newChatBubble.appendChild(chatMessage)
        chatContainer.insertBefore(newChatBubble, chatContainer.firstChild)
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
}