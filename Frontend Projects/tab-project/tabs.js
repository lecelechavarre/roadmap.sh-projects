// ----- Tabs behavior (click + keyboard) -----
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab){
  // Deactivate all tabs
  tabs.forEach(t => {
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });

  // Hide all panels
  panels.forEach(p => p.setAttribute('aria-hidden', 'true'));

  // Activate current tab
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  tab.focus({preventScroll:true});

  // Show corresponding panel
  const panelId = tab.getAttribute('aria-controls');
  document.getElementById(panelId).setAttribute('aria-hidden', 'false');
}

// Click handling
tabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab));
});

// Keyboard navigation (ArrowLeft/ArrowRight, Home, End, Enter/Space)
const keyToDir = {
  ArrowRight: 1,
  ArrowLeft: -1
};

document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const currentIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');

  if (e.key in keyToDir) {
    e.preventDefault();
    const dir = keyToDir[e.key];
    const nextIndex = (currentIndex + dir + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
  } else if (e.key === 'Home') {
    e.preventDefault();
    tabs[0].focus();
  } else if (e.key === 'End') {
    e.preventDefault();
    tabs[tabs.length - 1].focus();
  } else if (e.key === 'Enter' || e.key === ' ') {
    // Activate the focused tab
    const focused = document.activeElement;
    if (focused?.getAttribute('role') === 'tab') {
      e.preventDefault();
      activateTab(focused);
    }
  }
});