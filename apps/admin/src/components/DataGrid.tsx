'use client';

import type {
  ColDef,
  GridOptions,
  IDetailCellRendererParams,
} from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { useThemeMode } from '@/contexts/ThemeContextProvider';

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridProps<T> {
    rowData: T[];
    columnDefs: ColDef<T>[];
    width?: number | string;
    rtl?: boolean;

    masterDetail?: boolean;
    detailCellRendererParams?: IDetailCellRendererParams;
    rowHeight?: number;
    getRowHeight?: GridOptions['getRowHeight'];
    frameworkComponents?: any;
    detailCellRenderer?: any;
    onRowClicked?: (params: any) => void;

    isFullWidthRow?: GridOptions['isFullWidthRow'];
    fullWidthCellRenderer?: any;
    getRowStyle?: GridOptions['getRowStyle'];
}

function DataGrid<T>({
    rowData,
    columnDefs,
    width = '100%',
    rtl = true,
    masterDetail = false,
    detailCellRendererParams,
    getRowHeight,
    onRowClicked,
    isFullWidthRow,
    fullWidthCellRenderer,
    getRowStyle,
}: DataGridProps<T>) {
    const { mode } = useThemeMode();
    const darkMode = mode === 'dark';

    const gridOptions: GridOptions = {
        enableRtl: rtl,
        rowSelection: 'single',
        masterDetail,
        detailCellRendererParams,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
        },
        getRowHeight: getRowHeight || (() => (masterDetail ? 50 : 55)),
        onRowClicked,
        isFullWidthRow,
        fullWidthCellRenderer,
        getRowStyle,

        localeText: {
            noRowsToShow: 'داده‌ای برای نمایش وجود ندارد',
        },
    };

    const containerStyle = {
        height: 'calc(100vh - 300px)',
        width,
        direction: rtl ? ('rtl' as const) : ('ltr' as const),
    };

    const themeClass = darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

    return (
        <div className={themeClass} style={containerStyle}>
            <AgGridReact<T>
                rowData={rowData}
                columnDefs={columnDefs}
                gridOptions={gridOptions}
            />
        </div>
    );
}

export default DataGrid;
