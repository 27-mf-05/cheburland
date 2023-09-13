type SanitizedObject = {
  [key: string]: string | number | SanitizedObject
}

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

  const checkObject = (obj: { [key: string]: any }): SanitizedObject | null => {
    if (!obj) return null

    const sanitizedObj: { [key: string]: any } = {}

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        const sanitizedInput = checkInput(obj[key])
        if (sanitizedInput !== null) {
          sanitizedObj[key] = sanitizedInput
        }
      } else if (typeof obj[key] === 'object') {
        const sanitizedSubObj = checkObject(obj[key])
        if (sanitizedSubObj !== null) {
          sanitizedObj[key] = sanitizedSubObj
        }
      } else {
        sanitizedObj[key] = obj[key]
      }
    }

    return Object.keys(sanitizedObj).length > 0 ? sanitizedObj : null
  }

  return {
    checkInput,
    checkObject,
  }
}
