export default function Welcome({ user, onLogout }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome back, {user}! 👋</h1>
      <p>You have successfully logged into the app.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}