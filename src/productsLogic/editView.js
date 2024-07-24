import { html } from "../../node_modules/lit-html/lit-html.js";
import { data } from "../utility/data.js";

const fragment = (isError) => html`
    <div class="overlay">
        <div class="modal">
            <p>Product Information:</p>
            <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
                ${isError ? html`<div class="error">You have to fill out all fields.</div>` : ''}
                <label for="productName">Product Name: <input type="text" name="productName" id="productName" .value=${productData.data[0].textContent}></label>
                <label for="imgUrl">Image URL: <input type="text" name="imgUrl" name="imgUrl" id="imgUrl" .value=${productData.data[2].src}></label>
            </form>
            <button id="save-changes" class="action edit-form-btn" form="login-form">Save</button>
            <button id="cancel-edit" type="button" class="action" @click=${onDiscard}>Discard</button>
        </div>
    </div>`;

let context = null;
let productData = null;

export async function showEdit(ctx) {
    context = ctx;
    let productId = ctx.params.id;
    productData = await data.getSpecificProduct(productId);
    ctx.renderEditModal(fragment());
}

async function onSubmit(e) {
    e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    console.log(formData.productName);
    console.log(formData.imgUrl);
    if (!formData.productName || !formData.imgUrl) {
        return context.renderEditModal(fragment(true));
    }
    productData.data[0].textContent = formData.productName;
    productData.data[2].src = formData.imgUrl;
    await data.updateExistingProduct(productData);
    context.renderEditModal('');
    context.goTo('/all-products');
}

function onDiscard() {
    context.renderEditModal('');
    context.goTo('/all-products');
}