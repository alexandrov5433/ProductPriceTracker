import page from "../../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";
import { updatePriceOfAllProducts } from "../utility/updatePrice.js";

import { showAllProducts } from "./allProductsView.js";
import { visiteWebsite } from "./visiteWebsiteView.js";
import { deleteProductCard } from "./deleteView.js";
import { showEdit } from "./editView.js";
import { showDetails } from "./detailsView.js";

// Buttons for debugging.

// document.querySelector('#data').addEventListener('click', async () => {
//     let storedData = await data.getAllData();
//     console.log(`productsView.js all data in store: ${JSON.stringify(storedData, null, 2)}`);
// });

// document.querySelector('#id').addEventListener('click', () => {
//     console.log(productUtil.generateProductId());
// });
// document.querySelector('#deleteAllData').addEventListener('click', async () => {
//     await data.delAllStoredData();
//     console.log('All data deleted!');
// });
// document.querySelector('#downloadData').addEventListener('click', async () => {
//     let a = document.createElement("a");
//     a.href = window.URL.createObjectURL(new Blob([JSON.stringify(await data.getAllData(), null, 2)], { type: "text/plain" }));
//     a.download = "productDataInStorage.txt";
//     a.click();
// });

const root = document.getElementById('main');
const modalContainer = document.getElementById('modal-overlay');
const editModalContainer = document.getElementById('edit-overlay');
const detailsModalContainer = document.getElementById('details-overlay');
const demoModalContainer = document.getElementById('demo-overlay');

window.addEventListener("load", () => {
    console.log("page is fully loaded");
    updatePriceOfAllProducts();
});
window.addEventListener("focus", async () => {
    page.redirect('/all-products');
    if (demoModalContainer.hasChildNodes()) {
        if (Object.entries(await data.getAllProducts()).length !== 0) {
            render('', demoModalContainer);
        } 
    }
});
document.querySelector('#update-product-prices').addEventListener('click', async () => {
    await updatePriceOfAllProducts();
    page.redirect('/all-products');
});

page(addToCtx);
page('/all-products', showAllProducts);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/delete/:id', deleteProductCard);
page('/visit-website/:id', visiteWebsite);

page.start();
page.redirect('/all-products');

function addToCtx(ctx, next) {
    ctx.render = function (fragment) {
        render(fragment, root);
    }
    ctx.goTo = function (path) {
        page.redirect(path);
    }
    ctx.renderModal = function (fragment) {
        render(fragment, modalContainer);
    }
    ctx.renderEditModal = function (fragment) {
        render(fragment, editModalContainer);
    }
    ctx.renderDetailsModal = function (fragment) {
        render(fragment, detailsModalContainer);
    }
    ctx.renderDemoModal = function (fragment) {
        render(fragment, demoModalContainer);
    }
    next();
}
