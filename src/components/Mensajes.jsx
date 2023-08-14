

const Mensajes = ({tipo, children}) => {
    return (
        <div className={`${tipo} text-white text-center p-3 uppercase font-bold rounded-lg m-5`}>{children}</div>
    )
}

export default Mensajes