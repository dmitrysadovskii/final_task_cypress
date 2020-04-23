import Chance from 'chance'

require('cypress-xpath');

class ProductPage {

    click_button_buy(){
        let button = cy.get("div[sticky-magnet] button span");
        button.should("be.visible");
        button.click();
    }

    getProductPrice() {
        cy.wait(1000);
        return new Cypress.Promise((resolve, reject) => cy.get(".is-price:first").then(($price) => {
            cy.wrap($price).invoke('text').then( value => {
                const price = $price.text();
                cy.log(price);
                const priceList = price.split(' ');
                resolve(price);
            })
        }));
    };

    addProductToBasket(){
       return new Cypress.Promise((resolve, reject) => cy.get(".navbar").then(($header)=>{
            if (!$header.hasClass("header-cart-title")){
                if ($header.hasClass("mqn-lobby-swatch__card__meta")){

                    let productMap = new Map();
                    cy.get(".mqn-lobby-swatch__card__meta").then(($el) => {
                        let randomElement = Chance().pickone($el);
                        // productMap.set("name", randomElement.childNodes[0].textContent);
                        productMap.set("price", randomElement.childNodes[2].textContent);
                        // cy.log(`Product name: ${productMap.get("name")}`);
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
                }})
    )
    }

    addProductMapToBasket(){
        let productMap = this.addProductToBasket().then(obj => {
               return  obj
            }
        )
    }


    mergeArr(Arr1, Arr2){

            // let deff = [];

            if (Arr2.length === 0){
                return Arr1
            }
            else if (Arr1.length === 0){
                return Arr2
            }
            else {
                if (Arr2[0][0] === Arr1[1][0]){
                    let cm = [];
                    cm.push(Arr1[0], Arr2[0][0]);
                    return cm
                }
            }


            // cm.forEach((list, index) =>{
            //     for (let i=1; i<[cm.length]; i++){
            //         if(list.includes(cm[i][0]) && (cm[i][1] !== undefined)){
            //             if (!(cm.indexOf(list)===i)){
            //                 deff.push(cm[i]);
            //                 // cm.splice(i, 1)
            //             }
            //         }
            //
            //     }
            // });
            // cy.log(deff);
            // return cm

        }


}




export default new ProductPage()