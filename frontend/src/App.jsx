import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { routes, validPathsForNavbarRender } from './utils/routes'
import { useAuthStore } from './store/useAuthStore'
import { Comment } from "react-loader-spinner"
import { Navbar } from './components'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { theme } = useThemeStore()
  const { path } = useLocation()
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [])

  if (isCheckingAuth) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <Comment
          visible={true}
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper size-34 sm:size-40"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      {validPathsForNavbarRender(path) && <Navbar />}
      <Routes>
        {routes(authUser).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  )
}

export default App