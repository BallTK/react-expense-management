import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from "react"
import './dialog.css'
import { AddExpenseForm } from "../add-expense-form"
import { catFactQueryKey } from "../../hooks/use-get-cat-facts";

export const AddExpenseDialog = ({ isOpened, onClose, setSpendingRecord }) => {
  const [expense, setExpense] = useState(null);
  const [isExpenseValid, setIsExpenseValid] = useState(false);
  const [catFact, setCatFact] = useState('')
  const queryClient = useQueryClient()
  const factData = queryClient.getQueryData(catFactQueryKey)

  useEffect(() => {
    if(isOpened) {
      const randomIndex = Math.floor(Math.random() * 20)
      setCatFact(factData?.data?.data && factData.data.data[randomIndex]?.fact)
    }
  }, [isOpened])

  const onDialogClosed = () => {
    setExpense(null)
    onClose()
  }
  return (
    <Dialog maxWidth='sm' fullWidth={true} open={isOpened} onClose={onDialogClosed}>
      <DialogTitle>
        <Box className='dialog-title-container'>
          <h2>Expense Detail</h2>
          <IconButton onClick={onDialogClosed}>
              <CloseIcon />
          </IconButton>
        </Box>
        <Typography>
          Random Cat fact: {catFact} 
        </Typography>
      </DialogTitle>
      <DialogContent style={{paddingTop: '8px', gap: '16px', display: 'flex', flexDirection: 'column'}}>
        <AddExpenseForm setExpense={setExpense} setIsExpenseValid={setIsExpenseValid}/>
        <Button disabled={!isExpenseValid} onClick={() => {
          setSpendingRecord(expense)          
          onDialogClosed()
        }} 
        variant="contained">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  )
}