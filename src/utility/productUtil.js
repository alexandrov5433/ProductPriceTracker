function generateProductId() {
    let date = String(new Date().getTime());
    let apendix = '';
    for (let i = 0; i < 10; i++) {
        apendix += String(Math.floor(Math.random() * 8));
    }
    return date + '-' + apendix;
}

function addedOnDate(productId) {
    let [ msecs, _ ] = productId.split('-');
    return milisecsToDate(msecs);
}

function milisecsToDate(mls) {
    let date = new Date(Number(mls));
    return date.toLocaleString();
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
    data['price'] = parseToNum(chars.join('').trim());
    return data;
}

function parseToNum(str) {
    //example str = '2.460,80'
    const patterns = {
        'floatCommaDecimalSep': new RegExp(',[0-9]{1,2}$'),
        'floatPointDecimalSep': new RegExp('\\.[0-9]{1,2}$'),
        'intCommaThauSep': new RegExp('^([0-9]{1,3},)+[0-9]{3}$'),
        'intCommaThauSepWithTrailingPoint': new RegExp('^([0-9]{1,3},)+[0-9]{3}\.$'),
        'intPointThauSep': new RegExp('^([0-9]{1,3}\.)+[0-9]{3}$'),
        'intPointThauSepWithTrailingComma': new RegExp('^([0-9]{1,3}\.)+[0-9]{3},$'),
        'intWithTrailingComma': new RegExp('^[0-9]+,$'),
        'intWithTrailingPoint': new RegExp('^[0-9]+\.$'),
        'int': new RegExp('^[0-9]+$')
    };
    const parseMeth = {
        'floatCommaDecimalSep': (arg) => {
            let [whole, dec] = arg.split(',');
            if (whole.includes('.')) {
                whole = whole.replaceAll('.', '');
            }
            return Number(`${whole}.${dec}`);
        },
        'floatPointDecimalSep': (arg) => {
            let [whole, dec] = arg.split('.');
            if (whole.includes(',')) {
                whole = whole.replaceAll(',', '');
            }
            return Number(`${whole}.${dec}`);
        },
        'intCommaThauSep': (arg) => {
            return Number(arg.replaceAll(',', ''));
        },
        'intCommaThauSepWithTrailingPoint': (arg) => {
            return Number(arg.replaceAll('.', '').replaceAll(',', ''));
        },
        'intPointThauSep': (arg) => {
            return Number(arg.replaceAll('.', ''));
        },
        'intPointThauSepWithTrailingComma': (arg) => {
            return Number(arg.replaceAll('.', '').replaceAll(',', ''));
        },
        'intWithTrailingComma': (arg) => {
            return Number(arg.replace(',', ''));
        },
        'intWithTrailingPoint': (arg) => {
            return Number(arg.replace('.', ''));
        },
        'int': (arg) => {
            return Number(arg);
        }
    };

    for (let pat in patterns) {
        let match = str.match(patterns[pat]);
        if (match) {
            return parseMeth[pat](str);
        }
    }
}

export const productUtil = {
    generateProductId,
    addedOnDate,
    milisecsToDate,
    reworkPrice,
    parseToNum
};