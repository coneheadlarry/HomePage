import { useEffect, useState } from "react";
import { widgetMap } from "@/app/HomePage/widgets/index";

export default function WidgetArea() {
  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/widgets`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setWidgets);
  }, []);

  return (
    <div className="flex gap-4">
      {widgets.map((key) => {
        const Widget = widgetMap[key as keyof typeof widgetMap];
        return Widget ? <Widget key={key} /> : null;
      })}
    </div>
  );
}
