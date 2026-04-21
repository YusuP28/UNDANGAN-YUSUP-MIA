document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audioInv');
    const musicBtn = document.getElementById('musicBtn');
    const cover = document.getElementById('cover-overlay');
    
    // Fitur Tangkap Nama Tamu dari URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    if (namaTamu && document.getElementById('nama-tamu')) {
        document.getElementById('nama-tamu').innerText = namaTamu;
    }

    window.bukaUndangan = function() {
        if (cover) {
            cover.style.transform = 'translateY(-100%)';
            setTimeout(() => cover.style.display = 'none', 1000);
        }
        if (audio) {
            audio.play();
            updateMusicIcon(true);
        }
    };

    if (musicBtn && audio) {
        musicBtn.onclick = () => {
            if (audio.paused) { audio.play(); updateMusicIcon(true); }
            else { audio.pause(); updateMusicIcon(false); }
        };
    }

    function updateMusicIcon(playing) {
        if (musicBtn) musicBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
    }

    // Countdown Logic
    const target = new Date("June 14, 2026 09:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
        }
    }, 1000);

    // Gallery Auto-load
    const gallery = document.getElementById('galleryGrid');
    if (gallery) {
        for (let i = 3; i <= 23; i++) {
            let img = document.createElement('img');
            img.src = `images/${i}.jpg`;
            img.loading = 'lazy';
            gallery.appendChild(img);
        }
    }

    // Copy Number
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.onclick = function() {
            navigator.clipboard.writeText(this.dataset.copy);
            alert("Nomor rekening berhasil disalin!");
        };
    });
});
