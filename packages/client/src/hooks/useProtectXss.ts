export const useProtectXss = () => {
  const sanitizeInput = (input: string): string => {
    const regex = /[&<>"']/g
    const replacements: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '': '&#x60;',
    }
    return input.replace(regex, match => replacements[match])
  }

  const validateInput = (input: string): boolean => {
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    return !regex.test(input)
  }

  const checkInput = (input: string): string | null => {
    if (!input) return null
    const sanitizedInput = sanitizeInput(input)
    return validateInput(sanitizedInput) ? sanitizedInput : null
  }

  return {
    checkInput,
  }
}
