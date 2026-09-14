import { Fragment, type ReactNode } from 'react';

// Renders a Commentary post body. Plain text works as-is: blank lines
// separate paragraphs. A small Markdown subset is also understood:
//
//   ## Heading      ### Smaller heading
//   > quote         - list item        1. numbered item
//   ---             (rule)
//   **bold**  *italic*  [text](https://url)  https://bare-url
//
// Everything is built as React nodes, never injected as HTML.

function inline(text: string, key = 0): ReactNode {
  // Order matters: links first so their URLs are not split by the
  // emphasis patterns.
  const re =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?)])|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      out.push(
        <a key={`${key}-${i++}`} href={m[2]} target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>
      );
    } else if (m[3]) {
      out.push(
        <a key={`${key}-${i++}`} href={m[3]} target="_blank" rel="noopener noreferrer">
          {m[3]}
        </a>
      );
    } else if (m[4]) {
      out.push(<strong key={`${key}-${i++}`}>{m[4]}</strong>);
    } else if (m[5]) {
      out.push(<em key={`${key}-${i++}`}>{m[5]}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Single newlines inside a paragraph become <br>.
function lines(text: string, key: number): ReactNode {
  const parts = text.split('\n');
  return parts.map((l, i) => (
    <Fragment key={`${key}-l${i}`}>
      {inline(l, key * 1000 + i)}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}

export default function PostBody({ body }: { body: string }) {
  const blocks = body.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);

  return (
    <div className="post-body">
      {blocks.map((raw, k) => {
        const block = raw.trim();
        if (!block) return null;

        if (/^-{3,}$/.test(block)) return <hr key={k} />;

        const h = block.match(/^(#{1,3})\s+([\s\S]+)$/);
        if (h) {
          const text = inline(h[2].replace(/\n/g, ' '), k);
          return h[1].length === 1 || h[1].length === 2 ? (
            <h2 key={k}>{text}</h2>
          ) : (
            <h3 key={k}>{text}</h3>
          );
        }

        if (block.split('\n').every((l) => l.startsWith('>'))) {
          const inner = block
            .split('\n')
            .map((l) => l.replace(/^>\s?/, ''))
            .join('\n');
          return <blockquote key={k}>{lines(inner, k)}</blockquote>;
        }

        const items = block.split('\n');
        if (items.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul key={k}>
              {items.map((l, i) => (
                <li key={i}>{inline(l.replace(/^[-*]\s+/, ''), k * 1000 + i)}</li>
              ))}
            </ul>
          );
        }
        if (items.every((l) => /^\d+[.)]\s+/.test(l))) {
          return (
            <ol key={k}>
              {items.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\d+[.)]\s+/, ''), k * 1000 + i)}</li>
              ))}
            </ol>
          );
        }

        return <p key={k}>{lines(block, k)}</p>;
      })}
    </div>
  );
}
