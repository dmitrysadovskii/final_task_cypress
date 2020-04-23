//
// function mergeArr(Arr1, Arr2){
//
//     let mergedArr = [];
//
//     Arr2.forEach((list, index) =>{
//         for (let i = 0; i<Arr1.length; i++){
//             if (list[0] in Arr1[i] && !list[1] === undefined){
//                 mergedArr.push(list)
//             }
//             else if(list[1] === undefined){
//                 mergedArr.push(list)
//             }
//
//         }
//         if (Arr1.length === 0){
//             mergedArr.push(list)
//         }
//     });
//
//     Arr1.forEach((list, index) =>{
//         for (let i = 0; i<Arr2.length; i++) {
//             if (Arr2[i].includes(!list[0]) && !list[1] === undefined) {
//                 mergedArr.push(list)
//             }
//         }
//         if (Arr2.length === 0){
//             mergedArr.push(list)
//         }
//     });
//
//
//     return mergedArr
// }
//
//
// console.log(mergeArr([[1,2],[3,4]], [[1,3]]));

let set1 = [["name","Nest Learning Thermostat Stand"],["price","£35"]];
let set2 = [];
// let mg = set1.concat(set2);
// console.log(mg);


function newMerge(Arr1, Arr2) {
    let cm = Arr1.concat(Arr2);
    cm.forEach((list, index) =>{
        for (let i=1; i<[cm.length]; i++){
            if(list.includes(cm[i][0]) && (cm[i][1] !== undefined)){
                let ind = cm.indexOf(list);
                if (!(cm.indexOf(list)===i)){
                    cm.splice(i, 1)
                }
            }

        }
    });
    return cm

}

console.log(newMerge(set2, set1));

// Норм решение. Нужно брать мапом один массив, проверять есть первые элементы и если совпадают проверять вторые и добавлять в новый и потом возвращать его
// a = [[1,2], [3,4]];
// b = [[1,2]];
// arr1 = [[35,70],[433,70],[35,73],[433,73],[35,154],[433,154]];
// arr2 = [[433,70],[433,154],[433,73],[35,154],[1,2,3]];
//
// arr1 = set1.map(function(x) { return JSON.stringify(x) });
// arr2 = set2.map(function(x) { return JSON.stringify(x) });
//
// function diffTest(x) {
//     for(var i=0; i < arr2.length; i++)  {
//         if (arr2[i] === x) return false;
//     }
//     return true;
// }
// diff = arr1.filter(diffTest).map(function(x) { return JSON.parse(x) });
//
// console.log(diff);