export function ComplexityPips({ popularity }) {
  return (
    <span className="complexity-pips" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`complexity-pip ${n <= popularity ? 'is-filled' : ''}`} />
      ))}
    </span>
  );
}
