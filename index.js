const express = require('express');
const app = express();
const PORT = 5000;

// Basic health check route
app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
            <h1 style="color: #4A90E2;">Wish and Surprise Backend is LIVE! 🚀</h1>
            <p>Ready for Monday Development Session.</p>
            <p style="color: #666;">Domain: wishandsurprise.com | Port: ${PORT}</p>
        </div>
    `);
});

// API route test
app.get('/api/status', (req, res) => {
    res.json({ message: "API is working perfectly!", status: "success" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
