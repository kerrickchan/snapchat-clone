import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Close,
  TextFields,
  Create,
  Note,
  MusicNote,
  AttachFile,
  Crop,
  Timer,
  Send
} from '@material-ui/icons';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase';

import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { db, storage } from './firebase';
import { selectUser } from './features/appSlice';

import "./Preview.css";

export default function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  React.useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    history.replace('/');
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on('stage_changed', null,
      (error: firebase.storage.FirebaseStorageError) => {
        console.log(error);
      },
      () => {
        // Complete
        storage.ref('posts').child(id).getDownloadURL()
          .then(imageUrl => {
            db.collection('posts').add({
              imageUrl,
              username: user!.username,
              read: false,
              profilePic: user!.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
          });
      }
    );
  };

  return (
    <div className="preview">
      <Close className="preview__close" onClick={closePreview} />
      <div className="preview__toolbar">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="Selfie Preview" />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send className="preview__send" fontSize="small" />
      </div>
    </div>
  )
}
