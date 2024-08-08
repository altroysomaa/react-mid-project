import { useEffect, useState } from 'react'
import { getItems } from './Utilits'
import UserComp from './User'
import './style.css'
import NewUserComp from './NewUser'
import UserPostsComp from './UserPosts'
import UserTodosComp from './UserTodos'

const USER_URL = 'https://jsonplaceholder.typicode.com/users'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

function App() {

  //state for saving the users data
  const [users, setUsers] = useState([])

  const [todos, setTodos] = useState([])

  const [posts, setPosts] = useState([])

  const [isToAddUser, setIsToAddUser] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');

  const [id, setId] = useState(1);

  const [isCompleted, setCompleted] = useState(false)

  // state for if need to render the posts & todos list 
  const [isToShowData, setIsToShowData] = useState(false)




  // to fitch the user todos using (getItems) that declared in Utilits file
  const fetchUsers = async () => {
    const { data } = await getItems(USER_URL)
    setUsers(data)
  }
  // to fitch the  todos using (getItems) that declared in Utilits file
  const fetchTodos = async () => {
    const { data } = await getItems(TODOS_URL)
    setTodos(data)
  }

  // to fitch the posts using (getItems) that  declared in Utilits file
  const fetchPosts = async () => {
    const { data } = await getItems(POSTS_URL)
    setPosts(data)
  }

  // fetch users,posts & todos data

  useEffect(() => {
    const fetchData = () => {
      fetchTodos()
      fetchPosts()
      fetchUsers()
    }
    fetchData()
  }, [])



  // delete user posts & todos based on his id 
  const DeleteUser = (id) => {
    const filterUsers = users.filter(user => user.id !== id)
    setUsers(filterUsers)

    const filterPosts = posts.filter(post => post.userId !== id)
    setPosts(filterPosts)

    const filterTodos = todos.filter(todo => todo.userId !== id)
    setTodos(filterTodos)

    setIsToShowData(false)

  }

  // update user based on his id from users list
  const updateUser = (ob) => {
    const lst = users.map(user => user.id !== ob.id ? user : ob)
    setUsers(lst)
  }

  const addUser = (ob) => {
    const id = users[users.length - 1].id + 1
    setUsers([...users, { ...ob, id: id }])

    setIsToAddUser(!isToAddUser)
  }


  const addPost = (ob) => {
    const id = posts[posts.length - 1].id + 1
    setPosts([...posts, { ...ob, id: id }])

  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setIsToShowData(false)
  }

  const callbackidClicked = (id) => {
    setId(id)
    setIsToShowData(!isToShowData)
  }

  const filteredUsers = users.filter((user) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return user.name.toLowerCase().includes(lowerCaseSearchTerm) || user.email.toLowerCase().includes(lowerCaseSearchTerm)
  })

  const updateTodo = (ob) => {
    const lst = todos.map(todo => todo.id !== ob.id ? todo : ob)
    setTodos(lst)
  }

  const addNewTodo = (ob) => {
    setTodos([...todos, ob])
  }

  // check if specific user finshid all his todos
  const isTodosComplated = (id) => {
    const filtertodosForAUser = todos.filter(todo => todo.userId === id)
    const notComplatedTodos = filtertodosForAUser.filter(t => t.completed === false)
    if (notComplatedTodos.length === 1) {
      setCompleted(!isCompleted)
    }
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>

        <div style={{ width: 'fit-content', height: 'fit-content', padding: '5px' }}>
          Search <input type='text' onChange={handleSearch} style={{ marginRight: '1rem', width: '90px' }}></input>
          <button className='lightYellowButton' onClick={() => {
            setIsToShowData(false)
            setIsToAddUser(!isToAddUser)
          }
          }>Add</button>
          {
            // Dynamic Rendring for users details
            searchTerm === '' ?
              users.map((user) => {
                return <UserComp data={user} isCompleted={isCompleted} key={user.id} callbackidClicked={callbackidClicked} callbackDelete={DeleteUser} callbackUpdate={updateUser} />
              })
              :
              filteredUsers.map((user) => {
                return <UserComp data={user} isCompleted={isCompleted} key={user.id} callbackidClicked={callbackidClicked} callbackDelete={DeleteUser} callbackUpdate={updateUser} />
              })
          }
        </div>

        {
          isToShowData &&
          <div>
            <UserTodosComp userId={id} todos={todos} callbackAddNewTodo={addNewTodo} callbackUpdateTodo={updateTodo} callbackIsTodosComplated={isTodosComplated}></UserTodosComp>
            <UserPostsComp userId={id} posts={posts} callbackAddNewPost={addPost}></UserPostsComp>
          </div>
        }

        {
          isToAddUser &&
          <div>
            <NewUserComp callbackAddUser={addUser} callbackCancel={() => setIsToAddUser(false)} />
          </div>
        }
      </div>

    </>
  )
}

export default App
