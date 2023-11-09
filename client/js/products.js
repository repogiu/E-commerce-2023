fetch('http://localhost:8080/api/products')
  .then(response => response.json())
  .then(products => {
    console.log(products);
    // Hacer algo con los productos aquí
    // Por ejemplo, puedes llamar a una función para mostrar los productos en el HTML
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });
