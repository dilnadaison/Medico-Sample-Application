import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
<ProSidebarProvider>
<Sidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>
</ProSidebarProvider>
export default Sidebar;