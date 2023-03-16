import { Photo as FirebasePhoto , User } from '@vapetool/types';
import { DataSnapshot, DatabaseReference, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { coilsRef, likesRef, linksRef, liquidsRef, photosRef, postsRef, userRef } from '../utils/firebase';
import { getImageUrl, ImageType } from '../services/storage';
import { Coil, ItemName, Link, Liquid, Photo, Post } from '../types';

export async function getUser(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    return onValue(userRef(userId), (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject(null);
      }
    }, {
      onlyOnce: true
    });
  });
}

export async function getUserTotalContentCount(userId: string): Promise<number> {
  const promises = [linksRef, postsRef, photosRef].map(async (ref) => {
    const q = query(ref, orderByChild('author/uid'), equalTo(userId));
    return (await get(q)).size
  });
  const counts = await Promise.all(promises);
  return counts.reduce((prevVal, currentVal) => prevVal + currentVal, 0);
}


export async function getUserTotalLikesCount(userUid: string): Promise<number> {
  const promises = [
    { ref: photosRef, contentLikesRef: likesRef(ItemName.PHOTO) },
    { ref: postsRef, contentLikesRef: likesRef(ItemName.POST) },
    { ref: linksRef, contentLikesRef: likesRef(ItemName.LINK) },
  ].map(({ ref, contentLikesRef }) => getLikesCountForContentType(userUid, ref, contentLikesRef));

  const counts = await Promise.all(promises);
  return counts.reduce((prevVal, currentVal) => prevVal + currentVal, 0);
}


async function getLikesCountForContentType(
  userUid: string,
  contentRef: DatabaseReference,
  contentLikesRef: (uid: string) => DatabaseReference,
) {
  const snapshots = await get(query(contentRef, orderByChild('author/uid'), equalTo(userUid)));

  const promises = Array<Promise<number>>();
  snapshots.forEach((snapshot: DataSnapshot) => {
    const uid = snapshot.key;
    if (!uid) {
      return;
    }
    promises.push(get(contentLikesRef(uid)).then((snapshot) => snapshot.size))
  });

  const counts = await Promise.all(promises);
  return counts.reduce((prevVal, currentVal) => prevVal + currentVal, 0);
}

export async function getUserPhotos(uid: string): Promise<Photo[]> {
  const snapshots = await get(query(photosRef, orderByChild('author/uid'), equalTo(uid)))

  const firebasePhotos: FirebasePhoto[] = [];
  snapshots.forEach((snapshot: DataSnapshot) => {
    const firebasePhoto = snapshot.val();
    firebasePhotos.push(firebasePhoto);
  });
  const photosPromise = firebasePhotos.map((photo) =>
    getImageUrl(ImageType.PHOTO, photo.uid).then((url) => ({ ...photo, url } as Photo)),
  );

  return Promise.all(photosPromise)
}

export async function getUserPosts(uid: string): Promise<Post[]> {
  const snapshots = await get(query(postsRef, orderByChild('author/uid'), equalTo(uid)))

  const firebasePosts: Post[] = [];
  snapshots.forEach((snapshot: DataSnapshot) => {
    const firebasePost = snapshot.val();
    firebasePosts.push(firebasePost);
  });

  return firebasePosts;
}

export async function getUserLinks(uid: string): Promise<Link[]> {
  const snapshots = await get(query(linksRef, orderByChild('author/uid'), equalTo(uid)))

  const firebaseLinks: Link[] = [];
  snapshots.forEach((snapshot: DataSnapshot) => {
    const firebaseLink = snapshot.val();
    firebaseLinks.push(firebaseLink);
  });

  return firebaseLinks;
}

export async function getUserCoils(uid: string): Promise<Coil[]> {
  const snapshots = await get(query(coilsRef, orderByChild('author/uid'), equalTo(uid)))

  const firebaseCoils: Coil[] = [];
  snapshots.forEach((snapshot: DataSnapshot) => {
    const firebaseCoil = snapshot.val();
    firebaseCoils.push(firebaseCoil);
  });

  return firebaseCoils;
}

export async function getUserLiquids(uid: string): Promise<Liquid[]> {
  const snapshots = await get(query(liquidsRef, orderByChild('author/uid'), equalTo(uid)))

  const firebaseLiquids: Liquid[] = [];
  snapshots.forEach((snapshot: DataSnapshot) => {
    const firebaseLiquid = snapshot.val();
    firebaseLiquids.push(firebaseLiquid);
  });

  return firebaseLiquids;
}