const cardButtons = document.querySelectorAll('.flipbook-btn');

cardButtons.forEach((btn) => {
  const iframe = btn.querySelector('iframe');
  if (!iframe) return;

  btn.addEventListener('mouseenter', () => {
    // Re-assigning the same src forces the iframe to reload from scratch
    iframe.src = iframe.src;
  });
});

const modal = document.getElementById('flipbook-modal');
const modalFrame = document.getElementById('flipbook-frame');
const closeBtn = document.getElementById('modal-close');
const buttons = document.querySelectorAll('.flipbook-btn');

// Open modal and load flipbook
function openModal(url) {
  modalFrame.src = url;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

// Close modal and unload flipbook
function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalFrame.src = 'about:blank'; // Stops any background playback
}

// Button click events
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetUrl = btn.getAttribute('data-flipbook-url');
    if (targetUrl) {
      openModal(targetUrl);
    }
  });
});

// Close button click
closeBtn.addEventListener('click', closeModal);

// Close when clicking outside the modal content (on the dark backdrop)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});