'use client'

import React, {
  useEffect,
  useState,
} from 'react';

import type { ColDef } from 'ag-grid-community';

import DataGrid from '@/components/DataGrid';
import { Box } from '@mui/material';

import ActionsCell from '../common/ActionCell';
import Loading from '../common/Loading';

export interface Buyer {
  id: string
  userId: string
  firstName: string
  lastName: string
  nationalCode: string
  city: string
  province: string
  addressDescription: string
  phone: string
  gender: 'Male' | 'Female'
  activityArea: 'North' | 'South' | 'East' | 'West' | 'Tehran'
  companyName: string
  numberPlate: string
  businessLicenseFileId: string
  nationalCardFileId: string
  profileFormFileId: string
}

const BuyersTable: React.FC<{
  data?: Buyer[]
  loading: boolean
  onEdit?: (buyer: Buyer) => void
  onDelete?: (id: string) => void
  onReward?: (userId: string) => void
}> = ({ data = [], loading, onEdit, onDelete, onReward }) => {
  const [rowData, setRowData] = useState<Buyer[]>([])

  useEffect(() => {
    setRowData(data)
  }, [data])

  const columnDefs: ColDef<Buyer>[] = [
    { headerName: 'نام', field: 'firstName', flex: 1, minWidth: 100 },
    { headerName: 'نام خانوادگی', field: 'lastName', flex: 1, minWidth: 120 },
    { headerName: 'نام شرکت', field: 'companyName', flex: 1, minWidth: 120 },
    { headerName: 'کد ملی', field: 'nationalCode', flex: 1, minWidth: 120 },
    { headerName: 'شماره تماس', field: 'phone', flex: 1, minWidth: 130 },
    { headerName: 'استان', field: 'province', flex: 1, minWidth: 100 },
    { headerName: 'شهر', field: 'city', flex: 1, minWidth: 100 },
    { headerName: 'آدرس', field: 'addressDescription', flex: 2, minWidth: 200 },
    { headerName: 'پلاک خودرو', field: 'numberPlate', flex: 1, minWidth: 120 },
    {
      headerName: 'جنسیت',
      field: 'gender',
      valueFormatter: p => (p.value === 'Male' ? 'مرد' : 'زن'),
      flex: 1,
      minWidth: 80
    },
    {
      headerName: 'منطقه فعالیت',
      field: 'activityArea',
      valueFormatter: p => {
        const areaMap: Record<string, string> = {
          North: 'شمال',
          South: 'جنوب',
          East: 'شرق',
          West: 'غرب',
          Tehran: 'تهران',
        }
        return areaMap[p.value] || p.value
      },
      flex: 1,
      minWidth: 120,
    },
    {
      headerName: 'عملیات',
      cellRenderer: ActionsCell,
      cellRendererParams: { onEdit, onDelete, onReward },
      maxWidth: 200,
      pinned: 'left',
      sortable: false,
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
