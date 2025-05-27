## Política de Seguridad de Contenido (CSP) Recomendada
```http
Content-Security-Policy: 
    default-src 'self';
    script-src 'self' https://cdn.jsdelivr.net;
    style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline';
    img-src 'self' data:;
    font-src 'self';
    connect-src 'self' https://api.lactanido.com;
    frame-ancestors 'none';
```