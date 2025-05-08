import { useState } from "react";
import ConsecutiveForm from "../components/consecutive/ConsecutiveForm";
import { handleCopy } from "../hooks/useHandleCopy";

export default function DashboardView() {
  const [consecutiveNumber, setConsecutiveNumber] = useState<string>("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 px-4">
      <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-xl p-8 max-lg:p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {consecutiveNumber
            ? "Consecutivo solicitado"
            : "Solicitar Consecutivos"}
        </h2>
        {consecutiveNumber ? (
          <div className="flex gap-10 items-center justify-center ">
            <p
              id="consecutive"
              className="bg-gray-200 py-2 px-4 font-semibold rounded-lg text-center"
            >
              {consecutiveNumber}
            </p>
            <div className="space-x-2">
              <button
                className="bg-teal-600 text-white p-2 rounded-lg cursor-pointer hover:bg-teal-700 transition"
                onClick={() => handleCopy(consecutiveNumber)}
              >
                Copiar
              </button>
              <button
                onClick={() => setConsecutiveNumber("")}
                className="bg-gray-600 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <ConsecutiveForm setConsecutiveNumber={setConsecutiveNumber} />
        )}
      </div>
    </div>
  );
}
