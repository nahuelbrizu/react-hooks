import React, {Component, useState} from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="https://localhost:3003/users";

export default function CreateAxios() {
    const [data, setData] = useState([]);
    const [users, setUser]=useState({
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            user_name: '',
            password: '',
            telephone_number: '',
            birth_date: '',
            gender: '',
            first_name: '',
            last_name: '',
            tipoModal: ''
        }
    });

    peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post(url,this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put(url+this.state.form.id, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    seleccionarUsuario=(user)=>{
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: user.id,
                user_name: user.user_name,
                password: user.password,
                telephone_number: user.telephone_number
            }
        })
    }

    handleChange=async(e: { target: { name: any; value: any; };
    })=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.id]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount(){
        this.peticionGet();
    }


    render(){
        const {form}=this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar user</button>
                <br /><br />
                <table className="table ">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>user_name</th>
                        <th>País</th>
                        <th>Capital Bursatil (en millones de USD)</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(user=>{
                        return(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.telephone_number}</td>
                                <td>{new Intl.NumberFormat("en-EN").format(user.capital_bursatil)}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{this.seleccionaruser(user); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={()=>{this.seleccionaruser(user); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                            <br />
                            <label htmlFor="user_name">user_name</label>
                            <input className="form-control" type="text" name="user_name" id="user_name" onChange={this.handleChange} value={form?form.user_name: ''}/>
                            <br />
                            <label htmlFor="user_name">País</label>
                            <input className="form-control" type="text" name="telephone_number" id="telephone_number" onChange={this.handleChange} value={form?form.telephone_number: ''}/>
                            <br />
                            <label htmlFor="capital_bursatil">Capital Bursatil</label>
                            <input className="form-control" type="text" name="capital_bursatil" id="capital_bursatil" onChange={this.handleChange} value={form?form.capital_bursatil:''}/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                                Insertar
                            </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar a la user {form && form.user_name}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>



        );
    }
}
export default CreateAxios;