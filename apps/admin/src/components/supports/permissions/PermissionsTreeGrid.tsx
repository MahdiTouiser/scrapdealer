"use client";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
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
import fa from '@/i18n/fa';
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

interface ExpandedPermissionNode {
    id: string;
    name: string;
    parent?: string;
    level?: number;
    expanded?: boolean;
    accessible: boolean;
    isSection?: boolean;
}

interface PermissionsTreeGridProps {
    userId?: string;
    onPermissionsChange?: (permissions: string[]) => void;
}

const translatePermissionPart = (part: string, index: number) => {
    if (index === 2) {
        switch (part) {
            case "Menu":
                return "منو";
            case "Dashboard":
                return "داشبورد";
            case "Sellers":
                return "فروشندگان";
            case "SellersVerification":
                return "احراز هویت فروشندگان";
            case "RetailBuyer":
                return "خریداران خرد";
            case "WholeSaleBuyer":
                return "خریداران عمده";
            case "BuyersVerification":
                return "احراز هویت خریداران";
            case "Supports":
                return "پشتیبانی";
            case "Permissions":
                return "دسترسی‌ها";
            case "ReviewedRequests":
                return "درخواست‌های بررسی شده";
            case "Invoices":
                return "فاکتورها";
            case "FAQ":
                return fa.FAQ;
            case "News":
                return "اخبار";
            case "Settings":
                return "تنظیمات";
            default:
                return part;
        }
    }
    return part;
};

