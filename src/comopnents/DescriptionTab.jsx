import { useState, useEffect } from "react";

export default function DescriptionTab() {

    // state variable to retrieve json data from server 
    const [hotelData, setHotelData] = useState([]);
    // state variable to hide/show the full description
    const [hideDescription, setHidden] = useState(false);

    const url = 'http://localhost:8888/api/hotels/venetian.json';

    // fetch the server info and store in the state variable 
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

    // store description in array for line breaks 
    let description = hotelData?.description?.split(`\r\n\r\n`);

    return (

        <div className="px-4">
            <div className={`w-[645px] ${ hideDescription ? 'h-full' : 'h-[200px]' } overflow-hidden text-[15px]`}>
                {description?.map((item, index) => {
                    return <span key={index}><span>{item}</span><br/><br/></span>
                })}
            </div>
            <button onClick={() => setHidden(!hideDescription)} className={`text-[#895e95] flex flex-row text-[14px] ${hideDescription ? '' : 'mt-[18px]'} hover:underline`}>
                {hideDescription ? "HIDE" : "SHOW"} FULL DESCRIPTION 
                {hideDescription ? 
                    <div className="rounded-full bg-[#895e95] flex pl-[2px] pb-[-2px] h-[14px] w-[14px] text-white text-[10px]/[12px] ml-[8px] mt-1">&#x2191;</div>
                : 
                    <div className="rounded-full bg-[#895e95] flex pl-[2px] h-[14px] w-[14px] text-white text-[10px] ml-[8px] mt-1">&#x2193;</div>
                }
            </button>
        </div>
    )
}