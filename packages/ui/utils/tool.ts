export const shortenAddress = (address?: string, digits = 5) => {
  if (!address) return ""
  return (
    address.substring(0, digits) +
    "..." +
    address.substring(address.length - digits)
  )
}
