"use client";

import type {
    ColDef,
    GridOptions,
} from 'ag-grid-community';
import {
    AllCommunityModule,
    ModuleRegistry,
    themeQuartz,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridProps<T> {
    rowData: T[];
    columnDefs: ColDef<T>[];
    height?: number | string;
    width?: number | string;
    rtl?: boolean;
    locale?: string;
}

function DataGrid<T>({
    rowData,
    columnDefs,
    height = 500,
    width = "100%",
    rtl = true,
}: DataGridProps<T>) {

    const rtlColumnDefs = rtl ? columnDefs.map(col => ({
        ...col,
        cellStyle: {
            textAlign: 'right',
            direction: 'rtl',
            ...col.cellStyle
        },
        headerClass: 'rtl-header',
        cellClass: 'rtl-cell'
    })) : columnDefs;

    const gridOptions: GridOptions = {
        enableRtl: rtl,

        localeText: rtl ? {
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
            excelExport: 'خروجی Excel'
        } : {},

        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
            ...(rtl && {
                cellStyle: { textAlign: 'right', direction: 'rtl' },
                headerClass: 'rtl-header'
            })
        },

        rowSelection: 'multiple',

        animateRows: true,

        pagination: false,

        suppressMovableColumns: false,
        suppressMenuHide: false,
    };

    const containerStyle = {
        height,
        width,
        direction: rtl ? 'rtl' as const : 'ltr' as const,
        fontFamily: rtl ? 'Tahoma, Arial, sans-serif' : undefined
    };

    return (
        <>
            <div style={containerStyle}>
                <AgGridReact<T>
                    rowData={rowData}
                    columnDefs={rtlColumnDefs}
                    gridOptions={gridOptions}
                    theme={themeQuartz}
                />
            </div>
        </>
    );
}

export default DataGrid;