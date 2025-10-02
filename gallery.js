// gallery.js - Funcionalidades específicas para la página de galería

class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupLightbox();
        this.animateGalleryItems();
        this.setupSmoothLoading();
    }

    // Configurar botones de filtro
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-buttons .btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                e.target.classList.add('active');
                
                // Aplicar filtro
                const filter = e.target.getAttribute('data-filter');
                this.filterGallery(filter);
            });
        });
    }

    // Filtrar galería
    filterGallery(category) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const categories = item.getAttribute('data-categories').split(' ');
            
            if (category === 'all' || categories.includes(category)) {
                item.style.display = 'block';
                // Animación de aparición
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        this.currentFilter = category;
    }

    // Configurar lightbox/modal
    setupLightbox() {
        const viewButtons = document.querySelectorAll('.view-details-btn');
        const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));

        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-item');
                this.showItemDetails(itemId, modal);
            });
        });
    }

    // Mostrar detalles del item en modal
    showItemDetails(itemId, modal) {
        const itemDetails = this.getItemDetails(itemId);
        const modalBody = document.getElementById('lightboxContent');
        const modalTitle = document.getElementById('lightboxTitle');

        modalTitle.textContent = itemDetails.title;
        modalBody.innerHTML = this.generateLightboxContent(itemDetails);
        
        modal.show();
    }

    // Detalles de cada item de galería
    getItemDetails(itemId) {
        const items = {
            'limb-ripper': {
                title: 'Limb Ripper - 3D Weapon',
                type: '3D Model',
                description: 'Main weapon for VR Helsing with unique pixel art aesthetic and detailed mechanics.',
                fullDescription: `
                    <p>The Limb Ripper is the primary weapon in VR Helsing, designed to blend retro pixel art aesthetics with modern 3D game development techniques.</p>
                    
                    <h4>Design Features:</h4>
                    <ul>
                        <li><strong>Low-Poly Modeling:</strong> Optimized for VR performance while maintaining visual quality</li>
                        <li><strong>Pixel Art Texturing:</strong> Hand-painted textures with retro gaming inspiration</li>
                        <li><strong>Animated Components:</strong> Moving parts for immersive VR interaction</li>
                        <li><strong>Custom Shaders:</strong> Specialized shaders to achieve the pixel art effect in 3D</li>
                        <li><strong>Weapon Mechanics:</strong> Designed with game balance and player experience in mind</li>
                    </ul>

                    <h4>Technical Specifications:</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Polygon Count:</strong> 2,500 tris<br>
                            <strong>Texture Resolution:</strong> 2048x2048<br>
                            <strong>Rigged:</strong> Yes (for animations)<br>
                        </div>
                        <div class="col-md-6">
                            <strong>Software Used:</strong> Blender, Substance Painter<br>
                            <strong>Game Engine:</strong> Unity<br>
                            <strong>Platform:</strong> VR Ready<br>
                        </div>
                    </div>
                `,
                software: ['Blender', 'Substance Painter', 'Unity'],
                year: '2023',
                category: 'Weapon Design'
            },
            'graveyard': {
                title: 'Graveyard Environment - VR Helsing',
                type: '3D Environment',
                description: 'Low poly pixel art environment set creating gothic atmosphere for VR Helsing.',
                fullDescription: `
                    <p>Complete graveyard environment set for VR Helsing, designed to create an immersive gothic horror atmosphere while maintaining performance for VR.</p>
                    
                    <h4>Environment Features:</h4>
                    <ul>
                        <li><strong>Modular Design:</strong> Reusable components for level building</li>
                        <li><strong>Atmospheric Lighting:</strong> Custom lighting setup for horror mood</li>
                        <li><strong>Optimized Performance:</strong> Low poly count for smooth VR experience</li>
                        <li><strong>Pixel Art Consistency:</strong> Maintains game's visual style throughout</li>
                        <li><strong>Interactive Elements:</strong> Props with physics and interaction points</li>
                    </ul>

                    <h4>Asset Breakdown:</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Main Assets:</strong> 15 unique models<br>
                            <strong>Total Polygons:</strong> ~15,000 tris<br>
                            <strong>Texture Sets:</strong> 3 main material sets<br>
                        </div>
                        <div class="col-md-6">
                            <strong>Light Probes:</strong> Custom baked lighting<br>
                            <strong>Collision Meshes:</strong> Optimized for performance<br>
                            <strong>LODs:</strong> 3 levels of detail<br>
                        </div>
                    </div>
                `,
                software: ['Blender', 'Unity'],
                year: '2023',
                category: 'Environment Art'
            },
            'pixel-characters': {
                title: 'Pixel Art Character Collection',
                type: '2D Art',
                description: 'Custom pixel art character designs for various game projects.',
                fullDescription: `
                    <p>A collection of pixel art characters created for different game projects, each with unique personalities and visual styles.</p>
                    
                    <h4>Artistic Approach:</h4>
                    <ul>
                        <li><strong>Custom Style:</strong> Unique pixel art aesthetic for each project</li>
                        <li><strong>Animation Ready:</strong> Designed with sprite animation in mind</li>
                        <li><strong>Color Theory:</strong> Carefully selected palettes for mood and readability</li>
                        <li><strong>Character Personality:</strong> Visual design reflects character backstory</li>
                        <li><strong>Technical Constraints:</strong> Optimized for game performance</li>
                    </ul>

                    <h4>Technical Details:</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Resolution:</strong> Various (16x16 to 64x64)<br>
                            <strong>Color Depth:</strong> Limited palettes<br>
                            <strong>Animation Frames:</strong> 4-8 per character<br>
                        </div>
                        <div class="col-md-6">
                            <strong>Software Used:</strong> Aseprite, Photoshop<br>
                            <strong>Export Formats:</strong> PNG sprite sheets<br>
                            <strong>Game Ready:</strong> Yes<br>
                        </div>
                    </div>
                `,
                software: ['Aseprite', 'Photoshop'],
                year: '2022-2023',
                category: 'Character Design'
            },
            'demon': {
                title: 'VR Helsing Demon - Enemy Character',
                type: '3D Character',
                description: 'Main enemy character with detailed modeling and terrifying presence.',
                fullDescription: `
                    <p>The Demon is one of the primary antagonists in VR Helsing, designed to be both terrifying and technically impressive in VR.</p>
                    
                    <h4>Character Design:</h4>
                    <ul>
                        <li><strong>Horror Aesthetic:</strong> Designed to evoke fear in VR environment</li>
                        <li><strong>Animated Rig:</strong> Full skeletal rig for complex animations</li>
                        <li><strong>Material Variety:</strong> Different shaders for skin, claws, effects</li>
                        <li><strong>VR Presence:</strong> Scale and proportions optimized for VR impact</li>
                        <li><strong>Gameplay Integration:</strong> Design supports enemy AI behaviors</li>
                    </ul>

                    <h4>Technical Specifications:</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Polygon Count:</strong> 8,500 tris<br>
                            <strong>Bone Count:</strong> 42 bones<br>
                            <strong>Texture Maps:</strong> Diffuse, Normal, Specular, Emission<br>
                        </div>
                        <div class="col-md-6">
                            <strong>Animation Clips:</strong> 12 different animations<br>
                            <strong>Software Used:</strong> Blender, ZBrush, Substance<br>
                            <strong>VR Optimized:</strong> Yes<br>
                        </div>
                    </div>
                `,
                software: ['Blender', 'ZBrush', 'Substance Painter'],
                year: '2023',
                category: 'Character Design'
            }
        };

        return items[itemId] || items['limb-ripper'];
    }

    // Generar contenido del lightbox
    generateLightboxContent(item) {
        return `
            <div class="lightbox-content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="lightbox-image mb-4">
                            <!-- Aquí iría la imagen/embed del item -->
                            <div class="placeholder-image" style="background: rgba(235, 1, 125, 0.1); height: 300px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                <span class="fs-3">3D Preview</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="lightbox-details">
                            <div class="detail-item mb-3">
                                <strong>Type:</strong> ${item.type}
                            </div>
                            <div class="detail-item mb-3">
                                <strong>Category:</strong> ${item.category}
                            </div>
                            <div class="detail-item mb-3">
                                <strong>Year:</strong> ${item.year}
                            </div>
                            <div class="detail-item mb-3">
                                <strong>Software:</strong> 
                                <div class="software-tags mt-2">
                                    ${item.software.map(soft => `<span class="tech-tag">${soft}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">
                        <h4 class="display-6">Description</h4>
                        ${item.fullDescription}
                    </div>
                </div>
            </div>
        `;
    }

    // Animaciones para los items de galería
    animateGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-card-inner');
        
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('slide-in-bottom');
        });
    }

    // Carga suave de imágenes
    setupSmoothLoading() {
        const images = document.querySelectorAll('.gallery-image');
        
        images.forEach(img => {
            // Agregar efecto de carga
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            // Precargar imágenes
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    }

    // Búsqueda en galería (opcional)
    setupSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search gallery...';
        searchInput.className = 'form-control mb-4';
        searchInput.style.maxWidth = '300px';
        searchInput.style.margin = '0 auto';
        
        const filtersSection = document.querySelector('#gallery-filters .container-fluid .row');
        filtersSection.appendChild(searchInput);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.searchGallery(searchTerm);
        });
    }

    searchGallery(term) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('.gallery-title').textContent.toLowerCase();
            const description = item.querySelector('.gallery-description').textContent.toLowerCase();
            const tech = item.querySelector('.gallery-tech').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term) || tech.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const galleryManager = new GalleryManager();
    
    // Opcional: agregar búsqueda
    // galleryManager.setupSearch();
});