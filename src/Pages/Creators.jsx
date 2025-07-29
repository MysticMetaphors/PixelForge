import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProfileLoader from "../Components/SkeletonLoaders/ProfileLoader";
import { supabase } from "../supabaseClient";
import SearchInput from "../Components/SearchInput";

export default function Creators() {

    const [creators, setCreator] = useState([])
    const [filteredCreators, setFiltered] = useState([]); //SearchInput
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creatorRes = await supabase.from('creators').select('*')
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error);
                setCreator(creatorRes.data)
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
                                <SearchInput data={creators} onResults={setFiltered} column={'name'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-row flex-wrap justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {loading ? (
                            Array.from({ length: 8 }, (_, i) => (
                                <ProfileLoader key={i}/>
                            ))
                    ) : filteredCreators.length === 0 ? (
                        <p>No Items Found :(</p>

                    ) : (filteredCreators.map((creator) => (
                        <div className="flex flex-col items-center border rounded-lg shadow-sm md:flex-row md:max-w-xl border-gray-700 bg-violet-950">
                            <img className="object-cover w-full rounded-t-lg h-full md:h-full md:w-48 md:rounded-none md:rounded-s-lg" src={get_image(creator.image)} alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{creator.name}</h5>
                                <p className="mb-3 font-normal text-gray-400">{creator.description}</p>
                                <div className="flex flex-row gap-[5px]">
                                    {creator.id != 1 ?
                                        <Link
                                            to={creator.link}
                                            className="bg-violet-900 py-[8px] px-[15px] text-white text-sm flex gap-[5px] w-fit items-center"
                                        >
                                            Visit {creator.name} 
                                            <span className="material-symbols-rounded text-[18px]">
                                                arrow_forward
                                            </span>
                                        </Link> : ''}

                                    <Link
                                        to={`/works/${creator.id}`}
                                        className="bg-violet-900 py-[8px] px-[15px] text-white text-sm flex gap-[5px] w-fit items-center"
                                    >
                                        See Works
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>

        </>
    );
}
