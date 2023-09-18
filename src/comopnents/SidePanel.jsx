import { useState, useEffect } from "react";

export default function SidePanel() {

    // converts numbers to USD
    const USDFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // state variable for hotel data 
    const [hotelData, setHotelData] = useState([]);

    const url = 'http://localhost:8888/api/hotels/index.json';

    // fetches the hotel data and stores in state variable 
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

    // alphabetically sorts the list of hotels 
    function sortByName() {

        let sortedList;

        sortedList = hotelData?.list?.sort( function(a, b) {

            let tempNameA = a.name;
            let tempNameB = b.name;

            if(tempNameA > tempNameB) { return 1; }
            if(tempNameA < tempNameB) { return -1; }
            
            return 0;
        });

        return sortedList;
    }

    let sortedList = sortByName();

    // removes duplicate hotels 
    sortedList = [...new Map(sortedList?.map(obj => [obj['name'], obj])).values()]

    return (

        <div>
            <img src="/assets/images/venetian.jpg"></img>
            <div className="w-[248px] bg-[#efefef] p-4 my-6">
                {sortedList?.map((item, index) => (
                    <div key={index} className="flex flex-row text-[13px]">
                        <div className="text-[#895e95] w-[180px] m-1 hover:underline">{item.name}</div>
                        <div className="text-[#6b6c7a] w-[50px] m-1">{USDFormatter.format(item.price)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}