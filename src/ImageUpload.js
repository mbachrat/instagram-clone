import { Button } from '@mui/material';
import React, {useState} from 'react';
import {storage, db} from "./firebase";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        //getting the name of the file
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        //event listener
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                )
                setProgress(progress);
            },
            (error) => {
                //error function..
                alert(error.message);
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image inside database
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username

                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }

  return (
    <div className='imageupload'>
        IMAGE UPLOAD

        <progress value={progress} max="100" />
        <input type="text" placeholder='Enter a Caption' onChange={event => setCaption(event.target.value)} value={caption} />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload