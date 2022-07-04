// export enum LOCAL_STORAGE_KEYS {
//   IS_LOGGED_IN = 'IS_LOGGED_IN',
// }
// Article about Enum and Treeshaking
// https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/

export const SESSION_STORAGE_KEYS = {
  AUTH: 'AUTH',
} as const;
type SESSION_STORAGE_KEYS_TYPE = typeof SESSION_STORAGE_KEYS[keyof typeof SESSION_STORAGE_KEYS];

export const initSessionStorage = (key: SESSION_STORAGE_KEYS_TYPE) => {
  const save = (value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const load = () => {
    try {
      const value = sessionStorage.getItem(key) ?? '{}';
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
    }
  };

  const hasSessionstorageSupport = Boolean(window.sessionStorage);
  if (!hasSessionstorageSupport) {
    console.error('SESSION STORAGE IS NOT SUPPORTED');
    return null;
  }

  return { save, load };
};
