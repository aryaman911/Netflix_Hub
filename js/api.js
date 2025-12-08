// js/api.js
import { API_BASE_URL } from "./config.js";

export function getAuthToken() {
  return localStorage.getItem("access_token");
}

export function setAuthToken(token) {
  localStorage.setItem("access_token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_roles");
  localStorage.removeItem("user_id");
}

export function setUserInfo({ roles = [], user_id = null }) {
  localStorage.setItem("user_roles", JSON.stringify(roles));
  if (user_id !== null) {
    localStorage.setItem("user_id", String(user_id));
  }
}

export function getUserRoles() {
  const raw = localStorage.getItem("user_roles");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function isAdmin() {
  const roles = getUserRoles();
  return roles.includes("ADMIN") || roles.includes("EMPLOYEE");
}

// Generic helper for API requests
export async function apiRequest(path, options = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("Content-Type") || "";

  let data = null;
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      (data && data.detail) ||
      (typeof data === "string" ? data : "Request failed");
    throw new Error(message);
  }

  return data;
}