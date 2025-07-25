'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Database,
  Server,
  XCircle
} from 'lucide-react';

// Element types
type ElementType = 'user' | 'database' | 'server';

interface BoardElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  label: string;
}

// Simple UUID generator since we can't import uuid
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function DrawingBoard() {
  const [elements, setElements] = useState<BoardElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<ElementType | null>(null);
  const [lines, setLines] = useState<{ from: string; to: string }[]>([]);
  const [connectMode, setConnectMode] = useState(false);
  const [firstConnectId, setFirstConnectId] = useState<string | null>(null);

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: BoardElement = {
      id: generateId(),
      type: selectedTool,
      x,
      y,
      label: `${selectedTool}-${elements.length + 1}`,
    };

    setElements(prev => [...prev, newElement]);
  };

  const handleDrag = (id: string, dx: number, dy: number) => {
    setElements(prev =>
      prev.map(el =>
        el.id === id ? { ...el, x: el.x + dx, y: el.y + dy } : el
      )
    );
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setLines(prev => prev.filter(line => line.from !== id && line.to !== id));
  };

  const handleConnectClick = (id: string) => {
    if (!connectMode) return;
    if (firstConnectId === null) {
      setFirstConnectId(id);
    } else {
      if (firstConnectId !== id) {
        setLines(prev => [...prev, { from: firstConnectId, to: id }]);
      }
      setFirstConnectId(null);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-blue-50">
      {/* Toolbar */}
      <div className="flex gap-4 p-3 bg-blue-600 text-white shadow-md">
        <button 
          onClick={() => setSelectedTool('user')} 
          className={`hover:bg-blue-800 px-3 py-1 rounded flex items-center ${selectedTool === 'user' ? 'bg-blue-800' : ''}`}
        >
          <User className="inline mr-2 w-4 h-4" /> User
        </button>
        <button 
          onClick={() => setSelectedTool('database')} 
          className={`hover:bg-blue-800 px-3 py-1 rounded flex items-center ${selectedTool === 'database' ? 'bg-blue-800' : ''}`}
        >
          <Database className="inline mr-2 w-4 h-4" /> Database
        </button>
        <button 
          onClick={() => setSelectedTool('server')} 
          className={`hover:bg-blue-800 px-3 py-1 rounded flex items-center ${selectedTool === 'server' ? 'bg-blue-800' : ''}`}
        >
          <Server className="inline mr-2 w-4 h-4" /> Server
        </button>
        <button 
          onClick={() => {
            setConnectMode(!connectMode);
            setFirstConnectId(null);
          }}
          className={`px-3 py-1 rounded ${connectMode ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
        >
          {connectMode ? 'Connecting...' : 'Connect Mode'}
        </button>
        <button
          onClick={() => {
            setElements([]);
            setLines([]);
            setSelectedTool(null);
            setConnectMode(false);
            setFirstConnectId(null);
          }}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Clear All
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-100 p-2 text-sm text-blue-800 border-b">
        {selectedTool ? (
          `Click on the canvas to place a ${selectedTool} element`
        ) : connectMode ? (
          firstConnectId ? 
            'Click on another element to create a connection' :
            'Click on an element to start connecting'
        ) : (
          'Select a tool to start drawing, or enable Connect Mode to link elements'
        )}
      </div>

      {/* Canvas */}
      <div
        onClick={handleBoardClick}
        className="flex-1 relative bg-white border border-blue-200 overflow-hidden cursor-crosshair"
      >
        {/* SVG for lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {lines.map((line, idx) => {
            const from = elements.find(el => el.id === line.from);
            const to = elements.find(el => el.id === line.to);
            if (!from || !to) return null;
            return (
              <line
                key={idx}
                x1={from.x + 30}
                y1={from.y + 30}
                x2={to.x + 30}
                y2={to.y + 30}
                stroke="#374151"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
              fill="#374151"
            >
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
        </svg>

        {elements.map(el => (
          <DraggableIcon
            key={el.id}
            id={el.id}
            type={el.type}
            x={el.x}
            y={el.y}
            label={el.label}
            onDrag={handleDrag}
            onDelete={removeElement}
            onConnect={handleConnectClick}
            connectMode={connectMode}
            isFirstConnect={firstConnectId === el.id}
          />
        ))}
      </div>
    </div>
  );
}

function DraggableIcon({
  id,
  type,
  x,
  y,
  label,
  onDrag,
  onDelete,
  onConnect,
  connectMode,
  isFirstConnect
}: {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  label: string;
  onDrag: (id: string, dx: number, dy: number) => void;
  onDelete: (id: string) => void;
  onConnect: (id: string) => void;
  connectMode: boolean;
  isFirstConnect: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (connectMode) {
      onConnect(id);
    } else {
      setDragging(true);
      setOrigin({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    onDrag(id, dx, dy);
    setOrigin({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, origin]);

  const iconProps = { className: 'w-6 h-6 text-blue-800' };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`absolute select-none p-2 rounded shadow flex flex-col items-center z-10 w-16 ${
        connectMode 
          ? isFirstConnect 
            ? 'bg-yellow-200 border-2 border-yellow-400 cursor-pointer' 
            : 'bg-green-100 border-2 border-green-400 cursor-pointer hover:bg-green-200'
          : 'bg-blue-100 cursor-move hover:bg-blue-200'
      }`}
      style={{ left: x, top: y }}
    >
      {type === 'user' && <User {...iconProps} />}
      {type === 'database' && <Database {...iconProps} />}
      {type === 'server' && <Server {...iconProps} />}
      <span className="text-xs mt-1 text-center font-medium">{label}</span>
      {!connectMode && (
        <XCircle
          className="w-4 h-4 text-red-500 cursor-pointer mt-1 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        />
      )}
    </div>
  );
}