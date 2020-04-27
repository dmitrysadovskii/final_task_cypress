import {integer} from "chance/packages/chance/lib/main";

class CheckOutPage {

    get checkOutButton(){
        return cy.get('.cart-checkout-pattern')
    }

    get productPrice(){
        return cy.get('.cart-price-bottom-padding.text-right')
    }

    get productName(){
        return cy.get('.cart-lineitem-title.pull-left .roboto-header-text-9')
    }

    get getProductQuantity(){
        return cy.get('option[selected=true]')
    }

    get removeButton(){
        return cy.get('button[class="cart-remove-button pull-right"]')
    }

    get productList(){
        return cy.get('.cart-items-row .cart-items-section')
    }

    checkProductPrice(productPrice){
        return this.productPrice.invoke("text").then(productPriceText => {
            let listProductPrice = productPriceText.split('.');
            if (listProductPrice[1] === "00"){
                expect(listProductPrice[0]).to.eq(productPrice)
            }
            else {
                this.productPrice.should('eq', productPrice)
            }
        })
    }

    checkProductName(productName, productTypeName){
        return this.productName.invoke('text').then($text => {
            if (productName !== undefined){
                expect($text).to.contain(productName)
            }
            if (productTypeName){
                expect($text).to.contain(productTypeName)
            }
        })

    }

    checkProductQuantity(productQuantity){
        return this.getProductQuantity.invoke('text').then($quantity =>{
            expect(parseInt($quantity)).to.eq(productQuantity)
        })
    }

    removeProduct(){
        let button = this.removeButton;
        button.should('be.visible');
        button.click()
    }

    checkProductListContainItems(expectedQuantiy) {
        cy.wait(1000);
        this.productList.should('have.length', expectedQuantiy)
        }
}

export default new CheckOutPage()