import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CardLoader from "../Components/SkeletonLoaders/CardLoader";
import ContentLoader from "../Components/SkeletonLoaders/ContentLoader";
import { supabase } from "../supabaseClient";
import AssetLicense from "../Components/AssetLicense";

export default function Welcome() {

    function goToGallery() {
        window.location.href = "/gallery";
    }

    const [assets, setAsset] = useState([])
    const [creator, setCreator] = useState(null)
    const [ai_models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [creatorsRes, worksRes, aiModelsRes] = await Promise.all([
                    supabase.from('creators').select('*'),
                    supabase.from('works').select('*'),
                    supabase.from('ai_models').select('*')
                ]);

                if (creatorsRes.error) throw creatorsRes.error;
                if (worksRes.error) throw worksRes.error;
                if (aiModelsRes.error) throw aiModelsRes.error;

                setCreator(creatorsRes.data);
                setAsset(worksRes.data.slice(0, 9));
                setModels(aiModelsRes.data.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error.message);
            }
        };

        fetchData();
    }, []);

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
        return <p>By: <Link to={`/works/${id}`} className="hover:underline">{findItem.name ?? 'Error Occured'}</Link></p>
    }

    // console.log("creator: ",creator)
    // console.log("assets: ",assets)
    // console.log("ai_models: ",ai_models)

    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature.jpg')`,
                }}
            >
                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="w-32 h-32 hidden md:block animate-float absolute top-[200px] left-[100px]" />
                <img src="https://flowbite.com/docs/images/logo.svg" className="w-32 h-32 hidden md:block animate-float absolute top-[300px] right-[100px]" /> */}

                <div className="flex flex-col justify-center items-center h-full pt-[100px]">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white"> Helping creators craft their worlds</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200">
                            At PixelForge we showcase free pixel art assets and AI models shared by their rightful creators, helping developers, artists, and hobbyists craft immersive games and unlock their creative potential.
                        </p>

                        <div className="flex justify-center mt-4">
                            <Link
                                to={'/About'}
                                className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center"
                            >
                                About
                                <span className="material-symbols-rounded text-[18px]">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-violet-1000 flex flex-row flex-wrap gap-[20px] justify-center pt-[100px]'>
                {loading ? (
                    Array.from({ length: 5 }, (_, i) => (
                        <ContentLoader></ContentLoader>
                    ))
                ) : (ai_models.map((ai) => (
                    <div className="max-w-sm p-6 border rounded-lg shadow-sm bg-violet-950 border-gray-700">
                        <Link to={ai.link}>
                            <div className="flex flex-row gap-[10px] h-fit w-full items-center">
                                <img src={ai.icon} alt="icon" className="h-[50px] w-auto" />
                                <h3 className="text-2xl font-bold text-white">
                                    {ai.name}
                                </h3>
                            </div>
                        </Link>
                        <p className="mb-3 font-normal ext-gray-400">{ai.description}</p>
                    </div>
                )))}
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full pl-auto pr-auto flex flex-col justify-start items-center md:p-[100px] px-0 py-[50px]">
                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="w-32 h-32 hidden md:block animate-float absolute top-[200px] left-[100px]" />
                <img src="https://flowbite.com/docs/images/logo.svg" className="w-32 h-32 hidden md:block animate-float absolute top-[50%] right-[100px]" />
                <img src="https://flowbite.com/docs/images/logo.svg" className="w-32 h-32 hidden md:block animate-float absolute top-[80%] left-[100px]" /> */}
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {loading ? (
                        Array.from({ length: 9 }, (_, i) => (
                            <CardLoader></CardLoader>
                        ))
                    ) : (assets.map((asset) => (
                        <div className="max-w-xs border border-gray-200 rounded-lg shadow-sm bg-violet-950 border-gray-700">
                            <Link to={asset.link}>
                                <img className="rounded-t-lg" src={get_image(asset.image)} alt="Image" />
                            </Link>
                            <div className="p-5">
                                <Link to={asset.link}>
                                    <h5 className="mb-2 text-[20px] font-bold tracking-tight text-white">{asset.title}</h5>
                                </Link>

                                <div className="flex flex-col">
                                    <div className="flex-row">
                                        <span className=" w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300 mr-[8px]">
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
                                        <AssetLicense asset={asset} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )))}
                </div>
                {assets.length >= 9 && (
                    <button onClick={goToGallery} className='mt-[100px] bg-violet-900 py-[8px] px-[15px] text-white cursor-pointer'>See More</button>
                )}
            </div>
        </>
    );
}
