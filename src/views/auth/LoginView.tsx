import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { UserLoginForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate} = useMutation({
    mutationFn:authenticateUser,
    onSuccess:()=>navigate('/'),
    onError:(error)=> toast.error(error.message)
  })
  const handleLogin = (formData:UserLoginForm)=> mutate(formData);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Iniciar Sesión
        </h2>
        <form 
          className="space-y-6"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              placeholder="correo@ejemplo.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.email && (
            <p className="text-red-500 text-center">{errors.email.message}</p>
          )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-center">{errors.password.message}</p>
            )}
          </div>
          <input
            type="submit"
            value='Iniciar Sesión'
            className="w-full flex justify-center rounded-lg bg-teal-600 px-4 py-3 text-white font-semibold hover:bg-teal-700 transition duration-200"
          />
        </form>
      </div>
    </div>
  );
}