export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-purple-600">
        Expense Tracker
      </h1>

      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
        + Add Income
      </button>
    </div>
  );
}