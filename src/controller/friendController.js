const express = require('express');
const router = express.Router();
const { addFriend } = require('../model/mysqlHandler'); // Importiere die addFriend Methode

router.post('/addFriend', async (req, res) => {
    const { uid, friendname } = req.body;

    try {
        const result = await addFriend(uid, friendname);
        res.status(200).send('Freund erfolgreich hinzugefügt');
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Freundes:', error);
        res.status(500).send('Fehler beim Hinzufügen des Freundes');
    }
});

module.exports = router;
