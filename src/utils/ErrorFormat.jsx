export const ResponseStatus=(e)=>{
    if(e.response && e.response.data){
        return{
            code: e.response.data.code,
            message:e.response.data.message
        }
    }else{
        console.error("Error inesperado:", e); 
        return {code:"500",message:"An unexpected error occurred"}
    }
}