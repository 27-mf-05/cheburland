const DEFAULT_SW_FILE_NAME = 'service-worker.js'

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

class AppServiceWorker {
  private _swFileName: string

  constructor(swFileName: string) {
    this._swFileName = swFileName
  }

  register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register(this._swFileName, { scope: '/' })
          .then(registration => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
          })
          .catch((error: string) => {
            console.error('ServiceWorker registration failed: ', error)
          })
      })
    }
  }

  unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister().then(() => 'ServiceWorker unregister')
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}

export default new AppServiceWorker(DEFAULT_SW_FILE_NAME)
