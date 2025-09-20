export function updateLocalStorage(key, newValue) {
  localStorage.setItem(key, JSON.stringify(newValue));
  window.dispatchEvent(new Event("storage"));
}
