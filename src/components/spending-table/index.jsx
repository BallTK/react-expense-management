import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './spending-table.css'
const columns = [
  {
    field: 'item',
    headerName: 'Item',
    type: 'string',
    editable: false,
    width: 240
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    editable: false,
    width: 240
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 240,
    valueFormatter: (record) => {
      const formattedValue = record.value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return `$${formattedValue}`
    },
  },
];

export const SpendingTable = ({ sortedSpendings, setSelected }) => {
  return (
    <Box>
      <DataGrid
        style={{ height: 372, width: '100%' }}
        disableColumnMenu
        rows={sortedSpendings}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection
        checkboxSelectionVisibleOnly
        getRowClassName={(params) => {
          return params.row.isHighlighted ? "max-amount-row" : ""
        }}
        onRowSelectionModelChange={(ids) => {
          setSelected(ids.reduce((prev, curr) => {
            return {
              ...prev, 
              [curr]: 1
            }
          }, {}))
        }}
      />
      </Box>
  )
}