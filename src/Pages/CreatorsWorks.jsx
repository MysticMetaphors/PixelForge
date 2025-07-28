import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CardLoader from "../Components/SkeletonLoaders/CardLoader";

export default function CreatorsWorks() {
    const { id } = useParams()
    const [creator, setCreator] = useState({});
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [creatorRes, assetRes] = await Promise.all([
                    supabase.from('creators').select('*').eq('id', id).single(),
                    supabase.from('works').select('*').eq('creator', id)
                ])
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error);
                if (assetRes.error) throw new Error('An Error Occured: ', assetRes.error);
                setCreator(creatorRes.data)
                setAssets(assetRes.data)
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

    function download_file(img) {
        console.log("downloadig: ", img)
        const fetchFile = async () => {
            try {
                const { data, error } = await supabase
                    .storage
                    .from('images')
                    .download(img)
            
                if (error) {
                    console.error("Supabase Data:", data);
                    console.error("Supabase Error:", error);
                    return;
                }

                const url = URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = img.split('/').pop(); 
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url); 

            } catch (error) {
                console.log('An Error Occured: ', error)
            }

        }
        fetchFile()

        return;
    }

    // console.log('creator', creator)
    // console.log('assets', assets)
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
                    {loading ? (
                        Array.from({ length: 8 }, (_, i) => (
                            <CardLoader></CardLoader>
                        ))
                    ) : (assets.map((asset) => (
                        <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700 relative">
                            <a href="#">
                                <img className="rounded-t-lg" src={get_image(asset.image)} alt="Image" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-[16px] font-bold tracking-tight text-white">{asset.title}</h5>
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
                                        <p>License: {asset.license}</p>
                                    </div>

                                    {creator.name == 'Admin' ? (
                                        <span className="material-symbols-rounded cursor-pointer absolute bottom-[20px] right-[20px] text-green-800" onClick={() => download_file(asset.image)}>
                                            download
                                        </span>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
                {assets.length > 8 ? <button className='mt-[100px] bg-violet-900 py-[8px] px-[15px] text-white'>See More</button> : ''}
            </div >

        </>
    );
}
