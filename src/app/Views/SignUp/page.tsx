'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",        // ✅ added email
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
      const response = await fetch("http://localhost:8080/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      setMessage(result);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const homeNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/Views/Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #EBF2FA 0%, #ffffff 50%, #EBF2FA 100%)' }}>
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm p-8 shadow-2xl rounded-3xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #064789 0%, #427AA1 100%)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#064789' }}>Create Account</h2>
            <p style={{ color: '#427AA1' }}>Join us and get started today</p>
          </div>

          {message && (
            <div className="mb-6 p-4 border-l-4 rounded-r-lg" style={{ backgroundColor: '#EBF2FA', borderColor: '#427AA1' }}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" style={{ color: '#427AA1' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm" style={{ color: '#064789' }}>{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#064789' }}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all"
                style={{ 
                  borderColor: '#EBF2FA',
                  backgroundColor: '#EBF2FA',
                  '--tw-ring-color': '#427AA1'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#427AA1';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 2px rgba(66, 122, 161, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EBF2FA';
                  e.target.style.backgroundColor = '#EBF2FA';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#064789' }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all"
                style={{ 
                  borderColor: '#EBF2FA',
                  backgroundColor: '#EBF2FA'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#427AA1';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 2px rgba(66, 122, 161, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EBF2FA';
                  e.target.style.backgroundColor = '#EBF2FA';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#064789' }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all"
                style={{ 
                  borderColor: '#EBF2FA',
                  backgroundColor: '#EBF2FA'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#427AA1';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 2px rgba(66, 122, 161, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#EBF2FA';
                  e.target.style.backgroundColor = '#EBF2FA';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Create a secure password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 text-white font-semibold rounded-xl focus:outline-none transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #064789 0%, #427AA1 100%)',
                boxShadow: '0 0 0 4px rgba(66, 122, 161, 0.2)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #053a6b 0%, #356890 100%)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #064789 0%, #427AA1 100%)';
                }
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={homeNavigation}
              className="w-full py-2 px-4 mt-2 bg-white border font-semibold rounded-xl focus:outline-none transition-all duration-300 shadow"
              style={{ 
                borderColor: '#427AA1',
                color: '#064789'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EBF2FA';
                e.currentTarget.style.borderColor = '#064789';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#427AA1';
              }}
            >
              Already have an account?
            </button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: '#427AA1' }}>
            By creating an account, you agree to our{" "}
            <span className="cursor-pointer underline hover:opacity-80" style={{ color: '#064789' }}>Terms of Service</span> and{" "}
            <span className="cursor-pointer underline hover:opacity-80" style={{ color: '#064789' }}>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}