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
        option.value = user.userid;
        option.textContent = user.username;
        dropdown.appendChild(option);
    });
    dropdown.value = selectedValue; // Ausgewählten Wert wiederherstellen
}

// Dropdown-Menü beim Klicken füllen
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('friends');
    dropdown.addEventListener('focus', populateDropdown, { once: true });
});
