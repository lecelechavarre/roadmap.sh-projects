// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Luxon
    const { DateTime } = luxon;
    
    // Get DOM elements
    const birthDateInput = document.getElementById('birthDate');
    const ageForm = document.getElementById('ageForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('resultContainer');
    const ageResult = document.getElementById('ageResult');
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    const selectedDateElement = document.getElementById('selectedDate');
    const yearsValue = document.getElementById('yearsValue');
    const monthsValue = document.getElementById('monthsValue');
    const daysValue = document.getElementById('daysValue');
    const totalDays = document.getElementById('totalDays');
    const exampleButtons = document.querySelectorAll('.example-btn');
    
    // Initialize Datepicker with custom options
    const datepicker = new Datepicker(birthDateInput, {
        format: 'dd/mm/yyyy',
        autohide: true,
        todayHighlight: true,
        orientation: 'bottom',
        title: 'Select your birth date',
        language: 'en',
        weekStart: 1
    });
    
    // Function to calculate age using Luxon
    function calculateAge(birthDateStr) {
        // Parse the date string in DD/MM/YYYY format
        const dateParts = birthDateStr.split('/');
        
        // Validate the date format
        if (dateParts.length !== 3) {
            throw new Error('Invalid date format. Please use DD/MM/YYYY.');
        }
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        
        // Create Luxon DateTime object
        const birthDate = DateTime.fromObject({
            day: day,
            month: month,
            year: year
        });
        
        // Validate the date
        if (!birthDate.isValid) {
            throw new Error('Invalid date. Please enter a valid birth date.');
        }
        
        // Get current date
        const now = DateTime.now();
        
        // Check if birth date is in the future
        if (birthDate > now) {
            throw new Error('Birth date cannot be in the future.');
        }
        
        // Calculate the difference between dates
        const diff = now.diff(birthDate, ['years', 'months', 'days']);
        
        // Extract the values
        const years = Math.floor(diff.years);
        const months = Math.floor(diff.months);
        const days = Math.floor(diff.days);
        
        // Calculate total days
        const totalDaysCount = Math.floor(now.diff(birthDate, 'days').days);
        
        return {
            years,
            months,
            days,
            totalDays: totalDaysCount,
            birthDate: birthDate
        };
    }
    
    // Function to display age result
    function displayAgeResult(ageData, birthDateStr) {
        // Format the selected date for display
        const dateParts = birthDateStr.split('/');
        const formattedDate = DateTime.fromObject({
            day: parseInt(dateParts[0], 10),
            month: parseInt(dateParts[1], 10),
            year: parseInt(dateParts[2], 10)
        }).toLocaleString(DateTime.DATE_FULL);
        
        // Update the UI with calculated values
        selectedDateElement.textContent = formattedDate;
        yearsValue.textContent = ageData.years;
        monthsValue.textContent = ageData.months;
        daysValue.textContent = ageData.days;
        totalDays.textContent = ageData.totalDays.toLocaleString();
        
        // Show result and hide error
        ageResult.style.display = 'block';
        errorContainer.style.display = 'none';
        
        // Add animation effect
        animateValue(yearsValue, 0, ageData.years, 800);
        animateValue(monthsValue, 0, ageData.months, 800);
        animateValue(daysValue, 0, ageData.days, 800);
        
        // Animate total days
        const totalDaysElement = document.getElementById('totalDays');
        animateValue(totalDaysElement, 0, ageData.totalDays, 1000);
    }
    
    // Function to animate number values
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smoother animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(start + (end - start) * easeProgress);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end.toLocaleString();
            }
        };
        
        requestAnimationFrame(step);
    }
    
    // Function to display error
    function displayError(message) {
        errorMessage.textContent = message;
        errorContainer.style.display = 'block';
        ageResult.style.display = 'none';
    }
    
    // Function to reset the form
    function resetForm() {
        ageForm.reset();
        ageResult.style.display = 'none';
        errorContainer.style.display = 'none';
        
        // Reset the datepicker
        datepicker.setDate(null);
        
        // Show initial message
        document.querySelector('.initial-message').style.display = 'block';
    }
    
    // Form submission handler
    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const birthDateStr = birthDateInput.value.trim();
        
        // Hide initial message
        document.querySelector('.initial-message').style.display = 'none';
        
        // Check if input is empty
        if (!birthDateStr) {
            displayError('Please enter your birth date.');
            return;
        }
        
        try {
            // Calculate age
            const ageData = calculateAge(birthDateStr);
            
            // Display result
            displayAgeResult(ageData, birthDateStr);
        } catch (error) {
            displayError(error.message);
        }
    });
    
    // Reset button handler
    resetBtn.addEventListener('click', resetForm);
    
    // Example button handlers
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exampleDate = this.getAttribute('data-date');
            birthDateInput.value = exampleDate;
            
            // Hide initial message
            document.querySelector('.initial-message').style.display = 'none';
            
            // Trigger the calculation
            try {
                const ageData = calculateAge(exampleDate);
                displayAgeResult(ageData, exampleDate);
            } catch (error) {
                displayError(error.message);
            }
        });
    });
    
    // Add a default date for demonstration (from the mockup)
    window.addEventListener('load', function() {
        // Set default date from mockup
        birthDateInput.value = '21/11/2002';
        
        // Automatically calculate for the default date after a short delay
        setTimeout(() => {
            // Hide initial message
            document.querySelector('.initial-message').style.display = 'none';
            
            try {
                const ageData = calculateAge('21/11/2002');
                displayAgeResult(ageData, '21/11/2002');
            } catch (error) {
                console.error('Default date calculation error:', error);
            }
        }, 500);
    });
});