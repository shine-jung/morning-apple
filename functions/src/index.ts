import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IPost } from './types';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const updateTodayPost = functions
  .region('asia-northeast3') // 한국
  .pubsub.schedule('every day 08:50') // 매일
  .timeZone('Asia/Seoul')
  .onRun(async (_) => {
    const now = new Date();
    const posts = [] as IPost[];

    await admin
      .firestore()
      .collection('post')
      .where('viewed', '==', false)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() } as IPost);
        });
      });

    if (posts.length === 0) {
      console.error('There are no unviewed posts.');
    }

    const target = posts[Math.floor(Math.random() * posts.length)];
    const newPost = {
      ...target,
      viewed: true,
      viewedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const targetRef = admin.firestore().collection('post').doc(target.id);
    const todayRef = admin.firestore().collection('today').doc('post');

    await targetRef.set(newPost);
    await todayRef.set(newPost);
    console.info(`${now.toDateString()} 로그 기록됨.`);
  });
