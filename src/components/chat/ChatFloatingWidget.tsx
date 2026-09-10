import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Paperclip,
  Building2,
  Check,
  CheckCheck,
  Bot,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const ChatFloatingWidget: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatSessions,
    activeSessionId,
    sendCustomerMessage,
    showToast,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [firstTouchName, setFirstTouchName] = useState('');
  const [firstTouchEmail, setFirstTouchEmail] = useState('');
  const [firstTouchCompany, setFirstTouchCompany] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = chatSessions.find((s) => s.id === activeSessionId) || chatSessions[0];

  const totalUnreadCustomer = currentSession?.unreadCustomerCount || 0;

  // Auto-scroll on new message
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages, isChatOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendCustomerMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstTouchName || !firstTouchEmail) {
      showToast('Please provide your name and work email', 'warning');
      return;
    }

    sendCustomerMessage(
      `Hello, I am ${firstTouchName} from ${firstTouchCompany || 'Independent Client'}. I would like to inquire about your engineering consulting services.`,
      {
        name: firstTouchName,
        email: firstTouchEmail,
        company: firstTouchCompany || 'Direct Client',
        country: 'UAE',
      }
    );
  };

  const handleAttachmentClick = () => {
    showToast('Simulated attachment: Specification_Sheet_2026.pdf added', 'info');
    setInputMessage((prev) => (prev ? `${prev} [Attachment: Specification_Sheet_2026.pdf]` : '[Attachment: Specification_Sheet_2026.pdf]'));
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden font-sans">
      {/* Floating Action Button (FAB) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#F5A623]"
          aria-label="Open TC Live Chat Desk"
        >
          <MessageSquare className="w-6 h-6" />

          {/* Unread Badge Counter */}
          {totalUnreadCustomer > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
              {totalUnreadCustomer}
            </span>
          )}

          {/* Tooltip on hover */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-slate-700">
            Chat with Engineering Desk
          </span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isChatOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#E3E6EB] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Window Header */}
          <div className="bg-[#0B1F3A] text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] font-extrabold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1F3A]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span>TC Engineering Desk</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#F5A623] text-[#0B1F3A] rounded font-extrabold">
                    GST LIVE
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">Sharjah HQ · RICS Consultants</div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3 text-xs">
            {/* If no customer name or session exists, show First-Touch onboarding form */}
            {!currentSession ? (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs my-auto">
                <div className="text-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 text-[#0B1F3A] flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] uppercase">
                    Connect With Our Engineers
                  </h4>
                  <p className="text-[11px] text-[#5A6678] mt-1">
                    Please provide your contact details to start an advisory session.
                  </p>
                </div>

                <form onSubmit={handleStartSession} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={firstTouchName}
                    onChange={(e) => setFirstTouchName(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E3E6EB] text-xs focus:outline-none focus:border-[#F5A623]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email Address *"
                    value={firstTouchEmail}
                    onChange={(e) => setFirstTouchEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E3E6EB] text-xs focus:outline-none focus:border-[#F5A623]"
                  />
                  <input
                    type="text"
                    placeholder="Company / Developer Name"
                    value={firstTouchCompany}
                    onChange={(e) => setFirstTouchCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E3E6EB] text-xs focus:outline-none focus:border-[#F5A623]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-2.5 rounded shadow tracking-wider"
                  >
                    START LIVE CHAT
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Session Active Chips Bar */}
                <div className="text-center my-2">
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full font-mono">
                    Session ID: {currentSession.id}
                  </span>
                </div>

                {/* Messages Stream */}
                {currentSession.messages.map((msg) => {
                  const isCustomer = msg.sender === 'customer';
                  const isBot = msg.sender === 'system';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5 px-1">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isCustomer
                            ? 'bg-[#0B1F3A] text-white rounded-tr-none'
                            : isBot
                            ? 'bg-amber-50 text-amber-950 border border-amber-200/80 rounded-tl-none font-medium'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.message}

                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-200/40 text-[11px] font-mono flex items-center gap-1.5 text-amber-600">
                            <Paperclip className="w-3 h-3" />
                            <span>{msg.attachments.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {isCustomer && (
                        <div className="text-[9px] text-slate-400 mt-0.5 pr-1 flex items-center gap-0.5">
                          <span>Sent</span>
                          <CheckCheck className="w-3 h-3 text-emerald-500" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1 text-slate-400 text-[11px] italic p-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1">Consultant reviewing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Chat Footer / Input Form */}
          {currentSession && (
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-[#E3E6EB] flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={handleAttachmentClick}
                className="p-2 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition"
                title="Attach specification or file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Type your engineering inquiry..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#F5A623] focus:bg-white transition"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] disabled:opacity-40 rounded-lg transition"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
