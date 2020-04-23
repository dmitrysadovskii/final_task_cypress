import MainPage from "../page-object/MainPage";
import productPage from "../page-object/productPage";

it('Add product to the box', function (){
    cy.log('Open page with products');
    MainPage.open();
    // MainPage.openProduct('Base for Google Home');
    MainPage.openProduct('Base for Google Home');
    let productArr1 = [];
    productPage.getProductPrice().then( list => {
        productArr1.push('price', list);
        cy.log(list)
    });


    productArr1.push(["name", "Base for Google Home"]);
    productPage.click_button_buy();
    let productArr2 = [];
    productPage.addProductToBasket().then(obj => obj.forEach((el, keys) => {
        productArr2.push([keys, el])
        }
    ));
    cy.log(productArr2);
    cy.log(productArr1);
    let mg = productPage.mergeArr(productArr2, productArr1);
    // debugger
    // mg.forEach((product, index) =>{
    //     // debugger
    //     cy.log(product, index)
    // });

    cy.log(mg)


});

