document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });
    });
    
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        
        field.classList.remove('is-valid', 'is-invalid');
        const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        if (fieldName === 'email') {
            validateEmail(field, fieldValue);
        } else if (fieldName === 'username') {
            validateUsername(field, fieldValue);
        } else if (fieldName.includes('password')) {
            validatePassword(field, fieldValue);
        } else if (fieldName === 'contact_number') {
            validatePhone(field, fieldValue);
        }
    }
    
    function validateEmail(field, value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
        } else if (value) {
            field.classList.add('is-valid');
        }
    }
    
    function validateUsername(field, value) {
        if (value.length < 3) {
            showFieldError(field, 'Username must be at least 3 characters long.');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            showFieldError(field, 'Username can only contain letters, numbers, and underscores.');
        } else {
            field.classList.add('is-valid');
        }
    }
    
    function validatePassword(field, value) {
        if (field.name === 'password1') {
            if (value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long.');
            } else {
                field.classList.add('is-valid');
            }
        } else if (field.name === 'password2') {
            const password1 = document.querySelector('input[name="password1"]');
            if (password1 && value !== password1.value) {
                showFieldError(field, 'Passwords do not match.');
            } else if (value) {
                field.classList.add('is-valid');
            }
        }
    }
    
    function validatePhone(field, value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
        if (value && !phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number.');
        } else if (value) {
            field.classList.add('is-valid');
        }
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        field.parentNode.appendChild(feedback);
    }
});
