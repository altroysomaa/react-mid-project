import React, {  useState } from 'react'
import NewPostComp from './NewPost'
import './style.css'

const UserPostsComp = ({ userId,posts ,callbackAddNewPost }) => {

    const filterdPosts = posts.filter((post)=> post.userId === userId)

    const [userPosts, setUserPosts] = useState(filterdPosts)

    // state for checking (cancel) button 
    const [isCancel, setIsCancel] = useState(true)


    const addPost =(ob)=>{
        const postid = posts[posts.length-1].id +1
        setUserPosts([...userPosts,{...ob,id:postid}])
        callbackAddNewPost({...ob,id:postid})

    setIsCancel(!isCancel)
    }


    return (
        <>
            {isCancel ?
                <div>
                    <strong>Posts - User{userId}</strong> 
                    <button style={{marginLeft :'20rem'}} className='lightYellowButton' onClick={() => setIsCancel(!isCancel)}>Add</button><br /> <br/>
                    <div style={{ overflowY: 'scroll', height: '200px', border: '2px solid black', padding: '10px' }}>
                        {
                            userPosts.map((post) => {
                                return <div style={{ border: '2px solid pink', margin: '5px', padding: '5px' }} key={post.id}>
                                    <label>Title :</label> {post.title} <br />
                                    <label>Body :</label>{post.body} <br />
                                </div>
                            })

                        }
                    </div>
                </div> :

                <div>
                    <NewPostComp callbackCanel={setIsCancel} callbackAddPost={addPost} id={userId}  />
                </div>
            }
        </>
    )
}

export default UserPostsComp