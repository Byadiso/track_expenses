const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
