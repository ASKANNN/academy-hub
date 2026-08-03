import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const LANGUAGE_LABELS = { javascript: 'JavaScript', python: 'Python' };
const PRISM_LANGUAGE = { javascript: 'javascript', python: 'python' };

export function CodeBlock({ code, defaultLanguage, theme = 'dark' }) {
  const languages = Object.keys(code);
  const [active, setActive] = useState(defaultLanguage ?? languages[0]);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__dots" aria-hidden="true">
          <span /><span /><span />
        </span>
        {languages.length > 1 && (
          <div className="code-block__lang-tabs" role="tablist">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                role="tab"
                aria-selected={lang === active}
                className={`code-block__lang-tab ${lang === active ? 'is-active' : ''}`}
                onClick={() => setActive(lang)}
              >
                {LANGUAGE_LABELS[lang] ?? lang}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="code-block__copy" onClick={handleCopy}>
          {copied ? '✓' : 'copy'}
        </button>
      </div>
      <Highlight
        code={code[active].trim()}
        language={PRISM_LANGUAGE[active] ?? 'javascript'}
        theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-block__pre ${className}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
