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
import { useApi } from '@/hooks/useApi';
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
  CircularProgress,
  Paper,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ExpandedPermissionNode extends PermissionNode {
    expanded?: boolean;
    level?: number;
    accessible: boolean;
}

interface PermissionsTreeGridProps {
    userId?: string;
    onPermissionsChange?: () => void;
}

const PermissionsTreeGrid: React.FC<PermissionsTreeGridProps> = ({ userId, onPermissionsChange }) => {
    const theme = useTheme();

    const { data: permissionsData, loading: loadingPermissions } = useApi<{ data: string[] }>({
        key: ['get-permissions', userId],
        url: userId ? `/Permissions?pageIndex=0&pageSize=100&userId=${userId}` : null,
    });

    const [allData, setAllData] = useState<ExpandedPermissionNode[]>(() =>
        generatePermissionTreeData(false).map(node => ({
            ...node,
            expanded: true,
            level: node.parent ? 1 : 0,
            accessible: false,
        }))
    );

    useEffect(() => {
        if (!userId) return;
        setAllData(
            generatePermissionTreeData(false).map(node => ({
                ...node,
                expanded: true,
                level: node.parent ? 1 : 0,
                accessible: false,
            }))
        );
    }, [userId, permissionsData]);



    const visibleRows = useMemo(() => {
        const visible: ExpandedPermissionNode[] = [];
        const rootNodes = allData.filter(n => !n.parent);

        const addVisibleNodes = (parentId: string | undefined, level: number) => {
            const children = allData.filter(n => n.parent === parentId);
            children.forEach(child => {
                child.level = level;
                visible.push(child);
                if (child.expanded && child.isSection) addVisibleNodes(child.id, level + 1);
            });
        };

        rootNodes.forEach(root => {
            root.level = 0;
            visible.push(root);
            if (root.expanded && root.isSection) addVisibleNodes(root.id, 1);
        });

        return visible;
    }, [allData]);

    const toggleExpansion = useCallback((nodeId: string) => {
        setAllData(prev => prev.map(node =>
            node.id === nodeId ? { ...node, expanded: !node.expanded } : node
        ));
    }, []);

    const toggleNode = useCallback((nodeId: string, value: boolean) => {
        setAllData(prev => {
            const next = prev.map(n => ({ ...n }));
            const node = next.find(n => n.id === nodeId);
            if (!node) return next;

            node.accessible = value;

            if (node.isSection) {
                const updateChildren = (id: string, val: boolean) => {
                    const children = next.filter(n => n.parent === id);
                    children.forEach(c => {
                        c.accessible = val;
                        updateChildren(c.id, val);
                    });
                };
                updateChildren(nodeId, value);
            } else {
                const parent = next.find(n => n.id === node.parent);
                if (parent) {
                    const siblings = next.filter(n => n.parent === parent.id);
                    parent.accessible = siblings.every(s => s.accessible);
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
            <div style={{ display: 'flex', alignItems: 'center', paddingRight: `${indent}px`, gap: 8 }}>
                {hasChildren ? (
                    <span
                        onClick={() => toggleExpansion(node.id)}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 6,
                            transition: 'all 0.2s ease',
                            backgroundColor: node.expanded ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.12); }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = node.expanded ? alpha(theme.palette.primary.main, 0.08) : 'transparent'; }}
                    >
                        {node.expanded ? <ExpandMore sx={{ fontSize: 20, color: theme.palette.primary.main }} /> : <ChevronLeft sx={{ fontSize: 20, color: theme.palette.text.secondary }} />}
                    </span>
                ) : <span style={{ width: 28 }} />}

                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {hasChildren ? (
                        <FolderOutlined sx={{ fontSize: 20, color: node.accessible ? theme.palette.primary.main : theme.palette.text.disabled }} />
                    ) : (
                        <DescriptionOutlined sx={{ fontSize: 18, color: node.accessible ? theme.palette.success.main : theme.palette.text.disabled }} />
                    )}
                    <span style={{
                        fontWeight: hasChildren ? 600 : 400,
                        fontSize: hasChildren ? 14 : 13,
                        color: node.accessible ? theme.palette.text.primary : theme.palette.text.disabled,
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
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
                        '& .MuiSwitch-track': { borderRadius: 12 },
                    }}
                />
            </div>
        );
    }, [toggleNode, theme]);

    const columnDefs = useMemo<ColDef<ExpandedPermissionNode>[]>(() => [
        {
            field: "name",
            headerName: "بخش / صفحه",
            cellRenderer: NameCellRenderer,
            flex: 1,
            minWidth: 240,
            cellStyle: { display: 'flex', alignItems: 'center' },
        },
        {
            field: "accessible",
            headerName: "وضعیت دسترسی",
            width: 160,
            cellRenderer: SwitchCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
    ], [NameCellRenderer, SwitchCellRenderer]);

    return (
        <Box sx={{ width: '100%' }}>
            {loadingPermissions ? (
                <Paper sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ fontFamily: 'IRANSans, Vazirmatn, sans-serif' }}>
                        در حال بارگذاری دسترسی‌ها...
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}` }}>
                        <DataGrid<ExpandedPermissionNode>
                            rowData={visibleRows}
                            columnDefs={columnDefs}
                            rtl
                            width="100%"
                        />
                    </Paper>
                </>
            )}
        </Box>
    );

};

export default PermissionsTreeGrid;
