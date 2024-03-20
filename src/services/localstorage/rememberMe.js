export function remember(username) {
    localStorage.setItem('username', username);
}

export function getLastUser() {
    return localStorage.getItem('username');
}