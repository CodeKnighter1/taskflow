import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import type { Task } from '@/types';
import { Plus, LogOut } from 'lucide-react';

const COLUMNS = [
    { status: 'todo', title: 'Todo', accent: 'border-blue-500/40' },
    { status: 'in-progress', title: 'In Progress', accent: 'border-yellow-500/40' },
    { status: 'done', title: 'Done', accent: 'border-green-500/40' },
];

export default function Dashboard() {
    const { logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showForm, setShowForm] = useState(false);

    const loadTasks = async () => {
        const res = await api.get('/tasks');
        setTasks(res.data);
    };

    useEffect(() => { loadTasks(); }, []);

    const deleteTask = async (id: string) => {
        await api.delete(`/tasks/${id}`);
        loadTasks();
    };

    const openForm = (task: Task | null = null) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    return (
        <div className="min-h-screen bg-[#080b10] p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-lg font-semibold tracking-tight text-slate-100">My Board</h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => openForm()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
                        >
                            <Plus size={15} /> Yangi task
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 border border-[#1e2530] text-sm text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors cursor-pointer"
                        >
                            <LogOut size={15} /> Chiqish
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {COLUMNS.map(col => {
                        const colTasks = tasks.filter(t => t.status === col.status);
                        return (
                            <div key={col.status} className={`bg-[#0d1117] border border-[#1e2530] border-t-2 ${col.accent} p-5`}>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-sm font-semibold text-slate-300 tracking-wide">{col.title}</h2>
                                    <span className="text-xs text-slate-500 bg-[#080b10] border border-[#1e2530] px-2.5 py-0.5">
                                        {colTasks.length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {colTasks.map(task => (
                                        <TaskCard
                                            key={task._id}
                                            task={task}
                                            onEdit={t => openForm(t)}
                                            onDelete={deleteTask}
                                        />
                                    ))}

                                    {colTasks.length === 0 && (
                                        <p className="text-xs text-slate-600 text-center py-8 border border-dashed border-[#1e2530]">
                                            Task yo'q
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showForm && (
                <TaskForm task={editingTask} onClose={closeForm} onSuccess={loadTasks} />
            )}
        </div>
    );
}