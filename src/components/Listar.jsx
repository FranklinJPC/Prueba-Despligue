import logoMetro from '../assets/tren.webp'
import Mensajes from './Mensajes'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'


const Listar = ({ estado, setIdmetro }) => {
    const [rutas, setRutas] = useState([])

    useEffect(() => {
        if (estado || rutas.length >= 0) {
            (async function () {
                try {
                    // Llamar a una API
                    const respuesta = await (await fetch("https://64d05594ff953154bb78c9e6.mockapi.io/rutas")).json()
                    // Cargar la info en rutas por medio de setRutas
                    setRutas(respuesta)
                    console.log("petición");
                }
                catch (error) {
                    // Mostrar mensajes de error
                    Swal.fire(
                        'ERROR',
                        'Ha ocurrido un error al intentar obtener las rutas registradas.',
                        'error'
                    )
                }
            })()
        }
    }, [estado])

    const handleDelete = async (id) => {
        try {
            const confirmar = await Swal.fire({
                title: 'Eliminar ruta',
                text: '¿Estás seguro de que deseas eliminar esta ruta?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28B463',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });
            console.log(confirmar.isConfirmed);
            if (confirmar.isConfirmed) {
                const url = `https://64d05594ff953154bb78c9e6.mockapi.io/rutas/${id}`
                await fetch(url, {
                    method: 'DELETE',
                })
                const nuevasRutas = rutas.filter(ruta => ruta.id !== id)
                setRutas(nuevasRutas)
            }
        }
        catch (error) {
            Swal.fire(
                'ERROR',
                'Ha ocurrido un error al intentar eliminar la ruta seleccionada.',
                'error'
            )
        }
    }

    return (
        <>
            {
                rutas.length === 0
                    ?
                    <Mensajes tipo={"bg-green-900"}>"No existe rutas creadas"</Mensajes>
                    :
                    rutas.map((ruta) => (
                        <div key={ruta.id} className="p-2 rounded-xl sm:flex gap-12 bg-gray-200 shadow-xl mb-5">
                            <img src={logoMetro} alt="art cover" className="sm:w-3/12 object-cover rounded-lg" />

                            <div className='h-auto p-3 w-full flex flex-col'>
                                <h4 className="text-2xl font-semibold text-cyan-900">{ruta.nombre}</h4>
                                <hr className="w-full border border-gray-300 my-2" />
                                <p className="text-gray-500">Sector: {ruta.sector}</p>
                                <p className="text-gray-500">Punto de salida: {ruta.salida}</p>
                                <p className="text-gray-500">Punto de llegada: {ruta.llegada}</p>
                                <p className="text-gray-500">Maquinista: {ruta.maquinista}</p>
                                <p className="text-gray-500">Detalles: {ruta.detalles}</p>
                                <div className='flex justify-between mt-3 lg:justify-end md:justify-end gap-3'>
                                    <button className='bg-sky-900 text-white px-6 py-1 rounded-full' onClick={() => { setIdmetro(ruta.id) }}>Actualizar</button>
                                    <button className='bg-red-900 text-white px-6 py-1 rounded-full' onClick={() => { handleDelete(ruta.id) }}>Eliminar</button>
                                </div>
                            </div>
                        </div>

                    ))
            }
        </>
    )
}

export default Listar