'use client'

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import {
  Box,
  Switch,
} from '@mui/material';

import ActionsCell from '../common/ActionCell';
import Loading from '../common/Loading';

export interface Buyer {
  id: string
  firstName: string
  lastName: string
  nationalCode: string
  city: string
  province: string
  addressDescription: string
  gender: 'Male' | 'Female'
  activityArea: 'North' | 'South' | 'East' | 'West' | 'Tehran'
  companyName: string
  numberPlate: string
  businessLicenseFileId: string
  nationalCardFileId: string
  profileFormFileId: string
  isFixedLocation: boolean
  isWholeSaleBuyer: boolean
}

const BuyersTable: React.FC<{
  data?: Buyer[]
  loading: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}> = ({ data = [], loading, onEdit, onDelete }) => {
  const [rowData, setRowData] = useState<Buyer[]>([])

  useEffect(() => {
    setRowData(data)
  }, [data])

  const handleToggle = useCallback((id: string) => {
    setRowData(prev =>
      prev.map(b =>
        b.id === id ? { ...b, isFixedLocation: !b.isFixedLocation } : b
      )
    )
  }, [])

  const columnDefs: ColDef<Buyer>[] = [
    {
      headerName: 'نام',
      field: 'firstName',
      flex: 1,
    },
    {
      headerName: 'نام خانوادگی',
      field: 'lastName',
      flex: 1,
    },
    {
      headerName: 'نام شرکت',
      field: 'companyName',
      flex: 1,
    },
    {
      headerName: 'کد ملی',
      field: 'nationalCode',
      flex: 1,
    },
    {
      headerName: 'شهر',
      field: 'city',
      flex: 1,
    },
    {
      headerName: 'استان',
      field: 'province',
      flex: 1,
    },
    {
      headerName: 'پلاک خودرو',
      field: 'numberPlate',
      flex: 1,
    },
    {
      headerName: 'منطقه فعالیت',
      field: 'activityArea',
      flex: 1,
    },
    {
      headerName: 'عمده‌فروش',
      field: 'isWholeSaleBuyer',
      valueFormatter: p => (p.value ? 'بله' : 'خیر'),
      flex: 1,
    },
    {
      headerName: 'دارای مکان ثابت',
      field: 'isFixedLocation',
      cellRenderer: p => (
        <Box display='flex' justifyContent='center'>
          <Switch
            checked={p.value}
            onChange={() => handleToggle(p.data.id)}
            color='success'
          />
        </Box>
      ),
      maxWidth: 150,
    },
    {
      headerName: 'عملیات',
      cellRenderer: ActionsCell,
      cellRendererParams: { onEdit, onDelete },
      maxWidth: 150,
    },
  ]

  if (loading) {
    return (
      <Box mt={6}>
        <Loading />
      </Box>
    )
  }

  return <DataGrid<Buyer> rowData={rowData} columnDefs={columnDefs} />
}

export default BuyersTable
