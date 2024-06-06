import { Outlet } from "react-router-dom";
import { layerTitles } from "../utils/helper";
import MapContainer from "./MapContainer";

export default function LargeMap() {
    // const { weatherData, error, isLoading } = useFetch();
    // const [state, setState] = useState({ lat: null, lon: null });

    // useEffect(() => {
    //     if (weatherData && weatherData.lat && weatherData.lon) {
    //         setState({ lat: weatherData.lat, lon: weatherData.lon });
    //     }
    // }, [weatherData]);

    return (
        <div className="bg-black text-white">
            {/* {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <PacmanLoader size={120} color="#3390c4" />
                </div>
            ) : error ? (
                <div>
                    <p>{error || "Component failed!"}</p>
                </div>
            ) : (
                <div className="h-screen w-screen">
                    {state.lat && state.lon && <Map lat={state.lat} lon={state.lon} />}
                </div>
            )} */}
            <div>
                <div className="">
                    <div>
                        <p className="py-1 w-[300px] mx-auto text-lg text-center bg-gray-200 rounded-t-md font-bold">
                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mix-blend-multiply">
                                Map Containers:
                            </span>
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 mx-auto w-full gap-5 p-5">
                        { layerTitles && layerTitles.map( ( layer ) => (
                            <MapContainer key={layer.id} name={layer.name}/>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}