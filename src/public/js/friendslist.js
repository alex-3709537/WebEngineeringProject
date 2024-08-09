import { getUserInfo } from './api.js';

async function fetchUserInfo() {
    const response = await fetch('/blog/allUsers/');
    const users = await response.json();
    return users;
}

async function populateDropdown() {
    const users = await fetchUserInfo();
    const dropdown = document.getElementById('friends');
    const selectedValue = dropdown.value; // Aktuell ausgewählten Wert speichern
    dropdown.innerHTML = ''; // Vorherige Optionen entfernen
    users.forEach(user => {
        const option = document.createElement('option');
        option.textContent = user.username;
        dropdown.appendChild(option);
    });
    dropdown.value = selectedValue; // Ausgewählten Wert wiederherstellen
}

// Dropdown-Menü beim Klicken füllen
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('friends');
    dropdown.addEventListener('focus', populateDropdown, { once: true });

    const addButton = document.getElementById('addFriendButton');
    addButton.addEventListener('click', addFriendToDatabase);
});

async function addFriendToDatabase() {
    const dropdown = document.getElementById('friends');
    const selectedFriendId = dropdown.value;
    const userInfo = await getUserInfo(); // UID des angemeldeten Benutzers erhalten
    const userId = userInfo.uid;
    
    
    const response = await fetch('/blog/addFriend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid : userId,
            friendname: selectedFriendId
        })
    });

    if (response.ok) {
        console.log('Freund erfolgreich hinzugefügt');
    } else {
        console.error('Fehler beim Hinzufügen des Freundes');
    }
}

