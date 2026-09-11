/**
 * DreadlocksNailsNairobi - Masterpiece Interactive Script
 * High Converting Features: Before/After Sliders, Custom Calculator,
 * WhatsApp Link Generators, FAQ Accordion, Social Proof Notifications
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Interactive Before & After Sliders
     ========================================================================== */
  const sliderContainers = document.querySelectorAll('[data-slider]');

  sliderContainers.forEach(container => {
    const rangeInput = container.querySelector('.ba-range-input');
    const afterWrapper = container.querySelector('.ba-after');
    const handle = container.querySelector('.ba-handle');

    if (!rangeInput || !afterWrapper || !handle) return;

    const updateSlider = (value) => {
      // Limit value between 0 and 100
      const val = Math.min(Math.max(value, 0), 100);
      afterWrapper.style.width = `${val}%`;
      handle.style.left = `${val}%`;
      rangeInput.value = val;
    };

    // Range Input event
    rangeInput.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    // Touch & Mouse Drag on Container
    let isDragging = false;

    const getPosFromEvent = (e) => {
      const rect = container.getBoundingClientRect();
      const pageX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = pageX - rect.left;
      return (x / rect.width) * 100;
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(getPosFromEvent(e));
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(getPosFromEvent(e));
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(getPosFromEvent(e));
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSlider(getPosFromEvent(e));
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Initial positioning
    updateSlider(50);
  });

  /* ==========================================================================
     2. Transformations Category Filter Tabs
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const transformationCards = document.querySelectorAll('.transformation-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      transformationCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     3. Service Menu Nav Tabs (Dreadlocks / Nails / Combos)
     ========================================================================== */
  const svcTabs = document.querySelectorAll('.svc-tab');
  const svcContents = document.querySelectorAll('.svc-tab-content');

  svcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      svcTabs.forEach(t => t.classList.remove('active'));
      svcContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. Interactive "Build Your Package" Price Calculator
     ========================================================================== */
  const dreadRadios = document.querySelectorAll('input[name="dreadService"]');
  const nailRadios = document.querySelectorAll('input[name="nailService"]');
  const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
  const summaryBreakdown = document.getElementById('summaryBreakdown');
  const totalAmountElem = document.getElementById('totalAmount');
  const discountBanner = document.getElementById('discountBanner');
  const bookCustomBtn = document.getElementById('bookCustomBtn');

  const updateCalculator = () => {
    let dreadPrice = 0;
    let dreadName = '';
    dreadRadios.forEach(radio => {
      const parent = radio.closest('.calc-option');
      if (radio.checked) {
        dreadPrice = parseInt(radio.value, 10);
        dreadName = radio.getAttribute('data-name');
        if (parent) parent.classList.add('active');
      } else {
        if (parent) parent.classList.remove('active');
      }
    });

    let nailPrice = 0;
    let nailName = '';
    nailRadios.forEach(radio => {
      const parent = radio.closest('.calc-option');
      if (radio.checked) {
        nailPrice = parseInt(radio.value, 10);
        nailName = radio.getAttribute('data-name');
        if (parent) parent.classList.add('active');
      } else {
        if (parent) parent.classList.remove('active');
      }
    });

    let addonsList = [];
    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      const parent = cb.closest('.calc-addon-item');
      if (cb.checked) {
        const val = parseInt(cb.value, 10);
        const name = cb.getAttribute('data-name');
        addonsTotal += val;
        addonsList.push({ name, price: val });
        if (parent) parent.classList.add('active');
      } else {
        if (parent) parent.classList.remove('active');
      }
    });

    // Determine Combo Discount (KSh 500 discount if both dread & nail service selected)
    let comboDiscount = 0;
    const hasDreads = dreadPrice > 0;
    const hasNails = nailPrice > 0;
    if (hasDreads && hasNails) {
      comboDiscount = 500;
    }

    const subtotal = dreadPrice + nailPrice + addonsTotal;
    const finalTotal = Math.max(0, subtotal - comboDiscount);

    // Render Breakdown HTML
    let breakdownHtml = '';

    if (hasDreads) {
      breakdownHtml += `
        <div class="summary-item">
          <span><i class="fa-solid fa-scissors text-gold"></i> ${dreadName}</span>
          <strong>KSh ${dreadPrice.toLocaleString()}</strong>
        </div>
      `;
    }

    if (hasNails) {
      breakdownHtml += `
        <div class="summary-item">
          <span><i class="fa-solid fa-hand-sparkles text-gold"></i> ${nailName}</span>
          <strong>KSh ${nailPrice.toLocaleString()}</strong>
        </div>
      `;
    }

    addonsList.forEach(item => {
      breakdownHtml += `
        <div class="summary-item">
          <span><i class="fa-solid fa-plus text-green"></i> ${item.name}</span>
          <strong>KSh ${item.price.toLocaleString()}</strong>
        </div>
      `;
    });

    if (comboDiscount > 0) {
      discountBanner.style.display = 'flex';
      breakdownHtml += `
        <div class="summary-item" style="color: var(--green-wa); font-weight: 700;">
          <span><i class="fa-solid fa-tags"></i> Combo Discount (Locs + Nails)</span>
          <strong>-KSh ${comboDiscount.toLocaleString()}</strong>
        </div>
      `;
    } else {
      discountBanner.style.display = 'none';
    }

    if (!hasDreads && !hasNails && addonsList.length === 0) {
      breakdownHtml = `<div class="summary-item"><span>Please select at least one service above</span></div>`;
    }

    summaryBreakdown.innerHTML = breakdownHtml;
    totalAmountElem.textContent = `KSh ${finalTotal.toLocaleString()}`;

    // Build Custom WhatsApp Booking URL
    let waMessage = `Hello DreadlocksNailsNairobi! I'd like to book my custom glam package:\n`;
    if (hasDreads) waMessage += `• Dreadlocks: ${dreadName} (KSh ${dreadPrice.toLocaleString()})\n`;
    if (hasNails) waMessage += `• Nails: ${nailName} (KSh ${nailPrice.toLocaleString()})\n`;
    if (addonsList.length > 0) {
      waMessage += `• Add-ons:\n`;
      addonsList.forEach(a => {
        waMessage += `   - ${a.name} (+KSh ${a.price.toLocaleString()})\n`;
      });
    }
    if (comboDiscount > 0) {
      waMessage += `• Special Combo Discount: -KSh 500\n`;
    }
    waMessage += `\n*Estimated Total: KSh ${finalTotal.toLocaleString()}*\n\nPlease let me know your earliest available dates and studio/home visit slots!`;

    const encodedWa = encodeURIComponent(waMessage);
    bookCustomBtn.href = `https://wa.me/254792216265?text=${encodedWa}`;
  };

  // Add listeners to calculator inputs
  dreadRadios.forEach(r => r.addEventListener('change', updateCalculator));
  nailRadios.forEach(r => r.addEventListener('change', updateCalculator));
  addonCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));

  // Initialize Calculator on load
  updateCalculator();

  /* ==========================================================================
     5. FAQ Accordion
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all other open items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          const otherBtn = item.querySelector('.faq-question');
          const otherAns = item.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      } else {
        parent.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });

  /* ==========================================================================
     6. Interactive Booking Form (Auto-Redirects to WhatsApp)
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const bookingDateInput = document.getElementById('bookingDate');

  if (bookingDateInput) {
    // Set min date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;

    // Set default date to tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tYyyy = tomorrow.getFullYear();
    const tMm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tDd = String(tomorrow.getDate()).padStart(2, '0');
    bookingDateInput.value = `${tYyyy}-${tMm}-${tDd}`;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('serviceCategory').value;
      const location = document.getElementById('locationType').value;
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('bookingTime').value;
      const notes = document.getElementById('clientNotes').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number so we can confirm your booking.');
        return;
      }

      let msg = `🌟 *NEW BOOKING REQUEST - DreadlocksNailsNairobi* 🌟\n\n`;
      msg += `👤 *Client Name:* ${name}\n`;
      msg += `📞 *Phone / WhatsApp:* ${phone}\n`;
      msg += `✂️ *Selected Service:* ${service}\n`;
      msg += `📍 *Service Location:* ${location}\n`;
      msg += `📅 *Preferred Date:* ${date}\n`;
      msg += `⏰ *Preferred Time:* ${time}\n`;
      if (notes) {
        msg += `📝 *Client Notes / Style Details:* ${notes}\n`;
      }
      msg += `\nPlease confirm if this slot is available! Thank you.`;

      const waUrl = `https://wa.me/254792216265?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  }

  /* ==========================================================================
     7. Mobile Slide-out Menu Navigation
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.add('active');
    });
  }

  if (mobileMenuClose && mobileNavDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('active');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    });
  });

  /* ==========================================================================
     8. Floating WhatsApp Widget Toggle
     ========================================================================== */
  const toggleWaBtn = document.getElementById('toggleWaBtn');
  const waChatBubble = document.getElementById('waChatBubble');
  const closeBubbleBtn = document.getElementById('closeBubbleBtn');

  if (toggleWaBtn && waChatBubble) {
    toggleWaBtn.addEventListener('click', () => {
      waChatBubble.classList.toggle('active');
    });

    if (closeBubbleBtn) {
      closeBubbleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waChatBubble.classList.remove('active');
      });
    }

    // Auto open bubble after 4.5 seconds for attention, then auto-close after 12s
    setTimeout(() => {
      if (!waChatBubble.classList.contains('active')) {
        waChatBubble.classList.add('active');
      }
    }, 4500);
  }

  /* ==========================================================================
     9. Live Social Proof Toast Notifications
     ========================================================================== */
  const socialProofToast = document.getElementById('socialProofToast');
  const toastName = document.getElementById('toastName');
  const toastAction = document.getElementById('toastAction');
  const toastTime = document.getElementById('toastTime');
  const closeToastBtn = document.getElementById('closeToastBtn');

  const recentBookings = [
    { name: 'Sharon from Kilimani', action: 'just booked Loc Retwist + BIAB Nails!', time: '3 minutes ago' },
    { name: 'Brian from Westlands', action: 'just booked Loc Repair & Scalp Detox!', time: '7 minutes ago' },
    { name: 'Faith from Kileleshwa', action: 'just booked VIP Home Service (Locs + Nails)!', time: '12 minutes ago' },
    { name: 'Kevin from Roysambu', action: 'just booked Starter Locs Installation!', time: '18 minutes ago' },
    { name: 'Mercy from Ngong Road', action: 'just booked Sculpted Almond Acrylics!', time: '24 minutes ago' },
    { name: 'Dennis from South C', action: 'just booked The Executive Glow-Up Combo!', time: '31 minutes ago' },
    { name: 'Esther from Karen', action: 'just booked Deluxe Spa Pedicure & Gel Toes!', time: '40 minutes ago' },
    { name: 'Collins from Lavington', action: 'just booked Loc Retwist & Barrel Twists!', time: '48 minutes ago' }
  ];

  let toastIndex = 0;
  let toastInterval = null;

  const showToast = () => {
    if (!socialProofToast) return;
    const booking = recentBookings[toastIndex];
    toastName.textContent = booking.name;
    toastAction.textContent = booking.action;
    toastTime.textContent = `${booking.time} • Verified Nairobi Client`;

    socialProofToast.classList.add('show');

    // Hide after 5.5 seconds
    setTimeout(() => {
      socialProofToast.classList.remove('show');
    }, 5500);

    toastIndex = (toastIndex + 1) % recentBookings.length;
  };

  if (socialProofToast) {
    // Show first toast after 3 seconds
    setTimeout(showToast, 3000);

    // Repeat every 14 seconds
    toastInterval = setInterval(showToast, 14000);

    if (closeToastBtn) {
      closeToastBtn.addEventListener('click', () => {
        socialProofToast.classList.remove('show');
      });
    }
  }

  /* ==========================================================================
     10. Dynamic Current Year in Footer
     ========================================================================== */
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     11. Smooth Sticky Header Blur on Scroll
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
      header.style.borderBottomColor = 'rgba(229, 169, 59, 0.3)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  }, { passive: true });

});
