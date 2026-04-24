import './Layout.css'

function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Macro Calculator</h1>
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Luis Ruano. All rights reserved.</p>
        <p>Results are estimates and should not replace professional nutrition advice.</p>
      </footer>
    </div>
  )
}

export default Layout
