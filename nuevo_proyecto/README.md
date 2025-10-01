# Fiberquil - Sitio Web Limpio

## Descripción
Esta es una versión limpia y moderna del sitio web de Fiberquil, creada desde cero con HTML, CSS y JavaScript vanilla (sin dependencias externas pesadas).

## Estructura del Proyecto

```
#nuevo_proyecto/
├── index.html          # Archivo HTML principal
├── style.css           # Estilos CSS personalizados
├── script.js           # JavaScript para interactividad
└── README.md          # Este archivo
```

## Características

### ✨ Funcionalidades Principales

1. **Navegación Responsive**
   - Menú hamburguesa para móviles
   - Menú desplegable para servicios, productos y proyectos
   - Header que cambia de color al hacer scroll
   - Efecto de ocultación/mostrado del header al scroll

2. **Sección Hero**
   - Imagen de fondo con overlay
   - Título animado
   - Botón de llamada a la acción

3. **Timeline de Historia**
   - Línea de tiempo visual
   - Animaciones al hacer scroll
   - Diseño alternado

4. **Secciones de Contenido**
   - Banner de 20 años
   - Cards de características (Empresa, Misión, Por qué nosotros)
   - Acordeón de información

5. **Footer**
   - Enlaces de navegación
   - Redes sociales
   - Información de contacto

6. **Botones Flotantes**
   - Botón de WhatsApp
   - Botón de scroll to top

### 🎨 Diseño

- **Colores Principales:**
  - Naranja: `#FE9603`
  - Azul: `#073C8B`
  - Oscuro: `#1a1a1a`
  - Claro: `#f8f9fa`

- **Tipografías:**
  - Poppins (principal)
  - Montserrat (secundaria)

### 📱 Responsive Design

El sitio es completamente responsive y se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (hasta 767px)

## Ventajas sobre la Versión Original

1. **Código Limpio**: Sin dependencias de múltiples frameworks
2. **Mejor Performance**: Archivos más ligeros y carga más rápida
3. **Mantenibilidad**: Código organizado y fácil de modificar
4. **Personalización**: Todo el CSS es personalizado y modificable
5. **SEO Optimizado**: Estructura semántica correcta

## Recursos Utilizados

### CDNs Externos (Mínimos)
- Google Fonts (Poppins, Montserrat)
- Font Awesome 6.4.0
- Animate.css 4.1.1

### Imágenes
Todas las imágenes se cargan desde la carpeta `../img/` del proyecto principal:
- Logo: `../img/logoFiber-removebg.png`
- Hero: `../img/cableado.jpg`
- Banner: `../img/banner_20años.png`
- Favicon: `../img/iconoSmall.png`

## Cómo Usar

1. **Abrir el sitio:**
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local (Live Server en VS Code)

2. **Modificar estilos:**
   - Todos los estilos están en `style.css`
   - Las variables CSS están al inicio del archivo para fácil personalización

3. **Agregar funcionalidad:**
   - Agrega tu código JavaScript en `script.js`
   - El código está bien comentado y organizado

## Personalización

### Cambiar Colores
Edita las variables CSS en `style.css`:

```css
:root {
    --primary-color: #FE9603;
    --secondary-color: #073C8B;
    --dark-color: #1a1a1a;
    --light-color: #f8f9fa;
}
```

### Agregar Secciones
Sigue la estructura existente:

```html
<section id="tu-seccion" class="section">
    <div class="container">
        <!-- Tu contenido aquí -->
    </div>
</section>
```

### Modificar Navegación
Edita la lista `<ul class="nav-menu">` en `index.html`

## JavaScript Incluido

- Navegación móvil con menú hamburguesa
- Smooth scrolling
- Acordeón interactivo
- Animaciones on scroll (Intersection Observer)
- Botón scroll to top
- Header sticky con efectos
- Active navigation highlight

## Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Mobile browsers

## Próximos Pasos Sugeridos

1. Agregar formulario de contacto funcional
2. Integrar Google Maps para ubicaciones
3. Agregar galería de imágenes/proyectos
4. Implementar lazy loading para imágenes
5. Agregar animaciones adicionales
6. Optimizar imágenes (WebP, etc.)

## Soporte

Para cualquier consulta o mejora, contacta al equipo de desarrollo.

---

**Fiberquil S.R.L** - Fibra Óptica y Cableado Estructurado
