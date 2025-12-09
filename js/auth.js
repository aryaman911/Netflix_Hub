// js/auth.js

import { apiRequest, apiFormRequest, showToast } from "./api.js";

/**
 * Store user session data
 */
export function setSession(data) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user_id", data.user_id);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
  localStorage.setItem("roles", JSON.stringify(data.roles || []));
}

/**
 * Clear user session
 */
export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("roles");
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

/**
 * Check if user is admin
 */
export function isAdmin() {
  try {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ADMIN");
  } catch {
    return false;
  }
}

/**
 * Get current username
 */
export function getUsername() {
  return localStorage.getItem("username") || "User";
}

/**
 * Login user
 */
export async function login(username, password) {
  const data = await apiFormRequest("/auth/login", {
    username: username,
    password: password,
  });
  setSession(data);
  return data;
}

/**
 * Signup new user
 */
export async function signup(userData) {
  const response = await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return response;
}

/**
 * Logout user
 */
export function logout() {
  clearSession();
  window.location.href = "index.html";
}

/**
 * Require login - redirect to index if not logged in
 */
export function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

/**
 * Require admin - redirect to home if not admin
 */
export function requireAdmin() {
  if (!requireLogin()) return false;
  if (!isAdmin()) {
    showToast("Admin access required", "error");
    window.location.href = "home.html";
    return false;
  }
  return true;
}
