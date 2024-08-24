const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = 'data.json';
let data = {
    participants: [],
    lastUpdateDate: '',
    messageTemplate: 'السلام عليكم {name}،\nجزء القرآن المخصص لك اليوم هو الجزء {juz}.\nبارك الله في قراءتك.'
};

// Load data from file
async function loadData() {
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.log('No existing data file, starting with empty data');
    }
}

// Save data to file
async function saveData() {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Update assignments if it's a new day
async function updateAssignmentsIfNewDay() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    if (currentDate !== data.lastUpdateDate) {
        data.participants.forEach(participant => {
            participant.juz = (participant.juz % 30) + 1; // Increment juz, wrapping from 30 to 1
        });
        data.lastUpdateDate = currentDate;
        await saveData();
    }
}

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// API routes
app.get('/api/participants', (req, res) => {
    res.json(data.participants);
});

app.get('/api/message-template', (req, res) => {
    res.json({ template: data.messageTemplate });
});

app.post('/api/add-participant', async (req, res) => {
    const { name, number, juz } = req.body;
    data.participants.push({ name, number, juz: parseInt(juz) });
    await saveData();
    res.json({ success: true, message: 'Participant added successfully' });
});

app.post('/api/remove-participant', async (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < data.participants.length) {
        data.participants.splice(index, 1);
        await saveData();
        res.json({ success: true, message: 'Participant removed successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid participant index' });
    }
});

app.post('/api/update-template', async (req, res) => {
    const { template } = req.body;
    data.messageTemplate = template;
    await saveData();
    res.json({ success: true, message: 'Message template updated successfully' });
});

app.post('/api/send-message', async (req, res) => {
    await updateAssignmentsIfNewDay();
    const { number, name } = req.body;
    const participant = data.participants.find(p => p.number === number);
    if (!participant) {
        return res.status(404).json({ success: false, message: 'Participant not found' });
    }
    try {
        const message = data.messageTemplate
            .replace('{name}', name)
            .replace('{juz}', participant.juz);
        await client.sendMessage(number, message);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
});

app.post('/api/send-all', async (req, res) => {
    await updateAssignmentsIfNewDay();
    try {
        for (let participant of data.participants) {
            const message = data.messageTemplate
                .replace('{name}', participant.name)
                .replace('{juz}', participant.juz);
            await client.sendMessage(participant.number, message);
        }
        res.json({ success: true, message: 'All messages sent successfully' });
    } catch (error) {
        console.error('Error sending messages:', error);
        res.status(500).json({ success: false, message: 'Error sending messages' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8900;

async function startServer() {
    await loadData();
    await updateAssignmentsIfNewDay();
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    client.initialize();
}

startServer();