import {
  Author,
  Comment,
  OnlineStatus,
  User,
  Photo as FirebasePhoto,
  Post as FirebasePost,
  Link as FirebaseLink,
  Liquid as FirebaseLiquid,
  Coil as FirebaseCoil
} from '@vapetool/types'
import { Item, ItemName, Photo, Liquid, Coil, Post, Link } from '../types'
import {
  coilsRef,
  commentsRef,
  itemRef,
  likesRef,
  linksRef,
  liquidsRef,
  photosRef,
  postsRef,
  reportsRef
} from '../utils/firebase'
import { getPhotoUrl, uploadPhoto } from '../services/storage'
import { serverTimestamp, DataSnapshot, DatabaseReference, Query, query, orderByChild, equalTo, limitToLast, onValue, get, startAt, endAt, push, set, remove, runTransaction, child } from 'firebase/database'

export function subscribePhotos (
  onValueChange: (items: Photo[]) => void,
  userId?: string
): () => void {
  return subscribeItems<Photo>(
    ItemName.PHOTO,
    photosRef,
    async (snap: DataSnapshot, photo: Photo) =>
      await getPhotoUrl(snap.key || photo.uid).then((url) => {
        if (!url) throw new Error('Url is not defined')
        return {
          ...photo,
          // backwards compatibility
          creationTime: photo.creationTime || photo.timestamp,
          lastTimeModified: photo.lastTimeModified || photo.timestamp,
          url,
          $type: ItemName.PHOTO
        }
      }),
    onValueChange,
    userId
  )
}

export function subscribeLinks (
  onValueChange: (items: Link[]) => void,
  userId?: string
): () => void {
  return subscribeItems<Link>(ItemName.LINK, linksRef, null, onValueChange, userId)
}

export function subscribePosts (
  onValueChange: (items: Post[]) => void,
  userId?: string
): () => void {
  return subscribeItems<Post>(ItemName.POST, postsRef, null, onValueChange, userId)
}

export function subscribeCoils (
  onValueChange: (items: Coil[]) => void,
  userId?: string
): () => void {
  return subscribeItems<Coil>(ItemName.COIL, coilsRef, null, onValueChange, userId)
}

export function subscribeLiquids (
  onValueChange: (items: Liquid[]) => void,
  userId?: string
): () => void {
  return subscribeItems<Liquid>(ItemName.LIQUID, liquidsRef, null, onValueChange, userId)
}

export function subscribeItems<T extends Item> (
  itemsName: ItemName,
  ref: DatabaseReference,
  transformation: ((snap: DataSnapshot, item: any) => Promise<T>) | null,
  onValueChange: (items: T[]) => void,
  userId?: string
): () => void {
  let q: Query
  if (userId) {
    q = query(ref, orderByChild('author/uid'), equalTo(userId))
  } else {
    q = query(ref, orderByChild('status'), equalTo(OnlineStatus.ONLINE_PUBLIC), limitToLast(100))
  }

  const unsubscribe = onValue(q, async (snapshot: DataSnapshot) => {
    const promises: Array<Promise<T>> = new Array<Promise<T>>()
    snapshot.forEach((snap) => {
      const dbObject = snap.val()
      if (!dbObject || Object.entries(dbObject).length === 0 || !dbObject.author) {
        // beauty of weak typed database, strange things can show up here :D
        console.error(`REMOVE EMPTY POST: ${snap.key}`)
        return
      }
      let item: Promise<T>
      if (transformation != null) {
        item = transformation(snap, dbObject)
      } else {
        item = Promise.resolve({
          ...dbObject,
          $type: itemsName
        })
      }
      promises.push(item)
    })

    const items = await Promise.all(promises)
    onValueChange(items)
  })

  return unsubscribe
}

