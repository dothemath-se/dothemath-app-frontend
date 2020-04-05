const socket = io('https://api.dothemath.app');

var subjectsAvailable = []
var subjectIds = []

socket.on('message', ({text, name, image}) => {
    populateChat('from', name, text, image)
});

var userName = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

document.addEventListener("DOMContentLoaded", function(event) {

    let vh = window.innerHeight * 0.01

    document.querySelector('#window-wrapper').style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.querySelector('#window-wrapper').style.setProperty('--vh', `${vh}px`);
    });

    document.querySelector('textarea').addEventListener('focus', (event) => {
        let vh = window.innerHeight * 0.01;
        document.querySelector('#window-wrapper').style.setProperty('--vh', `${vh}px`);
    })

    document.querySelector('textarea').addEventListener('blur', (event) => {
        let vh = window.innerHeight * 0.01;
        document.querySelector('#window-wrapper').style.setProperty('--vh', `${vh}px`);
    })

    document.querySelector('textarea').addEventListener('mouseout', (event) => {
        let vh = window.innerHeight * 0.01;
        document.querySelector('#window-wrapper').style.setProperty('--vh', `${vh}px`);
    })

    document.querySelector('#chat-input').addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            var form = document.querySelector("#chat-container")
            var input = document.querySelector('#chat-input')
            function handleForm(event) { event.preventDefault() } 
            form.addEventListener('submit', 
                socket.emit('send_message', { text: document.querySelector('#chat-input').value }, () => {
                    document.querySelector('.sending').classList.remove('sending')
                })
            )
            populateChat('to', userName, input.value)
            input.value = ''
            input.style.height = 'initial'
            event.preventDefault()
        }
    })

    init()
});

function initSockets(channelId) {
    socket.emit('establish_session', {
        studentName: userName,
        channelId: channelId
      });
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('send_message', { text: document.querySelector('#chat-input').value }, () => {
            document.querySelector('.sending').classList.remove('sending')
        });
        populateChat('to', userName, document.querySelector('#chat-input').value);
        document.querySelector('#chat-input').value = ''
        document.querySelector('#chat-input').style.height = 'initial'
        return false;
    });
};

function init () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1") == '') {
        document.querySelector('#window-wrapper').style.filter = 'blur(5px)'

        var namePopup = document.createElement('div')
        var popupContainer = document.createElement('div')
        var title = document.createElement('h3')
        var nameForm = document.createElement('form')
        var checkTexts = ['I accept the use of cookies', 'I agree to the terms of service']
        var checksContainer = document.createElement('div')
        var fragment = document.createDocumentFragment()

        namePopup.setAttribute('id', 'popup')
        popupContainer.setAttribute('id', 'popup-container')
        nameForm.setAttribute('id', 'name-form')
        title.innerHTML = 'Before we begin...'
        checksContainer.setAttribute('id', 'checks-container')
        
        checkTexts.forEach((text) => {
            var check = document.createElement('img')
            var tag = document.createElement('span')
            check.setAttribute('src', 'icons/square-regular.svg')
            check.setAttribute('onclick', 'toggleCheck(this)')
            check.setAttribute('class', 'toggle-check')
            tag.innerHTML = text
            checksContainer.appendChild(check)
            checksContainer.appendChild(tag)
            fragment.appendChild(checksContainer)
        })

        popupContainer.appendChild(title)
        nameForm.innerHTML += '<input id="name-input" maxlength="25" type="text" placeholder="Choose your nickname">'
        nameForm.appendChild(fragment)
        nameForm.innerHTML += '<button id="enter-name-btn" class="btn--primary" type="button" onclick="closePopUp()" disabled>begin</button>'
        popupContainer.appendChild(nameForm)
        namePopup.appendChild(popupContainer)
        document.body.appendChild(namePopup)
    }
    else {
        document.querySelector('#window-wrapper').style.filter = 'blur(5px)'
        getSubjects()
    }
}

function getSubjects () {
    socket.emit('get_channels', channels => {
        channels.forEach(channel => {
            subjectsAvailable.push(channel.name)
            subjectIds.push(channel.id)
        })
        populateSubjects(subjectsAvailable, subjectIds)
    });
}

