import React,{useEffect , useState} from 'react'
import Axios from 'axios'
import Pokemon from '../pokemon.png'                               


export default function Main() {

    const [pokemon,setPokemon] = useState()
    const [pokeStats, setPokeStates] = useState()

    useEffect(()=>{
        getPokemon();
    },[])

    const getPokemon=async()=>{
        const response=await Axios('https://pokeapi.co/api/v2/pokemon?limit=100');
        setPokemon(response.data)    
      }

      const getPokeStats=async(url)=>{
        const response=await Axios(url);
        setPokeStates(response.data)    
      }

      console.log(pokeStats,'pokemon')

 const onPokeSelect =(e)=>{
    let id = e.target.id
    getPokeStats(id)
    
 }

  return (
    <div className='d-flex justify-between '>
        <div className=' h-25' >
            <div className='card-body py-2 card-scroller'>
            <h1 ><img src={Pokemon} style={{height:'3rem',width:'10rem' , background:'#EBEB00'}}/></h1>
                {pokemon!==undefined && pokemon.results.map((i)=>{
                    return(
                        <div className='flex-column '>
                            <button  className ='btn btn-primary' style={{width:'140px',background:'#EBEB00',color:'black'}} onClick={(e)=>onPokeSelect(e)} id={i.url}>{i.name}</button>
                        </div>
                    )
                })}
            </div>
        </div>

    { pokeStats==undefined && <div> <h6>Please Select Any PokeMon</h6> <img src={Pokemon} style={{width:'65rem',background:'#EBEB00',color:'black'}} /> </div>}
    {  pokeStats!==undefined &&  
        <div className=''> 
            <div className='card shadow-lg  bg-white rounded' style={{height:'15rem',width:'15rem',marginTop:'2rem',marginLeft:'2rem',background:'white'}} >
                <img src={pokeStats.sprites.front_default} style={{height:'15rem',width:'15rem'}}/>
            </div>
            <div className=' flex-column justify-content-start '>
            <h1 > {pokeStats.name}</h1>
            <div>
                    <h6>Experience - {pokeStats.base_experience}</h6>
                    <h6>Height - {pokeStats.height}</h6>
                    <h6>Abilities -{pokeStats.abilities.map((i)=>{
                        return(
                            i.ability.name
                        )
                    })} </h6>
                    <h6>Moves - {pokeStats.moves.slice(0,5).map((i)=>{
                        return(
                            i.move.name
                        )
                    })} </h6>
            </div>
            </div>
            

            <h2 style={{marginTop:'2rem'}}>Statics</h2>
            <div className='flex-column'>
            {
                pokeStats.stats.map((i)=>{
                    return(
                        <div className='row'>
                            <div className='col-md-4 justify-content-start'> {i.stat.name} </div>
                            <div className='col-md-8 d-flex align-items-center'>
                                <h6 className='m-2'>{i.base_stat} </h6><progress value={i.base_stat} max={100} style={{fontSize:'1.5rem'}}/><br/>
                            </div>
                        </div>
                    )
                })
            }  
            </div>
        </div>}   
    </div>
  )
}


