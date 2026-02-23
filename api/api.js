const URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, name, password) => {
  try {
    const response = await fetch(`${URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, password }),
    });

    const data = await response.json();
    console.log("Informacion del Register: ", data);

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar el usuario");
    }
  } catch (error) {
    console.error("Error en la función register:", error);
    throw error;
  }
};

export { register };
