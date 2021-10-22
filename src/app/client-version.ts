import { formatDate, getComponentChangesUrl } from './lib/utils';
import { downloadIcon, historyIcon, newHistoryIcon } from './lib/icons';

export interface IRevisionVersion {
  type: string;
  branch: string;
  version: string;
  revision: string;
  date: string;
  face: string;
  url: string;
}

export default class ClientVersion implements IRevisionVersion {
  type: string;
  branch: string;
  version: string;
  revision: string;
  date: string;
  face: string;
  url: string;
  repo: string;

  downloadUrl: string;
  changeHistory: string;
  newChanges: string;

  constructor(obj: IRevisionVersion) {
    this.type = obj.type;
    this.branch = obj.branch !== undefined ? obj.branch : '';
    this.version = obj.version !== undefined ? obj.version : '';
    this.revision = obj.revision !== undefined ? obj.revision : '';
    this.date = obj.date !== undefined ? obj.date : '';
    this.face = obj.face !== undefined ? obj.face : '';
    this.url = this.getClientUrl(obj.url);

    this.repo = this.getRepo();
    this.downloadUrl = this.getDownloadUrl();
    this.changeHistory = this.getChangeHistoryUrl();
    this.newChanges = this.getLastChangesHistoryUrl();
  }

  private getRepo(): string {
    switch (this.type) {
      case 'altair':
        return 'altair';
      case 'webserver':
        return '';
      case 'sm':
        return 'altair';
      case 'fuga':
        return 'fugawebbin';
      default:
        return 'altairwebbin';
    }
  }

  private getDownloadUrl(): string {
    switch (this.type) {
      case 'sm':
        return '/game-clients/sm/sm.msi';
      case 'win32':
        return '/iredirector?targetPageId=DOWNLOAD_WINDOWS_CLIENT';
      case 'mobile':
        return '/iredirector?targetPageId=DOWNLOAD_ANDROID_CLIENT';
      case 'html5mobile':
        return '/iredirector?targetPageId=HTML5_CLIENT';
      case 'html5desktop':
        return '/iredirector?targetPageId=HTML5DESKTOP_CLIENT';
      case 'html5win':
        return '/iredirector?targetPageId=DOWNLOAD_WINDOWS_CLIENT';
      case 'html5android':
        return '/iredirector?targetPageId=DOWNLOAD_ANDROID_CLIENT';
      case 'html5electron':
        return '/iredirector?targetPageId=DOWNLOAD_MAC_CLIENT';
      case 'html5casinos':
        return '';
      case 'fuga':
        return '';
      default:
        return '';
    }
  }

  private getClientUrl(objectUrl: string): string {
    if (this.type === 'sm') {
      return `/branches/${this.branch}/casino/sm-client`;
    } else {
      return objectUrl !== undefined ? objectUrl : '';
    }
  }

  private getChangeHistoryUrl(): string {
    return getComponentChangesUrl(this.repo, this.url, this.revision, '0');
  }

  private getLastChangesHistoryUrl(): string {
    return getComponentChangesUrl(this.repo, this.url, 'HEAD', this.revision);
  }

  public elementTextRevision(): string {
    const notEmptyFields = [this.type, this.face, this.branch, this.version, this.revision].filter((x) => x !== '');
    return `${notEmptyFields.join(':')}`;
  }

  public elementRevision(): string {
    let downloadButton = '';
    if (this.downloadUrl !== '') {
      downloadButton += `<div class="client__link-wrapper">
                            <a href="${this.downloadUrl}" title="Client download" class="client__link client__download client__download-${this.type}">
                            <span class="icon icon-download">${downloadIcon}</span></a>
                         </div>`;
    }
    return `<div class="client__item  border-bottom  py-2 border-info client__item-${this.type}">
              <div class="row">
                <div class="col-auto">
                    <div class="collapse_block row client__url--${this.type}">
                        <div class="collapse__button col-auto">
                            <h5 class="client__name">${this.type}</h5>
                            <div class="arrow-right"></div>
                        </div>
                        <div  class="collapse__div collapse col">${this.url}</div>
                    </div>
                </div>
                <div class="col">
                </div>
                <div class="col-auto client__buttons">
                  ${downloadButton}
                  <div class="client__link-wrapper">
                    <a href="${this.changeHistory}" title="Change History" class="client__link client__history">
                     <span class="icon icon-history">${historyIcon}</span></a>
                  </div>
                  <div class="client__link-wrapper">
                    <a href="${this.newChanges}" title="New changes" class="client__link client__new"><span
                      class="icon icon-new-history">${newHistoryIcon}</span></a>
                  </div>
                </div>
              </div>
              <div class="row client__branch-${this.type}">
                <div class="col-3">Branch:</div>
                <div class="col-auto">${this.branch}</div>
              </div>
              <div class="row">
                <div class="col-3">Revision:</div>
                <div class="col-auto col-sm-auto">${this.revision}</div>
                <div class="col col-sm" title="${new Date(this.date).toUTCString()}">${formatDate(this.date)}</div>
              </div>
              <div class="row client__version-${this.type}">
                <div class="col-3">Version:</div>
                <div class="col col-sm">${this.version}</div>
              </div>
            </div>`;
  }
}
