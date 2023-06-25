import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Table from '@/components/table';
import { Box, Button, Container, Divider } from "@mui/material";
import COLORS from '@/constants/colors';
import Typography from '@mui/material/Typography';
import { statusMap } from '@/utils/types';
import { PROJECT } from '@/utils/dump';

export default function ProjectsTasks() {
    const [project, setProject] = useState(PROJECT)
    const [tasks, setTasks] = useState(PROJECT.tasks)
    const router = useRouter()
    const id = router.query.id

    const getProject = () => {
        fetch(`https://aninfo-backend-proyectos.onrender.com/projects/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
              .then((res) => {
                  console.log("res", res)
                  return res.json()
              })
              .then((data) => {
                  console.log("Got data from projects id: ", data)
                  setProject(data)
              })
    }

    const getTasks = () => {
        fetch(`https://aninfo-backend-proyectos.onrender.com/projects/${id}/tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
              .then((res) => {
                  console.log("res", res)
                  return res.json()
              })
              .then((data) => {
                  console.log("Got data from tasks: ", data)
                  setTasks(data.map((task : any) => { return { id: task.id, nombre: task.name, estado: task.state, prioridad: task.priority }}))
              })
    }

    useEffect(() => {
        getProject()
        getTasks()
      }, [id])
  

    return (
        <Container component="main">
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="h3" component="h1">
                    {project.name}
                    </Typography>
                    <Button 
                        type="submit"
                        fullWidth
                        style={{backgroundColor: COLORS.button, height: '50px'}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: '12%' }} 
                        href={`./${id}/editar`}>
                        Editar
                    </Button>
                </Box>
                <Typography className='ml-2' variant="h6" component="h6" >
                    {statusMap.get(project.state)}
                </Typography>
                <Divider className='my-3' />
                <Typography className='ml-2' color={'gray'}>
                    {project.description}
                </Typography>
                <Button color='secondary' style={{textTransform: 'none'}}>
                    Ver más información
                </Button>
                <Table 
                    rowItems={tasks}
                    headerItems={["id", "nombre", "estado", "prioridad", "", ""]}
                    onDelete={(itemId: number) => console.log('Borrando task con id: ', itemId)}
                    onEdit={(itemId: number) => console.log('Editando task con id: ', itemId)}
                />
                <Button 
                    type="submit"
                    fullWidth
                    style={{backgroundColor: COLORS.button, height: '50px'}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '15%' }} 
                    href={`./${id}/crearTarea`}>
                    Crear tarea
                </Button>
            </Box>
        </Container>
    )
}