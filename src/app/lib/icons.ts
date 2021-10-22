import downloadSvg from '../../assets/icons/download.svg';
import historySvg from '../../assets/icons/history.svg';
import newChangesSvg from '../../assets/icons/new-changes.svg';

function getIcon(viewBox = '0 0 32 32', id = 'icon'): string {
  return `<svg viewBox="${viewBox}">
        <use xlink:href="#${id}" />
      </svg>`;
}

export const downloadIcon = getIcon(downloadSvg.viewBox, downloadSvg.id);
export const historyIcon = getIcon(historySvg.viewBox, historySvg.id);
export const newHistoryIcon = getIcon(newChangesSvg.viewBox, newChangesSvg.id);
