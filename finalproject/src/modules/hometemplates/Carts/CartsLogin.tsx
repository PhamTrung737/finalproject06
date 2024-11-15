
import { Link } from 'react-router-dom'

export default function CartsLogin() {
  return (
    <div className='flex flex-col justyfy-between items-center gap-2 my-32'>
      <h1 className='text-2xl font-[500]'>Have an account?</h1>
      <div className='text-lg'>
        <Link to={"/login/cart"} className='text-[#996d43] mr-1 underline'>Login</Link>
        <span>to check out faster.</span>
      </div>
    </div>
  )
}
