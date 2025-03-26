import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/"}),
    tagTypes:['tasks'],
    endpoints:(builder)=>({
        getMyTasks:builder.query({
            query:()=>({
                url:'task/my',
                credentials:'include'
            }),
            providesTags:['tasks']
        }),
        addNewTask:builder.mutation({
            query:({title,priority})=>({
                url:'task/new',
                credentials:'include',
                method:'post',
                body:{title,priority},
                headers:{
                    "Content-Type":"application/json"
                }
            }),
            invalidatesTags:['tasks'],
            // async onQueryStarted(frm,{dispatch,queryFulfilled}){
            //     const patchResult=dispatch(
            //         api.util.updateQueryData('getMyTasks',undefined,(draft)=>{
            //             draft.unshift({id: crypto.randomUUID(),...frm});
            //         })
            //     );
            //     try {
            //         await queryFulfilled;
            //     } catch (error) {
            //         patchResult.undo();
            //     }
            // }
        }),
        updateTask:builder.mutation({
            query:({taskId,title,priority})=>({
                url:'/task/update',
                credentials:'include',
                method:'put',
                body:{taskId,title,priority},
            }),
            invalidatesTags:['tasks'],
            
        }),
        deleteTask:builder.mutation({
            query:({id})=>({
                url:'/task/delete',
                credentials:'include',
                method:'DELETE',
                body:{id},
            }),
            invalidatesTags:['tasks'],
            async onQueryStarted({id},{dispatch,queryFulfilled}){
                const ptResult=dispatch(
                    api.util.updateQueryData('getMyTasks',undefined,(currentData)=>{
                        if(!currentData || !currentData.msg) return;

                        currentData.msg=currentData.msg.filter((t)=>t._id !==id)
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    ptResult.undo();
                }
            }
        }),
        changeCompletion:builder.mutation({
            query:({id,completed})=>({
                url:'task/changeCompletion',
                method:'put',
                body:{id,completed},
                credentials:'include',
                headers:{
                    "Content-Type":"application/json"
                },
            }),
            invalidatesTags:['tasks'],
            async onQueryStarted({id,completed},{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    api.util.updateQueryData('getMyTasks',undefined,(currentData)=>{
                        if(!currentData || !currentData.msg) return;
                        
                        const taskIndex=currentData.msg.findIndex((el)=>el._id === id);
                        if(taskIndex !==-1){
                            currentData.msg[taskIndex] = { ...currentData.msg[taskIndex], completed };
                        }

                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo()
                }
            }
        })
    })
})

export default api;

export const {useGetMyTasksQuery,useAddNewTaskMutation,useDeleteTaskMutation,
    useUpdateTaskMutation,useChangeCompletionMutation}=api