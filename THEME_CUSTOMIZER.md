# Theme Customizer - Guía de Uso

## 📋 Descripción

El Theme Customizer es un sistema que permite a tu cliente personalizar los colores de la página web en tiempo real, escogiendo entre la paleta de colores de la marca InBalanZ. Los cambios se guardan automáticamente en el navegador del cliente.

## 🎨 Características

- **Personalización por sección**: El cliente puede cambiar colores de:
  - Color Principal (Headers, Navegación)
  - Color de Acento (Botones, Enlaces)
  - Color de Acento Secundario (Detalles)
  - Color de Fondo (Secciones)
  - Color Neutral (Bordes, Grises)

- **Paletas predefinidas**: 4 paletas basadas en los colores de la marca
- **Persistencia**: Los colores se guardan en localStorage
- **Exportación**: El cliente puede exportar su configuración en JSON
- **Responsive**: Funciona perfectamente en móviles y tablets
- **Bilingüe**: Interfaz en español e inglés

## 🔧 Activar/Desactivar el Customizer

Para activar o desactivar el Theme Customizer, edita el archivo:

```javascript
// src/config/themeConfig.js

export const ENABLE_THEME_CUSTOMIZER = true;  // Cambiar a false para ocultar
```

**true** = El botón flotante de personalización aparece en la página
**false** = El customizer está completamente oculto

## 🎯 Cómo Usar el Customizer

### Para tu Cliente:

1. **Abrir el panel**: Click en el botón flotante con ícono de paleta (lado derecho inferior)

2. **Pestaña "Colores"**:
   - Usa el selector de color (círculo) para elegir visualmente
   - O escribe el código hexadecimal directamente
   - Los cambios se aplican instantáneamente en toda la página

3. **Pestaña "Paletas"**:
   - Click en cualquier paleta predefinida para aplicarla
   - Las paletas están diseñadas siguiendo la guía de marca

4. **Botones de acción**:
   - **Restablecer**: Vuelve a los colores originales de la marca
   - **Exportar**: Descarga un archivo JSON con la configuración actual

5. **Cerrar**: Click en la X o en el área oscura fuera del panel

## 📁 Estructura de Archivos

```
src/
├── config/
│   └── themeConfig.js              # Configuración y flag de activación
├── hooks/
│   └── useThemeCustomizer.js       # Lógica del customizer
├── components/
│   └── ThemeCustomizer.jsx         # Componente UI del panel
└── styles/
    └── style.css                   # Estilos del customizer (al final)
```

## 🎨 Paleta de Colores de la Marca

### Paleta Original
- **Primary Color**: #002335 (Dark Blue)
- **Accent Color**: #5C7205 (Olive Green)
- **Accent Secondary**: #8A862F (Lime Green)
- **Background**: #F4FFE6 (Light)
- **Neutral**: #DADADA (Gray)

### Paleta Azul
- Primary: #014086 (Medium Blue)
- Accent: #002335 (Dark Blue)
- Secondary: #5C7205 (Olive Green)

### Paleta Verde
- Primary: #5C7205 (Olive Green)
- Accent: #8A862F (Lime Green)
- Secondary: #002335 (Dark Blue)

### Paleta Oscura
- Primary: #000000 (Black)
- Accent: #5C7205 (Olive Green)
- Secondary: #8A862F (Lime Green)

## 💾 Persistencia de Datos

Los colores seleccionados se guardan en:
- **localStorage** del navegador del cliente
- **Key**: `inbalanz_theme_colors`
- Los colores persisten entre sesiones
- Se aplican automáticamente al recargar la página

## 🔄 Flujo de Trabajo Recomendado

### Durante el desarrollo con el cliente:

1. **Activar el customizer**: `ENABLE_THEME_CUSTOMIZER = true`
2. Reúnete con el cliente
3. El cliente prueba diferentes combinaciones de colores
4. Cuando encuentre la combinación perfecta, click en "Exportar"
5. El cliente te envía el archivo JSON descargado

### Para aplicar los colores permanentemente:

6. Copia los valores del JSON exportado
7. Pega los valores en las variables CSS de `src/styles/style.css`:

```css
:root {
    --primary-color: #VALOR_DEL_JSON;
    --accent-color: #VALOR_DEL_JSON;
    --accent-secondary: #VALOR_DEL_JSON;
    --secondary-color: #VALOR_DEL_JSON;
    --neutral-light: #VALOR_DEL_JSON;
}
```

8. **Desactivar el customizer**: `ENABLE_THEME_CUSTOMIZER = false`
9. Hacer commit de los cambios finales

## 🚀 Ventajas del Sistema

- **Sin editar código**: El cliente no necesita conocimientos técnicos
- **Tiempo real**: Los cambios son instantáneos
- **Seguro**: Solo afecta variables CSS, no modifica estructura
- **Reversible**: Siempre puede volver a los valores originales
- **Exportable**: Fácil transferencia de configuración
- **On/Off simple**: Un solo booleano controla todo el sistema

## 🛠️ Personalización Avanzada

### Agregar nuevas secciones de color:

Edita `src/config/themeConfig.js` y agrega a `COLOR_SECTIONS`:

```javascript
{
    id: 'nuevoColor',
    label: {
        es: 'Descripción en Español',
        en: 'Description in English'
    },
    cssVar: '--nueva-variable-css'
}
```

### Agregar nueva paleta predefinida:

Agrega a `PRESET_PALETTES` en el mismo archivo:

```javascript
{
    name: { es: 'Mi Paleta', en: 'My Palette' },
    colors: {
        primaryColor: '#XXXXXX',
        accentColor: '#XXXXXX',
        // ... resto de colores
    }
}
```

## 📱 Responsive

- **Desktop**: Panel lateral de 400px
- **Tablet**: Panel lateral de 400px
- **Mobile**: Panel ocupa pantalla completa
- Botón flotante se ajusta automáticamente

## ⚠️ Notas Importantes

1. Los colores solo se guardan en el navegador del cliente (localStorage)
2. Si el cliente borra el caché del navegador, los colores se resetean
3. Por eso es importante usar el botón "Exportar" para guardar la configuración
4. Recuerda desactivar el customizer antes del despliegue final en producción

## 🎓 Ejemplo de Uso con el Cliente

```
Cliente: "Quiero ver cómo se ve la página con más verde"
Tú: "Abre el botón de la paleta y prueba la 'Paleta Verde'"
Cliente: *Prueba* "Me gusta, pero quiero el botón un poco más oscuro"
Tú: "Ajusta el 'Color de Acento' en la pestaña Colores"
Cliente: *Ajusta* "Perfecto! Así me gusta"
Tú: "Click en 'Exportar' y envíame el archivo para aplicarlo permanentemente"
```

## 📞 Soporte

Si necesitas modificar o extender el sistema, los archivos principales son:
- **Config**: `src/config/themeConfig.js`
- **Lógica**: `src/hooks/useThemeCustomizer.js`
- **UI**: `src/components/ThemeCustomizer.jsx`
- **Estilos**: `src/styles/style.css` (líneas 3880+)
