const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createExpense = async (req, res) => {
    const expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.searchExpenses = async (req, res) => {
    try {
      const { keyword } = req.query;  
      // Example: Searching expenses by description containing the keyword
      const expenses = await Expense.find({ description: { $regex: new RegExp(keyword, 'i') } });
  
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search expenses' });
    }
  };
