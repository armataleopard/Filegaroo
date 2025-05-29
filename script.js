document.addEventListener('DOMContentLoaded', function() {
    // Glowing eyes effect on scroll
    const filegarooImg = document.getElementById('filegaroo-img');
    if (filegarooImg) {
        window.addEventListener('scroll', function() {
            const rect = filegarooImg.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isVisible) {
                filegarooImg.classList.add('eyes-glow');
            } else {
                filegarooImg.classList.remove('eyes-glow');
            }
        });
    }
    
    // Flying files animation
    const fileEmojis = ['📁', '📄', '🗂️', '📑', '🗃️', '💾', '📂', '🗄️'];
    const flyingFilesContainer = document.getElementById('flying-files-container');
    
    function createFlyingFile() {
        if (!flyingFilesContainer) return;
        
        const file = document.createElement('div');
        file.className = 'flying-file';
        file.textContent = fileEmojis[Math.floor(Math.random() * fileEmojis.length)];
        file.style.setProperty('--y-pos', `${Math.random() * 100}vh`);
        
        flyingFilesContainer.appendChild(file);
        
        // Remove the element after animation completes
        setTimeout(() => {
            file.remove();
        }, 15000);
    }
    
    // Create a new flying file every 3 seconds
    setInterval(createFlyingFile, 3000);
    createFlyingFile(); // Create one immediately
    
    // Reason bubbles animation on scroll
    const reasonBubbles = document.querySelectorAll('.reason-bubble');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    reasonBubbles.forEach(bubble => {
        observer.observe(bubble);
    });
    
    // Lore carousel
    const loreItems = document.querySelectorAll('.lore-item');
    const prevLoreBtn = document.getElementById('prev-lore');
    const nextLoreBtn = document.getElementById('next-lore');
    let currentLoreIndex = 0;
    
    function showLoreItem(index) {
        loreItems.forEach((item, i) => {
            item.classList.toggle('hidden', i !== index);
        });
    }
    
    if (prevLoreBtn && nextLoreBtn) {
        prevLoreBtn.addEventListener('click', () => {
            currentLoreIndex = (currentLoreIndex - 1 + loreItems.length) % loreItems.length;
            showLoreItem(currentLoreIndex);
        });
        
        nextLoreBtn.addEventListener('click', () => {
            currentLoreIndex = (currentLoreIndex + 1) % loreItems.length;
            showLoreItem(currentLoreIndex);
        });
    }
    
    // Interactive drop zone
    const dropZone = document.getElementById('drop-zone');
    const successMessage = document.getElementById('success-message');
    
    if (dropZone && successMessage) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropZone.classList.add('drag-over');
        }
        
        function unhighlight() {
            dropZone.classList.remove('drag-over');
        }
        
        dropZone.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
        
        // Also handle click for better UX
        dropZone.addEventListener('click', () => {
            successMessage.classList.remove('hidden');
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        });
    }
    
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Add zip-in animation to sections
    const sections = document.querySelectorAll('section');
    const zipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('zip-in')) {
                entry.target.classList.add('zip-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        zipObserver.observe(section);
    });
}); 