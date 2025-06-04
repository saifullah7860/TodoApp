import { useState } from "react";

const LoginSignup = ({ onAuthorized }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    if (onAuthorized) onAuthorized();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded p-8 w-full max-w-md">
        <div className="flex justify-center mb-6 gap-5 rounded-2xl">
          <button
            className={`px-4 py-2 font-semibold rounded-xs cursor-pointer ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-xs cursor-pointer ${
              !isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className=" text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className=" text-gray-700 mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        {isLogin ? (
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
