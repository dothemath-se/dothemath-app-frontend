function init () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1") == '') {
        document.querySelector('#window-wrapper').style.filter = 'blur(5px)'

        var namePopup = document.createElement('div')
        var popupContainer = document.createElement('div')
        var title = document.createElement('h3')
        var nameForm = document.createElement('form')
        var checkTexts = ['I\'m over the age of 16.', 'I agree to the privacy policy']
        var checksContainer = document.createElement('div')
        var fragment = document.createDocumentFragment()

        namePopup.setAttribute('id', 'popup')
        popupContainer.setAttribute('id', 'popup-container')
        nameForm.setAttribute('id', 'name-form')
        title.innerHTML = 'Welcome!'
        checksContainer.setAttribute('id', 'checks-container')
        
        checkTexts.forEach((text) => {
            var check = document.createElement('img')
            var tag = document.createElement('span')
            check.setAttribute('src', 'icons/square-regular.svg')
            check.setAttribute('onclick', 'toggleCheck(this)')
            tag.innerHTML = text
            checksContainer.appendChild(check)
            checksContainer.appendChild(tag)
            fragment.appendChild(checksContainer)
        })

        nameForm.innerHTML += '<input id="name-input" type="text" placeholder="Hi, my name is..."><button class="btn--primary" type="button" onclick="closePopUp()">ENTER</button>'
        popupContainer.appendChild(title)
        nameForm.appendChild(fragment)
        popupContainer.appendChild(nameForm)
        namePopup.appendChild(popupContainer)
        document.body.appendChild(namePopup)
    }
    else {
        chooseSubject(['Matte 1', 'Matte 2'])
    }
}

function toggleCheck (target) {
    if (target.classList.contains('toggled')) {
        target.setAttribute('src', 'icons/square-regular.svg')
        target.classList.remove('toggled')
    }
    else {
        target.setAttribute('src', 'icons/check-square-solid.svg')
        target.classList.add('toggled')
    }   
}

function chooseSubject (subjects) {
    document.querySelector('#window-wrapper').style.filter = 'blur(5px)'
    
    var subjectsPopup = document.createElement('div')
    var subjectsContainer = document.createElement('div')
    var title = document.createElement('h2')

    subjectsPopup.setAttribute('id', 'popup')
    subjectsContainer.setAttribute('id', 'subjects-container')

    title.innerHTML = 'Choose subject'

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
    var selectedSubject = target
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

function populateChat (toFrom, userName, message) {
    var chatContainer = document.querySelector('#conversation-container')
    if (message) {
        var newChatBubble = document.createElement('div')
        var chatMessage = document.createElement('p')

        newChatBubble.setAttribute('class', 'chat-bubble--' + toFrom)
        chatMessage.setAttribute('class', 'chat-text')
        if (toFrom == 'to') {
            newChatBubble.classList.add('sending')
        }

        chatMessage.innerHTML = message
        newChatBubble.appendChild(chatMessage)
        chatContainer.insertBefore(newChatBubble, chatContainer.firstChild)
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
}