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

export const extractNumber = (hash: string) => {
  return hash.replace(/[^0-9]/g, "");
};

export const getIsScrollOnBottom = (element: Element, _margin?: number) => {
  const margin = _margin ?? 0;
  return element.scrollHeight - margin <= element.clientHeight + element.scrollTop;
};

interface scrollToBottomInterface {
  containerRef: React.RefObject<HTMLElement>;
  when: 'always' | 'onBottom';
  bottomMargin?: number;
  isBehaviorSmooth?: boolean;
}

export const scrollToBottom = ({ containerRef, when, bottomMargin, isBehaviorSmooth }: scrollToBottomInterface) => {
  const containerElement = containerRef.current;
  if (!containerElement) {
    return;
  }

  const lastElementChild = containerElement.lastElementChild;
  if (!lastElementChild) {
    return;
  }

  const bottomScrollPosition = containerElement.scrollHeight - containerElement.clientHeight;
  const scrollToOptions: ScrollToOptions = {
    top: bottomScrollPosition,
    behavior: isBehaviorSmooth ? 'smooth' : 'auto',
  };

  switch (when) {
    case 'onBottom':
      if (getIsScrollOnBottom(containerElement, bottomMargin)) {
        containerElement.scrollTo(scrollToOptions);
      }
      break;
    case 'always':
      containerElement.scrollTo(scrollToOptions);
  }
};

export const scrollToPosition = (ref: React.RefObject<HTMLElement>, position?: number, behaviorSmooth?: boolean) => {
  ref.current?.scrollTo({ top: position, behavior: behaviorSmooth ? 'smooth' : 'auto' });
};