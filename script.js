(function() {
  const urlForm = document.getElementById('urlForm');
  const originalUrlInput = document.getElementById('originalUrl');
  const resultDiv = document.getElementById('result');

  // In-memory store for shortened URLs
  const urlMap = new Map();

  // Function to generate a random 6-character alphanumeric string
  function generateShortCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  urlForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const originalUrl = originalUrlInput.value.trim();
    if (!originalUrl) {
      resultDiv.textContent = 'Please enter a valid URL.';
      return;
    }

    // Check if URL already shortened
    for (const [key, value] of urlMap.entries()) {
      if (value === originalUrl) {
        displayShortUrl(key);
        return;
      }
    }

    // Generate unique short code
    let shortCode;
    do {
      shortCode = generateShortCode();
    } while (urlMap.has(shortCode));

    urlMap.set(shortCode, originalUrl);
    displayShortUrl(shortCode);
  });

  function displayShortUrl(code) {
    // For demonstration, the short URL will be shown as current page URL + ?c=code
    const shortUrl = `${window.location.origin}${window.location.pathname}?c=${code}`;
    const originalUrl = urlMap.get(code);
    resultDiv.innerHTML = `Shortened URL: <a href="${shortUrl}" target="_blank" class="short-url" title="${originalUrl}">${shortUrl}</a><br/><small>Original URL: ${originalUrl}</small>`;
  }

  // Optional: Redirect if short code is present in URL query
  function checkRedirect() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code && urlMap.has(code)) {
      window.location.href = urlMap.get(code);
    }
  }

  checkRedirect();
})();
