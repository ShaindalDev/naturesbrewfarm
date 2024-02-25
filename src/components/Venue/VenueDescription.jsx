import React from 'react'

const VenueDescription = ({ name, description }) => {
  return (
    <div>
      <h2 className="h2">{name}</h2>
    <p className="mb-8">{description}</p>
    </div>
  )
}

export default VenueDescription
