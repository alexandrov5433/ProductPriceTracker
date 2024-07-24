import { html } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";

const fragment = (prodId) => html`
    <div class="overlay">
        <div class="modal">
            <p>Do you really wish to delete this product?</p>
            <button id="confirm-delete" class="action del-red" data-id=${prodId} @click=${onDelete}>Delete</button>
            <button id="cancel-delete" class="action" @click=${onCancel}>Cancel</button>
        </div>
    </div>`;


let context = null;

export async function deleteProductCard(ctx) {
    context = ctx;
    let prodId = ctx.params.id;
    ctx.renderModal(fragment(prodId));
}

async function onDelete(e) {
    let prodId = e.currentTarget.dataset.id;
    await data.delGivenProduct(prodId);
    context.renderModal('');
    context.render('');
    context.goTo('/all-products');
}

function onCancel() {
    context.renderModal('');
}