// signin.js
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login'); // Updated selector

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.querySelector('.form-container.sign-in form').addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.querySelector('.form-container.sign-in input[type="email"]');
    const passwordInput = document.querySelector('.form-container.sign-in input[type="password"]');

    // Check if the entered email and password match the specified values
    if (emailInput.value === 'balaji@gmail.com' && passwordInput.value === 'binary') {
        // Create an overlay div for background fade and loading animation
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = 1000;

        // Create an iframe to load the loading animation HTML
        const iframe = document.createElement('iframe');
        iframe.src = 'loading.html';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        overlay.appendChild(iframe);

        document.body.appendChild(overlay);

        // Add a 3-second delay before removing the overlay and redirecting to the homepage
        setTimeout(() => {
            // Remove the overlay
            document.body.removeChild(overlay);
            // Redirect to the homepage
            window.location.href = 'homepage.html';
        }, 3000); // 3000 milliseconds = 3 seconds
    } else {
        alert('Authentication failed. Please check your email and password.');
    }
});
