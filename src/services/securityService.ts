import CryptoJS from 'crypto-js'

class SecurityService {
  private static SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'default_secret_key'

  static encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString()
    } catch (error) {
      console.error('Encryption failed:', error)
      return data
    }
  }

  static decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.error('Deszyfrowanie nie powiodło się:', error)
      return ''
    }
  }

  static generateUniqueIdentifier(): string {
    return CryptoJS.lib.WordArray.random(16).toString()
  }

  static hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString()
  }

  static validatePasswordStrength(password: string): boolean {
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    )
  }
}

export default SecurityService