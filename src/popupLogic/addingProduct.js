class ClickConter {
    constructor() {
        this._count = 0;
        this.target = 3;
    }
    get count() {
        return this._count;
    }
    set count(arg) {
        this._count += arg;
        if (this._count === this.target) {
            this.stopCountingAndSaveData();
        }
    }
    stopCountingAndSaveData() {
        document.getElementsByTagName('body')[0].removeEventListener('click', clicker);
        chrome.runtime.sendMessage({event: 'NewProductAdded', data: selectedEls});  //works !
    }
}

let selectedEls = [];
const clickCounter = new ClickConter();
document.getElementsByTagName('body')[0].addEventListener('click', clicker);
console.log('Injected');

function clicker(e) {
    let data = prepData(e.target);
    selectedEls.push(data);
    clickCounter.count = 1;
}

function prepData(el) {
    let data = {};
    data['tagName'] = el.tagName;

    data['attributes'] = {};
    const attr = el.attributes;
    for (let i = 0; i <= 20; i++) {
        let item = attr.item(i);
        if (item) {
            data['attributes'][item.name] = item.textContent;
        } else {
            break;
        }
    }

    data['classList'] = Object.fromEntries(el.classList.entries());

    data['textContent'] = el.textContent;
    if (clickCounter.count === 1) {
        let price = reworkPrice(el.textContent);
        data['productPrice'] = price.price;
        data['currency'] = price.currency;

        data['parentTagName'] = el.parentElement.tagName;
        data['parentAttributes'] = {};
        const parentAttr = el.parentElement.attributes;
        for (let i = 0; i <= 20; i++) {
            let item = parentAttr.item(i);
            if (item) {
                data['parentAttributes'][item.name] = item.textContent;
            } else {
                break;
            }
        }
    }
    if (clickCounter.count === 2) {
        data['src'] = el.src ? el.src : '';
    }

    return data;
}

function reworkPrice(str) {
    const curSymb = ['€', '$', 'lev', '£', 'R$', '₹'];
    let data = {};
    let chars = str.trim().split('');
    let nonNums = chars.filter(c => Number(c) != c);
    for (let c of nonNums) {
        if (curSymb.includes(c)) {
            data['currency'] = c;
            break;
        }
    }
    if (!data['currency']) {
        data['currency'] = '€';
    }
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] != Number(chars[i])) {
            chars[i] = '';
        } else {
            break;
        }
    }
    for (let i = chars.length - 1; i >= 0; i--) {
        if (chars[i] != Number(chars[i])) {
            chars[i] = '';
        } else {
            break;
        }
    }
    data['price'] = chars.join('').trim();
    return data;
}