// Your Companies Screen Logic
let companies = [
  { id: 1, name: 'ZenterPrime Solutions', owner: 'Admin', state: 'Maharashtra', sales: '₹ 1,25,000', purchases: '₹ 45,000', balance: '₹ 80,000' },
  { id: 2, name: 'Global Tech Corp', owner: 'John Doe', state: 'Karnataka', sales: '₹ 85,000', purchases: '₹ 30,000', balance: '₹ 55,000' },
  { id: 3, name: 'Innova Retailers', owner: 'Jane Smith', state: 'Gujarat', sales: '₹ 2,10,000', purchases: '₹ 1,50,000', balance: '₹ 60,000' },
];

let companyToDelete = null;

document.addEventListener('DOMContentLoaded', () => {
  renderCompanies();
  setupEventListeners();
});

function renderCompanies() {
  const tbody = document.getElementById('companies-body');
  const placeholder = document.getElementById('empty-list-placeholder');
  if (!tbody) return;

  if (companies.length === 0) {
    tbody.innerHTML = '';
    if (placeholder) placeholder.style.display = 'flex';
  } else {
    if (placeholder) placeholder.style.display = 'none';
    tbody.innerHTML = companies.map(company => `
      <tr>
        <td>${company.name}</td>
        <td>${company.owner}</td>
        <td>${company.state}</td>
        <td>${company.sales}</td>
        <td>${company.purchases}</td>
        <td>${company.balance}</td>
        <td>
          <div class="action-icons" style="justify-content: center;">
            <div class="action-icon view" title="View Dashboard" onclick="window.location.href='/index.html'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div class="action-icon edit" title="Edit Company">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </div>
            <div class="action-icon delete" title="Delete Company" data-id="${company.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </div>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Add event listeners to delete icons
  document.querySelectorAll('.action-icon.delete').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      showDeleteModal(id);
    });
  });
}

function setupEventListeners() {
  const searchInput = document.getElementById('company-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = companies.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.owner.toLowerCase().includes(query) || 
        c.state.toLowerCase().includes(query)
      );
      renderFilteredCompanies(filtered);
    });
  }

  const createBtn = document.getElementById('create-company-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      console.log('Create New Company clicked');
      // Logic to open a create modal would go here
    });
  }

  const cancelBtn = document.getElementById('cancel-delete');
  const confirmBtn = document.getElementById('confirm-delete');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideDeleteModal);
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (companyToDelete !== null) {
        companies = companies.filter(c => c.id !== companyToDelete);
        renderCompanies();
        hideDeleteModal();
      }
    });
  }
}

function renderFilteredCompanies(filtered) {
  const tbody = document.getElementById('companies-body');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="table-empty-state">No companies found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(company => `
    <tr>
      <td>${company.name}</td>
      <td>${company.owner}</td>
      <td>${company.state}</td>
      <td>${company.sales}</td>
      <td>${company.purchases}</td>
      <td>${company.balance}</td>
      <td>
        <div class="action-icons">
          <div class="action-icon view" title="View Dashboard" onclick="window.location.href='/index.html'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div class="action-icon edit" title="Edit Company">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </div>
          <div class="action-icon delete" title="Delete Company" data-id="${company.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </div>
        </div>
      </td>
    </tr>
  `).join('');

  // Re-add event listeners to delete icons
  document.querySelectorAll('.action-icon.delete').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      showDeleteModal(id);
    });
  });
}

function showDeleteModal(id) {
  companyToDelete = id;
  const modal = document.getElementById('delete-modal');
  if (modal) modal.style.display = 'flex';
}

function hideDeleteModal() {
  companyToDelete = null;
  const modal = document.getElementById('delete-modal');
  if (modal) modal.style.display = 'none';
}
