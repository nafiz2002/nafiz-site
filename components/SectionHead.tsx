import Reveal from './Reveal';

export default function SectionHead({
  eyebrow,
  title,
  lede,
  size = 'large',
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  size?: 'large' | 'mid';
}) {
  return (
    <Reveal className="sec-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={size === 'large' ? 'q-large' : 'q-mid'}>{title}</h2>
      {lede && (
        <p className="lede" style={{ marginTop: 20 }}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
