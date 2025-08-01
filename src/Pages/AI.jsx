import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "../Components/SkeletonLoaders/ContentLoader";
import { supabase } from "../supabaseClient";
import SearchInput from "../Components/SearchInput";
import Toast from "../Components/Toast";

export default function AI() {

    const [ai_models, setModel] = useState([])
    const [filteredModels, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const aiRes = await supabase.from('ai_models').select('*')
            if (aiRes.error) throw new Error('An Error Occured: ', aiRes.error)
            setModel(aiRes.data)
            setLoading(false)
        }

        fetchData()
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
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">AI Models</h1>
                    <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge, we connect you with free pixel art assets and cutting-edge AI models created by talented artists and developers. These tools are shared to help you bring your game ideas to life.</p>

                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <form className="max-w-[400px] mx-auto flex flex-row gap-[8px]">
                            <SearchInput data={ai_models} onResults={setFiltered} column={'name'} />
                            <Link to={'https://www.thewarehouse.ai/'} className="bg-green-600 border rounded-lg text-sm block w-[140px] ps-3 p-2.5 border-green-600 text-white hover:bg-green-800 hover:border-green-800">AI Warehouse</Link>
                        </form>
                    </div>
                </div>
            </div>

            <div className="h-full bg-violet-1000 pb-[100px] flex flex-wrap justify-center gap-[20px]">
                {loading ? (
                    Array.from({ length: 9 }, (_, i) => (
                        <ContentLoader key={i} />
                    ))
                ) : filteredModels.length === 0 ? (
                    <p>No Items Found :(</p>

                ) : (filteredModels.map((ai) => (
                    <div className="flex flex-col max-w-sm bg-violet-950 border border-gray-700 rounded-lg shadow p-4">
                        <div className="flex flex-row gap-[10px] h-fit w-full items-center">
                            <img src={ai.icon} alt="icon" className="h-[50px] w-auto" />
                            <h3 className="text-2xl font-bold text-white">
                                {ai.name}
                            </h3>
                        </div>

                        <p className="text-gray-300 mb-4 font-normal">
                            {ai.description}
                        </p>

                        <div className="grow content-end">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="font-medium px-2.5 py-0.5 rounded bg-violet-900 text-violet-300">
                                    {ai.type}
                                </span>
                                {ai.opensource != false ?
                                    <span className="font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                                        Open Source
                                    </span> : ''
                                }
                            </div>

                            <Link to={ai.link} className="inline-flex items-center text-sm font-medium text-white hover:underline">
                                View Model
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M12.293 3.293a1 1 0 011.414 0L19 8.586a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414-1.414L15.586 10H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                    </div>

                )))
                }
            </div>

            <Toast header={'PLEASE NOTE '} content={'While some AI  models are free to use, others may require payment or subscription depending on their providers. PixelForge simply features and links to these tools — we do not host, own, or sell them.'}/>
        </>
    );
}
