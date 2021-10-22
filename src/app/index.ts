// import ClientVersion, { IRevisionVersion } from './client-version';
// import { IServerDeploymentInfo, ServerDeploymentInfo } from './deployment_info';
// import Api from './lib/api-service';
// import { addCollapseElements } from './lib/collapse';
// import TabsManager from './lib/tabs';
// import { addToContainer } from './lib/utils';
// import { ISkinInfo, IVendorInfo } from './lib/vendor-info';

// /*
//  * create deployment info part
//  * */
// async function getDeploymentInfo() {
//   try {
//     void Api.getResponseStatus('/api/site/info').then((response) => {
//       const onlineInfo: string = response === 200 ? 'Online' : 'Offline';
//       addToContainer(onlineInfo, '.server__online');
//     });
//
//     await Api.getJSON('/deployment_info.json').then((response: IServerDeploymentInfo) => {
//       const deploymentInfo: ServerDeploymentInfo = new ServerDeploymentInfo(response);
//
//       const innerStatistics: string = deploymentInfo.buildStatisticInfo();
//       addToContainer(innerStatistics, '.server__statistics');
//
//       if (deploymentInfo._isTestMode()) {
//         const innerDeploymentInfo: string = deploymentInfo.buildServerDeploymentInfo();
//         addToContainer(innerDeploymentInfo, '.server__info');
//
//         const altairInfo: string = deploymentInfo.altairRevision(deploymentInfo.getTestFacesUrls());
//         addToContainer(altairInfo, '.server__clients', true);
//       } else {
//         void deploymentInfo.getVendorInfo().then((res: IVendorInfo) => {
//           const altairInfo: string = deploymentInfo.altairRevision(deploymentInfo.getProdFacesUrls(res));
//           addToContainer(altairInfo, '.server__clients', true);
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// /*
//  * create clients part for Revisions TAB (second tab on main page)
//  * and for Deployment server info tab
//  * */
// async function getClientsInfo(skinId: string) {
//   try {
//     await Api.getJSON('/internal/revision.jsp?format=JSON').then((response: IRevisionVersion[]) => {
//       let clientTextInfo = '';
//       let clientsDeployInfo = '';
//       if (response) {
//         for (const item of response) {
//           const cv: ClientVersion = new ClientVersion(item);
//           if (item.face && item.face !== skinId) {
//             continue;
//           }
//           clientTextInfo += `${cv.elementTextRevision()}</br>`;
//           if (item.type === 'altair' || item.type === 'java') {
//             continue;
//           }
//           clientsDeployInfo += cv.elementRevision();
//         }
//       }
//       addToContainer(clientTextInfo, '.tabs__item_revisions');
//       addToContainer(clientsDeployInfo, '.server__clients');
//     });
//   } catch (error) {
//     addToContainer('Data is not available', '.tabs__item_revisions');
//     console.log(error);
//   }
// }
//
// function addTabTextData(url: string, containerId: string) {
//   try {
//     void Api.getText(url).then((result) => {
//       addToContainer(result, containerId);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// const tabsElem = document.querySelector('.tabs') as HTMLElement;
// if (tabsElem) {
//   new TabsManager(tabsElem);
// }
//
// void (async () => {
//   const skinInfo: ISkinInfo = await Api.getJSON('/get-skin-info').then((res: ISkinInfo) => {
//     return res;
//   });
//   const skinId: string = skinInfo.id;
//
//   void getDeploymentInfo().then(() => {
//     addCollapseElements('.server__deployment-info');
//   });
//
//   void getClientsInfo(skinId).then(() => {
//     addCollapseElements('.server__clients');
//   });
//
//   addTabTextData('/internal/lobbyreport.jsp', '.tabs__item_lobby');
// })();
