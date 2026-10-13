//your JS code here. If required.
const form = document.getElementById('contactForm');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s\-().]+$/;

const validators = {
  fullName(v) {
    return v.trim() ? '' : 'Full name is required.';
  },
  email(v) {
    if (!v.trim()) return 'Email address is required.';
    return emailPattern.test(v.trim()) ? '' : 'Enter a valid email address.';
  },
  phone(v) {
    if (!v.trim()) return ''; // optional
    const digits = v.replace(/\D/g, '');
    return phonePattern.test(v.trim()) && digits.length >= 7 && digits.length <= 15
      ? ''
      : 'Enter a valid phone number (7-15 digits).';
  },
  message(v) {
    if (!v.trim()) return 'Message is required.';
    return v.trim().length >= 100 ? '' : 'Message must be at least 100 characters.';
  }
};

function validateField(name) {
  const input = form.elements[name];
  const error = document.getElementById(name + '-error');
  const msg = validators[name](input.value);
  error.textContent = msg;
  input.classList.toggle('invalid', !!msg);
  input.classList.toggle('valid', !msg && input.value.trim() !== '');
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}

Object.keys(validators).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener('blur', () => validateField(name));
  input.addEventListener('input', () => {
    validateField(name);
    if (name === 'message') {
      document.getElementById('message-count').textContent =
        input.value.trim().length + ' / 100 characters minimum';
    }
  });
});

form.addEventListener('submit', (e) => {
  const results = Object.keys(validators).map(validateField);
  if (results.includes(false)) {
    e.preventDefault();
    const firstBad = form.querySelector('.invalid');
    if (firstBad) firstBad.focus();
  }
});