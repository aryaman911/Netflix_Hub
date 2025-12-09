// API Helper Functions

function getToken() {
    return localStorage.getItem("token");
}

async function apiRequest(endpoint, options = {}) {
    const url = CONFIG.API_BASE_URL + endpoint;
    const token = getToken();
    
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };
    
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    
    const response = await fetch(url, {
        ...options,
        headers,
    });
    
    if (!response.ok) {
        let errorMsg = "Request failed";
        try {
            const data = await response.json();
            errorMsg = data.detail || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
    }
    
    if (response.status === 204) return null;
    return response.json();
}

async function apiFormRequest(endpoint, formData) {
    const url = CONFIG.API_BASE_URL + endpoint;
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
    });
    
    if (!response.ok) {
        let errorMsg = "Request failed";
        try {
            const data = await response.json();
            errorMsg = data.detail || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
    }
    
    return response.json();
}

function showToast(message, type = "info") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    
    const toast = document.createElement("div");
    toast.className = "toast toast-" + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
