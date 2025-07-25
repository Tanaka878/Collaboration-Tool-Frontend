'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText || "Login failed.");
        return;
      }

      const result = await response.json();
      localStorage.setItem("username", result.username);
      localStorage.setItem("email", result.email);
      setMessage("Login successful!");
      router.push("/Views/Layout");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleSignUp(): void {
    router.push("/Views/SignUp");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebf2fa] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-md p-8 shadow-xl rounded-3xl border border-[#427aa1]/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#064789] rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#064789] mb-1">Welcome Back</h2>
            <p className="text-[#427aa1]">Sign in to your account</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#064789] mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-4 py-3 border border-[#427aa1]/30 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#427aa1] focus:border-[#427aa1] transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#064789] mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-4 py-3 border border-[#427aa1]/30 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#427aa1] focus:border-[#427aa1] transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#064789] to-[#427aa1] text-white font-semibold rounded-xl hover:from-[#05386b] hover:to-[#336b93] focus:outline-none focus:ring-4 focus:ring-[#427aa1]/50 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <span className="text-sm text-[#427aa1]">Don&apos;t have an account?</span>
            </div>

            {/* Sign up Button */}
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full py-3 px-4 border border-[#427aa1]/50 text-[#064789] font-semibold rounded-xl hover:bg-[#ebf2fa] focus:outline-none focus:ring-4 focus:ring-[#427aa1]/30 transition-all"
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

