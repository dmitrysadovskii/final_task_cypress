import MainPage from "../page-object/MainPage";
import productPage from "../page-object/productPage";
import checkOutPage from "../page-object/checkOutPage";
import commonPage from "../page-object/commonPage";
import * as productArray from '../fixtures/product.json';


context('ProductPage', () => {
    describe('Product Data', () => {

        const testingData = [
            // {
                // description: "Several choices",
                // product: productArray.product[0]
            // }
            {
                description: "Product without choice",
                product: productArray.product[1]
            }
        ];

        let newProduct = new Map();
        let defaultProduct = new Map();

        testingData.forEach(dataSet => {
            it('Add product to the box' + dataSet.description, function () {
                cy.log('Open page with products');
                MainPage.open();
                cy.log(dataSet.product);
                MainPage.openProduct(dataSet.product.name);
                // productPage.getProductPrice().then(price => {
                //                 //     defaultProduct.set('price', price)
                //                 // });
                productPage.getProductPrice().as('price');

                productPage.click_button_buy();
                productPage.addProductToBasket().then(projectObj =>{
                    return projectObj

                }).as('productObj');
                // projectObj.then(maps => newProduct.set('price', maps.get('price')));
                // projectObj.then(maps => newProduct.set('name', maps.get('name')));
                cy.log(cy.get('@productObj'));
                // cy.log(defaultProduct.get('price'));
                // const randProductName = productPage.getRandomProductName(randomProduct);
                // const randProductPrice = productPage.getRandomProductPrice(randomProduct);
                // cy.log(randProductName, randProductPrice);
                const finalPrice = commonPage.getFinalPrice(newProduct.get('price'), defaultProduct.get('price'));
                checkOutPage.checkProductPrice(finalPrice);
                checkOutPage.checkProductName(dataSet.product.name, newProduct.get('name'));
                checkOutPage.checkProductQuantity(1);
                checkOutPage.removeProduct();
                checkOutPage.checkProductListContainItems(0);
            });
        });
    });
});