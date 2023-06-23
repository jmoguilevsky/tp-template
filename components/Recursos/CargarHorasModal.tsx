import { useState } from "react";
import HorasCargadasModal from "./HorasCargadasModal";




export default function CargarHorasModal(legajo: any) {
    if(legajo == undefined){  // || props.id == undefined
        return (<></>)
    }

    const [proyect, setProyect] = useState('')
    const [task, setTask] = useState('')
    const [hours, setHours] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        const registro = {proyect, task, hours, date}
        //Salta error para el push 
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos/"+ legajo + "/registros",{
            method: 'POST',
            headers: {"Content-Type": "aplication/json"},
            body: JSON.stringify(registro)
        }).then(() => {
            console.log('Hora cargada con exito')
        })

    }


    return (
        <div className="modal fade" id="cargarHorasModal" tabIndex={-1} aria-labelledby="cargarHorasModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit = {handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cargarHorasModalLabel">Cargar Horas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
                                {/* <input type="text" className="form-control" id="name" placeholder="Listar proyectos" required /> */}
                                <select value={proyect} onChange={(e) => setProyect(e.target.value)}>
                                    <option value="RappiYa">RappiYa </option>
                                    <option value="StoreX">StoreX </option>
                                    <option value="Buys Urus">Buys Urus </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Tarea: <small>(requerido)</small></label>
                                {/* <input type="text" className="form-control" id="name" placeholder="Listar tarea" required /> */}
                                <select value={task} onChange={(e) => setTask(e.target.value)}>
                                    <option value="Verificar base de datos">Verificar base de datos </option>
                                    <option value="Actualizar sonido principal">Actualizar sonido principal </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Cantidad de horas: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="horas" placeholder="Horas de trabajo" required value={hours} onChange={(e) => setHours(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button> */}
                            {/* <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#horasCargadasModal">Aceptar</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Aceptar</button>
        
                            <HorasCargadasModal /> 
                        </div>
                        
                        
                        {/* <div className="modal fade" id="horasCargadasModal" tabIndex={-1} aria-labelledby="horasCargadasModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form>
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="horasCargadasModalLabel">Carga de horas</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h3 className="fw-light mb-4">La carga fue realizada con exito</h3>
                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}



                    </form>
                </div>
            </div>
        </div>
        
    )
}