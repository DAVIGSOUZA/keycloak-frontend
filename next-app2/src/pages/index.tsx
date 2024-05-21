import { useKeycloak } from "@/context/keycloak"
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [fetching, setFetching] = useState(false)
  const [backendData, setBackendData] = useState<any>(undefined)

  const {
    keycloak,
    isReady,
    loading,
  } = useKeycloak()

  console.log({keycloak});

  const request = async () => {
    setFetching(true)

    const token = keycloak?.token

    const bearerToken = `bearer ${token}`

    const url = "SOME AUTH URL"

    console.log('token used:', token);
    
    const response = await axios.get(
      url, { headers: { Authorization: bearerToken}}
    )
    
    setFetching(false)

    setBackendData(response.data)
  }
  
  return (
  <div>
    <h1> HOME </h1>

    <br />

    <h2>
      Next app 2
    </h2>

    <br />
    <br />

    <div>
      {!isReady && loading && <h4> Loading ... </h4>}

      {!isReady && !loading && <h4> Algo deu errado </h4>}

      {isReady && !loading && keycloak?.authenticated && (
        <>
          <h4> Usuário logado</h4>

          <h4> User Name: {keycloak?.idTokenParsed?.name}</h4>

          <h4> User Email: {keycloak?.idTokenParsed?.email}</h4>

          <br />

          <button onClick={() => keycloak.logout()}>Logout</button>
        </>
      )}

      {isReady && !loading && !(keycloak?.authenticated) && (
        <button onClick={() => keycloak?.login()}>Login</button>
      )}

      <br />
      <br />

      <div>
        {isReady && !loading && keycloak?.authenticated && (
          <button onClick={() => request()}>Requisitar backend</button>
        )}
      </div>

      <br />

      <div>
        {fetching && backendData === undefined && (
          <h4> loading data from backend ... </h4>
        )}

        {!fetching && backendData !== undefined && (
          <h4> {JSON.stringify(backendData)} </h4>
        )}
      </div>
    </div>
  </div>
  )
}
