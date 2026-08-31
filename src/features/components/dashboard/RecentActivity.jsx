import { Activity } from "lucide-react";

function RecentActivity({ activity }) {
  return (
    <div>
      <h2 className="font-display text-lg text-ink">Recent Activity</h2>
      <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
        {activity.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3.5">
            <Activity size={15} className="shrink-0 text-brand" />
            <p className="flex-1 text-sm text-ink">{item.text}</p>
            <p className="text-xs text-ink-soft">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
