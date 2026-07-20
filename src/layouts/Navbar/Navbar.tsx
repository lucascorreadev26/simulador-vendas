import Logo from '../../assets/logo_eco_fogoes.jpg'

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
            <img className="w-16 rounded-full border border-green-950" src={Logo} alt="Logo" />    
            <span className="font-bold text-lg text-emerald-600">EcoFogões</span>
        </div>
        <div>
            <p className="text-sm text-gray-600">V.1.0 / Simulador</p>
        </div>
    </nav>
  )
}

export default Navbar