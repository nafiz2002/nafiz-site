export default function Stepper({
  items,
}: {
  items: { label: string; body: string; kind?: string }[];
}) {
  return (
    <div className="stepper" role="list">
      {items.map((item, i) => (
        <div key={item.label} role="listitem" className="step on">
          <div className="step-n">
            {item.kind ?? String(i + 1).padStart(2, "0")}
          </div>

          <div className="step-label">
            {item.label}
          </div>

          <div className="step-body">
            {item.body}
          </div>
        </div>
      ))}
    </div>
  );
}
