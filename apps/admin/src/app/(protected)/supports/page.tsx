'use client'
import AddButton from '@/components/common/AddButton';
import PageTitle from '@/components/common/PageTitle';
import SupportsTable from '@/components/supports/SupportsTable';
import fa from '@/i18n/fa';
import { Box } from '@mui/material';

const Supports = () => {
    const handleAddSupporter = () => {
        console.log('Add supporter clicked');
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <PageTitle title={fa.supports} />
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <AddButton label="افزودن پشتیبان جدید" onClick={handleAddSupporter} />
            </Box>
            <SupportsTable />
        </Box>
    )
}

export default Supports