import { useState, useEffect } from "react";

export default function LocationTab() {

    // state variable to retrieve json data from server 
    const [hotelData, setHotelData] = useState([]);

    const url = 'http://localhost:8888/api/hotels/venetian.json';

    // fetches the server data and stores in the state varaible 
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

        <div>
            <div className="w-[645px] mx-auto">
                &#x2352; 
                <span className="ml-2">{hotelData?.location?.address}</span>
                <span className="ml-2">{hotelData?.location?.city}</span>
                <span className="ml-2">{hotelData?.location?.state}</span>
                <span className="ml-2">{hotelData?.location?.postalCode}</span>
            </div>
            <img className="mx-auto" src="/assets/images/map_venetian.png"></img>
        </div>
    )
}