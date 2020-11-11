module.exports = function nuevoRecibo(ticket){

    var listaProductos=""
    ticket.productos.map((p)=>{
        listaProductos+=`
                <tr class="item">
                    <td>${p.nombre}</td>
                    <td>${p.idProducto}$</td>
                    <td>${p.precio}$</td>
                </tr>
        `
    })

    return(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica';
                color: #555;
            }
    
            .margin-top {
                margin-top: 50px;
            }
    
            .justify-center {
                text-align: center;
            }
    
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
    
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
    
            
    
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
    
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
    
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
    
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
    
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
    
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
    
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title"></td>
                                <td>
                                    Fecha: ${ticket.fecha}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    Nombre del cajero: ${ticket.nombreCajero}
                                </td>
                                <td>
                                    ID ticket: ${ticket._id}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>Producto</td>
                    <td>ID</td>
                    <td>Precio</td>
                </tr>
                ${listaProductos}
                
            </table>
            <br />
            <h1 class="justify-center">Total: ${ticket.precioFinal}$</h1>
        </div>
    </body>
    
    </body>
    
    </html>
    `)
}