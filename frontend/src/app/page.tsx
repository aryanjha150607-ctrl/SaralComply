'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import { ShieldCheck, AlertCircle, FileCheck, CheckSquare, Clock, CheckCircle, Edit2, Trash2, X, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ComplianceTask {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  severity: string;
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract State
  const [extractText, setExtractText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDueDate) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, dueDate: newTaskDueDate })
      });

      if (response.ok) {
        // Refresh the tasks list
        await fetchTasks();
        // Reset form
        setNewTaskTitle('');
        setNewTaskDueDate('');
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSmartExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractText) return;

    setIsExtracting(true);
    try {
      const response = await fetch('http://localhost:3001/api/tasks/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractText })
      });

      if (response.ok) {
        // Refresh the tasks list
        await fetchTasks();
        // Reset form
        setExtractText('');
      } else {
        console.error('Failed to extract task');
      }
    } catch (error) {
      console.error('Error extracting task:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' })
      });
      if (response.ok) fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (response.ok) fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (taskId: number) => {
    // Basic implementation: for a full feature, we'd open a modal. For now, let's alert.
    alert('Edit task flow mapping goes here!');
  }

  const handleExportCSV = () => {
    if (tasks.length === 0) return;

    // Create CSV content
    const headers = ['ID', 'Title', 'Status', 'Due Date', 'Severity'];
    const rows = tasks.map(t => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`, // escape quotes in title
      t.status,
      new Date(t.dueDate).toLocaleDateString(),
      t.severity
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'compliance_tasks_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;

  // Data for Recharts Pie Chart
  const complianceData = [
    { name: 'Completed', value: completedTasksCount, color: '#10b981' }, // Emerald-500
    { name: 'Pending', value: pendingTasksCount, color: '#f59e0b' } // Amber-500
  ];

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">

      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">

        {/* Top Header with Search Component */}
        <Header
          setSidebarOpen={setIsSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto space-y-6">

            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">Compliance Overview</h1>
                <p className="mt-1 text-sm text-slate-500">Monitor your organization's compliance health and latest alerts.</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export to CSV
              </button>
            </header>

            {/* Status Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatusCard
                title="Overall Score"
                value="94%"
                icon={ShieldCheck}
                trend={{ value: '2.5%', isUp: true }}
                colorClass="bg-indigo-100 text-indigo-700"
              />
              <StatusCard
                title="Pending Tasks"
                value={isLoading ? "..." : pendingTasksCount.toString()}
                icon={CheckSquare}
                trend={{ value: `${tasks.length} total`, isUp: false }}
                colorClass="bg-amber-100 text-amber-700"
              />
              <StatusCard
                title="Policies Reviewed"
                value="148"
                icon={FileCheck}
                colorClass="bg-emerald-100 text-emerald-700"
              />
              <StatusCard
                title="Active Alerts"
                value="3"
                icon={AlertCircle}
                trend={{ value: '1', isUp: false }}
                colorClass="bg-rose-100 text-rose-700"
              />
            </div>

            {/* Main Content Sections (Placeholder for upcoming additions) */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Data Visualization Chart Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-full sm:w-1/2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complianceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {complianceData.map((entry, index) => (
                            <Cell key={`cell-\${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="middle" align="right" layout="vertical" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col justify-center space-y-4">
                    <h3 className="text-lg font-medium text-slate-900">Task Completion Ratio</h3>
                    <p className="text-sm text-slate-500">
                      Visualizing your progress towards full compliance. You have successfully resolved
                      <span className="font-semibold text-emerald-600 mx-1">{completedTasksCount}</span>
                      tasks so far out of {tasks.length}.
                    </p>
                  </div>
                </div>

                {/* Tasks List Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col min-h-[400px]">
                  <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4 mb-4">Compliance Tasks</h3>
                  {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500">Loading tasks...</div>
                  ) : filteredTasks.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500">No tasks found.</div>
                  ) : (
                    <div className="space-y-3 overflow-y-auto">
                      {filteredTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                              task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-indigo-100 text-indigo-600'
                              }`}>
                              {task.status === 'Completed' ? <FileCheck className="w-5 h-5" /> :
                                task.status === 'In Progress' ? <Clock className="w-5 h-5" /> :
                                  <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className={`text-sm font-semibold transition-colors ${task.status === 'Completed' ? 'text-slate-500 line-through' : 'text-slate-900 group-hover:text-indigo-900'}`}>{task.title}</h4>
                                {task.status !== 'Completed' && (
                                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${task.severity === 'High' ? 'bg-rose-100 text-rose-700 border border-rose-200 shadow-[0_0_8px_rgba(225,29,72,0.2)]' :
                                      task.severity === 'Low' ? 'bg-sky-100 text-sky-700 border border-sky-200' :
                                        'bg-amber-100 text-amber-700 border border-amber-200'
                                    }`}>
                                    {task.severity}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="font-medium text-slate-700">{task.status}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                            {task.status !== 'Completed' && (
                              <button
                                onClick={() => handleCompleteTask(task.id)}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                title="Mark as Complete"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEditTask(task.id)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                              title="Edit Task"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                              title="Delete Task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4 mb-4">Add New Task</h3>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                        placeholder="e.g. Audit Employee Records"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                      <input
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                      {isSubmitting ? 'Adding...' : 'Add Task'}
                    </button>
                  </form>
                </div>

                <div className="w-full bg-indigo-50/50 rounded-2xl shadow-sm border border-indigo-100 p-6 flex-1">
                  <h3 className="text-lg font-medium text-indigo-900 border-b border-indigo-100 pb-4 mb-4 flex items-center justify-between">
                    Smart Extract ✨
                    <span className="text-xs font-normal text-indigo-600 bg-white px-2 py-1 rounded-md border border-indigo-100">AI Powered</span>
                  </h3>
                  <form onSubmit={handleSmartExtract} className="space-y-4 h-full flex flex-col">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-indigo-800 mb-1">Paste Regulation Text</label>
                      <textarea
                        value={extractText}
                        onChange={(e) => setExtractText(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm min-h-[120px] resize-none"
                        placeholder="e.g. Under Article 30 of the GDPR, organizations must maintain a record of processing activities by..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isExtracting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                    >
                      {isExtracting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Extracting...
                        </>
                      ) : 'Generate Task'}
                    </button>
                    <p className="text-xs text-indigo-400 text-center mt-2">AI will suggest a title and deadline 30 days out if none is specified.</p>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

    </div>
  );
}
