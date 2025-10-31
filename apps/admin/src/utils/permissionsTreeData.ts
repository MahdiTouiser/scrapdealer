import { MENU_SECTIONS } from '@/components/sidebar/MenuSections';

export interface PermissionNode {
  id: string;
  name: string;
  parent?: string;
  path?: string;
  accessible: boolean;
  isSection?: boolean;
}

export const generatePermissionTreeData = (initial = false): PermissionNode[] => {
  const rows: PermissionNode[] = [];

  MENU_SECTIONS.forEach((section, sIndex) => {
    const sectionId = `section-${sIndex}-${String(section.section).replace(/\s+/g, '_')}`;
    rows.push({
      id: sectionId,
      name: section.section,
      accessible: initial,
      isSection: true,
    });

    (section.items || []).forEach((item) => {
      rows.push({
        id: item.path || `${sectionId}-${item.text}`,
        name: item.text,
        parent: sectionId,
        path: item.path,
        accessible: initial,
        isSection: false,
      });
    });
  });

  return rows;
};
