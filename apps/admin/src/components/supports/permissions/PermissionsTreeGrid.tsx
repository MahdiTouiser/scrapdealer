"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
  generatePermissionTreeData,
  PermissionNode,
} from '@/utils/permissionsTreeData';
import {
  ChevronLeft,
  DescriptionOutlined,
  ExpandMore,
  FolderOutlined,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Chip,
  Paper,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ExpandedPermissionNode extends PermissionNode {
    expanded?: boolean;
    level?: number;
}

interface PermissionsTreeGridProps {
    userId?: string;
    onPermissionsChange?: () => void;
}

const PermissionsTreeGrid: React.FC<PermissionsTreeGridProps> = ({
    userId,
    onPermissionsChange
}) => {
    const theme = useTheme();

    const [allData, setAllData] = useState<ExpandedPermissionNode[]>(() =>
        generatePermissionTreeData(false).map(node => ({
            ...node,
            expanded: true,
            level: node.parent ? 1 : 0,
        }))
    );

    useEffect(() => {
        if (userId) {
            setAllData(
                generatePermissionTreeData(false).map(node => ({
                    ...node,
                    expanded: true,
                    level: node.parent ? 1 : 0,
                }))
            );
        }
    }, [userId]);

    const stats = useMemo(() => {
        const total = allData.length;
        const accessible = allData.filter(n => n.accessible).length;
        const sections = allData.filter(n => n.isSection).length;
        const pages = total - sections;
        return { total, accessible, sections, pages };
    }, [allData]);

    const visibleRows = useMemo(() => {
        const visible: ExpandedPermissionNode[] = [];
        const rootNodes = allData.filter(n => !n.parent);

        const addVisibleNodes = (parentId: string | undefined, level: number) => {
            const children = allData.filter(n => n.parent === parentId);
            children.forEach(child => {
                child.level = level;
                visible.push(child);

                if (child.expanded && child.isSection) {
                    addVisibleNodes(child.id, level + 1);
                }
            });
        };

        rootNodes.forEach(root => {
            root.level = 0;
            visible.push(root);
            if (root.expanded && root.isSection) {
                addVisibleNodes(root.id, 1);
            }
        });

        return visible;
    }, [allData]);

    const toggleExpansion = useCallback((nodeId: string) => {
        setAllData(prev => prev.map(node =>
            node.id === nodeId ? { ...node, expanded: !node.expanded } : node
        ));
    }, []);

    const toggleNode = useCallback((nodeId: string, value: boolean) => {
        setAllData((prev) => {
            const next = prev.map((r) => ({ ...r }));

            const node = next.find((n) => n.id === nodeId);
            if (!node) return next;

            node.accessible = value;

            if (node.isSection) {
                const update = (id: string, val: boolean) => {
                    const children = next.filter((n) => n.parent === id);
                    children.forEach((c) => {
                        c.accessible = val;
                        update(c.id, val);
                    });
                };
                update(nodeId, value);
            } else {
                const parent = next.find((n) => n.id === node.parent);
                if (parent) {
                    const siblings = next.filter((n) => n.parent === parent.id);
                    const allTrue = siblings.every((s) => s.accessible === true);
                    parent.accessible = allTrue;
                }
            }

            return next;
        });

        onPermissionsChange?.();
    }, [onPermissionsChange]);

    const NameCellRenderer = useCallback((params: ICellRendererParams<ExpandedPermissionNode>) => {
        const node = params.data;
        if (!node) return null;

        const hasChildren = node.isSection;
        const level = node.level || 0;
        const indent = level * 32;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: `${indent}px`,
                height: '100%',
                gap: '8px',
            }}>
                {hasChildren ? (
                    <span
                        onClick={() => toggleExpansion(node.id)}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            backgroundColor: node.expanded
                                ? alpha(theme.palette.primary.main, 0.08)
                                : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.12);
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = node.expanded
                                ? alpha(theme.palette.primary.main, 0.08)
                                : 'transparent';
                        }}
                    >
                        {node.expanded ? (
                            <ExpandMore sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                        ) : (
                            <ChevronLeft sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                        )}
                    </span>
                ) : (
                    <span style={{ width: '28px' }} />
                )}

                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {hasChildren ? (
                        <FolderOutlined sx={{
                            fontSize: 20,
                            color: node.accessible
                                ? theme.palette.primary.main
                                : theme.palette.text.disabled
                        }} />
                    ) : (
                        <DescriptionOutlined sx={{
                            fontSize: 18,
                            color: node.accessible
                                ? theme.palette.success.main
                                : theme.palette.text.disabled
                        }} />
                    )}
                    <span style={{
                        fontWeight: hasChildren ? 600 : 400,
                        fontSize: hasChildren ? '14px' : '13px',
                        color: node.accessible
                            ? theme.palette.text.primary
                            : theme.palette.text.disabled,
                        fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                    }}>
                        {node.name}
                    </span>
                </span>
            </div>
        );
    }, [toggleExpansion, theme]);

    const SwitchCellRenderer = useCallback((params: ICellRendererParams<ExpandedPermissionNode>) => {
        const node = params.data;
        if (!node) return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>
                <Switch
                    checked={Boolean(params.value)}
                    onChange={(e) => toggleNode(node.id, e.target.checked)}
                    color="primary"
                    inputProps={{ "aria-label": `${node.name} دسترسی` }}
                    sx={{
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                color: theme.palette.success.main,
                                '& + .MuiSwitch-track': {
                                    backgroundColor: theme.palette.success.main,
                                    opacity: 0.5,
                                },
                            },
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: 12,
                        },
                    }}
                />
            </div>
        );
    }, [toggleNode, theme]);

    const columnDefs = useMemo<ColDef<ExpandedPermissionNode>[]>(
        () => [
            {
                field: "name",
                headerName: "بخش / صفحه",
                cellRenderer: NameCellRenderer,
                flex: 1,
                minWidth: 280,
                cellStyle: {
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                },
            },
            {
                field: "accessible",
                headerName: "وضعیت دسترسی",
                width: 160,
                cellRenderer: SwitchCellRenderer,
                cellStyle: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
        ],
        [NameCellRenderer, SwitchCellRenderer]
    );



    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                elevation={0}
                sx={{
                    mb: 3,
                    p: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <FolderOutlined />
                    سطوح دسترسی
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                        label={`کل موارد: ${stats.total}`}
                        sx={{
                            fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                            color: theme.palette.info.dark,
                            border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                        }}
                    />
                    <Chip
                        label={`دسترسی فعال: ${stats.accessible}`}
                        sx={{
                            fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            color: theme.palette.success.dark,
                            border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        }}
                    />
                    <Chip
                        label={`بخش‌ها: ${stats.sections}`}
                        sx={{
                            fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.warning.main, 0.1),
                            color: theme.palette.warning.dark,
                            border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                        }}
                    />
                    <Chip
                        label={`صفحات: ${stats.pages}`}
                        sx={{
                            fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.dark,
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                        }}
                    />
                </Box>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                }}
            >
                <div
                    className="ag-theme-quartz"
                    style={{
                        height: 600,
                        width: "100%",
                        direction: 'rtl',
                        fontFamily: 'IRANSans, Vazirmatn, sans-serif',
                    }}
                >
                    <style>
                        {`
                            .ag-theme-quartz {
                                --ag-font-family: 'IRANSans', 'Vazirmatn', sans-serif;
                                --ag-font-size: 14px;
                                --ag-header-height: 56px;
                                --ag-row-height: 52px;
                                --ag-header-background-color: ${alpha(theme.palette.primary.main, 0.08)};
                                --ag-header-foreground-color: ${theme.palette.text.primary};
                                --ag-border-color: ${theme.palette.divider};
                                --ag-row-hover-color: ${alpha(theme.palette.primary.main, 0.04)};
                                --ag-selected-row-background-color: ${alpha(theme.palette.primary.main, 0.08)};
                            }
                            
                            .ag-theme-quartz .ag-header-cell-label {
                                font-weight: 700;
                                justify-content: center;
                            }
                            
                            .ag-theme-quartz .ag-header-cell {
                                border-left: 1px solid ${alpha(theme.palette.primary.main, 0.15)};
                            }
                            
                            .ag-theme-quartz .ag-row {
                                transition: all 0.2s ease;
                            }
                            
                            .ag-theme-quartz .ag-row:hover {
                                box-shadow: inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)};
                            }
                            
                            .ag-theme-quartz .ag-cell {
                                border-left: 1px solid ${theme.palette.divider};
                                line-height: 52px;
                            }

                            .ag-theme-quartz .ag-rtl .ag-cell {
                                border-left: none;
                                border-right: 1px solid ${theme.palette.divider};
                            }
                            
                            .ag-theme-quartz .ag-root-wrapper {
                                border: none;
                            }
                        `}
                    </style>
                    <DataGrid<ExpandedPermissionNode>
                        rowData={visibleRows}
                        columnDefs={columnDefs}
                        rtl={true}
                        width="100%"
                    />

                </div>
            </Paper>
        </Box>
    );
};

export default PermissionsTreeGrid;