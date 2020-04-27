class CommonPage {

    getFinalPrice(price1, price2){
        // debugger
        if (price1 !== undefined && (price1.length > 0)){
            return price1
        }
        else {
            return price2
        }

    }
}

export default new CommonPage()