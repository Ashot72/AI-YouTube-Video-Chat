"use client"

import Link from "next/link"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"

const Nav = () => {
   const { data: session } = useSession()
   const [providers, setProviders] = useState(null)
  
   useEffect(() => {
      (async() => {
        const response = await getProviders()
        setProviders(response)
      })()
   },[])
   
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" to="/">
                <div style={{ marginLeft: "250px" }}></div>
            </a>
            <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link href="/"  className='nav-link'>Home</Link>
                    </li>                   
                    {
                        session  &&
                        <li className="nav-item">
                            <Link href="/?page=myVideous" className='nav-link'>My Videous</Link>
                        </li>
                    }
                    
                </ul>
                <ul className="navbar-nav ms-auto">
                   {
                        session  &&
                        <li className="nav-item">
                            <Link href="/?action=add"  className='nav-link'>Add Video</Link>
                        </li>
                    }
                    {
                        session
                            ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{session.name}</a>  
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">    
                                        <li><Link href="/profile" className="dropdown-item">Profile</Link></li>
                                        <li><Link href="/" className="dropdown-item" onClick={signOut}>Sign Out</Link></li> 
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        {
                                            providers && Object.values(providers).map((provider) => (
                                                <li key={provider.name}>
                                                    <Link href="/" className="dropdown-item" onClick={() => signIn(provider.id)}>Sign In</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            )
                    }
                </ul>
            </div>
        </div>
    </nav>
)
}

export default Nav