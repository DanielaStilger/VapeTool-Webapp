import { initializeApp } from 'firebase/app';
import { getDatabase, Database, ref } from 'firebase/database';
import { getStorage, FirebaseStorage, ref as storageRef } from 'firebase/storage';
import { getAuth, Auth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config';

const firebaseConfigProduction = {
  apiKey: "AIzaSyC1XSnUoeupHRqN8kuTqypGNkVYUWP0-uA",
  authDomain: "vape-tool-pro.firebaseapp.com",
  databaseURL: "https://vape-tool-pro.firebaseio.com",
  projectId: "vape-tool-pro",
  storageBucket: "vape-tool-pro.appspot.com",
  messagingSenderId: "526012004991",
  appId: "1:526012004991:web:fdaee9605b24874b"
};

const firebaseConfigDevelopment = {
  apiKey: "AIzaSyAmf_Tmb5VnPwH3niIX9Q2QPJOrCNgTEto",
  authDomain: "dev-vapetool.firebaseapp.com",
  databaseURL: "https://dev-vapetool.firebaseio.com",
  projectId: "dev-vapetool",
  storageBucket: "dev-vapetool.appspot.com",
  messagingSenderId: "1053309639962",
  appId: "1:1053309639962:web:a7469df6baf07ff86ee0a3"
};

import { ItemName } from '../types';
import { Mixable, Coil, MixResult, Liquid, Result, Properties } from '@vapetool/types';
import { IS_PRODUCTION } from './utils';

const devApp = initializeApp(firebaseConfigDevelopment);
const devDb = getDatabase(devApp);
const devStorage = getStorage(devApp);
const devAuth: Auth = getAuth(devApp);
const devFunctions = getFunctions(devApp);

const prodApp = initializeApp(firebaseConfigProduction, 'prod');
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
export const linksRef = dbRef('links');
export const photosRef = dbRef('gears');
export const usersRef = dbRef('users');
export const userRef = (uid: string) => dbRef('users/' + uid);
export const coilsRef = dbRef('coils');
export const liquidsRef = dbRef('liquids');

export const photoLikesRef = (uid: string) => dbRef('gear-likes/' + uid);
export const postLikesRef = (uid: string) => dbRef('post-likes/' + uid);
export const linkLikesRef = (uid: string) => dbRef('link-likes/' + uid);
export const coilLikesRef = (uid: string) => dbRef('coil-likes/' + uid);
export const liquidLikesRef = (uid: string) => dbRef('liquid-likes/' + uid);

export const likesRef = (item: ItemName, uid: string) => {
  switch (item) {
    case ItemName.PHOTO:
      return photoLikesRef(uid);
    case ItemName.POST:
      return postLikesRef(uid);
    case ItemName.COIL:
      return coilLikesRef(uid);
    case ItemName.LINK:
      return linkLikesRef(uid);
    case ItemName.LIQUID:
      return liquidLikesRef(uid);
    default:
      throw Error('illegal type');
  }
};

export const photoCommentsRef = (uid: string) => dbRef('gear-comments/' + uid);
export const postCommentsRef = (uid: string) => dbRef('post-comments/' + uid);
export const linkCommentsRef = (uid: string) => dbRef('link-comments/' + uid);
export const coilCommentsRef = (uid: string) => dbRef('coil-comments/' + uid);
export const liquidCommentsRef = (uid: string) => dbRef('liquid-comments/' + uid);

export const commentsRef = (item: ItemName, uid: string) => {
  switch (item) {
    case ItemName.PHOTO:
      return photoCommentsRef(uid);
    case ItemName.POST:
      return postCommentsRef(uid);
    case ItemName.COIL:
      return coilCommentsRef(uid);
    case ItemName.LINK:
      return linkCommentsRef(uid);
    case ItemName.LIQUID:
      return liquidCommentsRef(uid);
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
