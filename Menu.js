import React, {useState} from "react";
import "./Menu.css"

const categorias = [
    {
        "nombre": "Holaaa",
        "articulos": ["pepe","asda", "acxz"]
    },
    {
        "nombre": "Chau",
        "articulos": ["cccc","sdasda", "dsa"]
    }
]
console.log("categorias: ", categorias)

function Menu(){

    const [idArticulos, setIdArticulos] = useState(-1);
    const handlerCargarArticulos = function (e){
        const opcion = e.target.value;
        console.log(opcion);
        setIdArticulos(opcion);
    }

    return(
        <div className="row">
            <div className="col-md-6">
                <h3>Categorias</h3>
                    <select name="categorias" id="selCategorias" onClick={handlerCargarArticulos}>
                        <option value={-1}>Seleccione una opción</option>
                        {
                            categorias.map((item, i) => (
                                <option key={"categoria" + i} value={i}>{item.nombre}</option>
                            ))
                        }
                    </select>
            </div>
                <div className="col-md-6">
                    <h3>Articulos</h3>
                        <select name="articulos" id="selArticulos">
                            {
                                idArticulos > -1 &&
                                (
                                    categorias[idArticulos].articulos.map((item, i) => (
                                        <option key= {"articulo" + i} value= { i }>
                                            {item}
                                        </option>
                                    ))
                                )
                            }
                        </select>
                </div>

        </div>
    )
}
export default Menu;