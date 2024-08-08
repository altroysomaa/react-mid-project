import React, { useState, useEffect } from 'react'
import AdressComp from './Adress'

import './style.css'

const UserComp = ({ data, isCompleted, callbackidClicked, callbackDelete, callbackUpdate }) => {

    // state for checking if need to show the address data or not 
    const [isData, setIsData] = useState(false)

    // state for saving user data that recives in the component
    const [user, setUser] = useState(data)


    // state for chnaging the packground color 
    const [isIdClicked, setIsIdClicked] = useState(false)




    return (
        <>
            {/*  red color for the border - if user not finished his todos , otherwise green color  */}
            <div style={{ backgroundColor: isIdClicked ? 'orange' : 'white', border: isCompleted ? '2px solid green' : '2px solid red', margin: '10px', padding: '10px', height: 'fit-content', width: 'fit-content' }}>

                {/* Id label -> onclick : showing the todos & posts  */}
                <label onClick={() => {
                    setIsIdClicked(!isIdClicked)
                    callbackidClicked(user.id)
                }}>ID:</label>{data.id}<br />

                {/* name and email input : get the defulat value from the user data  */}
                <label>Name:</label><input type='test' defaultValue={data.name} onChange={(e) => setUser({ ...user, name: e.target.value })}></input><br />
                <label>Email:</label><input type='test' defaultValue={data.email} onChange={(e) => setUser({ ...user, email: e.target.value })}></input><br /><br />

                {/* otherdata button for displaying the address detials */}
                <button style={{ marginRight: '2rem' }} onMouseOver={() => setIsData(true)} onClick={() => setIsData(false)}>Other Data</button>

                {/* display/hide user addrees data */}
                {
                    isData && <AdressComp userAddress={data.address} callbackAddress={(address) => setUser({ ...user, address: address })} />
                }

                <button onClick={() => callbackUpdate(user)} className='lightYellowButton'>Update</button>

                {/* delete user from the users list based on his id's */}
                <button onClick={() => callbackDelete(user.id)} className='lightYellowButton'>Delete</button>
            </div>
        </>
    )
}

export default UserComp