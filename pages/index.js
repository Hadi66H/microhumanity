import { useState } from 'react';

export default function Home() {
  const [choice, setChoice] = useState(null);
  return (
    <main style={{maxWidth: 800, margin: '3rem auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
      <h1>MicroHumanity 🌍</h1>
      <p style={{color:'#444'}}>A simple MVP placeholder. Replace this with the full UI later.</p>

      <section style={{marginTop: '2rem', padding:'1rem', border:'1px solid #eee', borderRadius: 8}}>
        <h2>Question of the Day</h2>
        <p>Did you sleep well last night?</p>
        <div style={{display:'flex', gap:10}}>
          <button onClick={()=>setChoice('Yes')} style={{padding:'8px 14px'}}>Yes</button>
          <button onClick={()=>setChoice('No')} style={{padding:'8px 14px'}}>No</button>
        </div>
        {choice && <p style={{marginTop:10}}>Your choice: <b>{choice}</b> (client-side only for now)</p>}
      </section>

      <section style={{marginTop:'2rem'}}>
        <h3>Live Summary (placeholder)</h3>
        <p>This section will show global summaries once backend is added.</p>
      </section>
    </main>
  );
}
