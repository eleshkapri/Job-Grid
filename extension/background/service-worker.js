import { storage } from '../utils/storage.js';

const API_BASE = 'http://localhost:3001';

// Register message listener synchronously
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request.type);

  // Use an async function to handle the logic and send the response back
  const handleMessage = async () => {
    try {
      switch (request.type) {
        case 'LOGIN':
          return await handleLogin(request.payload);
        case 'LOGOUT':
          return await handleLogout();
        case 'GET_STATUS':
          return await handleGetStatus();
        case 'GET_PROFILE':
          return await handleGetProfile();
        case 'API_REQUEST':
          return await handleApiRequest(request.payload);
        case 'TRACK_APPLICATION':
          return await handleTrackApplication(request.payload);
        case 'FILL_PAGE':
          return await handleFillPage();
        default:
          throw new Error('Unknown message type');
      }
    } catch (error) {
      console.error('Error handling message:', error);
      return { success: false, error: error.message };
    }
  };

  handleMessage().then((response) => {
    sendResponse(response);
  });

  return true; // Keep message channel open for async response
});

// Handlers
async function handleLogin({ email, password }) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    await storage.setToken(data.token);
    
    // Fetch profile immediately after login
    await handleGetProfile();

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function handleLogout() {
  await storage.clearAll();
  return { success: true };
}

async function handleGetStatus() {
  const token = await storage.getToken();
  const profile = await storage.getProfile();
  return {
    isAuthenticated: !!token,
    profile,
  };
}

async function handleGetProfile() {
  const token = await storage.getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch profile');

  const profile = await response.json();
  await storage.setProfile(profile);
  return { success: true, profile };
}

async function handleApiRequest({ endpoint, method = 'GET', body }) {
  const token = await storage.getToken();
  if (!token) throw new Error('Not authenticated');

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

  const data = await response.json();
  return { success: true, data };
}

async function handleTrackApplication({ jobTitle, company, source, sourceUrl }) {
  const token = await storage.getToken();
  if (!token) return { success: false, error: 'Not authenticated' };

  try {
    const response = await fetch(`${API_BASE}/api/applications`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: jobTitle, company, source, url: sourceUrl }),
    });

    if (!response.ok) throw new Error('Failed to track application');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function handleFillPage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    chrome.tabs.sendMessage(tab.id, { type: 'TRIGGER_AUTOFILL' });
    return { success: true };
  }
  return { success: false, error: 'No active tab found' };
}
