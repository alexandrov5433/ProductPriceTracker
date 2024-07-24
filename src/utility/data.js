async function saveData(obj) {
    await chrome.storage.local.set(obj);
}

async function getAllData() {
    //if arg === null all data in storage will be returned
    let data = await chrome.storage.local.get(null);
    if (!Object.hasOwn(data, 'productStorage')) {
        data.productStorage = {};
    }
    if (!Object.hasOwn(data, 'settings')) {
        data.settings = {};
    }
    return data;
}

async function delGivenProduct(productId) {
    let data = await getAllData();
    delete data.productStorage[productId];
    await saveData(data);
}

async function delAllStoredData() {
    await chrome.storage.local.clear();
}

async function storeNewProduct(product) {
    const { productId, dataToSave } = product;
    dataToSave._id = productId;
    let data = await getAllData();
    data.productStorage[productId] = dataToSave;
    await saveData(data);
}

async function delAllProductsInStorage() {
    let data = await getAllData();
    data.productStorage = {};
    await saveData(data);
}

async function getAllProducts() {
    let data = await getAllData();
    return data.productStorage;
}

async function getSpecificProduct(productId) {
    let allProds = await getAllProducts();
    let targetProd = Object.values(allProds).find(p => p._id == productId);  //if prod not found, returns undefined
    return targetProd;
}

async function updateExistingProduct(updatedProduct) {
    let id = updatedProduct._id;
    let prodStorage = await getAllProducts();
    prodStorage[id] = updatedProduct;
    await updateProductStorage(prodStorage);
}

async function updateProductStorage(allProducts) {
    let data = await getAllData();
    data.productStorage = allProducts;
    await saveData(data);
}

async function addToSettings(arg) {
    let data = await getAllData();
    data.settings[arg] = arg;
    await saveData(data);
}

export const data = {
    saveData,
    getAllData,
    delGivenProduct,
    delAllStoredData,
    storeNewProduct,
    delAllProductsInStorage,
    getAllProducts,
    getSpecificProduct,
    updateExistingProduct,
    updateProductStorage,
    addToSettings
};