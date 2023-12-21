import { useDrag } from "react-dnd";


const DraggableTaskItem = ({ task }) => {
    // useDrag hook to make the component draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        // Specify the drag type as "TASK"
        type: "TASK",
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

export default DraggableTaskItem