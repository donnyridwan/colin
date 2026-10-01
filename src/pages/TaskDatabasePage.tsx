import React, { useState } from 'react';
import {
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
  MoreHorizontal,
  Signal,
  LayoutList,
  Layers,
  Circle,
  Download,
  Star,
  Tags,
} from 'lucide-react';
import { TaskItem, TaskLane, TaskStatus } from '../types';
import { Dropdown } from '../components/common/Dropdown';

interface TaskDatabasePageProps {
  tasks: TaskItem[];
  onAddTask: (newTask: Omit<TaskItem, 'id'>) => void;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const TaskDatabasePage: React.FC<TaskDatabasePageProps> = ({
  tasks,
  onAddTask,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'backlog' | 'all'>('backlog');
  const [searchTerm, setSearchTerm] = useState('');
  const [laneFilter, setLaneFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskLane, setNewTaskLane] = useState<TaskLane>('CONTENT');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('Generated');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLane = laneFilter === 'ALL' || t.lane === laneFilter;
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'active'
        ? t.status === 'Assigned' || t.status === 'Awaiting approval'
        : t.status === 'Generated' || t.status === 'Completed';
    return matchesSearch && matchesLane && matchesTab;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      task: newTaskTitle,
      lane: newTaskLane,
      status: newTaskStatus,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      priority: newTaskPriority,
      source: 'User Manual Entry',
    });

    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Task,Lane,Status,Date,Priority\n';
    const rows = filteredTasks
      .map(
        (t) =>
          `"${t.id}","${t.task.replace(/"/g, '""')}","${t.lane}","${t.status}","${t.date}","${
            t.priority || ''
          }"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* 1. VIEW SWITCHER TOOLBAR (Matching trackly_tasks.png) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* View mode tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[10px] w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'active'
                ? 'bg-white text-[#0f172a] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Active</span>
          </button>
          <button
            onClick={() => setActiveTab('backlog')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'backlog'
                ? 'bg-white text-[#0f172a] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Circle className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Backlog</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#0f172a] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>All</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Import / Export</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold shadow-xs transition-colors active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      {/* 2. SECONDARY FILTER & SEARCH BAR (Exact Trackly secondary bar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] w-48 font-medium"
            />
          </div>

          <button
            onClick={() => setLaneFilter(laneFilter === 'ALL' ? 'CONTENT' : 'ALL')}
            className={`px-3 py-1.5 rounded-[8px] border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              laneFilter !== 'ALL'
                ? 'bg-[#0f172a] text-white border-[#0f172a]'
                : 'bg-white hover:bg-[#f8fafc] text-[#0f172a] border-[#e2e8f0]'
            }`}
          >
            <Tags className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Lane: {laneFilter}</span>
          </button>

          <button className="px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] flex items-center gap-1.5 transition-colors shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Sort</span>
          </button>

          <button className="px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] flex items-center gap-1.5 transition-colors shadow-2xs">
            <Signal className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Priority</span>
          </button>

          <button className="px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] flex items-center gap-1.5 transition-colors shadow-2xs">
            <Star className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Favorite</span>
          </button>
        </div>

        <button className="px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] flex items-center gap-1.5 transition-colors shadow-2xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748b]" />
          <span>Filter</span>
        </button>
      </div>

      {/* 3. TRACKLY BACKLOG TABLE (Figma Node 257:3308) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Section title inside table */}
        <div className="px-5 py-3.5 bg-white border-b border-[#f1f5f9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#0f172a]" />
            <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
              {activeTab === 'all' ? 'All Tickets' : activeTab === 'active' ? 'Active Tasks' : 'Backlog'}
            </span>
            <span className="text-xs text-[#94a3b8] font-mono">({filteredTasks.length})</span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="p-1 rounded-[6px] hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a]"
            title="Add task to backlog"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#64748b] text-[11px] font-semibold border-b border-[#f1f5f9] bg-[#f8fafc]/50">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4">Due date</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9] text-[#0f172a]">
              {filteredTasks.map((t, idx) => {
                const assigneeInitials = t.assignedTo
                  ? t.assignedTo
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : 'AI';

                return (
                  <tr key={t.id} className="hover:bg-[#f8fafc] transition-colors group">
                    {/* Name column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={t.status === 'Completed'}
                          onChange={() =>
                            onUpdateStatus(
                              t.id,
                              t.status === 'Completed' ? 'Generated' : 'Completed'
                            )
                          }
                          className="w-4 h-4 rounded-[4px] border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a] cursor-pointer"
                        />
                        <span className="font-mono text-[#64748b] text-xs shrink-0">{t.id}</span>
                        <span
                          className={`font-semibold max-w-sm truncate ${
                            t.status === 'Completed'
                              ? 'line-through text-[#94a3b8]'
                              : 'text-[#0f172a]'
                          }`}
                        >
                          {t.task}
                        </span>
                      </div>
                    </td>

                    {/* Assignee column (Circular avatar) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] text-[10px] font-bold text-[#0f172a] flex items-center justify-center">
                          {assigneeInitials}
                        </div>
                        <span className="text-xs text-[#64748b] truncate max-w-[100px]">
                          {t.assignedTo || 'Unassigned'}
                        </span>
                      </div>
                    </td>

                    {/* Due date column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-[#64748b] font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                        <span>{t.date}</span>
                      </div>
                    </td>

                    {/* Priority column (Signal bar) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-semibold text-xs">
                        <Signal
                          className={`w-3.5 h-3.5 ${
                            t.priority === 'High'
                              ? 'text-[#ea580c]'
                              : t.priority === 'Medium'
                              ? 'text-[#f59e0b]'
                              : 'text-[#94a3b8]'
                          }`}
                        />
                        <span>{t.priority || 'Medium'}</span>
                      </div>
                    </td>

                    {/* Project / Channel column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" />
                        <span className="text-xs font-medium text-[#475569]">{t.lane}</span>
                      </div>
                    </td>

                    {/* Action 3 dots column */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() =>
                          onUpdateStatus(
                            t.id,
                            t.status === 'Completed' ? 'Generated' : 'Completed'
                          )
                        }
                        className="p-1 rounded-[6px] hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#0f172a] transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 w-full max-w-md shadow-[0px_20px_50px_rgba(15,23,42,0.15)]">
            <h3 className="text-base font-bold text-[#0f172a] mb-4">Create New Ticket</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Ticket Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dashboard loading time exceeds 3s on mobile devices"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Lane
                  </label>
                  <Dropdown
                    className="w-full"
                    value={newTaskLane}
                    onChange={(val) => setNewTaskLane(val as TaskLane)}
                    options={[
                      { label: 'CONTENT', value: 'CONTENT' },
                      { label: 'TECHNICAL', value: 'TECHNICAL' },
                      { label: 'PAID', value: 'PAID' },
                      { label: 'GENERAL', value: 'GENERAL' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Priority
                  </label>
                  <Dropdown
                    className="w-full"
                    value={newTaskPriority}
                    onChange={(val) => setNewTaskPriority(val as 'High' | 'Medium' | 'Low')}
                    options={[
                      { label: 'High', value: 'High' },
                      { label: 'Medium', value: 'Medium' },
                      { label: 'Low', value: 'Low' },
                    ]}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
