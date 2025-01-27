import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../Provider/AuthUserContext";
import axios from "axios";

const Layout: React.FC = () => {


  const { user, token, setUser, setToken } = useContext(AuthUserContext);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navigate = useNavigate();

  function logMeOut(e: React.FormEvent) {

    axios.delete("/api/logout", {}).then((_) => {
      alert("You have been logged out");
    }).catch((_) => {
      console.error("Failed to log out");
    });

    e.preventDefault();
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  }



  return <div>
    <header className="bg-blue-600 p-4 shadow-md">
      <nav className="container mx-auto flex justify-end gap-10 items-center">
        <Link to="/" className="text-white text-sm font-semibold">
          Home
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/forms" className="text-white text-sm hover:underline font-semibold">
              Manage Forms
            </Link>

            <div className="relative">
              <button 
              className="text-white text-sm hover:underline font-semibold flex items-center space-x-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              >
              <span className="inline-block w-8 h-8 rounded-full bg-blue-300 text-center leading-8">
                {(user.name[0]).toUpperCase()}
              </span>
              {/* <span>{(user.name).toUpperCase()}</span> */}
              </button>
              {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 min-w-48 w-fit bg-blue-200 rounded-md shadow-lg py-1 z-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full text-left px-4 py-2 text-sm border-b ">
                  <div>
                    {user.name}
                  </div>
                  <div>
                    {user.email}
                  </div>
                  
                </div>
                <div className="block w-full text-left px-4 py-2 text-sm">
                  
                </div>
                <form onSubmit={logMeOut}>
                <button className="block w-full rounded-2xl text-left px-4 py-2 text-sm text-black hover:text-white hover:bg-red-400 border-2 border-red-500 hover:border-white animate-bounce hover:animate-none">
                  Logout
                </button>
                </form>
              </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/guest" className="text-white text-sm hover:underline">
              Register
            </Link>
            <Link to="/login" className="text-white text-sm hover:underline">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>

    <main>
      <Outlet />
    </main>
  </div>;
}

export default Layout;