function Mensaje({ tipo, texto }) {
  if (!texto) return null;

  return (
    <div className={`mensaje mensaje-${tipo}`}>
      {texto}
    </div>
  );
}

export default Mensaje;
