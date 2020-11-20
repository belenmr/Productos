const encoding = 'utf-8';
let fs = require('fs');
let productsList = fs.readFileSync('./productos.json',encoding);
let products = JSON.parse(productsList);

module.exports = productsModule = {
    path: './productos.json',
    readJSON: function() {
        return products; 
    },
    writeJSON: function(name,price){
        let newProduct = {
            id: getLastId(products)+1,
            name: name,
            price: price
        };
        products.push(newProduct);
        this.saveJSON(products);
    },
    saveJSON: function(list){
        let newJSON = JSON.stringify(list);
        fs.writeFileSync(this.path,newJSON,encoding);
    },
    filterPrice: function(minPrice, maxPrice){
        let filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        return filteredProducts;
    },
    modifyPrice: function(id, newPrice){
        let modify = 1;
        let modifiedList = [];
    
        products.forEach(product => {
            if (product.id == id) {
                product.price = newPrice;
                modify = 0;
            }
            modifiedList.push(product);
        });
        
        this.saveJSON(modifiedList);        
        
        return modify;
    },
    delete: function(id){
        let modifiedList = products.filter(product => product.id != id);
        this.saveJSON(modifiedList);
        return modifiedList.length < this.readJSON().length ? 0 : 1
    },
    search: function(wanted){
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(wanted.toLowerCase()));
        return filteredProducts;
    }
}

function getLastId(list){
    let lastId = 1;
    
    list.forEach(element => {
        if (element.id > lastId) {
            lastId = element.id;
        }
    });

    return lastId;
}