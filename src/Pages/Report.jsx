import { Link } from "react-router-dom";

export default function Report() {
    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >

                <div className="flex flex-col justify-center items-center h-full">
                    <div className="py-8 px-4  text-center lg:py-16 lg:px-12">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Report</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <form action="" className="">
                    <div className="w-full flex flex-row gap-4 mb-4">
                        <input type="text" className="bg-black-700 border text-sm rounded-lg block w-ful p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Name..." />
                        <select name="" id="" className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400">
                            <option hidden value="">Type...</option>
                            <option value="">I want to report a bug</option>
                            <option value="">I want to take down one of my works</option>
                            <option value="">I don't want to be featured here</option>
                            <option value="">I want to change license of my work</option>
                            <option value="">Other</option>
                        </select>
                    </div>

                    <textarea name="" id="" rows={10} placeholder="Message..." className="mb-4 bg-black-700 border text-sm rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400 w-full">
                    </textarea>

                    <div className="flex flex-row gap-[10px] mb-4">
                        <button type="submit" className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center">Submit</button>
                        <Link to={'/'} className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    )
}