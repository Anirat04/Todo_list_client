import { useContext } from "react";
import { ProviderContext } from "../../../../../Provider/Provider";
import useAllOngoing from "../../../../../hooks/useAllOngoing";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import useAllCompleted from "../../../../../hooks/useAllCompleted";

const OngoingList = ({ onDrop, onRefetch }) => {
    const [allCompleted, completedRefetch] = useAllCompleted()
    const [allOngoing, ongoingRefetch] = useAllOngoing()
    const { user } = useContext(ProviderContext)
    const axiosSecure = useAxiosSecure()


    // droppable
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["TASK", "Completed"], // Specify the accepted drag type
        drop: (item) => {
            console.log("Dropped item:", item); // Log the dropped item
            handleDrop(item)
            onDrop(item);
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
            const res = await axiosSecure.delete(`/todoList/${item._id}`)
            const res2 = await axiosSecure.delete(`/todoList2/${item._id}`)
            const res3 = await axiosSecure.delete(`/completedList/${item._id}`)
            const ongoingRes = await axiosSecure.post('/ongoingList', item)
            console.log(ongoingRes.data, 'success')
            if (ongoingRes.data.insertedId) {
                // show success\
                ongoingRefetch()
                console.log(ongoingRes.data)
                toast.success('Task Added to Ongoing list', {
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
            console.log(res2.data);
            // Handle the result of the axios post if needed
            completedRefetch()
            onRefetch()
            // Call the onDrop function after the asynchronous operation is complete
            onDrop(item);
        } catch (error) {
            console.error("Error while posting todo:", error);
        }
    };
    console.log(onDrop);



    const OngoingDrag = ({ task }) => {
        // useDrag hook to make the component draggable
        const [{ isDragging }, drag] = useDrag(() => ({
            // Specify the drag type as "TASK"
            type: "Ongoing",
            // Provide item data (task ID) for the drop handling
            item: task,
            // Collect function to get the dragging state
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));
    
        // Render the draggable task item
        return (
            // Attach the drag ref to the li element
            <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="mb-2 bg-white rounded-md">
                {/* Your task item content goes here */}
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{task.Title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div ref={drop} className={`bg-slate-400 w-[384px] p-5 ${isOver ? 'bg-green-200' : ''}`}>
            <h3 className="text-[22px] font-bold text-center mb-4">Ongoing task</h3>
            <ul className="shadow sm:rounded-md max-w-sm">
                {
                    allOngoing.map(ongoing => (

                        <OngoingDrag key={ongoing._id} task={ongoing}></OngoingDrag>
                        // <li key={ongoing._id}
                        //     // ref={drag}
                        //     // style={{ opacity: isDragging ? 0.5 : 1 }}
                        //     className="mb-2 bg-white rounded-md">
                        //     {/* Your task item content goes here */}
                        //     <div className="px-4 py-5 sm:px-6">
                        //         <div className="flex items-center justify-between">
                        //             <h3 className="text-lg leading-6 font-medium text-gray-900">{ongoing.Title}</h3>
                        //             <p className="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p>
                        //         </div>
                        //         <div className="mt-4 flex items-center justify-between">
                        //             <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
                        //             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                        //         </div>
                        //     </div>
                        // </li>
                    ))
                }

            </ul>
        </div>
    );
};

export default OngoingList