document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const crackTime = document.getElementById('crackTime');

    // Criteria elements
    const lengthCriteria = document.getElementById('lengthCriteria');
    const uppercaseCriteria = document.getElementById('uppercaseCriteria');
    const lowercaseCriteria = document.getElementById('lowercaseCriteria');
    const numberCriteria = document.getElementById('numberCriteria');
    const specialCriteria = document.getElementById('specialCriteria');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Password strength checker
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        checkPasswordStrength(password);
        updateCriteria(password);
    });

    function checkPasswordStrength(password) {
        if (!password) {
            resetStrengthMeter();
            return;
        }

        let score = 0;
        let feedback = '';

        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        // Character type checks
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        // Complexity bonus
        if (password.length >= 16) score++;
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) score++;

        updateStrengthDisplay(score, password);
    }

    function updateStrengthDisplay(score, password) {
        const strengthMeter = document.querySelector('.strength-meter');

        // Remove existing classes
        strengthMeter.classList.remove('strength-very-weak', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong');

        let strengthClass, strengthLabel, timeEstimate;

        if (score <= 2) {
            strengthClass = 'strength-very-weak';
            strengthLabel = 'Very Weak';
            timeEstimate = 'Less than a second';
        } else if (score <= 4) {
            strengthClass = 'strength-weak';
            strengthLabel = 'Weak';
            timeEstimate = 'Minutes to hours';
        } else if (score <= 5) {
            strengthClass = 'strength-fair';
            strengthLabel = 'Fair';
            timeEstimate = 'Days to months';
        } else if (score <= 6) {
            strengthClass = 'strength-good';
            strengthLabel = 'Good';
            timeEstimate = 'Years to decades';
        } else {
            strengthClass = 'strength-strong';
            strengthLabel = 'Strong';
            timeEstimate = 'Centuries or more';
        }

        strengthMeter.classList.add(strengthClass);
        strengthText.textContent = `Password Strength: ${strengthLabel}`;
        crackTime.style.display = 'block';
        crackTime.textContent = `Estimated time to crack: ${timeEstimate}`;
    }

    function resetStrengthMeter() {
        const strengthMeter = document.querySelector('.strength-meter');
        strengthMeter.classList.remove('strength-very-weak', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
        strengthText.textContent = 'Enter a password to see its strength';
        crackTime.style.display = 'none';
    }

    function updateCriteria(password) {
        updateCriteriaItem(lengthCriteria, password.length >= 8);
        updateCriteriaItem(uppercaseCriteria, /[A-Z]/.test(password));
        updateCriteriaItem(lowercaseCriteria, /[a-z]/.test(password));
        updateCriteriaItem(numberCriteria, /[0-9]/.test(password));
        updateCriteriaItem(specialCriteria, /[^A-Za-z0-9]/.test(password));
    }

    function updateCriteriaItem(element, isMet) {
        const icon = element.querySelector('i');

        if (isMet) {
            element.classList.add('met');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-check');
        } else {
            element.classList.remove('met');
            icon.classList.remove('fa-check');
            icon.classList.add('fa-times');
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.getElementById('overlay');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function () {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
});
