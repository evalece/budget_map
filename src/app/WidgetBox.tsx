// app/components/WidgetBox.tsx
import { ReactNode } from "react";

export default function WidgetBox({
  title, subtitle, children, footer,
}: { title: string; subtitle?: string; footer?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <header className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </header>
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500">{footer}</div>}
    </section>
  );
}
