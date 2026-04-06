import { Link } from 'react-router';

function Header (){
    return(
    <header className='flex justify-between'>
      <h1 className="text-blue-600 p-4 font-bold text-5xl font-mono ">iRepair.</h1>
      <nav className='p-7 text-blue-600'>
        <Link to="/" className='px-7'>Dashboard</Link>
        <Link to="/clients" className='px-7'>Clientes</Link>
        <Link to="/service-orders" className='px-7'>Ordens de Serviço</Link>
      </nav>
    </header>
    );
};

export default Header;
