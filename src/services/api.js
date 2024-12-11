import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

const api = axios.create({
    baseURL,
})

// Login user and store token
export const login = async (details) => {
  try {
    const response = await api.post("/api/auth/login", details);
    const { token, user } = response.data;

    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("User", JSON.stringify(user)); // Return user data
    if (user.role === "admin") {
      window.location.href = "/admin"
    } else {
      window.location.href = "/home"
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.response?.data?.error || "Login failed.");
    throw error;
  }
};

// Register new user and log them in
export const signup = async (details) => {
  try {
    await api.post("/api/auth/register", details);
    return await login(details); // Automatically log in user
  } catch (error) {
    console.error("Signup error:", error);
    alert(error.response?.data?.error || "Signup failed.");
    throw error;
  }
};

// Logout user
export const logout = () => {
  toast.success("User logged out successfully");
  localStorage.removeItem("token"); // Clear token from localStorage
  localStorage.removeItem("User"); // Clear user data from localStorage
  setTimeout(() => {
    window.location.href = "/";  // Redirect to login page
  }, 2000); // 2-second delay
};

export default api