export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'done';
  created_at: string;
}
