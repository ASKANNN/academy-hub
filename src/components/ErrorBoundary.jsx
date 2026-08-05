import { Component } from 'react';
import { usePageContext } from './Layout.jsx';
import { getStrings } from '../i18n/strings.js';

class ErrorBoundaryInner extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, t } = this.props;
    if (!hasError) return children;
    return (
      <div className="error-boundary container">
        <h2 className="error-boundary__title">{t.title}</h2>
        <p className="error-boundary__message">{t.message}</p>
        <button className="error-boundary__btn" onClick={() => window.location.reload()}>
          {t.reload}
        </button>
      </div>
    );
  }
}

export function ErrorBoundary({ children }) {
  const { lang } = usePageContext();
  const t = getStrings(lang).error;
  return <ErrorBoundaryInner t={t}>{children}</ErrorBoundaryInner>;
}
