import { data } from "../utility/data.js";

export async function visiteWebsite(ctx) {
    let prodId = ctx.params.id;
    let targetProd = await data.getSpecificProduct(prodId);
    if (targetProd) {
        window.open(targetProd.tabUrl);
    }
}