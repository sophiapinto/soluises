/* eslint-disable */
import { BiShoppingBag, BiPencil } from "react-icons/bi";
import { BsCodeSlash, BsClipboardData } from "react-icons/bs";
import { AiOutlineMail, AiFillAudio } from "react-icons/ai";
import { FaInternetExplorer,  FaChalkboardTeacher, FaCameraRetro, FaPinterest, FaVideo, FaTabletAlt, FaRegNewspaper } from "react-icons/fa";

 

export const servicesData = [
     {
         id: 1,
       title: 'Marketing',
         icon: <BiShoppingBag/>
     },
    //{
      //  id: 2,
       // title: 'Content Writing',
        //icon: <BiPencil /> 
  //  },
    //{
      //  id: 3,
        //title: 'Email Marketing',
        //con: <AiOutlineMail />
    //},
    {
         id: 4,
         title: 'Pesquisa',
         icon: <FaRegNewspaper />
    },
    {
         id: 5,
         title: 'Modelagem e impressão 3D',
         icon: <FaChalkboardTeacher />
    },

    {
        id: 6,
        title: 'Web Design',
        icon: <BsCodeSlash />
    },
    // {
    //     id: 8,
    //     title: 'Pinterest Virtual Assistant',
    //     icon: <FaPinterest />
    // }, 
    {
        id: 9,
        title: 'Consultoria especializada',
        icon: <FaVideo />
    },
    {
        id: 10,
        title: 'Serviço de telemetria em Estação Terrestre', 
        icon: <BsClipboardData />
  },
    {
        id: 11,
        title: 'Minicursos e palestras',
        icon: <FaTabletAlt />
    },
    // {
    //     id: 12,
    //     title: 'Audio Transcription',
    //     icon: <AiFillAudio />
    // },
    {
        id: 13,
       title: 'Criação de Conteúdo',
        icon: <FaRegNewspaper />
    },

]
