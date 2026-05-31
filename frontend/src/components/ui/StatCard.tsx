import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cardHover } from '../../utils/animations';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ title, value, icon: Icon, color = 'bg-primary' }: StatCardProps) {
  return (
    <motion.div
      {...cardHover}
      className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${color} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
