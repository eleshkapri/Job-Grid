// Naukri Autofill Script

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRIGGER_AUTOFILL') {
    handleAutofill();
  }
});

function init() {
  createFloatingButton(handleAutofill);
}

async function handleAutofill() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_PROFILE' });
    if (!response.success || !response.profile) {
      showNotification('Please log in to Job Grid first', 'error');
      return;
    }

    const { profile } = response;
    
    // Naukri specific field filling
    fillField('Name', profile.name);
    fillField('Email', profile.email);
    fillField('Mobile', profile.phone);
    fillField('Current Company', profile.experience?.[0]?.company || '');
    fillField('Total Experience', profile.yearsOfExperience?.toString() || '0');
    fillField('Expected Salary', profile.expectedSalary?.toString() || '');
    
    // Alternative selectors if labels fail
    fillFieldBySelector('input[name="email"]', profile.email);
    fillFieldBySelector('input[name="name"]', profile.name);
    fillFieldBySelector('input[name="phone"]', profile.phone);

    showNotification('Auto-filled Naukri application successfully!');
    
    // Track application
    const jobTitle = document.querySelector('.jd-header-title')?.textContent.trim() || document.title;
    const company = document.querySelector('.jd-header-comp-name')?.textContent.trim() || 'Unknown Company';
    
    chrome.runtime.sendMessage({
      type: 'TRACK_APPLICATION',
      payload: {
        jobTitle,
        company,
        source: 'Naukri',
        sourceUrl: window.location.href
      }
    });

  } catch (error) {
    console.error('Autofill error:', error);
    showNotification('Error during autofill', 'error');
  }
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
