import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { Background, Controls, Node, MiniMap, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, X, Code, Copy, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

import N8nNode from './components/N8nNode';
import { parseN8nWorkflow } from './utils/n8nParser';
import { nodeDefinitions } from './utils/nodeDefinitions';
import workflowData from './assets/workflow.json';

const { nodes: initialNodes, edges: initialEdges } = parseN8nWorkflow(workflowData);

function FlowCanvas() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [copied, setCopied] = useState(false);
  const { fitView } = useReactFlow();

  // Register custom nodes
  const nodeTypes = useMemo(() => ({ n8n: N8nNode }), []);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const closePanel = () => setSelectedNode(null);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPromptContent = (node: Node) => {
    if (!node.data?.parameters) return null;
    if (node.data.parameters.options?.systemMessage) {
      return node.data.parameters.options.systemMessage.replace(/^=/, '');
    }
    if (node.data.parameters.text) {
       return node.data.parameters.text.replace(/^=/, '');
    }
    return null;
  };

  // Ensure the entire workflow fits on the screen initially
  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.1, duration: 0, minZoom: 0.05 });
    }, 50);
  }, [fitView]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white font-sans selection:bg-[var(--color-primary)]/30">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center border border-[var(--color-primary)]/50">
              <Terminal size={18} className="text-[var(--color-primary)]" />
            </div>
            <span className="font-bold text-lg tracking-wide">Assistant Engine</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#workflow" className="hover:text-white transition-colors">Architecture</a>
            <a href="https://github.com/Marouan-el-yassini/CarRent_Assistant_SystemAutomation" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">GitHub Repo</a>
            <a href="https://github.com/Marouan-el-yassini/CarRent_Assistant_SystemAutomation/tree/main/docs" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg transition-all">
              Documentation
            </a>
          </div>
        </div>
      </nav>

      <main className="flex flex-col pb-32">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
          <div className="hero-glow"></div>
          <div className="max-w-7xl mx-auto w-full text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm mb-8 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              System Architecture Online
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 glow-text">
              The Engine<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Behind the Agent
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore the actual internal logic, AI prompts, and integration paths used by the Assistant Engine directly from the production graph.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#workflow" className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                Explore the Codebase
              </a>
              <a href="https://github.com/Marouan-el-yassini/CarRent_Assistant_SystemAutomation/tree/main/workflows" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2">
                <Code size={20} /> Install Workflows
              </a>
            </div>
            <div className="mt-8">
              <a href="https://github.com/Marouan-el-yassini/CarRent_Assistant_SystemAutomation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                ⭐ Give me a star for more projects!
              </a>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="w-full border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <a href="https://github.com/Marouan-el-yassini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
               <GithubIcon size={20} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/marouan-el-yassini-b88a43333/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#0a66c2] transition-colors">
               <LinkedinIcon size={20} /> LinkedIn
            </a>
          </div>
        </section>

        {/* Interactive Workflow Canvas */}
        <section id="workflow" className="w-full h-[75vh] md:h-screen relative flex flex-col pt-16">
          <div className="flex flex-col gap-2 max-w-7xl mx-auto px-6 w-full mb-6">
            <h2 className="text-3xl font-bold">Live Flow Map</h2>
            <p className="text-gray-400">Interactive architecture of the Assistant Engine. Click any node to view its configuration.</p>
          </div>

          <div className="flex-1 w-full glass-panel border-y border-white/10 relative shadow-2xl overflow-hidden">
            <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.05 }}
        className="bg-[var(--color-background)]"
        minZoom={0.05}
        proOptions={{ hideAttribution: true }}
        zoomOnPinch={true}
        panOnDrag={true}
        preventScrolling={true}
      >
        <Background color="rgba(16, 185, 129, 0.1)" gap={20} size={1} />
        <Controls className="bg-[var(--color-surface)] fill-white border-white/10 shadow-lg" />
        <MiniMap 
          nodeStrokeColor={(n) => n.type === 'input' ? '#10b981' : '#222'}
          nodeColor={() => 'rgba(16, 185, 129, 0.4)'}
          className="bg-[#05070A] border border-white/5 rounded-xl overflow-hidden shadow-2xl"
          maskColor="rgba(11, 14, 20, 0.8)"
        />
      </ReactFlow>

      {/* Slide-over Panel for Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl glass-panel border-l border-white/10 z-50 flex flex-col shadow-2xl bg-[#0B0E14]/95"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    {selectedNode.data.label}
                  </h2>
                  <span className="text-sm text-[var(--color-primary)] font-mono">{selectedNode.data.type}</span>
                </div>
                <button onClick={closePanel} className="p-2 hover:bg-white/10 rounded-md transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Node Definition & Goal Section */}
                <div className="bg-[#05070a] border border-white/10 rounded-xl p-5 shadow-inner space-y-4">
                  <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Definition</h3>
                    <p className="text-white text-sm">
                      {nodeDefinitions[selectedNode.data.label]?.definition || "System execution node."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Goal</h3>
                    <p className="text-[var(--color-primary)] text-sm">
                      {nodeDefinitions[selectedNode.data.label]?.goal || "Processes data within the ELY Engine architecture."}
                    </p>
                  </div>
                  
                  {nodeDefinitions[selectedNode.data.label]?.promptSummary && (
                    <div className="pt-2 border-t border-white/5">
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Behavioral Rules Summary</h3>
                      <p className="text-gray-300 text-sm italic">
                        "{nodeDefinitions[selectedNode.data.label]?.promptSummary}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Raw Prompt Section (if applicable) */}
                {getPromptContent(selectedNode) && (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                       <h3 className="font-bold text-lg text-white flex items-center gap-2">
                         <Code size={18} className="text-[var(--color-primary)]"/> Raw System Prompt
                       </h3>
                       <button onClick={() => copyText(getPromptContent(selectedNode) || '')} className="p-2 bg-[#1a2130] hover:bg-white/10 rounded-md border border-white/10 text-xs flex items-center gap-1 transition-all">
                          {copied ? <CheckCircle2 size={14} className="text-[var(--color-primary)]" /> : <Copy size={14} />}
                          {copied ? 'Copied!' : 'Copy Prompt'}
                       </button>
                    </div>
                    
                    <div className="relative group">
                      <pre className="bg-[#05070a] border border-white/10 p-5 rounded-lg text-sm text-gray-300 overflow-x-auto h-[400px] font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                        {getPromptContent(selectedNode)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
