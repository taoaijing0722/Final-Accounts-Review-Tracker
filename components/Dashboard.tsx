import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Issue, IssueStatus, IssueSeverity } from '../types';
import { AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react';

interface DashboardProps {
  issues: Issue[];
}

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#64748b'];

const Dashboard: React.FC<DashboardProps> = ({ issues }) => {
  const stats = useMemo(() => {
    return {
      total: issues.length,
      resolved: issues.filter(i => i.status === IssueStatus.RESOLVED || i.status === IssueStatus.CLOSED).length,
      pending: issues.filter(i => i.status === IssueStatus.PENDING_REVIEW).length,
      critical: issues.filter(i => i.severity === IssueSeverity.CRITICAL || i.severity === IssueSeverity.HIGH).length,
    };
  }, [issues]);

  const statusData = useMemo(() => {
    const counts = issues.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [issues]);

  const deptData = useMemo(() => {
    const counts = issues.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [issues]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="问题总数" value={stats.total} icon={FileText} color="blue" />
        <StatCard title="已解决" value={stats.resolved} icon={CheckCircle2} color="green" />
        <StatCard title="待复核" value={stats.pending} icon={Clock} color="yellow" />
        <StatCard title="严重/紧急" value={stats.critical} icon={AlertCircle} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            问题状态分布
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
            部门问题统计
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    yellow: 'bg-amber-50 text-amber-600',
    red: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Dashboard;
