'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if(!prompt) return;
    setLoading(true);
    setImage('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F0FFF4] font-sans">
      <header className="p-4 flex items-center gap-3 border-b border-green-200">
        <img src="/logo.png" className="w-10 h-10 rounded-full" />
        <h1 className="text-2xl font-bold text-green-800">Mulatah</h1>
      </header>
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-900">Turn Words Into Art</h2>
        <input value={prompt} onChange={e => setPrompt(e.target.value)}
          placeholder="A beautiful girl holding a parrot, digital art"
          className="w-full p-4 rounded-lg border-2 border-green-300 focus:outline-none" />
        <button onClick={generate} disabled={loading}
          className="mt-4 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50">
          {loading? 'Generating...' : 'Generate'}
        </button>
        {image && <img src={image} className="mt-6 rounded-xl shadow-lg w-full" />}
      </div>
      <footer className="text-center p-6 text-sm text-green-700">
        Contact: engineerfelix0202@gmail.com
      </footer>
    </main>
  )
}
