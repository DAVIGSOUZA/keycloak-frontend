import { useKeycloak } from "@/context/keycloak"

export default function Admin() {
  const {
    keycloak,
    isReady,
    loading,
  } = useKeycloak()

  console.log(keycloak?.idTokenParsed);
  console.log(keycloak?.authenticated);
  
  
  return (
  <div>
    <h1> ADMIN </h1>


    <h2>
      Next app 3
    </h2>

    <div>
      {!isReady && loading && <h4> Loading ... </h4>}

      {!isReady && !loading && <h4> Algo deu errado </h4>}

      {isReady && !loading && keycloak?.authenticated && (
        <>
          <h4> Usuário logado</h4>
          <button onClick={() => keycloak.logout()}>Logout</button>
        </>
      )}

      {isReady && !loading && !(keycloak?.authenticated) && (
        <button onClick={() => keycloak?.login()}>Login</button>
      )}
    </div>
  </div>
  )
}