const PermissionsTreeGrid: React.FC<PermissionsTreeGridProps> = ({ userId, onPermissionsChange }) => {
    const theme = useTheme();
    const { data: permAll, loading: loadingAll } = useApi<{ data: string[]; totalCount?: number }>({
        key: ["get-permissions", userId],
        url: `/Permissions/?pageIndex=0&pageSize=100`,
    });
    const { data: permSelected, loading: loadingSelected } = useApi<{ data: string[]; totalCount?: number }>({
        key: ["get-permissions-selected", userId],
        url: `/Permissions/Support/?pageIndex=0&pageSize=100`,
    });

    const loadingPermissions = Boolean(loadingAll || loadingSelected);

    const [allData, setAllData] = useState<ExpandedPermissionNode[]>([]);
    const isInitialLoad = useRef(true);

    const buildTreeFromApi = useCallback((permissions: string[], selectedSet: Set<string>) => {
        const nodes: ExpandedPermissionNode[] = [];
        permissions.forEach((permission) => {
            const parts = permission.split(".");
            parts.forEach((part, index) => {
                const id = parts.slice(0, index + 1).join(".");
                if (!nodes.find((n) => n.id === id)) {
                    nodes.push({
                        id,
                        name: translatePermissionPart(part, index),
                        parent: index === 0 ? undefined : parts.slice(0, index).join("."),
                        expanded: true,
                        level: index,
                        accessible: index === parts.length - 1 ? selectedSet.has(permission) : false,
                        isSection: index !== parts.length - 1,
                    });
                }
            });
        });
        return nodes;
    }, []);

    useEffect(() => {
        if (!permAll) return;
        const all = permAll.data ?? [];
        const selected = permSelected ? permSelected.data ?? [] : [];
        const selectedSet = new Set(selected);
        setAllData(buildTreeFromApi(all, selectedSet));
        isInitialLoad.current = true;
    }, [permAll, permSelected, buildTreeFromApi]);

    useEffect(() => {
        if (!allData.length) return;
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }
        const selectedPermissions = allData.filter((n) => !n.isSection && n.accessible).map((n) => n.id);
        onPermissionsChange?.(selectedPermissions);
    }, [allData, onPermissionsChange]);

    const visibleRows = useMemo(() => {
        const visible: ExpandedPermissionNode[] = [];
        const rootNodes = allData.filter((n) => !n.parent);
        const addVisibleNodes = (parentId: string | undefined, level: number) => {
            const children = allData.filter((n) => n.parent === parentId);
            children.forEach((child) => {
                child.level = level;
                visible.push(child);
                if (child.expanded && child.isSection) addVisibleNodes(child.id, level + 1);
            });
        };
        rootNodes.forEach((root) => {
            root.level = 0;
            visible.push(root);
            if (root.expanded && root.isSection) addVisibleNodes(root.id, 1);
        });
        return visible;
    }, [allData]);

    const toggleExpansion = useCallback((nodeId: string) => {
        setAllData((prev) => prev.map((node) => (node.id === nodeId ? { ...node, expanded: !node.expanded } : node)));
    }, []);

    const toggleNode = useCallback((nodeId: string, value: boolean) => {
        setAllData((prev) => {
            const next = prev.map((n) => ({ ...n }));
            const node = next.find((n) => n.id === nodeId);
            if (!node) return next;
            node.accessible = value;
            if (node.isSection) {
                const updateChildren = (id: string, val: boolean) => {
                    const children = next.filter((n) => n.parent === id);
                    children.forEach((c) => {
                        c.accessible = val;
                        updateChildren(c.id, val);
                    });
                };
                updateChildren(nodeId, value);
            } else {
                const parent = next.find((n) => n.id === node.parent);
                if (parent) {
                    const siblings = next.filter((n) => n.parent === parent.id && !n.isSection);
                    parent.accessible = siblings.every((s) => s.accessible);
                }
            }
            return next;
        });
    }, []);

    const NameCellRenderer = useCallback(
        (params: ICellRendererParams<ExpandedPermissionNode>) => {
            const node = params.data;
            if (!node) return null;
            const indent = (node.level || 0) * 32;
            return (
                <div style={{ display: "flex", alignItems: "center", paddingRight: `${indent}px`, gap: 8 }}>
                    {node.isSection ? (
                        <span
                            onClick={() => toggleExpansion(node.id)}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                padding: 4,
                                borderRadius: 6,
                                transition: "all 0.2s ease",
                                backgroundColor: node.expanded ? alpha(theme.palette.primary.main, 0.08) : "transparent",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.12);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = node.expanded ? alpha(theme.palette.primary.main, 0.08) : "transparent";
                            }}
                        >
                            {node.expanded ? <ExpandMore sx={{ fontSize: 20, color: theme.palette.primary.main }} /> : <ChevronLeft sx={{ fontSize: 20, color: theme.palette.text.secondary }} />}
                        </span>
                    ) : (
                        <span style={{ width: 28 }} />
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {node.isSection ? <FolderOutlined sx={{ fontSize: 20, color: node.accessible ? theme.palette.primary.main : theme.palette.text.disabled }} /> : <DescriptionOutlined sx={{ fontSize: 18, color: node.accessible ? theme.palette.success.main : theme.palette.text.disabled }} />}
                        <span
                            style={{
                                fontWeight: node.isSection ? 600 : 400,
                                fontSize: node.isSection ? 14 : 13,
                                color: node.accessible ? theme.palette.text.primary : theme.palette.text.disabled,
                            }}
                        >
                            {node.name}
                        </span>
                    </span>
                </div>
            );
        },
        [toggleExpansion, theme]
    );

    const SwitchCellRenderer = useCallback(
        (params: ICellRendererParams<ExpandedPermissionNode>) => {
            const node = params.data;
            if (!node) return null;
            return (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <Switch
                        checked={Boolean(node.accessible)}
                        onChange={(e) => toggleNode(node.id, e.target.checked)}
                        color="primary"
                        inputProps={{ "aria-label": `${node.name} دسترسی` }}
                        sx={{
                            "& .MuiSwitch-switchBase": {
                                "&.Mui-checked": {
                                    color: theme.palette.success.main,
                                    "& + .Mui- Switch-track": {},
                                },
                                "&.Mui-checked + .MuiSwitch-track": { backgroundColor: theme.palette.success.main, opacity: 0.5 },
                            },
                            "& .MuiSwitch-track": { borderRadius: 12 },
                        }}
                    />
                </div>
            );
        },
        [toggleNode, theme]
    );

    const columnDefs = useMemo<ColDef<ExpandedPermissionNode>[]>(
        () => [
            { field: "name", headerName: "بخش", cellRenderer: NameCellRenderer, flex: 1, minWidth: 240, cellStyle: { display: "flex", alignItems: "center" } },
            { field: "accessible", headerName: "وضعیت دسترسی", width: 160, cellRenderer: SwitchCellRenderer, cellStyle: { display: "flex", alignItems: "center", justifyContent: "center" } },
        ],
        [NameCellRenderer, SwitchCellRenderer]
    );

    return (
        <Box sx={{ width: "100%" }}>
            {loadingPermissions ? (
                <Paper sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ fontFamily: "IRANSans, Vazirmatn, sans-serif" }}>
                        در حال بارگذاری دسترسی‌ها...
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: `1px solid ${theme.palette.divider}`, boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}` }}>
                    <DataGrid<ExpandedPermissionNode> rowData={visibleRows} columnDefs={columnDefs} rtl width="100%" />
                </Paper>
            )}
        </Box>
    );
};

export default PermissionsTreeGrid;
