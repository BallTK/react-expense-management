import { useCallback, useEffect, useState } from 'react'
import './expense-management-page.css'
import { Stack } from '@mui/material'
import { AddExpenseDialog } from '../../components/add-expense-dialog'
import { ButtonGroup } from '../../components/button-group'
import { SpendingTable } from '../../components/spending-table'
import { useGetCatFacts } from '../../hooks/use-get-cat-facts'
import { sortAndFormatSpendings } from '../../utils/sort-format-spendings'

const initialSpendings =  [
  {
    id: 'Diamond Cat Collar0',
    item: 'Diamond Cat Collar',
    category: 'Accessory',
    amount: 1000,
    isHighlighted: true
  },
  {
    id: 'Self Cleaning Litter Box1',
    item: 'Self Cleaning Litter Box',
    category: 'Furniture',
    amount: 500
  },
  {
    id: 'Cat food2',
    item: 'Cat food',
    category: 'Food',
    amount: 100
  },
]
export const ExpenseManagementPage = () => {
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [spendingRecord, setSpendingRecord] = useState(null)
  const [selected, setSelected] = useState(null)
  const [spendings, setSpendings] = useState(initialSpendings)

  useGetCatFacts()
  useEffect(() => {
    if (spendingRecord) {
      setSpendings(sortAndFormatSpendings([...spendings, {
        ...spendingRecord,
        amount: parseInt(spendingRecord.amount, 10)
      }]))
    }
    setSpendingRecord(null)
  }, [JSON.stringify(spendingRecord)])

  const onClickDelete = useCallback(() => {
    const updatedSpendings = sortAndFormatSpendings(spendings.filter(spending => !selected[spending.id]))
    setSpendings(updatedSpendings)
  }, [JSON.stringify(selected), spendings.length])

  return (
    <Stack 
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={4}
    className="container"
    >
      <AddExpenseDialog setSpendingRecord={setSpendingRecord} isOpened={isDialogOpened} onClose={() => setIsDialogOpened(false)}/>
      <ButtonGroup onClickAdd={() => setIsDialogOpened(true)} onClickDelete={onClickDelete}/>
      <SpendingTable sortedSpendings={spendings} setSelected={setSelected}/>
    </Stack>
  )
}