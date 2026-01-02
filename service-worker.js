// ============================================
// SERVICE WORKER - PWA Offline Support
// Version 1.0.0
// ============================================

const CACHE_NAME = 'voice-generator-v1.0.0';
const RUNTIME_CACHE = 'voice-generator-runtime';

// Files to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/heebo/v21/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysd0mm.woff2'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old cache versions
              return cacheName.startsWith('voice-generator-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch Event - Network first, fall back to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin && !url.origin.includes('googleapis.com') && !url.origin.includes('gstatic.com')) {
    return;
  }

  // Skip chrome extensions
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }

  // API requests - Network only
  if (request.url.includes('/api/') || request.url.includes('fish.audio')) {
    event.respondWith(fetch(request));
    return;
  }

  // Audio files - Cache first, then network
  if (request.destination === 'audio' || request.url.includes('.mp3') || request.url.includes('.wav') || request.url.includes('.ogg')) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] Serving audio from cache:', request.url);
            return cachedResponse;
          }

          return fetch(request).then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });

            return response;
          });
        })
    );
    return;
  }

  // Everything else - Network first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache if not a valid response
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache for next time
        caches.open(RUNTIME_CACHE)
          .then((cache) => {
            cache.put(request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[Service Worker] Serving from cache (offline):', request.url);
              return cachedResponse;
            }

            // If no cache, return offline page
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }

            // Return a basic response for other requests
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Message Event - Handle messages from clients
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('[Service Worker] Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Background Sync - For future implementation
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);

  if (event.tag === 'sync-recordings') {
    event.waitUntil(syncRecordings());
  }
});

async function syncRecordings() {
  // Placeholder for background sync logic
  console.log('[Service Worker] Syncing recordings...');
  // Could upload recordings to server when online
}

// Push Notification - For future implementation
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'התקבלה הודעה חדשה',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    tag: 'voice-notification',
    requireInteraction: false,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'פתח',
        icon: '/icons/open.png'
      },
      {
        action: 'close',
        title: 'סגור',
        icon: '/icons/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('🎤 מחולל קול AI', options)
  );
});

// Notification Click - Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic Background Sync - For future implementation
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(checkForUpdates());
  }
});

async function checkForUpdates() {
  console.log('[Service Worker] Checking for updates...');
  // Could check for app updates
}

// Error Handling
self.addEventListener('error', (event) => {
  console.error('[Service Worker] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[Service Worker] Unhandled rejection:', event.reason);
});

// Logging
console.log('[Service Worker] Script loaded');
console.log('[Service Worker] Cache version:', CACHE_NAME);