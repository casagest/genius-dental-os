import { createRoot } from 'react-dom/client'
import './index.css'

function SimpleApp() {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '50px', 
      fontSize: '30px',
      minHeight: '100vh'
    }}>
      <h1>REACT FUNCȚIONEAZĂ!</h1>
      <p>Dacă vezi acest text roșu, React se încarcă.</p>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<SimpleApp />);
