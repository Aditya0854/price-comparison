// const express = require('express');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/search', (req, res) => {
//     const query = req.query.q;
//     if (!query) return res.status(400).json({ error: 'Missing query' });

//     // Run python script
//     // We use the full path to the venv python to ensure Playwright is found
//     const python = spawn('./venv/bin/python3', ['scraper.py', query]);

//     let dataToSend = '';

//     python.stdout.on('data', (data) => {
//         dataToSend += data.toString();
//     });

//     python.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     python.on('close', (code) => {
//         try {
//             res.json(JSON.parse(dataToSend));
//         } catch (error) {
//             res.status(500).send("Scraping failed or no data found.");
//         }
//     });
// });

// app.listen(3001, () => {
//     console.log('Server running on port 3001');
// });



const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    // Logic: If we are on Render (production), use global 'python3'.
    // If we are local, use './venv/bin/python3'.
    const pythonCommand = process.env.NODE_ENV === 'production' ? 'python3' : './venv/bin/python3';
    
    const python = spawn(pythonCommand, ['scraper.py', query]);

    let dataToSend = '';

    python.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        try {
            res.json(JSON.parse(dataToSend));
        } catch (error) {
            console.error("Parsing error or scraper failed");
            res.status(500).send("Scraping failed or no data found.");
        }
    });
});

// --- PORT CHANGE ---
// Render will provide a specific PORT in the environment variables.
// We fallback to 3001 only if we are running locally.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});