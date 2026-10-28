import { useState } from 'react';
import { useI18n } from '../i18n';

/** Code with a copy button. Copying uses the clipboard API when it exists and fails quietly otherwise. */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-wrap">
      <pre className="code" aria-label={label}><code>{code}</code></pre>
      <button type="button" className="btn btn-small" onClick={copy} aria-live="polite">
        {copied ? t('common.copied') : t('common.copy')}
      </button>
    </div>
  );
}
