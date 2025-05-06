import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';


export const offices: { [key: string]: string } = {
  GFP: 'PENSIONES',
  GRD: 'RENTAS',
  TGD: 'TESORERIA',
  SHD: 'HACIENDA',
  GCD: 'CONTABILIDIDAD',
  GPD: 'PRESUPUESTO',
};
type RequestConsecutive ={
    acronym: string,
    addressee: string,
    topic: string,
    requestedBy: string,
}
export default function DashboardView() {
  const initialValues : RequestConsecutive = {
    acronym: '',
    addressee: '',
    topic: '',
    requestedBy:''
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

  

  const handleRequest = (formData:RequestConsecutive) =>console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 px-4">
      <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Solicitar Consecutivos
        </h2>

        <form onSubmit={handleSubmit(handleRequest)} className="space-y-6" noValidate>
          {/* Oficina */}
          <div>
            <label htmlFor="office" className="block text-sm font-medium text-gray-700">Oficina Destinatario</label>
            <select
              id="office"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              {...register('acronym', { required: 'Debe seleccionar una oficina' })}
            >
              <option value="">-- Selecciona una oficina --</option>
              {Object.entries(offices).map(([acronym, name]) => (
                <option key={acronym} value={acronym}>{`${name} (${acronym})`}</option>
              ))}
            </select>
            {errors.acronym && <p className="text-red-500 text-center">{errors.acronym.message}</p>}
          </div>

          {/* Destinatario */}
          <div>
            <label htmlFor="addressee" className="block text-sm font-medium text-gray-700">Nombre del Destinatario</label>
            <input
              type="text"
              id="addressee"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              placeholder="Persona o entidad"
              {...register('addressee', { required: 'El nombre del Destinatario es obligatorio' })}
            />
            {errors.addressee && <p className="text-red-500 text-center">{errors.addressee.message}</p>}
          </div>

          {/* Asunto */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Asunto</label>
            <input
              type='text'
              id="topic"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none"
              placeholder="Agrega el asunto"
              {...register('topic', { required: 'El asunto es obligatorio' })}
            />
            {errors.topic && <p className="text-red-500 text-center">{errors.topic.message}</p>}
          </div>
          <div>
            <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700">Solicitado por:</label>
            <input
              id="requestedBy"
              type='text'
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 resize-none"
              placeholder="Nombre quien solicita"
              {...register('requestedBy', { required: 'El solicitante es obligatorio' })}
            />
            {errors.requestedBy && <p className="text-red-500 text-center">{errors.requestedBy.message}</p>}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full flex justify-center rounded-lg bg-teal-600 px-4 py-3 text-white font-semibold hover:bg-teal-700 transition duration-200 disabled:bg-teal-400"
          >
            Generar consecutivo
          </button>
        </form>
      </div>
    </div>
  );
}