import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProviderContext } from "../../../../Provider/Provider";
import { useContext, useState } from "react";
import useAllTask from "../../../../hooks/useAllTask";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useAllOngoing from "../../../../hooks/useAllOngoing";
import DraggableTaskItem from "./DraggableTaskItem/DraggableTaskItem";
import OngoingList from "./OngoingList/OngoingList";
import CompletedList from "./CompletedList/CompletedList";
import useAllCompleted from "../../../../hooks/useAllCompleted";


const TaskDashboard = () => {

    const [allCompleted, completedRefetch] = useAllCompleted()
    const [ allOngoing, ongoingRefetch] = useAllOngoing()
    const [allTask, refetch] = useAllTask()
    const { user } = useContext(ProviderContext)
    console.log(allTask)

    console.log('new', user?.email);
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const TodoItem = {
            ...data,
            userEmail: user.email,
        };
        console.log(TodoItem)
        // const TodoItem = {

        // }

        const todoRes = await axiosSecure.post('/todoList', TodoItem)
        console.log(todoRes.data, 'success')
        if (todoRes.data.insertedId) {
            // show success\
            refetch()
            console.log('success')
            toast.success('Task Added', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    const [{ isDragging }, drag] = useDrag(() => ({
        // what type of item this to determine if a drop target accepts it
        type: "li",
        // data of the item to be available to the drop methods
        // item: { id: image.id, index },
        // method to collect additional data for drop handling like whether is currently being dragged
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    }));


    // drop from ongoing
    // droppable
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["Ongoing", "Completed"], // Specify the accepted drag type
        drop: (item) => {
            console.log("Dropped item:", item); // Log the dropped item
            handleDrop(item)
            // onDrop(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }
    ));


    // Define an asynchronous function
    const handleDrop = async (item) => {
        console.log("this is item", item._id); // Log the dropped item
        try {
            const res = await axiosSecure.delete(`/ongoingList/${item._id}`)
            const res3 = await axiosSecure.delete(`/completedList/${item._id}`)
            const ongoingRes = await axiosSecure.post('/todoList', item)
            console.log(ongoingRes.data, 'success')
            if (ongoingRes.data.insertedId) {
                // show success\
                refetch()
                console.log(ongoingRes.data)
                toast.success('Task Added to ToDo list', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            console.log(res.data);
            // Handle the result of the axios post if needed
            completedRefetch()
            ongoingRefetch()
            // Call the onDrop function after the asynchronous operation is complete
            // onDrop(item);
        } catch (error) {
            console.error("Error while posting todo:", error);
        }
    };
    // console.log(onDrop);

    return (
        <div>
            <ToastContainer />
            <div className="bg-gray-300">
                <div className="p-9">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Title" {...register("Title", {})} />
                        <input type="text" placeholder="Description" {...register("Description", {})} />
                        <input type="number" placeholder="Deadlines (Day)" {...register("Deadlines", {})} />
                        <select {...register("Priority")}>
                            <option value="Not Selected">Priority</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                        <input type="submit" />
                    </form>
                </div>
                <div className="flex justify-evenly">
                    {/* todolist */}
                    <div ref={drop} className={`bg-slate-400 w-[384px] p-5 ${isOver ? 'bg-green-200' : ''}`}>
                        <div>
                            <h3 className="text-[22px] font-bold text-center mb-4">ToDo List</h3>
                        </div>

                        <ul className="shadow sm:rounded-md max-w-sm" ref={drag}>
                            {
                                allTask?.map((task, index) => (
                                    <DraggableTaskItem key={task._id} task={task} />
                                ))
                            }
                        </ul>

                    </div>

                    {/* ongoing list */}
                    {/* Render the OngoingList component */}
                    <OngoingList onDrop={allTask} onRefetch={refetch} />

                    {/* ... */}

                    {/* completed list */}
                    {/* <div className="bg-slate-400 w-[384px] p-5">
                        <div>
                            <h3 className="text-[22px] font-bold text-center mb-4">Completed task</h3>
                        </div>
                        <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm">
                            <li>
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Item 1</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div> */}
                    <CompletedList onDrop={allTask} onRefetch={refetch}></CompletedList>
                </div>
            </div>
        </div >
    );
};

export default TaskDashboard;