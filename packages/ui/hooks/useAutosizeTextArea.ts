import { useEffect } from "react"

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px"
      const prevScrollHeight = textAreaRef.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = textAreaRef.scrollHeight + "px"

      // Compare the previous scrollHeight with the new one
      const newScrollHeight = textAreaRef.scrollHeight
      if (newScrollHeight < prevScrollHeight) {
        textAreaRef.scrollTop =
          textAreaRef.scrollHeight - textAreaRef.clientHeight
      }
    }
  }, [textAreaRef, value])
}

export default useAutosizeTextArea
