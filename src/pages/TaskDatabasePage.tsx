import React, { useState } from 'react';
import {
  Plus,
  Search,
  Download,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [laneFilter, setLaneFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskLane, setNewTaskLane] = useState<TaskLane>('CONTENT');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('Generated');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLane = laneFilter === 'ALL' || t.lane === laneFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesLane && matchesStatus;
  });

  // Summary counts
  const assignedCount = tasks.filter((t) => t.status === 'Assigned').length;
  const generatedCount = tasks.filter((t) => t.status === 'Generated').length;
  const awaitingCount = tasks.filter((t) => t.status === 'Awaiting approval').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      task: newTaskTitle,
      lane: newTaskLane,
      status: newTaskStatus,
      date: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
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
    a.download = `task-db-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Top Header & Summary from PDF Page 6 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-[#010101] uppercase tracking-wider">ALL TASKS</h2>
            <span className="text-[11px] text-[#71717a] font-mono">
              {filteredTasks.length} of {tasks.length}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold mt-1.5">
            <span className="px-2 py-0.5 rounded-[4px] bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] text-[10px]">
              {assignedCount} assigned
            </span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#faf6fd] text-[#7c3aed] border border-[#ede9fe] text-[10px]">
              {generatedCount} generated
            </span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a] text-[10px]">
              {awaitingCount} awaiting approval
            </span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] text-[10px]">
              {completedCount} completed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white font-medium text-xs transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            New Task
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] text-[#171717] hover:text-black text-xs font-medium border border-[#e3e3e3] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 bg-white border border-[#efefef] rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex flex-1 items-center gap-2.5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-[#a1a1aa] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks by title or keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-[6px] bg-white border border-[#e3e3e3] text-xs text-[#18181b] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <Dropdown
            value={laneFilter}
            onChange={(val) => setLaneFilter(val)}
            options={[
              { label: 'Lane: All', value: 'ALL' },
              { label: 'Lane: CONTENT', value: 'CONTENT' },
              { label: 'Lane: TECHNICAL', value: 'TECHNICAL' },
              { label: 'Lane: PAID', value: 'PAID' },
            ]}
          />

          <Dropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { label: 'Status: All', value: 'ALL' },
              { label: 'Status: Generated', value: 'Generated' },
              { label: 'Status: Assigned', value: 'Assigned' },
              { label: 'Status: Awaiting approval', value: 'Awaiting approval' },
              { label: 'Status: Completed', value: 'Completed' },
            ]}
          />
        </div>
      </div>

      {/* Database Table */}
      <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center">#</th>
              <th className="py-2.5 px-4">TASK</th>
              <th className="py-2.5 px-4">LANE</th>
              <th className="py-2.5 px-4">STATUS</th>
              <th className="py-2.5 px-4 text-right">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#efefef] text-[#27272a]">
            {filteredTasks.map((t, idx) => (
              <tr key={t.id} className="hover:bg-[#fafafa] transition-colors group">
                <td className="py-3 px-3 text-center font-mono text-[#a1a1aa] text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-3 px-4 font-medium text-[#18181b] max-w-lg">
                  <div className="flex items-center gap-2">
                    <span
                      className={`cursor-pointer transition-all ${
                        t.status === 'Completed' ? 'line-through text-[#a1a1aa]' : 'text-[#010101]'
                      }`}
                      onClick={() =>
                        onUpdateStatus(
                          t.id,
                          t.status === 'Completed' ? 'Generated' : 'Completed'
                        )
                      }
                    >
                      {t.task}
                    </span>
                    {t.priority === 'High' && (
                      <span className="text-[10px] font-semibold text-[#dc2626] shrink-0">
                        [High]
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-[4px] ${
                      t.lane === 'TECHNICAL'
                        ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                        : t.lane === 'CONTENT'
                        ? 'bg-[#faf6fd] text-[#7c3aed] border border-[#ede9fe]'
                        : 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                    }`}
                  >
                    {t.lane}
                  </span>
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <Dropdown
                    size="sm"
                    value={t.status}
                    onChange={(val) => onUpdateStatus(t.id, val as TaskStatus)}
                    options={[
                      { label: 'Generated', value: 'Generated', badge: 'New', badgeColor: 'bg-[#f4f4f5] text-[#52525b]' },
                      { label: 'Assigned', value: 'Assigned', badge: 'In flight', badgeColor: 'bg-[#eff6ff] text-[#2563eb]' },
                      { label: 'Awaiting approval', value: 'Awaiting approval', badge: 'Pending', badgeColor: 'bg-[#fefce8] text-[#a16207]' },
                      { label: 'Completed', value: 'Completed', badge: 'Done', badgeColor: 'bg-[#f0fdf4] text-[#16a34a]' },
                    ]}
                  />
                </td>
                <td className="py-3 px-4 text-right font-mono text-[#71717a] whitespace-nowrap text-[11px]">
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-2.5 bg-[#fafafa] border-t border-[#efefef] text-[#71717a] text-[11px]">
          Completed work is dated by when it was confirmed; everything else by when it was raised.
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#efefef] rounded-[8px] p-5 w-full max-w-md shadow-2xl">
            <h3 className="text-sm font-semibold text-[#010101] mb-3.5">Create New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#27272a] mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Set up Meta Pixel and track form submissions"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-[6px] bg-white border border-[#e3e3e3] text-xs text-[#18181b] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-[#27272a] mb-1">
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
                  <label className="block text-xs font-semibold text-[#27272a] mb-1">
                    Initial Status
                  </label>
                  <Dropdown
                    className="w-full"
                    value={newTaskStatus}
                    onChange={(val) => setNewTaskStatus(val as TaskStatus)}
                    options={[
                      { label: 'Generated', value: 'Generated' },
                      { label: 'Assigned', value: 'Assigned' },
                      { label: 'Awaiting approval', value: 'Awaiting approval' },
                      { label: 'Completed', value: 'Completed' },
                    ]}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#efefef]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] text-[#171717] text-xs font-medium border border-[#e3e3e3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white text-xs font-medium transition-colors shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
