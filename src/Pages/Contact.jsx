import { Link } from "react-router-dom";
import sendEmail from "../Emailer";
import { useRef } from "react";

export default function Contact() {
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
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Contact</h1>
                        <p className="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-200"> At PixelForge I connect you with free pixel art assets and AI models created by talented artists and shared for everyone, so you can find what you need to craft your games.</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 relative bg-violet-1000 text-white/50 h-full flex flex-col justify-start items-center pb-[100px]">
                <form ref={formRef} onSubmit={handleSubmit} className="w-lg">
                    <div className="w-full flex flex-row gap-4 mb-4">
                        <input type="text" name="name" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name..." />
                        <input type="text" name="email" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Email..." />
                    </div>

                    <textarea name="message" rows={8} placeholder="Message..." className="w-full mb-4 bg-black-700 border text-sm rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400 w-full">
                    </textarea>

                    <div className="flex flex-row gap-[10px] mb-4">
                        <button type="submit" className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center">Submit</button>
                        <Link to={'/'} className="bg-violet-900 py-[8px] px-[15px] text-white flex gap-[5px] w-fit items-center">Cancel</Link>
                    </div>
                </form>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-px my-8 bg-white border-0" />
                    <span className="absolute px-3 font-medium text-white -translate-x-1/2 bg-violet-1000 left-1/2">or</span>
                </div>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="#" className="text-gray-500 hover:text-white">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Facebook page</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white ms-5">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                        </svg>
                        <span className="sr-only">Discord community</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                            <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Twitter page</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white ms-5">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">GitHub account</span>
                    </a>
                </div>
            </div>


        </>
    )
}