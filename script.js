// script.js

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { src: 'images/image1.jpg', description: 'Sizce Metehan Baba Güvencesiyle Bu Arkadaş MÜSLÜMAN mı ?', correctAnswer: 'EVET' },
        { src: 'images/image2.jpg', description: 'The Miracın Bacısı Şuanda 7.5KM İLERİNDE! Sizce Bu Arkadaş Müslümanmıdır ?', correctAnswer: 'HAYIR' },
        { src: 'images/image3.jpg', description: 'Kerem Apo İShal olmuş ve Tuvalette Uyuya Kalmış! Sizce Bu Arkadaş Müslümanmıdır ?', correctAnswer: 'EVET' }
    ];
    let currentImageIndex = 0;
    let answered = false;

    const currentImage = document.getElementById('current-image');
    const imageDescription = document.getElementById('image-description');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const resultDiv = document.getElementById('result');
    const messageDiv = document.getElementById('message');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const startMusicButton = document.getElementById('start-music-button');
    const backgroundMusic = document.getElementById('background-music');

    function showMessage(message) {
        messageDiv.textContent = message;
    }

    function updateImage() {
        if (currentImageIndex < images.length) {
            currentImage.src = images[currentImageIndex].src;
            imageDescription.textContent = images[currentImageIndex].description;
            resultDiv.textContent = '';
            yesButton.disabled = false;
            noButton.disabled = false;
            messageDiv.textContent = '';
            nextButton.classList.add('hidden');
            restartButton.classList.add('hidden');
            answered = false;
        } else {
            showMessage('Test bitti!');
            nextButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
        }
    }

    function handleAnswer(answer) {
        if (!answered) {
            answered = true;
            const correctAnswer = images[currentImageIndex].correctAnswer;
            if (answer === correctAnswer) {
                resultDiv.textContent = 'Doğru!';
                resultDiv.classList.add('correct');
                resultDiv.classList.remove('incorrect');
            } else {
                resultDiv.textContent = 'Yanlış!';
                resultDiv.classList.add('incorrect');
                resultDiv.classList.remove('correct');
            }
            yesButton.disabled = true;
            noButton.disabled = true;
            showMessage('Bir sonraki görsele geç!');
            nextButton.classList.remove('hidden');
        }
    }

    yesButton.addEventListener('click', () => {
        handleAnswer('EVET');
    });

    noButton.addEventListener('click', () => {
        handleAnswer('HAYIR');
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex++;
        updateImage();
    });

    restartButton.addEventListener('click', () => {
        currentImageIndex = 0;
        updateImage();
    });

    startMusicButton.addEventListener('click', () => {
        backgroundMusic.play().then(() => {
            console.log('Müzik çalıyor.');
            startMusicButton.classList.add('hidden');
        }).catch((error) => {
            console.error('Müzik çalma hatası:', error);
        });
    });

    updateImage(); // İlk görseli yükle
});
