import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LoginSignup from "./components/LoginSignup";
import Todo from "./components/Todo";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <span className="text-white text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated ? (
        <LoginSignup onAuthorized={() => setIsAuthenticated(true)} />
      ) : (
        <div className="bg-slate-900 grid py-4 min-h-screen">
          <Todo onLogout={handleLogout} />
        </div>
      )}
    </>
  );
};

export default App;
