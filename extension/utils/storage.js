export const storage = {
  // Save token to session storage (secure, cleared when browser closes)
  async setToken(token) {
    if (!chrome.storage || !chrome.storage.session) {
      console.warn("Session storage not available, falling back to local");
      return new Promise((resolve) => chrome.storage.local.set({ token }, resolve));
    }
    return new Promise((resolve) => chrome.storage.session.set({ token }, resolve));
  },

  // Retrieve token
  async getToken() {
    if (!chrome.storage || !chrome.storage.session) {
      return new Promise((resolve) => {
        chrome.storage.local.get(['token'], (result) => resolve(result.token));
      });
    }
    return new Promise((resolve) => {
      chrome.storage.session.get(['token'], (result) => resolve(result.token));
    });
  },

  // Clear token
  async clearToken() {
    if (!chrome.storage || !chrome.storage.session) {
      return new Promise((resolve) => chrome.storage.local.remove('token', resolve));
    }
    return new Promise((resolve) => chrome.storage.session.remove('token', resolve));
  },

  // Save profile to local storage (persists across sessions)
  async setProfile(profile) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ profile }, resolve);
    });
  },

  // Retrieve profile
  async getProfile() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['profile'], (result) => resolve(result.profile));
    });
  },

  // Clear all data
  async clearAll() {
    await this.clearToken();
    return new Promise((resolve) => {
      chrome.storage.local.remove('profile', resolve);
    });
  }
};
