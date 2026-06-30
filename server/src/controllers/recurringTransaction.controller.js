// server/src/controllers/recurringTransaction.controller.js
import RecurringTransaction from "../models/recurringTransaction.model.js";

const VALID_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Savings",
  "Wallet funding",
  "Other",
];

// GET ALL RECURRING TRANSACTIONS
export const getRecurringTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const recurring = await RecurringTransaction.find({
      user_id: userId,
    }).sort({ next_run_date: 1 });

    res.json({ success: true, data: recurring });
  } catch (err) {
    next(err);
  }
};

// CREATE RECURRING TRANSACTION
export const createRecurringTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { type, amount, category, note, frequency, startDate } = req.body;

    if (!type || !amount || !category || !frequency || !startDate) {
      return res.status(400).json({
        success: false,
        message: "All fields except note are required.",
      });
    }

    if (!["credit", "debit"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be credit or debit.",
      });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category.",
      });
    }

    if (!["daily", "weekly", "monthly"].includes(frequency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid frequency.",
      });
    }

    const recurring = await RecurringTransaction.create({
      user_id: userId,
      type,
      amount: Math.round(amount * 100),
      category,
      note: note || "",
      frequency,
      next_run_date: new Date(startDate),
    });

    res.status(201).json({ success: true, data: recurring });
  } catch (err) {
    next(err);
  }
};

// TOGGLE ACTIVE / PAUSE
export const toggleRecurringTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const recurring = await RecurringTransaction.findOne({
      _id: id,
      user_id: userId,
    });

    if (!recurring) {
      return res
        .status(404)
        .json({ success: false, message: "Recurring transaction not found." });
    }

    recurring.active = !recurring.active;
    await recurring.save();

    res.json({ success: true, data: recurring });
  } catch (err) {
    next(err);
  }
};

// DELETE RECURRING TRANSACTION
export const deleteRecurringTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const recurring = await RecurringTransaction.findOne({
      _id: id,
      user_id: userId,
    });

    if (!recurring) {
      return res
        .status(404)
        .json({ success: false, message: "Recurring transaction not found." });
    }

    await recurring.deleteOne();

    res.json({ success: true, message: "Recurring transaction deleted." });
  } catch (err) {
    next(err);
  }
};
