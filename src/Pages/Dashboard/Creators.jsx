import { useEffect, useState } from "react";
import Dropdown from "../../Components/Dropdown";
import Modal from "../../Components/Modal";
import SearchInput from "../../Components/SearchInput";
import { formatDate } from "../../Global";
import { supabase } from "../../supabaseClient";

export default function Creators() {
    const [ModalOpen, setModalOpen] = useState(false);
    const [creators, setCreator] = useState([])
    // const [filteredCreators, setFiltered] = useState([]); //SearchInput
    // const [loading, setLoading] = useState(true)

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

    return (
        <>
            <div>
                <Modal title={'Add new work'} isOpen={ModalOpen} onClose={() => setModalOpen(false)}>
                    <form className="p-6 max-h-[70vh] overflow-y-auto">
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
                                className="bg-black-700 border text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400"
                            >
                                <option hidden value="">
                                    Select Creator
                                </option>
                                <option>Value</option>
                            </select>
                        </div>

                        <div className="w-full flex gap-2 flex-wrap mb-6">
                            {["asset tag", "asset tag", "asset tag"].map((tag, i) => (
                                <span
                                    key={i}
                                    className="w-fit font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="tags"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Tags
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="tags"
                                    className="flex-1 bg-black-700 border text-sm rounded-lg block p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add tags"
                                />
                                <button
                                    type="button"
                                    className="bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    Add
                                </button>
                            </div>
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
                                className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter license details"
                            ></textarea>
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