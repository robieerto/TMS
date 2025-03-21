export const formatDateTime = (value: string): string => {
  return (
    new Date(value).toLocaleDateString('sk-SK').replaceAll('. ', '.') +
    ' ' +
    new Date(value).toLocaleTimeString('sk-SK', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
}
