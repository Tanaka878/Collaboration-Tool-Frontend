import React from 'react';
import { FaChartBar, FaClipboardList, FaUser, FaBell, FaUsers, FaCalendar } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";

interface SideNavProps {
  isSidebarOpen: boolean;
  onSelectPage: (page: string) => void;
  currentView: string;
}

const SideNav: React.FC<SideNavProps> = ({ isSidebarOpen, onSelectPage, currentView }) => {
  const navItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: 'Project' },
    { icon: <FaClipboardList className="w-5 h-5" />, label: 'Chat Room' },
    { icon: <FaUsers className="w-5 h-5" />, label: 'File Sharing' },
    { icon: <FaCalendar className="w-5 h-5" />, label: 'Calendar' },
    { icon: <FaBell className="w-5 h-5" />, label: 'Notifications' },
    { icon: <MdSettings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-full ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-700/50`}>
      {/* Header Section */}
      <div className="relative">
        {/* Welcome Section */}
        <div className={`px-4 py-6 border-b border-slate-700/50 ${isSidebarOpen ? '' : 'px-2'}`}>
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FaUser className="w-5 h-5 text-white" />
              </div>
              {/* Welcome Text */}
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-lg">Welcome back!</h3>
                <p className="text-slate-400 text-sm">Ready to be productive?</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <FaUser className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>

      {/* Navigation Section */}
      <nav className="h-full pt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const isActive = currentView === item.label;
            return (
              <li key={index}>
                <button
                  onClick={() => onSelectPage(item.label)}
                  className={`
                    relative flex items-center w-full px-3 py-3 rounded-xl
                    transition-all duration-200 ease-in-out group
                    ${isSidebarOpen ? 'justify-start' : 'justify-center'}
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 hover:scale-105'
                    }
                  `}
                  title={!isSidebarOpen ? item.label : ''}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full shadow-lg"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 transition-all duration-200
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                    ${!isSidebarOpen ? 'mx-auto' : ''}
                  `}>
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  {isSidebarOpen && (
                    <span className={`
                      ml-4 whitespace-nowrap font-medium transition-all duration-200
                      ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                    `}>
                      {item.label}
                    </span>
                  )}

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-200"></div>
                  )}

                  {/* Active glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-12 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent ${isSidebarOpen ? 'w-32' : 'w-12'} transition-all duration-300`}></div>
        </div>
      </nav>

      {/* Sidebar collapsed tooltip enhancement */}
      {!isSidebarOpen && (
        <style jsx>{`
          button[title]:hover::after {
            content: attr(title);
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 12px;
            padding: 8px 12px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            color: white;
            border-radius: 8px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 50;
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
          
          button[title]:hover::before {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 6px;
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid rgba(15, 23, 42, 0.95);
            z-index: 50;
          }
        `}</style>
      )}
    </div>
  );
};

export default SideNav;