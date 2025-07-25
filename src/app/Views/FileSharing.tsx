'use client';
import React from 'react'
import DocumentForm from './DocumentForm'
import DocumentManager from './DocumentList'

const FileSharing = () => {
  return (
    <div 
      className="min-h-screen p-6"
      style={{ 
        background: 'linear-gradient(135deg, #EBF2FA 0%, #ffffff 30%, #EBF2FA 70%, #ffffff 100%)' 
      }}
    >
      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10" style={{ backgroundColor: '#427AA1' }}></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: '#064789' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #064789 0%, #427AA1 100%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-[#064789]">File Sharing Hub</h1>
          <p className="text-lg text-[#427AA1]">Upload, manage, and share your documents seamlessly</p>
        </div>

        {/* Form and Manager Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-md" style={{ backgroundColor: '#EBF2FA' }}>
                <svg className="w-6 h-6 text-[#064789]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#064789]">Upload Documents</h2>
            </div>
            <DocumentForm />
          </div>

          {/* Manage Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #427AA1 0%, #064789 100%)' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#064789]">Manage Files</h2>
            </div>
            <DocumentManager />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              ),
              title: 'Secure',
              desc: 'End-to-end encryption',
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              ),
              title: 'Fast',
              desc: 'Lightning quick uploads',
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
              title: 'Reliable',
              desc: '99.9% uptime guarantee',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#EBF2FA' }}>
                <svg className="w-6 h-6 text-[#064789]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-[#064789]">{feature.title}</h3>
              <p className="text-sm text-[#427AA1]">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-[#427AA1]">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileSharing
