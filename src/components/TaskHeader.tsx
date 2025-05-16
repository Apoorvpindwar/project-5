import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Plus, Search, CheckCircle, Circle, ListFilter } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskHeader: React.FC = () => {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useTaskContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} className="mr-1" />
            Add Task
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 border border-r-0 rounded-l-md ${
                statusFilter === 'all'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ListFilter size={18} className="inline-block mr-1 align-text-bottom" />
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 border border-r-0 ${
                statusFilter === 'pending'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Circle size={18} className="inline-block mr-1 align-text-bottom" />
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 border rounded-r-md ${
                statusFilter === 'completed'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CheckCircle size={18} className="inline-block mr-1 align-text-bottom" />
              Completed
            </button>
          </div>
        </div>
      </div>
      
      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default TaskHeader;