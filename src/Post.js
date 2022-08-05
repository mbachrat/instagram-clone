import React, { useEffect, useState } from 'react'
import './Post.css';
import { Avatar } from '@mui/material';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import Button from '@mui/material/Button';

function Post({user, postId, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp','asc')
      .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    
    }

    return () => {
      unsubscribe();
      };
  }, [postId]);
  
  
  

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }


  
  return (
    <div className='post'>
        {/* header -> avatar, location, name, 3dot options*/}
        <div className='top_post'>
            <Avatar alt={username} 
            src="/static/images/avatar/1.jpg"
            sx={{ width: 35, height: 35 }}
             />
            <h3>{username}</h3>
        </div>
     

        {/* image */}
        <img className='post_image' src={imageUrl} alt='Post'>
        
        </img>

        {/* Username and caption */}
        <h4 className='post_text'><strong>{username}</strong>: {caption}</h4>

        {/*added comments*/}
          <div className='post_comments'>

          
            {comments.map((comment) => (
      <p>
        <strong>{comment.username}</strong> {comment.text}
      </p>
    ))}
           
          </div>





{user && (
 <form className='post_commentBox'>
 <input
   className='post_input'
   type="text"
   placeholder='Add a comment..'
   value={comment}
   onChange={(e) => setComment(e.target.value)}
 />
 <button 
 className='post_button'
 disabled={!comment}
 type="submit"
 onClick={postComment}
 >POST</button>
</form>
)}



       

    </div>
  )
}

export default Post