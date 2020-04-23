import MainPage from "../page-object/MainPage";
import productPage from "../page-object/productPage";

it('Add product to the box', function (){
    cy.log('Open page with products');
    MainPage.open();
    // MainPage.openProduct('Base for Google Home');
    MainPage.openProduct('Base for Google Home');
    let productArr1 = [];
    productPage.getProductPrice().then( price => {
        cy.wrap(price).as('productPrice')
    });

    productPage.click_button_buy();
    let productArr2 = [];
    productPage.addProductToBasket().then(obj => obj.forEach((el, keys) => {
        productArr2.push([keys, el])
        }
    ));
    cy.log(productArr2);

});

