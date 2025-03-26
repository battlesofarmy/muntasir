
import Link from 'next/link';

function Footer() {
  return (
    <div className="bg-[#18181B]">
      <div className="max-w-2xl mx-auto text-white py-4">
        
        <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            &copy; <a target='_blank' href="https://www.facebook.com/muntasir.ahmed.341792"> Developed By 💝 Muntasir Ahmed</a>
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2">  <Link href={'/'}>About</Link> </span>
            <span className="px-2 border-l border-[#828792]">  <Link href={'/'}>Contact</Link> </span>
            <span className="px-2 border-l border-[#828792]"> <Link href={'/'}>Career</Link> </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
