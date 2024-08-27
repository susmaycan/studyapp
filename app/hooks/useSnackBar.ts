import { useState } from 'react'

export default function useSnackBar() {
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [snackBarText, setSnackBarText] = useState('')

  const hideSnackBar = () => {
    setSnackBarText('')
    setShowSnackBar(false)
  }

  const displaySnackBar = (text: string) => {
    setSnackBarText(text)
    setShowSnackBar(true)
  }

  return { displaySnackBar, hideSnackBar, showSnackBar, snackBarText }
}
