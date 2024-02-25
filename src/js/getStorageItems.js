export const getLocalStorageItem = (itemName) => {
    const localStorageItem = localStorage.getItem(itemName);
    const parsedItem = JSON.parse(localStorageItem);
    return parsedItem;
   };