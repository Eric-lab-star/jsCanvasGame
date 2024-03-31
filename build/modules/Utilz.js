class Storage {
    constructor() { }
    static set(value) {
        Object.assign(Storage.storage, value);
    }
    static get(name) {
        return Storage.storage[name];
    }
    static print() {
        return Storage.storage;
    }
}
Storage.storage = {};
export { Storage };
