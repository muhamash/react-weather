import SearchIcon from "../../assets/search.svg";
import useDebounce from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

export default function Search() {
    const { setEndpoint } = useFetch();
    // console.log( setEndpoint );

    const debounceSearch = useDebounce( ( term ) =>
    {
        setEndpoint( term );
    }, 1000 );

    const handleChange = (e) => {
        e.preventDefault();
        const term = e.target.value;
        debounceSearch(term);
    };

    return (
        <form>
            <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-sky-400 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
                <input
                    className="bg-transparent placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
                    type="search"
                    placeholder="Search Location"
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    <img src={SearchIcon} alt="Search" />
                </button>
            </div>
        </form>
    );
}