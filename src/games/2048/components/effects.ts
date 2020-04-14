function useKeydown(e: Event) {
  document.addEventListener('keydown', handleKeydown);

  function handleKeydown(e: Event) {
    console.log(e);
  }

  return () => document.removeEventListener('keydown', handleKeydown);
}

export { useKeydown };
