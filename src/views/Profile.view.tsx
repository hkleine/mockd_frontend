import { MenuHeading } from "../components";
import {DashboardLayout} from "../layouts"

export function ProfileView() {
  return (
    <div>
      <DashboardLayout>
        <div className="flex flex-col">
        <MenuHeading>Profile</MenuHeading>
        </div>
      </DashboardLayout>
    </div>
  );
}