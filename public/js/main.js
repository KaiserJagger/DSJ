
        // Cargar el archivo JSON de productos
        fetch('./assets/data/products.json')
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('productList');
                data.forEach(product => {
                    productList.innerHTML += `
                        <div class="col-md-6">
                            <div class="card mb-3">
                                <div class="row no-gutters">
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h2 class="card-title">${product.title}</h2>
                                            <p class="card-text">${product.description}</p>
                                            <h3 class="card-text">Precio: $${product.price}</h3>
                                            <h3 class="card-text">Precio por bulto: $${product.pricepb}</h3>
                                            <a href="/api/session/login/" class="btn btn-primary btn-block mb-2">Comprar</a>
                                            <a href="/api/products/{{this._id}}" class="btn btn-success" btn-block mb-4 >Detalles</a>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <img src="${product.thumbnails}" class="card-img img-fluid" alt="Producto">
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => console.error('Error al cargar productos: ' + error));
