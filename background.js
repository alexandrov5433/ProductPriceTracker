import { data } from "./src/utility/data.js";
import { productUtil } from "./src/utility/productUtil.js";

chrome.runtime.onMessage.addListener( async (msg) => {  // works!!
    // console.log(`Message received: ${msg}`);
    if (msg.event === 'NewProductAdded') {
        // console.log(`NewProductAdded: ${msg.data}`);
        let queryOptions = { currentWindow: true, active: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        // console.log(tab);
        let tabUrl = tab.url;
        let dataToSave = {
            tabUrl,
            data: msg.data,
            activeOnSite: true,
            postAdditionPriceChange: {}
        };
        let productId = productUtil.generateProductId();
        data.storeNewProduct({
            productId,
            dataToSave
        });
    }
});

