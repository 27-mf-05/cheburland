const DEFAULT_SW_FILE_NAME = 'service-worker.js'
class AppServiceWorker {
  protected _swFileName: string
  protected _serviceWorker: ServiceWorkerContainer | undefined

  constructor(swFileName: string) {
    if ('serviceWorker' in navigator) {
      this._serviceWorker = navigator.serviceWorker
    }
    this._swFileName = swFileName
  }

  register() {
    window.addEventListener('load', () => {
      this._serviceWorker
        ?.register(this._swFileName, { scope: '/' })
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

  unregister() {
    this._serviceWorker?.ready
      .then(registration => {
        registration.unregister().then(() => 'ServiceWorker unregister')
      })
      .catch(error => {
        console.error(error.message)
      })
  }
}

export default new AppServiceWorker(DEFAULT_SW_FILE_NAME)
