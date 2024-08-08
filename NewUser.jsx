import React, { useState } from 'react'
import './style.css'

const NewUserComp = ({callbackAddUser,callbackCancel}) => {
    const [user,setUser] =useState({})
  return (
    <>
       <strong>Add New User</strong>
        <div style={{border :'2px solid black'}}>
        <br/>
        <label style={{margin :'1rem'}}>Name: </label> <input type='text' onChange={e=>setUser({...user,name:e.target.value})}></input> <br/><br/>
        <label style={{margin :'1rem'}}>Email: </label> <input type='text' onChange={e=>setUser({...user,email:e.target.value})}></input>
        <br/><br/>

        <button style={{marginLeft :'10rem'}} className='lightYellowButton' onClick={()=>callbackCancel()}>Cancel</button>
        <button style={{margin :'1rem'}} className='lightYellowButton' onClick={()=>callbackAddUser(user)}>Add</button>
    </div>
    </>
  )
}

export default NewUserComp