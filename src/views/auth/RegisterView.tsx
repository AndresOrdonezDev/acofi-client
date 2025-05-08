import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { CreateAccount } from "../../types";
import { createAccount } from "../../api/AuthAPI";

export default function RegisterView() {
  const navigate = useNavigate();

  const initialValues: CreateAccount = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAdmin: false
  }

  const { register, handleSubmit,formState: { errors } } = useForm<CreateAccount>({
    defaultValues: initialValues
  });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success('Cuenta creada correctamente');
      navigate('/');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const handleRegister = (formData: CreateAccount) => {
    // Validación adicional: password === password_confirmation
    if (formData.password !== formData.password_confirmation) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 py-5">
      <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-xl p-5 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Crear cuenta
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              placeholder="Tu nombre completo"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-center">{errors.username.message}</p>
            )}
          </div>

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
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-center">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              placeholder="Repite tu contraseña"
              {...register("password_confirmation", {
                required: "Confirma tu contraseña",
              })}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-center">{errors.password_confirmation.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              className="h-5 w-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              {...register("isAdmin")}
            />
            <label htmlFor="isAdmin" className="text-sm text-gray-700">¿Es administrador?</label>
          </div>

          <input
            type="submit"
            value='Crear cuenta'
            className="w-full flex justify-center rounded-lg bg-teal-600 px-4 py-3 text-white font-semibold hover:bg-teal-700 transition duration-200"
          />
        </form>
      </div>
    </div>
  );
}
