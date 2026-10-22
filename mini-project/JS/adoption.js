document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pawsyAdoptionForm');

  if (!form) return;

  const fullName = document.getElementById('fullName');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const petSelect = document.getElementById('petSelect');
  const homeDetails = document.getElementById('homeDetails');
  const demoCheckbox = document.getElementById('demoCheckbox');
  const submitBtn = document.getElementById('submitBtn');

  // تحسين قيود رقم الهاتف (أقصى حد 11 رقم مثلاً أو أرقام صحيحة)
  phoneInput.addEventListener('input', () => {
phoneInput.value = phoneInput.value.replace(/[^\d+\s().-]/g, '').slice(0, 20);  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Full Name Validation
    const nameVal = fullName.value.trim();
    if (!nameVal || nameVal.length < 3) {
      showError(fullName, 'fullNameError');
      isValid = false;
    } else {
      hideError(fullName, 'fullNameError');
    }

    // 2. Email Validation الدقيق والمتوافق مع الملء التلقائي
    const emailVal = emailInput.value.replace(/\s+/g, '').trim();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      showError(emailInput, 'emailError');
      isValid = false;
    } else {
      hideError(emailInput, 'emailError');
    }

    // 3. Phone Validation (Local and International)
const phoneVal = phoneInput.value.trim();

// السماح بالأرقام المحلية والدولية والمسافات والشرطات والأقواس
const phoneFormatIsValid = /^\+?[\d\s().-]+$/.test(phoneVal);

// استخراج الأرقام فقط
let phoneDigits = phoneVal.replace(/\D/g, "");

// لو الرقم مكتوب بصيغة الاتصال الدولي 00
if (phoneDigits.startsWith("00")) {
  phoneDigits = phoneDigits.slice(2);
}

// قبول الأرقام التي تحتوي على 7 إلى 15 رقمًا
const isPhoneValid =
  phoneFormatIsValid &&
  phoneDigits.length >= 7 &&
  phoneDigits.length <= 15;

if (!isPhoneValid) {
  showError(phoneInput, 'phoneError');
  isValid = false;
} else {
  hideError(phoneInput, 'phoneError');
}

    // 4. Pet Select Validation
    if (!petSelect.value) {
      showError(petSelect, 'petSelectError');
      isValid = false;
    } else {
      hideError(petSelect, 'petSelectError');
    }

    // 5. Home Details Validation
    if (!homeDetails.value.trim()) {
      showError(homeDetails, 'homeDetailsError');
      isValid = false;
    } else {
      hideError(homeDetails, 'homeDetailsError');
    }

    // 6. Checkbox Validation
    const checkboxError = document.getElementById('checkboxError');
    if (!demoCheckbox.checked) {
      if (checkboxError) checkboxError.classList.remove('d-none');
      isValid = false;
    } else {
      if (checkboxError) checkboxError.classList.add('d-none');
    }

    // If Form is Valid -> Trigger Success Modal
    if (isValid) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> ${i18n.t("form.submitting")}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        const modalElement = document.getElementById('adoptionSuccessModal');
        if (modalElement) {
          const successModal = new bootstrap.Modal(modalElement);
          successModal.show();
        }
      }, 800);
    }
  });

  function showError(input, errorId) {
    input.classList.add('is-invalid');
    const err = document.getElementById(errorId);
    if (err) err.classList.remove('d-none');
  }

  function hideError(input, errorId) {
    input.classList.remove('is-invalid');
    const err = document.getElementById(errorId);
    if (err) err.classList.add('d-none');
  }
});

/* Scroll Reveal */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

  // بنعمل reveal على الـ wrappers (col) مش على الكروت نفسها، عشان الهوفر يفضل شغال
  const elements = document.querySelectorAll(
    "#adoption-steps .text-center, " +
    "#adoption-steps .row > div, " +
    "#about-section .row > div, " +
    "#cta-banner .rounded-5, " +
    "#adoption-form .row.g-5 > div"
  );
  if (!elements.length) return;

  document.querySelectorAll("#adoption-steps .row > div").forEach((col, i) => {
    col.style.setProperty("--reveal-delay", `${i * 90}ms`);
  });

  elements.forEach((el) => el.classList.add("pawsy-reveal"));
  document.body.classList.add("pawsy-motion-ready");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
})();
window.goToApply = function () {
  const select = document.getElementById('petSelect');
  const title = document.getElementById('petModalTitle');
  if (select && title) {
    select.value = title.textContent.trim().toLowerCase();
  }
  setTimeout(() => {
    const form = document.getElementById('adoption-form');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  }, 400);
};
/* Navbar links + ScrollSpy (fixes "#" links in navbar) */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#navbarNav .navbar-nav .nav-link');
  if (links.length < 4) return;

  // Give the hero section an id (only if it has none)
  const hero = document.querySelector('main > section:first-of-type');
  if (hero && !hero.id) hero.id = 'home';

  // Home, Find a pet, Pet care, About us
  const targets = ['#home', '#pets', '#pets-care', '#about-section'];
  links.forEach((link, i) => link.setAttribute('href', targets[i]));

  // "Adopt a friend" button -> adoption form
  const adoptBtn = document.querySelector('.navbar .btn.btn-primary');
  if (adoptBtn) adoptBtn.setAttribute('href', '#adoption-form');

  // Move the active dot as the user scrolls
  if (typeof bootstrap !== 'undefined') {
    new bootstrap.ScrollSpy(document.body, {
      target: '#navbarNav',
      rootMargin: '-30% 0px -60% 0px'
    });
  }

  // Close the mobile menu after clicking a link
  const menu = document.getElementById('navbarNav');
  links.forEach(link => link.addEventListener('click', () => {
    if (menu && menu.classList.contains('show') && typeof bootstrap !== 'undefined') {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  }));
});