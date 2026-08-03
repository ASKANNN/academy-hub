import { Link } from 'react-router-dom';

export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
            {i < items.length - 1 && <span className="breadcrumb__sep" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
