// ZenterPrime ERP v26.3.1 - Vanilla JS Entry Point

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  updateDate();
  setupEventListeners();
});

function initDashboard() {
  const cardsContainer = document.getElementById('dashboard-cards');
  if (!cardsContainer) return;

  const metrics = [
    { label: 'Sales', value: '₹ 0' },
    { label: 'Purchases', value: '₹ 0' },
    { label: 'Active Partners', value: '0' },
    { label: 'Receivables', value: '₹ 0' },
    { label: 'Payables', value: '₹ 0' },
    { label: 'Received', value: '₹ 0' },
    { label: 'Paid', value: '₹ 0' },
    { label: 'Balance', value: '₹ 0' },
  ];

  cardsContainer.innerHTML = metrics.map(card => `
    <div class="dashboard-card">
      <div class="card-label">${card.label}</div>
      <div class="card-value">${card.value}</div>
    </div>
  `).join('');
}

function updateDate() {
  const dateElement = document.getElementById('current-date');
  if (!dateElement) return;
  
  const now = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-GB', options).replace(/ /g, '-');
}

function setupEventListeners() {
  // Dropdown Toggle Logic
  const menuItems = document.querySelectorAll('.navbar-menu-item');
  
  menuItems.forEach(item => {
    const button = item.querySelector('.navbar-menu-button');
    const dropdown = item.querySelector('.navbar-dropdown');
    
    if (button && dropdown) {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing from window listener
        
        const isOpen = item.classList.contains('is-open');
        
        // Close all other dropdowns
        menuItems.forEach(otherItem => otherItem.classList.remove('is-open'));
        
        // Toggle current one
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  window.addEventListener('click', () => {
    menuItems.forEach(item => item.classList.remove('is-open'));
  });

  // Quick Create buttons
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = e.target.textContent.trim();
    });
  });
}
