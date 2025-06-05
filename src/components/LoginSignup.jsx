import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const LoginSignup = ({ onAuthorized }) => {
  const [showLogin, setShowLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        setLoginEmail("");
        setLoginPassword("");
        localStorage.setItem("userUID", userCredential.user.uid);
        if (onAuthorized) onAuthorized();
      })
      .catch((err) => {
        setLoginError(err.message);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    if (signupPassword !== confirmPassword) {
      setSignupError("Passwords do not match");
      setSignupLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        console.log(userCredential);
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
        localStorage.setItem("userUID", userCredential.user.uid);
        setShowLogin(true);
      })
      .catch((err) => {
        setSignupError(err.message);
      })
      .finally(() => {
        setSignupLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded p-8 w-full max-w-md">
        <div className="flex justify-center mb-6 gap-5 rounded-2xl">
          <button
            className={`px-4 py-2 font-semibold rounded-xs cursor-pointer ${
              showLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-xs cursor-pointer ${
              !showLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setShowLogin(false)}
          >
            Signup
          </button>
        </div>
        {showLogin ? (
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
                type="email"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className=" text-gray-700 mb-1 font-medium">
                Password
              </label>
              <input
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
                type="password"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your password"
                required
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm font-medium">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              disabled={loginLoading}
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                onChange={(e) => setSignupEmail(e.target.value)}
                value={signupEmail}
                type="email"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className=" text-gray-700 mb-1 font-medium">
                Password
              </label>
              <input
                onChange={(e) => setSignupPassword(e.target.value)}
                value={signupPassword}
                type="password"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className=" text-gray-700 mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {signupError && (
              <div className="text-red-500 text-sm font-medium">
                {signupError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              disabled={signupLoading}
            >
              {signupLoading ? "Signing up..." : "Signup"}
            </button>
          </form>
        )}
        {showLogin ? (
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setShowLogin(true)}
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
