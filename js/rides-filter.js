// ============================================
// RIDE FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const rideCards = document.querySelectorAll('.ride-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        rideCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s both`;
            } else {
                card.style.display = 'none';
            }
        });
    });
});
