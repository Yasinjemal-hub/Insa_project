import { useState } from 'react'
import Auth from './componets/Auth';
import Welcome from './componets/welcome';

function App() {
 const [user, setUser] = useState(null); 

  const handleLogin = (email) => {
    setUser(email); // Save the user's email to "log them in"
  };

  const handleLogout = () => {
    setUser(null); // Clear the user to "log them out"
  };
  return (
    <main>
    <h1> Registration Form</h1>
    {user ? (
        <Welcome user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </main>
  )
}

export default App
