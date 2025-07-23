import { Link } from "react-router-dom";

export default function Navigation() {
    function toggleDropdown(e) {
        const el = e.target;
        const parent = el.closest("li");
        const droplinks = parent.querySelector("#dropdownNavbar");
        droplinks.classList.toggle("hidden");
    }

    return (
        <nav className="border-gray-200 bg-black-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="public/BitByBit.png" className="h-8" alt="PixelForge Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        PixelForge
                    </span>
                </Link>

                <button
                    data-collapse-toggle="navbar-multi-level"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-multi-level"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 px-3">Home</Link>
                        </li>
                        <li className="relative">
                            <button
                                className="flex gap-1 items-center w-full py-2 px-3"
                            >
                                <Link to="/gallery">Gallery</Link>
                                <span className="material-symbols-rounded" onClick={toggleDropdown}>keyboard_arrow_down</span>
                            </button>
                            <div
                                id="dropdownNavbar"
                                className="z-10 hidden absolute left-0 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-violet-1000 dark:divide-gray-600"
                            >
                                <ul className="py-2 text-sm">
                                    <li><Link to="/gallery" className="block py-2 px-3">Sprites</Link></li>
                                    <li><Link to="/gallery" className="block py-2 px-3">Tilesets</Link></li>
                                    <li><Link to="/gallery" className="block py-2 px-3">Backgrounds</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/creators" className="block py-2 px-3">Creators</Link>
                        </li>
                        <li>
                            <Link to="/ai" className="block py-2 px-3">AI Models</Link>
                        </li>
                        <li>
                            <Link to="/fonts" className="block py-2 px-3">Fonts</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 px-3">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
