import { useRouter } from 'next/navigation';
import React from 'react';
import { FaChartBar, FaClipboardList, FaUser, FaBell, FaUsers, FaCalendar } from "react-icons/fa";
import { MdDashboard, MdLogout, MdSettings } from "react-icons/md";

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
  ];

  const router = useRouter();
  // Add logout handler
  const handleLogout = () => {
    localStorage.clear();
    router.push('/Views/Login'); // Redirect to login page
  };

  return (
    <div className={`bg-gradient-to-b from-[#064789] via-[#427aa1] to-[#064789] h-full ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out shadow-2xl border-r border-[#064789]/50`}>
      {/* Header Section */}
      <div className="relative">
        {/* Welcome Section */}
        <div className={`px-4 py-6 border-b border-[#064789]/50 ${isSidebarOpen ? '' : 'px-2'}`}>
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#064789] to-[#427aa1] flex items-center justify-center shadow-lg">
                <FaUser className="w-5 h-5 text-white" />
              </div>
              {/* Welcome Text */}
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-lg">Welcome back!</h3>
                <p className="text-[#ebf2fa] text-sm">Ready to be productive?</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#064789] to-[#427aa1] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <FaUser className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#427aa1]/50 to-transparent"></div>
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
                      ? 'bg-gradient-to-r from-[#064789] to-[#427aa1] text-white shadow-lg shadow-[#064789]/25 scale-105' 
                      : 'text-[#ebf2fa] hover:text-white hover:bg-[#064789]/50 hover:scale-105'
                    }
                  `}
                  title={!isSidebarOpen ? item.label : ''}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#427aa1] to-[#064789] rounded-full shadow-lg"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 transition-all duration-200
                    ${isActive ? 'text-white' : 'text-[#ebf2fa] group-hover:text-white'}
                    ${!isSidebarOpen ? 'mx-auto' : ''}`}>
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  {isSidebarOpen && (
                    <span className={`ml-4 whitespace-nowrap font-medium transition-all duration-200
                      ${isActive ? 'text-white' : 'text-[#ebf2fa] group-hover:text-white'}
                    `}>
                      {item.label}
                    </span>
                  )}

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#064789]/10 to-[#427aa1]/10 transition-opacity duration-200"></div>
                  )}

                  {/* Active glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#064789]/20 to-[#427aa1]/20 blur-sm"></div>
                  )}
                </button>
              </li>
            );
          })}
          {/* Add Logout button at the bottom */}
          <li>
            <button
              onClick={handleLogout}
              className={`
                relative flex items-center w-full px-3 py-3 rounded-xl
                transition-all duration-200 ease-in-out group
                ${isSidebarOpen ? 'justify-start' : 'justify-center'}
                text-[#ebf2fa] hover:text-white hover:bg-red-700/50 hover:scale-105
              `}
              title={!isSidebarOpen ? 'Logout' : ''}
            >
              <MdLogout className="w-5 h-5" />
              {isSidebarOpen && (
                <span className="ml-4 whitespace-nowrap font-medium">Logout</span>
              )}
            </button>
          </li>
        </ul>

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-12 h-px bg-gradient-to-r from-transparent via-[#064789] to-transparent ${isSidebarOpen ? 'w-32' : 'w-12'} transition-all duration-300`}></div>
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
            background: rgba(6, 71, 137, 0.95);
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
            border-right: 6px solid rgba(6, 71, 137, 0.95);
            z-index: 50;
          }
        `}</style>
      )}
    </div>
  );
};

export default SideNav;
