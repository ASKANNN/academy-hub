import { useState, useEffect, useRef } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const LANGUAGE_LABELS = { javascript: 'JavaScript', python: 'Python' };
const PRISM_LANGUAGE = { javascript: 'javascript', python: 'python' };

export function CodeBlock({ code, defaultLanguage, activeLanguage, onLanguageChange, activeLines, theme = 'dark' }) {
  const languages = Object.keys(code);
  const [internalLang, setInternalLang] = useState(defaultLanguage ?? languages[0]);
  const isControlled = activeLanguage !== undefined;
  const active = isControlled ? activeLanguage : internalLang;
  const preRef = useRef(null);

  function handleLangChange(lang) {
    if (isControlled) {
      onLanguageChange?.(lang);
    } else {
      setInternalLang(lang);
    }
  }

  useEffect(() => {
    if (!activeLines || !preRef.current) return;
    const activeLine = preRef.current.querySelector('.is-active-line');
    if (!activeLine) return;
    const pre = preRef.current;
    const preRect = pre.getBoundingClientRect();
    const lineRect = activeLine.getBoundingClientRect();
    const lineTop = lineRect.top - preRect.top + pre.scrollTop;
    const target = lineTop - pre.clientHeight / 2 + lineRect.height / 2;
    pre.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }, [activeLines]);

  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(code[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                onClick={() => handleLangChange(lang)}
              >
                {LANGUAGE_LABELS[lang] ?? lang}
              </button>
            ))}
          </div>
        )}
        <button type="button" className={`code-block__copy${copied ? ' is-copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓' : 'copy'}
        </button>
      </div>
      <Highlight
        code={code[active].trim()}
        language={PRISM_LANGUAGE[active] ?? 'javascript'}
        theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre ref={preRef} className={`code-block__pre ${className}`} style={style}>
            {tokens.map((line, i) => {
              const lineNo = i + 1;
              const isActive = Array.isArray(activeLines) && lineNo >= activeLines[0] && lineNo <= activeLines[1];
              const lineProps = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...lineProps}
                  data-line={lineNo}
                  className={`code-block__line${isActive ? ' is-active-line' : ''}${lineProps.className ? ' ' + lineProps.className : ''}`}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
