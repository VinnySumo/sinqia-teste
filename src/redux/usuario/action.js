import actionType from "./actionType";

// Ação de login
export const userLogin = (payload) => {
  return (dispatch) => {
    // Armazene os dados do usuário no Redux
    dispatch({
      type: actionType.login,
      payload
    });

    // Também armazene o ID do usuário no localStorage
    localStorage.setItem('usu_id', payload.usu_id); // Aqui salva o ID do usuário
  };
};
// Ação de logout
export const userLogout = () => ({
  type: actionType.logout
});
