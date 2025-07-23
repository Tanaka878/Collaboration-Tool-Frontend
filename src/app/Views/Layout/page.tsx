'use client';
import React, { useState } from 'react';
import SideNav from '../SideNav';
import { useRouter } from 'next/navigation';
import ChatRoom from '../ChatRoom';
import Notifications from '../Notifications';
import Calender from '../Calender';
import FileSharing from '../FileSharing';
import UserProfile from '../UserProfile';
import WelcomeScreen from '../Welcome';
import ProjectForm from '../ProjectForm';


const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  
    const [currentView, setCurrentView] = useState('Tickets'); 
  
  const router = useRouter();
  
  
  


  const renderContent = () => {
    switch (currentView) {
      case 'Project':
        return <ProjectForm/>;
      case 'Tickets':
        return <WelcomeScreen />;
      case 'Chat Room':
        return <ChatRoom />; 
      case 'File Sharing':
        return <FileSharing />; 
      case 'Notifications':
          return <UserProfile/>;
        
      case 'Settings':
        return <Calender/>;

      default:
        return <Notifications />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
    
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - with controllable visibility */}
        <div className={`flex-none ${isSidebarOpen ? 'w-64' : 'w-16'} transition-width duration-300 ease-in-out`}>
          <SideNav
            isSidebarOpen={isSidebarOpen}
            onSelectPage={(view) => setCurrentView(view)}
            currentView={currentView} 
          />
        </div>
        
        <div className="flex-1  p-6 overflow-auto mt-12 text-black">
        {renderContent()}
    
        </div>
      </div>
      
    
    </div>
  );
};

export default Layout;