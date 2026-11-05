import { Fragment, memo, type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { tokenizeRich, type RichToken } from '../lib/richText';

const cache = new Map<string, string>();

function tex(source: string, display: boolean): string {
  const key = `${display ? 'D' : 'I'}${source}`;
  let html = cache.get(key);
  if (html === undefined) {
    html = katex.renderToString(source, { displayMode: display, throwOnError: false, output: 'htmlAndMathml', strict: 'ignore' });
    cache.set(key, html);
  }
  return html;
}

function renderToken(t: RichToken, i: number): ReactNode {
  switch (t.kind) {
    case 'math':
      return <span key={i} className="rich-math" dangerouslySetInnerHTML={{ __html: tex(t.value, false) }} />;
    case 'display':
      return <span key={i} className="rich-display" dangerouslySetInnerHTML={{ __html: tex(t.value, true) }} />;
    case 'code':
      return <code key={i} className="rich-code">{t.value}</code>;
    case 'bold':
      return <strong key={i}>{t.value}</strong>;
    default:
      return <Fragment key={i}>{t.value}</Fragment>;
  }
}

/**
 * Renders content text with light markup: $…$ inline math and $$…$$ display
 * math (typeset with KaTeX), `code`, and **bold**. Plain text passes through
 * unchanged, so existing content keeps working.
 */
export const Rich = memo(function Rich({ text }: { text: string }) {
  const tokens = tokenizeRich(text);
  if (tokens.length === 1 && tokens[0].kind === 'text') return <>{text}</>;
  return <>{tokens.map(renderToken)}</>;
});
