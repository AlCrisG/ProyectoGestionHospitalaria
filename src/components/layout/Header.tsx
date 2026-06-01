import { Menu, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 md:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-slate-800">{user?.username}</p>
          <p className="text-xs text-slate-500 capitalize">{user?.rol}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Salir</span>
        </Button>
      </div>
    </header>
  );
}
