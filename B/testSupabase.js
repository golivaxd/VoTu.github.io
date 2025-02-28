const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        console.error('Error connecting to Supabase:', error);
    } else {
        console.log('Data received from Supabase:', data);
    }
}

testConnection();
