import React, { useState } from 'react'

const AdressComp = ({ userAddress, callbackAddress }) => {
  
  // state for saving the address 
  const [address, setAddress] = useState(userAddress)

  return (
    <div style={{ border: '2px solid black', padding: '10px', margin: '20px' }}>
      <label>Street:</label> <input type='text' defaultValue={address?.street} onChange={(e) => {
        setAddress({ ...address, street: e.target.value })

        // changing addrees data by calling callbackAddress that get recived from the User component
        callbackAddress(address)
      }}></input><br />
      <label>City:</label> <input type='text' defaultValue={address?.city} onChange={(e) => {
        setAddress({ ...address, city: e.target.value })
        callbackAddress(address)
      }}></input><br />
      <label>Zip Code:</label> <input type='text' defaultValue={address?.zipcode} onChange={(e) => {
        setAddress({ ...address, zipcode: e.target.value })
        callbackAddress(address)
      }}></input><br />
    </div>
  )
}
export default AdressComp