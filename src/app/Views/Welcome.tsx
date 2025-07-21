import React, { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, Clock, Users, TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';

export default function WelcomeScreen() {
  const [animateStats, setAnimateStats] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
  };

  const stats = [
    { icon: Target, label: "Active Projects", value: 12, color: "bg-blue-500", trend: "+2" },
    { icon: CheckCircle, label: "Completed Tasks", value: 247, color: "bg-green-500", trend: "+15" },
    { icon: Clock, label: "Pending Tasks", value: 18, color: "bg-yellow-500", trend: "-3" },
    { icon: Users, label: "Team Members", value: 32, color: "bg-purple-500", trend: "+5" }
  ];

  const recentProjects = [
    { name: "Website Redesign", progress: 85, status: "On Track", dueDate: "Dec 15", team: 8 },
    { name: "Mobile App Launch", progress: 62, status: "At Risk", dueDate: "Jan 20", team: 12 },
    { name: "Marketing Campaign", progress: 90, status: "On Track", dueDate: "Nov 30", team: 6 },
    { name: "Database Migration", progress: 45, status: "Behind", dueDate: "Feb 10", team: 4 }
  ];

  const upcomingTasks = [
    { title: "Review wireframes", project: "Website Redesign", priority: "high", time: "9:00 AM" },
    { title: "Team standup meeting", project: "Mobile App", priority: "medium", time: "10:30 AM" },
    { title: "Client presentation", project: "Marketing Campaign", priority: "high", time: "2:00 PM" },
    { title: "Code review session", project: "Database Migration", priority: "low", time: "4:00 PM" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'At Risk': return 'text-yellow-600 bg-yellow-100';
      case 'Behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!animateStats) return;
      
      let start = 0;
      const increment = value / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(timer);
    }, [animateStats, value, duration]);

    return <span>{displayValue}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg">{user.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-800">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-gray-600">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                <AnimatedNumber value={stat.value} />
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Recent Projects
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={project.name} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due {project.dueDate}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.team} members
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{project.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: animateStats ? `${project.progress}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Today's Tasks
              </h2>
              <span className="text-sm text-gray-600">{upcomingTasks.length} tasks</span>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div 
                  key={task.title} 
                  className={`border-l-4 p-3 rounded-r-lg ${getPriorityColor(task.priority)} transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">{task.title}</h4>
                    <span className="text-xs text-gray-600">{task.time}</span>
                  </div>
                  <p className="text-xs text-gray-600">{task.project}</p>
                  {task.priority === 'high' && (
                    <div className="flex items-center mt-2">
                      <AlertCircle className="w-3 h-3 text-red-500 mr-1" />
                      <span className="text-xs text-red-600 font-medium">High Priority</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium">
              View All Tasks
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New Project", icon: Target, color: "from-blue-500 to-blue-600" },
              { label: "Add Task", icon: CheckCircle, color: "from-green-500 to-green-600" },
              { label: "Team Meeting", icon: Users, color: "from-purple-500 to-purple-600" },
              { label: "Reports", icon: TrendingUp, color: "from-orange-500 to-orange-600" }
            ].map((action) => (
              <button 
                key={action.label}
                className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center space-y-2`}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}