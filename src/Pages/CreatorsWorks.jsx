import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CardLoader from "../Components/SkeletonLoaders/CardLoader";
import SelectInput from "../Components/SelectInput";
import SearchInput from "../Components/SearchInput";
import AssetLicense from "../Components/AssetLicense";

export default function CreatorsWorks() {
    const { id } = useParams()
    const [filteredWorks, setFiltered] = useState([])
    const [creator, setCreator] = useState({});
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [creatorRes, fontsAsset, assetRes] = await Promise.all([
                    supabase.from('creators').select('*').eq('id', id).single(),
                    supabase.from('fonts').select('*').eq('creator', id),
                    supabase.from('works').select('*').eq('creator', id)
                ])
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error);
                if (assetRes.error) throw new Error('An Error Occured: ', assetRes.error);
                let asset = []
                if (fontsAsset.data) {
                    asset.push(...fontsAsset.data)
                }
                asset.push(...assetRes.data)
                setCreator(creatorRes.data)
                setAssets(asset)
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
                                <SearchInput data={assets} onResults={setFiltered} column={'title'} />
                                <SelectInput data={assets} option={['All', 'Sprite', 'Tilesets', 'Background', 'Font']} column={'tags'} onResults={setFiltered} placeholder='Category' />

                                {creator.id != 1 ?
                                    <Link to={creator.link} className="bg-green-600 border rounded-lg text-sm block w-[140px] ps-3 p-2.5 border-green-600 text-white hover:bg-green-800 hover:border-green-800">
                                        Visit Page
                                    </Link> : ''
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <div className='w-full flex flex-row gap-5 justify-center flex-wrap'>
                    {loading ? (
                        Array.from({ length: 8 }, (_, i) => (
                            <CardLoader key={i} />
                        ))
                    ) : filteredWorks.length === 0 ? (
                        <p>No Items Found :(</p>

                    ) : (filteredWorks.map((asset) => (
                        <div className="max-w-xs border rounded-lg shadow-sm bg-violet-950 border-gray-700 relative">
                            <Link to={asset.link}>
                                <img className="rounded-t-lg" src={get_image(asset.image)} alt="Image" />
                            </Link>
                            <div className="p-5">
                                <Link to={asset.link}>
                                    <h5 className="mb-2 text-[20px] font-bold tracking-tight text-white">{asset.title}</h5>
                                </Link>

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
                                        <AssetLicense asset={asset} />
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
