(function () {
  'use strict';

  function closeProfileMenu() {
    document.querySelectorAll('.profile-menu, .menu-backdrop').forEach(function (el) {
      el.classList.remove('open');
    });
    var menu = document.querySelector('.profile-menu');
    if (menu) menu.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('.user-trigger').forEach(function (el) {
      el.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.user-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var menu = document.querySelector('.profile-menu');
      var shouldOpen = menu && !menu.classList.contains('open');
      document.querySelectorAll('.profile-menu, .menu-backdrop').forEach(function (el) {
        el.classList.toggle('open', shouldOpen);
      });
      if (menu) menu.setAttribute('aria-hidden', String(!shouldOpen));
      trigger.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.querySelectorAll('.menu-backdrop').forEach(function (el) {
    el.addEventListener('click', closeProfileMenu);
  });

  function closeSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var backdrop = document.querySelector('.sidebar__backdrop');
    if (sidebar) sidebar.classList.remove('sidebar--open', 'open');
    if (backdrop) backdrop.classList.remove('sidebar__backdrop--open');
    document.querySelectorAll('.menu-toggle, .topbar__menu').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Открыть меню');
    });
  }

  document.querySelectorAll('.menu-toggle, .topbar__menu').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sidebar = document.querySelector('.sidebar');
      var backdrop = document.querySelector('.sidebar__backdrop');
      if (!sidebar) return;
      var open = !sidebar.classList.contains('sidebar--open');
      sidebar.classList.toggle('sidebar--open', open);
      sidebar.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      if (backdrop) backdrop.classList.toggle('sidebar__backdrop--open', open);
    });
  });

  document.querySelectorAll('.sidebar__backdrop').forEach(function (el) {
    el.addEventListener('click', closeSidebar);
  });

  document.querySelectorAll('.segmented button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.querySelectorAll('button').forEach(function (sibling) {
        sibling.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.filter-tabs button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-filter');
      btn.parentElement.querySelectorAll('button').forEach(function (sibling) {
        sibling.classList.remove('active');
      });
      btn.classList.add('active');
      document.querySelectorAll('.activity-item').forEach(function (item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.filter-trigger[data-dropdown]').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var dropdownClass = trigger.getAttribute('data-dropdown');
      var dropdown = document.querySelector('.' + dropdownClass);
      document.querySelectorAll('.filter-dropdown').forEach(function (el) {
        if (el !== dropdown) el.classList.remove('open');
      });
      document.querySelectorAll('.filter-trigger').forEach(function (el) {
        if (el !== trigger) el.classList.remove('open');
      });
      if (dropdown) {
        dropdown.classList.toggle('open');
        trigger.classList.toggle('open', dropdown.classList.contains('open'));
      }
    });
  });

  document.querySelectorAll('.status-dropdown:not(.tender-status-dropdown) button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var status = btn.getAttribute('data-value');
      var control = btn.closest('.filter-control');
      var label = control && control.querySelector('.filter-trigger span');
      if (label) label.textContent = status;
      document.querySelectorAll('.requests-table tbody tr').forEach(function (row) {
        var statusEl = row.querySelector('.status');
        row.style.display = statusEl && statusEl.textContent.trim() === status ? '' : 'none';
      });
      document.querySelectorAll('.filter-dropdown, .filter-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    });
  });

  document.querySelectorAll('.calendar-days button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.querySelectorAll('button').forEach(function (sibling) {
        sibling.classList.remove('selected');
      });
      btn.classList.add('selected');
      var control = btn.closest('.filter-control');
      var label = control && control.querySelector('.filter-trigger span');
      if (label) label.textContent = btn.textContent + '.08.2026';
      document.querySelectorAll('.filter-dropdown, .filter-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    });
  });

  document.querySelectorAll('.filters-reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filters = btn.closest('.request-filters');
      var tenderPage = filters && filters.classList.contains('tender-filters');
      var labels = tenderPage
        ? ['Дата публикации', 'Дата окончания подачи предложений', 'Регион', 'Статус']
        : ['Статус', 'Регион', 'Дата публикации', 'Дата окончания подачи предложений'];
      if (filters) {
        filters.querySelectorAll('.filter-trigger span').forEach(function (span, index) {
          if (labels[index]) span.textContent = labels[index];
        });
      }
      document.querySelectorAll('.region-dropdown input').forEach(function (input) {
        input.checked = false;
      });
      document.querySelectorAll('.requests-table tbody tr, .tenders-table tbody tr').forEach(function (row) {
        row.style.display = '';
      });
    });
  });

  document.querySelectorAll('.tender-status-dropdown button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var status = btn.getAttribute('data-value');
      var control = btn.closest('.filter-control');
      var label = control && control.querySelector('.filter-trigger span');
      if (label) label.textContent = status;
      document.querySelectorAll('.tenders-table tbody tr').forEach(function (row) {
        var statusEl = row.querySelector('.status');
        row.style.display = statusEl && statusEl.textContent.trim() === status ? '' : 'none';
      });
      document.querySelectorAll('.filter-dropdown, .filter-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    });
  });

  function closeTenderModal() {
    document.querySelectorAll('.tender-modal, .tender-modal-backdrop').forEach(function (el) {
      el.classList.remove('open');
    });
    var modal = document.querySelector('.tender-modal');
    if (modal) modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.tender-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var titleEl = row.querySelector('td:first-child b');
      var title = document.getElementById('tender-title');
      if (title && titleEl) title.textContent = titleEl.textContent;
      document.querySelectorAll('.tender-modal, .tender-modal-backdrop').forEach(function (el) {
        el.classList.add('open');
      });
      var modal = document.querySelector('.tender-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('.tender-modal-close, .tender-modal-backdrop').forEach(function (el) {
    el.addEventListener('click', closeTenderModal);
  });

  function closeProductModal() {
    document.querySelectorAll('.product-modal, .product-modal-backdrop').forEach(function (el) {
      el.classList.remove('open');
    });
    var modal = document.querySelector('.product-modal');
    if (modal) modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.product-row').forEach(function (row) {
    row.addEventListener('click', function () {
      document.querySelectorAll('.product-modal, .product-modal-backdrop').forEach(function (el) {
        el.classList.add('open');
      });
      var modal = document.querySelector('.product-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('.product-modal-close, .product-modal-backdrop').forEach(function (el) {
    el.addEventListener('click', closeProductModal);
  });

  var productSearch = document.querySelector('.product-filter input');
  if (productSearch) {
    productSearch.addEventListener('input', function () {
      var search = productSearch.value.toLowerCase();
      document.querySelectorAll('.products-table tbody tr').forEach(function (row) {
        row.style.display = row.textContent.toLowerCase().indexOf(search) !== -1 ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('.products-reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.products-filters input[type="text"]').forEach(function (input) {
        input.value = '';
      });
      document.querySelectorAll('.products-filters input[type="checkbox"]').forEach(function (input) {
        input.checked = false;
      });
      var labels = ['Дата публикации', 'Выбрать регион', 'Дата окончания подачи предложений', 'Статус'];
      document.querySelectorAll('.products-filters .filter-trigger span').forEach(function (span, index) {
        if (labels[index]) span.textContent = labels[index];
      });
      document.querySelectorAll('.products-table tbody tr').forEach(function (row) {
        row.style.display = '';
      });
    });
  });

  function closeAddProductModal() {
    document.querySelectorAll('.add-product-modal, .add-product-backdrop').forEach(function (el) {
      el.classList.remove('open');
    });
    var modal = document.querySelector('.add-product-modal');
    if (modal) modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.add-product-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.add-product-modal, .add-product-backdrop').forEach(function (el) {
        el.classList.add('open');
      });
      var modal = document.querySelector('.add-product-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('.add-product-close, .add-product-backdrop').forEach(function (el) {
    el.addEventListener('click', closeAddProductModal);
  });

  var selectAll = document.querySelector('.my-products-table thead input[type="checkbox"]');
  if (selectAll) {
    selectAll.addEventListener('change', function () {
      document.querySelectorAll('.my-products-table tbody input[type="checkbox"]').forEach(function (input) {
        input.checked = selectAll.checked;
      });
    });
  }

  function closeProcessorModal() {
    document.querySelectorAll('.processor-modal, .processor-backdrop').forEach(function (el) {
      el.classList.remove('open');
    });
    var modal = document.querySelector('.processor-modal');
    if (modal) modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.create-processor').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.processor-modal, .processor-backdrop').forEach(function (el) {
        el.classList.add('open');
      });
      var modal = document.querySelector('.processor-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  document.querySelectorAll('.processor-close, .processor-backdrop').forEach(function (el) {
    el.addEventListener('click', closeProcessorModal);
  });

  document.querySelectorAll('.processor-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      closeProcessorModal();
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.filter-control')) {
      document.querySelectorAll('.filter-dropdown, .filter-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeProfileMenu();
      closeTenderModal();
      closeProductModal();
      closeAddProductModal();
      closeProcessorModal();
      closeSidebar();
      document.querySelectorAll('.filter-dropdown, .filter-trigger').forEach(function (el) {
        el.classList.remove('open');
      });
    }
  });
})();
