const React = require('react')
import './App.css';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';
// import UserProfile from './components/UserProfile'; // Uncomment if UserProfile component is used

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>React Chat Application</h1>
        </header>
        <main className="App-content">
          <Sidebar />
          <ChatRoom />
          {/* <UserProfile /> // Uncomment if you have a UserProfile component */}
        </main>
      </div>
  );
}

export default App;
