export default async function fileToBlob(file, width, height, quality) {
    let drawable = await createImageBitmap(file)
    let  sw = drawable.width
    let  sh = drawable.height
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not create canvas context');
    ctx.drawImage(drawable, 0, 0, sw, sh, 0, 0, width, height);

    let type = "image/jpeg"
    let blob = await new Promise(r => canvas.toBlob(r, type, quality));

    // return ctx.getImageData(0, 0, width, height);
    // return canvas.toDataURL()
    return  blob
}

