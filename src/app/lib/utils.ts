import { IVendorInfo, IRoomsEntity } from './vendor-info';

export function getComponentChangesUrl(repo: string, clientPath: string, fromRev: string, toRev: string): string {
  let url = `https://svn.intrice.ru/wsvn/log.php?repname=${repo}`;
  if (clientPath !== '') {
    clientPath = clientPath.replace('/' + repo, '');
    const encodedUrl = encodeURIComponent(clientPath);
    url += `&path=${encodedUrl}%2F`;
  }
  const toRevision = parseInt(toRev, 10) + 1;
  return `${url}&isdir=1&sr=${fromRev}&er=${toRevision}&max=100`;
}

export function addToContainer(innerHTML: string, selectContainer: string, firstPosition?: boolean): void {
  const buildInfoContainer = document.querySelector(selectContainer);
  if (buildInfoContainer) {
    if (firstPosition) {
      buildInfoContainer.innerHTML = innerHTML + buildInfoContainer.innerHTML;
    } else {
      buildInfoContainer.innerHTML += innerHTML;
    }
  }
}

function _formatDatetime(date: Date, format: string): string {
  const _padStart = (value: number): string => value.toString().padStart(2, '0');
  return format
    .replace(/yyyy/g, _padStart(date.getFullYear()))
    .replace(/dd/g, _padStart(date.getDate()))
    .replace(/mm/g, _padStart(date.getMonth() + 1))
    .replace(/hh/g, _padStart(date.getHours()))
    .replace(/ii/g, _padStart(date.getMinutes()))
    .replace(/:ss/g, `:${_padStart(date.getSeconds())}`);
}

function isValidDate(d: Date): boolean {
  return !isNaN(d.getTime());
}

export function formatDate(date: string): string {
  const datetime = getDateTime(date);
  return isValidDate(datetime) ? _formatDatetime(datetime, '<span class="date">yyyy-mm-dd</span><span class="time"> hh:ii:ss</span>') : '';
}

export function formatTitleDate(date: string): string {
  const datetime = getDateTime(date);
  return isValidDate(datetime) ? _formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
}

function getDateTime(date: string): Date {
  const s = date.split(/[T\-.,:]/);
  return new Date(Date.UTC(Number(s[0]), Number(s[1]) - 1, Number(s[2]), Number(s[3]), Number(s[4]), Number(s[5])));
}

export function findRoom(face: string, vendorInfo: IVendorInfo): IRoomsEntity {
  const vendorRooms = vendorInfo.rooms ? vendorInfo.rooms : null;
  if (vendorRooms) {
    for (let i = vendorRooms.length - 1; i >= 0; i--) {
      const room = vendorRooms[i];
      if (room.name === face) {
        return room;
      }
    }
  }
  return { name: '', productionInfo: { url: '' }, status: '', title: '' };
}

export function getProdFaceUrl(face: string, vendorInfo: IVendorInfo): string {
  const room = findRoom(face, vendorInfo);
  return room ? room.productionInfo.url : '#';
}
