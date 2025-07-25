import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProfileLoader from "../Components/SkeletonLoaders/ProfileLoader";

export default function Creators() {

    const [creators, setCreator] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/data/creators.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured');
                }
                return response.json();
            })
            .then((data) => {
                setCreator(data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error occured: ', error);
            });
    }, []);

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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">Creators</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>

                        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-[10px] pointer-events-none">
                                        <span className="material-symbols-rounded text-gray-500">
                                            search
                                        </span>
                                    </div>
                                    <input type="text" id="email-address-icon" className="bg-black-700 border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 border-gray-600 placeholder-gray-400 text-white" placeholder="Search..." />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-row flex-wrap justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {loading ? (
                        Array.from({ length: 8 }, (_, i) => (
                            <ProfileLoader></ProfileLoader>
                        ))
                    ) : (creators.map((creator) => (
                        <Link to={`/works/${creator.id}`} className="flex flex-col items-center border rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 border-gray-700 bg-violet-950 hover:bg-violet-900">
                            <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src="/Pixel Art background Violet theme nature (1).jpg" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{creator.name}</h5>
                                <p className="mb-3 font-normal text-gray-400">{creator.description}</p>
                                {/* <span className="bg-green-100 w-fit text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Background
                                </span> */}
                            </div>
                        </Link>
                    )))}
                </div>
            </div>

        </>
    );
}
