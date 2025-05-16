# Task Manager

A modern, responsive task management application built with React, TypeScript, and Supabase. The application features a beautiful UI with Tailwind CSS, real-time updates, and secure authentication.

## 🌐 Live Demo
[Task Manager App](https://apoorvpindwar.github.io/project-5/)

## ✨ Features

### Task Management
- ➕ **Add Tasks**
  - Create new tasks with title, description, and due date
  - Automatic timestamp for creation date
  - User-specific task creation

- 📝 **Edit Tasks**
  - Update task title, description, and due date
  - Real-time updates in the UI
  - Maintain task history with updated timestamps

- ❌ **Delete Tasks**
  - Remove tasks with confirmation dialog
  - Permanent deletion with security checks

- ✅ **Mark Tasks**
  - Toggle task completion status
  - Visual indicators for completed tasks
  - Filter tasks by completion status

### Additional Features
- 🔍 Search functionality
- 🔄 Real-time updates
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure authentication with Magic Links
- 🎯 Task filtering and sorting

## 🚀 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/Apoorvpindwar/project-5.git
cd project-5
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔗 API Documentation

### Authentication Endpoints

#### Sign In with Magic Link
```typescript
POST auth/sign-in
Headers: {
  Content-Type: application/json
}
Body: {
  email: string,
  options: {
    emailRedirectTo: string
  }
}
Response: {
  user: null,
  session: null
}
```

#### Sign Out
```typescript
POST auth/sign-out
Headers: {
  Authorization: Bearer <token>
}
Response: {
  error: null
}
```

### Task Endpoints

#### Get All Tasks
```typescript
GET /rest/v1/tasks
Headers: {
  Authorization: Bearer <token>
}
Response: [
  {
    id: uuid,
    user_id: uuid,
    title: string,
    description: string,
    due_date: timestamptz,
    completed: boolean,
    created_at: timestamptz,
    updated_at: timestamptz
  }
]
```

#### Create Task
```typescript
POST /rest/v1/tasks
Headers: {
  Authorization: Bearer <token>
}
Body: {
  title: string,
  description: string,
  due_date: string,
  completed: boolean
}
Response: {
  id: uuid,
  ...taskData
}
```

#### Update Task
```typescript
PATCH /rest/v1/tasks?id=eq.{task_id}
Headers: {
  Authorization: Bearer <token>
}
Body: {
  title?: string,
  description?: string,
  due_date?: string,
  completed?: boolean
}
Response: {
  id: uuid,
  ...updatedTaskData
}
```

#### Delete Task
```typescript
DELETE /rest/v1/tasks?id=eq.{task_id}
Headers: {
  Authorization: Bearer <token>
}
Response: {
  status: 204
}
```

## 📦 Database Schema

```sql
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  due_date timestamptz NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Read policy
CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

-- Insert policy
CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update policy
CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Delete policy
CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);
```

## 📝 Database Dump
Check [tasks_dump.sql](./supabase/migrations/20250516125654_violet_castle.sql) for the complete database schema and migrations.

## 🔧 Development Tools
- Vite v5.0.0
- TypeScript v5.2.2
- React v18.2.0
- Tailwind CSS v3.3.5
- Supabase Client v2.39.0

## 🔐 Security
- Row Level Security (RLS) enabled
- User-specific data isolation
- Secure authentication with Magic Links
- Environment variables for sensitive data

## 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Fluid transitions and animations
- Accessible UI components

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 