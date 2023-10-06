import { BrowserBarcodeReader } from '@zxing/library';

const codeReader = new BrowserBarcodeReader();

document.getElementById('startButton').addEventListener('click', () => {
    
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        let cameraId;

        if (videoDevices.length > 1) {
            cameraId = videoDevices[1].deviceId; // Intenta acceder a la segunda cámara
        } else if (videoDevices.length === 1) {
            cameraId = videoDevices[0].deviceId; // Usa la cámara predeterminada si solo hay una
        } else {
            console.warn("No se encontraron dispositivos de video");
            return; // Sal del .then si no hay cámaras
        }
        cameraId = videoDevices[0].deviceId;
        // Ahora que tienes el cameraId, puedes usarlo en codeReader
        return codeReader.decodeFromInputVideoDevice(cameraId, 'video');

    })
    .then(result => {
        if (result) {
            console.log(videoDevices)
            console.log(result.text);
            // Mostrar el contenido en el elemento HTML
        document.getElementById('codeContent').textContent = result.text;
        }
    })
    .catch(err => {
        console.error(err);
    });

    console.log('Started continuous decode from camera.');
});

document.getElementById('resetButton').addEventListener('click', () => {
    codeReader.reset();
    console.log('Reset.');
});
