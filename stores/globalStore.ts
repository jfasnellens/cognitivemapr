/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia';
import { updateColors } from '~/scripts/colorModes';
import type { Degrees, Edge, NamedValue, Node, ParadigmSupport, RelevantKeys } from '~/types/graph';
import type { NotificationOptions } from '~/types/notifications';

export const useGlobalStore = defineStore('globalStore', () => {
  const darkMode: Ref<boolean> = useCookie('darkMode');
  const colorBlindMode: Ref<boolean> = useCookie('colorBlindMode');
  const toast = useToast();
  const loading: Ref<boolean> = ref(false);

  const errorVisible: Ref<boolean> = ref(false);
  /**
   * Storage for notifications send on current session
   */
  const notificationStorage: Map<string, NotificationOptions> = new Map();
  /** Auto incrementing notification ID */
  const notificationId = ref<number>(0);

  const scriptSettings = ref({
    paradigmSupport: { name: 'Paradigm Support', enabled: true },
    instrumentSupport: { name: 'Instrument Support', enabled: false },
    evaluateConcepts: { name: 'Evaluate Concepts', enabled: true },
  });
  const pathSettings = ref({
    showChildrenOnClick: { name: 'Show Children of Clicked Node', enabled: false },
    showAncestorsOnClick: { name: 'Show Ancestors of Clicked Node', enabled: true },
  });
  const visualSettings = ref({
    showLegend: { name: 'Show Legend', enabled: true },
    showEdgeWeights: { name: 'Show Edge Weights', enabled: false },
    scaleEdgesByWeight: { name: 'Scale Edges by Weight', enabled: true },
    scaleNodesByDegrees: { name: 'Scale Nodes by Degrees', enabled: false },
    showAttributesOnHover: { name: 'Show Node Attributes on Hover', enabled: true },
    showDegreeValues: { name: 'Show Weighted Degree Value in Nodes', enabled: false },
  });

  /**
   * Syncs dark mode upon initial app load troughout different components.
   */
  function syncDarkMode() {
    useColorMode().value = darkMode.value ? 'dark' : 'light';
  }
  /**
   * Toggles darkmode across the program
   * @param val True for darkmode, false for not
   * @param updateColorMode True when the mode should be updated, false for not
   */
  function toggleDarkMode(val: boolean, updateColorMode = true) {
    darkMode.value = val;
    if (val) updateColors('darkMode');
    else updateColors('light');
    if (updateColorMode) {
      useColorMode().value = darkMode.value ? 'dark' : 'light';
      useColorMode().preference = darkMode.value ? 'dark' : 'light';
    }
  }

  /**
   * Toggles colorblindmode across the program
   * @param val True for colorblindmode, false for not
   * @param updateColorMode True when the mode should be updated, false for not
   */
  function toggleColorBlindMode(val: boolean, updateColorMode = true) {
    colorBlindMode.value = val;
    if (val) updateColors('colorBlindMode');
    else updateColors('light');
    if (updateColorMode) {
      useColorMode().value = darkMode.value ? 'dark' : 'light';
      useColorMode().preference = darkMode.value ? 'dark' : 'light';
    }
  }

  /**
   * Shows a success notification to the user
   * @param Options Notification context
   * @param Options.message Message to give to log
   * @param Options.who Where did the log come from?
   * @param Options.callback function to execute when notification is clicked
   */
  function logSuccess({
    message,
    who,
    callback,
  }: {
    message: string;
    who?: string;
    callback?: () => void;
  }) {
    const notificationData: NotificationOptions = {
      id: notificationId.value.toString(),
      title: `${who}`,
      text: `${message}`,
      type: 'success',
    };
    toast.add({
      id: notificationId.value.toString(),
      title: `${who}`,
      description: `${message}`,
      click: callback,
      timeout: 10000,
      color: 'green',
    });

    // notify(notificationData);
    notificationStorage.set(notificationId.value.toString(), { ...notificationData, callback });
    notificationId.value += 1;
  }
  /**
   * Shows a warning notification to the user and logs it to the console
   * @param Options Notification context
   * @param Options.message Message to give to log
   * @param Options.who Where did the log come from?
   * @param Options.callback function to execute when notification is clicked
   * @param Options.error Error object to log if available
   */
  function logWarning({
    message,
    who,
    callback,
    error,
  }: {
    message: string;
    who?: string;
    callback?: () => void;
    error?: Error;
  }) {
    const notificationData: NotificationOptions = {
      id: notificationId.value.toString(),
      title: `${who}`,
      text: `${message}`,
      type: 'warning',
    };
    toast.add({
      id: notificationId.value.toString(),
      title: `${who}`,
      description: `${message}`,
      click: callback,
      timeout: 10000,
      color: 'amber',
    });
    notificationStorage.set(notificationId.value.toString(), { ...notificationData, callback });
    notificationId.value += 1;
    /* eslint-disable-next-line no-console */
    if (error) console.warn(error);
  }

  /**
   * Shows an error notification to the user and logs it to the console
   * @param Options Notification context
   * @param Options.message Message to give to log
   * @param Options.who Where did the log come from?
   * @param Options.callback function to execute when notification is clicked
   * @param Options.error Error object to log if available
   */
  function logError({
    message,
    who,
    callback,
    error,
  }: {
    message: string;
    who?: string;
    callback?: () => void;
    error?: Error;
  }) {
    const notificationData: NotificationOptions = {
      id: notificationId.value.toString(),
      title: `${who}`,
      text: `${message}`,
      type: 'error',
    };
    toast.add({
      id: notificationId.value.toString(),
      title: `${who}`,
      description: `${message}`,
      click: callback,
      timeout: 10000,
      color: 'red',
    });
    notificationStorage.set(notificationId.value.toString(), { ...notificationData, callback });
    notificationId.value += 1;
    /* eslint-disable-next-line no-console */
    if (error) console.error(error);
    errorVisible.value = true;
  }

  /**
   * Notification click handler, this function gets called and looks for the callback that is assigned to the notification ID.
   * @param item Notification item that has been clicked
   */
  function handleNotificationCallback(item: NotificationOptions) {
    if (!item.id) {
      logError({ message: 'Notification has no ID', who: 'Internal Notification system' });
      return;
    }
    if (!notificationStorage.has(item.id)) {
      logError({
        message: 'Notification not found in storage',
        who: 'Internal Notification system',
      });
      return;
    }
    const callback = notificationStorage.get(item.id)!.callback;
    if (callback) callback();
  }

  type NodeOrEdgeOrSubType =
    | Node
    | Edge
    | Partial<Node>
    | Partial<Edge>
    | Degrees
    | NamedValue
    | Partial<NamedValue>
    | ParadigmSupport;
  type returnTypeNodeEdgeSubType = NodeOrEdgeOrSubType[string];
  /**
   * @param objs - Will call relevantObject() for each object passed
   * @param relevantKeys - keys and subKeys to keep, keys that don't exist are ignored
   * @returns - array of key filtered objects
   */
  function relevantObjectData(
    objs: (Node | Edge)[],
    relevantKeys: RelevantKeys[],
  ): NodeOrEdgeOrSubType[] {
    const relevantData: NodeOrEdgeOrSubType[] = [];
    objs.forEach((obj) => {
      relevantData.push(relevantObject(obj, relevantKeys));
    });
    return relevantData;
  }

  /**
   * @param obj - object to filter
   * @param keys - keys and subkeys to keep
   * @returns - Will return an object with keys(and their values) that where in both the keys array and the input object
   */
  function relevantObject(obj: NodeOrEdgeOrSubType, keys: RelevantKeys[]): NodeOrEdgeOrSubType {
    const allKeys = keys.map((r) => r.key);

    const relevant = (
      key: string,
      value: returnTypeNodeEdgeSubType,
    ): [string, returnTypeNodeEdgeSubType] | undefined => {
      const atKey = allKeys.indexOf(key);
      const isKey = atKey > -1;
      const isObj = typeof value === 'object';

      if (isKey && isObj) {
        const subKeys = keys[atKey].subKeys;
        const hasSubKeys = subKeys !== undefined;

        if (hasSubKeys)
          return [
            key,
            relevantObject(value as NodeOrEdgeOrSubType, subKeys) as returnTypeNodeEdgeSubType,
          ];
      } else if (isKey) return [key, value];
    };

    const filtered: [string, returnTypeNodeEdgeSubType][] = [];
    Object.keys(obj).forEach((key) => {
      const result = relevant(key, obj[key]);
      if (result !== undefined) filtered.push(result);
    });

    const toObject = Object.fromEntries(filtered);

    return toObject;
  }

  return {
    syncDarkMode,
    toggleDarkMode,
    darkMode,
    logWarning,
    logError,
    logSuccess,
    handleNotificationCallback,
    scriptSettings,
    pathSettings,
    visualSettings,
    notificationStorage: readonly(notificationStorage),
    notificationId: readonly(notificationId),
    relevantObject,
    relevantObjectData,
    loading,
    errorVisible,
    toggleColorBlindMode,
    colorBlindMode,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
