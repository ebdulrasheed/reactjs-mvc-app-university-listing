export const getCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return [];
}

