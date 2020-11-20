/* 
Éste es un ejercicio optativo, para reforzar lo visto hasta ahora. 
¡CRUD Simulator!
En esta ejercitación te pediremos que desarrolles una pequeña aplicación modularizada que, dado un archivo .json de productos, al ejecutarla por línea de comandos pueda recibir las siguientes instrucciones:
- listar todos los productos
- agregar un nuevo producto
- filtrar los productos según su precio(ej.: Todos los productos que tengan un precio entre 20 y 100)
- modificar el precio de un producto específico
+Extras+
- eliminar un producto
- buscar un producto 
*/
const OK = 0;
let process = require('process');
let productsModule = require('./productos');
let command = process.argv[2];

switch (command) {
    case 'listar':
        let products = productsModule.readJSON();

        if (products.length === 0) {
            console.log("----------------------------------------------------");
            console.log("             La lista de productos vacia            ");
            console.log("----------------------------------------------------");
        } else {
            console.log("----------------------------------------------------");
            console.log("                Listado de productos                ");
            console.log("----------------------------------------------------");

            products.forEach(element => {
                console.log("ID: " + element.id);
                console.log("Producto: " + element.name);
                console.log("Precio: " + element.price);
                console.log(""); 
            });
        }        
        break;

    case 'agregar':
        let newName = process.argv[3];
        let newPrice = process.argv[4];

        if (newName === undefined || newPrice === undefined) {            
            console.log("----------------------------------------------------");
            console.log("     Debe ingresar nombre del producto y precio     ");
            console.log("----------------------------------------------------");
        } else {
            newPrice = Number(newPrice);            
            productsModule.writeJSON(newName,newPrice);
            console.log("----------------------------------------------------");
            console.log("           Producto agregado exitosamente           ");
            console.log("----------------------------------------------------");
        }
        break;

    case 'filtrar':
        let minPrice = process.argv[3];
        let maxPrice = process.argv[4];

        if (minPrice === undefined || maxPrice === undefined) {
            console.log("---------------------------------------------------");
            console.log(" Debe ingresar un precio minimo y un precio maximo ");
            console.log("---------------------------------------------------");
        } else {
            minPrice = Number(minPrice);
            maxPrice = Number(maxPrice);
            let filteredProducts = productsModule.filterPrice(minPrice, maxPrice);

            if (filteredProducts.length !== 0) {
                console.log("----------------------------------------------------");
                console.log("             Lista de producto filtrados            ");
                console.log("----------------------------------------------------");
                filteredProducts.forEach(element => {
                    console.log("ID: " + element.id);
                    console.log("Producto: " + element.name);
                    console.log("Precio: " + element.price);
                    console.log("");
                });
            } else {
                console.log("----------------------------------------------------");
                console.log("          Lista vacia de producto filtrados         ");
                console.log("----------------------------------------------------");
            }
            
        }
        break;

    case 'modificarPrecio':
        let id = process.argv[3];
        let updatedPrice = process.argv[4]; 

        if (id == undefined || updatedPrice == undefined) {
            console.log("----------------------------------------------------");
            console.log(" Debe ingresar el id del producto y el nuevo precio ");
            console.log("----------------------------------------------------");
        } else {
            id = Number(id);
            updatedPrice = Number(updatedPrice);
            if (productsModule.modifyPrice(id, updatedPrice) === OK) {
                console.log("----------------------------------------------------");
                console.log("           Precio actualizado exitosamente          ");
                console.log("----------------------------------------------------");           
                console.log(" ID del producto: " + id + " => Nuevo precio: " + updatedPrice);
            } else {
                console.log("----------------------------------------------------");
                console.log("             El ID del producto no existe           ");
                console.log("----------------------------------------------------"); 
            }
        }
        break;
             
    case 'eliminar':
        let deleteId = process.argv[3];

        if (deleteId == undefined) {
            console.log("----------------------------------------------------");
            console.log("     Debe ingresar el ID del producto a eliminar    ");
            console.log("----------------------------------------------------");
        } else {
            deleteId = Number(deleteId);
            if (productsModule.delete(deleteId) === OK) {
                console.log("----------------------------------------------------");
                console.log("           Producto eliminado exitosamente          ");
                console.log("----------------------------------------------------");
            } else {
                console.log("----------------------------------------------------");
                console.log("        No se ha podido eliminar el producto        ");
                console.log("              Verifique que exista el ID            ");
                console.log("----------------------------------------------------");
            }               
        }
        break;

    case 'buscar':
        let wantedProduct = process.argv[3];        

        if (wantedProduct !== undefined) {
            let wantedList = productsModule.search(wantedProduct);

            if(wantedList.length !== 0){
                console.log("----------------------------------------------------");
                console.log("              Resultado de la busqueda              ");
                console.log("----------------------------------------------------");
                wantedList.forEach(element => {
                    console.log("ID: " + element.id);
                    console.log("Producto: " + element.name);
                    console.log("Precio: " + element.price);
                    console.log("");
                });
            } else {
                console.log("----------------------------------------------------");
                console.log("               Producto no encontrado               ");
                console.log("----------------------------------------------------");
            }
        } else {
            console.log("----------------------------------------------------");
            console.log("    Debe ingresar el nombre del producto buscado    ");
            console.log("----------------------------------------------------");
        }
        
        break;

    default:
        break;
}