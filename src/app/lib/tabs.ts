class TabItem {
  private link: HTMLElement;
  private content: HTMLElement;

  constructor(link: HTMLElement, content: HTMLElement) {
    this.link = link;
    this.content = content;
  }

  onClick(callback: () => void) {
    this.link.addEventListener('click', () => callback(), false);
  }

  public activate() {
    this._toggle(true);
  }

  public deactivate() {
    this._toggle(false);
  }

  private _toggle(activate: boolean) {
    this.link.classList.toggle('active', activate);
    this.content.classList.toggle('active', activate);
  }
}

export default class TabsManager {
  private readonly tabs: TabItem[];
  private activeTab: TabItem;

  constructor(tabsElem: HTMLElement) {
    this.tabs = [];
    this.activeTab = {} as TabItem;

    this.init(tabsElem);
    this.activateTab(this.tabs[0]);
  }

  init(tabsElem: Element): void {
    const links = tabsElem.querySelectorAll('.nav-link');
    const contents = tabsElem.querySelectorAll('.tabs__item');

    for (let i = 0; i < links.length; i++) {
      const tab: TabItem = new TabItem(links[i] as HTMLElement, contents[i] as HTMLElement);
      this.tabs.push(tab);

      tab.onClick(this.activateTab.bind(this, tab));
    }
  }

  activateTab(tab: TabItem): void {
    if (Object.keys(this.activeTab).length !== 0) {
      this.activeTab.deactivate();
    }
    this.activeTab = tab;
    this.activeTab.activate();
  }
}
