module.exports = function nuevoRecibo(ticket) {

  var listaProductos = ""
  ticket.productos.map((p) => {
    listaProductos += `
                <tr>
                
                    <th class="lead" scope="row">${p.nombre}</th>
                    <td class="lead">${p.idProducto}</td>
                    <td class="lead">$.${p.precio}</td>
                </tr>
        `
  })

  return (`
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
  
      html {
        font-family: sans-serif;
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
  
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
      }
  
      mark,
      .mark {
        padding: 0.2em;
        background-color: #fcf8e3;
      }
  
      strong {
        font-weight: bolder;
      }
  
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
  
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      .h1,
      .h2,
      .h3,
      .h4,
      .h5,
      .h6 {
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
      }
  
  
      h4,
      .h4 {
        font-size: 1.5rem;
      }
  
      h5,
      .h5 {
        font-size: 1.25rem;
      }
  
      .lead {
        font-size: 1.25rem;
        font-weight: 300;
      }
  
      .card {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
      }
  
      .card>hr {
        margin-right: 0;
        margin-left: 0;
      }
  
  
  
      .card-body {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        min-height: 1px;
        padding: 1.25rem;
      }
  
  
      .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
  
      @media (min-width: 576px) {
  
        .container,
        .container-sm {
          max-width: 540px;
        }
      }
  
      @media (min-width: 768px) {
  
        .container,
        .container-sm,
        .container-md {
          max-width: 720px;
        }
      }
  
      .table th,
      .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
      }
  
      .table .thead-dark th {
        color: #fff;
        background-color: #343a40;
        border-color: #454d55;
      }
      .card-footer {
        padding: 0.75rem 1.25rem;
        background-color: rgba(36, 34, 34, 0.03);
        border-top: 1px solid rgba(0, 0, 0, 0.125);
      }
    </style>
  </head>
  
  <body style="width: 35rem;">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <p class="lead"><mark>Fecha</mark> ${ticket.fecha}</p>
          <p class="lead"><mark>Nombre del cajero</mark> ${ticket.nombreCajero}</p>
          <p class="lead"><mark>ID ticket:</mark> ${ticket._id}</p>
        </div>
        <table class="table ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">
                <h4>Producto</h5>
              </th>
              <th scope="col">
                <h4>ID</h4>
              </th>
              <th scope="col">
                <h4>Precio</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            ${listaProductos}
  
          </tbody>
        </table>
  
      </div>
      <div class="card-footer">
        <h1><mark>TOTAL:</mark> $.${ticket.precioFinal}</h1>
      </div>
    </div>
  </body>
  
  </html>
    `)
}