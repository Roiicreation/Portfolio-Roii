document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Invio in corso...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_j9f50rn', 'template_3601iqw', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            submitBtn.innerHTML = 'Messaggio Inviato!';
            document.getElementById('contact-form').reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            console.log('FAILED...', error);
            submitBtn.innerHTML = 'Errore nell\'invio';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
}); 