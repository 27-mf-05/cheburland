const CACHE_NAME = 'cheburland'
const CACHE_VERSION = 'v1'
const FULL_CACHE_NAME = `${CACHE_NAME}/${CACHE_VERSION}`
const CACHE_ALLOW_LIST = [FULL_CACHE_NAME]
const URLS = ['./', './index.html', './cheburashka.png']
const SW_EVENTS = {
  install: 'install',
  activate: 'activate',
  fetch: 'fetch',
}

self.addEventListener(SW_EVENTS.install, event => {
  console.log(SW_EVENTS.install)
  event.waitUntil(preCache())
})

self.addEventListener(SW_EVENTS.activate, event => {
  console.log(SW_EVENTS.activate)
  event.waitUntil(deleteNotAvailableCache())
})

self.addEventListener(SW_EVENTS.fetch, event => {
  console.info(SW_EVENTS.fetch)
  event.respondWith(update(event.request))
})

const preCache = () => {
  return caches
    .open(FULL_CACHE_NAME)
    .then(cache => {
      return cache.addAll(URLS)
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

const deleteNotAvailableCache = () => {
  return caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (!CACHE_ALLOW_LIST.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    )
  })
}

const update = request => {
  return fetch(request)
    .then(response => {
      const responseClone = response.clone()

      caches.open(FULL_CACHE_NAME).then(cache => {
        cache.put(request.url, responseClone)
      })
      return response
    })
    .catch(() => caches.match(request))
}
