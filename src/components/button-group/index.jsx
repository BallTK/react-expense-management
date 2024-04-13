import { Box, Button } from "@mui/material"
import './button-group.css'

export const ButtonGroup = ({ onClickAdd, onClickDelete}) => {
  return <Box className="btn-group-container">
    <Button onClick={onClickAdd} variant="contained">Add Expense</Button>
    <Button onClick={onClickDelete} variant="contained">Delete Expense</Button>
  </Box>
}