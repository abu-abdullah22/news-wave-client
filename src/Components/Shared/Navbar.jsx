import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="p-4 bg-[#2C3E50] text-white dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <Link to={'/'} className="flex items-center p-2">
                       <h2 className="text-3xl font-bold hover:text-[#4C4C4C]">NewsWave</h2>
                    </Link>
                    <ul className="items-stretch hidden space-x-3 lg:flex font-medium ">
                        <li className="flex">
                            <NavLink to={'/'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Home </NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/addArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Add Articles</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/allArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>All Articles</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/subscription'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Subscription</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Dashboard</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/myArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>My Articles</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to={'/premiumArticles'} className={({ isActive }) => isActive ? "flex items-center px-4 -mb-1 text-[#FFAD21]" : "flex items-center px-4 -mb-1"}>Premium Articles</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button className="px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50 btn border-none">Log in</button>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;