import { useEffect, useState } from 'react';
import CardLoader from '../Components/SkeletonLoaders/CardLoader';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import SearchInput from '../Components/SearchInput';
import SelectInput from '../Components/SelectInput';

export default function Gallery() {
    const [works, setWorks] = useState([]);
    const [filteredWorks, setFiltered] = useState([]); //SearchInput
    const [creator, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [assetRes, creatorRes] = await Promise.all([
                    supabase.from('works').select('*'),
                    supabase.from('creators').select('*'),
                ])

                if (assetRes.error) throw new Error('An Error Occured: ', assetRes.error)
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error)

                setWorks(assetRes.data)
                setCreators(creatorRes.data)
                console.log("Fetch Data")
                setLoading(false)
            } catch (error) {
                console.log('An Error Occured: ', error)
            }
        }

        fetchData()
    }, [])

    function get_image(img) {
        const imageUrl = supabase
            .storage
            .from('images')
            .getPublicUrl(img)
            .data
            .publicUrl;

        return imageUrl
    }

    function get_creator(id) {
        const findItem = creator.find((item) => item.id == id)
        return <p>By: <Link to={`/works/${id}`} className='hover:underline'>{findItem.name ?? 'Error Occured'}</Link></p>
    }

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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Gallery</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>

                        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                                <SearchInput data={works} onResults={setFiltered} column={'title'} />
                                <SelectInput option={['All','Sprite','Tilesets','Backgrounds']} placeholder='Category'/>

                                {/* <select name="" id="" className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400">
                                    <option hidden selected value="">Category</option>
                                    <option value="">All</option>
                                    <option value="">Sprite</option>
                                    <option value="">Tilesets</option>
                                    <option value="">Backgrounds</option>
                                </select> */}
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap' id='search_area'>
                    {loading ? (
                        Array.from({ length: 8 }, (_, i) => (
                            <CardLoader key={i} />
                        ))
                    ) : filteredWorks.length === 0 ? (
                        <p>No Items Found :(</p>

                    ) : (filteredWorks.map((asset) => (
                        <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={get_image(asset.image)} alt="Image" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-[20px] font-bold tracking-tight text-white">{asset.title}</h5>
                                </a>

                                <div className="flex flex-col">
                                    <div className="flex-row">
                                        <span className="w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300 mr-[8px]">
                                            {asset.tags}
                                        </span>
                                        {asset.generated != false && (
                                            <span className="content-center bg-blue-900 w-fit text-blue-300 font-medium px-2.5 py-0.5 rounded">
                                                <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                                                    auto_awesome
                                                </span> AI
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-sm text-gray-400 mt-[10px]">
                                        {get_creator(asset.creator)}
                                        <p>License: {asset.license}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                    )}
                </div>
                {works.length > 12 && (
                    <button className='mt-[100px] bg-violet-900 py-[8px] px-[15px] text-white cursor-pointer'>See More</button>
                )}
            </div>

        </>
    );
}
