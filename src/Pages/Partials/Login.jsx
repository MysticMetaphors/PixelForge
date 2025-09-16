import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if (error) {
            setErrorMsg(error.message);
            console.error("Login error:", error);
        } else {
            console.log("Logged in!", data);
            navigate("/dashboard/works");
        }
    };

    return (
        <>
            <div
                className="h-96 bg-cover bg-center p-20"
                style={{
                    backgroundImage: `linear-gradient(to top, #240e46ff, transparent), url('/Pixel Art background Violet theme nature (1).jpg')`,
                }}
            >
                <form class="max-w-sm mx-auto p-8 bg-[#240e46]/70 backdrop-blur-md" onSubmit={handleSubmit}>
                    {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email" id="email" class="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="example@email.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            type="password" id="password" class="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    {/* <div class="flex items-start mb-5">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-black-700 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div> */}
                    <button type="submit" class="bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium">Submit</button>
                </form>
            </div>
        </>
    )
}