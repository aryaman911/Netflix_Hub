// js/config.js

// API Base URL - Change this to your backend URL
export const API_BASE_URL = "https://netflix-hub-backend.onrender.com";

// Placeholder image as inline SVG (no external requests)
export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
  <rect fill="#1a1a2e" width="300" height="450"/>
  <text fill="#e50914" font-family="Arial" font-size="20" x="50%" y="50%" text-anchor="middle" dy=".3em">No Image</text>
</svg>
`)}`;

// Placeholder banner as inline SVG
export const PLACEHOLDER_BANNER = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400">
  <rect fill="#1a1a2e" width="1200" height="400"/>
  <text fill="#e50914" font-family="Arial" font-size="48" x="50%" y="50%" text-anchor="middle" dy=".3em">MOVIEHUB</text>
</svg>
`)}`;
