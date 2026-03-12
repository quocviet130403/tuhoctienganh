// Simple hash-based SPA router

const routes = {};
let currentRoute = null;

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

export function startRouter() {
  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    currentRoute = hash;

    // Try exact match first
    if (routes[hash]) {
      routes[hash]();
      updateNavActive(hash);
      return;
    }

    // Try pattern match (e.g., /lesson/:day)
    for (const [pattern, handler] of Object.entries(routes)) {
      const regex = pattern.replace(/:(\w+)/g, '([^/]+)');
      const match = hash.match(new RegExp(`^${regex}$`));
      if (match) {
        handler(...match.slice(1));
        updateNavActive(pattern.split('/').slice(0, 2).join('/'));
        return;
      }
    }

    // Fallback to home
    if (routes['/']) routes['/']();
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function updateNavActive(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.dataset.href;
    if (href === path || (path.startsWith(href) && href !== '/')) {
      item.classList.add('active');
    } else if (href === '/' && path === '/') {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
