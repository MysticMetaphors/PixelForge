import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SelectInput({ column, onResult, placeholder = 'Category', option = [] }) {
    const [query, setQuery] = useState(null);
    const [selectedItem, setSelected] = useState(null)



    useState(() => {
        const FetchData = async () => {
            try {
                if (selectedItem != null || selectedItem != '') {
                    let { data: works, error } = await supabase
                        .from('works')
                        .select('*')
                        .eq(column, selectedItem)

                    if (error) throw new Error('An Error Occured: ', error);
                    setQuery(works)

                } else {
                    let { data: works, error } = await supabase
                        .from('works')
                        .select('*')
                    
                    if (error) throw new Error('An Error Occured: ', error);
                    setQuery(works)
                }

            } catch (error) {
                console.log('An Error Occured: ', error)
            }
        }

        FetchData()
    }, [query, onResult, column])

    return (
        <select onChange={(e) => setSelected(e.target.value)} className="bg-black-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-[30px] p-2.5 border-gray-600 text-gray-400">
            <option hidden selected value="">{placeholder}</option>
            {option.map((opt) => (
                <option value={opt}>{opt}</option>
            ))
            }
        </select>
    )
}