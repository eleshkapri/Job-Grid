// Shared autofill utilities

// React-safe value setter
function setNativeValue(element, value) {
  if (!element) return;
  const nativeSetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    'value'
  )?.set || Object.getOwnPropertyDescriptor(element, 'value')?.set;

  if (nativeSetter) {
    nativeSetter.call(element, value);
  } else {
    element.value = value;
  }
  
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

// MutationObserver-based element detection
function waitForElement(selector, callback, timeout = 10000) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    const el = document.querySelector(selector);
    if (el) {
      obs.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  if (timeout) {
    setTimeout(() => observer.disconnect(), timeout);
  }
}

// Find input by label text
function fillField(labelText, value) {
  const labels = Array.from(document.querySelectorAll('label'));
  const label = labels.find(l => l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()));
  if (label) {
    const inputId = label.getAttribute('for');
    const input = inputId ? document.getElementById(inputId) : label.nextElementSibling;
    if (input) {
      setNativeValue(input, value);
      return true;
    }
  }
  return false;
}

function fillFieldBySelector(selector, value) {
  const input = document.querySelector(selector);
  if (input) {
    setNativeValue(input, value);
    return true;
  }
  return false;
}

function fillFieldByAriaLabel(ariaLabel, value) {
  const input = document.querySelector(`[aria-label*="${ariaLabel}" i]`);
  if (input) {
    setNativeValue(input, value);
    return true;
  }
  return false;
}

// File upload using DataTransfer API
function simulateFileUpload(fileInput, blob, fileName) {
  if (!fileInput) return;
  
  const file = new File([blob], fileName, { type: blob.type });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  
  fileInput.files = dataTransfer.files;
  fileInput.dispatchEvent(new Event('change', { bubbles: true }));
}

// Create floating Job Grid button
function createFloatingButton(onClick) {
  if (document.getElementById('jobgrid-floating-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'jobgrid-floating-btn';
  btn.textContent = 'Job Grid Fill';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    padding: 10px 20px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    font-family: sans-serif;
  `;

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('click', onClick);

  document.body.appendChild(btn);
  return btn;
}

function showNotification(message, type = 'success') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    padding: 12px 24px;
    background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    font-family: sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: opacity 0.3s;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}
