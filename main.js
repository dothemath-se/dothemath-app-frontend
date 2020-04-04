const socket = io('https://133454f1.ngrok.io');

var subjectsAvailable = []
var subjectIds = []

socket.on('message', ({text, name}) => {
    populateChat('from', name, text);
});

var userName = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

document.addEventListener("DOMContentLoaded", function(event) {
    init()
});

function initSockets() {
    socket.emit('establish_session', { studentName: userName});
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('send_message', { text: $('#chat-input').val() }, () => {
            document.querySelector('.sending').classList.remove('sending')
        });
        populateChat('to', userName, $('#chat-input').val());
        $('#chat-input').val('');
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
        var checkTexts = ['I accept the use of cookies.', 'I agree to the terms of use']
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
            check.setAttribute('class', 'toggle-check')
            tag.innerHTML = text
            checksContainer.appendChild(check)
            checksContainer.appendChild(tag)
            fragment.appendChild(checksContainer)
        })

        popupContainer.appendChild(title)
        nameForm.innerHTML += '<input id="name-input" type="text" placeholder="Hi, my name is...">'
        nameForm.appendChild(fragment)
        nameForm.innerHTML += '<button id="enter-name-btn" class="btn--primary" type="button" onclick="closePopUp()" disabled>ENTER</button>'
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
        populateSubjects(subjectsAvailable)
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

function populateSubjects (subjects) {    
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
    initSockets()
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