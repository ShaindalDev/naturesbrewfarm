import React from "react";


const VenueMediaGallery = ({ media, description, name }) => {
  return (
    <>
    
    <div className="grid grid-cols-3 gap-6 mb-12" >
        {media.map((item) => (
            <div className="flex items-center gap-x-3 flex-1" key={item}>
           <img className="mb-8" src={item} alt="" /> 
           </div>
        ))}
        <div></div>
        
        
    </div>
      
            
            
    </>
  )
}

export default VenueMediaGallery
