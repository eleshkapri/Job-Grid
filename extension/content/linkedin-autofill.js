// LinkedIn Autofill Script

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRIGGER_AUTOFILL') {
    handleAutofill();
  }
});

function init() {
  createFloatingButton(handleAutofill);
  
  // Watch for Easy Apply modal
  const observer = new MutationObserver(() => {
    if (document.querySelector('.jobs-easy-apply-modal')) {
      // Trigger automatically, or rely on button? User requested "When modal detected OR button clicked"
      // We'll add a slight delay to allow React to render the modal contents
      if (!window.autoApplyFired) {
        window.autoApplyFired = true;
        setTimeout(handleAutofill, 500);
        
        // Reset when modal closes
        setTimeout(() => {
          const modalObserver = new MutationObserver(() => {
            if (!document.querySelector('.jobs-easy-apply-modal')) {
              window.autoApplyFired = false;
              modalObserver.disconnect();
            }
          });
          modalObserver.observe(document.body, { childList: true, subtree: true });
        }, 1000);
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

async function handleAutofill() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_PROFILE' });
    if (!response.success || !response.profile) {
      showNotification('Please log in to Job Grid first', 'error');
      return;
    }

    const { profile } = response;
    
    // Fill fields using different strategies
    fillFieldByAriaLabel('First name', profile.firstName || profile.name.split(' ')[0]);
    fillFieldByAriaLabel('Last name', profile.lastName || profile.name.split(' ')[1] || '');
    fillFieldByAriaLabel('Email address', profile.email);
    fillFieldByAriaLabel('Mobile phone number', profile.phone);
    fillFieldByAriaLabel('City', profile.location);
    fillFieldByAriaLabel('Headline', profile.headline || 'Software Engineer');
    
    showNotification('Auto-filled page successfully!');
    
    // If it's a review page, track application
    if (document.querySelector('[aria-label="Submit application"]')) {
      const jobTitle = document.querySelector('.jobs-details-top-card__job-title')?.textContent.trim();
      const company = document.querySelector('.jobs-details-top-card__company-info a')?.textContent.trim();
      
      if (jobTitle && company) {
        chrome.runtime.sendMessage({
          type: 'TRACK_APPLICATION',
          payload: {
            jobTitle,
            company,
            source: 'LinkedIn',
            sourceUrl: window.location.href
          }
        });
      }
    }
  } catch (error) {
    console.error('Autofill error:', error);
    showNotification('Error during autofill', 'error');
  }
}

// Start observing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
