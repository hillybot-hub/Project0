document.addEventListener('DOMContentLoaded', function() {
    // Handle appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const doctor = document.getElementById('doctor').value;

            document.getElementById('appointment-status').innerHTML = `
                <p>Appointment booked for ${name} with ${doctor} on ${date}.</p>
            `;
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('message').value;

            document.getElementById('contact-status').innerHTML = `
                <p>Thank you, ${name}! Your message has been sent.</p>
            `;
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            document.getElementById('login-status').innerHTML = `
                <p>Welcome back, ${username}!</p>
            `;
        });
    }

    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const role = document.getElementById('reg-role').value;

            document.getElementById('register-status').innerHTML = `
                <p>Account created for ${username} (${role}).</p>
            `;
        });
    }
});