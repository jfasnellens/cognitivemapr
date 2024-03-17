/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { createPinia, setActivePinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';

describe('Global store - Notification system', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Can notify an success and store it with no callback', () => {
    const store = useGlobalStore();
    store.logSuccess({ who: 'testing framework', message: 'a correct message!' });
    expect(store.notificationStorage.has('0')).toBe(true);
    expect(store.notificationStorage.get('0')?.text).toBe('a correct message!');
    expect(store.notificationStorage.get('0')?.title).toBe('testing framework');
    expect(store.notificationStorage.get('0')?.type).toBe('success');
    expect(store.notificationStorage.get('0')?.callback).toBeUndefined();
    expect(store.notificationId).toBe(1);
  });
  it('Can notify an warning and store it with no callback', () => {
    const store = useGlobalStore();
    store.logWarning({ who: 'testing framework', message: 'a correct message!' });
    expect(store.notificationStorage.has('0')).toBe(true);
    expect(store.notificationStorage.get('0')?.text).toBe('a correct message!');
    expect(store.notificationStorage.get('0')?.title).toBe('testing framework');
    expect(store.notificationStorage.get('0')?.type).toBe('warning');
    expect(store.notificationStorage.get('0')?.callback).toBeUndefined();
    expect(store.notificationId).toBe(1);
  });
  it('Can notify an error and store it with no callback', () => {
    const store = useGlobalStore();
    store.logError({ who: 'testing framework', message: 'a correct message!' });
    expect(store.notificationStorage.has('0')).toBe(true);
    expect(store.notificationStorage.get('0')?.text).toBe('a correct message!');
    expect(store.notificationStorage.get('0')?.title).toBe('testing framework');
    expect(store.notificationStorage.get('0')?.type).toBe('error');
    expect(store.notificationStorage.get('0')?.callback).toBeUndefined();
    expect(store.notificationId).toBe(1);
  });

  it('Can notify an success and store it with callback', () => {
    const store = useGlobalStore();
    let testingVal = 0;
    store.logSuccess({
      who: 'testing framework',
      message: 'a correct message!',
      callback: () => {
        testingVal++;
      },
    });
    expect(store.notificationStorage.get('0')?.callback).toBeDefined();
    store.notificationStorage.get('0')!.callback!();
    expect(testingVal).toBe(1);
  });
  it('Can notify an warning and store it with callback', () => {
    const store = useGlobalStore();
    let testingVal = 0;
    store.logWarning({
      who: 'testing framework',
      message: 'a correct message!',
      callback: () => {
        testingVal++;
      },
    });
    expect(store.notificationStorage.get('0')?.callback).toBeDefined();
    store.notificationStorage.get('0')!.callback!();
    expect(testingVal).toBe(1);
  });
  it('Can notify an error and store it with callback', () => {
    const store = useGlobalStore();
    let testingVal = 0;
    store.logError({
      who: 'testing framework',
      message: 'a correct message!',
      callback: () => {
        testingVal++;
      },
    });
    expect(store.notificationStorage.get('0')?.callback).toBeDefined();
    store.notificationStorage.get('0')!.callback!();
    expect(testingVal).toBe(1);
  });
});
