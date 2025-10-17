'use client';

import type {
    ColDef,
    GridOptions,
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
}

function DataGrid<T>({
    rowData,
    columnDefs,
    width = '100%',
    rtl = true,
}: DataGridProps<T>) {
    const { mode } = useThemeMode();
    const darkMode = mode === 'dark';

    const rtlColumnDefs = rtl
        ? columnDefs.map((col) => ({
            ...col,
            cellClass: 'custom-cell',
            headerClass: 'custom-header',
        }))
        : columnDefs;

    const gridOptions: GridOptions = {
        enableRtl: rtl,
        rowSelection: 'multiple',
        animateRows: true,
        suppressMovableColumns: false,
        suppressMenuHide: false,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
        },
        getRowHeight: () => 60,
        localeText: rtl
            ? {
                noRowsToShow: 'هیچ ردیفی برای نمایش وجود ندارد',
                loadingOoo: 'در حال بارگذاری...',
                selectAll: 'انتخاب همه',
                selectAllFiltered: 'انتخاب همه فیلتر شده',
                searchOoo: 'جستجو...',
                blanks: 'خالی',
                noMatches: 'هیچ مطابقتی یافت نشد',
                filterOoo: 'فیلتر...',
                equals: 'مساوی',
                notEqual: 'نامساوی',
                lessThan: 'کمتر از',
                greaterThan: 'بیشتر از',
                lessThanOrEqual: 'کمتر یا مساوی',
                greaterThanOrEqual: 'بیشتر یا مساوی',
                inRange: 'در محدوده',
                contains: 'شامل',
                notContains: 'شامل نباشد',
                startsWith: 'شروع با',
                endsWith: 'پایان با',
                andCondition: 'و',
                orCondition: 'یا',
                applyFilter: 'اعمال فیلتر',
                resetFilter: 'بازنشانی فیلتر',
                clearFilter: 'پاک کردن فیلتر',
                cancelFilter: 'لغو فیلتر',
                textFilter: 'فیلتر متن',
                numberFilter: 'فیلتر عدد',
                dateFilter: 'فیلتر تاریخ',
                setFilter: 'فیلتر مجموعه',
                columns: 'ستون‌ها',
                filters: 'فیلترها',
                pivotMode: 'حالت محوری',
                groups: 'گروه‌ها',
                rowGroupColumns: 'ستون‌های گروه ردیف',
                rowGroupColumnsEmptyMessage: 'برای گروه‌بندی، ستون‌ها را اینجا بکشید',
                valueColumns: 'ستون‌های مقدار',
                pivotColumns: 'ستون‌های محوری',
                valueColumnsEmptyMessage: 'برای تجمیع، ستون‌ها را اینجا بکشید',
                pivotColumnsEmptyMessage: 'برای برچسب‌گذاری ستون، اینجا بکشید',
                toolPanelColumnsEmptyMessage: 'برای گروه‌بندی، ستون‌ها را اینجا بکشید',
                noColumnsToHide: 'ستونی برای مخفی کردن وجود ندارد',
                pinColumn: 'پین کردن ستون',
                pinLeft: 'پین چپ',
                pinRight: 'پین راست',
                noPin: 'بدون پین',
                autosizeThiscolumn: 'تنظیم خودکار اندازه این ستون',
                autosizeAllColumns: 'تنظیم خودکار اندازه همه ستون‌ها',
                groupBy: 'گروه‌بندی بر اساس',
                ungroupBy: 'حذف گروه‌بندی',
                resetColumns: 'بازنشانی ستون‌ها',
                expandAll: 'باز کردن همه',
                collapseAll: 'بستن همه',
                copy: 'کپی',
                ctrlC: 'Ctrl+C',
                paste: 'چسباندن',
                ctrlV: 'Ctrl+V',
                export: 'خروجی',
                csvExport: 'خروجی CSV',
                excelExport: 'خروجی Excel',
            }
            : {},
    };

    const containerStyle = {
        height: 'calc(100vh - 300px)',
        width,
        direction: rtl ? ('rtl' as const) : ('ltr' as const),
    };

    const themeClass = darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

    return (
        <>
            <style>
                {`
                    .custom-cell {
                        padding: 0 16px;
                        font-size: 15px;
                        display: flex;
                        align-items: center;
                    }
                    .custom-header {
                        padding: 0 16px;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    ${!darkMode
                        ? `
                        .ag-theme-alpine .ag-row:nth-child(odd) {
                            background-color: #ffffff;
                        }
                        .ag-theme-alpine .ag-row:nth-child(even) {
                            background-color: #f5f5f5;
                        }

                        /* Optional hover effect */
                        .ag-theme-alpine .ag-row:hover {
                            background-color: #e0e0e0;
                        }
                    `
                        : ''
                    }
                `}
            </style>
            <div className={themeClass} style={containerStyle}>
                <AgGridReact<T>
                    rowData={rowData}
                    columnDefs={rtlColumnDefs}
                    gridOptions={gridOptions}
                />
            </div>
        </>
    );
}

export default DataGrid;
