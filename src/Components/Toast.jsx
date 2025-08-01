export default function Toast() {

    function close(e) {
        const button = e.target
        const parent = button.parentNode

        parent.classList.add('hidden')
    }

    return (
        <div id="toast-warning" className="fixed bottom-[10px] right-[10px] flex w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal text-justify"><strong>PLEASE NOTE </strong><br />While some AI  models are free to use, others may require payment or subscription depending on their providers. PixelForge simply features and links to these tools — we do not host, own, or sell them.</div>
            <button type="button" onClick={close} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 py-1.5 px-2 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer" data-dismiss-target="#toast-warning" aria-label="Close">
                <span className="material-symbols-rounded pointer-events-none">
                    close
                </span>
            </button>
        </div>
    )
}