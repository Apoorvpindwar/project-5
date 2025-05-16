import React, { useState } from 'react';
import { Task } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle, Circle, Edit, Trash2, CalendarDays } from 'lucide-react';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus, deleteTask } = useTaskContext();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dateString: string): boolean => {
    if (task.completed) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className={`mb-3 p-4 rounded-lg shadow-sm border transition-all duration-200 
        ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow'}
        ${isOverdue(task.dueDate) ? 'border-l-4 border-l-red-500' : ''}`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className="mt-1 flex-shrink-0 text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <Circle size={20} />
            )}
          </button>
          
          <div className="flex-grow">
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center">
              <CalendarDays size={14} className={`mr-1 ${isOverdue(task.dueDate) ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={`text-xs ${
                isOverdue(task.dueDate) 
                  ? 'text-red-500 font-medium' 
                  : task.completed 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
              }`}>
                {isOverdue(task.dueDate) ? 'Overdue: ' : ''}
                {formatDate(task.dueDate)}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Edit task"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {showEditForm && (
        <TaskForm 
          taskId={task.id} 
          onClose={() => setShowEditForm(false)} 
        />
      )}
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Task</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;