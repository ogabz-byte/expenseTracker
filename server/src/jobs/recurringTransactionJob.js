// server/src/jobs/recurringTransactionJob.js
import cron from "node-cron";
import RecurringTransaction from "../models/recurringTransaction.model.js";
import Transaction from "../models/transaction.model.js";
import { getNextRunDate } from "../utils/dateHelpers.js";

const processDueRecurringTransactions = async () => {
  try {
    const now = new Date();

    const due = await RecurringTransaction.find({
      active: true,
      next_run_date: { $lte: now },
    });

    for (const rt of due) {
      // create the actual transaction
      await Transaction.create({
        user_id: rt.user_id,
        type: rt.type,
        amount: rt.amount,
        category: rt.category,
        note: rt.note ? `${rt.note} (recurring)` : "Recurring transaction",
      });

      // move to next occurrence
      rt.next_run_date = getNextRunDate(rt.next_run_date, rt.frequency);
      await rt.save();
    }

    if (due.length > 0) {
      console.log(`Processed ${due.length} recurring transaction(s)`);
    }
  } catch (err) {
    console.error("Error processing recurring transactions:", err);
  }
};

export const startRecurringTransactionJob = () => {
  // runs every day at midnight
  cron.schedule("0 0 * * *", processDueRecurringTransactions);

  // also run once on server startup to catch anything overdue
  processDueRecurringTransactions();
};
