// js/auth.js

function setSession(data) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user_id", data.user_id);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
  localStorage.setItem("roles", JSON.stringify(data.roles || []));
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("roles");
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function isAdmin() {
  try {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ADMIN");
  } catch {
    return false;
  }
}

function getUsername() {
  return localStorage.getItem("username") || "User";
}

async function login(username, password) {
  const data = await apiFormRequest("/auth/login", {
    username: username,
    password: password,
  });
  setSession(data);
  return data;
}

async function signup(userData) {
  const response = await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return response;
}

function logout() {
  clearSession();
  window.location.href = "index.html";
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  if (!isAdmin()) {
    showToast("Admin access required", "error");
    window.location.href = "home.html";
    return false;
  }
  return true;
}
