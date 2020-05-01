import Chance from 'chance'
import checkOutPage from "../page-object/checkOutPage"

require('cypress-xpath');

class ProductPage {

    get button_buy(){
        return cy.get("div[sticky-magnet] button span")
    }

    get upperBar(){
        return cy.get(".navbar")
    }


    click_button_buy(){
        this.button_buy.should("be.visible");
        this.button_buy.click();
    }

    getProductPrice() {
        cy.wait(1000);
        return new Cypress.Promise((resolve, reject) => cy.get(".is-price:first").then(($price) => {
            cy.wrap($price).invoke('text').then( value => {
                const  price= $price.text();
                const priceList = price.split(' ');
                if (priceList.length === 2){
                    cy.log(`price ${priceList[1]}`);
                    resolve(priceList[1]);
                }
                resolve(price);
            })
        }));
    };

    addProductToBasket(){
       return new Cypress.Promise((resolve, reject) => this.upperBar.then(($header)=>{
           cy.wait(2000);
           cy.get("body").then(($body)=>{
               if ($body.find('.cart-checkout-pattern').length === 0){
                   let productMap = new Map();
                   cy.get(".mqn-lobby-swatch__card__meta").then(($el) => {
                       let randomElement = Chance().pickone($el);
                       productMap.set("name", randomElement.childNodes[0].textContent.trim());
                       productMap.set("price", randomElement.childNodes[2].textContent.trim());
                       cy.log(`Product price: ${productMap.get("price")}`);
                       let buttonLocator = cy.xpath(
                           `//div[@class="mqn-lobby-swatch__card__headline ng-binding ng-scope"][contains(.,"${randomElement.childNodes[0].textContent}")]/../..//button`
                       );
                       buttonLocator.click();
                       resolve(productMap)
                   });
               }
               else {
                   cy.log('Nothing')
               }
               })
                })
    )
    }

    getRandomProduct() {
        cy.wait(2000);
        let randomElement = [];
        cy.get("body").then(($body) => {
            if ($body.find('.cart-checkout-pattern').length === 0) {
                cy.get(".mqn-lobby-swatch__card__meta").then(($el) => {
                    randomElement.push(Chance().pickone($el));
                });

            }

        });
        return randomElement
    }

    getRandomProductName(ProductObj){
        cy.log(ProductObj[0]);
        // return ProductObj[0].childNodes[0].textContent.trim()
    }

    getRandomProductPrice(ProductObj){
        // return ProductObj[0].childNodes[2].textContent.trim()
    }


}




export default new ProductPage()