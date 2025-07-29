import { useState, useEffect } from "react";

export default function SearchInput({ data = [], onResults, placeholder = "Search...", column, }) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!column) return;

        if (query.trim() === "") {
            onResults(data);
        } else {
            const filtered = data.filter((item) => {
                const value = item[column];
                return (
                    typeof value === "string" &&
                    value.toLowerCase().includes(query.toLowerCase())
                );
            });
            onResults(filtered);
        }
    }, [query, data, onResults, column]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-[10px] pointer-events-none">
                <span className="material-symbols-rounded text-gray-500">
                    search
                </span>
            </div>
            <input type="text" className="bg-black-700 border text-sm rounded-lg block w-full ps-10 p-2.5 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>

    );
}


