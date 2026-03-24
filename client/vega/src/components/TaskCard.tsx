import type { Task } from '@/types';
import { Edit2, Trash2, Calendar } from 'lucide-react';

interface Props {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const STATUS = {
    todo: { label: 'Todo', cls: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    'in-progress': { label: 'In Progress', cls: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    done: { label: 'Done', cls: 'text-green-400 bg-green-500/10 border-green-500/20' },
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
    const status = STATUS[task.status];

    return (
        <div className="bg-[#0d1117] border border-[#1e2530] hover:border-[#2e3a4a] p-5 transition-colors">

            <div className="flex justify-between items-start gap-3">
                <h3 className="font-semibold text-slate-100 leading-snug">{task.title}</h3>
                <span className={`shrink-0 text-[11px] font-medium px-2.5 py-1 border tracking-wide ${status.cls}`}>
                    {status.label}
                </span>
            </div>

            {task.description && (
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{task.description}</p>
            )}

            {task.dueDate && (
                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-600">
                    <Calendar size={12} />
                    {new Date(task.dueDate).toLocaleDateString('uz-UZ')}
                </div>
            )}

            <div className="flex gap-2 mt-5 pt-4 border-t border-[#1e2530]">
                <button
                    onClick={() => onEdit(task)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <Edit2 size={14} /> Tahrirlash
                </button>
                <div className="w-px bg-[#1e2530]" />
                <button
                    onClick={() => onDelete(task._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-red-500/60 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} /> O'chirish
                </button>
            </div>
        </div>
    );
}