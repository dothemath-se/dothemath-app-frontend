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