# Federico Humada (@fedehda) - Personal Portfolio 🚀

Portfolio web moderno y responsivo para GitHub Pages (`https://fedehda.github.io/`), destacando proyectos de código abierto en desarrollo full-stack, ingeniería de sistemas y hardware.

---

## 🌟 Características

- **Diseño Ultra-Moderno:** Estética oscura tecnológica (*Deep Dark Theme*) con detalles *glassmorphism*, degradados sutiles y micro-interacciones.
- **Zero-Build & Ultra-Rápido:** Desarrollado con HTML5 semántico, CSS moderno estructurado y JavaScript vanilla (ES Modules). No requiere pasos pesados de compilación; GitHub Pages lo sirve de forma instantánea al hacer `git push`.
- **Filtros Interactivos de Proyectos:** Filtrado dinámico por categorías: *Full-Stack & Web*, *Hardware & IoT*, *Sistemas & C++*.
- **Sincronización en Vivo con GitHub API:** Consulta progresiva de estadísticas (estrellas, forks y última actualización) con almacenamiento en caché local (*localStorage*) para respetar los límites de la API de GitHub y fallback estático instantáneo.
- **100% Responsivo:** Adaptado a pantallas de móviles, tablets y monitores ultrawide.

---

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5 Semántico, CSS3 moderno (Variables CSS, Flexbox, Grid, Container Queries), JavaScript ES6+ (ES Modules).
- **Tipografía:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- **Hosting:** [GitHub Pages](https://pages.github.com/).

---

## 💻 Visualización y Prueba Local

Para probar el portfolio en tu máquina local con cualquier servidor web ligero:

### Opción 1: Con Python (incluido por defecto)
```bash
python -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080`.

### Opción 2: Con Node.js / npx
```bash
npx serve .
```

---

## 🚀 Despliegue en GitHub Pages

Dado que este repositorio es `fedehda.github.io`, cualquier commit en la rama `main` se publica automáticamente en:

👉 **[https://fedehda.github.io/](https://fedehda.github.io/)**

Para publicar los cambios:
```bash
git add .
git commit -m "feat: actualizar portfolio interactivo con proyectos destacados"
git push origin main
```
