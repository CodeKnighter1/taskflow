import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log(`[${isRegister ? 'REGISTER' : 'LOGIN'}] boshlandi →`, { email });

            if (isRegister) {
                await register(email, password);
                console.log('Register muvaffaqiyatli yakunlandi');
            } else {
                await login(email, password);
                console.log('Login muvaffaqiyatli yakunlandi');
            }

            console.log('Dashboardga yo‘naltirilmoqda...');
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                { "message": "Bu email allaqachon ro'yxatdan o'tgan", "error": "Bad Request", "statusCode": 400 } ||
                (isRegister ? "Ro'yxatdan o'tishda xato" : "Kirishda xato");

            console.error(`[${isRegister ? 'REGISTER' : 'LOGIN'}] xato:`, err);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="card">
                <div className="flex justify-center md:justify-start font-electrolize mb-9">
                    <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">TaskFlow</span>
                </div>

                <div className="mb-8">
                    <h1>
                        {isRegister ? "Ro'yxatdan o'tish" : 'Xush kelibsiz'}
                    </h1>
                    <p>
                        {isRegister ? 'Yangi hisob yarating' : 'Hisobingizga kiring'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'siz@example.com' },
                        { label: 'Parol', type: 'password', value: password, onChange: setPassword, placeholder: '••••••••' },
                    ].map(({ label, type, value, onChange, placeholder }) => (
                        <div key={label} className="flex flex-col gap-2">
                            <label>{label}</label>
                            <input
                                type={type}
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                placeholder={placeholder}
                                required
                                disabled={loading}
                                className="enter-input"
                            />
                        </div>
                    ))}

                    {error && (
                        <p className="text-sm text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            w-full flex items-center justify-center font-electrolize gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 
                            disabled:bg-blue-800 disabled:cursor-not-allowed
                            text-sm font-semibold text-white tracking-wide transition-colors rounded-xl
                        `}
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                <span>Kuting...</span>
                            </>
                        ) : (
                            <>
                                {isRegister ? "Ro'yxatdan o'tish" : 'Kirish'} <span>→</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-7">
                    <span className="flex-1 h-px bg-[#1e2530]" />
                    <span className="text-xs text-slate-600 tracking-wider">yoki</span>
                    <span className="flex-1 h-px bg-[#1e2530]" />
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError('');
                    }}
                    disabled={loading}
                    className={`
                        w-full text-center text-sm ${loading ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'} transition-colors
                    `}
                >
                    {isRegister
                        ? 'Allaqachon hisobingiz bormi? Kirish'
                        : "Hisob yo'qmi? Ro'yxatdan o'tish"}
                </button>
            </div>
        </section>
    );
}