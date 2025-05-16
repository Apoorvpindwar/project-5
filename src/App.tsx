import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import TaskHeader from './components/TaskHeader';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import { Toaster } from 'react-hot-toast';

const TaskApp: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
          <TaskHeader />
          <TaskList />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </TaskProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskApp />
    </AuthProvider>
  );
}

export default App;