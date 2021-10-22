export function addCollapseElements(containerId: string): void {
  const container = document.querySelector(containerId) as HTMLElement;
  if (container) {
    const collapseBlockList = container.querySelectorAll('.collapse_block');
    for (let i = 0; i < collapseBlockList.length; i++) {
      const collapseBlock = collapseBlockList[i] as HTMLElement;
      const button = collapseBlock.querySelector('.collapse__button') as HTMLElement;
      if (button) {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const collapseDiv = collapseBlock.querySelector('.collapse__div') as HTMLElement;
          if (collapseDiv) {
            collapseDiv.classList.toggle('collapse');
          }
        });
      }
    }
  }
}
