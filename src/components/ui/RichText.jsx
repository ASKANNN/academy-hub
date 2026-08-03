const TOKEN_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function RichText({ text }) {
  const parts = text.split(TOKEN_RE);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}
