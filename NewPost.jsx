import React, { useState } from 'react'

import './style.css'




const NewPostComp = ({callbackCanel,callbackAddPost ,id}) => {

  // state for saving the {title,body} for a new post
    const [post,setPost] = useState({})

  return (
   <>
     <strong>New Post -User{id}</strong>
     <br/>
     <br/>
     <div style={{border:'2px solid black',alignItems :'center', padding:'10px'}}>
        <label>Title : </label> <input type='text' onChange={(e)=>setPost({...post,title:e.target.value})}></input> <br/> <br/>
        <label>Body : </label> <input type='text' onChange={(e)=>setPost({...post,body:e.target.value})}></input> <br/><br/>

        <button style={{marginLeft :'12rem'}} className='lightYellowButton'  onClick={()=>callbackCanel(true)}>Cancel</button>
        
        {/* updating the user posts by sending new post object */}
        <button style={{marginLeft :'1rem'}} className='lightYellowButton' onClick={()=>
          callbackAddPost({
            userId:id,
            title : post.title,
            body : post.body
          })}>Add</button>
    </div>
   </>
  )
}

export default NewPostComp