import Mensajes from "./Mensajes";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export const Formulario = ({ setEstado, idMetro, setIdMetro }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    console.log(idMetro);
    if (idMetro) {
      (async function (idMetro) {
        try {
          const respuesta = await (await fetch(`https://64d05594ff953154bb78c9e6.mockapi.io/rutas/${idMetro}`)).json();
          const { id, nombre, sector, salida, llegada, maquinista, detalles } = respuesta;
          setValue("nombre", nombre);
          setValue("sector", sector);
          setValue("salida", salida);
          setValue("llegada", llegada);
          setValue("maquinista", maquinista);
          setValue("detalles", detalles);
          setIdMetro(id);
        } catch (error) {
          Swal.fire(
            'ERROR',
            'Ha ocurrido un error al intentar obtener los datos del registro.',
            'error'
          )
        }
      })(idMetro);
    }
  }, [idMetro, setIdMetro]);

  const onSubmit = async (data) => {
    if (Object.values(data).includes("")) {
      return;
    }

    try {
      // Verificar si ya existe una ruta con el mismo nombre
      const existingRouteResponse = await fetch(`https://64d05594ff953154bb78c9e6.mockapi.io/rutas?nombre=${encodeURIComponent(data.nombre)}`);
      const existingRouteData = await existingRouteResponse.json();

      if (existingRouteData.length > 0) {
        // Mostrar un mensaje de error o realizar alguna acción si ya existe la ruta
        Swal.fire(
          'Error',
          'Ya existe una ruta con el mismo nombre',
          'error'
        );
        return;
      }
      // Actualización de las rutas
      if (idMetro) {
        const url = `https://64d05594ff953154bb78c9e6.mockapi.io/rutas/${idMetro}`;
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        setEstado(true);
        setIdMetro(null);
      }
      // Creación de las rutas
      else {
        const url = "https://64d05594ff953154bb78c9e6.mockapi.io/rutas";
        data.id = uuidv4();
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        setEstado(true);
      }

      setTimeout(() => {
        setEstado(false);
        setValue("nombre", "");
        setValue("sector", "");
        setValue("salida", "");
        setValue("llegada", "");
        setValue("maquinista", "");
        setValue("detalles", "");
      }, 1000);
    } catch (error) {
      Swal.fire(
        'ERROR',
        'Ha ocurrido un error al intentar actualizar o crear el registro.',
        'error'
      )
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* Campo Nombre */}
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre:
        </label>
        <input
          id="nombre"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.nombre ? "border-red-500" : ""
            }`}
          placeholder="nombre de la ruta"
          maxLength={20}
          {...register("nombre", {
            required: true,
            setValueAs: value => value.trim()
          })}
        />
        {errors.nombre && <span className="text-red-500">Campo requerido</span>}
      </div>

      <div>
        {/* Campo Sector */}
        <label htmlFor="sector" className="text-gray-700 uppercase font-bold text-sm">
          Sector:
        </label>
        <input
          id="sector"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.sector ? "border-red-500" : ""
            }`}
          placeholder="sector de la ruta"
          maxLength={30}
          {...register("sector", {
            required: true,
            pattern: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/,
            validate: value => typeof value === "string",
            setValueAs: value => value.trim()
          })}
        />
        {errors.sector && <span className="text-red-500">Campo requerido y solo debe contener letras</span>}
      </div>

      <div>
        {/* Campo Punto de Salida */}
        <label htmlFor="salida" className="text-gray-700 uppercase font-bold text-sm">
          Punto de salida:
        </label>
        <input
          id="salida"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.salida ? "border-red-500" : ""
            }`}
          placeholder="punto de salida"
          maxLength={30}
          {...register("salida", {
            required: true,
            pattern: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/,
            validate: value => typeof value === "string",
            setValueAs: value => value.trim()
          })}
        />
        {errors.salida && <span className="text-red-500">Campo requerido y solo debe contener letras</span>}
      </div>

      <div>
        {/* Campo Punto de Llegada */}
        <label htmlFor="llegada" className="text-gray-700 uppercase font-bold text-sm">
          Punto de llegada:
        </label>
        <input
          id="llegada"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.llegada ? "border-red-500" : ""
            }`}
          placeholder="punto de llegada"
          maxLength={30}
          {...register("llegada", {
            required: true,
            pattern: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/,
            validate: value => typeof value === "string",
            setValueAs: value => value.trim()
          })}
        />
        {errors.llegada && <span className="text-red-500">Campo requerido y solo debe contener letras</span>}
      </div>

      <div>
        {/* Campo Nombre del Maquinista */}
        <label htmlFor="maquinista" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del maquinista:
        </label>
        <input
          id="maquinista"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.maquinista ? "border-red-500" : ""
            }`}
          placeholder="nombre del maquinista"
          maxLength={40}
          {...register("maquinista", {
            required: true,
            pattern: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/,
            validate: value => typeof value === "string",
            setValueAs: value => value.trim()
          })}
        />
        {errors.maquinista && <span className="text-red-500">Campo requerido y solo debe contener letras</span>}
      </div>

      <div>
        {/* Campo Detalles */}
        <label htmlFor="detalles" className="text-gray-700 uppercase font-bold text-sm">
          Detalles:
        </label>
        <textarea
          id="detalles"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.detalles ? "border-red-500" : ""
            }`}
          placeholder="detalles"
          maxLength={70}
          {...register("detalles", {
            required: true,
            setValueAs: value => value.trim()
          })}
        />
        {errors.detalles && <span className="text-red-500">Campo requerido</span>}
      </div>

      <div className="flex gap-4 mt-4">
        {/* Botón de Envío */}
        <input
          type="submit"
          className="bg-sky-900 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-red-900 cursor-pointer transition-all"
          value={idMetro ? "Actualizar ruta" : "Registrar ruta"}
        />
        <input
          type="button"
          className='bg-red-900 w-1/3 p-3 text-white uppercase font-bold rounded-lg hover:bg-red-700 cursor-pointer transition-all'
          value={idMetro ? "Cancelar" : "Borrrar"}
          onClick={() => {
            idMetro ? (setIdMetro({
              nombre: "",
              sector: "",
              salida: "",
              llegada: "",
              maquinista: "",
              detalles: ""
            })) : setIdMetro({
              nombre: "",
              sector: "",
              salida: "",
              llegada: "",
              maquinista: "",
              detalles: ""
            })
          }} />
      </div>
    </form>
  );
};
