import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  speed?: number
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState<string>("")

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((oldText) => oldText + text.charAt(index))
      }
      index++
      if (index > text.length) clearInterval(intervalId)
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return (
    <div>
      {displayedText.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.1 }}
          className="text-white text-[35px] font-capian"
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default TypingText
