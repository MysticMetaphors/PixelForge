import { useEffect } from 'react';

export default function Fonts() {

    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Fonts</h1>
                    <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>

                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-[10px] pointer-events-none">
                                    <span className="material-symbols-rounded text-gray-500">
                                        search
                                    </span>
                                </div>
                                  <input type="text" id="email-address-icon" className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                                </div>

                                <select name="" id="" className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400">
                                <option hidden selected value="">Category</option>
                                <option value="">All</option>
                                <option value="retro">Retro / Pixel Art</option>
                                <option value="sci-fi">Sci-Fi / Futuristic</option>
                                <option value="fantasy">Fantasy / Medieval</option>
                                <option value="horror">Horror / Thriller</option>
                                <option value="racing">Racing / Sports</option>
                                <option value="casual">Casual / Puzzle / Kids</option>
                            </select>
                        </form>


                    </div>

                </div>
            </div>

            <div className="h-full bg-violet-1000 pb-[100px] flex flex-wrap justify-center gap-[20px]">
                {Array.from({ length: 12 }, (_, i) => (
                    <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src='/Pixel Art Backgroun scenery.jpg' alt="Image" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-[20px] font-bold tracking-tight text-white">Pixelify</h5>
                            </a>

                            <div className="flex-row">
                                <span className="w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300 mr-[8px]">
                                    Retro
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <div className="text-sm text-gray-400 mt-[10px]">
                                    <p>By: Google Fonts</p>
                                    <p>License: Open Font License</p>
                                </div>
                            </div>

                            {/* <a href="#" className="inline-flex items-center  text-sm font-medium text-center text-black-500">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" alt="test" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a> */}
                        </div>


                    </div>
                ))}
            </div>
        </>
    );
}
