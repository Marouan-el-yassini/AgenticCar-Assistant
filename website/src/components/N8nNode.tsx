import React from 'react';
import { Handle, Position } from 'reactflow';
import { Bot, Database, MessageSquare, Code, Phone, Zap, Network, FileAudio, SwitchCamera } from 'lucide-react';

interface N8nNodeProps {
  data: {
    label: string;
    type: string;
    parameters: any;
  };
}

export default function N8nNode({ data }: N8nNodeProps) {
  const { label, type } = data;

  let Icon = Zap;
  let colorClass = 'text-gray-400 border-gray-600/50 bg-gray-900/80';

  const isSubNode = type.toLowerCase().includes('tool') || 
                    type.toLowerCase().includes('memory') || 
                    type.toLowerCase().includes('model') || 
                    type.toLowerCase().includes('lmchat');

  if (type.includes('whatsApp')) {
    Icon = Phone;
    colorClass = 'text-green-400 border-green-500/50 bg-green-950/40';
  } else if (type.includes('agent')) {
    Icon = Bot;
    colorClass = 'text-[var(--color-primary)] border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
  } else if (type.includes('googleSheets')) {
    Icon = Database;
    colorClass = 'text-blue-400 border-blue-500/50 bg-blue-950/40';
  } else if (type.includes('twilio')) {
    Icon = MessageSquare;
    colorClass = 'text-red-400 border-red-500/50 bg-red-950/40';
  } else if (type.includes('lmChatOpenAi')) {
    Icon = Network;
    colorClass = 'text-purple-400 border-purple-500/50 bg-purple-950/40';
  } else if (type.includes('switch') || type.includes('if')) {
    Icon = SwitchCamera;
    colorClass = 'text-yellow-400 border-yellow-500/50 bg-yellow-950/40';
  } else if (type.includes('openAi') && type.includes('audio')) {
    Icon = FileAudio;
    colorClass = 'text-pink-400 border-pink-500/50 bg-pink-950/40';
  } else if (type.includes('set')) {
    Icon = Code;
    colorClass = 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40';
  }

  return (
    <div className={`relative transition-all hover:scale-105 cursor-pointer flex items-center justify-center rounded-xl border backdrop-blur-md ${colorClass} ${
      isSubNode ? 'w-[100px] flex-col p-2 gap-1' : 'w-[180px] flex-row gap-3 px-3 py-2'
    }`}>
      <Handle type="target" position={Position.Left} className={`!bg-gray-400 !border-gray-800 ${isSubNode ? '-ml-2' : ''}`} />
      
      <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex-shrink-0 flex items-center justify-center">
        <Icon size={isSubNode ? 24 : 18} />
      </div>
      
      <div className={`flex flex-col overflow-hidden text-center ${isSubNode ? 'w-full' : 'w-full text-left'}`}>
        <span className={`font-bold text-white truncate w-full ${isSubNode ? 'text-[10px]' : 'text-xs'}`} title={label}>{label}</span>
        {!isSubNode && (
          <span className="text-[10px] text-gray-400 font-mono truncate w-full">{type.split('.').pop()}</span>
        )}
      </div>
      
      <Handle type="source" position={Position.Right} className={`!bg-[var(--color-primary)] !border-gray-800 ${isSubNode ? '-mr-2' : ''}`} />
    </div>
  );
}
