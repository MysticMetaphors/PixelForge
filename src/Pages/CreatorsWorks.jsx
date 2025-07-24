import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CreatorsWorks() {
    const { id } = useParams()
const [creator, setCreator] = useState({});
    const [assets, setAssets] = useState([])

    useEffect(() => {
        fetch('/src/data/creators.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured')
                }
                return response.json()
            })
            .then((data) => {
                const foundItem = data.find((item) => item.id == id)
                get_assets(foundItem.id)
                setCreator(foundItem)
            })
            .catch((error) => {
                console.error('Error occured: ', error)
            })
    }, [])

    function get_assets(id) {
        fetch('/src/data/assets.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error occured')
                }
                return response.json()
            })
            .then((data) => {
                const foundItem = data.filter((item) => item.creator == id)
                setAssets(foundItem)
            })
            .catch((error) => {
                console.error('Error occured: ', error)
            })
    }

    console.log('creator', creator)
    console.log('assets', assets)
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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{creator.name}'s Works</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">{creator.description}</p>

                        {/* <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
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
                        </div> */}

                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative text-black/50 bg-violet-1000 dark:text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {assets.map((asset) => (
                        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-violet-950 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={asset.url} alt="Image" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-[16px] font-bold tracking-tight text-black-500 dark:text-white">{asset.title}</h5>
                                </a>

                                <div className="flex flex-col">
                                    <span className="bg-green-100 w-fit text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        {asset.tags}
                                    </span>

                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-[10px]">
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
                <button className='mt-[100px] bg-violet-900 py-[8px] px-[15px] text-white'>See More</button>
            </div>

        </>
    );
}
