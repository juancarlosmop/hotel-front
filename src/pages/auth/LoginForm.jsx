import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const { login, error, user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'USER') {
        navigate('/rooms', { replace: true });
      } else if (user.role === 'ADMIN') {
        navigate('/scheduled-reservations', { replace: true });
      }
    }
  }, [user, navigate]);

  const onSubmit = async (credentials) => {
    await login(credentials);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}  className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Long In</h2>
         {error && error.message && <p className="text-red-500 text-sm">{error.message}</p>}
        <input type="email" id="email" placeholder="Email"  className="w-full mb-2 px-4 py-2 border rounded-lg" 
        {...register('email',{required:'Email is required',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email invalid"
              }
        })}
        />
        {errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
        <input id="password" type="password"  placeholder="Contraseña"   className="w-full mb-2 px-4 py-2 border rounded-lg" 
          {...register('password',{required:'Passwords is required',
              minLength: {
                value: 8,
                message: "Minimum 8 "
              }
          })}
        />
         {errors.password && <p className="text-red-500 text-sm ">{errors.password.message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Sign In
        </button>
      </form>
      </div>
      </>
  );
};

