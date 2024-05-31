/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import PinIcon from "../../assets/pin.svg";

export default function WeatherHead({data}) {

    return (
        <div>
            <div className="max-md:flex items-center justify-between md:-mt-10">
                <img src="../../assets/cloud.svg" alt="climateIcon?" />
                <div className="max-md:flex items-center max-md:space-x-4">
                    <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">{data.temp} F</h1>
                    <div className="flex items-center space-x-4 md:mb-4">
                        <img src={PinIcon} />
                        <h2 className="text-2xl lg:text-[50px]">{/* Access and display location information here */}</h2>
                    </div>
                </div>
            </div>
            <p className="text-sm lg:text-lg">{/* Additional weather details here */}</p>
        </div>
    );
}