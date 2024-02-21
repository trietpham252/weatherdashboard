import './App.css';
import { getFCMToken } from './utils/getFCMToken';
import Router from './router';


function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  getFCMToken().then((token) => {
    console.log(token);
  });

  return (
    <Router />
  );
}

export default App;
