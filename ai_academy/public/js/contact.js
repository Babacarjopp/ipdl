// public/js/contact.js
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response-message').innerText = 'Votre message a été envoyé avec succès !';
    })
    .catch(error => {
        document.getElementById('response-message').innerText = 'Erreur lors de l\'envoi du message.';
    });
});
