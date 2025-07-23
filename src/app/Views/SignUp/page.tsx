'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER", // default role
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: Response = await fetch("http://localhost:8080/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result: string = await response.text();
      setMessage(result);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };


  const router = useRouter();

  function homeNavigation(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    router.push("/Views/Login");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="max-w-md w-full">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 shadow-2xl rounded-3xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us and get started today</p>
          </div>

          {/* Message display */}
          {message && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700">{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            {/* Role selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Account Type
              </label>
              <div className="relative">
               
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="USER">Standard User</option>
                  <option value="ADMIN">Administrator</option>
                  <option value="GUEST">Guest Access</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Role descriptions */}
              <div className="mt-2 text-xs text-gray-500">
                {formData.role === 'USER' && "• Access to standard features and content"}
                {formData.role === 'ADMIN' && "• Full system access and management capabilities"}
                {formData.role === 'GUEST' && "• Limited access to public content only"}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={homeNavigation}
              className="w-full py-2 px-4 mt-2 bg-white border border-green-500 text-green-700 font-semibold rounded-xl hover:bg-green-50 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow"
            >
              Already have an account?
            </button>



            {/* Terms and conditions note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By creating an account, you agree to our{' '}
              <span className="text-green-600 hover:text-green-700 cursor-pointer underline">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-green-600 hover:text-green-700 cursor-pointer underline">
                Privacy Policy
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}