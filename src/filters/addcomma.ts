export default (amount: String) => {
    let num = (amount || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
    // if (!amount && amount !== 0) {
    //     return '';
    // } else if (amount === 0) {
    //     return 0;
    // } else {
    //     return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    // }
    // if (browser.indexOf('Google') !== -1) {
    //     if (!amount && amount !== 0) {
    //         return '';
    //     } else if (amount === 0) {
    //         return 0;
    //     } else {
    //         return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    //     }
    // }
    // else {
    //     return ''
    // }

};
