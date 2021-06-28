import { MenuHeading } from "../components";
import {DashboardLayout} from "../layouts"

export function StatisticView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
        <MenuHeading>Statistics</MenuHeading>
        </div>
      </DashboardLayout>
    </div>
  );
}