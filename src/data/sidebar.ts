export interface sidebarMenuItem {
    title: string;
    link?: string;
    icon: string;
    className?: string;
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode
  }

export const sidebarMenuItems: sidebarMenuItem[] = [
    {title: 'Dashboard', link: '/', icon: 'bx-home-alt'},
    {title: 'Users', link: '/users', icon: 'bx-user'},
]