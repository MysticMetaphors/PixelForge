import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "../Components/SkeletonLoaders/ContentLoader";

export default function AI() {

    const [ai_models, setModel] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/data/ai.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('An Error Occured!')
                }
                return response.json()
            })
            .then((data) => {
                setModel(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('An Error Occured: ', error)
            })
    }, [])

    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">AI Models</h1>
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

                            {/* <select name="" id="" className="bg-black-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5  dark:border-gray-600 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option hidden selected value="">Category</option>
                                <option value="">All</option>
                                <option value="retro">Retro / Pixel Art</option>
                                <option value="sci-fi">Sci-Fi / Futuristic</option>
                                <option value="fantasy">Fantasy / Medieval</option>
                                <option value="horror">Horror / Thriller</option>
                                <option value="racing">Racing / Sports</option>
                                <option value="casual">Casual / Puzzle / Kids</option>
                            </select> */}
                        </form>


                    </div>

                </div>
            </div>

            <div className="h-full bg-violet-1000 pb-[100px] flex flex-wrap justify-center gap-[20px]">
                {loading ? (
                    Array.from({ length: 9 }, (_, i) => (
                        <ContentLoader></ContentLoader>
                    ))
                ) : (ai_models.map((ai) => (
                    <div className="flex flex-col max-w-sm bg-violet-950 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {ai.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 font-normal">
                            {ai.description}
                        </p>

                        <div className="grow content-end">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-violet-100 text-violet-800 font-medium px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300">
                                    {ai.type}
                                </span>
                                {ai.opensource != false ?
                                    <span className="bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        Open Source
                                    </span> : ''
                                }
                            </div>

                            <Link to={ai.link} className="inline-flex items-center text-sm font-medium text-white">
                                View Model
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M12.293 3.293a1 1 0 011.414 0L19 8.586a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414-1.414L15.586 10H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                    </div>

                )))}
            </div>
        </>
    );
}
