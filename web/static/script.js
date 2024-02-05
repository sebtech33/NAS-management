// web/static/script.js

let dockerInterval;

// Define variables for color settings
let textColor = 'white'; // Default text color for dark mode
let backgroundColor = '#222'; // Default background color for dark mode

// Define openTab function
function openTab(tabId) {
    // Clear the interval when switching tabs
    clearInterval(dockerInterval);

    var i, tabContent;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Show the selected tab content
    document.getElementById(tabId).style.display = "block";

    // Store the active tab in local storage
    localStorage.setItem('activeTab', tabId);

    // Fetch Docker containers if Docker tab is opened
    if (tabId === 'dockerTab') {
        fetchDockerContainers();

        // Update the Docker containers every 5 seconds (for example)
        dockerInterval = setInterval(fetchDockerContainers, 5000); // Adjust the interval as needed
    }
}

function toggleDarkMode() {
    const settingsButton = document.getElementById('settingsButton');
    const darkModeButton = settingsButton.querySelector('.dark-mode-button');

    // Toggle dark mode by changing text and background colors
    if (document.body.classList.contains('dark-mode')) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        darkModeButton.textContent = '🌙'; // Set moon icon for light mode
        textColor = 'black'; // Set text color for light mode
        backgroundColor = 'white'; // Set background color for light mode
    } else {
        // Switch to dark mode
        document.body.classList.add('dark-mode');
        darkModeButton.textContent = '☀️'; // Set sun icon for dark mode
        textColor = 'white'; // Set text color for dark mode
        backgroundColor = '#222'; // Set background color for dark mode
    }

    // Apply color settings
    applyColorSettings();
}

function applyColorSettings() {
    // Apply text and background color settings to the body
    document.body.style.color = textColor;
    document.body.style.backgroundColor = backgroundColor;

    // Apply styles for the Docker table
    const dockerTable = document.getElementById('dockerTab').querySelector('table');
    if (dockerTable) {
        dockerTable.style.color = textColor;
        dockerTable.style.backgroundColor = backgroundColor;

        const dockerTableHead = dockerTable.querySelector('thead');
        if (dockerTableHead) {
            dockerTableHead.style.color = textColor;
            dockerTableHead.style.backgroundColor = backgroundColor;

            // Apply styles for the header cells in the thead
            const headerCells = dockerTableHead.querySelectorAll('th');
            headerCells.forEach(cell => {
                cell.style.color = textColor;
                cell.style.backgroundColor = backgroundColor;
            });
        }

        const dockerTableBody = dockerTable.querySelector('tbody');
        if (dockerTableBody) {
            dockerTableBody.style.color = textColor;
            dockerTableBody.style.backgroundColor = backgroundColor;

            // Apply styles for the body cells in the tbody
            const bodyCells = dockerTableBody.querySelectorAll('td');
            bodyCells.forEach(cell => {
                cell.style.color = textColor;
                cell.style.backgroundColor = backgroundColor;
            });
        }
    }

    // Apply specific styles for readability in the content area
    const contentArea = document.getElementById('content');
    contentArea.style.color = textColor;
    contentArea.style.backgroundColor = backgroundColor;

    // Apply specific styles for readability in the header area
    const headerArea = document.getElementById('header');
    headerArea.style.color = textColor;
    headerArea.style.backgroundColor = backgroundColor;

    // Apply specific styles for readability in the tab buttons
    const tabButtons = document.getElementById('tabButtons');
    tabButtons.style.color = textColor;
    tabButtons.style.backgroundColor = backgroundColor;

    // Apply styles for the settings button
    const settingsButton = document.getElementById('settingsButton');
    settingsButton.style.color = textColor;
    settingsButton.style.backgroundColor = backgroundColor;

    // Apply styles for the top box
    const topBox = document.getElementById('header');
    topBox.style.color = textColor;
    topBox.style.backgroundColor = backgroundColor;

    // Store color settings in local storage
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('backgroundColor', backgroundColor);
}

function loadColorSettings() {
    // Load color settings from local storage
    textColor = localStorage.getItem('textColor') || textColor;
    backgroundColor = localStorage.getItem('backgroundColor') || backgroundColor;

    // Apply color settings
    applyColorSettings();
}

// Define fetchDockerContainers function
async function fetchDockerContainers() {
    const response = await fetch('/api/endpoint1');
    const containers = await response.json();

    // Update the UI with the list of Docker containers
    const dockerTab = document.getElementById('dockerTab');
    dockerTab.innerHTML = '<h2>Docker Containers</h2>';

    if (containers.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        containers.forEach(container => {
            const row = table.insertRow();
            const cellID = row.insertCell(0);
            const cellName = row.insertCell(1);
            const cellImage = row.insertCell(2);
            const cellStatus = row.insertCell(3);

            cellID.textContent = container.ID;

            let names;
            if (container.Names && container.Names.length > 0) {
                names = container.Names.map(name => name.replace(/^\//, '')).join(', ');
            } else {
                names = 'No name';
            }
            cellName.textContent = names;

            cellImage.textContent = container.Image;

            cellStatus.textContent = container.State;
        });

        dockerTab.appendChild(table);
    } else {
        dockerTab.innerHTML += '<p>No Docker containers found.</p>';
    }
    // Apply color settings after fetching Docker containers
    applyColorSettings();
}

// Call loadColorSettings() function on page load
window.onload = function () {
    // Apply dark mode styles by default
    toggleDarkMode();
    loadColorSettings();

    // Restore settings and active tab from local storage
    const storedSettings = JSON.parse(localStorage.getItem('appSettings'));
    const activeTab = localStorage.getItem('activeTab');

    // Set default tab and order
    if (storedSettings) {
        document.getElementById('defaultTab').value = storedSettings.defaultTab;
    }

    // Set the active tab
    if (activeTab) {
        openTab(activeTab);
    }

    // Update the Docker containers every 5 seconds (for example)
    setInterval(fetchDockerContainers, 5000); // Adjust the interval as needed
};

// Define openSettings and saveSettings functions
function openSettings() {
    openTab('settingsTab');
}

function saveSettings() {
    const defaultTab = document.getElementById('defaultTab').value;
    const tabOrder = document.getElementById('tabOrder').value;

    // Get existing settings or create a new object
    const storedSettings = JSON.parse(localStorage.getItem('appSettings')) || {};

    // Update the settings object
    storedSettings.defaultTab = defaultTab;
    storedSettings.tabOrder = tabOrder;

    // Store settings in local storage
    localStorage.setItem('appSettings', JSON.stringify(storedSettings));

    // Switch to the default tab
    openTab(defaultTab);
}
