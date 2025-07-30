import { useState, useEffect } from "react";

export default function SelectInput({ data = [], onResults, column, placeholder = 'Category', option = [] }) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!column) return;

        if (query.trim() === "" || query.trim() === "All") {
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
        <select
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400"
        >
            <option hidden value="">
                {placeholder}
            </option>
            {option.map((opt, i) => (
                <option key={i} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    )
}