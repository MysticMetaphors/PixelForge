import { useEffect, useRef, useState } from "react";
import Dropdown from "../../Components/Dropdown";
import Modal from "../../Components/Modal";
import SearchInput from "../../Components/SearchInput";
import { supabase } from "../../supabaseClient";

export default function AI() {
    const tags_btn = useRef()
    const [ModalOpen, setModalOpen] = useState(false);
    const [ai_models, setModel] = useState([])
    const [form, setForm] = useState({
        name: '',
        icon: '',
        description: '',
        type: '',
        link: '',
        opensource: false,
    })
    // const [filteredModels, setFiltered] = useState([])
    // const [loading, setLoading] = useState(true)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchData = async () => {
            const aiRes = await supabase.from('ai_models').select('*')
            if (aiRes.error) throw new Error('An Error Occured: ', aiRes.error)
            setModel(aiRes.data)
            // setLoading(false)
        }

        fetchData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(form)
        try {
            const insert = async () => {
                const { data, error } = await supabase.from('ai_models').insert(form);
                setForm({
                    name: '',
                    icon: '',
                    description: '',
                    type: '',
                    link: '',
                    opensource: false,
                })
                setModalOpen(false)
                
                if (error) {
                    console.log(error.message)
                }
            };

            

            insert()
        } catch (error) {
            console.log('Unexpected Error occured!')
        }

    }

    return (
        <>
            <div>
                <Modal title={'Add new Model'} isOpen={ModalOpen} onClose={() => setModalOpen(false)}>
                    <form className="p-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Model
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter model"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="icon"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Icon URL
                            </label>
                            <input
                                type="text"
                                name="icon"
                                value={form.icon}
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
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter description"
                            ></textarea>
                        </div>

                        {/* <div className="w-full flex gap-2 flex-wrap mb-6">
                            {form.tags.map((tag, i) => (
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
                            ))}
                        </div> */}

                        <div className="mb-6">
                            <label
                                htmlFor="type"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Type
                            </label>
                            <input
                                type="text"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="type"
                            />

                            {/* <div className="flex gap-2">
                                <input
                                    ref={tags_btn}
                                    type="text"
                                    name="tags"
                                    className="flex-1 bg-black-700 border text-sm rounded-lg block p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add tags"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        const newTag = tags_btn.current.value.trim();
                                        if (!newTag) return;
                                        setForm(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
                                        tags_btn.current.value = "";
                                    }}
                                    className="bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    Add
                                </button>

                            </div> */}
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
                                value={form.link}
                                onChange={handleChange}
                                name="link"
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com"
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
                    {/* <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button> */}
                    <div className="relative overflow-x-auto shadow-md bg-black-800">
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
                                    Add Model
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-black-800 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Icon
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Model
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Open source
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="material-symbols-rounded">
                                            link
                                        </span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ai_models.map((ai) => (
                                    <tr className="bg-violet-950">
                                        <td className="px-6 py-4">
                                            <img className="w-8 h-8 rounded-full" src={ai.icon} alt={ai.name} />
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {ai.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {ai.description.length > 55 ? `${ai.description.slice(0, 55)}...` : ai.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium px-2.5 py-0.5 rounded bg-violet-900 text-violet-300">
                                                {ai.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ai.opensource ? 'True' : 'False'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={ai.link}>
                                                <span className="material-symbols-rounded cursor-pointer">
                                                    open_in_new
                                                </span>
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 flex justify-end">
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