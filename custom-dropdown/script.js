document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const dropdown = document.getElementById('custom-dropdown');
    const dropdownSelected = dropdown.querySelector('.dropdown-selected');
    const selectedText = dropdown.querySelector('.selected-text');
    const dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
    const currentSelectionDisplay = document.getElementById('current-selection');
    const resetBtn = document.getElementById('reset-btn');
    const selectThirdBtn = document.getElementById('select-third-btn');
    
    // State variables
    let isOpen = false;
    let selectedValue = null;
    let selectedOptionElement = null;
    
    // Initialize dropdown
    function initDropdown() {
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                closeDropdown();
            }
        });
        
        // Toggle dropdown when clicking on selected area
        dropdownSelected.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleDropdown();
        });
        
        // Handle option selection
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(this);
            });
            
            // Add keyboard navigation
            option.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectOption(this);
                }
            });
        });
        
        // Reset button functionality
        resetBtn.addEventListener('click', resetSelection);
        
        // Select third item button functionality
        selectThirdBtn.addEventListener('click', function() {
            const thirdOption = document.querySelector('.dropdown-option[data-value="third"]');
            selectOption(thirdOption);
        });
        
        // Set initial ARIA attributes
        updateAriaAttributes();
    }
    
    // Toggle dropdown open/closed
    function toggleDropdown() {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    // Open the dropdown
    function openDropdown() {
        isOpen = true;
        dropdown.classList.add('open');
        dropdown.setAttribute('aria-expanded', 'true');
        
        // Focus the selected option if exists, otherwise first option
        if (selectedOptionElement) {
            selectedOptionElement.focus();
        } else {
            dropdownOptions[0].focus();
        }
        
        updateAriaAttributes();
    }
    
    // Close the dropdown
    function closeDropdown() {
        isOpen = false;
        dropdown.classList.remove('open');
        dropdown.setAttribute('aria-expanded', 'false');
        updateAriaAttributes();
    }
    
    // Select an option
    function selectOption(optionElement) {
        // Get the value and text
        const value = optionElement.getAttribute('data-value');
        const text = optionElement.querySelector('.option-text').textContent;
        
        // Update selected value
        selectedValue = value;
        
        // Update selected text display
        selectedText.textContent = text;
        dropdownSelected.classList.add('has-selection');
        
        // Update current selection display
        currentSelectionDisplay.textContent = text;
        
        // Remove selected class from all options
        dropdownOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
        });
        
        // Add selected class to the clicked option
        optionElement.classList.add('selected');
        optionElement.setAttribute('aria-selected', 'true');
        
        // Store reference to selected option
        selectedOptionElement = optionElement;
        
        // Close dropdown
        closeDropdown();
        
        // Log selection for debugging
        console.log(`Selected: ${text} (${value})`);
        
        updateAriaAttributes();
    }
    
    // Reset selection to default
    function resetSelection() {
        selectedValue = null;
        selectedOptionElement = null;
        
        // Reset selected text display
        selectedText.textContent = 'Select an item';
        dropdownSelected.classList.remove('has-selection');
        
        // Reset current selection display
        currentSelectionDisplay.textContent = 'None';
        
        // Remove selected class from all options
        dropdownOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
        });
        
        // Close dropdown if open
        closeDropdown();
        
        console.log('Selection reset');
        updateAriaAttributes();
    }
    
    // Update ARIA attributes for accessibility
    function updateAriaAttributes() {
        const selectedOption = dropdown.querySelector('.dropdown-option.selected');
        
        if (selectedOption) {
            const selectedText = selectedOption.querySelector('.option-text').textContent;
            dropdown.setAttribute('aria-activedescendant', selectedOption.id || '');
            dropdownSelected.setAttribute('aria-label', `Selected: ${selectedText}`);
        } else {
            dropdown.removeAttribute('aria-activedescendant');
            dropdownSelected.setAttribute('aria-label', 'Select an item');
        }
    }
    
    // Initialize keyboard navigation for dropdown
    function initKeyboardNavigation() {
        dropdown.addEventListener('keydown', function(event) {
            const options = Array.from(dropdownOptions);
            const currentIndex = selectedOptionElement ? 
                options.indexOf(selectedOptionElement) : -1;
            
            switch(event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    if (!isOpen) {
                        openDropdown();
                    } else {
                        const nextIndex = (currentIndex + 1) % options.length;
                        options[nextIndex].focus();
                    }
                    break;
                    
                case 'ArrowUp':
                    event.preventDefault();
                    if (!isOpen) {
                        openDropdown();
                    } else {
                        const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
                        options[prevIndex].focus();
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (!isOpen) {
                        openDropdown();
                    } else if (document.activeElement.classList.contains('dropdown-option')) {
                        selectOption(document.activeElement);
                    }
                    break;
                    
                case 'Escape':
                    closeDropdown();
                    break;
                    
                case 'Home':
                    if (isOpen) {
                        event.preventDefault();
                        options[0].focus();
                    }
                    break;
                    
                case 'End':
                    if (isOpen) {
                        event.preventDefault();
                        options[options.length - 1].focus();
                    }
                    break;
            }
        });
    }
    
    // Initialize everything
    initDropdown();
    initKeyboardNavigation();
    
    // Log initialization
    console.log('Custom dropdown initialized');
});