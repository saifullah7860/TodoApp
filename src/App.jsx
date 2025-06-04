import { useState } from "react";
import LoginSignup from "./components/LoginSignup";
import Todo from "./components/Todo";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <LoginSignup onAuthorized={() => setIsAuthenticated(true)} />
      ) : (
        <div className="bg-slate-900 grid py-4 min-h-screen">
          <Todo />
        </div>
      )}
    </>
  );
};

export default App;
