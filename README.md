# Task Manager

A modern, responsive task management application built with React, TypeScript, and Supabase. The application features a beautiful UI with Tailwind CSS, real-time updates, and secure authentication.

![Task Manager Screenshot]

## Features

- 🔐 Secure Authentication with Magic Link
- ✨ Beautiful and responsive UI with Tailwind CSS
- 📝 Create, read, update, and delete tasks
- 🔍 Search and filter tasks
- 🎯 Task status management
- 📅 Due date tracking
- 🚀 Real-time updates
- 🔒 Row Level Security with Supabase

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Framer Motion
- React Hot Toast

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

## Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Build for production:
```bash
npm run build
# or
yarn build
```

## API Endpoints

The application uses Supabase as its backend. Here are the available API endpoints and their payloads:

### Authentication

#### Sign In with Magic Link
```typescript
POST auth/sign-in
Payload:
{
  email: string,
  options: {
    emailRedirectTo: string
  }
}
```

#### Sign Out
```typescript
POST auth/sign-out
No payload required
```

### Tasks

#### Get All Tasks
```typescript
GET /rest/v1/tasks
Headers:
{
  Authorization: 'Bearer user_token'
}
Response:
[
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
Headers:
{
  Authorization: 'Bearer user_token'
}
Payload:
{
  title: string,
  description: string,
  due_date: string,
  completed: boolean
}
```

#### Update Task
```typescript
PATCH /rest/v1/tasks?id=eq.{task_id}
Headers:
{
  Authorization: 'Bearer user_token'
}
Payload:
{
  title?: string,
  description?: string,
  due_date?: string,
  completed?: boolean
}
```

#### Delete Task
```typescript
DELETE /rest/v1/tasks?id=eq.{task_id}
Headers:
{
  Authorization: 'Bearer user_token'
}
```

## Database Schema

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
```

## Security

The application implements Row Level Security (RLS) through Supabase policies:

- Users can only read their own tasks
- Users can only create tasks for themselves
- Users can only update their own tasks
- Users can only delete their own tasks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 