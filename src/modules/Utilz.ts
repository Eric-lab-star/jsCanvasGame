interface StorageI {
  [index: string]: any;
}

class Storage {
  static storage: StorageI = {};
  constructor() {}

  static set(value: any) {
    Object.assign(Storage.storage, value);
  }

  static get(name: string): any {
    return Storage.storage[name];
  }
  static print() {
    return Storage.storage;
  }
}

export { Storage };
