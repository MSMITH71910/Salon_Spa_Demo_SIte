document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU =====
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileBtn.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ===== ACTIVE NAV =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ===== CHATBOT — ARIA =====
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatMessages = document.querySelector('.chatbot-messages');
  const chatInput = document.querySelector('.chatbot-input');
  const chatSend = document.querySelector('.chatbot-send');
  const quickRepliesContainer = document.querySelector('.chatbot-quick-replies');
  let chatOpen = false;
  let hasGreeted = false;

  const botResponses = {
    'hello': {
      text: "Welcome to Luxe Beauty Studio! 💜 I'm Aria, your personal beauty concierge.\n\nHow can I help you today?",
      quick: ['Book an appointment', 'View services & pricing', 'Meet our stylists', 'Membership info']
    },
    'hi': {
      text: "Hello, gorgeous! 💫 I'm Aria from Luxe Beauty Studio. I'm here to help you look and feel your absolute best.\n\nWhat can I do for you?",
      quick: ['Book now', 'Services & pricing', 'Special offers', 'Contact us']
    },
    'book': {
      text: "Wonderful! Let's get you booked. 📅 We offer appointments 7 days a week:\n\n• Mon–Fri: 9AM–8PM\n• Saturday: 8AM–7PM\n• Sunday: 10AM–5PM\n\nWhich service are you looking to book?",
      quick: ['Hair color', 'Haircut & style', 'Facial', 'Massage', 'Nail services', 'Bridal package']
    },
    'appointment': {
      text: "I'd love to set up your appointment! 🌸 Head to our Booking page to choose your service, preferred stylist, and date/time.\n\nYou'll get an SMS reminder 24 hours before — no more forgotten appointments!",
      quick: ['Book now', 'Choose a service first', 'Meet our stylists', 'Questions first']
    },
    'hair': {
      text: "Our hair services are absolutely stunning! 💇‍♀️ Our team specializes in:\n\n• Haircuts & blowouts: $55–$120\n• Color (balayage, highlights, full): $85–$250\n• Keratin treatments: $195–$325\n• Extensions: $400–$900\n\nWhich hair service interests you?",
      quick: ['Balayage', 'Highlights', 'Haircut & blowout', 'Keratin treatment', 'Extensions']
    },
    'color': {
      text: "Color is our specialty! 🎨 Our colorists use only premium, low-damage formulas.\n\nPopular services:\n• Balayage: $145–$220\n• Full highlights: $125–$185\n• Full color: $85–$135\n• Color correction: $200–$450+\n\nColor corrections require a consultation. Want to book?",
      quick: ['Book a consultation', 'Balayage info', 'Highlight info', 'View our work']
    },
    'facial': {
      text: "Treat your skin to something luxurious! ✨ Our esthetics menu:\n\n• Signature glow facial: $95\n• Anti-aging lift treatment: $125\n• Deep cleanse (acne): $85\n• Hydro-infusion: $110\n• Microdermabrasion: $115\n• Chemical peel: $100–$175\n\nAll facials include a complimentary scalp massage. Ready to glow?",
      quick: ['Book a facial', 'Glow facial details', 'Anti-aging info', 'First visit?']
    },
    'massage': {
      text: "Melt away the stress! 🕯️ Our massage menu:\n\n• Swedish relaxation (60 min): $95\n• Deep tissue (60 min): $115\n• Hot stone (75 min): $130\n• Prenatal massage: $105\n• Couples massage (60 min): $185\n\nAll massages include aromatherapy and heated table. Shall we book?",
      quick: ['Book a massage', 'Couples massage', 'Hot stone details', 'Gift cards available']
    },
    'nails': {
      text: "Beautiful nails are a must! 💅 Our nail menu:\n\n• Classic manicure: $35\n• Gel manicure: $55\n• Classic pedicure: $50\n• Spa pedicure: $70\n• Gel pedicure: $65\n• Full set acrylics: $65–$95\n• Nail art (per nail): $5–$15\n\nWe use only non-toxic, cruelty-free polishes. Want to book?",
      quick: ['Book nails', 'Gel vs regular', 'Nail art gallery', 'Pedicure options']
    },
    'bridal': {
      text: "Congratulations! 💍 Our bridal packages are designed to make your wedding day absolutely perfect.\n\n✨ Luxe Bridal Package: $450\n• Trial hair + makeup\n• Wedding day hair + makeup\n• Touch-up kit included\n\n👑 Full Bridal Party Package: from $850\n• Includes bridesmaids, mother of bride\n• On-location available\n\nBridal bookings fill fast — shall we schedule a consultation?",
      quick: ['Book bridal consult', 'Bridal party info', 'On-location services', 'Package details']
    },
    'price': {
      text: "Here's a quick pricing overview:\n\n💇 Hair: $55–$900+\n💄 Makeup: $75–$250\n✨ Facials: $85–$175\n🕯️ Massage: $95–$185\n💅 Nails: $35–$95\n🧖 Full Day Spa: $350–$600\n\nMembership members save 15% on all services! Want membership info?",
      quick: ['Membership info', 'Hair pricing', 'Spa pricing', 'Book appointment']
    },
    'membership': {
      text: "Our membership program is incredible value! 💜\n\n🥉 Essential: $49/month\n• 1 service per month + 10% off extras\n\n💜 Luxe: $99/month\n• 2 services per month + 15% off extras\n• Priority booking\n\n👑 VIP: $189/month\n• 4 services + 20% off + free products\n• Private suite access\n\nAll memberships include birthday gift! Want to join?",
      quick: ['Join Essential', 'Join Luxe', 'Join VIP', 'Compare memberships']
    },
    'stylists': {
      text: "Our team is absolutely incredible! 💫 Meet your Luxe family:\n\n🌟 Sophia Laurent — Color Director (12 years)\n🌟 Jade Williams — Balayage Specialist (8 years)\n🌟 Elena Rossi — Skincare Expert (10 years)\n🌟 Marcus Bell — Hair & Style (7 years)\n\nEach stylist has a personalized portfolio. Want to view profiles?",
      quick: ['View all stylists', 'Book with Sophia', 'Book with Jade', 'Book with Elena']
    },
    'instagram': {
      text: "Follow us for daily inspiration! 📸\n\n@LuxeBeautyStudio — 28K followers\n\nWe post:\n• Before & after transformations\n• Trend alerts & tutorials\n• Behind-the-scenes studio life\n• Client spotlights\n\nWe also generate 5 custom Instagram captions weekly for your business using AI! Check out our Caption Studio on the services page.",
      quick: ['Caption Studio demo', 'Book appointment', 'View our work', 'Contact us']
    },
    'review': {
      text: "We'd love your feedback! ⭐ After every appointment, we send an automated review request via SMS + email within 24 hours.\n\nWe're rated 4.9/5 on Google with 680+ reviews — our clients' words mean everything to us!\n\nWant to leave a review right now?",
      quick: ['Leave a Google review', 'Book again', 'Refer a friend', 'Contact us']
    },
    'cancel': {
      text: "We understand life gets busy! 📱 Our cancellation policy:\n\n• Cancel/reschedule 24+ hours: no charge\n• Cancel 12–24 hours: 25% service fee\n• Same-day/no-show: 50% service fee\n\nNeed to cancel? Call us at (555) 874-2190 or text us — we'll do our best to accommodate you.",
      quick: ['Call to cancel', 'Reschedule instead', 'Book new appointment', 'Contact info']
    },
    'products': {
      text: "We carry the best in professional beauty! 💄 Our retail includes:\n\n• Olaplex hair care\n• Davines color protection\n• Dermalogica skincare\n• OPI nail lacquer\n• Aveda styling products\n\nVIP members get 20% off all retail products. Want recommendations for your hair/skin type?",
      quick: ['Hair care recs', 'Skincare recs', 'Shop products', 'VIP membership']
    },
    'gift': {
      text: "Gift cards are the perfect present! 🎁 We offer:\n\n• Digital gift cards (instant delivery via email)\n• Physical gift cards (mailed to recipient)\n• Custom amounts: $25 to $500+\n• Experience bundles: Day Spa, Glow Day, Hair Day\n\nGift cards never expire and can be used for any service or retail product. Purchase at the front desk or online!",
      quick: ['Buy gift card', 'Day Spa bundle', 'Glow Day bundle', 'Custom amount']
    },
    'location': {
      text: "Come visit us! 📍\n\n🏙️ Luxe Beauty Studio\n2847 Lakeside Boulevard\nColumbus, OH 43210\n\n🚗 Free parking in the attached garage\n♿ Fully accessible studio\n\nHours:\nMon–Fri: 9AM–8PM\nSat: 8AM–7PM\nSun: 10AM–5PM",
      quick: ['Get directions', 'Book appointment', 'Call us', 'Contact form']
    },
    'default': {
      text: "I'd love to help you with that! 🌸 Here are some things I can assist with:",
      quick: ['Book an appointment', 'Services & pricing', 'Membership info', 'Meet our team', 'Location & hours']
    }
  };

  function getResponse(input) {
    const msg = input.toLowerCase().trim();
    if (msg.includes('hello') || msg.includes('hey') || msg.includes('hi there')) return botResponses['hello'];
    if (msg.includes('hi') && msg.length < 6) return botResponses['hi'];
    if (msg.includes('book') || msg.includes('schedule') || msg.includes('reserve')) return botResponses['book'];
    if (msg.includes('appointment')) return botResponses['appointment'];
    if (msg.includes('color') || msg.includes('balayage') || msg.includes('highlight') || msg.includes('dye')) return botResponses['color'];
    if (msg.includes('hair') || msg.includes('haircut') || msg.includes('blowout') || msg.includes('extension')) return botResponses['hair'];
    if (msg.includes('facial') || msg.includes('skin') || msg.includes('peel') || msg.includes('microderm')) return botResponses['facial'];
    if (msg.includes('massage') || msg.includes('deep tissue') || msg.includes('hot stone') || msg.includes('swedish')) return botResponses['massage'];
    if (msg.includes('nail') || msg.includes('manicure') || msg.includes('pedicure') || msg.includes('acrylic') || msg.includes('gel')) return botResponses['nails'];
    if (msg.includes('bridal') || msg.includes('wedding') || msg.includes('bride')) return botResponses['bridal'];
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('pricing')) return botResponses['price'];
    if (msg.includes('member') || msg.includes('vip') || msg.includes('luxe plan')) return botResponses['membership'];
    if (msg.includes('stylist') || msg.includes('team') || msg.includes('staff') || msg.includes('sophia') || msg.includes('jade')) return botResponses['stylists'];
    if (msg.includes('instagram') || msg.includes('caption') || msg.includes('social')) return botResponses['instagram'];
    if (msg.includes('review') || msg.includes('google') || msg.includes('rating')) return botResponses['review'];
    if (msg.includes('cancel') || msg.includes('reschedule') || msg.includes('policy')) return botResponses['cancel'];
    if (msg.includes('product') || msg.includes('olaplex') || msg.includes('retail') || msg.includes('shop')) return botResponses['products'];
    if (msg.includes('gift') || msg.includes('card') || msg.includes('present')) return botResponses['gift'];
    if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('direction') || msg.includes('hours') || msg.includes('open')) return botResponses['location'];
    return botResponses['default'];
  }

  function addMessage(text, sender) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showQuickReplies(replies) {
    if (!quickRepliesContainer) return;
    quickRepliesContainer.innerHTML = '';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = r;
      btn.addEventListener('click', () => {
        addMessage(r, 'user');
        quickRepliesContainer.innerHTML = '';
        setTimeout(() => {
          const resp = getResponse(r);
          addMessage(resp.text, 'bot');
          if (resp.quick) showQuickReplies(resp.quick);
        }, 500);
      });
      quickRepliesContainer.appendChild(btn);
    });
  }

  function sendChat() {
    if (!chatInput) return;
    const val = chatInput.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    if (quickRepliesContainer) quickRepliesContainer.innerHTML = '';
    setTimeout(() => {
      const resp = getResponse(val);
      addMessage(resp.text, 'bot');
      if (resp.quick) showQuickReplies(resp.quick);
    }, 600);
  }

  if (chatSend) chatSend.addEventListener('click', sendChat);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatOpen = !chatOpen;
      chatbotWindow.classList.toggle('open', chatOpen);
      const badge = chatbotToggle.querySelector('.chatbot-badge');
      if (badge) badge.style.display = 'none';
      if (chatOpen && !hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          const resp = botResponses['hello'];
          addMessage(resp.text, 'bot');
          showQuickReplies(resp.quick);
        }, 400);
      }
    });
  }
  if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => { chatOpen = false; chatbotWindow.classList.remove('open'); });
  }

  setTimeout(() => {
    const badge = chatbotToggle && chatbotToggle.querySelector('.chatbot-badge');
    if (badge) badge.style.display = 'flex';
  }, 3000);

  // ===== INSTAGRAM CAPTION GENERATOR =====
  const captionOutputs = [
    {
      text: "✨ Every strand tells a story. Your transformation starts here. 💜\n\nFrom the first consultation to the final reveal — we don't just do hair, we create confidence. Book your appointment and let's write your next chapter together.",
      tags: ['#LuxeBeautyStudio', '#HairTransformation', '#SalonLife', '#ColumbusHair', '#BeautyGoals']
    },
    {
      text: "That glow-up feeling when the cape comes off and you see yourself for the first time ✨\n\nThis. This is why we do what we do. 💇‍♀️ New hair, new you — same incredible you, just elevated.",
      tags: ['#NewHair', '#GlowUp', '#Balayage', '#LuxeBeauty', '#HairInspo']
    },
    {
      text: "Healthy hair is happy hair 🌿 We use only the finest low-damage, salon-grade formulas because your hair deserves nothing but the best.\n\nBook your color appointment this week — link in bio!",
      tags: ['#HealthyHair', '#HairColor', '#OlaplexTreated', '#SalonQuality', '#ColumbusOH']
    },
    {
      text: "Your weekend plans just got a whole lot prettier 💅\n\nSaturday appointments are filling fast — don't miss your chance to come in and be pampered by the Luxe team. You deserve it.",
      tags: ['#WeekendVibes', '#SalonDay', '#TreatYourself', '#LuxeSalon', '#ColumbusBeauty']
    },
    {
      text: "Before → After magic ✨ This gorgeous balayage took 3.5 hours of love, precision, and pure artistry.\n\nReady for your transformation? DM us or book online — let's create something beautiful together. 💜",
      tags: ['#BeforeAndAfter', '#Balayage', '#ColorCorrection', '#HairArtist', '#LuxeBeautyStudio']
    },
    {
      text: "5-star service, 5-star results ⭐⭐⭐⭐⭐\n\nThank you to all our incredible clients who trust us with your most important accessory — your hair. We're so grateful for every single one of you.",
      tags: ['#ClientLove', '#5Stars', '#Grateful', '#LuxeBeauty', '#ColumbusHairSalon']
    }
  ];

  let captionIndex = 0;
  const generateBtn = document.getElementById('generateCaption');
  const copyBtn = document.getElementById('copyCaption');
  const captionOutput = document.getElementById('captionOutput');
  const captionTagsEl = document.getElementById('captionTags');

  function renderCaption(cap) {
    if (captionOutput) captionOutput.textContent = cap.text;
    if (captionTagsEl) {
      captionTagsEl.innerHTML = '';
      cap.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'caption-tag';
        span.textContent = t;
        captionTagsEl.appendChild(span);
      });
    }
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      captionIndex = (captionIndex + 1) % captionOutputs.length;
      renderCaption(captionOutputs[captionIndex]);
      generateBtn.textContent = 'Generate Another';
    });
    renderCaption(captionOutputs[0]);
  }

  if (copyBtn && captionOutput) {
    copyBtn.addEventListener('click', () => {
      const tags = Array.from(captionTagsEl.querySelectorAll('.caption-tag')).map(t => t.textContent).join(' ');
      navigator.clipboard.writeText(captionOutput.textContent + '\n\n' + tags).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
      });
    });
  }

  // ===== SERVICE PICKER =====
  const pickCards = document.querySelectorAll('.service-pick-card');
  const serviceHidden = document.getElementById('selectedService');
  pickCards.forEach(card => {
    card.addEventListener('click', () => {
      pickCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (serviceHidden) serviceHidden.value = card.dataset.service || card.querySelector('span').textContent;
    });
  });

  // ===== BOOKING FORM =====
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = bookingForm.querySelector('[name=clientName]')?.value || 'Valued Guest';
      const service = bookingForm.querySelector('[name=service]')?.value || 'your selected service';
      const date = bookingForm.querySelector('[name=apptDate]')?.value || '';
      const time = bookingForm.querySelector('[name=apptTime]')?.value || '';
      openBookingConfirmModal(name, service, date, time);
    });
  }

  function openBookingConfirmModal(name, service, date, time) {
    const modal = document.getElementById('bookingConfirmModal');
    if (!modal) return;
    const nameEl = modal.querySelector('.conf-name');
    const serviceEl = modal.querySelector('.conf-service');
    const dateEl = modal.querySelector('.conf-date');
    if (nameEl) nameEl.textContent = name;
    if (serviceEl) serviceEl.textContent = service;
    if (dateEl) dateEl.textContent = date ? `${date} at ${time}` : 'Date TBD';
    openModal('bookingConfirmModal');
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      openModal('contactSuccessModal');
    });
  }

  // ===== REVIEW REQUEST DEMO =====
  const reviewDemoBtn = document.getElementById('reviewDemoBtn');
  if (reviewDemoBtn) {
    reviewDemoBtn.addEventListener('click', () => openModal('reviewRequestModal'));
  }

  // ===== REACTIVATION DEMO =====
  const reactivationBtn = document.getElementById('reactivationBtn');
  if (reactivationBtn) {
    reactivationBtn.addEventListener('click', () => openModal('reactivationModal'));
  }

  // ===== LAPSED CLIENT TRIGGER =====
  const lapsedBtn = document.getElementById('lapsedBtn');
  if (lapsedBtn) {
    lapsedBtn.addEventListener('click', () => openModal('lapsedModal'));
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.service-card, .stylist-card, .gallery-card, .testimonial-card, .membership-card, .auto-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
  document.addEventListener('animationend', () => {}, { once: true });
  document.querySelectorAll('.service-card, .stylist-card, .gallery-card, .testimonial-card, .membership-card, .auto-card, .stat-item').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  });
  const visibleObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.service-card, .stylist-card, .gallery-card, .testimonial-card, .membership-card, .auto-card, .stat-item').forEach(el => visibleObserver.observe(el));

});

// ===== MODAL HELPERS =====
window.openModal = function(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
};
window.closeModal = function(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
};
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
