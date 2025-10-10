export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface MenuSection {
  section: string;
  collapsible?: boolean;
  items: MenuItem[];
}

export interface MenuItemProps {
  item: MenuItem;
  open: boolean;
  selected: boolean;
  component?: React.ElementType;
  href?: string;
}
