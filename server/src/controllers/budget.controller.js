// server/src/controllers/budget.controller.js
import Budget from "../models/budget.model.js";
import Transaction from "../models/transaction.model.js";

const VALID_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Savings",
  "Other",
];

// GET ALL BUDGETS with real spent amounts
export const getBudgets = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const budgets = await Budget.find({ user_id: userId });

    // get all debit transactions for this user
    const transactions = await Transaction.find({
      user_id: userId,
      type: "debit",
    });

    // calculate spent per category from real transactions
    const budgetsWithSpent = budgets.map((b) => {
      const spent = transactions
        .filter((t) => t.category === b.category)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        _id: b._id,
        category: b.category,
        limit: b.limit,
        spent,
      };
    });

    res.json({ success: true, data: budgetsWithSpent });
  } catch (err) {
    next(err);
  }
};

// CREATE BUDGET
export const createBudget = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { category, limit } = req.body;

    if (!category || !limit) {
      return res.status(400).json({
        success: false,
        message: "Category and limit are required.",
      });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category.",
      });
    }

    if (limit < 100) {
      return res.status(400).json({
        success: false,
        message: "Minimum budget limit is ₦1.",
      });
    }

    const existing = await Budget.findOne({ user_id: userId, category });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A budget for ${category} already exists.`,
      });
    }

    const budget = await Budget.create({
      user_id: userId,
      category,
      limit: Math.round(limit * 100), // store in kobo
    });

    res.status(201).json({ success: true, data: budget });
  } catch (err) {
    next(err);
  }
};

// UPDATE BUDGET
export const updateBudget = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { limit } = req.body;

    if (!limit || limit < 100) {
      return res.status(400).json({
        success: false,
        message: "Minimum budget limit is ₦1.",
      });
    }

    const budget = await Budget.findOne({ _id: id, user_id: userId });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    budget.limit = Math.round(limit * 100);
    await budget.save();

    res.json({ success: true, data: budget });
  } catch (err) {
    next(err);
  }
};

// DELETE BUDGET
export const deleteBudget = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const budget = await Budget.findOne({ _id: id, user_id: userId });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    await budget.deleteOne();

    res.json({ success: true, message: "Budget deleted." });
  } catch (err) {
    next(err);
  }
};
