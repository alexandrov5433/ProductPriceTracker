import { view } from "./view.js";

const addBtn = document.getElementById('add');
const viewBtn = document.getElementById('view');
let tabUrl = null;

addBtn.addEventListener('click', async () => {
    let queryOptions = { currentWindow: true, active: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab);
    tabUrl = tab.url;
    
    await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        files: ['./src/popupLogic/addingProduct.js']
    }).then(() => console.log('Ingected!'));
    view.togglePopupView();
});

viewBtn.addEventListener('click', () => {
    window.open('./products.html');
});

chrome.runtime.onMessage.addListener((msg) => {  // works!!
    console.log(`popup.js got the message: ${msg}`);
//     msg = JSON.parse(msg);
//     msg.productUrl = tabUrl;
//     console.log(JSON.stringify(msg));
//     // data.saveData(JSON.stringify(msg));
//     // view.togglePopupView();
//     // setTimeout(() => {view.closePopup()}, 3000);
    // chrome.runtime.sendMessage({event: 'triger', prefs: 'popup.js got the message'});
});









// addBtn.addEventListener('click', () => {
//     divMain.style.display = 'none';
//     divAdding.style.display = 'block';
//     getCurrentTab()
//         .then(tab => {
//             console.log(tab);
//             // chrome.tabs.executeScript(tab.windowId, {
//             //     code: `console.log('location:', window.location.href);`
//             //     // frameId: tab.windowId
//             // })
//         })


// });

// async function getCurrentTab() {
//     let queryOptions = { currentWindow: true, active: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }