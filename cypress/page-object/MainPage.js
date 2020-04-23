class MainPage {
    open(){
        cy.visit(`${Cypress.env('productUrl')}`)
    }

    openProduct(productName){
        let productLocator = cy.get(`img[alt='${productName}']`).first();
        productLocator.should("be.visible");
        productLocator.click();
    }

}

export default new MainPage()