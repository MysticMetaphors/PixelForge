export default function About() {
    return (
        <>
            <div
                className="h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        About PixelForge
                    </h1>
                    {/* <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">

                    </p> */}
                </div>
            </div>

            <div className="bg-gray-50 relative text-black/50 bg-violet-1000 dark:text-white/50 h-[50vh] flex flex-row flex-wrap justify-start items-center pb-[100px] ">
                {/* <p className="text-justify text-white text-[20px]">We know how time-consuming it can be to search through countless sites and forums just to find the right assets for your game. That’s why we created PixelForge: a curated hub that brings together free pixel art assets, AI models, and other useful resources all in one place.
                   It’s important to note that PixelForge does not own or claim ownership of the resources listed here. Every asset featured on this site remains the property of its rightful creator or owner. We simply aim to showcase and link to these free resources, making it easier for developers, artists, and hobbyists to discover and use them — always in line with their respective licenses and terms of use.
                   Whether you’re building your first game or adding polish to your next big project, we hope PixelForge saves you time and inspires your creativity.
                   If you have suggestions, feedback, or know of great free resources we should include, feel free to reach out — we’d love to hear from you!
                </p> */}
                <div className="px-[16%] absolute top-[-200px]">
                    <p className="mb-4 text-justify text-white text-[20px]">
                        At PixelForge, our mission is simple: to help creators find high-quality, free resources for their game development projects — faster and easier.
                        We know how time-consuming it can be to search through countless sites and forums just to find the right assets for your game. That’s why we created
                        <span className="font-semibold">PixelForge</span>: a curated hub that brings together free pixel art assets, AI models, and other useful resources all in one place.
                    </p>

                    {/* <p className="mb-4 text-justify text-white text-[20px]">

                    </p> */}

                    <p className="mb-4 text-justify text-[20px]">
                        <span className="font-semibold underline text-blue-100">
                            It’s important to note that PixelForge does not own or claim ownership of the resources listed here.
                        </span>
                        <span className="text-white">Every asset featured on this site remains the property of its rightful creator or owner. We simply aim to showcase and link to these free resources, making it easier for developers, artists, and hobbyists to discover and use them — always in line with their respective licenses and terms of use.</span>
                    </p>

                    <p className="mb-4 text-justify text-white text-[20px]">
                        Whether you’re building your first game or adding polish to your next big project, we hope PixelForge saves you time and inspires your creativity.
                    </p>

                    <p className="text-justify text-white text-[20px]">
                        If you have suggestions, feedback, or know of great free resources we should include, feel free to reach out — we’d love to hear from you!
                    </p>
                </div>

            </div>
        </>
    );
}
