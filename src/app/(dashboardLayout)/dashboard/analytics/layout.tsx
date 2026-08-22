import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex gap-3">
        <Button>
          <Link href="/dashboard/analytics/monthly">Monthly</Link>
        </Button>
        <Button>
          <Link href="/dashboard/analytics/weekly">Weekly</Link>
        </Button>
      </div>
      {children}
    </div>
  );
};

export default layout;
