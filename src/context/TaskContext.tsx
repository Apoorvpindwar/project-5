import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface TaskContextProps {
  tasks: Task[];
  addTask: (taskData: TaskFormData) => Promise<void>;
  editTask: (id: string, taskData: TaskFormData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'pending' | 'completed';
  setStatusFilter: (filter: 'all' | 'pending' | 'completed') => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: TaskFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Convert camelCase to snake_case for the database
      const dbTaskData = {
        user_id: user.id,
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.dueDate,
        completed: taskData.completed
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([dbTaskData])
        .select()
        .single();

      if (error) throw error;
      setTasks([data, ...tasks]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (id: string, taskData: TaskFormData) => {
    try {
      // Convert camelCase to snake_case for the database
      const dbTaskData = {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.dueDate,
        completed: taskData.completed
      };

      const { error } = await supabase
        .from('tasks')
        .update(dbTaskData)
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.map((task) => (task.id === id ? { ...task, ...taskData } : task)));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      toast.success(task.completed ? 'Task marked as pending' : 'Task completed');
    } catch (error) {
      toast.error('Failed to update task status');
      console.error('Error toggling task status:', error);
    }
  };

  const value = {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    loading,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};