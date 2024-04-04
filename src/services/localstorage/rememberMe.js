// Remember the username by saving it to the localStorage
export function remember(username) {
    localStorage.setItem('username', username);
}

// Get the last saved username from the localStorage
export function getLastUser() {
    return localStorage.getItem('username');
}