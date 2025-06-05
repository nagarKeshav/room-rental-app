import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-3 sm:px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-2 sm:mr-3 h-8 sm:h-10 md:h-12 w-auto object-contain"
                            alt="Logo"
                        />
                    </Link>

                    {/* Desktop Action Buttons */}
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 mr-1 sm:mr-2 focus:outline-none transition-colors duration-200"
                        >
                            Log in
                        </Link>
                        {/* <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 mr-1 sm:mr-2 focus:outline-none transition-colors duration-200"
                        >
                            Sign up
                        </Link> */}
                        {
                            
                        }
                        
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div
                        className={`${
                            isMenuOpen ? 'block' : 'hidden'
                        } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300 ease-in-out`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 xl:space-x-8 lg:mt-0 bg-white lg:bg-transparent border-t border-gray-200 lg:border-0 pt-4 lg:pt-0">
                            <li>
                                <NavLink 
                                    to="/"
                                    className={({isActive}) =>
                                        `block py-2 px-3 lg:px-0 text-sm sm:text-base duration-200 ${
                                            isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                                        } border-b border-gray-100 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 transition-colors`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/about"
                                    className={({isActive}) =>
                                        `block py-2 px-3 lg:px-0 text-sm sm:text-base duration-200 ${
                                            isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                                        } border-b border-gray-100 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 transition-colors`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/Contact"
                                    className={({isActive}) =>
                                        `block py-2 px-3 lg:px-0 text-sm sm:text-base duration-200 ${
                                            isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                                        } border-b border-gray-100 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 transition-colors`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/add-post"
                                    className={({isActive}) =>
                                        `block py-2 px-3 lg:px-0 text-sm sm:text-base duration-200 ${
                                            isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                                        } border-b border-gray-100 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 transition-colors`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Add post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/all-post"
                                    className={({isActive}) =>
                                        `block py-2 px-3 lg:px-0 text-sm sm:text-base duration-200 ${
                                            isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                                        } border-b border-gray-100 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 transition-colors`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    All posts
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}