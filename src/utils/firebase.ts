import { initializeApp } from 'firebase/app';
import { getDatabase, Database, ref, child, DatabaseReference } from 'firebase/database';
import { getStorage, FirebaseStorage, ref as storageRef } from 'firebase/storage';
import { getAuth, Auth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config';
import { ItemName } from '../types';
import { Mixable, Coil, MixResult, Liquid, Result, Properties } from '@vapetool/types';
import { IS_PRODUCTION } from './utils';



const firebaseProdConfig = {
  apiKey: "AIzaSyC1XSnUoeupHRqN8kuTqypGNkVYUWP0-uA",
  authDomain: "vape-tool-pro.firebaseapp.com",
  databaseURL: "https://vape-tool-pro.firebaseio.com",
  projectId: "vape-tool-pro",
  storageBucket: "vape-tool-pro.appspot.com",
  messagingSenderId: "526012004991",
  appId: "1:526012004991:web:fdaee9605b24874b"
};

const firebaseDevConfig = {
  apiKey: "AIzaSyAmf_Tmb5VnPwH3niIX9Q2QPJOrCNgTEto",
  authDomain: "dev-vapetool.firebaseapp.com",
  databaseURL: "https://dev-vapetool.firebaseio.com",
  projectId: "dev-vapetool",
  storageBucket: "dev-vapetool.appspot.com",
  messagingSenderId: "1053309639962",
  appId: "1:1053309639962:web:a7469df6baf07ff86ee0a3"
};

// firebaseConfig.databaseURL = 'ws://localhost:5555';

const devApp = initializeApp(firebaseDevConfig);
const devDb = getDatabase(devApp);
const devStorage = getStorage(devApp);
const devAuth: Auth = getAuth(devApp);
const devFunctions = getFunctions(devApp);

const prodApp = initializeApp(firebaseProdConfig, 'prod');
const prodDb = getDatabase(prodApp);
const prodStorage = getStorage(prodApp);
const prodAuth: Auth = getAuth(prodApp);
const prodFunctions = getFunctions(prodApp);


export function functions() {
  return IS_PRODUCTION ? prodFunctions : devFunctions;
}

export function remoteConfig(): RemoteConfig {
  return IS_PRODUCTION ? getRemoteConfig(prodApp) : getRemoteConfig(devApp);
}

export function database(): Database {
  return IS_PRODUCTION ? prodDb : devDb;
}

export function storage(): FirebaseStorage {
  return IS_PRODUCTION ? prodStorage : devStorage;
}

export function auth(): Auth {
  return IS_PRODUCTION ? prodAuth : devAuth;
}

const dbRef = (path: string) => ref(database(), path);

export const batteriesRef = ref(prodDb, 'batteries');
export const postsRef = dbRef('posts');
export const postRef = (uid: string) => child(postsRef, uid);
export const linksRef = dbRef('links');
export const linkRef = (uid: string) => child(linksRef, uid);
export const coilsRef = dbRef('coils');
export const coilRef = (uid: string) => child(coilsRef, uid);
export const liquidsRef = dbRef('liquids');
export const liquidRef = (uid: string) =>  child(liquidsRef, uid);
export const photosRef = dbRef('gears');
export const photoRef = (uid: string) => child(photosRef, uid);
export const usersRef = dbRef('users');
export const userRef = (uid: string) => child(usersRef, uid);

export const itemRef = (item: ItemName): (id: string) => DatabaseReference => {
  switch (item) {
    case ItemName.PHOTO:
      return photoRef;
    case ItemName.POST:
      return postRef;
    case ItemName.COIL:
      return coilRef;
    case ItemName.LINK:
      return linkRef;
    case ItemName.LIQUID:
      return liquidRef;
    default:
      throw Error('illegal type');
  }
}

export const itemsRef = (item: ItemName): DatabaseReference => {
  switch (item) {
    case ItemName.PHOTO:
      return photosRef;
    case ItemName.POST:
      return postsRef;
    case ItemName.COIL:
      return coilsRef;
    case ItemName.LINK:
      return linksRef;
    case ItemName.LIQUID:
      return liquidsRef;
    default:
      throw Error('illegal type');
  }
}

export const photoLikesRef = (uid: string) => child(dbRef('gear-likes'), uid);
export const postLikesRef = (uid: string) => child(dbRef('post-likes'), uid);
export const linkLikesRef = (uid: string) => child(dbRef('link-likes'), uid);
export const coilLikesRef = (uid: string) => child(dbRef('coil-likes'), uid);
export const liquidLikesRef = (uid: string) => child(dbRef('liquid-likes'), uid);

export const likesRef = (item: ItemName): (uid: string) => DatabaseReference => {
  switch (item) {
    case ItemName.PHOTO:
      return photoLikesRef;
    case ItemName.POST:
      return postLikesRef;
    case ItemName.COIL:
      return coilLikesRef;
    case ItemName.LINK:
      return linkLikesRef;
    case ItemName.LIQUID:
      return liquidLikesRef;
    default:
      throw Error('illegal type');
  }
};

export const photoCommentsRef = (uid: string) => child(dbRef('gear-comments'), uid);
export const postCommentsRef = (uid: string) => child(dbRef('post-comments'), uid);
export const linkCommentsRef = (uid: string) => child(dbRef('link-comments'), uid);
export const coilCommentsRef = (uid: string) => child(dbRef('coil-comments'), uid);
export const liquidCommentsRef = (uid: string) => child(dbRef('liquid-comments'), uid);

export const commentsRef = (item: ItemName): (uid: string) => DatabaseReference => {
  switch (item) {
    case ItemName.PHOTO:
      return photoCommentsRef;
    case ItemName.POST:
      return postCommentsRef;
    case ItemName.COIL:
      return coilCommentsRef;
    case ItemName.LINK:
      return linkCommentsRef;
    case ItemName.LIQUID:
      return liquidCommentsRef;
    default:
      throw Error('illegal type');
  }
};

export const photoReportsRef = (uid: string) => child(dbRef('gear-reports'), uid);
export const postReportsRef = (uid: string) => child(dbRef('post-reports'), uid);
export const linkReportsRef = (uid: string) => child(dbRef('link-reports'), uid);
export const coilReportsRef = (uid: string) => child(dbRef('coil-reports'), uid);
export const liquidReportsRef = (uid: string) => child(dbRef('liquid-reports'), uid);

export const reportsRef = (item: ItemName): (uid: string) => DatabaseReference => {
  switch (item) {
    case ItemName.PHOTO:
      return photoReportsRef;
    case ItemName.POST:
      return postReportsRef;
    case ItemName.COIL:
      return coilReportsRef;
    case ItemName.LINK:
      return linkReportsRef;
    case ItemName.LIQUID:
      return liquidReportsRef;
    default:
      throw Error('illegal type');
  }
};


const imagesRef = (path: string) => storageRef(storage(), path)
export const batteriesStorageRef = (uid: string) => storageRef(prodStorage, 'batteries/images/' + uid + '.jpg');
export const usersStorageRef = (uid: string) => imagesRef('users/images/' + uid + '.jpg');
export const coilsStorageRef = (uid: string) => imagesRef('coils/images' + uid + '.jpg');
export const photosStorageRef = (uid: string) => imagesRef('gears/images/' + uid + '.jpg');


let userLoaded: boolean = false;


export function getCurrentUser(): Promise<FirebaseUser | undefined> {
  return new Promise<FirebaseUser | undefined>((resolve, reject) => {
    if (userLoaded) {
      resolve(getAuth().currentUser ?? undefined);
    }
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      userLoaded = true;
      unsubscribe();
      resolve(user ?? undefined);
    }, reject);
  });
}

export async function callFirebaseFunction<T extends MixResult | Result[] | Coil | Properties>(
  name:
    | 'calculateForResistance'
    | 'calculateForWraps'
    | 'calculateForProperties'
    | 'calculateForWrapsBasedOnPower'
    | 'calculateResults'
    | 'calculateForMix',
  data:
    | { mixable1: Mixable; mixable2: Mixable; preferences?: any }
    | { coil: Coil; baseVoltage?: number }
    | { coil: Coil; power: number; heatFlux: number }
    | { liquid: Liquid },
): Promise<T> {
  const res = await httpsCallable(getFunctions(), name)(data);
  return res.data as Promise<T>;
}

export async function createStripeManageLink(returnUrl: string): Promise<string> {
  const res = await httpsCallable(getFunctions(), 'createStripeManageLink')({ returnUrl });
  return res.data as string;
}

export async function createStripePayment(
  item: string,
  successUrl: string,
  cancelUrl: string,
): Promise<string> {
  const res = await httpsCallable(getFunctions(), 'createCheckoutSession')({
    item,
    successUrl,
    cancelUrl,
  });
  return res.data as string;
}