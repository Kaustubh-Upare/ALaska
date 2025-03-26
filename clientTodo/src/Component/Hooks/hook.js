import { useState } from "react";
import toast from "react-hot-toast";



const useAsyncMutation=(mutationHook)=>{
    const [isLoading,setIsLoading]=useState(false);
    const [data,setdata]=useState(null);

    const [mutate]=mutationHook();
    const executeMutation=async(toastMsg,...arg)=>{
        console.log('hooks',arg)
        setIsLoading(true);
        const toastId=toast.loading(toastMsg || "Data Fetching");
        try {
            const res=await mutate(...arg);
            // console.log(res.data)
            if(res.data){
                toast.success(res.data.msg || "Succesfully fetched",{id:toastId});
                setdata(p=>res.data);
                
                console.log("async Mutation",res.data)
                return res.data;
            }else{
                toast.error(res?.error?.data?.message || "Something Went Wrong" ,{id:toastId});
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong",{id:toastId});
        }finally{
            setIsLoading(false)
        }
    }

    return [executeMutation,isLoading,data]

}

export {useAsyncMutation}