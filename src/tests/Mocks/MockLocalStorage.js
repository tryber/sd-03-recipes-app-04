export default class LocalStorage {
  constructor(obj = {}) { this.store = obj; }

  setItem(key, val) { this.store[key] = val.toString(); }

  getItem(key) { return this.store[key]; }

  removeItem(key) { delete this.store[key]; }

  clear() { this.store = {}; }
}
