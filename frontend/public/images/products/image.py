import os
from PIL import Image


def renombrar_y_convertir_a_jpg():
    extensiones = (".png", ".jpg", ".jpeg", ".webp")
    imagenes = [
        f
        for f in os.listdir(".")
        if f.lower().endswith(extensiones) and not f.startswith("producto_")
    ]

    for i, nombre in enumerate(imagenes, start=1):
        nuevo_nombre = f"producto_{i}.jpg"
        with Image.open(nombre) as img:
            rgb = img.convert("RGB")  # Asegura que sea compatible con JPG
            rgb.save(nuevo_nombre, "JPEG")
        os.remove(nombre)
        print(f"Convertido y renombrado: {nombre} → {nuevo_nombre}")


renombrar_y_convertir_a_jpg()