// TODO determine if will be used
export async function getPhotos (from: number, to: number): Promise<FirebasePhoto[]> {
  return await new Promise<FirebasePhoto[]>((resolve, reject) => {
    get(query(photosRef, startAt(from), endAt(to)))
      .then((snapshots) => {
        const firebasePhotos = new Array<FirebasePhoto>()
        snapshots.forEach((snapshot: DataSnapshot) => {
          const firebasePhoto = snapshot.val()
          if (firebasePhoto && Object.entries(firebasePhoto).length !== 0) {
            firebasePhotos.push(firebasePhoto)
          }
        })
        resolve(firebasePhotos)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export async function createPost (title: string, text: string, author: Author): Promise<string> {
  if (!author || !author.uid || !author.displayName) {
    throw new Error('Author can not be null')
  }
  if (!title) {
    throw new Error('Title can not be empty')
  }

  const newObjectUid = await push(postsRef)
  if (newObjectUid?.key == null) {
    throw new Error('Could not push new post to database')
  }
  const uid = newObjectUid.key

  const newObject: FirebasePost = {
    uid,
    author,
    title,
    text,
    status: OnlineStatus.ONLINE_PUBLIC,
    creationTime: serverTimestamp,
    lastTimeModified: serverTimestamp
  }
  await set(newObjectUid, newObject)

  return uid
}

export async function createLink (title: string, url: string, author: Author): Promise<string> {
  if (!author || !author.uid || !author.displayName) {
    throw new Error('Author can not be null')
  }
  if (!title) {
    throw new Error('Title can not be empty')
  }
  if (!url) {
    throw new Error('Url can not be empty')
  }
  const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
  if (url.match(expression) == null) {
    throw new Error('Invalid url')
  }

  const newObjectUid = await push(linksRef)
  const uid = newObjectUid.key

  if (!uid) {
    throw new Error('Could not push new link to db')
  }
  const newObject: FirebaseLink = {
    uid,
    title,
    url,
    author,
    creationTime: serverTimestamp,
    lastTimeModified: serverTimestamp,
    status: OnlineStatus.ONLINE_PUBLIC
  }

  await set(newObjectUid, newObject)

  return uid
}

export async function createPhoto (
  // every argument shouldn't be undefined, but i prefer handling exceptions there
  imageBlob: Blob | File | undefined,
  description: string,
  author: Author,
  width: number | undefined,
  height: number | undefined
): Promise<string> {
  if (!author || !author.uid || !author.displayName) {
    throw new Error('Author can not be null')
  }
  if (!description) {
    throw new Error('Description can not be empty')
  }
  if (imageBlob == null) {
    throw new Error('Image can not be empty')
  }
  if (!width || !height) {
    throw new Error('Width and height can not be null')
  }
  const newObjectUid = await push(photosRef)
  const uid = newObjectUid.key

  if (uid == null) {
    throw new Error('Could not push new cloud to db')
  }
  try {
    const newObject: FirebasePhoto = {
      uid,
      author,
      description,
      status: OnlineStatus.ONLINE_PUBLIC,
      creationTime: serverTimestamp,
      lastTimeModified: serverTimestamp,
      timestamp: serverTimestamp,
      width,
      height,
      reports: 0
    }

    // It must be published to storage prior to database because db will trigger
    // update listener before storage is completed
    await uploadPhoto(imageBlob, uid)
    await set(newObjectUid, newObject)
    return uid
  } catch (e) {
    remove(newObjectUid)
    throw e
  }
}

export async function saveLiquid (
  liquid: Omit<FirebaseLiquid, 'name' | 'description'>,
  author: Author,
  name: string,
  description: string
) {
  if (!author) {
    throw new Error('Author can not be null')
  }
  const newObjectUid = await push(liquidsRef)
  const uid = newObjectUid.key
  if (uid == null) {
    throw new Error('Could not push new liquid to db')
  }
  try {
    const newObject: FirebaseLiquid = {
      uid,
      author,
      name,
      description,
      creationTime: serverTimestamp,
      lastTimeModified: serverTimestamp,
      status: OnlineStatus.ONLINE_PUBLIC,
      baseStrength: liquid.baseStrength,
      baseRatio: liquid.baseRatio,
      thinner: liquid.thinner,
      targetStrength: liquid.targetStrength,
      targetRatio: liquid.targetRatio,
      amount: liquid.amount,
      rating: liquid.rating,
      flavors: liquid.flavors
    }
    await set(newObjectUid, newObject)
    return uid
  } catch (e) {
    throw e
  }
}
export async function saveCoil (
  coil: Omit<FirebaseCoil, 'name' | 'description'>,
  author: Author,
  name: string,
  description: string
) {
  const newObjectUid = await push(coilsRef)
  const uid = newObjectUid.key
  if (uid == null) {
    throw new Error('Could not push new coil to db')
  }
  if (!author) {
    throw new Error('Author can not be null')
  }
  try {
    const newObject: FirebaseCoil = {
      uid,
      author,
      name,
      description,
      creationTime: serverTimestamp,
      lastTimeModified: serverTimestamp,
      status: OnlineStatus.ONLINE_PUBLIC,
      type: coil.type,
      setup: coil.setup,
      wraps: coil.wraps,
      resistance: coil.resistance,
      legsLength: coil.legsLength,
      innerDiameter: coil.innerDiameter,
      pitch: coil.pitch,
      heightDiameter: coil.heightDiameter,
      widthDiameter: coil.widthDiameter,
      totalLength: coil.totalLength,
      cores: coil.cores,
      outers: coil.outers
    }
    // TODO what about coil image?
    await set(newObjectUid, newObject)
    return uid
  } catch (e) {
    throw e
  }
}

export async function likePhoto (itemId: string, userId: string) {
  return await like(ItemName.PHOTO, itemId, userId)
}

export async function likePost (itemId: string, userId: string) {
  return await like(ItemName.POST, itemId, userId)
}

export async function likeLink (itemId: string, userId: string) {
  return await like(ItemName.LINK, itemId, userId)
}

async function like (what: ItemName, id: string, userId: string) {
  return await runTransaction(child(likesRef(what)(id), userId), (isLiked) => {
    if (isLiked) {
      return null
    }
    return serverTimestamp
  })
}

export async function reportPhoto (postId: string, userId: string): Promise<any> {
  return await report(ItemName.PHOTO, postId, userId)
}

export async function reportPost (postId: string, userId: string): Promise<any> {
  return await report(ItemName.POST, postId, userId)
}

export async function reportLink (linkId: string, userId: string): Promise<any> {
  return await report(ItemName.LINK, linkId, userId)
}

async function report (what: ItemName, id: string, userId: string): Promise<any> {
  return await set(reportsRef(what)(id), serverTimestamp)
}

export async function deletePhoto (postId: string) {
  return await deleteItem(ItemName.PHOTO, postId)
}

export async function deletePost (postId: string) {
  return await deleteItem(ItemName.POST, postId)
}

export async function deleteLink (linkId: string) {
  return await deleteItem(ItemName.LINK, linkId)
}

async function deleteItem (what: ItemName, id: string) {
  return await remove(itemRef(what)(id))
}

export function commentPhoto (id: string, content: string, user: User) {
  return commentItem(ItemName.PHOTO, id, content, user)
}

export function commentPost (id: string, content: string, user: User) {
  return commentItem(ItemName.POST, id, content, user)
}

export function commentLink (id: string, content: string, user: User) {
  return commentItem(ItemName.LINK, id, content, user)
}

function commentItem (
  what: ItemName,
  id: string,
  content: string,
  user: User
) {
  const comment = new Comment(new Author(user.uid, user.display_name), content, serverTimestamp)
  return push(commentsRef(what)(id), comment)
}

export async function deletePhotoComment (postId: string, commentId: string) {
  return await deleteItemComment(ItemName.POST, postId, commentId)
}

export async function deletePostComment (postId: string, commentId: string) {
  return await deleteItemComment(ItemName.POST, postId, commentId)
}

export async function deleteLinkComment (linkId: string, commentId: string) {
  return await deleteItemComment(ItemName.LINK, linkId, commentId)
}

async function deleteItemComment (what: ItemName, id: string, commentId: string): Promise<void> {
  const commentRef = child(commentsRef(what)(id), commentId)
  return await remove(commentRef)
}
