const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/moneytracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const transactionSchema = new mongoose.Schema({
    type: String,
    description: String,
    amount: Number,
});
const Transaction = mongoose.model('Transaction', transactionSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/transactions', async (req, res) => {
    const { type, description, amount } = req.body;

    try {
        const newTransaction = new Transaction({ type, description, amount });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { type, description, amount } = req.body;

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { type, description, amount },
            { new: true }
        );
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        res.json(deletedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 