function set(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function remove(key) {
  window.localStorage.removeItem(key);
}

function clear() {
  window.localStorage.clear();
}

export default {
  set,
  get,
  remove,
  clear,
};
