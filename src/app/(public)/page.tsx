"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./launch.css"
import { FaLeaf, FaSeedling } from "react-icons/fa6";

export default function Home() {
  const router = useRouter()

  useEffect(()=> {
    const timer = setTimeout(()=> {
      router.push("/welcome")
    }, 3000);
    return () => clearTimeout(timer)
  }, [router])
  
  return (
    <div className="splash-container">
      <div className="splash-logo animate-in">
             <FaLeaf className="leaf-icon" size={76} color="#1d5f27" />
             

        <h1 className="splash-title">
          <span className="p-grande">
             P
          </span>
         
          lantopia</h1>
      </div>
    </div>
  );
}
