export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate?: string;
    status: 'todo' | 'in-progress' | 'done';
    board: string;
    createdAt: string;
}

export interface User {
    id: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}