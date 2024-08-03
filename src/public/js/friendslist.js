async function fetchUserInfo() {
    const response = await fetch('/blog/allUsers/');
    const users = await response.json();
    return users;
}

async function populateDropdown() {
    const users = await fetchUserInfo();
    const dropdown = document.getElementById('friends');
    dropdown.innerHTML = ''; // Vorherige Optionen entfernen
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.userid;
        option.textContent = user.username;
        dropdown.appendChild(option);
    });
}

// Dropdown-Menü beim Klicken füllen
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('friends');
    dropdown.addEventListener('click', populateDropdown);
});
