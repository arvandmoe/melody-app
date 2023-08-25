type Timer = ReturnType<typeof setTimeout>;

function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timer: Timer;

  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default debounce;
