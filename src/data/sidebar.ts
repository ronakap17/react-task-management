import { IconProps } from "~/components/Icon";

export interface sidebarMenuItem {
    title: string;
    link?: string;
    icon: IconProps['name'];
    className?: string;
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode
  }

export const sidebarMenuItems: sidebarMenuItem[] = [
    {title: 'Dashboard', link: '/', icon: 'bx-home-alt'},
    {title: 'Users', link: '/users', icon: 'bx-user'},
]