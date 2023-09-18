import { useState, useEffect } from "react";
import DescriptionTab from "./DescriptionTab"; 
import DetailsTab from "./DetailsTab";
import LocationTab from "./LocationTab";

// info for all of the tab options 
const tabs = [
    {   
        index: 0,
        name: "DESCRIPTION",
        content: DescriptionTab,
    },
    {
        index: 1,
        name: "DETAILS",
        content: DetailsTab,
    },
    {
        index: 2,
        name: "LOCATION",
        content: LocationTab
    }
]

export default function HotelContent() {

    // state variable for the json server data 
    const [hotelData, setHotelData] = useState([]);
    // state variable for which tab is active 
    const [activeTab, setActiveTab] = useState(0);

    // variable for the active tab to be displayed 
    let ActiveTabContent = tabs[activeTab].content;

    const url = 'http://localhost:8888/api/hotels/venetian.json';

    // fetch the server data and store in the state variable 
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

    // function to create each tab button and decide focus/active tab 
    function TabButton({label, selected, index}) {

        return (
            <button 
                className={`py-3 px-auto w-[250px] bg-[#895e95] ${ selected ? 'border-b-4 border-[#743281] text-white' : 'text-[#d8b3d8] hover:text-white hover:border-b-4 border-[#dcbede]' }`}
                onClick={() => {
                    setActiveTab(index);
                }} 
            >
            {label}
            </button>
        )
    }

    // this gets the star review rating 
    let stars = Math.ceil(hotelData?.starRating);
    let starArray = []; 
    for (let i = 0; i < stars; i++) {
        starArray?.push("&#x2605;");
    }

    return (
        <div>
            <div className="flex flex-row text-[#6b6c7a]">
                <div className="">
                    <div className="flex flex-row">
                        <span className="text-[36px]/[22px] uppercase mt-2">
                            {hotelData.name}
                        </span>
                        <span className="ml-2 mt-4 text-[#9999a3]">
                            {starArray?.map((item, index) => {
                                return <span key={index}>&#x2605;</span>
                            })}
                        </span>
                    </div>
                    <div className="flex flex-row mt-3">
                        <button onClick={() => {
                            setActiveTab(2);
                        }}>
                            &#x2352; {hotelData?.location?.areaName}
                        </button>
                        <span className="ml-3">
                            &#x2706; {hotelData.phoneNumber}
                        </span>
                        <span className="ml-3">
                            &#x2764; Best Price Guarantee
                        </span>
                    </div>
                </div>
                <div className="w-[130px]">
                </div>
                <div className="flex flex-col">
                    <span className="text-[#f48721] text-[56px]/[40px] font-bold">
                        ${hotelData.price}
                    </span>
                    <span className="mt-4">
                        HOTEL ROOMS FROM
                    </span>
                </div>
            </div>
            <div className={`flex flex-col mt-10 w-[700px]`}>
                {/* Tab Button Container */}
                <div className="flex flex-row">
                    {tabs.map((tab) => <TabButton key={tab.name} label={tab.name} selected={activeTab === tab.index} index={tab.index}/>)}
                </div>
                <div className={`mt-[18px]`}>
                    <ActiveTabContent />
                </div>
            </div>

        </div>
    )
}