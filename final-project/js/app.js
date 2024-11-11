function toggleSoundImage() {
    const soundImg = document.querySelector('.sound-img');

    if (soundImg.style.display === 'none' || soundImg.style.display === '') {
        soundImg.style.display = 'block';
        /*add turn off sound capability here
        add cross out or lighter shade in css here*/
    }
    else {
        soundImg.style.display = 'none';
    }
}

document.querySelector('.settings-img').addEventListener('click', toggleSoundImage);
