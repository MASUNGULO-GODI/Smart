const axios = require('axios');
require('dotenv').config(); 
// Load environment variables from .env file

const suggestTask = async (inputText) => {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Suggest a task title or description based on: ${inputText}` }]
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use the API key from .env
        }
    });
    return response.data.choices[0].message.content;
};

module.exports = { suggestTask };
