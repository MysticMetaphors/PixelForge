import { useEffect, useState } from "react";
import Dropdown from "../../Components/Dropdown";
import Modal from "../../Components/Modal";
import SearchInput from "../../Components/SearchInput";
import { formatDate } from "../../Global";
import { supabase } from "../../supabaseClient";

export default function Creators() {
    const [ModalOpen, setModalOpen] = useState(false);
    const [creators, setCreator] = useState([])
    const [form, setForm] = useState({
        image: null,
        name: '',
        link: '',
        description: '',
    })
    // const [filteredCreators, setFiltered] = useState([]); //SearchInput
    // const [loading, setLoading] = useState(true)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creatorRes = await supabase.from('creators').select('*')
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error);
                setCreator(creatorRes.data)
                // setLoading(false)
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

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(form)
        try {
            const insert = async () => {
                const { data: storageData, error: storageError } = await supabase.storage
                    .from("images")
                    .upload(`${form.image.name}`, form.image, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (storageError) {
                    console.error("Storage upload error:", storageError.message);
                    return;
                }

                const { data, error } = await supabase.from('creators').insert([{
                    image: form.image.name,
                    name: form.name,
                    link: form.link,
                    description: form.description,
                }]);

                setForm({
                    image: null,
                    name: '',
                    link: '',
                    description: '',
                })
                setModalOpen(false)
            };

            insert()
        } catch (error) {
            console.log('Unexpected Error occured!')
        }

    }

    function renameImage(file) {
        if (!file) return null;

        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 100000);
        const ext = file.name.split(".").pop();

        const newName = `upload_${timestamp}_${random}.${ext}`;
        return new File([file], newName, { type: file.type });
    }

    return (
        <>
            <div>
                <Modal title={'Add new work'} isOpen={ModalOpen} onClose={() => setModalOpen(false)}>
                    <form className="p-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter title"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="link"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Link URL
                            </label>
                            <input
                                type="text"
                                name="link"
                                value={form.link}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                value={form.description}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter description"
                            ></textarea>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setForm({ ...form, image: renameImage(e.target.files[0]) })}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-900 file:text-white hover:file:bg-violet-800"
                            />
                        </div>


                        {/* Footer */}
                        <div className="flex justify-end gap-2 border-t border-gray-700 pt-4">
                            <button
                                type="button"
                                // onClick={() => setModalOpen(false)}
                                onClick={() => console.log(form)}
                                className="px-4 py-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>

                <div className="">
                    {/* <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button> */}
                    <div class="relative overflow-x-auto shadow-md bg-black-800">
                        <div className="p-5 pb-2 flex justify-between">
                            <div className="w-full">
                                <SearchInput />
                            </div>
                            <div className="w-full flex justify-end">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    type="button"
                                    className="self-right bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    Add Creator
                                </button>
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-black-800 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Avatar
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="material-symbols-rounded">
                                            link
                                        </span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="material-symbols-rounded">
                                            calendar_month
                                        </span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {creators.map((creator) => (
                                    <tr class="bg-violet-950">
                                        <td class="px-6 py-4">
                                            <img className="w-8 h-8 rounded-full" src={get_image(creator.image)} alt="user photo" />
                                        </td>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {creator.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {creator.description.length > 55 ? `${creator.description.slice(0, 55)}...` : creator.description}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href={creator.link}>
                                                <span class="material-symbols-rounded cursor-pointer">
                                                    open_in_new
                                                </span>
                                            </a>
                                        </td>
                                        <td class="px-6 py-4">
                                            {formatDate(creator.timestamp)}
                                        </td>
                                        <td class="px-6 py-4 flex justify-end">
                                            <Dropdown />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}