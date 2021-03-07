import firebase from 'firebase';

export default interface Post {
  id: string;
  data: firebase.firestore.DocumentData;
}
