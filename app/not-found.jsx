import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div 
       className="alert alert-danger" 
       role="alert"
       style={{ textAlign: "center", left: "10%", width: "80%", top: "20px"}}
       >
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/" className='alert-link'>Home Page</Link>
      </p>
    </div>  
  )
}
