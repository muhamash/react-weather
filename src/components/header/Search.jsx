// import React from 'react';
import SearchIcon from "../../assets/search.svg";
import { useFetch } from "../context/useFetch";
import useDebounce from "../hooks/useDebounce";

export default function Search ()
{

    // const search = useDebounce( ( term ) =>
    // {
    //     useFetchQuery( {
    //         queryKey: [ 'search' ],
    //         url: term
    //     } )
    // }, 500 );

    const { setEndpoint } = useFetch();

    const debounceSearch = useDebounce((term) => {
        setEndpoint(['search', term], term);
    }, 5000);

    const handleChange = (e) => {
        debounceSearch(e.target.value);
    };
    return (
        <form action="#">
            <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-sky-400 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
                <input className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
                    type="search"
                    placeholder="Search Location"
                    onChange={handleChange}
                    required />
                <button type="submit">
                    <img src={SearchIcon} />
                </button>
            </div>
        </form>
    );
}
