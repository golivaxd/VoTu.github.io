const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Asegúrate de que dotenv esté instalado

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configurar CORS para permitir solicitudes desde tu dominio de Vercel
app.use(cors({
    origin: 'https://votu-rouge.vercel.app', // Reemplaza con tu dominio de Vercel
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Agregar encabezados de seguridad (CSP y CORS)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' https://votupage.onrender.com https://votu-rouge.vercel.app");
    res.setHeader("Access-Control-Allow-Origin", "https://votu-rouge.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.static(path.join(__dirname, '../F')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../F/index.html'));
});

app.get('/usuarios', async (req, res) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

app.post('/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', correo_electronico)
        .eq('contrasena', contrasena)
        .single();

    if (error || !data) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: data });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


