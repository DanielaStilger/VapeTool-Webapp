import { message, notification } from 'antd';
import {
  deleteLink,
  deletePhoto,
  deletePost,
  likeLink,
  likePhoto,
  likePost,
  reportLink,
  reportPhoto,
  reportPost,
  commentPhoto,
  commentPost,
  commentLink,
  deletePhotoComment,
  deletePostComment,
  deleteLinkComment,
} from '../services/items';
import { ItemName } from '../types';
import { User as DatabaseUser } from '@vapetool/types'

export async function like(what: ItemName, itemId: string, userId: string) {
  try {
    switch (what as ItemName) {
      case ItemName.PHOTO:
        await likePhoto(itemId, userId);
        break;
      case ItemName.LINK:
        await likeLink(itemId, userId);
        break;
      case ItemName.POST:
        await likePost(itemId, userId);
        break;
      default:
        throw Error('unsupported operation');
    }
  } catch (e) {
    if (e instanceof Error) {
      notification.error({ message: e.message });
    }
  }
}

export async function deleteItem(what: ItemName, itemId: string) {
  try {
    switch (what as ItemName) {
      case ItemName.PHOTO:
        await deletePhoto(itemId);
        break;
      case ItemName.LINK:
        await deleteLink(itemId);
        break;
      case ItemName.POST:
        await deletePost(itemId);
        break;
      default:
        throw Error('unsupported operation');
    }
    message.success(`Successfully deleted ${what}`);
  } catch (e) {
    if (e instanceof Error) {
      notification.error({ message: e.message });
    }
  }
}

export async function report(what: ItemName, itemId: string, userId: string) {
  try {
    switch (what as ItemName) {
      case ItemName.PHOTO:
        await reportPhoto(itemId, userId);
        break;
      case ItemName.LINK:
        await reportLink(itemId, userId);
        break;
      case ItemName.POST:
        await reportPost(itemId, userId);
        break;
      default:
        throw Error('unsupported operation');
    }
    message.success(`Successfully reported ${what}`);
  } catch (e) {
    if (e instanceof Error) {
      notification.error({ message: e.message });
    }
  }
}
export async function commentItem(what: ItemName, body: string, itemId: string, user: DatabaseUser) {
  try {
    if (!body) throw new Error('Comment can not be empty');
    switch (what) {
      case ItemName.PHOTO:
        await commentPhoto(itemId, body, user);
        break;
      case ItemName.LINK:
        await commentLink(itemId, body, user);
        break;
      case ItemName.POST:
        await commentPost(itemId, body, user);
        break;
      default:
        throw Error('unsupported operation');
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log('Errors occurs here', e);
      notification.error({ message: e.message });
    }
  }
}

export async function deleteComment(what: ItemName, itemId: string, commentId: string) {
  try {
    switch (what) {
      case ItemName.PHOTO:
        await deletePhotoComment(itemId, commentId);
        break;
      case ItemName.LINK:
        await deleteLinkComment(itemId, commentId);
        break;
      case ItemName.POST:
        await deletePostComment(itemId, commentId);
        break;
      default:
        throw Error('unsupported operation');
    }
    message.success('Successfully deleted comment');
  } catch (e) {
    if (e instanceof Error) {
      notification.error({ message: e.message });
    }
  }
}
