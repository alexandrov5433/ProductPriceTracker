import { rest } from "../rest/rest.js";
import { data } from "./data.js";
import { productUtil } from "./productUtil.js";



export async function updatePriceOfAllProducts() {
    let prods = await data.getAllProducts();
    for (let prodData of Object.values(prods)) {
        const priceComponentData = prodData.data[1];
        let pageHTML;
        try {
            pageHTML = await rest.getPageHTML(prodData.tabUrl);
        } catch (error) {
            console.error(`Site did not responde well. activeOnSite set to false:\n${error}`);
            prodData.activeOnSite = false;
            await data.updateExistingProduct(prodData);
            continue;
        }
        let newPriceStr = extractPrice(pageHTML, priceComponentData);
        let priceData = productUtil.reworkPrice(newPriceStr);
        const currentTime = (new Date()).getTime();
        prodData.postAdditionPriceChange[currentTime] = priceData.price;
        await data.updateExistingProduct(prodData);
    }

    function extractPrice(pageHTML, priceComponentData) {
        const tempContainer = document.createElement('div');
        let tagName = priceComponentData.tagName.toLowerCase();
        let classVals = Object.values(priceComponentData.classList);
        tempContainer.innerHTML = pageHTML;
        if (classVals.length > 0) {
            let classStr = classVals.join(' ');
            let selector = `${tagName}[class="${classStr}"]`;
            return tempContainer.querySelector(selector).textContent;
        } else if (classVals.length === 0) {
            let parentTagName = priceComponentData.parentTagName.toLowerCase();
            let [attrNameParent, attrValueParent] = Object.entries(priceComponentData.parentAttributes)[0];
            let selectorParent = `${parentTagName}[${attrNameParent}="${attrValueParent}"]`;
            let parentEl = tempContainer.querySelector(selectorParent);
            let targetElSelector = `${tagName}`;
            return parentEl.querySelector(targetElSelector).textContent;
        }
    }


}