import React, { useState } from 'react';
import { Issue, IssueSeverity, IssueStatus } from '../types';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';

interface IssueListProps {
  issues: Issue[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  const [filterText, setFilterText] = useState('');

  const filteredIssues = issues.filter(issue =>
    issue.title.includes(filterText) ||
    issue.description.includes(filterText) ||
    issue.id.includes(filterText) ||
    issue.department.includes(filterText)
  );

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.NEW: return 'bg-blue-100 text-blue-700 border-blue-200';
      case IssueStatus.IN_PROGRESS: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case IssueStatus.PENDING_REVIEW: return 'bg-amber-100 text-amber-700 border-amber-200';
      case IssueStatus.RESOLVED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case IssueStatus.CLOSED: return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: IssueSeverity) => {
    switch (severity) {
      case IssueSeverity.CRITICAL: return 'text-red-600 font-bold';
      case IssueSeverity.HIGH: return 'text-orange-600 font-medium';
      case IssueSeverity.MEDIUM: return 'text-yellow-600';
      case IssueSeverity.LOW: return 'text-slate-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full animate-fade-in">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">问题台账</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索问题..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">筛选</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">新建问题</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">编号</th>
              <th className="px-6 py-4">标题 / 描述</th>
              <th className="px-6 py-4">部门</th>
              <th className="px-6 py-4">责任人</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">严重程度</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">
                  {issue.id}
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="text-sm font-medium text-slate-900 truncate" title={issue.title}>{issue.title}</div>
                  <div className="text-xs text-slate-500 truncate" title={issue.description}>{issue.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs">{issue.department}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 font-bold">
                    {issue.assignee[0]}
                  </div>
                  {issue.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredIssues.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  未找到相关问题记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueList;
