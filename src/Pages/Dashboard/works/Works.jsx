import Dropdown from "../../../Components/Dropdown";

export default function Works() {
    return (
        <>
            <div>
                <aside id="default-sidebar" class="fixed top-14 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <form className="bg-violet-950 h-full p-6 border-l border-gray-700">
                        <div className="mb-6">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" className="bg-black-700 border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder=""
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </form>
                </aside>

                <div className="mr-80">
                    {/* <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button> */}
                    <div class="relative overflow-x-auto shadow-md">
                        <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-black-800 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Creator
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        License
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
                                {Array.from({ length: 10 }, (_, i) => (
                                    <tr class="bg-violet-950">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">
                                            Silver
                                        </td>
                                        <td class="px-6 py-4">
                                            CC0
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="material-symbols-rounded">
                                                open_in_new
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            False
                                        </td>
                                        <td class="px-6 py-4">
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