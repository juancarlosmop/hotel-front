import { useState } from "react";
import { useAuth} from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
export const RegisterForm=()=>{
    const{ userRegister, responseMesagge, resetMessages,error }=useAuth();
    const{ register, handleSubmit, formState: { errors } } = useForm();
    const[passwordValid,setPasswordValid]= useState(null);
    const onSubmit = async(user)=>{
        if(user.password !== user.password2){
            setPasswordValid("The password and confirmed password are not valid");
        }else{
            setPasswordValid(null);
        }
        const{password2,...userWithoutPassword2 }=user;
        const userRequest={
            ...userWithoutPassword2,
            role:'USER'
        }
        await userRegister(userRequest);
        await Swal.fire({
                icon: 'success',
                title: '¡Registred!',
                text: 'The User was registred',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                }
        });
        resetMessages();
    }
    return (
    <>
        <div className="flex intem-center justify-center min-h-screen p-4">
            <form  onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2x1 shadow-md w-full max-w-sm">
                <h2 className="text-2x1 font-bold mb-6 text-center">Retister</h2>
                {error && error.message && <p className="text-red-500 text-sm">{error.message}</p>}
                {responseMesagge && responseMesagge.message && <p className="text-red-500 text-sm">{responseMesagge.message}</p>}
                { passwordValid && <p className="text-red-500 text-sm">{passwordValid}</p>}
                <input type="text" id="name" placeholder="Full Name" className="w-full mb-2 px-4 py-2 border rounded-lg"
                   {...register('fullName',{required:'Full name is required',
                    pattern: {
                      value: 6,
                      message: "minimun 6 characters"
                    }})}
                />
                {errors.name && <p className="text-red-500 text-sm ">{errors.name.message}</p>}
                <input type="email" placeholder="Email" className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    {...register('email',{required:'Email is required',
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Email invalid"
                  }})}
                />
                {errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>} 
                <input type="password" placeholder="Password" className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    {...register('password',{required:'password is required',
                        pattern: {
                          value: 8,
                          message: "Minimum 8 characters"
                    }})}
                /> 
                  {errors.password && <p className="text-red-500 text-sm ">{errors.password.message}</p>} 
                <input type="password" placeholder="Confirm Password" className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    {...register('password2',{required:'confirmation of password is required',
                        pattern: {
                          value: 8,
                          message: "Minimum 8 characters"
                    }})}
                />
                {errors.password2 && <p className="text-red-500 text-sm ">{errors.password2.message}</p>} 
                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                 >
                     Sing up
                </button>  
            </form>
        </div>
    </>
    );
};