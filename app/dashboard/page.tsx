'use client';

import { useState, useEffect } from 'react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const metrics: MetricCard[] = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: '👥'
    },
    {
      title: 'Revenue',
      value: '$48,392',
      change: '+8.2%',
      trend: 'up',
      icon: '💰'
    },
    {
      title: 'Active Sessions',
      value: '2,341',
      change: '-3.1%',
      trend: 'down',
      icon: '⚡'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.3%',
      trend: 'up',
      icon: '📈'
    }
  ];

  const recentActivity: Activity[] = [
    {
      id: 1,
      user: 'Alice Chen',
      action: 'Created new project',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      user: 'Bob Johnson',
      action: 'Updated profile settings',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      user: 'Carol Davis',
      action: 'Uploaded document',
      timestamp: '12 minutes ago',
      status: 'pending'
    },
    {
      id: 4,
      user: 'David Wilson',
      action: 'Failed payment attempt',
      timestamp: '18 minutes ago',
      status: 'failed'
    },
    {
      id: 5,
      user: 'Emma Brown',
      action: 'Completed onboarding',
      timestamp: '23 minutes ago',
      status: 'success'
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Time</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              onClick={() => setSelectedMetric(selectedMetric === metric.title ? null : metric.title)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedMetric === metric.title ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{metric.icon}</div>
                <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Performance Overview
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600 dark:text-gray-300">Chart visualization would go here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Interactive charts coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.action}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.timestamp}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
              View all activity →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '➕', label: 'Add User', color: 'bg-blue-500' },
              { icon: '📄', label: 'New Report', color: 'bg-green-500' },
              { icon: '⚙️', label: 'Settings', color: 'bg-purple-500' },
              { icon: '📧', label: 'Send Email', color: 'bg-orange-500' }
            ].map((action, index) => (
              <button
                key={index}
                className={`${action.color} hover:opacity-90 text-white rounded-lg p-4 flex flex-col items-center space-y-2 transition-all duration-200 transform hover:scale-105`}
              >
                <div className="text-2xl">{action.icon}</div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
