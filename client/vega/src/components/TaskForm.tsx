import { useState } from 'react';
import api from '../api/axios';
import type { Task } from '@/types';

interface Props {
    task?: Task | null;
    onClose: () => void;
    onSuccess: () => void;
}

const inputCls = "w-full bg-[#080b10] border border-[#1e2530] px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600";
const labelCls = "text-[11px] font-medium tracking-widest uppercase text-slate-500";

export default function TaskForm({ task, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        title: task?.title || '',
        description: task?.description || '',
        dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
        status: task?.status || 'todo',
    });

    const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task) await api.patch(`/tasks/${task._id}`, form);
        else await api.post('/tasks', form);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-[#0d1117] border border-[#1e2530] px-8 py-8">

                <div className="flex items-center gap-2 mb-7">
                    <span className="w-2 h-2 bg-blue-500" />
                    <h2 className="text-base font-semibold text-slate-100">
                        {task ? 'Taskni tahrirlash' : 'Yangi task'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <label className={labelCls}>Nomi</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            placeholder="Task nomi"
                            required
                            className={inputCls}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelCls}>Tavsif</label>
                        <textarea
                            value={form.description}
                            onChange={e => set('description', e.target.value)}
                            placeholder="Ixtiyoriy..."
                            rows={3}
                            className={`${inputCls} resize-none`}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className={labelCls}>Muddat</label>
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={e => set('dueDate', e.target.value)}
                                className={inputCls}
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label className={labelCls}>Status</label>
                            <select
                                value={form.status}
                                onChange={e => set('status', e.target.value)}
                                className={inputCls}
                            >
                                <option value="todo">Todo</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-sm text-slate-400 hover:text-slate-200 border border-[#1e2530] hover:border-[#2e3a4a] transition-colors cursor-pointer"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                        >
                            {task ? 'Saqlash' : 'Qo\'shish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}