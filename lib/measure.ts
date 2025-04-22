// lib/measure.ts
export function measureImage(src: string): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
      img.onerror = reject
    })
  }