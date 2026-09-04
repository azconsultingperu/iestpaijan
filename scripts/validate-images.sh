#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES_DIR="$ROOT/portal/imagenes"
FAIL=0
ALLOW_RESIDUAL=0
if [ "$1" = "--pre" ]; then ALLOW_RESIDUAL=1; fi

echo "=== Validating media-assets (AVIF+WEBP) ${1:-}==="

# 1. Check for residual JPG/JPEG/PNG (except allowed exceptions)
# Allowed: logo-transp.png (favicon) + whatsapp.svg (vector)
found=$(find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | grep -v "logo-transp.png" || true)
if [ -n "$found" ]; then
  count=$(echo "$found" | wc -l)
  if [ $ALLOW_RESIDUAL -eq 1 ]; then
    echo "⚠ Residual JPG/PNG found ($count files) — expected before deletion (will be removed in 7.1)"
  else
    echo "ERROR: Residual JPG/PNG files found (should be deleted, only AVIF+WEBP allowed):"
    echo "$found" | head -n 20
    echo "Total residual: $count"
    FAIL=1
  fi
else
  echo "✓ No residual JPG/PNG (except allowed logo-transp.png)"
fi

# 2. Check that huérfanos have been converted
for base in portal/imagenes/carreras/acc_bg portal/imagenes/carreras/enfermeria_bg portal/imagenes/carreras/pagro_bg portal/imagenes/bolsa_trabajo/old-egresados_alumnos; do
  if [ ! -f "$ROOT/$base.avif" ]; then echo "ERROR: Missing $base.avif"; FAIL=1; else echo "✓ $base.avif exists"; fi
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

# 6. Check that referenced bases have avif+webp files
echo "--- Checking critical images ---"
for img in portal/imagenes/hero portal/imagenes/frontis portal/imagenes/organigrama-iestp-paijan portal/imagenes/bolsa_trabajo/estudiantes-egresados; do
  if [ ! -f "$ROOT/$img.avif" ]; then echo "ERROR: Missing $img.avif"; FAIL=1; fi
  if [ ! -f "$ROOT/$img.webp" ]; then echo "ERROR: Missing $img.webp"; FAIL=1; fi
done
echo "✓ Critical images have AVIF+WEBP"

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
