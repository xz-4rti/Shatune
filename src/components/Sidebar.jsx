import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <nav>
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <i className="fas fa-home"></i>
          <span>home</span>
        </Link>
        <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
          <i className="fas fa-user"></i>
          <span>@usuario logado</span>
        </Link>
      </nav>
      <button className="publish-btn">Publicar</button>
    </aside>
  )
}

export default Sidebar

