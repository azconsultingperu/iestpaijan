#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES_DIR="$ROOT/portal/imagenes"
FAIL=0
echo "=== Validating media assets (WebP only) ==="

# 1. Only WebP files may be stored in the image directory.
found=$(find "$IMAGES_DIR" -type f -not -name "*.webp" || true)
if [ -n "$found" ]; then
  count=$(echo "$found" | wc -l)
  echo "ERROR: Non-WebP files found:"
  echo "$found" | head -n 20
  echo "Total residual: $count"
  FAIL=1
else
  echo "✓ Image directory contains only WebP files"
fi

# 2. Check that critical images exist as WebP.
for base in portal/imagenes/carreras/acc_bg portal/imagenes/carreras/enfermeria_bg portal/imagenes/carreras/pagro_bg portal/imagenes/bolsa_trabajo/old-egresados_alumnos; do
  if [ ! -f "$ROOT/$base.webp" ]; then echo "ERROR: Missing $base.webp"; FAIL=1; else echo "✓ $base.webp exists"; fi
done

# 3. Check JS references don't contain .jpg/.png literals (except logo exception)
js_jpg=$(grep -rn '\.jpg\|\.jpeg' "$ROOT/portal/js" --include="*.js" | grep -v "placeHolder\|image/avif\|image/webp\|\.avif\|\.webp\|\.svg\|logo-transp" || true)
if [ -n "$js_jpg" ]; then
  echo "ERROR: JS still contains .jpg/.jpeg literals:"
  echo "$js_jpg" | head -20
  FAIL=1
else
  echo "✓ JS contains no .jpg literals for content images"
fi

js_png=$(grep -rn '\.png"' "$ROOT/portal/js" --include="*.js" | grep -v "logo-transp" || true)
if [ -n "$js_png" ]; then
  echo "ERROR: JS still contains .png literals:"
  echo "$js_png" | head -20
  FAIL=1
else
  echo "✓ JS contains no .png literals for content images"
fi

# 4. Check CSS image-set doesn't contain .jpg
css_jpg=$(grep -rn '\.jpg' "$ROOT/portal/css" --include="*.css" || true)
if [ -n "$css_jpg" ]; then
  echo "ERROR: CSS still contains .jpg:"
  echo "$css_jpg" | head -20
  FAIL=1
else
  echo "✓ CSS contains no .jpg"
fi

# 5. Check HTML <picture> fallbacks are webp not jpg/png
html_jpg=$(grep -rn '<img src.*\.jpg\|<img src.*\.png"' "$ROOT/portal" --include="*.html" | grep -v "logo-transp" || true)
if [ -n "$html_jpg" ]; then
  echo "ERROR: HTML still contains <img src *.jpg/*.png fallback:"
  echo "$html_jpg" | head -20
  FAIL=1
else
  echo "✓ HTML picture fallbacks are WEBP"
fi

# 6. Check that referenced bases have WebP files.
echo "--- Checking critical images ---"
for img in portal/imagenes/hero portal/imagenes/frontis portal/imagenes/organigrama-iestp-paijan portal/imagenes/bolsa_trabajo/estudiantes-egresados; do
  if [ ! -f "$ROOT/$img.webp" ]; then echo "ERROR: Missing $img.webp"; FAIL=1; fi
done
echo "✓ Critical images have WebP"

# 7. Check include.js helper exists
if grep -q "function pictureFor" "$ROOT/portal/js/include.js"; then echo "✓ Helper pictureFor exists in include.js"; else echo "ERROR: pictureFor missing"; FAIL=1; fi
if grep -q "placeHolderImg" "$ROOT/portal/js/include.js"; then echo "✓ placeHolderImg exposed"; else echo "ERROR: placeHolderImg missing"; FAIL=1; fi

if [ $FAIL -eq 0 ]; then
  echo ""
  echo "=== All validations passed ==="
  exit 0
else
  echo ""
  echo "=== Validation FAILED ==="
  exit 1
fi
