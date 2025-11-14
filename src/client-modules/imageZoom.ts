import mediumZoom from 'medium-zoom';

let zoomInstance: ReturnType<typeof mediumZoom> | null = null;

function initImageZoom() {
  if (zoomInstance) {
    try {
      zoomInstance.detach();
    } catch (e) {
      console.warn('Failed to detach zoom instance:', e);
    }
    zoomInstance = null;
  }

  const selector = 'article img:not(.no-zoom), .markdown img:not(.no-zoom), .theme-doc-markdown img:not(.no-zoom), .docItemContainer img:not(.no-zoom)';
  
  const images = document.querySelectorAll<HTMLImageElement>(selector);
  const validImages: HTMLImageElement[] = [];

  images.forEach((img) => {
    if (img.closest('nav, header, footer, .navbar, .footer')) {
      return;
    }
    validImages.push(img);
  });

  if (validImages.length === 0) {
    return;
  }

  try {
    zoomInstance = mediumZoom(validImages, {
      background: 'rgba(0, 0, 0, 0.8)',
      margin: 24,
      scrollOffset: 0,
    });
  } catch (e) {
    console.error('Failed to initialize medium-zoom:', e);
  }
}

function waitForImages(selector: string, callback: () => void, maxWait = 5000) {
  const images = document.querySelectorAll<HTMLImageElement>(selector);
  let loadedCount = 0;
  const totalImages = images.length;

  if (totalImages === 0) {
    callback();
    return;
  }

  const checkComplete = () => {
    loadedCount++;
    if (loadedCount >= totalImages) {
      callback();
    }
  };

  images.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      checkComplete();
    } else {
      img.addEventListener('load', checkComplete, { once: true });
      img.addEventListener('error', checkComplete, { once: true });
    }
  });

  setTimeout(() => {
    callback();
  }, maxWait);
}

function setupImageZoom() {
  if (typeof window === 'undefined') {
    return;
  }

  const init = () => {
    const selector = 'article img:not(.no-zoom), .markdown img:not(.no-zoom), .theme-doc-markdown img:not(.no-zoom), .docItemContainer img:not(.no-zoom)';
    waitForImages(selector, () => {
      setTimeout(initImageZoom, 100);
    }, 3000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', () => {
    setTimeout(init, 200);
  });

  let timeoutId: NodeJS.Timeout | null = null;
  const observer = new MutationObserver(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(init, 300);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  if ((window as any).docusaurus?.router) {
    (window as any).docusaurus.router.events.on('routeDidUpdate', () => {
      setTimeout(init, 500);
    });
  }
}

export default function onRouteDidUpdate() {
  setTimeout(initImageZoom, 400);
}

setupImageZoom();

