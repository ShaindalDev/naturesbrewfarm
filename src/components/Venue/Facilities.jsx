import React from "react"

import { BiWifi, BiRestaurant } from "react-icons/bi";
import { MdLocalParking, MdPets } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const VenueFacilities = ({ maxGuests, wifi, breakfast, parking, pets }) => {
   return (
    <div className="mt-12">
        <h3 className="h3 mb-3">Venue Facilities</h3>
        <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="flex items-center gap-x-3 flex-1">
                    <div className="flex items-center gap-x-1 text-3xl text-accent">
                        <BiWifi />
                        {wifi ? <div className="text-base">free wifi included</div> : <div className="text-base">No wifi. Cell connection only</div>}
                    </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1">
                    <div className="flex items-center gap-x-1 text-3xl text-accent">
                        <BiRestaurant />
                        {breakfast ? <div className="text-base">Breakfast included</div> : <div className="text-base">No breakfast included</div>}
                    </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1">
                    <div className="flex items-center gap-x-1 text-3xl text-accent">
                        <MdLocalParking />
                        {parking ? <div className="text-base">Private Parking</div> : <div className="text-base">Only public parking</div>}
                    </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1">
                    <div className="flex items-center gap-x-1 text-3xl text-accent">
                        <MdPets />
                        {pets ? <div className="text-base">Allowed</div> : <div className="text-base">Not allowed</div>}
                    </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1">
                    <div className="flex items-center gap-x-1 text-3xl text-accent">
                        <BsPeople />
                        <div className="text-base">Room for {maxGuests} people</div>
                    </div>
                </div>
              </div>
    </div>
    
   )
}

export default VenueFacilities;


 
              