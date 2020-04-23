class CheckOutPage {

    get checkOutButton(){
        return cy.get('.cart-checkout-pattern')
    }
}

export default new CheckOutPage()