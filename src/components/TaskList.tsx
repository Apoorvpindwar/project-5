import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList: React.FC = () => {
  const { tasks, searchTerm, statusFilter, loading } = useTaskContext();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') {
      return matchesSearch;
    } else if (statusFilter === 'completed') {
      return matchesSearch && task.completed;
    } else {
      return matchesSearch && !task.completed;
    }
  });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const sortedPendingTasks = [...pendingTasks].sort((a, b) => 
    new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );
  
  const sortedCompletedTasks = [...completedTasks].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center"
      >
        <div className="flex justify-center mb-3">
          <ClipboardList size={40} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks found</h3>
        <p className="text-gray-500 text-sm">
          {searchTerm
            ? "No tasks match your search. Try a different search term."
            : statusFilter !== 'all'
              ? `You don't have any ${statusFilter} tasks.`
              : "You don't have any tasks yet. Add a new task to get started!"}
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {statusFilter !== 'completed' && sortedPendingTasks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Pending Tasks ({sortedPendingTasks.length})
            </h2>
            <div>
              {sortedPendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </motion.div>
        )}

        {statusFilter !== 'pending' && sortedCompletedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Completed Tasks ({sortedCompletedTasks.length})
            </h2>
            <div>
              {sortedCompletedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;