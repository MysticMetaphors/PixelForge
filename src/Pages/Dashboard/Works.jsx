import { useEffect, useRef, useState } from "react";
import Dropdown from "../../Components/Dropdown";
import Modal from "../../Components/Modal";
import SearchInput from "../../Components/SearchInput";
import { supabase } from "../../supabaseClient";

export default function Works() {
    // const tags_btn = useRef(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [works, setWorks] = useState([]);
    // const [filteredWorks, setFiltered] = useState([]); //SearchInput
    const [creator, setCreators] = useState([]);
    // const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: '',
        tags: '',
        creator: null,
        image: null,
        link: '',
        generated: false,
        license: ''
    })

    // const category = useParams();
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [assetRes, creatorRes] = await Promise.all([
                    supabase.from('works').select('*'),
                    supabase.from('creators').select('*'),
                ])

                if (assetRes.error) throw new Error('An Error Occured: ', assetRes.error)
                if (creatorRes.error) throw new Error('An Error Occured: ', creatorRes.error)

                setWorks(assetRes.data)
                setCreators(creatorRes.data)
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

    function get_creator(id) {
        const findItem = creator.find((item) => item.id == id)
        return <img className="w-8 h-8 rounded-full" src={get_image(findItem.image)} alt={findItem.name} />
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

                const { data, error } = await supabase.from('works').insert([
                    {
                        title: form.title,
                        tags: form.tags,
                        creator: form.creator,
                        image: form.image.name,
                        link: form.link,
                        generated: form.generated,
                        license: form.license,
                    },
                ]);

                setForm({
                    title: '',
                    tags: '',
                    creator: null,
                    image: null,
                    link: '',
                    generated: false,
                    license: ''
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
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter title"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="creator"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Creator
                            </label>
                            <select
                                name="creator"
                                onChange={handleChange}
                                value={form.creator}
                                className="bg-black-700 border text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400"
                            >
                                <option hidden value="">
                                    Select Creator
                                </option>
                                {creator.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full flex gap-2 flex-wrap mb-6">
                            <label
                                htmlFor="tags"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Tags
                            </label>
                            <select
                                name="tags"
                                onChange={handleChange}
                                value={form.tags}
                                className="bg-black-700 border text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400"
                            >
                                <option hidden value="">
                                    Select Tag
                                </option>
                                <option value="Background">Background</option>
                                <option value="Tilesets">Tilesets</option>
                                <option value="Sprites">Sprites</option>
                            </select>
                            {/* {form.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300 text-center flex items-center gap-2"
                                >
                                    {tag}
                                    <span
                                        onClick={() =>
                                            setForm(prev => ({
                                                ...prev,
                                                tags: prev.tags.filter((_, idx) => idx !== i),
                                            }))
                                        }
                                        className="material-symbols-rounded cursor-pointer hover:text-red-400"
                                        style={{ fontSize: "18px" }}
                                    >
                                        close
                                    </span>
                                </span>
                            ))} */}
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
                                htmlFor="license"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                License
                            </label>
                            <textarea
                                name="license"
                                rows="4"
                                value={form.license}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter license details"
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
                                onClick={() => setModalOpen(false)}
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
                                    Add Work
                                </button>
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-black-800 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Creator
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        License
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="material-symbols-rounded">
                                            tag
                                        </span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="material-symbols-rounded">
                                            link
                                        </span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="material-symbols-rounded">
                                            auto_awesome
                                        </span>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.map((work) => (
                                    <tr class="bg-violet-950">
                                        <td class="px-6 py-4">
                                            {work.title}
                                        </td>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {get_creator(work.creator)}
                                        </th>
                                        <td class="px-6 py-4">
                                            {work.license.length > 55 ? `${work.license.slice(0, 55)}...` : work.license}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span className="w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300 mr-[8px]">
                                                {work.tags}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href={work.link}>
                                                <span class="material-symbols-rounded cursor-pointer">
                                                    open_in_new
                                                </span>
                                            </a>
                                        </td>
                                        <td class="px-6 py-4">
                                            {work.generated ? 'True' : 'False'}
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
            </div >
        </>
    )
}