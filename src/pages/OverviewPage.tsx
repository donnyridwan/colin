import React from 'react';
import {
  GA4_KPIS,
  GSC_KPIS,
  CRAWL_OVERVIEW,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { TracklyDonutChart } from '../components/common/TracklyDonutChart';
import { TracklyPriorityBarChart } from '../components/common/TracklyPriorityBarChart';
import { TracklyTrendChart } from '../components/common/TracklyTrendChart';
import { MenuId, TaskItem } from '../types';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (menu: MenuId) => void;
  tasks: TaskItem[];
  onToggleTaskStatus: (taskId: string) => void;
  onRunAudit?: () => void;
  isAuditing?: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  tasks,
  onToggleTaskStatus,
}) => {
  const openTasks = tasks.filter((t) => t.status !== 'Completed');
  const highPriorityTasks = openTasks.filter((t) => t.priority === 'High');
  const confirmedTasks = tasks.filter((t) => t.status === 'Completed');

  // Distribution for Donut Chart
  const statusDistribution = [
    {
      label: 'Backlog',
      count: tasks.filter((t) => t.status === 'Generated').length,
      percentage: Math.round(
        (tasks.filter((t) => t.status === 'Generated').length / (tasks.length || 1)) * 100
      ),
      color: '#94a3b8',
    },
    {
      label: 'In progress',
      count: tasks.filter((t) => t.status === 'Assigned').length,
      percentage: Math.round(
        (tasks.filter((t) => t.status === 'Assigned').length / (tasks.length || 1)) * 100
      ),
      color: '#f59e0b',
    },
    {
      label: 'In review',
      count: tasks.filter((t) => t.status === 'Awaiting approval').length,
      percentage: Math.round(
        (tasks.filter((t) => t.status === 'Awaiting approval').length / (tasks.length || 1)) * 100
      ),
      color: '#6366f1',
    },
    {
      label: 'Done',
      count: confirmedTasks.length,
      percentage: Math.round((confirmedTasks.length / (tasks.length || 1)) * 100),
      color: '#10b981',
    },
  ];

  // Priority bar distribution
  const priorityDistribution = [
    {
      label: 'Critical',
      count: highPriorityTasks.length,
      heightPercent: Math.max(30, Math.min(100, highPriorityTasks.length * 25)),
      color: '#f87171',
    },
    {
      label: 'High',
      count: 8,
      heightPercent: 75,
      color: '#f97316',
    },
    {
      label: 'Medium',
      count: 12,
      heightPercent: 60,
      color: '#94a3b8',
    },
    {
      label: 'Low',
      count: 18,
      heightPercent: 90,
      color: '#cbd5e1',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. TOP ROW: FOUR PURE TRACKLY STAT CARDS (Matching Figma Report Node 415:38239) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total tickets"
          value={tasks.length}
          change="↗ 12%"
          changeDirection="up"
          subtext="from last month"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="Solved tickets"
          value={confirmedTasks.length}
          change="↘ -5%"
          changeDirection="down"
          subtext="from last month"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="Projects on track"
          value={`${CRAWL_OVERVIEW.score}%`}
          change="↗ 15%"
          changeDirection="up"
          subtext="from last month"
          onClick={() => onNavigate('search-marketing')}
        />
        <StatCard
          label="Avg response time"
          value={CRAWL_OVERVIEW.avgTime}
          change="↗ -1d 2h"
          changeDirection="up"
          subtext="from last month"
          onClick={() => onNavigate('website')}
        />
      </div>

      {/* 2. MIDDLE ROW: TWO ANALYTICAL TRACKLY CARDS (Ticket by Status + Projects on Track) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Ticket by Status Donut */}
        <TracklyDonutChart
          title="Ticket by status"
          subtitle="Distribution of tickets across different statuses"
          buttonText="Details Ticket"
          onButtonClick={() => onNavigate('task-db')}
          items={statusDistribution}
        />

        {/* Card 2: Projects on track Priority Bar */}
        <TracklyPriorityBarChart
          title="Projects on track"
          subtitle="Distribution of tickets across different priorities"
          buttonText="Details Ticket"
          onButtonClick={() => onNavigate('actionable-items')}
          data={priorityDistribution}
        />
      </div>

      {/* 3. THIRD ROW: FULL WIDTH TICKET TREND LINE CHART */}
      <TracklyTrendChart
        title="Ticket trend"
        subtitle="Number of tickets created vs resolved over time"
        buttonText="Details Ticket"
        onButtonClick={() => onNavigate('task-db')}
      />

      {/* 4. FOURTH SECTION: TASKS BACKLOG TABLE (Exact Trackly Tasks Table Component) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 lg:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e2e8f0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-[#0f172a] shrink-0" />
              <h3 className="text-base font-bold text-[#0f172a] tracking-tight">Backlog</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]">
                {openTasks.length}
              </span>
            </div>
            <p className="text-xs text-[#64748b] mt-0.5 ml-4.5">
              Active prioritized tasks indexed from site crawl, GA4, and search audit.
            </p>
          </div>

          <button
            onClick={() => onNavigate('task-db')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold shadow-2xs self-start sm:self-auto transition-colors"
          >
            <span>View All Tickets</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Backlog Table Rows matching trackly_tasks.png */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#64748b] text-[11px] font-semibold uppercase tracking-wider border-b border-[#f1f5f9]">
              <tr>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-4">Due date</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9] text-[#0f172a]">
              {tasks.slice(0, 6).map((task) => (
                <tr key={task.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="py-3.5 px-3 font-medium">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        onChange={() => onToggleTaskStatus(task.id)}
                        className="w-4 h-4 rounded-[4px] border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a] cursor-pointer"
                      />
                      <span className="font-mono text-[#64748b] text-xs shrink-0">{task.id}</span>
                      <span
                        className={`truncate max-w-md ${
                          task.status === 'Completed'
                            ? 'line-through text-[#94a3b8]'
                            : 'text-[#0f172a] font-semibold'
                        }`}
                      >
                        {task.task}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748b] whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <span>{task.date}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          task.priority === 'High'
                            ? 'bg-[#ea580c]'
                            : task.priority === 'Medium'
                            ? 'bg-[#f59e0b]'
                            : 'bg-[#94a3b8]'
                        }`}
                      />
                      <span>{task.priority || 'Medium'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        task.status === 'Completed'
                          ? 'bg-[#0f172a] text-white'
                          : 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
