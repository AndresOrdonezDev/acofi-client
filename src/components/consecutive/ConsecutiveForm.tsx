import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { RequestConsecutiveForm } from "../../types";
import { requestConsecutive } from "../../api/ConsecutiveAPI";

export const offices: { [key: string]: string } = {
  GFP: "PENSIONES",
  GRD: "RENTAS",
  TGD: "TESORERIA",
  SHD: "HACIENDA",
  GCD: "CONTABILIDIDAD",
  GPD: "PRESUPUESTO",
};

type ConsecutiveFormProps = {
    setConsecutiveNumber: React.Dispatch<React.SetStateAction<string>>
}

export default function ConsecutiveForm({setConsecutiveNumber}:ConsecutiveFormProps) {
  const initialValues: RequestConsecutiveForm = {
    acronym: "",
    addressee: "",
    topic: "",
    requestedBy: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConsecutive,
    onError: (error) => {
      toast.error(error.message);
      reset;
    },
    onSuccess: (data) => setConsecutiveNumber(data),
  });

  const handleRequest = (formData: RequestConsecutiveForm) => mutate(formData);

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="space-y-6"
      noValidate
    >
      {/* Oficina */}
      <div>
        <label
          htmlFor="office"
          className="block text-sm font-medium text-gray-700"
        >
          Oficina Destinatario
        </label>
        <select
          id="office"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          {...register("acronym", { required: "Debe seleccionar una oficina" })}
        >
          <option value="">-- Selecciona una oficina --</option>
          {Object.entries(offices).map(([acronym, name]) => (
            <option
              key={acronym}
              value={acronym}
            >{`${name} (${acronym})`}</option>
          ))}
        </select>
        {errors.acronym && (
          <p className="text-red-500 text-center">{errors.acronym.message}</p>
        )}
      </div>

      {/* Destinatario */}
      <div>
        <label
          htmlFor="addressee"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre del Destinatario
        </label>
        <input
          type="text"
          id="addressee"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          placeholder="Persona o entidad"
          {...register("addressee", {
            required: "El nombre del Destinatario es obligatorio",
          })}
        />
        {errors.addressee && (
          <p className="text-red-500 text-center">{errors.addressee.message}</p>
        )}
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700"
        >
          Asunto
        </label>
        <input
          type="text"
          id="topic"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none"
          placeholder="Agrega el asunto"
          {...register("topic", { required: "El asunto es obligatorio" })}
        />
        {errors.topic && (
          <p className="text-red-500 text-center">{errors.topic.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="requestedBy"
          className="block text-sm font-medium text-gray-700"
        >
          Solicitado por:
        </label>
        <input
          id="requestedBy"
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none"
          placeholder="Nombre quien solicita"
          {...register("requestedBy", {
            required: "El solicitante es obligatorio",
          })}
        />
        {errors.requestedBy && (
          <p className="text-red-500 text-center">
            {errors.requestedBy.message}
          </p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full flex justify-center rounded-lg bg-teal-600 px-4 py-3 text-white font-semibold hover:bg-teal-700 transition duration-200 disabled:bg-teal-400"
      >
        Generar consecutivo
      </button>
    </form>
  );
}
