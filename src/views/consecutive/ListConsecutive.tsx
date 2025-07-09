import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useGetUserConsecutives } from "../../hooks/useAuth";
import { getConsecutiveById, deleteConsecutive } from "../../api/ConsecutiveAPI";
import ConsecutiveFormModal from "../../components/consecutive/ConsecutiveFormModal";
import type { UserConsecutiveById } from "../../types";
import Spinnier from "../../components/Spinner";

export default function ListConsecutive() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetUserConsecutives();

  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  const consecutiveMutation = useMutation({
    mutationFn: getConsecutiveById,
    onError: (error) => toast.error(error.message),
  });

  useMemo(() => {
    if (consecutiveMutation.data) {
      setIsModalOpen(true);
    }
  }, [consecutiveMutation.data]);
  // Redirección en caso de error
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((item: any) =>
      Object.values(item).some((value) => {
        if (typeof value === "object" && value !== null) {
          return Object.values(value).some((v) =>
            String(v).toLowerCase().includes(lowerSearch)
          );
        }
        return String(value).toLowerCase().includes(lowerSearch);
      })
    );
  }, [search, data]);

  //export file
  const exportToExcel = () => {
    if (!filteredData.length) return toast.info("No hay datos para exportar.");
    setExporting(true);
    const exportData = filteredData.map((item) => ({
      Consecutivo: item.consecutive,
      Asunto: item.topic,
      Destinatario: item.addressee,
      "Solicitado por": item.requestedBy,
      Fecha: new Date(item.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consecutivos");
    XLSX.writeFile(workbook, "consecutivos.xlsx");
    setExporting(false);
  };

  const {mutate} = useMutation({
    mutationFn:deleteConsecutive,
    onError:(error)=> toast.error(error.message),
    onSuccess:(data)=> toast.success(data)
  })
  const handleDeleteConsecutive = (formData:UserConsecutiveById['id'])=>{
      if(confirm('Desea eliminar este registro?')){
        mutate(formData)
        return
      }
      
  }
  if (isLoading) return <p className="text-gray-600">Cargando...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Consecutivos Registrados
      </h2>
      <div className="flex justify-between mb-6 w-full">
        <div className="flex gap-10 items-center w-3/4">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Link
            className="bg-teal-600 text-white p-2 rounded-lg cursor-pointer hover:bg-teal-700 transition"
            to={"/"}
          >
            Nuevo Registro
          </Link>
        </div>
      
       {exporting ? (
                 <Spinnier marginTop={"0px"} />
               ) : (
                 <button
                   onClick={exportToExcel}
                   className="bg-teal-600 text-white rounded-xl px-2 hover:bg-teal-700 transition"
                 >
                   Exportar Excel
                 </button>
               )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className={thClass}>Consecutivo</th>
              <th className={thClass}>Asunto</th>
              <th className={thClass}>Destinatario</th>
              <th className={thClass}>Solicitado por</th>
              <th className={thClass}>Fecha</th>
              <th className={thClass}>Opciones</th>
              {/* <th className={thClass}>Usuario que registró</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item: UserConsecutiveById) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className={tdClass}>{item.consecutive}</td>
                  <td className={tdClass}>{item.topic}</td>
                  <td className={tdClass}>{item.addressee}</td>
                  <td className={tdClass}>{item.requestedBy}</td>
                  <td className={tdClass}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className={tdClass}>
                    <button
                      onClick={() => consecutiveMutation.mutate(item.id)}
                      className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteConsecutive(item.id)}
                      className="bg-red-700 text-white p-2 rounded hover:bg-red-800 transition ml-2"
                    >
                      Eliminar
                    </button>
                  </td>
                  {/* <td className={tdClass}>{item.user?.username}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-6 text-center text-gray-500" colSpan={6}>
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {consecutiveMutation.data && (
        <ConsecutiveFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={consecutiveMutation.data}
        />
      )}
    </div>
  );
}

const thClass =
  "py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b";
const tdClass = "py-3 px-4 text-sm text-gray-700 border-b";
