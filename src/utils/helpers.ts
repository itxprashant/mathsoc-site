// Utility functions for scroll handling and other common functionality

export const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

export const addEventIcons = () => {
  // Add icons to event info items (for Events page)
  setTimeout(() => {
    document.querySelectorAll('.ev-content .ev-venue').forEach(element => {
      if (!element.querySelector('.fa-map-marker')) {
        element.innerHTML = "<i class='fa fa-map-marker' style='width: 18px;text-align:center;'></i> &nbsp;" + element.innerHTML;
      }
    });
    
    document.querySelectorAll('.ev-content .ev-time').forEach(element => {
      if (!element.querySelector('.fa-clock-o')) {
        element.innerHTML = "<i class='fa fa-clock-o' style='width: 18px;text-align:center;'></i> &nbsp;" + element.innerHTML;
      }
    });
    
    document.querySelectorAll('.ev-content .ev-date').forEach(element => {
      if (!element.querySelector('.fa-calendar')) {
        element.innerHTML = "<i class='fa fa-calendar' style='width: 18px;text-align:center;'></i> &nbsp;" + element.innerHTML;
      }
    });
  }, 100);
};

export const zeroPad = (num: number): string => String(num).padStart(2, '0');

export const fetchRSSFeed = async (url: string) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    return xmlDoc;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return null;
  }
};

export const parseRSSItems = (xmlDoc: Document) => {
  const items = xmlDoc.querySelectorAll('item');
  return Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    summary: item.querySelector('description')?.textContent || item.querySelector('summary')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
    pubDate: item.querySelector('pubDate')?.textContent || ''
  }));
};