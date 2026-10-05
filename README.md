# Portal de Líderes FGDLL · Versión refactorizada

Archivos principales:

- `index.html`: entrada pública con directorio, calendario, capítulos y CTA al portal.
- `portal.html`: tablero interno para líderes autorizados.
- `denuncias.html`: portal de Ética e Integridad, sin Tailwind ni dependencias externas.
- `styles.css`: sistema visual compartido con paleta oficial.
- `script.js`: lógica compartida para menú móvil, reveal, directorio, filtros, tabs, calendario y ética.

Notas:

- El portal está redactado como web app/PWA; los CTA usan “Acceder”, “Entrar” o “Abrir”.
- Los CTA usan “Acceder”, “Entrar” o “Abrir”.
- `denuncias.html` es una versión estática: el formulario genera un folio local, pero no envía información a un servidor.
- Para producción, conectar reportes y seguimiento a un backend seguro o formulario institucional autorizado.
- El directorio conserva los datos existentes del archivo `script.js` original.
