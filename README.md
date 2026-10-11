# SAGAZ · Sitio público

**Haz que tu operación trabaje conectada.**

Sitio público de SAGAZ, una plataforma modular orientada a conectar la atención al cliente y la operación empresarial. Este repositorio presenta el producto, sus áreas de aplicación y sus puntos de acceso.

[Ver SAGAZ](https://sagaz.cloud/) · [Solicitar una demostración](https://sagaz.cloud/demo.html) · [Perfil del creador](https://github.com/juanarmentag)

## Qué puedes explorar

| Área | Página |
| --- | --- |
| Atención y seguimiento de clientes | [CRM](https://sagaz.cloud/crm.html) |
| Asistencia para la operación con IA | [Intelligence](https://sagaz.cloud/intelligence.html) |
| Gestión académica | [Academy](https://sagaz.cloud/academy.html) |
| Operación inmobiliaria | [Bienes raíces](https://sagaz.cloud/bienes-raices.html) |

El sitio también incluye páginas de conversaciones, inventario, ventas, finanzas, caja, reportes, usuarios y marketing.

## Alcance del repositorio

Aquí se encuentra el sitio de presentación construido con **HTML, CSS y JavaScript**. La aplicación empresarial y sus implementaciones se mantienen en repositorios privados; las páginas de producto describen su propuesta y no sustituyen una demostración funcional.

## Decisiones de implementación visibles

- HTML organizado en páginas por módulo y área de aplicación.
- Estilos y comportamiento compartidos en `css/` y `js/`.
- Diseño adaptable a distintos tamaños de pantalla.
- Metadatos para buscadores y redes sociales, URL canónica y sitemap.
- Versionado de referencias a CSS y JavaScript para invalidar caché tras actualizaciones.

## Estructura principal

- `index.html`: presentación de SAGAZ.
- `crm.html`, `intelligence.html`, `academy.html`, `bienes-raices.html`: páginas principales del producto.
- `demo.html`: solicitud de demostración.
- `css/` y `js/`: recursos compartidos.
- `assets/`: imágenes y recursos visuales.
- `sitemap.xml` y `robots.txt`: descubrimiento del sitio.
- `politica-de-privacidad.html`: información de privacidad.

## Revisar localmente

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abrir [http://localhost:8000](http://localhost:8000).

## Creador

**Juan Manuel Armenta Guillen** — creador de SAGAZ, enfocado en mejorar procesos empresariales mediante software desarrollado con apoyo de IA e interfaces que faciliten la adopción por parte del personal.

[GitHub](https://github.com/juanarmentag) · [LinkedIn](https://www.linkedin.com/in/juan-armenta-20b69023b/)
