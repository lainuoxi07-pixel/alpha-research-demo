import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { equities } from '../lib/desk';
import { cn } from '../lib/utils';

export function AIPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help with your financial research today?' }
  ]);
  const [input, setInput] = useState('');

  function send(){
    const prompt=input.trim(); if(!prompt)return;
    const words=prompt.toLowerCase().split(/[^a-z0-9]+/);
    const symbol=equities.find(e=>words.includes(e.ticker.toLowerCase())||words.includes(e.name.toLowerCase()));
    const response=symbol ? (/risk|bear|downside/i.test(prompt)?symbol.risk:/revenue|financial/i.test(prompt)?'Sample quarterly revenue (USD billions): '+symbol.revenue.join(', '):symbol.bull+' '+symbol.cue) : 'Choose AAPL, MSFT, NVDA, GOOGL or TSLA and ask about its thesis, risk or revenue.';
    setMessages(prev=>[...prev,{role:'user',content:prompt},{role:'assistant',content:'Demo brief · '+response}]);setInput('');
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Bot className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      <div className="flex items-center justify-between p-4 border-b bg-secondary/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-sm">AI Research Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "max-w-[85%] rounded-lg p-3 text-sm",
            msg.role === 'assistant' ? "bg-secondary text-secondary-foreground self-start rounded-tl-none" : "bg-primary text-primary-foreground self-end rounded-tr-none"
          )}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-card">
        <div className="flex gap-2 items-center bg-input rounded-full p-1 pr-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about companies, markets..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm"
            onKeyDown={(e) => { if(e.key==='Enter' && !e.nativeEvent.isComposing) send() }}
          />
          <button 
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0"
            onClick={send}
          >
            <Send className="w-4 h-4 ml-[-2px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
