import { getUserInfo } from "./api.js";

async function fetchUsernames() {
    try {
        const userInfo = await getUserInfo(); 
        const usernames = userInfo.map(user => user.username);

        const dropdown = document.getElementById('friends');
        usernames.forEach(username => {
            const option = document.createElement('option');
            option.value = username;
            option.textContent = username;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzernamen:', error);
    }
}


fetchUsernames();