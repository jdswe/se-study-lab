// Bundled by build-docs.mjs: renders the website's lesson diagrams to static SVG.
import { renderToStaticMarkup } from 'react-dom/server';
import { DiagramView, type DiagramKey } from '../src/components/Diagrams';
import type { Locale } from '../src/content/types';

export function renderDiagram(kind: DiagramKey, locale: Locale): string {
  return renderToStaticMarkup(<DiagramView kind={kind} locale={locale} />);
}
