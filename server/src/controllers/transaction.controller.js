// server/src/controllers/transaction.controller.js
import Transaction from "../models/transaction.model.js";
import PDFDocument from "pdfkit";

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

// GET ALL TRANSACTIONS
export const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: transactions });
  } catch (err) {
    next(err);
  }
};

// CREATE MANUAL TRANSACTION
export const createTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { type, amount, category, note } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Type, amount and category are required.",
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

    if (amount < 100) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount is ₦1.",
      });
    }

    // amount comes in naira from frontend, store in kobo
    const transaction = await Transaction.create({
      user_id: userId,
      type,
      amount: Math.round(amount * 100),
      category,
      note: note || "",
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      user_id: userId,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    await transaction.deleteOne();

    res.json({ success: true, message: "Transaction deleted." });
  } catch (err) {
    next(err);
  }
};

//export transaction

export const exportTransactionsCSV = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    // CSV header
    let csv = "Date,Type,Category,Note,Amount (NGN)\n";

    transactions.forEach((tx) => {
      const date = new Date(tx.createdAt).toLocaleDateString("en-NG");
      const amount = (tx.amount / 100).toFixed(2);
      // escape commas in note by wrapping in quotes
      const note = `"${(tx.note || "").replace(/"/g, '""')}"`;

      csv += `${date},${tx.type},${tx.category},${note},${amount}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=nairatrack-transactions.csv",
    );
    res.send(csv);
  } catch (err) {
    next(err);
  }
};

//Download PDF

export const exportTransactionsPDF = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = req.user;

    const transactions = await Transaction.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=nairatrack-statement.pdf",
    );

    doc.pipe(res);

    // Header
    doc
      .fontSize(20)
      .fillColor("#0B1120")
      .text("NairaTrack", { continued: false });

    doc
      .fontSize(10)
      .fillColor("#666666")
      .text("Transaction Statement", { continued: false });

    doc.moveDown(0.5);
    doc
      .fontSize(9)
      .fillColor("#999999")
      .text(`Generated for: ${user.name} (${user.email})`)
      .text(`Date: ${new Date().toLocaleDateString("en-NG")}`)
      .text(`Total transactions: ${transactions.length}`);

    doc.moveDown(1);

    // Table header
    const tableTop = doc.y;
    const colDate = 40;
    const colType = 130;
    const colCategory = 200;
    const colNote = 300;
    const colAmount = 460;

    doc
      .fontSize(9)
      .fillColor("#000000")
      .text("Date", colDate, tableTop, { bold: true })
      .text("Type", colType, tableTop)
      .text("Category", colCategory, tableTop)
      .text("Note", colNote, tableTop)
      .text("Amount", colAmount, tableTop);

    doc
      .moveTo(40, tableTop + 15)
      .lineTo(555, tableTop + 15)
      .strokeColor("#cccccc")
      .stroke();

    let y = tableTop + 25;

    // Table rows
    transactions.forEach((tx) => {
      if (y > 750) {
        doc.addPage();
        y = 40;
      }

      const date = new Date(tx.createdAt).toLocaleDateString("en-NG");
      const amount = (tx.amount / 100).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      });
      const sign = tx.type === "credit" ? "+" : "-";
      const color = tx.type === "credit" ? "#00C896" : "#9B6FD4";

      doc
        .fontSize(8)
        .fillColor("#333333")
        .text(date, colDate, y, { width: 85 })
        .text(tx.type, colType, y, { width: 65 })
        .text(tx.category, colCategory, y, { width: 95 })
        .text(tx.note || "-", colNote, y, { width: 150 })
        .fillColor(color)
        .text(`${sign}₦${amount}`, colAmount, y, { width: 95 });

      y += 20;
    });

    doc.end();
  } catch (err) {
    next(err);
  }
};
