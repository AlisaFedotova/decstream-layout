declare let projConfig: any;

interface SvgIcon {
  id: string;
  viewBox: string;
}

declare module '*.svg' {
  const content: SvgIcon;
  export default content;
}
