class MotionDetector {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('motionCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stream = null;
        this.isDetecting = false;
        this.previousFrame = null;
        this.sensitivity = 30;
        this.animationFrame = null;
    }

    async initialize() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.video.srcObject = this.stream;
            
            // Set canvas size to match video
            this.video.addEventListener('loadedmetadata', () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
            });
            
            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            return false;
        }
    }

    startDetection() {
        if (!this.stream) return;
        
        this.isDetecting = true;
        this.detectMotion();
    }

    stopDetection() {
        this.isDetecting = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    detectMotion() {
        if (!this.isDetecting) return;

        this.ctx.drawImage(this.video, 0, 0);
        const currentFrame = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.previousFrame) {
            const diff = this.compareFrames(currentFrame, this.previousFrame);
            this.highlightMotion(diff);
        }

        this.previousFrame = currentFrame;
        this.animationFrame = requestAnimationFrame(() => this.detectMotion());
    }

    compareFrames(current, previous) {
        const diff = new Uint8ClampedArray(current.data.length);
        const threshold = this.sensitivity;

        for (let i = 0; i < current.data.length; i += 4) {
            const rDiff = Math.abs(current.data[i] - previous.data[i]);
            const gDiff = Math.abs(current.data[i + 1] - previous.data[i + 1]);
            const bDiff = Math.abs(current.data[i + 2] - previous.data[i + 2]);

            if (rDiff > threshold || gDiff > threshold || bDiff > threshold) {
                diff[i] = 255;     // Red
                diff[i + 1] = 0;   // Green
                diff[i + 2] = 0;   // Blue
                diff[i + 3] = 128; // Alpha
            }
        }

        return new ImageData(diff, current.width, current.height);
    }

    highlightMotion(diff) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.putImageData(diff, 0, 0);
    }

    updateSensitivity(value) {
        this.sensitivity = value;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const detector = new MotionDetector();
    const startButton = document.getElementById('startButton');
    const statusText = document.getElementById('statusText');
    const sensitivitySlider = document.getElementById('sensitivity');
    const errorMessage = document.getElementById('errorMessage');

    const initialized = await detector.initialize();

    if (!initialized) {
        errorMessage.classList.remove('hidden');
        startButton.disabled = true;
        return;
    }

    startButton.addEventListener('click', () => {
        if (detector.isDetecting) {
            detector.stopDetection();
            startButton.textContent = 'Start Detection';
            startButton.classList.remove('bg-red-600', 'hover:bg-red-700');
            startButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
            statusText.textContent = 'Camera: Not connected';
        } else {
            detector.startDetection();
            startButton.textContent = 'Stop Detection';
            startButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            startButton.classList.add('bg-red-600', 'hover:bg-red-700');
            statusText.textContent = 'Camera: Connected';
        }
    });

    sensitivitySlider.addEventListener('input', (e) => {
        detector.updateSensitivity(e.target.value);
    });
});