import { html } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";
import { productUtil } from "../utility/productUtil.js";

const fragment = (priceDev) => html`
    <div class="overlay">
        <div class="modal">
            <p>Price Development:</p>
            <div id="details-price-container">
                ${priceDev.length === 0 ? html`<p>No updates yet!</p>` : priceDev.map(ent => priceCard(ent))}
            </div>
            <button class="action" @click=${onClose}>Close</button>
        </div>
    </div>`;

const priceCard = (ent) => html`
    <p>${productUtil.milisecsToDate(ent[0])} = ${ent[1]} ${prodCurrency}</p>
`;

let context = null;
let prodCurrency = null;

export async function showDetails(ctx) {
    context = ctx;
    const productId = ctx.params.id;
    const targetProduct = await data.getSpecificProduct(productId);
    prodCurrency = targetProduct.data[1].currency;
    const priceDevelopment = Object.entries(targetProduct.postAdditionPriceChange);
    ctx.renderDetailsModal(fragment(priceDevelopment));
}

async function onClose(e) {
    e.preventDefault();
    context.renderDetailsModal('');
    context.goTo('/all-products');
}