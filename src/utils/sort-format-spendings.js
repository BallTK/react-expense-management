export const sortAndFormatSpendings = (spendings) => {
  const sortedSpendings = spendings
  .toSorted((curr, next) => next.amount - curr.amount)
  return sortedSpendings.map((spending, index) => ({
      ...spending,
      id: `${spending.item}${index}`,
      isHighlighted: spending.amount >= sortedSpendings[0].amount}
    )
  )
}