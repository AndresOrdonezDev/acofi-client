import { toast } from "react-toastify";

export const handleCopy = (consecutiveNumber:string) => {
    if (consecutiveNumber) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(consecutiveNumber)
          .then(() => {
            toast.success("Consecutivo copiado");
          })
          .catch((error) => {
            toast.error("Error al copiar");
            console.log(error);
          });
      } else {
        // Fallback para navegadores sin Clipboard API (selecciona y copia manualmente)
        const textArea = document.createElement("textarea");
        textArea.value = consecutiveNumber;
        textArea.style.position = "fixed"; // Evita que salte la pantalla
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
  
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            toast.success("Consecutivo copiado");
          } else {
            toast.error("No se pudo copiar el consecutivo");
          }
        } catch (err) {
          toast.error("Error al copiar");
          console.log(err);
        }
  
        document.body.removeChild(textArea);
      }
    }
  };
  