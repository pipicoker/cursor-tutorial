'use client';

import { useState } from 'react';
import { Task } from '@/types';
import EditTaskForm from './EditTaskForm';
import ConfirmationDialog from './ConfirmationDialog';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (deletedTaskId: number) => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      onTaskDeleted(task.id);
      setIsDeleteDialogOpen(false);
    } else {
      // Handle error
      console.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? 'done' : 'pending';
    const oldStatus = task.status;

    // Optimistic UI update
    onTaskUpdated({ ...task, status: newStatus });

    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      // Revert on failure
      onTaskUpdated({ ...task, status: oldStatus });
      console.error('Failed to update task status');
    }
  };

  const handleFinishedEditing = (updatedTask: Task | null) => {
    if (updatedTask) {
      onTaskUpdated(updatedTask);
    }
    setIsEditing(false);
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'pending':
        return 'border-yellow-500';
      case 'in-progress':
        return 'border-blue-500';
      case 'done':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <>
      <div className={`p-4 border-l-4 rounded shadow ${getStatusColor()}`}>
        {isEditing ? (
          <EditTaskForm task={task} onFinished={handleFinishedEditing} />
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.status === 'done'}
                  onChange={handleStatusChange}
                  className="form-checkbox h-5 w-5 text-primary"
                />
                <h3 className={`font-bold ${task.status === 'done' ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setIsEditing(true)} className="text-sm text-blue-500">
                  Edit
                </button>
                <button onClick={() => setIsDeleteDialogOpen(true)} className="text-sm text-red-500">
                  Delete
                </button>
              </div>
            </div>
            <p className={`text-sm text-muted-foreground ${task.status === 'done' ? 'line-through' : ''}`}>
              {task.description}
            </p>
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
}
