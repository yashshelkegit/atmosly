import { useEffect, useState } from 'react'
import MissionItem from './MissionItem';

type Mission = {
    id: string;
    name: string;
    details: string;
    success: boolean;
};

const MissionList = () => {

    const [missions, setMissions] = useState<Mission[]>([])

    useEffect(() => {
        async function fetchMissions() {
            const response = await fetch('https://api.spacexdata.com/v4/launches')
            const data = await response.json()
            console.log(data)
            setMissions(data)
        }
        fetchMissions();
    }, [])
  return (
    <div className='grid grid-cols-4 gap-3'>
      {missions.map(mission => <MissionItem key={mission.id} {...mission}/>)}
    </div>
  )
}

export default MissionList
