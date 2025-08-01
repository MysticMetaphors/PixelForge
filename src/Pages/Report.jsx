import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import sendEmail from "../Emailer";

export default function Report() {
    const [query, setQuery] = useState(null)
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        sendEmail(e, formRef, 
            () => alert("Email sent!"), 
            (err) => alert("Error sending email: " + err.text)
        );
    };

    return (
        <>
            <div
                className="h-fit bg-cover bg-center bg-violet-1000"
            >
                <div className="flex flex-col justify-center items-center h-fit">
                    <div className="py-8 px-4  text-center lg:py-16 lg:px-12">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Report</h1>
                        <p className="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge we connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="w-full flex flex-row gap-4 mb-4">
                        <input type="text" name="name" className="bg-black-700 border text-sm rounded-lg block w-ful p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name..." />
                        <select name="type"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400">
                            <option hidden value="">Type...</option>
                            <option value="I want to report a bug">I want to report a bug</option>
                            <option value="I want to take down one of my works">I want to take down one of my works</option>
                            <option value="I don't want to be featured here">I don't want to be featured here</option>
                            <option value="I want to change license of my work">I want to change license of my work</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <input type="email" name="email" className="mb-4 bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Email..." />

                    {query == 'I want to take down one of my works' || query == 'I want to change license of my work' ?
                        (
                            <div className="flex mb-4 gap-4">
                                <input type="text" name="title" className="bg-black-700 border text-sm rounded-lg block w-ful p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Works Title..." />
                                <input type="text" name="creator" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Creator's Name..." />
                            </div>
                        ) : query == "I don't want to be featured here" ? (
                            <input type="text" name="creator" className="mb-4 bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Creator's Name..." />
                        ) : ''}

                    <textarea name="message" rows={8} placeholder="Message..." className="mb-4 bg-black-700 border text-sm rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400 w-full">
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