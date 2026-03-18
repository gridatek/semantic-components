export function normalizePosition(
  element: HTMLElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
    y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
  };
}

export function startDrag(
  element: HTMLElement,
  onMove: (x: number, y: number) => void,
): void {
  const onMouseMove = (e: MouseEvent) => {
    const pos = normalizePosition(element, e.clientX, e.clientY);
    onMove(pos.x, pos.y);
  };
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

export function startTouchDrag(
  element: HTMLElement,
  onMove: (x: number, y: number) => void,
): void {
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = normalizePosition(element, touch.clientX, touch.clientY);
    onMove(pos.x, pos.y);
  };
  const onTouchEnd = () => {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);
}
