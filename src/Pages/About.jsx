export default function About() {
    return (
        <>
            <div
                className="h-96 bg-cover bg-center flex justify-center items-center"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
                        About PixelForge
                    </h1>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-row flex-wrap justify-start items-center pb-[100px] ">

                <div className="px-[16%]">
                    <p className="mb-4 text-justify text-white text-lg">
                        At PixelForge, our mission is simple: to help creators find high-quality, free resources for their game development projects — faster and easier.
                        We know how time-consuming it can be to search through countless sites and forums just to find the right assets for your game. That’s why we created
                        <span className="font-semibold">PixelForge</span>: a curated hub that brings together free pixel art assets, AI models, and other useful resources all in one place.
                    </p>

                    <p className="mb-4 text-justify text-lg">
                        <span className="font-semibold underline text-blue-100 mr-[8px]">
                            It’s important to note that PixelForge does not own or claim ownership of the resources listed here.
                        </span>
                        <span className="text-white">Every asset featured on this site remains the property of its rightful creator or owner. We simply aim to showcase and link to these free resources, making it easier for developers, artists, and hobbyists to discover and use them — always in line with their respective licenses and terms of use.</span>
                    </p>

                    <p className="mb-4 text-justify text-white text-lg">
                        Whether you’re building your first game or adding polish to your next big project, we hope PixelForge saves you time and inspires your creativity.
                    </p>

                    <p className="text-justify text-white text-lg">
                        If you have suggestions, feedback, or know of great free resources we should include, feel free to reach out — we’d love to hear from you!
                    </p>
                </div>

            </div>
        </>
    );
}
