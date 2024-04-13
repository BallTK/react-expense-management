import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react";

export const AddExpenseForm = ({ setExpense, setIsExpenseValid }) => {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [itemError, setItemError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    setExpense({
      item,
      category,
      amount
    })
    const isAllFieldValid = !itemError && !categoryError && !amountError
    const isAllFieldFilled = !!item && !!category && !!amount
    setIsExpenseValid(isAllFieldValid && isAllFieldFilled)
  }, [item, category, amount])
  
  const handleTextChange = (event, setState, setError) => {
    setState(event.target.value);
    setError(!event.target.validity.valid);
  }

  const handleSelect = (event, setState, setError) => {
    setState(event.target.value);
    console.log(!event.target.value)
    setError(!event.target.value);
  }
  return (<Stack spacing={2}>
    <TextField 
      required
      value={item}
      error={itemError} 
      label="Item" 
      variant="outlined"
      onChange={(event) => {
        handleTextChange(event, setItem, setItemError)
      }}
      helperText={
        itemError ? "Please enter your item" : " "
      }
    />
    <FormControl fullWidth error={categoryError}>
      <InputLabel id="category-input">Category *</InputLabel>
      <Select
      id="category-input"
      value={category}
      label="Category"
      onChange={(event) => {
        handleSelect(event, setCategory, setCategoryError)
      }}
      >
        <MenuItem value='Food'>Food</MenuItem>
        <MenuItem value='Furniture'>Furniture</MenuItem>
        <MenuItem value='Accessory'>Accessory</MenuItem>
        <MenuItem value='Miscellaneous'>Miscellaneous</MenuItem>
      </Select>
      <FormHelperText> Require </FormHelperText>
    </FormControl>
    <TextField 
      required 
      value={amount}
      error={amountError} 
      label="Amount" 
      variant="outlined" 
      onChange={(event) => {
        handleTextChange(event, setAmount, setAmountError)
      }}
      helperText={
        amountError ? "Please enter your amount(Numbers only)" : " "
      }
      inputProps={{
        pattern: "^[0-9]*$",
      }}/>
  </Stack>)
}
