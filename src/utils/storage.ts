interface Storage {
  localGet<T>(name: string): T;

  localSet<T>(name: string, val: T): void;

  localRemove(name: string): void;

  localClear(): void;

  sessionGet<T>(name: string): T;

  sessionSet<T>(name: string, val: T): void;

  sessionRemove(name: string): void;

  sessionClear(): void;
}

const storage: Storage = {
  localGet: (name) => {
    try {
      return JSON.parse(localStorage.getItem(name) || '');
    } catch (e) {
      return null;
    }
  },

  localSet: (name, val) => {
    localStorage.setItem(name, JSON.stringify(val));
  },

  localRemove: (name) => {
    localStorage.removeItem(name);
  },

  localClear: () => {
    localStorage.clear();
  },

  sessionGet: (name) => {
    try {
      return JSON.parse(sessionStorage.getItem(name) || '');
    } catch (e) {
      return null;
    }
  },

  sessionSet: (name, val) => {
    sessionStorage.setItem(name, JSON.stringify(val));
  },

  sessionRemove: (name) => {
    sessionStorage.removeItem(name);
  },

  sessionClear: () => {
    sessionStorage.clear();
  }
};

export default storage;
