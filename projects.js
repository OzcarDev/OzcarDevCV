// projects.js - Funcionalidades específicas para la página de proyectos

class ProjectsManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupProjectModals();
        this.animateProjectCards();
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
                this.filterProjects(filter);
            });
        });
    }

    // Filtrar proyectos
    filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-categories').split(' ');
            
            if (category === 'all' || categories.includes(category)) {
                card.style.display = 'block';
                // Animación de aparición
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });

        this.currentFilter = category;
    }

    // Configurar modales de detalles
    setupProjectModals() {
        const detailButtons = document.querySelectorAll('.project-detail-btn');
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));

        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = e.target.getAttribute('data-project');
                this.showProjectDetails(projectId, modal);
            });
        });
    }

    // Mostrar detalles del proyecto en modal
    showProjectDetails(projectId, modal) {
        const projectDetails = this.getProjectDetails(projectId);
        const modalBody = document.getElementById('projectModalBody');
        const modalTitle = document.getElementById('projectModalLabel');

        modalTitle.textContent = projectDetails.title;
        modalBody.innerHTML = this.generateModalContent(projectDetails);
        
        modal.show();
    }

    // Detalles de cada proyecto
    getProjectDetails(projectId) {
        const projects = {
            'vr-helsing': {
                title: 'VR Helsing',
                description: 'Co-Game Designer and 3D Artist for this immersive VR horror experience. Responsible for weapon design, character modeling, and VFX systems.',
                longDescription: `
                    <p>VR Helsing is an immersive virtual reality horror game where players take on the role of a monster hunter in a gothic fantasy world.</p>
                    <p><strong>My contributions:</strong></p>
                    <ul>
                        <li>Co-designed all game systems and mechanics</li>
                        <li>Created 3D models for weapons, characters, and environment props</li>
                        <li>Developed VFX systems for spells, weapons, and environmental effects</li>
                        <li>Designed the "Limb Ripper" main weapon and "Demon" enemy character</li>
                        <li>Implemented gameplay systems in C#</li>
                    </ul>
                    <p><strong>Technologies:</strong> Unity, C#, Blender, Substance Painter, Shader Graph</p>
                `,
                technologies: ['Unity', 'VR', '3D Modeling', 'VFX', 'C#', 'Blender'],
                status: 'In Development',
                role: 'Co-Game Designer & 3D Artist',
                year: '2023-Present'
            },
            'photogenic': {
                title: 'Photogenic',
                description: 'Designed and programmed the innovative camera system that allows players to capture and save in-game moments.',
                longDescription: `
                    <p>Photogenic is a mobile game that combines exploration with photography mechanics, allowing players to capture beautiful moments in a stylized world.</p>
                    <p><strong>My contributions:</strong></p>
                    <ul>
                        <li>Designed and implemented the camera system from scratch</li>
                        <li>Created photo album system for storing and reviewing captured images</li>
                        <li>Developed UI/UX for camera controls and photo management</li>
                        <li>Optimized performance for mobile devices</li>
                    </ul>
                    <p><strong>Technologies:</strong> Unity, C#, Mobile Development, UI/UX Design</p>
                `,
                technologies: ['Unity', 'C#', 'Game Design', 'UI/UX', 'Mobile'],
                status: 'Completed',
                role: 'Game Designer & Programmer',
                year: '2022'
            },
            'crazy-delivery': {
                title: 'Crazy Delivery',
                description: 'Complete game design, 3D art, VFX, and UI development for this mobile delivery game.',
                longDescription: `
                    <p>Crazy Delivery is a fast-paced mobile game where players navigate challenging environments to make deliveries against the clock.</p>
                    <p><strong>My contributions:</strong></p>
                    <ul>
                        <li>Designed all game mechanics and progression systems</li>
                        <li>Created 3D models for vehicles and environment assets</li>
                        <li>Developed VFX for vehicle trails, explosions, and environmental effects</li>
                        <li>Designed and implemented the complete UI/UX system</li>
                        <li>Optimized for Android performance and various screen sizes</li>
                    </ul>
                    <p><strong>Technologies:</strong> Unity, 3D Modeling, VFX, UI Design, Mobile Optimization</p>
                `,
                technologies: ['Unity', '3D Art', 'VFX', 'UI Design', 'Mobile'],
                status: 'Published',
                role: 'Game Designer & 3D Artist',
                year: '2022'
            },
            'limb-ripper': {
                title: 'Limb Ripper',
                description: 'Pixel art style weapon design with detailed modeling and texturing for VR Helsing.',
                longDescription: `
                    <p>The Limb Ripper is the main weapon in VR Helsing, designed with a unique pixel art aesthetic that blends retro style with modern 3D graphics.</p>
                    <p><strong>Design features:</strong></p>
                    <ul>
                        <li>Low-poly modeling optimized for VR performance</li>
                        <li>Pixel art texturing with hand-painted details</li>
                        <li>Animated components for immersive VR interaction</li>
                        <li>Custom shaders for the pixel art effect</li>
                    </ul>
                    <p><strong>Software used:</strong> Blender, Substance Painter, Unity Shader Graph</p>
                `,
                technologies: ['3D Modeling', 'Texturing', 'Pixel Art', 'Weapon Design'],
                status: 'Completed',
                role: '3D Artist',
                year: '2023'
            }
        };

        return projects[projectId] || projects['vr-helsing'];
    }

    // Generar contenido del modal
    generateModalContent(project) {
        return `
            <div class="project-modal-content">
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="display-6">Project Overview</h4>
                        <div class="project-meta mb-4">
                            <div class="meta-item">
                                <strong>Role:</strong> ${project.role}
                            </div>
                            <div class="meta-item">
                                <strong>Status:</strong> <span class="status-badge">${project.status}</span>
                            </div>
                            <div class="meta-item">
                                <strong>Year:</strong> ${project.year}
                            </div>
                        </div>
                        ${project.longDescription}
                    </div>
                    <div class="col-md-6">
                        <h4 class="display-6">Technologies</h4>
                        <div class="tech-tags-modal mb-4">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <h4 class="display-6">Key Features</h4>
                        <ul class="feature-list">
                            ${project.longDescription.includes('Co-designed') ? '<li>Complete game system design</li>' : ''}
                            ${project.technologies.includes('3D Modeling') ? '<li>3D asset creation</li>' : ''}
                            ${project.technologies.includes('VFX') ? '<li>Visual effects implementation</li>' : ''}
                            ${project.technologies.includes('UI/UX') ? '<li>User interface design</li>' : ''}
                            <li>Performance optimization</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // Animaciones para las tarjetas de proyecto
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card-inner');
        
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('slide-in-bottom');
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});