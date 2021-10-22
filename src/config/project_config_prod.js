const dev_Mode = 'PRODUCTION';
const trackStudioUrl = 'https://issues.connectivegames.com/';
const featureEditorUrl = `${trackStudioUrl}/feature-editor/rest/server?id=`;

export function getDevMode() {
  return dev_Mode;
}

export function getFeatureEditorUrl() {
  return featureEditorUrl;
}
