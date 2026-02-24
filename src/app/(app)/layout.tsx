import Navbar from "@/components/Navbar/Navbar"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
interface LayoutProps {
  children: React.ReactNode
}
export default function AppLayout({ children }: LayoutProps) {
  return (

      <>
        {children}
        <Navbar /> 
      </>
 
  )
}
