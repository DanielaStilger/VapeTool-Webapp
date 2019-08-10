import { Subscription } from 'dva';
import { Reducer } from 'redux';

import { OnlineContentStatus } from '@vapetool/types';
import { database } from '@/utils/firebase';
import { getPhotoUrl } from '@/services/photo';
import { Photo } from '@/types/photo';
import DataSnapshot = firebase.database.DataSnapshot;


export interface PhotoModelState {
  photos: Photo[];
}

export interface PhotoModelType {
  namespace: string;
  state: PhotoModelState;
  effects: {};
  reducers: {
    addPhoto: Reducer<PhotoModelState>;
    removePhoto: Reducer<PhotoModelState>;
    setPhoto: Reducer<PhotoModelState>;
  };
  subscriptions: {
    subscribePhotos: Subscription
  };
}

const PhotoModel: PhotoModelType = {
  namespace: 'photo',

  state: {
    photos: [],
  },

  effects: {},

  reducers: {
    addPhoto(state = { photos: [] }, { photo }): PhotoModelState {
      state.photos.push(photo);
      return {
        ...(state as PhotoModelState),
        photos: state.photos,
      }
    },
    removePhoto(state = { photos: [] }, { key }): PhotoModelState {
      const newPhotos = state.photos.filter((value: Photo) => value.uid !== key);
      return {
        ...(state as PhotoModelState),
        photos: newPhotos,
      }
    },
    setPhoto(state = { photos: [] }, { photo }): PhotoModelState {
      const newPhotos = state.photos.map((it: Photo) => (photo.uid === it.uid ? photo : it));
      return {
        ...(state as PhotoModelState),
        photos: newPhotos,
      }
    },
  },

  subscriptions: {
    subscribePhotos({ dispatch }) {
      console.log('subscribePhotos');
      const ref = database.ref('gears')
        .orderByChild('status')
        .equalTo(OnlineContentStatus.ONLINE_PUBLIC)
        .limitToLast(100);

      ref.on('child_added', (snapshot: DataSnapshot) => {
        if (!snapshot || !snapshot.key) {
          return
        }
        getPhotoUrl(snapshot.key).then(url => dispatch({
          type: 'addPhoto',
          photo: Object.create({ ...snapshot.val(), url }) as Photo,
        }))
      });
      ref.on('child_changed', (snapshot: DataSnapshot) => {
        dispatch({
          type: 'setPhoto',
          photo: snapshot.val(),
        })
      });
      ref.on('child_removed', (snapshot: DataSnapshot) => {
        dispatch({
          type: 'removePhoto',
          key: snapshot.key,
        })
      });

      return () => {
        console.log('unsubscribePhotos triggered');
        ref.off()
      }
    },
  },
};

export default PhotoModel;
