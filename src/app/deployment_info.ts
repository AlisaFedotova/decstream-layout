import Api from './lib/api-service';
import { formatDate, formatTitleDate, getComponentChangesUrl, getProdFaceUrl } from './lib/utils';
import { IVendorInfo } from './lib/vendor-info';
import { historyIcon, newHistoryIcon } from './lib/icons';

export interface IServerDeploymentInfo {
  altair_url: string;
  vendor: string;
  host: string;
  branch: string;
  revision: string;
  revdate: string;
  iext: string;
  build_date: string;
  testMode: string;
  productionMode: string;
  build_settings: BuildSettings;
  faces?: string[] | null;
}

export interface BuildSettings {
  TEST_MODE: string;
  PRODUCTION_MODE: string;
  REGRESSION_TEST: string;
}

export class ServerDeploymentInfo implements IServerDeploymentInfo {
  type = 'altair';
  altair_url: string;
  vendor: string;
  host: string;
  branch: string;
  revision: string;
  revdate: string;
  iext: string;
  build_date: string;
  testMode: string;
  productionMode: string;
  build_settings: BuildSettings;
  faces?: string[] | null;

  statistics: string;
  changeHistory: string;
  newChanges: string;

  constructor(obj: IServerDeploymentInfo) {
    this.build_date = obj.build_date !== undefined ? obj.build_date : '';
    this.build_settings = obj.build_settings;
    this.faces = obj.faces;
    this.vendor = obj.vendor;
    this.host = obj.host;
    this.branch = obj.branch;
    this.revision = obj.revision;
    this.revdate = obj.revdate !== undefined ? obj.revdate : '';
    this.iext = obj.iext;
    this.altair_url = obj.altair_url;
    this.testMode = obj.testMode;
    this.productionMode = obj.productionMode;

    this.statistics = this.getStatistics();
    this.changeHistory = this.getChangeHistoryUrl();
    this.newChanges = this.getLastChangesHistoryUrl();
  }

  public _isTestMode(): boolean {
    return this.testMode === '1';
  }

  private getChangeHistoryUrl(): string {
    return getComponentChangesUrl('altair', `/branches/${this.branch}`, this.revision, '0');
  }

  private getLastChangesHistoryUrl(): string {
    return getComponentChangesUrl('altair', `/branches/${this.branch}`, 'HEAD', this.revision);
  }

  private getStatistics() {
    const statisticLink = {
      prod: `https://${this.vendor}.adm-cg.com/`,
      test: 'https://stats.cgames.app',
    };
    return this._isTestMode() ? statisticLink.test : statisticLink.prod;
  }

  public getTestFacesUrls(): Map<string, string> {
    const mapUrls = new Map<string, string>();
    if (this.faces) {
      for (let i = 0; i < this.faces.length; i++) {
        const face = this.faces[i];
        mapUrls.set(face, this.getTestFaceUrl(face));
      }
    }
    return mapUrls;
  }

  public getProdFacesUrls(vendorInfo: IVendorInfo): Map<string, string> {
    const mapUrls = new Map<string, string>();
    if (this.faces) {
      for (let i = 0; i < this.faces.length; i++) {
        const face = this.faces[i];
        mapUrls.set(face, getProdFaceUrl(face, vendorInfo));
      }
    }
    return mapUrls;
  }

  private getTestFaceUrl(face: string) {
    return `https://${face}.${this.branch}.${this.host}.connectivegames.com`;
  }

  private getFacesObject(facesUrl: Map<string, string>) {
    let links = '';
    facesUrl.forEach((face, url) => {
      links += `<a class="btn btn-outline-info btn-sm" target="_blank" href="${face}">${url}</a>&nbsp;`;
    });
    return links;
  }

  private buildJenkinsJobInfo(): string {
    let jobName = this.host + '.' + this.branch + '.' + this.vendor;
    if (this.iext.length > 0) {
      jobName = jobName + '_' + this.iext;
    }
    jobName = `https://jenkins.connectivegames.com/job/Altairs/job/${jobName}`;
    return jobName;
  }

  public buildStatisticInfo(): string {
    return `<a href="${this.statistics}" class="btn btn-sm btn-outline-info d-block mx-1" title="${this.statistics}">Statistics</a>`;
  }

  public async getVendorInfo(): Promise<IVendorInfo> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
    const url = `${projConfig.getFeatureEditorUrl()}${this.vendor}`;
    return await Api.getJSON(url).then((res: IVendorInfo) => res);
  }

  public buildServerDeploymentInfo(): string {
    this.buildJenkinsJobInfo();
    return `<div class="row flex-column-reverse flex-md-row">
                <div class="col col-sm">
                  <div class="row mb-1">
                    <div class="col-3">Build Date:</div>
                    <div class="col" title="${formatTitleDate(this.build_date)}">${formatDate(this.build_date)}</div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-3">Build Settings:</div>
                    <div class="col">
                    TEST_MODE: ${this.build_settings.TEST_MODE} <br/>
                    PRODUCTION_MODE: ${this.build_settings.PRODUCTION_MODE} <br/>
                    REGRESSION_TEST: ${this.build_settings.REGRESSION_TEST}
                    </div>
                  </div>
                </div>
                <div class="server__links col-auto align-content-right d-flex d-md-inline justify-content-end">
                  <a href="/internal/revision.jsp" class="btn btn-sm btn-outline-info" title="/internal/revision.jsp">Task</a>
                  <a href="/backuplogs-stat.htm" class="btn btn-sm btn-outline-info mx-1" title="/backuplogs-stat.htm">Log stat</a>
                  <a href="${this.buildJenkinsJobInfo()}" class="btn btn-sm btn-outline-info">Jenkins tasks</a>
                </div>

              </div>
              <div class="collapse_block row mb-1">
                <div class="col-auto">
                  <button type="button" class="btn btn-outline-info btn-sm collapse__button col-auto" title="Show URL">Altair URL</button>
                </div>
                <div class="col text-break client-url collapse__div collapse">${this.altair_url}</div>
              </div>`;
  }

  public altairRevision(facesUrl: Map<string, string>): string {
    return `<div class="client__item  border-bottom  py-2 border-info client__item-${this.type}">
              <div class="row">
                <div class="col-3"><h5 class="client__name">${this.type}</h5></div>
                <div class="col">${this.vendor}</div>
                <div class="col-auto client__buttons">
                  <div class="client__link-wrapper">
                    <a href="${this.changeHistory}" title="Change History" class="client__link client__history"><span
                      class="icon icon-history">${historyIcon}</span></a>
                  </div>
                  <div class="client__link-wrapper">
                    <a href="${this.newChanges}" title="New changes" class="client__link client__new"><span
                      class="icon icon-bookmark-outline-add">${newHistoryIcon}</span></a>
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
                <div class="col col-sm" title="${new Date(this.revdate).toUTCString()}">${formatDate(this.revdate)}</div>
              </div>
              <div class="row">
                <div class="col-3">Faces:</div>
                <div class="col col-sm">${this.getFacesObject(facesUrl)}</div>
              </div>
            </div>`;
  }
}
