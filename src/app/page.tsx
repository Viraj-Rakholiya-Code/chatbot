'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'; // For code highlighting

function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api:'/api/chat'
  });

  return (
    <div className="bg-white flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-5">
        {messages.map(m => (
          <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <ReactMarkdown>{m.content}</ReactMarkdown>

            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-5 bg-gray-100">
        <div className="flex gap-3">
          <Input
            className="flex-1"
            placeholder="Enter Something"
            value={input}
            onChange={handleInputChange}
          />
          <Button variant="outline" disabled={isLoading} type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
