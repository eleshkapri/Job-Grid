document.addEventListener('DOMContentLoaded', async () => {
  const loginView = document.getElementById('login-view');
  const authView = document.getElementById('auth-view');
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');
  const statusIndicator = document.getElementById('status-indicator');

  // Check auth status on load
  await checkStatus();

  async function checkStatus() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_STATUS' });
      if (response && response.isAuthenticated) {
        showAuthView(response.profile);
      } else {
        showLoginView();
      }
    } catch (e) {
      console.error('Error checking status:', e);
      showLoginView();
    }
  }

  function showLoginView() {
    loginView.classList.remove('hidden');
    authView.classList.add('hidden');
    statusIndicator.classList.remove('connected');
  }

  function showAuthView(profile) {
    loginView.classList.add('hidden');
    authView.classList.remove('hidden');
    statusIndicator.classList.add('connected');
    
    if (profile) {
      document.getElementById('profile-name').textContent = profile.name || 'User Name';
      document.getElementById('profile-email').textContent = profile.email || 'email@example.com';
      document.getElementById('profile-stats').textContent = 
        `${profile.skills ? profile.skills.length : 0} skills loaded`;
    }
  }

  // Handle Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const submitBtn = loginForm.querySelector('button');
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    errorMsg.classList.add('hidden');

    try {
      const response = await chrome.runtime.sendMessage({ 
        type: 'LOGIN', 
        payload: { email, password } 
      });

      if (response.success) {
        await checkStatus();
      } else {
        errorMsg.textContent = response.error || 'Login failed';
        errorMsg.classList.remove('hidden');
      }
    } catch (err) {
      errorMsg.textContent = 'Connection error';
      errorMsg.classList.remove('hidden');
    } finally {
      submitBtn.textContent = 'Login';
      submitBtn.disabled = false;
    }
  });

  // Handle Fill Page
  document.getElementById('btn-fill').addEventListener('click', async () => {
    try {
      await chrome.runtime.sendMessage({ type: 'FILL_PAGE' });
      window.close(); // Close popup after triggering fill
    } catch (err) {
      console.error('Error triggering fill:', err);
    }
  });

  // Handle Dashboard Link
  document.getElementById('btn-dashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
  });

  // Handle Logout
  document.getElementById('btn-logout').addEventListener('click', async () => {
    try {
      await chrome.runtime.sendMessage({ type: 'LOGOUT' });
      showLoginView();
    } catch (err) {
      console.error('Error logging out:', err);
    }
  });
});
