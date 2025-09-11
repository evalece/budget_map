// src/app/playground/page.tsx
import WidgetBox from "../WidgetBox";

export default function playground() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-2xl font-bold mb-6">Responsive Widget Grid</h1>

      {/* Responsive grid container */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <WidgetBox title="Widget A">
          <p>This is the first widget.</p>
        </WidgetBox>

        <WidgetBox title="Widget B">
          <p>This is the second widget.</p>
        </WidgetBox>

        <WidgetBox title="Widget C">
          <p>This is the third widget.</p>
        </WidgetBox>

        <WidgetBox title="Widget D">
          <p>This is the fourth widget.</p>
        </WidgetBox>
      </section>
    </main>
  );
}

