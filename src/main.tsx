import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import App from './App.tsx';
import './index.css';

// Scroll-triggered sections must remain readable until their trigger is ready.
// Without this, a slow image load, a restored scroll position, or a skipped
// animation frame can leave a complete section (such as the three pillars)
// at GSAP's initial opacity of zero.
gsap.defaults({ immediateRender: false });

createRoot(document.getElementById('root')!).render(<App />);
