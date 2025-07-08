import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  SearchIcon } from "lucide-react"
import "../App.css"
import { SunIcon } from "lucide-react"

import { MoonIcon } from "lucide-react"
import { HeaterIcon } from "lucide-react"
import { WindIcon } from "lucide-react"
import  { useEffect, useState, } from "react"
import { useRef } from "react"
type Data = {
  humidity: number;
  windspeed: number;
  Temp: number;
};

export const Hero = () => {

  const city = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<Data>({
    humidity: 0,
    windspeed: 0,
    Temp: 0
  });
  const [sun,setsun] = useState<boolean>(true);
   const now : any = new Date();
     const hours  :any = now.getHours();
    if(hours>=19){
        setsun(false);
    }
  const search = async(city: string):Promise<void>=>{
      try{
         const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'72c183bfde0f64045a4054a529728e63'}`;
         const response = await fetch(url);
         const data = await response.json();
         console.log(data);
            setWeatherData({
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
      Temp:data.main.temp
    });
      }catch(err){
        console.log(err);
      }
  }
  useEffect(()=>{
    if (city.current) {
      city.current.value = "London"; // Directly set the value
      //@ts-ignore
      search(city.current?.value);
    }
   
  },[])
  return (
    <div className="min-h-screen my-auto min-w-screen p-10 flex flex-col justify-center-safe items-center font-semibold ">
        <div className="font-Abel my-2 text-3xl tracking-widest flex gap-x-2 animate-pulse">Sky - <div> Weather App</div></div>
        <div className="bg-accent h-100 w-88 p-4 rounded-2xl">
            <div className="w-full flex justify-between h-fit gap-x-2 items-center">
            
            <div className="w-fit border-2 rounded-lg border-accent-foreground"> <Input type="text" placeholder="City" ref={city} ></Input></div><div><Button size={"lg"} onClick={()=>{if(city.current?.value){search(city.current?.value)}}}><SearchIcon ></SearchIcon></Button></div>  <ModeToggle/></div>
            
            <div className="w-full flex mt-10 justify-center flex-col items-center-safe">{sun===false && <div className="hover:rotate-180 transition-all delay-250"><SunIcon  size={80}></SunIcon></div>}{sun && <div className="hover:rotate-180 transition-all delay-250"><MoonIcon size={80}></MoonIcon></div>}
            <div className="mt-3 flex justify-center w-full text-4xl font-sans font-semibold flex-col ml-1"><div>{Math.round(weatherData.Temp)}&deg;C</div><div className="text-2xl ">{city.current?.value}</div></div></div>
            <div className="w-full p-1 mt-10 flex justify-between items-center-safe">
                  <div className="w-fit flex flex-row gap-x-3 border-2 rounded-xl p-3 hover:scale-110 delay-150 transition-all "><HeaterIcon></HeaterIcon>
                  <div className="flex flex-col">{weatherData.humidity}<div>Humidity</div></div>
                  </div>
                <div className="w-fit flex flex-row gap-x-3 border-1 rounded-xl p-3 hover:scale-110 delay-250 transition-all"><WindIcon></WindIcon>
                  <div className="flex flex-col">{weatherData.windspeed}<div>Wind Speed</div></div>
                  </div>
            </div>
        </div>
    
    </div>
  )
}
