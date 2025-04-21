// Function to parse markdown content
function parseMarkdownContent(contentElement) {
  const markdownElements = contentElement.querySelectorAll('.markdown');
  markdownElements.forEach(element => {
    const raw = element.textContent;
    element.innerHTML = marked.parse(raw);
  });
}

// Reinitialize HTMX on swapped content
function initializeHTMX(contentElement) {
  // Rebind HTMX to the new content (to ensure things like 'Read more' work)
  htmx.process(contentElement); // This reprocesses HTMX elements inside contentElement
}

// Track page state change when HTMX swaps content
document.body.addEventListener('htmx:afterSwap', function(evt) {
  const content = evt.detail.target;
  const newState = {
    url: window.location.pathname + window.location.search,  // The current URL
    title: document.title,  // Current page title
    content: content.innerHTML,  // The loaded content to store
  };

  // Push a new state into the history stack (so it tracks)
  history.pushState(newState, newState.title, newState.url);

  // Convert Markdown content if needed
  if (content.tagName === "DIV" && content.id === "content") {
    parseMarkdownContent(content);  // Parse Markdown for the new content
    initializeHTMX(content);  // Reinitialize HTMX behavior
  }
});

// Handle the back button or forward navigation
window.addEventListener('popstate', function(event) {
  const state = event.state;
  if (state) {
    // On navigating back/forward, we load the stored content from history
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = state.content;
    document.title = state.title;  // Restore the title

    // Re-parse Markdown content and rebind HTMX behavior
    parseMarkdownContent(contentElement);
    initializeHTMX(contentElement); // Reinitialize HTMX behavior
  }
});

// Initially load content on page load (to restore content from history)
document.addEventListener('DOMContentLoaded', function() {
  if (history.state) {
    // If there is a history state, restore the content from the history
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = history.state.content;
    document.title = history.state.title;  // Restore the title

    // Re-parse Markdown content and rebind HTMX behavior
    parseMarkdownContent(contentElement);
    initializeHTMX(contentElement); // Reinitialize HTMX behavior
  }
});
