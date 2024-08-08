import React, { useState } from 'react'
import { getItems } from './Utilits'
import './style.css'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'


const NewTodoComp = ({callbackCanel,callbackAddTodo ,id}) => {
  // state for saving the title for a new todo
    const [title,setTitle] = useState('')

  return (
   <>
     <strong>New Todo -User{id}</strong>
     <br/>
     <br/>
     <div style={{border:'2px solid black',alignItems :'center', padding:'10px'}}>
        <label>Title : </label> <input type='text' onChange={(e)=>setTitle(e.target.value)}></input> <br/><br/>
        <button style={{marginLeft :'10rem'}} className='lightYellowButton' onClick={()=>callbackCanel(true)}>Cancel</button>
        
        {/* updating the user todos by sending new todo object */}
        <button  style={{marginLeft :'2rem'}} className='lightYellowButton' onClick={()=>callbackAddTodo({
            userId : id,
            title : title,
            completed : false
        })}>Add</button>
    </div>
   </>
  )
}

export default NewTodoComp