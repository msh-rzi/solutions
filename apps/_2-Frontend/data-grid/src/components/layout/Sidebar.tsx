import { Separator } from '@repo/ui-shadcn';
import { DataSettingsFieldSet } from '../sidebar/DataSettingsFieldSet';
import { FeaturesFieldSet } from '../sidebar/FeaturesFieldSet';

const Sidebar = () => (
  <div className="w-64 bg-gray-50 p-4 border-r overflow-auto flex flex-col gap-4">
    <DataSettingsFieldSet />
    <Separator />
    <FeaturesFieldSet />
  </div>
);

export default Sidebar;

