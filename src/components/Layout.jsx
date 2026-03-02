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
    </div>
  )
}

export default Layout