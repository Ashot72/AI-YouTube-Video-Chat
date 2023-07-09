"use"

import 'bootstrap/dist/css/bootstrap.css'
import Bootstrap from './bootstrap'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Video Chat',
  description: 'Chat with Videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Bootstrap/>
           <Provider>
            <Nav />
           
            {children}           
        </Provider>
      </body>        
    </html>
  )
}
