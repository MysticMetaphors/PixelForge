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
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Fonts</h1>
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

                            <select name="" id="" className="bg-black-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5  dark:border-gray-600 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <div className="max-w-sm p-4 bg-violet-950 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Press Start 2P</h2>

                        <p className="text-lg mb-4">
                            The quick brown fox jumps over the lazy dog
                        </p>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>By: Google Fonts</p>
                            <p>License: Open Font License</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
