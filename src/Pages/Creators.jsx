import { Link } from "react-router-dom";

export default function Creators() {
    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Creators</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>

                        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-[10px] pointer-events-none">
                                        <span className="material-symbols-rounded text-gray-500">
                                            search
                                        </span>
                                    </div>
                                    <input type="text" id="email-address-icon" className="bg-black-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative text-black/50 bg-violet-1000 dark:text-white/50 h-full flex flex-row flex-wrap justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {Array.from({ length: 12 }, (_, i) => (
                        <Link to="/works" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-violet-950 dark:hover:bg-violet-900">
                            <img class="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src="/Pixel Art background Violet theme nature (1).jpg" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bloxal</h5>
                                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <span className="bg-blue-500 text-white px-[15px] rounded-full w-fit">Background</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

        </>
    );
}
