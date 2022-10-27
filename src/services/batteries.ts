import { batteriesRef } from '../utils/firebase';
import { Affiliate, Battery } from '../types';
import { getBatteryUrl } from './storage';
import { id } from '@vapetool/types';
import { child, DataSnapshot, onValue, set, Unsubscribe } from 'firebase/database';

export function subscribeBatteries(onValueChange: (items: Battery[]) => void): Unsubscribe {
  return onValue(batteriesRef, (snapshot: DataSnapshot) => {
    const batteriesPromise: Promise<Battery>[] = new Array<Promise<Battery>>();
    snapshot.forEach((snap) => {
      const promise = getBatteryUrl(snap.key || id(snap.val())).then((url: string | undefined) => ({
        ...snap.val(),
        url,
        id: snap.key,
        affiliate: snap.val().affiliate ? new Map(Object.entries(snap.val().affiliate)) : undefined,
      }));
      batteriesPromise.push(promise);
    });

    Promise.all(batteriesPromise).then(onValueChange);
  });
}

export function saveAffiliate(batteryId: string, { name, link }: Affiliate) {
  return set(child(child(child(batteriesRef, batteryId), 'affiliate'),name), link)
}
