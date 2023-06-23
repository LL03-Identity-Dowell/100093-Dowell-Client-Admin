import images from './images';

const Navbar = () => {
  return (
    <div className='lg:flex items-center container mx-auto'>
      <div className='lg:w-1/2 w-full lg:flex-col flex justify-center'>
      <img src={images.admin_logo} alt='' className='w-[150px] h-[150px]' /></div>
      <h2 className='font-semibold text-black text-3xl text-center lg:pb-0 pb-8'>LivingLab Admin</h2>
    </div>
  )
}

export default Navbar