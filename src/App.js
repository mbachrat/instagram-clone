import React, {useState, useEffect} from 'react';
import Post from './Post';
import './App.css';
import {db, auth} from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ClassNames } from '@emotion/react';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {


 const [posts, setPosts] = useState([]);
 const [openSignIn, setOpenSignIn] = useState('');
 const [open, setOpen] = useState(false);
 const [username, setUsername] = useState('');
 const [password, setpassword] = useState('');
 const [email, setEmail] = useState('');
 const [user, setUser] = useState(null);
// useEffect runs a piece of code based on a specific condition

useEffect(() =>{
  const unsubscribe = auth.onAuthStateChanged((authUser) =>{

  
  if (authUser) {
    // user has logged in...
    console.log(authUser);
    setUser(authUser);
  }
  else {
    // user has logged out...
    setUser(null);
  }
  return () => {
// perform some clean up
    unsubscribe();
  }
})
  
},[user, username]);


useEffect(()=> {
//this is where code runs
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
  setPosts(snapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  })))})
}, []);

const signUp = (event) => {
  event.preventDefault();

  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
    return authUser.user.updateProfile({
    displayName: username
    })
  })
  .catch((error)=>alert(error.message))

  setOpen(false);
}

const signIn = (event) => {
  event.preventDefault();

  auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
}


  return (
    <div className="App">
      <div>

{/* I want to have */}
{/* Caption input */}
{/* file picker */}
{/* post button */}
{user?.displayName ? (
  <ImageUpload username={user.displayName} />
): (
  <h3>neeed to login</h3>
)}


<Modal
  open={open}
  onClose={() => setOpen(false)}
 
>
  <div className={ClassNames.paper}>
<Box sx={style}>
  <form className='app_signup'>
    
  
      <Input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e)=> setUsername(e.target.value)}
      />
      <Input
      type="email"
      placeholder="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      />
      <Input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e)=> setpassword(e.target.value)}
      />
      <Button type="submit" onClick={signUp}>Sign Up</Button>
   
 </form>
</Box>
  </div>
</Modal>


<Modal
  open={openSignIn}
  onClose={() => setOpenSignIn(false)}
 
>
  <div className={ClassNames.paper}>
<Box sx={style}>
  <form className='app_signup'>
    
  
     
      <Input
      type="email"
      placeholder="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      />
      <Input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e)=> setpassword(e.target.value)}
      />
      <Button type="submit" onClick={signIn}>Sign In</Button>
   
 </form>
</Box>
  </div>
</Modal>
</div>


          {/* HEADER */}
        <div className='app_header'>
          <img 
          className='app_headerImage'
            src='https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png'
            alt='Instagram'> 
            </img>

            <div>
              
            </div>
        </div>

        <h1>Hello good world ????</h1>

{user ? (
  <Button onClick={() => auth.signOut()}>LOGOUT</Button>
): (
  <div>
  <Button onClick={() => setOpenSignIn(true)}>SIGN IN</Button>
  <Button onClick={() => setOpen(true)}>SIGNUP</Button>
  </div>
)}

        
        {
          posts.map(({id, post}) => (
            <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }

        
        
        {/*post */}
        {/*post */}

    </div>
  );
}

export default App;
