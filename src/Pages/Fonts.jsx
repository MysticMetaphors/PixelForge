import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import SearchInput from '../Components/SearchInput';
import AssetLicense from '../Components/AssetLicense';
import CardLoader from '../Components/SkeletonLoaders/CardLoader';
import { Link } from 'react-router-dom';

export default function Fonts() {
    const [font, setFont] = useState([]);
    const [filteredFont, setFiltered] = useState([]); //SearchInput
    const [creator, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const [fontRes, creatorRes] = await Promise.all([
                    supabase.from('fonts').select('*'),
                    supabase.from('creators').select('*'),
                ])

                if (fontRes.error) throw new Error('An Error Occured: ', fontRes.error)
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error)

                setFont(fontRes.data)
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
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Fonts</h1>
                    <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art fonts and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>

                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                            <SearchInput data={font} onResults={setFiltered} column={'title'}/>

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

             <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap' id='search_area'>
                    {loading ? (
                        Array.from({ length: 8 }, (_, i) => (
                            <CardLoader key={i} />
                        ))
                    ) : filteredFont.length === 0 ? (
                        <p>No Items Found :(</p>

                    ) : (filteredFont.map((font) => (
                        <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700">
                            <Link to={font.link}>
                                <img className="rounded-t-lg" src={get_image(font.image)} alt="Image" />
                            </Link>
                            <div className="p-5">
                                <Link to={font.link}>
                                    <h5 className="mb-2 text-[20px] font-bold tracking-tight text-white">{font.title}</h5>
                                </Link>

                                <div className="flex flex-col">
                                    <div className="text-sm text-gray-400 mt-[10px]">
                                        {get_creator(font.creator)}
                                        <AssetLicense asset={font} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                    )}
                </div>
                {font.length > 12 && (
                    <button className='mt-[100px] bg-violet-900 py-[8px] px-[15px] text-white cursor-pointer'>See More</button>
                )}
            </div>
        </>
    );
}
