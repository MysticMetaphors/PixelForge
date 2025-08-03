import { Link } from "react-router-dom"

export default function Forbidden() {
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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">403 - Forbidden</h1>
                        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200">
                            You don't have permission to access this page.
                        </p>

                        <div className="flex flex-row mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link
                                to={'/'}
                                className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center"
                            >
                                Return Home
                                <span className="material-symbols-rounded text-[18px]">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}