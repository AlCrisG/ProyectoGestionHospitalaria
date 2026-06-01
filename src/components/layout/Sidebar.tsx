import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hospital } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getNavForRole } from '../../routes/roleConfig';
import { APP_NAME } from '../../utils/constants';
import { RolNombre } from '../../types';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const items = user ? getNavForRole(user.rol as RolNombre) : [];

  const content = (
    <div className="flex h-full flex-col bg-primary-dark text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="rounded-xl bg-white/10 p-2">
          <Hospital className="h-7 w-7" />
        </div>
        <div>
          <p className="font-bold text-lg leading-tight">{APP_NAME}</p>
          <p className="text-xs text-blue-200">Hospital Regional</p>
        </div>
        <button className="ml-auto md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white text-primary-dark shadow-md'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 px-5 py-4 text-xs text-blue-200">
        <p className="capitalize font-medium text-white">{user?.username}</p>
        <p className="capitalize">{user?.rol}</p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-shrink-0">{content}</aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
