import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CreatorsWorks() {
    const { id } = useParams()
    const [creator, setCreator] = useState({});
    const [assets, setAssets] = useState([])

    useEffect(() => {
        fetch('/data/creators.json')
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
        fetch('/data/assets.json')
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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">{creator.name}'s Works</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200">{creator.description}</p>

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
                                    <option value="">Sprite</option>
                                    <option value="">Tilesets</option>
                                    <option value="">Backgrounds</option>
                                </select>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {assets.map((asset) => (
                        <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={asset.url} alt="Image" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-[16px] font-bold tracking-tight text-white">{asset.title}</h5>
                                </a>

                                <div className="flex flex-col">
                                    <span className="w-fit  text-xs font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                                        {asset.tags}
                                    </span>

                                    <div className="text-sm text-gray-400 mt-[10px]">
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
