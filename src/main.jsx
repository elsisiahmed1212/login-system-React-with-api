import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite';
import ContextProfider from './Componats/context/Context.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
createRoot(document.getElementById('root')).render(
    <ContextProfider>
        <App />
    </ContextProfider>
)
