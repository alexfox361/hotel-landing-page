import { useState, useEffect } from "react";

export default function DetailsTab() {

    // state variable to retrieve json data from server 
    const [hotelData, setHotelData] = useState([]);
    // state variable to hide/show the full description
    const [hideDetails, setHidden] = useState(false);

    const url = 'http://localhost:8888/api/hotels/venetian.json';

    // fetch the data from the server and store in state 
    const fetchHotelData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setHotelData(json);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchHotelData();
    }, []);

    return (

        <div className="px-4">
            <div className={`text-[15px] w-[645px] ${ hideDetails ? 'h-full' : 'h-[200px]' } overflow-hidden`}>
                {hotelData.details?.map((item, index) => (
                    <div key={index} className="">
                        <div className="font-bold">{item.label}</div>
                        <div className="mb-[12px]">{item.value}</div>
                    </div>
                ))}
            </div>
            <button onClick={() => setHidden(!hideDetails)} className={`text-[#895e95] flex flex-row text-[14px] ${hideDetails ? '' : 'mt-[18px]'} hover:underline`}>
                {hideDetails ? "HIDE" : "SHOW"} FULL DETAILS 
                {hideDetails ? 
                    <div className="rounded-full bg-[#895e95] flex pl-[2px] pb-[-2px] h-[14px] w-[14px] text-white text-[10px]/[12px] ml-[8px] mt-1">&#x2191;</div>
                : 
                    <div className="rounded-full bg-[#895e95] flex pl-[2px] h-[14px] w-[14px] text-white text-[10px] ml-[8px] mt-1">&#x2193;</div>
                }
            </button>
        </div>
    )
}