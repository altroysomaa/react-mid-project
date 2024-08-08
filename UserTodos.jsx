import { useState } from "react"
import NewTodoComp from "./NewTodo"
import './style.css'

const UserTodosComp = ({ userId,todos,callbackUpdateTodo,callbackAddNewTodo ,callbackIsTodosComplated }) => {

  const filterdTodos = todos.filter((todo)=> todo.userId === userId)
  // state for saving user todos
  const [todosUser, setTodos] = useState(filterdTodos)

  // state for checking (cancel) button 
  const [isCancel, setIsCancel] = useState(true)


  const addTodo =(ob)=>{
    const todoid = todos[todos.length-1].id +1
    setTodos([...todosUser,{...ob,id:todoid}])
    callbackAddNewTodo({...ob,id:todoid})

    setIsCancel(!isCancel)
  }


  
  return (
    <>
     {/* based on (isCancel) value - rendering the todos/new todo section */}
      {
        isCancel ?
          <div>
            <strong>Todos - User{userId}</strong> 
            <button style={{marginLeft :'20rem'}} className='lightYellowButton' onClick={() => setIsCancel(!isCancel)}>Add</button>
            <br />
            <br />
            <div style={{ overflowY: 'scroll', height: '200px', border: '2px solid black', padding: '10px' }}>

              {/* Dynamic rendering to all user todos */}
              {
                todosUser.map((todo) => {
                  return <div style={{ border: '2px solid purple', margin: '5px', padding: '5px' }} key={todo.id}>
                    <label>Title :</label> {todo.title} <br />
                    <label>Completed :</label>{String(todo.completed)}

                    {/* adding button(Completed) for all the todos that not been completed */}
                    {
                      !todo.completed && <button className='lightYellowButton' style={{marginLeft :'10rem' }} onClick={()=>
                      { 
                        callbackUpdateTodo({...todo,completed:true})
                        const lst  = todosUser.map(t => t.id !== todo.id ? t :{...todo,completed:true})
                        setTodos(lst)
                        callbackIsTodosComplated(todo.userId)
                      
                      }} >Mark Completed</button>
                    }
                  </div>
                })

              }
            </div>
          </div> :
          <div>
          {/* rendering new todo section */}
            <NewTodoComp callbackCanel={setIsCancel} callbackAddTodo={addTodo} id={userId}/>
          </div>
      }
    </>
  )
}

export default UserTodosComp