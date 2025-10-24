import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // 1. Desactivar smooth scroll temporalmente
    const htmlElement = document.documentElement
    const originalScrollBehavior = htmlElement.style.scrollBehavior
    htmlElement.style.scrollBehavior = 'auto'

    // 2. Scroll inmediato usando múltiples métodos
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // 3. Restaurar smooth scroll después de un frame
    requestAnimationFrame(() => {
      htmlElement.style.scrollBehavior = originalScrollBehavior
    })
  }, [pathname])

  return null
}

export default ScrollToTop
