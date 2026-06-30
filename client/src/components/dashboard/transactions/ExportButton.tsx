// // client/components/dashboard/transactions/ExportButton.tsx
// "use client";

// import { useState } from "react";
// import api from "@/lib/api";

// export default function ExportButton() {
//   const [loading, setLoading] = useState(false);

//   const handleExport = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/api/transactions/export/csv", {
//         responseType: "blob",
//       });

//       // create a download link
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "nairatrack-transactions.csv");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Export failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleExport}
//       disabled={loading}
//       className="bg-brand-card border border-brand-border text-sm text-[#F0F4F8] font-medium px-4 py-2 rounded-lg hover:border-brand-green transition-colors disabled:opacity-50"
//     >
//       {loading ? "Exporting..." : "↓ Export CSV"}
//     </button>
//   );
// }

// client/components/dashboard/transactions/ExportButton.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = async (format: "csv" | "pdf") => {
    setShowMenu(false);
    setLoading(true);
    try {
      const res = await api.get(`/api/transactions/export/${format}`, {
        responseType: "blob",
      });

      const ext = format === "csv" ? "csv" : "pdf";
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `nairatrack-transactions.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className="bg-brand-card border border-brand-border text-sm text-[#F0F4F8] font-medium px-4 py-2 rounded-lg hover:border-brand-green transition-colors disabled:opacity-50"
      >
        {loading ? "Exporting..." : "↓ Export"}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-brand-card border border-brand-border rounded-lg overflow-hidden z-20 w-36">
            <button
              onClick={() => handleExport("csv")}
              className="w-full text-left px-4 py-2.5 text-sm text-[#C0CDD8] hover:bg-brand-navy transition-colors"
            >
              Export as CSV
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="w-full text-left px-4 py-2.5 text-sm text-[#C0CDD8] hover:bg-brand-navy transition-colors"
            >
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}
