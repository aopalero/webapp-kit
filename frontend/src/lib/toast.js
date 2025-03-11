import { useToast } from 'vue-toastification'

// Default options for toasts
const defaultOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

// Toast utility functions
export const toast = {
  success(message, options = {}) {
    const toast = useToast()
    toast.success(message, { ...defaultOptions, ...options })
  },
  
  error(message, options = {}) {
    const toast = useToast()
    toast.error(message, { ...defaultOptions, ...options })
  },
  
  info(message, options = {}) {
    const toast = useToast()
    toast.info(message, { ...defaultOptions, ...options })
  },
  
  warning(message, options = {}) {
    const toast = useToast()
    toast.warning(message, { ...defaultOptions, ...options })
  }
}

export default toast 