function toggleCheck (target) {
    if (target.classList.contains('checked')) {
        target.setAttribute('src', 'icons/square-regular.svg')
        target.classList.remove('checked')
    }
    else {
        target.setAttribute('src', 'icons/check-square-solid.svg')
        target.classList.add('checked')
    }
    buttonActivate()
}

function buttonActivate() {
    var checks = document.querySelectorAll('.toggle-check')
    var toggledChecks = document.querySelectorAll('.checked')
    if (checks.length == toggledChecks.length) {
        document.querySelector('#enter-name-btn').removeAttribute('disabled')
    }
    else { 
        document.querySelector('#enter-name-btn').setAttribute('disabled', '')
    }
}

function populateSubjects (subjects, subjectIds) {    
    var subjectsPopup = document.createElement('div')
    var subjectsContainer = document.createElement('div')
    var title = document.createElement('h2')

    subjectsPopup.setAttribute('id', 'popup')
    subjectsContainer.setAttribute('id', 'subjects-container')

    title.innerHTML = 'Choose subject'

    subjectsContainer.appendChild(title)
    for (let i = 0; i < subjectsAvailable.length; i++) {
        var subject = subjectsAvailable[i]
        var subjectId = subjectIds[i]
        var onClick = 'subjectSelection(this, ' + '"' + subject + '"' + ')'
        var subjectButton = document.createElement('button')

        subjectButton.innerHTML = subject
        subjectButton.setAttribute('onclick', onClick)
        subjectButton.setAttribute('class', 'btn--primary')
        subjectButton.setAttribute('id', subjectId)
        subjectsContainer.appendChild(subjectButton)
    }

    subjectsPopup.appendChild(subjectsContainer)
    document.body.appendChild(subjectsPopup)
}

function subjectSelection(target, subject) {
    var selectedSubject = target.id
    document.querySelector('#subject-title').innerHTML = subject
    document.querySelector('#popup').remove()
    document.querySelector('#window-wrapper').style.filter = 'none'
    initSockets(selectedSubject)
}

function closePopUp () {
    var nameInput = document.querySelector('#name-input')
    if (nameInput.value && nameInput.value.length > 1) {
        document.cookie ='name=' + nameInput.value
        userName = nameInput.value
        document.querySelector('#popup').remove()
        document.querySelector('#window-wrapper').style.filter = 'none'
        getSubjects()
    }
    else if (nameInput.value && nameInput.value.length <= 1) {
        nameInput.placeholder = 'Name too short'
    }
    else {
        nameInput.placeholder = 'Cannot be empty'
    }
}

function populateChat (toFrom, fromUserName, message, imageUrl) {
    var chatContainer = document.querySelector('#conversation-container')
    if (message) {
        var newChatBubble = document.createElement('div')
        var chatMessage = document.createElement('p')
        var fromUser = document.createElement('p')

        newChatBubble.setAttribute('class', 'chat-bubble--' + toFrom)
        chatMessage.setAttribute('class', 'chat-text')
        if (toFrom == 'to') {
            fromUser.setAttribute('class', 'from-user')
            fromUser.innerHTML = userName
            newChatBubble.classList.add('sending')
        }
        else if (toFrom == 'from') {
            fromUser.setAttribute('class', 'from-user')
            fromUser.innerHTML = fromUserName
        }

        chatMessage.innerHTML = message
        newChatBubble.appendChild(chatMessage)
        newChatBubble.appendChild(fromUser)
        chatContainer.insertBefore(newChatBubble, chatContainer.firstChild)
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
    else if (imageUrl) {
        var newChatBubble = document.createElement('div')
        var chatImage = document.createElement('a')
        var fromUser = document.createElement('p')

        newChatBubble.setAttribute('class', 'chat-bubble--' + toFrom)
        chatImage.setAttribute('class', 'chat-text')
        chatImage.setAttribute('href', imageUrl)
        chatImage.setAttribute('target', 'blank')
        chatImage.innerHTML = imageUrl
        fromUser.setAttribute('class', 'from-user')
        fromUser.innerHTML = userName

        newChatBubble.appendChild(chatImage)
        newChatBubble.appendChild(fromUser)
        chatContainer.insertBefore(newChatBubble, chatContainer.firstChild)
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
}