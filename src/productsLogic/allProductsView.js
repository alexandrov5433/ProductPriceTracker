import { html } from "../../node_modules/lit-html/lit-html.js";
import { rest } from "../rest/rest.js";

import { data } from "../utility/data.js";
import { productUtil } from "../utility/productUtil.js";

const fragment = (products) => html`
    ${products.map(p => productCard(p))}`;


const productCard = (product) => html`
        <div class="product">
            <span class="image holder">
                    <img src=${product.data[2].src} alt="">
            </span>
            <span class="prod-info holder">
                <div class="info-container">

                    <div class="card">
                        <div class="card__data">
                          <div class="card__left">
                            <div class="item">Product:</div>
                            <div class="item">Price:</div>
                            <div class="item">Added On:</div>
                            <div class="item">Still On Site:</div>
                          </div>
                          <div class="card__right">
                            <div class="item">${(product.data[0].textContent).trim().slice(0, 15)}</div>
                            <div class="item">${
                              Object.values(product.postAdditionPriceChange).length > 0 ? lastPricePostAddition(product) 
                              : product.data[1].productPrice + ' ' + product.data[1].currency}</div>
                            <div class="item">${productUtil.addedOnDate(product._id).split(', ')[0]}</div>
                            <div class="item">${product.activeOnSite ? 'Yes!' : 'No!'}</div>
                          </div>
                        </div>
                      </div>
                      
                </div>
            </span>
            <span class="actions holder">
                <div class="btn-container">
                    <button class="action" data-path=${'/details/' + product._id} @click=${onClick}>Price Log</button>
                    <button class="action" data-path=${'/edit/' + product._id} @click=${onClick}>Edit</button>
                    <button class="action del-red" data-path=${'/delete/' + product._id} @click=${onClick}>Delete</button>
                    <button class="action visit-green" data-path=${'/visit-website/' + product._id} @click=${onClick}>Visit Website</button>
                </div>
            </span>
        </div>`;

const demo = () => html`
    <div class="overlay">
        <div class="modal">
            <p>You haven't added any products yet. Feel free to do so! Do you wish to see some demo data?</p>
            <button class="action" @click=${loadDemo}>Load Demo</button>
        </div>
    </div>`;

function lastPricePostAddition(product) {
    let prices = Object.values(product.postAdditionPriceChange)
    let lastPrice = prices[prices.length - 1];
    return `${lastPrice} ${product.data[1].currency}`;
}

let context = null;

export async function showAllProducts(ctx) {
    context = ctx;
    let products = [];
    let dataProducts = await data.getAllProducts();
    Object.values(dataProducts).map(p => products.push(p));
    if (products.length === 0) {
      ctx.renderDemoModal(demo());
    } else {
      ctx.render(fragment(products));
    }
}

function onClick(e) {
  const path = e.currentTarget.dataset.path;
  context.goTo(path);
}

export async function loadDemo() {
  let demoData = await rest.getDemoData();
  console.log(`Loading demo data...`);
  await data.saveData(demoData);
  context.renderDemoModal('');
  context.goTo('/all-products');
} 