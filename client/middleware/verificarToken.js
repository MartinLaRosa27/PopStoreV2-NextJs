import axios from "axios";
import Cookie from "universal-cookie";

module.exports.vefificarToken = async () => {
  let tokenValido = false;
  // Obtiene token de las cookies:
  let token;
  const cookie = new Cookie();
  const headerCookie = cookie.get("token");
  console.log(headerCookie);
  if (typeof headerCookie !== "string") {
    token = "Token Invalido";
  } else {
    token = headerCookie;
  }
  // Verifica que el usuario este registrado:
  await axios
    .put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/vefificar-token`, {
      auth: token,
    })
    .then(async () => {
      tokenValido = true;
    })
    .catch(() => {});
  return tokenValido;
};
