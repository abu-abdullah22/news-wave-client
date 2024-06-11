import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import usePremium from "../../Hooks/usePremium";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isPremium] = usePremium() ;

    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="p-4 bg-[#2C3E50] text-white dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <Link to={'/'} className="flex items-center p-2">
                        <h2 className="text-3xl font-bold hover:text-[#4C4C4C]">NewsWave</h2>
                    </Link>
                    <ul className={`items-stretch space-x-3 hidden lg:flex font-medium `}>
                        <li className="flex">
                            <NavLink to={'/'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Home</NavLink>
                        </li>
                      { user && <li className="flex">
                            <NavLink to={'/addArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Add Articles</NavLink>
                        </li>}
                        <li className="flex">
                            <NavLink to={'/allArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>All Articles</NavLink>
                        </li>
                      { user && <li className="flex">
                            <NavLink to={'/subscription'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Subscription</NavLink>
                        </li>}
                       {user && isAdmin &&  <li className="flex">
                            <NavLink to={'/dashboard/admin'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Dashboard</NavLink>
                        </li>}
                        { user && <li className="flex">
                            <NavLink to={'/myArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>My Articles</NavLink>
                        </li>}
                      { user && isPremium && <li className="flex">
                            <NavLink to={'/premiumArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Premium Articles</NavLink>
                        </li>}
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {user ? (
                        <>
                            <Link to="/profile">
                                <img className="mr-4 w-[50px]" referrerPolicy="no-referrer" src={user?.photoURL} alt="User Profile" />
                            </Link>
                            <button onClick={handleLogOut} className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 mr-4">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 mr-4">Log in</button>
                            </Link>
                            <Link to="/register">
                                <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Register</button>
                            </Link>
                        </>
                    )}
                </div>
                <button className="p-4 lg:hidden" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="flex flex-col lg:hidden">
                    <ul className="space-y-2 font-medium">
                        <li className="flex">
                            <NavLink to={'/'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>Home</NavLink>
                        </li>
                     { user &&  <li className="flex">
                            <NavLink to={'/addArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>Add Articles</NavLink>
                        </li>}
                        <li className="flex">
                            <NavLink to={'/allArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>All Articles</NavLink>
                        </li>
                       { user && <li className="flex">
                            <NavLink to={'/subscription'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>Subscription</NavLink>
                        </li>}
                       { user && isAdmin && <li className="flex">
                            <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>Dashboard</NavLink>
                        </li>}
                      { user && <li className="flex">
                            <NavLink to={'/myArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>My Articles</NavLink>
                        </li>}
                        <li className="flex">
                           { user && isPremium && <NavLink to={'/premiumArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 text-[#FFAD21]" : "flex items-center px-4"}>Premium Articles</NavLink>}
                        </li>
                        {user ? (
                            <>
                                <Link to="/profile" className="flex items-center px-4">
                                    <img className="mr-4 w-[50px]" referrerPolicy="no-referrer" src={user?.photoURL} alt="User Profile" />
                                </Link>
                                <button onClick={handleLogOut} className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center px-4">
                                    <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Log in</button>
                                </Link>
                                <Link to="/register" className="flex items-center px-4">
                                    <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Register</button>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
