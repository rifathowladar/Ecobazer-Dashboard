import React, { useState, useMemo } from 'react';
import {
  Search,
  Send,
  Trash2,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock messages data
const mockMessages = [
  {
    id: '1',
    senderName: 'Karim Ahmed',
    senderEmail: 'karim@example.com',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop',
    preview: 'When will fresh dates be available?',
    isRead: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    conversation: [
      { sender: 'user', text: 'When will fresh dates be available?', time: '10:30 AM' },
      { sender: 'admin', text: 'Hello Karim! Fresh dates will be available from next Monday!', time: '10:32 AM' }
    ]
  },
  {
    id: '2',
    senderName: 'Fatima Begum',
    senderEmail: 'fatima@example.com',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop',
    preview: 'Can you help me track my order #1230?',
    isRead: false,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    conversation: [
      { sender: 'user', text: 'Can you help me track my order #1230?', time: '9:45 AM' },
      { sender: 'admin', text: 'Hi Fatima! Your order is on the way and will be delivered today by 5 PM!', time: '9:50 AM' }
    ]
  },
  {
    id: '3',
    senderName: 'Salam Mia',
    senderEmail: 'salam@example.com',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop',
    preview: 'The spices I ordered are great! Thank you!',
    isRead: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    conversation: [
      { sender: 'user', text: 'The spices I ordered are great! Thank you!', time: 'Yesterday 3:15 PM' },
      { sender: 'admin', text: 'Thank you for your kind words, Salam! We are glad you liked it!', time: 'Yesterday 3:20 PM' }
    ]
  }
];

export const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(mockMessages[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  // --- FILTER THREADS ---
  const filteredThreads = useMemo(() => {
    return messages.filter(
      (m) =>
        m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  // Active Thread
  const activeThread = useMemo(() => {
    return messages.find((m) => m.id === selectedThreadId) || messages[0] || null;
  }, [messages, selectedThreadId]);

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    // Mark as read
    setMessages((prev) =>
      prev.map((m) => m.id === threadId ? { ...m, isRead: true } : m)
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const newMessage = {
      sender: 'admin' as const,
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeThread.id
          ? {
              ...m,
              preview: replyText,
              conversation: [...m.conversation, newMessage]
            }
          : m
      )
    );

    setReplyText('');
  };

  const handleDeleteThread = (id: string) => {
    if (window.confirm("Delete conversation thread permanently?")) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedThreadId === id) {
        setSelectedThreadId('');
      }
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] min-h-[450px] flex rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden font-sans shadow-sm">
      
      {/* LEFT COLUMN: Message threads list */}
      <div className="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 select-none">
        
        {/* Header Search Box */}
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Inbox Desk</span>
          <div className="relative">
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Thread Roster */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-900">
          {filteredThreads.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-400">No message threads found.</div>
          ) : (
            filteredThreads.map((m) => {
              const isActive = activeThread?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectThread(m.id)}
                  className={`w-full p-4 text-left flex gap-3 transition-colors text-xs font-medium cursor-pointer relative ${
                    isActive
                      ? 'bg-green-50/50 dark:bg-green-950/20'
                      : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40'
                  }`}
                >
                  {/* Active vertical line accent */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-full" />
                  )}

                  <img src={m.senderAvatar} alt={m.senderName} className="w-9 h-9 rounded-full object-cover shrink-0 border border-zinc-100 dark:border-zinc-900" referrerPolicy="no-referrer" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{m.senderName}</span>
                      <span className="text-[9px] text-zinc-400 shrink-0">
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <p className={`truncate leading-normal ${
                      !m.isRead ? 'text-zinc-900 dark:text-zinc-50 font-bold' : 'text-zinc-500'
                    }`}>
                      {m.preview}
                    </p>
                  </div>

                  {/* Red/Green unread dot indicator */}
                  {!m.isRead && (
                    <div className="w-2 h-2 rounded-full bg-green-500 self-center shrink-0 ml-1" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Conversation Exchanges */}
      <div className="flex-1 hidden md:flex flex-col bg-zinc-50/20 dark:bg-zinc-950/20">
        {activeThread ? (
          <>
            {/* Conversation Active Header */}
            <div className="px-6 h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-950 shrink-0">
              <div className="flex items-center gap-3">
                <img src={activeThread.senderAvatar} alt={activeThread.senderName} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 block leading-tight">{activeThread.senderName}</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">{activeThread.senderEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteThread(activeThread.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                  title="Remove conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Thread Streams container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Context bar inside thread */}
              <div className="p-3 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl flex items-center gap-2 text-xs text-zinc-500 leading-none">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Conversations are archived and GDPR/CCPA compliant.</span>
              </div>

              {activeThread.conversation.map((c, idx) => {
                const isAdmin = c.sender === 'admin';
                return (
                  <div key={idx} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2.5 max-w-[70%] ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar preview */}
                      {!isAdmin ? (
                        <img src={activeThread.senderAvatar} alt="user" className="w-7 h-7 rounded-full object-cover mt-1 shrink-0" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-1">E</div>
                      )}

                      <div className="space-y-1">
                        {/* Bubble */}
                        <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                          isAdmin
                            ? 'bg-green-600 text-white rounded-tr-none shadow-sm shadow-green-900/10'
                            : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-tl-none'
                        }`}>
                          {c.text}
                        </div>
                        {/* Timestamp label */}
                        <span className={`text-[9px] text-zinc-400 block ${isAdmin ? 'text-right' : 'text-left'}`}>
                          {c.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Reply dock inputs */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
              <form onSubmit={handleSendReply} className="flex gap-2.5 items-center">
                <input
                  type="text"
                  placeholder={`Write quick message response to ${activeThread.senderName.split(' ')[0]}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 h-10 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-800 dark:text-zinc-200"
                />
                <Button type="submit" variant="default" size="sm">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          /* Empty Chat Desk */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-3 select-none">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-3xl text-zinc-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Empty Inbox Desk</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Please select a thread from the left rail to display messages.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
