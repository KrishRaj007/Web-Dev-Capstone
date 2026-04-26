import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { expenses, addExpense, deleteExpense } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleAdd = () => {
    if (!title || !amount) return;

    addExpense({
      title,
      amount: Number(amount),
      type,
    });

    setTitle("");
    setAmount("");
  };

  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((acc, e) => acc + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => acc + e.amount, 0);

  const balance = income - expense;
  const data = [
  { name: "Income", value: income },
  { name: "Expense", value: expense },
];

const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Summary */}
          <div className="bg-gray-50 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-gray-500">Balance</p>
                <p className="font-bold text-lg">₹{balance}</p>
              </div>
              <div>
                <p className="text-gray-500">Income</p>
                <p className="text-green-500 font-bold text-lg">₹{income}</p>
              </div>
              <div>
                <p className="text-gray-500">Expenses</p>
                <p className="text-red-500 font-bold text-lg">₹{expense}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-[12px] border-green-400 border-t-red-400"></div>
            </div>
          </div>

          {/* Add Transaction */}
          <div className="bg-gray-50 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              placeholder="Description"
            />

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              placeholder="Amount"
            />

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setType("income")}
                className={`flex-1 p-2 rounded ${
                  type === "income" ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                Income
              </button>

              <button
                onClick={() => setType("expense")}
                className={`flex-1 p-2 rounded ${
                  type === "expense" ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                Expense
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
            >
              + Add Transaction
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-6 bg-gray-50 p-5 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

          {expenses.length === 0 && (
            <p className="text-gray-500">No transactions yet</p>
          )}

          {expenses.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-2 border-b"
            >
              <span>{item.title}</span>

              <div className="flex gap-3 items-center">
                <span
                  className={
                    item.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {item.type === "income" ? "+" : "-"}₹{item.amount}
                </span>

                <button
                  onClick={() => deleteExpense(item.id)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}