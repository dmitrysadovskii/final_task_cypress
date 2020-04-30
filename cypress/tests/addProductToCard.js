import MainPage from "../page-object/MainPage";
import productPage from "../page-object/productPage";
import checkOutPage from "../page-object/checkOutPage";
import commonPage from "../page-object/commonPage"

context('ProductPage', () => {
    describe('Product Data', () => {

        let i = 0;

        beforeEach(() => {
            cy.fixture('product').then(productFix => {
                    if (i === 0){
                        let currentProduct = productFix.product[i].name;
                        cy.log(currentProduct);
                        i++
                    }
                    else if (i===1){
                        let currentProduct = productFix.product[i].name;
                        cy.log(currentProduct);
                    }
                    cy.log('Open page with products');
                    MainPage.open();
                    MainPage.openProduct(currentProduct);
                    productPage.getProductPrice().then(price => {
                        cy.wrap(price).as('productPrice')
                    });

                    productPage.click_button_buy();
                    const projectObj = productPage.addProductToBasket();
                    projectObj.then(maps => cy.wrap(maps.get('price')).as('newPrice'));
                    projectObj.then(maps => cy.wrap(maps.get('name')).as('productName'))
                // }

            })
        });

        it('Add product to the box', function () {
            const finalPrice = commonPage.getFinalPrice(this.newPrice, this.productPrice);
            checkOutPage.checkProductPrice(finalPrice);
            checkOutPage.checkProductName(this.currentProduct, this.productName);
            checkOutPage.checkProductQuantity(1);
            checkOutPage.removeProduct();
            checkOutPage.checkProductListContainItems(0);
        });
        });
    });
