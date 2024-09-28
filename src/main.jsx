import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataProvider from './Context/DataProvider.jsx'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      }, (error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  }

  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
  deferredPrompt = e; // Stash the event so it can be triggered later
});
  
  

ReactDOM.createRoot(document.getElementById('root')).render(
    <DataProvider>
        <App />
    </DataProvider>
)
