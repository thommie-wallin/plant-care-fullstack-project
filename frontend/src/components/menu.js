import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowPlants(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-700">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <Link
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  to="/"
                >
                  <div className="flex align-center justify-center">
                    <span className="mr-1">Plant care</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-leaf"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#00b341"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                      <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                    </svg>
                  </div>
                </Link>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none hover:bg-indigo-800"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col w-full lg:w-auto lg:flex-row list-none lg:ml-auto">
                  <li onClick={() => setMenuOpen(!menuOpen)}>
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  {showAdminBoard && (
                    <li onClick={() => setMenuOpen(!menuOpen)}>
                      <Link
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        to="/admin"
                      >
                        Admin Board
                      </Link>
                    </li>
                  )}
                  {currentUser ? (
                    <div
                      className="flex flex-col lg:flex-row"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <li>
                        <Link
                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          to="/profile"
                        >
                          {currentUser.username}
                        </Link>
                      </li>
                      {showPlants && (
                        <li onClick={() => setMenuOpen(!menuOpen)}>
                          <Link
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                            to="/plants"
                          >
                            Plants
                          </Link>
                        </li>
                      )}
                      <li onClick={() => setMenuOpen(!menuOpen)}>
                        <a
                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          href="/"
                          onClick={logOut}
                        >
                          Logout
                        </a>
                      </li>
                    </div>
                  ) : (
                    <div className="flex flex-col lg:flex-row">
                      <li onClick={() => setMenuOpen(!menuOpen)}>
                        <Link
                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          to="/login"
                        >
                          Login
                        </Link>
                      </li>
                      <li onClick={() => setMenuOpen(!menuOpen)}>
                        <Link
                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          to="/register"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
