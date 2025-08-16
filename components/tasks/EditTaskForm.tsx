'use client';

import { useState } from 'react';
import { Task } from '@/types';

interface EditTaskFormProps {
  task: Task;
  onFinished: (updatedTask: Task | null) => void;
}

export default function EditTaskForm({ task, onFinished }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status }),
    });

    if (res.ok) {
      const updatedTask = await res.json();
      onFinished(updatedTask.task);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to update task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={() => onFinished(null)} className="p-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="p-2 bg-primary text-primary-foreground rounded">
          Save
        </button>
      </div>
      {error && <p className="text-destructive">{error}</p>}
    </form>
  );
}
