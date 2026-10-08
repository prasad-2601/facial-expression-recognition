
const video = document.getElementById('video');
const emotionDisplay = document.getElementById('emotion');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    });

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

setInterval(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        emotionDisplay.textContent = data.emotion;
    })
    .catch(err => {
        console.error('Error:', err);
    });
}, 2000); // analyze every 2 seconds
