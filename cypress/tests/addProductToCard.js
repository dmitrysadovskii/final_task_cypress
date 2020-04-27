import MainPage from "../page-object/MainPage";
import productPage from "../page-object/productPage";
import checkOutPage from "../page-object/checkOutPage";
import commonPage from "../page-object/commonPage"

context('ProductPage', () => {
    beforeEach(() => {
        cy.fixture('product').then(productFix =>{
            this.product = productFix;
            cy.log('Open page with products');
            MainPage.open();
            MainPage.openProduct(this.product.product.product_1.name);
            productPage.getProductPrice().then( price => {
                cy.wrap(price).as('productPrice')

            });

            productPage.click_button_buy();
            const projectObj = productPage.addProductToBasket();
            projectObj.then(maps => cy.wrap(maps.get('price')).as('newPrice'));
            projectObj.then(maps => cy.wrap(maps.get('name')).as('productName'))
        })

    });
});


it('Add product to the box', function (){
    const finalPrice = commonPage.getFinalPrice(this.newPrice, this.productPrice);
    checkOutPage.checkProductPrice(finalPrice);
    checkOutPage.checkProductName(this.product.product.product_1.name, this.productName);
    checkOutPage.checkProductQuantity(1);
    checkOutPage.removeProduct();
    checkOutPage.checkProductListContainItems(0);

});

