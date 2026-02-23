/**
 * FAQ Accordion Component
 * 
 * ARCHITECTURE OVERVIEW:
 * - Event delegation on the accordion container handles all clicks
 * - Only one section can be open at a time (exclusive accordion)
 * - Clicking an open section collapses it (toggle behavior)
 * - Uses CSS classes for state management, no inline styles
 * - Smooth animations via CSS max-height transitions
 * - Fully accessible with ARIA attributes
 */

(function() {
  'use strict';

  // DOM elements
  const accordionRoot = document.getElementById('accordionGroup');

  /**
   * Closes all accordion items by removing expanded class
   * and updating ARIA attributes
   */
  function collapseAll() {
    const allWrappers = accordionRoot.querySelectorAll('.answer-wrapper');
    const allButtons = accordionRoot.querySelectorAll('.accordion-btn');

    allWrappers.forEach(wrapper => {
      wrapper.classList.remove('expanded');
    });

    allButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Opens a specific accordion item
   * If the item is already open, it collapses (toggle)
   * Otherwise, collapses all and opens the selected item
   * 
   * @param {HTMLElement} button - The clicked button element
   * @param {HTMLElement} wrapper - The associated answer wrapper
   */
  function openItem(button, wrapper) {
    // Toggle behavior: if clicked item is open, just close it
    if (wrapper.classList.contains('expanded')) {
      wrapper.classList.remove('expanded');
      button.setAttribute('aria-expanded', 'false');
      return; // Exit early, no other items affected
    }

    // Exclusive accordion: collapse all first, then open selected
    collapseAll();

    wrapper.classList.add('expanded');
    button.setAttribute('aria-expanded', 'true');
  }

  /**
   * Event delegation: listen for clicks on the accordion container
   * This is more efficient than attaching listeners to each button
   */
  accordionRoot.addEventListener('click', function(event) {
    // Find the closest button element (handles clicks on icon or span)
    const button = event.target.closest('.accordion-btn');
    if (!button) return; // Click wasn't on a button or its children

    // Get the associated answer wrapper (next sibling in DOM structure)
    const wrapper = button.nextElementSibling;

    // Validate that we have the correct element
    if (!wrapper || !wrapper.classList.contains('answer-wrapper')) return;

    // Prevent any default behavior (though button has none)
    event.preventDefault();

    // Delegate to our openItem function
    openItem(button, wrapper);
  });

  // No additional initialization needed as first item is expanded via HTML
  // This maintains the "first item expanded by default" requirement
})();