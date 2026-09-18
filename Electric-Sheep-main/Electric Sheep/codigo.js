document.addEventListener("DOMContentLoaded", () => {
        // 1. Año dinámico en el footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // 2. Funcionalidad del Navbar (Scroll y Menú Móvil)
        const header = document.getElementById('header');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
        
        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });

        // 3. Animaciones de "Revelar" al hacer scroll
        const reveals = document.querySelectorAll('.reveal');
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;
            
            reveals.forEach(reveal => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Ejecutar al cargar

        // 4. Envío de formulario Formspree mediante AJAX
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeModal');

        if(contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // Evita la redirección predeterminada
                const btn = contactForm.querySelector('button[type="submit"]');
                const msgDiv = document.getElementById('formMessage');
                
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitiendo...';
                btn.disabled = true;
                msgDiv.innerHTML = '';
                
                try {
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: new FormData(contactForm),
                        headers: { 'Accept': 'application/json' }
                    });
                    
                    if (response.ok) {
                        successModal.classList.add('active'); // Muestra la ventana modal
                        contactForm.reset();
                    } else {
                        msgDiv.innerHTML = '<span class="msg-error">Error al enviar. Intenta de nuevo.</span>';
                    }
                } catch (error) {
                    msgDiv.innerHTML = '<span class="msg-error">Error de red. Revisa tu conexión.</span>';
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            });
        }

        // 5. Cerrar ventana Modal
        if(closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }
    });