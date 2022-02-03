import { useRouter } from 'next/router'

const GoBack = () =>{
  const router = useRouter();

  return (
    <div className='fixed bottom-0 right-0 p-8'>
      <button onClick={() => router.back()} className='bg-gray-600 rounded-full w-8 h-8 inline-flex items-center overflow-hidden transition-all ease-in delay-150 hover:w-20'>
        <span className='flex items-center p-1.5'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
        <span className='pr-1 whitespace-nowrap'>
          back
        </span>
      </button>
    </div>
  )
}


export default GoBack
