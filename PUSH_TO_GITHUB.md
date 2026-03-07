# Subir a GitHub

El commit inicial ya está hecho. Para crear el repo **stripe-api-nif** y subir el código:

1. **Crea el repositorio en GitHub**
   - Entra en https://github.com/new
   - Nombre del repositorio: **stripe-api-nif**
   - Elige público y **no** marques "Add a README" (ya hay uno)
   - Clic en "Create repository"

2. **En esta carpeta (stripe-api), ejecuta** (sustituye `TU_USUARIO` por tu usuario de GitHub):

   ```bash
   git remote add origin https://github.com/TU_USUARIO/stripe-api-nif.git
   git branch -M main
   git push -u origin main
   ```

Listo. El código quedará en `https://github.com/TU_USUARIO/stripe-api-nif`.
