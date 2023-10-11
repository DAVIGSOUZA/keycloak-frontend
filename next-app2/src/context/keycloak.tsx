import { createContext, useContext, useEffect, useState } from 'react'
import Keycloak from "keycloak-js"

type KeycloakProviderProps = {
  children: React.ReactNode
}

type UseKeycloak = {
  keycloak: Keycloak | undefined
  isReady: boolean
  loading: boolean
}

export const KeycloakContext = createContext<UseKeycloak>({
  keycloak: undefined,
  isReady: false,
  loading: true,
})

export const KeycloakProvider = ({children}: KeycloakProviderProps) => {
  const [keycloak, setKeycloak] = useState<Keycloak | undefined>(undefined)
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const kc = new Keycloak({
      url: 'http://localhost:8080/',
      realm: 'test',
      clientId: 'frontend',
    })

    keycloakInit(kc)
  }, [])


  async function keycloakInit(keycloakInstance: Keycloak) {
    setLoading(true)

    try {
      await keycloakInstance.init({
        checkLoginIframe: false,
        pkceMethod: 'S256',
        onLoad: 'check-sso',
      })

      setKeycloak(keycloakInstance)
      
      setIsReady(true)

      setLoading(false)
    } catch (error) {
      console.log("Failed to initialize adapter:", error);

      setLoading(false)
    }
  }

  return (
    <KeycloakContext.Provider value={({
      keycloak,
      isReady,
      loading,
    })}>
      {children}
    </KeycloakContext.Provider>
  )
}

export const useKeycloak = () => useContext(KeycloakContext)