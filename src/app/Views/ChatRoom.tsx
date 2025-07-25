'use client';
import React from 'react'
import ChatPage from './ChatUI/page'

const ChatRoom = () => {
  return (
    <div 
      className="min-h-screen p-4"
      style={{ 
        background: 'linear-gradient(135deg, #EBF2FA 0%, #ffffff 50%, #EBF2FA 100%)' 
      }}
    >
      {/* Simple header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border"
          style={{ borderColor: '#EBF2FA' }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #064789 0%, #427AA1 100%)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold" style={{ color: '#064789' }}>
                Chat Room
              </h1>
              <p className="text-sm" style={{ color: '#427AA1' }}>
                Connected and ready
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat container */}
      <div className="max-w-4xl mx-auto">
        <div 
          className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border overflow-hidden"
          style={{ borderColor: '#EBF2FA' }}
        >
          <ChatPage />
        </div>
      </div>
    </div>
  )
}

export default ChatRoom