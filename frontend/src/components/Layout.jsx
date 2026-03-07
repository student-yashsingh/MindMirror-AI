import Sidebar from "./Sidebar";
import ParticlesBackground from "./ParticlesBackground";

export default function Layout({ children }) {

return (

<div className="flex min-h-screen bg-[#05010a] text-white relative">

<ParticlesBackground />

<Sidebar />

<div className="flex-1 p-12 relative z-10">
{children}
</div>

</div>

);
}